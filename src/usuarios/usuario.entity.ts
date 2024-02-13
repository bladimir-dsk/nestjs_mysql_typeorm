import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Perfil } from "./perfil.entity"
import { Post } from "src/posts/post.entity"


@Entity({name: 'usuarios'})
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username: string

    @Column()
    password: string

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({nullable: true})
    authStrategy: string

    @OneToOne(()=> Perfil)
    @JoinColumn()
    perfil: Perfil

    @OneToMany(() => Post, post => post.author)
    posts: Post[]
}