import {CookieOptions, NextFunction, Request, Response} from 'express';
import {UserNotFoundException} from "../../exceptions/user-not-found.exception";
import {AccessDeniedException} from "../../exceptions/access-denied.exception";
import {sign} from "../../services/jwt";
import {httpAuthDecrypt} from "../../services/basic-auth";
import {BadRequestException} from "../../exceptions/bad-request-exception";
import {matchPassword} from "../../services/password";
import {UserDto} from "../users/dro/user.dto";
import {getUserByEmail} from "../users/users.service";
import { Console } from 'console';

export const basicAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return next(new AccessDeniedException());
    }
    const [email, password] = httpAuthDecrypt(authHeader);

    try {
        const user = await getUserByEmail(email);
        // Znajdz uzytkownika
        if (!user) {
            return next(new UserNotFoundException());
        }
        // Sprawdz hasla
        if (!(await matchPassword(user.password, password))) {
            return next(new AccessDeniedException());
        }
        // Wygeneruj token
        const token = sign(user.id);                                    // Do jednoznacznej identyfikacji uzytkownika wystarczy jego ID (klucz glowny) lub email
        // Takie rzeczy powinny byc gdzies w globalnym configu
        // https://sekurak.pl/flaga-cookies-samesite-jak-dziala-i-przed-czym-zapewnia-ochrone/
        const publicCookies: CookieOptions = {
            secure: process.env.NODE_ENV === 'production',                          // Wysyłane tylko po HTTPS (wylaczyc dla deweloperki)
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',    // Wysylane tylko do tej samej domeny (wyłaczyc dla deweloperki). Nie zadziala w chrome w trybie dev!
            maxAge: 1000 * 60 * 60 * 1,                                           // Czas przechowywania przez przegladarke (12h - tozsamy z dlugoscia zycia tokenu)
        }
        const httpCookie: CookieOptions =  {
            ...publicCookies,
            httpOnly: true,                                                         // Bez dostepu przez JS
        }
        res.cookie('auth', token, httpCookie);
        res.cookie('isLogged', true, publicCookies);
        return res.send(new UserDto(user))
    } catch (err) {
        return next(new BadRequestException());
    }
};

export const loggOut  = async (req: Request, res: Response, next: NextFunction) => {

    try{
        console.log("sadsad222");
        res.clearCookie("auth");
        res.clearCookie("isLogged");
        return res.send(null);
    }catch(error){
        res.status(500).send(error);
        console.log(error);
    }

};