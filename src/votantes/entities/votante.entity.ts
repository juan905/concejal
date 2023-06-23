import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Votante {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column('text',{
        unique: true
    })
    cedula: string;

    @Column()
    telefono: string;
    
    @Column()
    lugarVotacion: string;

    @Column()
    mesaVotacion: string;

    @Column()
    aliado: string;

    @Column()
    municipio: string;

    @Column()
    barrio: string;
}
