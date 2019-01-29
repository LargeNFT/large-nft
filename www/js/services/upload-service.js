class UploadService {


  async uploadFile(fileElement) {

    const self = this;

    let ipfsCid = '';

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async function () {
        const buf = Buffer(reader.result)

        if (buf) {

          try {
            ipfsCid = await freedom.ipfsPutFile(buf);
          } catch (ex) {
            app.methods.showExceptionPopup(ex)
          }


        }

        resolve(ipfsCid);
      };

      if (fileElement.files.length > 0) {
        reader.readAsArrayBuffer(fileElement.files[0]);
      } else {
        resolve(ipfsCid);
      }

    });
  }

}
