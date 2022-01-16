import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreatePojazdDto {
    @IsString()
    @IsNotEmpty()
    readonly nr_rejestracyjny: string;

    @IsNumber()
    readonly spalanie: number;

    @IsNumber()
    readonly stawka: number;

}