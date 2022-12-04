import { Buffer } from 'buffer'
import { injectable } from 'inversify';

@injectable()
class UploadService {

  constructor(
  ) {}

  async uploadFile(fileElement) : Promise<Buffer> {

    const self = this;

    let buf

    return new Promise((resolve, reject) => {

      const reader = new FileReader()

      reader.onload = async function () {
        // @ts-ignore
        buf = new Buffer(reader.result)

        if (buf) {
          resolve(buf)
        }

      };

      if (fileElement.files.length > 0) {
        reader.readAsArrayBuffer(fileElement.files[0])
      } else {
        resolve(buf)
      }

    });
  }

}




export { UploadService }

