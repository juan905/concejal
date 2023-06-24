import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Barrio {
    @PrimaryGeneratedColumn()
    id: string;

    @Column('text')
    nombreBarrio: string;

    @Column('text')
    comuna: string;


}