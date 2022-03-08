import {Buffer} from 'buffer'
import { injectable } from 'inversify';
import { IpfsService } from './core/ipfs-service';

@injectable()
class UploadService {

  constructor(
      private ipfsService:IpfsService
  ) {}

  async uploadFile(fileElement) {

    const self = this;

    let ipfsCid = '';

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async function () {
        // @ts-ignore
        const buf = new Buffer(reader.result)

        if (buf) {

          try {
            ipfsCid = await self.ipfsService.ipfs.add( buf)
          } catch (ex) {
            reject(ex)
          }

        }

        //@ts-ignore
        resolve(ipfsCid.path);
      };

      if (fileElement.files.length > 0) {
        reader.readAsArrayBuffer(fileElement.files[0]);
      } else {
        resolve(ipfsCid);
      }

    });
  }

}




export { UploadService }

