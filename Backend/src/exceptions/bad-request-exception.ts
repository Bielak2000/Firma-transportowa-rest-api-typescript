import {HttpException} from "./http-exception";

export class BadRequestException extends HttpException {

    constructor(message = "Bad request" , status = 400) {
        super(status, message);
    }
}
