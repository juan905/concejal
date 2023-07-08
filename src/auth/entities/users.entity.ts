import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    identificacion: string;

    @Column()
    password: string;

    @Column()
    roles: string;


}
