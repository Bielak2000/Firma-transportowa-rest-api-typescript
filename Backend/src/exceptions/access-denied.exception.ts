import {HttpException} from "./http-exception";

export class AccessDeniedException extends HttpException {
    constructor(message = "Access Denied") {
        super(401, message);
    }
}
