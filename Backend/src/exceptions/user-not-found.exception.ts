import {HttpException} from "./http-exception";

export class UserNotFoundException extends HttpException {
    constructor(message = "User not found") {
        super(404, message);
    }
}
