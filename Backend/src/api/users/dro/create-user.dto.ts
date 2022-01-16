import {IsEmail, IsNotEmpty, IsNumber, IsString, MinLength} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @MinLength(8)
    readonly password: string;
}