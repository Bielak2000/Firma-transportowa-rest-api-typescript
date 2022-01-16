import {RequestHandler} from "express";
import {validate, ValidationError} from "class-validator";
import {ClassConstructor, plainToInstance} from "class-transformer";

export function bodyValidate<T extends object>(type: ClassConstructor<T>): RequestHandler {
    return (req, res, next) => {
        let input = plainToInstance(type, req.body);

        // w takim przypadku walidator powinien zwrocic blad \/
        validate(input).then((errors: ValidationError[]) => {
                if (errors.length == 0){
                    req.body = input as any;
                    next();
                }
                else next(errors)
            }
        )
    }
}