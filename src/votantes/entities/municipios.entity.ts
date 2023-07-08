import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Municipios {
    @PrimaryGeneratedColumn()
    id: string;

    @Column('text')
    municipio: string;
}