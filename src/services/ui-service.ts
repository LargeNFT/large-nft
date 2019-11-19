class UiService {

    constructor(public app) {}

    navigate(url: string, reloadCurrent=true, ignoreCache=false) {
        this.app.view.main.router.navigate(url, {
            reloadCurrent: reloadCurrent,
            ignoreCache: ignoreCache
        })
    }

    showExceptionPopup(ex) {

        if (ex.name == "IpfsException") {
            this.app.dialog.alert(ex.message, "Problem connecting to IPFS")
        } else {
            this.app.dialog.alert(ex.message, "There was an error")
        }
    }

    showPopup(message) {
        this.app.dialog.alert(message)
    }



    async loadComponentState(component, showSpinner = true) {

        if (showSpinner) this.app.preloader.show()


        let context = component.$route.context

        //Get promise from component and await it. Then set the state to the result.
        let model = await context.fn()

        component.$setState(model)

        if (showSpinner) this.app.preloader.hide()
    }

    showSpinner() {
        this.app.preloader.show()
    }


    hideSpinner() {
        this.app.preloader.hide()
    }
}

export {
    UiService
}