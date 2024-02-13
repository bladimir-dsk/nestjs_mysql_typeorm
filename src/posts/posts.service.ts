import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { InjectRepository } from "@nestjs/typeorm";
import {Post} from 'src/posts/post.entity'
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/createpost.dto";

@Injectable()
export class PostsService {

    constructor( @InjectRepository(Post) private postsRepository: Repository<Post>
        , private usuariosService: UsuariosService){}

    async createPost(post: CreatePostDto){
    const userFound = await this.usuariosService.getUser(post.authorId)
    if(!userFound)
        return new HttpException('el usuario no existe', HttpStatus.NOT_FOUND)
    
    
    const newPost = this.postsRepository.create(post)
    return this.postsRepository.save(newPost);
    }
    getPosts(){
        return this.postsRepository.find();
    }
}