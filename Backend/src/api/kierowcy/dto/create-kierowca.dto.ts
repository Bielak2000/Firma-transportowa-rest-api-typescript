import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateKierowcaDto {
    @IsString()
    @IsNotEmpty()
    readonly pesel: string;

    @IsNumber()
    readonly stawka: number;

    @IsString()
    readonly nr_telefonu: string;

    @IsString()
    readonly imie: string;

    @IsString()
    readonly nazwisko: string;

}