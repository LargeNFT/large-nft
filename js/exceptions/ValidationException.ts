  
class ValidationException extends Error {

    constructor(message) {
        super(message)
        this.name = "ValidationException"

        // Use V8's native method if available, otherwise fallback
        if ("captureStackTrace" in Error)
            Error.captureStackTrace(this, ValidationException);
        else
            //@ts-ignore
            this.stack = (new Error()).stack;
    }

}


export {
    ValidationException
}

