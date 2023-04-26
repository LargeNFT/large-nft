import axios from "axios";
import { injectable } from "inversify";

import { Channel } from "../../dto/channel.js";
import { ExistingForkInfo, ForkInfo, GitProviderService } from './git-provider-service.js';

import { SettingsService } from './settings-service.js';

@injectable()
class GithubService implements GitProviderService {

    static BASE_URL = 'https://api.github.com'
    static GRAPHQL_URL = 'https://api.github.com/graphql'
    static READER_REPO_OWNER = "LargeNFT"
    static READER_REPO = "large-reader"

    constructor(
        private settingsService: SettingsService,
    ) { }

    async createFork(channel: Channel): Promise<ForkInfo> {

        console.log(`Creating reader fork...`)

        let settings = await this.settingsService.get()

        let gitProvider = settings.gitProviders["github"]


        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        let branchName = channel.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()


        //Look for an existing fork and just return it.
        let existingFork = await this.getExistingFork(channel)

        if (!existingFork) {
            
            let url = `${GithubService.BASE_URL}/repos/${GithubService.READER_REPO_OWNER}/${GithubService.READER_REPO}/forks`

            //Create a new one
            let response = await axios.post(url, {
                name: "large-reader",
                default_branch_only: true
            }, {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            })

            existingFork = {
                id: response.data.id,
                httpUrlToRepo: `${response.data.html_url}.git`,
                path: response.data.name,
                defaultBranch: response.data.default_branch
            }

        }


        let branchInfo

        try {

            //Check if the branch for this project exists    
            let response = await axios.get(`${GithubService.BASE_URL}/repos/${gitProvider.username}/${GithubService.READER_REPO}/branches/${branchName}`, {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            })

            branchInfo = response.data

        } catch(ex) { }


        if (!branchInfo) {
            await this.createBranch(channel, gitProvider)
        }

        return {
            id: existingFork.id,
            path: existingFork.path,
            branch: branchName
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

        //Search for one with the same owner
        let results = forks.filter(f => f.owner.login == gitProvider.username)


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


    }

    async commit(channel, actions, gitProvider) {

        this.logPublishProgress(`Pushing ${actions.length} files to repo...`)

        let oid = await this.getMostRecentCommitOid(gitProvider)

        const additions = actions.map((a) => {
            return {
                path: a.file_path.slice(1),
                contents: Buffer.from(a.content).toString('base64')
            }
        })

        let branchName = channel.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()

        const mutation = `
            mutation createCommit($additions: [FileAddition!]!, $oid: GitObjectID!) {
                createCommitOnBranch (input: {
                    branch : {
                        repositoryNameWithOwner: "${gitProvider.username}/${channel.publishReaderRepoPath}"
                        branchName: "${branchName}"
                    }
                    message: {
                        headline: "feat: Commit through Graphql"
                    }
                    fileChanges: {
                        additions: $additions
                    }
                    expectedHeadOid: $oid
                    }) {
                    commit {
                        commitUrl
                    }
                }
            }
        `;

        const variables = {
            oid: oid,
            additions: additions
        }

        const createCommitResult = await axios.post(
            GithubService.GRAPHQL_URL,
            {
                query: mutation,
                variables: variables
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            }
        )

        this.logPublishProgress(`Successfully pushed ${actions.length} files to repo...`)


    }

    private async createBranch(channel, gitProvider) {

        console.log("Creating branch")

        let oid = await this.getMostRecentCommitOid(gitProvider)

        console.log(oid)
        let branchName = channel.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()


        const getRespositoryId = await axios.post(GithubService.GRAPHQL_URL, { 
            query: `
                query {
                    repository(owner: "${gitProvider.username}", name: "large-reader") {
                        id
                    }
                }
            `
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })


        const mutation = `
            mutation {
                createRef(input: {
                    repositoryId: "${getRespositoryId.data.data.repository.id}",
                    name: "refs/heads/${branchName}",
                    oid: "${oid}"
                }) {
                    ref {
                        name
                            target {
                            oid
                            }
                    }
                }
            }
        `

        const createBranchResult = await axios.post(
            GithubService.GRAPHQL_URL,
            {
                query: mutation,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            }
        )

        console.log("Created branch")


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
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`,
                "Accept": "application/vnd.github+json"
            }
        })


        return createTreeResult.data.sha

    }

    // private async createBlob(content, channel, gitProvider) {

    //     const createBlobResult = await axios.post(`${GithubService.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/git/blobs`, {
    //         content: content.toString('base64'),
    //         encoding: 'base64'
    //     }, {
    //         headers: {
    //             "Authorization": `Bearer ${gitProvider.personalAccessToken}`
    //         }
    //     })


    //     return createBlobResult.data.sha

    // }

    async deleteReaderBackup(channel: Channel, gitProvider) {

        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        this.logPublishProgress(`Deleting existing files from repo...`)

        await this.deleteDirectory(channel, gitProvider, "backup")

        this.logPublishProgress(`Successfully deleted existing backup...`)


    }

    async deleteContractBackup(channel: Channel, gitProvider) {

        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        this.logPublishProgress(`Deleting existing contract files from repo...`)


        await this.deleteDirectory(channel, gitProvider, "backup/contract")

    }

    async getMostRecentCommit(channel, gitProvider) {

        //Get the most recent commit
        let currentCommitResult = await axios.get(`${GithubService.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/commits/${channel.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })

        return currentCommitResult.data
    }

    async getMostRecentCommitOid(gitProvider) {

        const query = `
            query GetBranch{
                repository (name: "large-reader", owner: "${gitProvider.username}") {
                    ref (qualifiedName: "master") {
                        target {
                            ... on Commit {
                                history(first: 1) {
                                    nodes {
                                        oid
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `

        const getOidResult = await axios.post(GithubService.GRAPHQL_URL, JSON.stringify({ query: query }), {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            },
        })

        return getOidResult.data.data.repository.ref.target.history.nodes[0].oid


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