import {HttpException} from "./http-exception";
import {ValidationError} from "class-validator";

export class ValidationException extends HttpException {

    constructor(errors: ValidationError[] , status = 400) {
            super(status, errors.map(e => e.constraints).join(', '));
    }
}
