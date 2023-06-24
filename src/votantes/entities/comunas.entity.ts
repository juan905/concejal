import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Comuna {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    nombreComuna: string;

}