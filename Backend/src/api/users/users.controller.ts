import {NextFunction, Request, Response} from "express";
import {createUser, getUserByEmail} from "./users.service";
import {UserExistsException} from "../../exceptions/user-existst.exception";
import {BadRequestException} from "../../exceptions/bad-request-exception";
import {CreateUserDto} from "./dro/create-user.dto";
import {UserDto} from "./dro/user.dto";
import {RequestWithUser} from "../../types/Express";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as CreateUserDto;

    let user = await getUserByEmail(data.email);

    if (user) {
        return next(new UserExistsException());
    }

    try {
        const newUser = await createUser(req.body);
        res.status(201).json(new UserDto(newUser));
    } catch (err) {
        console.log(err);
        return next(new BadRequestException());
    }

}

export const whoami  = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as RequestWithUser).user;
    // w user bedziemy mieć jedynie id z tokenu
    return res.json(user);
}