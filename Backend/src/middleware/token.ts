import { Request, Response, NextFunction } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {AccessDeniedException} from "../exceptions/access-denied.exception";
import {verifyJwt } from "../services/jwt";
import {RequestWithUser} from "../types/Express";

/*
    Rozwijanie funkcji (ang. currying)
    const add = x => y => x + y

    Może być interpetowany jako:
    function add(x){
        return function(y){
            return x + y
        }
    }
 */
export const token = (required = true) => (req: Request, res: Response, next: NextFunction) => {
    const tokenCookie = req.cookies.auth
    if (!tokenCookie) return next(new AccessDeniedException());
    let decodedToken: JwtPayload;

    try {
        decodedToken = verifyJwt(tokenCookie) as JwtPayload;
    } catch {
        return next(new AccessDeniedException());
    }


    const user = {
        id: parseInt(decodedToken.sub!)
    }

    if ((required && !user)) {
        return next(new AccessDeniedException());
    }

    (req as RequestWithUser).user = user;
    next();
};