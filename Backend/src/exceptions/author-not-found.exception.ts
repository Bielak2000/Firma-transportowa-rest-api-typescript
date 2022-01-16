import {HttpException} from "./http-exception";

export class AuthorNotFoundException extends HttpException {
    constructor(message = "Author not found") {
        super(404, message);
    }
}
