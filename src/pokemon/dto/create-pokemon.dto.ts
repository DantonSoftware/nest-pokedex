import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

    // isInt, IsPositive,  min
    @IsInt()
    @IsPositive()
    @Min(1)
    no!: number;

    // isString, MinLength
    @IsString()
    @MinLength(1)
    name!: string;

}
