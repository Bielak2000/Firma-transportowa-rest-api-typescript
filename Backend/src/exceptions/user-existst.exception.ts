import {HttpException} from "./http-exception";

export class UserExistsException extends HttpException {
    constructor(message = "User already exists") {
        super(409, message);
    }
}
