import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import {Usuario} from 'src/usuarios/usuario.entity'

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column()
    content: string
    @Column()
    authorId: number

    @ManyToOne(() => Usuario, usuario => usuario.posts)
    author: Usuario
}