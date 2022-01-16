import {HttpException} from "./http-exception";

export class KierowcaNotFoundException extends HttpException {
    constructor(message = "Kierowca not found") {
        super(404, message);
    }
}