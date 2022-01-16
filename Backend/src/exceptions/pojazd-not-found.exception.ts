import {HttpException} from "./http-exception";

export class PojazdNotFoundException extends HttpException {
    constructor(message = "Pojazd not found") {
        super(404, message);
    }
}