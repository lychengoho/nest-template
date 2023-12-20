import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Hero {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    nickname: string;
}
