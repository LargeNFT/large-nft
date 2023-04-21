import axios from "axios";
import { injectable } from "inversify";

import { Channel } from "../../dto/channel.js";
import { ExistingForkInfo, ForkInfo, GitProviderService } from './git-provider-service.js';

import { SettingsService } from './settings-service.js';


@injectable()
class GithubService implements GitProviderService {

    static BASE_URL = 'https://api.github.com'
    static READER_REPO_OWNER = "LargeNFT"
    static READER_REPO = "large-reader"


    constructor(
        private settingsService: SettingsService,
    ) { }

    async createFork(channel: Channel): Promise<ForkInfo> {

        //Look for an existing fork and just return it.
        let existingFork = await this.getExistingFork(channel)

        if (existingFork) {
            return {
                id: existingFork.id,
                path: existingFork.path
            }
        }


        console.log(`Creating reader fork...`)

        let settings = await this.settingsService.get()

        let gitProvider = settings.gitProviders["github"]


        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        let url = `${GithubService.BASE_URL}/repos/${GithubService.READER_REPO_OWNER}/${GithubService.READER_REPO}/forks`


        let path = `${channel.title} Reader`.replace(/[^a-z0-9]/gi, '-').toLowerCase()


        //Create a new one
        let response = await axios.post(url, {
            name: path,
            default_branch_only: true
        }, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })

        return {
            id: response.data.id,
            path: path
        }
    }

    public async getExistingFork(channel: Channel): Promise<ExistingForkInfo> {


        let settings = await this.settingsService.get()

        let gitProvider = settings.gitProviders["github"]


        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }


        let url = `${GithubService.BASE_URL}/repos/${GithubService.READER_REPO_OWNER}/${GithubService.READER_REPO}/forks`

        let response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })

        let forks = response.data



        let name = `${channel.title} Reader`.replace(/[^a-z0-9]/gi, '-').toLowerCase()

        //Search for one with the same path
        let results = forks.filter(f => f.name == name && f.owner.login == gitProvider.username)


        if (results?.length == 1) {
            return {
                id: results[0].id,
                httpUrlToRepo: `${results[0].html_url}.git`,
                path: results[0].name,
                defaultBranch: results[0].default_branch
            }
        }
    }

    async getForkRepoStatus(channel: Channel): Promise<string> {

        let settings = await this.settingsService.get()

        let gitProvider = settings.gitProviders["github"]


        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        let existingFork = await this.getExistingFork(channel)

        if (existingFork) {
            return "finished"
        }

        return "pending"

        // let url = `${GithubService.BASE_URL}/projects/${channel.publishReaderRepoId}`

        // let response = await axios.get(url, {
        //     headers: {
        //         "Authorization": `Bearer ${gitProvider.personalAccessToken}`,
        //         "X-GitHub-Api-Version": "2022-11-28"
        //     }
        // })

        // return response.data.import_status

    }

    async commit(channel, actions, gitProvider) {

        this.logPublishProgress(`Pushing ${actions.length} files to repo...`)

        const currentCommit = await this.getMostRecentCommit(channel, gitProvider)

        let tree = actions.map(action => {
            return {
              path: action.file_path.slice(1), //remove first /
              mode: '100644',
              type: 'blob',
              content: atob(action.content),
            }
        })

        const newTreeSha = await this.createTree(currentCommit.commit.tree.sha, tree, channel, gitProvider)

        await this.createCommit(currentCommit.sha, newTreeSha, channel, `Commiting files from Large`, gitProvider)

        this.logPublishProgress(`Successfully pushed ${actions.length} files to repo...`)


    }

      
    private async createCommit(currentCommitSha, newTreeSha, channel, message, gitProvider) {

        //Create a new commit with this tree
        const createCommitResult = await axios.post(`${GithubService.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/git/commits`, {
            message: message,
            parents: [currentCommitSha],
            tree: newTreeSha
        }, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })


        //Update the branch reference to the new commit
        const updateRefResult = await axios.patch(`${GithubService.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/git/refs/heads/master`, {
            sha: createCommitResult.data.sha
        }, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })



    }
    
    private async createTree(baseTreeSha, newTree, channel, gitProvider) {

        let parameters = {
            tree: newTree,
            base_tree: baseTreeSha
        }

        const createTreeResult = await axios.post(`${GithubService.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/git/trees`, parameters, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })


        return createTreeResult.data.sha

    }


    async deleteReaderBackup(channel: Channel, gitProvider) {

        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        this.logPublishProgress(`Deleting existing files from repo...`)

        await this.deleteDirectory(channel, gitProvider, "backup")

        this.logPublishProgress(`Successfully deleted existing backup...`)


    }

    async getMostRecentCommit(channel, gitProvider) {

        //Get the most recent commit
        let currentCommitResult = await axios.get(`${GithubService.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/commits/master`, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })

        return currentCommitResult.data
    }

    async deleteDirectory(channel, gitProvider, directoryPath) {

        const currentCommit = await this.getMostRecentCommit(channel, gitProvider)

        //Get the sha of the tree referenced by the latest commit
        const treeSha = currentCommit.commit.tree.sha

        //Get that tree
        let treeResult = await axios.get(`${GithubService.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/git/trees/${treeSha}`, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })

        let tree = treeResult.data.tree


        //Filter to the backup folder
        let theDirSha = tree.find(r => r.path == directoryPath)?.sha

        //If it exists, remove it.
        if (theDirSha) {

            //Get the tree for the backup folder
            let theDirResult = await axios.get(`${GithubService.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/git/trees/${theDirSha}`, {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                },
                params: { recursive: true }
            })

            let theDirTree = theDirResult.data.tree


            let theTree = theDirTree
                .filter(({ type }) => type === "blob")
                .map((blob) => {

                    return {
                        path: `${directoryPath}/${blob.path}`,
                        mode: blob.mode,
                        type: blob.type,
                        sha: null
                    }
                })


            const newTreeSha = await this.createTree(treeSha, theTree, channel, gitProvider)

            await this.createCommit(currentCommit.sha, newTreeSha, channel, `Deleting ${directoryPath}`, gitProvider)

        }
    }



    async deleteContractBackup(channel: Channel, gitProvider) {

        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        this.logPublishProgress(`Deleting existing contract files from repo...`)


        await this.deleteDirectory(channel, gitProvider, "backup/contract")

    }




    private logPublishProgress(message: string) {

        console.log(message)

        if (typeof window !== "undefined" && typeof window.document !== "undefined") {
            // browser
            const imageSelectedEvent = new CustomEvent('publish-progress', {
                detail: { message: message }
            })

            document.dispatchEvent(imageSelectedEvent)

        }

    }


    chunkIt(gitActions: any[], perChunk: number) {

        let chunks = []
    
        //Break into rows
        for (let i = 0; i < gitActions.length; i += perChunk) {
            let chunk = gitActions.slice(i, i + perChunk)
            chunks.push(chunk)
        }
    
        return chunks
    }
    

}



export {
    GithubService
}