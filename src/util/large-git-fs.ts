import DefaultBackend from '@isomorphic-git/lightning-fs/src/DefaultBackend.js'
const toBuffer = require('it-to-buffer')

class LargeFSBackend extends DefaultBackend {

    ipfs

    ipfsFileList:IPFSFilelist = new IPFSFilelist()

    async writeFile(filepath, data, opts) {

        let directory = getDirectory(filepath)

        //Check for files we want to get from IPFS or local
        let dirContents = this.ipfsFileList.readdir(directory) 
        if (dirContents?.length > 0) return

        return super.writeFile(filepath, data, opts)
    }

    async readFile(filepath, opts) {

        let fileInfo = this.ipfsFileList.getFileInfoByFilepath(filepath)

        if (fileInfo.ipfsDir) {

            //get the actual file contents from IPFS
            return toBuffer(this.ipfs.files.read(`${fileInfo.ipfsDir}/${fileInfo.filename}`)) 
        }

        if (fileInfo.content) {
            return fileInfo.content
        }


        //For most files get from LightningFS
        return super.readFile(filepath, opts)
    }

    readdir(filepath, opts) {

        //Check for files we want to get from IPFS or local
        let dirContents = this.ipfsFileList.readdir(filepath)
        if (dirContents) return dirContents

        return super.readdir(filepath)
    
    }



}


interface FileInfo { 
    filename: string
    ipfsDir: string
    content: any 
}


class IPFSFilelist {

    directoryFileInfoMap = new Map<string, FileInfo[]>()

    addFile(toDirectory, filename, ipfsDir, content) {

        let file = {
            filename: filename,
            ipfsDir: ipfsDir,
            content: Buffer.from(content) 
        }

        let files = this.directoryFileInfoMap.get(toDirectory)

        if (!files) {

            files = [file]
            this.directoryFileInfoMap.set(toDirectory, files)

        } else {

            files.push(file)

        }

    }

    readdir(directory) : string[] {
        return this.directoryFileInfoMap.get(directory)?.map( f => f.filename)
    }



    getFileInfoByFilepath(filepath) {

        let directory = getDirectory(filepath)
        let filename = getFilename(filepath)

        //Match on filename
        let match = this.directoryFileInfoMap.get(directory).filter( f => f.filename == filename)

        if (match?.length > 0) {
            return match[0]
        }
    }



}


const getDirectory(filepath) {
    return filepath.substring(0, filepath.lastIndexOf('/'))
}

const getFilename(filepath) {
    return filepath.substring(filepath.lastIndexOf('/') + 1, filepath.length - 1)
}


export {
    LargeFSBackend, IPFSFilelist
}
