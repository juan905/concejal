import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PuestoVotacion {
    @PrimaryGeneratedColumn()
    id: string;

    @Column('text')
    puesto: string;
}