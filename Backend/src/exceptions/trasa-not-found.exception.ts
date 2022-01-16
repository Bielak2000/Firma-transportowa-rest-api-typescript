import {HttpException} from "./http-exception";

export class TrasaNotFoundException extends HttpException {
    constructor(message = "Trasa not found") {
        super(404, message);
    }
}