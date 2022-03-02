import { injectable, inject } from "inversify";



@injectable()
class UiService {

    constructor(@inject("framework7") public app) {
    }

    showExceptionPopup(ex) {
        console.log(ex)
        this.app.dialog.alert(ex.message, "There was an error")
    }

    showPopup(message) {
        this.app.dialog.alert(message)
    }



    showAlert(message) {
        this.app.dialog.alert(message)
    }


    /**
     * Spinner
     */

    spinnerDialog: any

    showSpinner(message?:string) {

        if (this.spinnerDialog) this.hideSpinner()

        this.spinnerDialog = this.app.dialog.preloader(message ? message : "Loading")
    }


    hideSpinner() {
        if (this.spinnerDialog) {
            this.spinnerDialog.close()
            this.spinnerDialog = null 
        }
    }


    progressDialog:any

    showProgress(message:string) {

        if (this.progressDialog) this.hideProgress()

        var progress = 0

        this.progressDialog = this.app.dialog.progress(message ? message : "Loading", progress)

    }

    setProgress(progress:number, message:string) {
        if (this.progressDialog) {
            this.progressDialog.setProgress(progress)
            this.progressDialog.setText(message)
        }
    }

    hideProgress() {
        if (this.progressDialog) {
            this.progressDialog.close()
            this.progressDialog = null 
        }
    }


}

export {
    UiService
}