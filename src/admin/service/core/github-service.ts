import axios from "axios";
import { injectable } from "inversify";
import moment from "moment";

import { Channel } from "../../dto/channel.js";
import { ForkInfo, GitProviderService } from './git-provider-service.js';

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

        //Look for an existing fork and just return it.
        let existingFork = await this.getExistingFork(channel)
        if (existingFork) return existingFork



        let url = `${GithubService.BASE_URL}/repos/${GithubService.READER_REPO_OWNER}/${GithubService.READER_REPO}/generate`

        //Create a new one
        let response = await axios.post(url, {
            owner: gitProvider.username,
            name: this.getBranchName(channel),
            include_all_branches: false,
            'private': false

        }, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })

        let repoInfo = response.data



        return  {
            id: repoInfo.id,
            httpUrlToRepo: repoInfo.html_url,
            path: repoInfo.name,
            branch: "master"
        }
    }


    public async getExistingFork(channel: Channel): Promise<ForkInfo> {

        let settings = await this.settingsService.get()

        let gitProvider = settings.gitProviders["github"]


        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }


        try {

            let url = `${GithubService.BASE_URL}/repos/${gitProvider.username}/${this.getBranchName(channel)}`

            let response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            })
    
            let repoInfo = response.data
    
            if (repoInfo.id) {
    
                return {
                    id: repoInfo.id,
                    httpUrlToRepo: repoInfo.html_url,
                    path: repoInfo.name,
                    branch: "master"
                }
        
            }


        } catch(ex) {}





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

    async commit(channel, actions, gitProvider) : Promise<string> {

        this.logPublishProgress(`Commiting reader data for ${channel.title} to GitHub: ${actions.length} actions`)

        let oid = await this.getMostRecentCommitOid(channel, gitProvider)

        const additions = actions.map((a) => {
            return {
                path: a.file_path.slice(1),
                contents: Buffer.from(a.content).toString('base64')
            }
        })

        let headline = `Commiting reader data for ${channel.title}`

        const mutation = `
            mutation createCommit($additions: [FileAddition!]!, $oid: GitObjectID!) {
                createCommitOnBranch (input: {
                    branch : {
                        repositoryNameWithOwner: "${gitProvider.username}/${this.getBranchName(channel)}"
                        branchName: "master"
                    }
                    message: {
                        headline: "${headline}"
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

        let latestCommit = await this.getMostRecentCommit(channel, gitProvider)
        
        this.logPublishProgress(`Commit successful: ${latestCommit.sha}`)

        return latestCommit.sha


    }

    // private async createBranch(channel, gitProvider) {

    //     console.log("Creating branch")

    //     let oid = await this.getMostRecentCommitOid(channel, gitProvider)

    //     const getRespositoryId = await axios.post(GithubService.GRAPHQL_URL, { 
    //         query: `
    //             query {
    //                 repository(owner: "${gitProvider.username}", name: "large-reader") {
    //                     id
    //                 }
    //             }
    //         `
    //     }, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${gitProvider.personalAccessToken}`
    //         }
    //     })


    //     const mutation = `
    //         mutation {
    //             createRef(input: {
    //                 repositoryId: "${getRespositoryId.data.data.repository.id}",
    //                 name: "refs/heads/${this.getBranchName(channel)}",
    //                 oid: "${oid}"
    //             }) {
    //                 ref {
    //                     name
    //                         target {
    //                         oid
    //                         }
    //                 }
    //             }
    //         }
    //     `

    //     const createBranchResult = await axios.post(
    //         GithubService.GRAPHQL_URL,
    //         {
    //             query: mutation,
    //         },
    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${gitProvider.personalAccessToken}`
    //             }
    //         }
    //     )

    //     console.log("Created branch")


    // }

    async getIPFSActionStatus(channel: Channel): Promise<string> {
    
        let settings = await this.settingsService.get()

        let gitProvider = settings.gitProviders["github"]

        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        try {
            
            let result = await this.getMostRecentActionRun(channel, gitProvider)

            if (result?.conclusion == "success" && (!channel.publishReaderIPFSStatus?.date || moment(result.created_at).isAfter(moment(channel.publishReaderIPFSStatus?.date)))) {
                return "finished"
            }

        } catch(ex) {
            console.log(ex)
        }

    }

    async getIPFSActionResult(channel: Channel) : Promise<any> {

        let settings = await this.settingsService.get()

        let gitProvider = settings.gitProviders["github"]

        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`)
        }


        try {

            //Get ipfs.json from repo
            const ipfsJsonResults = await axios.get(`${GithubService.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/contents/ipfs/ipfs.json`, {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            })

            let result = JSON.parse(Buffer.from(ipfsJsonResults.data.content, 'base64').toString())

            result.archive = `${channel.httpUrlToRepo}/blob/master/ipfs/${result.cid}.car`

            return result

        } catch(ex) {
            console.log(ex)
        }


    }

    async getProductionURIInfo(channel: Channel): Promise<any> {
        

        function getGitHubUsername(url) {

            const path = url.replace("https://github.com/", "");
          
            // Split the remaining path into parts
            const parts = path.split("/");
          
            // Extract the username and repository name
            const username = parts[0];
            
            return username

          }


        return {
            hostname: `https://${getGitHubUsername(channel.httpUrlToRepo)}.github.io`,
            baseURI: `/${this.getBranchName(channel)}/`
        }

    }

    private async getMostRecentActionRun(channel, gitProvider) {

        if (!channel.publishReaderIPFSStatus?.headSha) return

        const workflowRunResults = await axios.get(`${GithubService.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/actions/workflows/main.yml/runs?per_page=1&page=1&head_sha=${channel.publishReaderIPFSStatus.headSha}`, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })

        if (workflowRunResults.data.workflow_runs?.length > 0) {
            return workflowRunResults.data.workflow_runs[0]
        }
        
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

    async deleteReaderBackup(channel: Channel, gitProvider) {

        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        this.logPublishProgress(`Deleting existing files from repo...`)


        await this.deleteDirectory(channel, gitProvider, ".upload")


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
        let currentCommitResult = await axios.get(`${GithubService.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/commits/master`, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })

        return currentCommitResult.data
    }

    async getMostRecentCommitOid(channel, gitProvider) {

        const query = `
            query GetBranch{
                repository (name: "${this.getBranchName(channel)}", owner: "${gitProvider.username}") {
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

    getBranchName(channel) {
        return channel.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()
    }

}



export {
    GithubService
}