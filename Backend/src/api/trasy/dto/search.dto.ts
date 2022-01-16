import {IsEnum, IsIn, IsInt, IsOptional, IsString, Max, Min} from "class-validator";
import {SortOrder} from "../../../consts/sortOrder.enum";

export class SearchDto {
    @IsInt()
    @Min(0)
    readonly offset: number = 0;

    @IsInt()
    @Min(1)
    @Max(10)
    readonly limit: number = 10;

    @IsString()
    @IsOptional()
    readonly nr_rejestracyjny?: string;

    @IsIn(["ID_kursu"])
    readonly sortBy = "ID_kursu";

    @IsEnum(SortOrder)
    readonly sortOrder = SortOrder.DESC;
}