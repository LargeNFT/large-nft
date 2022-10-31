import DefaultBackend from '@isomorphic-git/lightning-fs/src/DefaultBackend.js'
const toBuffer = require('it-to-buffer')

class LargeFSBackend extends DefaultBackend {

    ipfs

    ipfsFileList:IPFSFilelist

    async writeFile(filepath, data, opts) {

        //If we're short-circuiting the read operation we do not actually write.
        let fileInfo = this.ipfsFileList.getFileInfoByFilepath(filepath)
        if (fileInfo) return 
        
        let directory = getDirectory(filepath)

        //Check for files we want to get from IPFS or local
        let dirContents = this.ipfsFileList.readdir(directory) 
        if (dirContents?.length > 0) return

        return super.writeFile(filepath, data, opts)
    }

    async readFile(filepath, opts) {

        let fileInfo = this.ipfsFileList.getFileInfoByFilepath(filepath)

        if (fileInfo) {

            if (fileInfo.ipfsDir) {
                //get the actual file contents from IPFS
                return toBuffer(this.ipfs.files.read(`${fileInfo.ipfsDir}/${fileInfo.filename}`)) 
            }
    
            if (fileInfo.content) {
                console.log(fileInfo.content)
                return Buffer.from(fileInfo.content)
            }
        }

        //For most files get from LightningFS
        return super.readFile(filepath, opts)
    }

    readdir(filepath, opts) {

        let directory = getDirectory(filepath)

        //Check for files we want to get from IPFS or local
        let dirContents = this.ipfsFileList.readdir(directory)

        if (dirContents) {
            // console.log(filepath, dirContents)
            return dirContents
        }

        return super.readdir(filepath)
    
    }



}


interface FileInfo { 
    filename: string
    ipfsDir: string
    content: any 
}


class IPFSFilelist {

    directoryFileInfoMap = {}

    addFile(toDirectory, filename, ipfsDir?, content?) {

        let file = {
            filename: filename,
            ipfsDir: ipfsDir,
            content: content
        }

        let files = this.directoryFileInfoMap[toDirectory]

        // console.log(files)

        if (!files) {
            this.directoryFileInfoMap[toDirectory] = [file]
        } else {

            files.push(file)

        }

    }

    readdir(directory) : string[] {
        return this.directoryFileInfoMap[directory]?.map( f => f.filename)
    }



    getFileInfoByFilepath(filepath) {

        let directory = getDirectory(filepath)
        let filename = getFilename(filepath)

        // console.log(directory, filename)

        //Match on filename
        let match = this.directoryFileInfoMap[directory]?.filter( f => f.filename == filename)

        if (match?.length > 0) {
            return match[0]
        }
    }



}


function getDirectory(filepath) {
    return filepath.substring(0, filepath.lastIndexOf('/'))
}

function getFilename(filepath) {
    return filepath.substring(filepath.lastIndexOf('/') + 1, filepath.length)
}


export {
    LargeFSBackend, IPFSFilelist
}
