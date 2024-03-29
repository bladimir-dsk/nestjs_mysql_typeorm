import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('user_profile')
export class Perfil{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    firsname: string
    @Column()
    lastname: string
    @Column({nullable: true})
    age: number
}