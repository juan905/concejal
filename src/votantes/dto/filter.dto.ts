import { IsString } from "class-validator";

export class FilterVotanteDto {
    @IsString()
    barrio: string
}