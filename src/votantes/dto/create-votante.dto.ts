import { IsOptional, IsString } from "class-validator";

export class CreateVotanteDto {

    @IsString()
    nombre: string;

    @IsString()
    nombreLider: string;

    @IsString()
    cedula: string;

    @IsString()
    telefono: string;

    @IsString()
    lugarVotacion: string;

    @IsString()
    mesaVotacion: string;

    @IsString()
    @IsOptional()
    aliado?: string;

    @IsString()
    municipio: string;
    
    @IsString()
    @IsOptional()
    barrio?: string;

    @IsString()
    direccion: string;



}
