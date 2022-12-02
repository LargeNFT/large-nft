import { validate, ValidationError } from 'class-validator';


class ValidationException extends Error {

    constructor(
        public errors:ValidationError[]
    ) {
        super()
    }

}

export {
    ValidationException
}