import {RequestHandler} from "express";
import {validate, ValidationError} from "class-validator";
import {ClassConstructor, plainToInstance} from "class-transformer";

export function queryValidate<T extends object>(type: ClassConstructor<T>): RequestHandler {
    return (req, res, next) => {
        let input = plainToInstance(type, req.query);

        validate(input).then((errors: ValidationError[]) => {
                if (errors.length == 0){
                    req.query = input as any;
                    next();
                }
                else next(errors)
            }
        )
    }
}