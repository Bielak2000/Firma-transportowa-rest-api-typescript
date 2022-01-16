import {UserEntity} from "../../../typeorm/entities/user.entity";

export class UserDto {
    readonly email: string;
    readonly password: string;


    constructor(entity: UserEntity) {
        this.email = entity.email;
    }
}