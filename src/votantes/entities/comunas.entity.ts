import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Comuna {
    @PrimaryGeneratedColumn()
    id: string;

    @Column('text')
    nombreComuna: string;

}