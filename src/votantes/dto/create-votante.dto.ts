import { IsString } from "class-validator";

export class CreateVotanteDto {

    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsString()
    cedula: string;

    @IsString()
    telefono: string;

    @IsString()
    lugarVotacion: string;

    
    @IsString()
    mesaVotacion: string;

    
    @IsString()
    aliado: string;

    
    @IsString()
    municipio: string;

    
    @IsString()
    barrio: string;


}
