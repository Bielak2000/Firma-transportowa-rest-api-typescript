import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateTrasaDto {
    @IsNumber()
    @IsNotEmpty()
    readonly ID_pojazdu: number;

    @IsNumber()
    @IsNotEmpty()
    readonly ID_kierowcy: number;

    @IsNumber()
    @IsNotEmpty()
    readonly cena_paliwa: number;

    @IsNumber()
    @IsNotEmpty()
    readonly km: number;

    @IsDate()
    readonly data: Date;

}