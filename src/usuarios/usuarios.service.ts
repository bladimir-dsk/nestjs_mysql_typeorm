import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/createusuario.dto'
import { createPerfilDto } from './dto/createperfil.dto';
import { Perfil } from './perfil.entity';




@Injectable()
export class UsuariosService {
    constructor(@InjectRepository(Usuario) private usuarioRepository
    : Repository<Usuario>,
    @InjectRepository(Perfil) private perfilRepository: Repository<Perfil> ){}


    async createuser(usuario: CreateUsuarioDto){
        //buscamos con el finone el usuario 
    const userFound = await this.usuarioRepository.findOne({
            where: {
                username: usuario.username
            }
        })
        //creamos una condicional, si encontramos el usuario es por que ya existe, retornamos un http
    if(userFound){
        //devolvemos un error, una excepcion  esperando el mensaje. y incluyemos el numero de error.
        return new HttpException('el usuario existe', HttpStatus.CONFLICT)
    }

    const newUsuario = this.usuarioRepository.create(usuario);
    return this.usuarioRepository.save(newUsuario)

    }

    getUsers(){
        return this.usuarioRepository.find()
    }

    async getUser(id: number){
    const userFound = await this.usuarioRepository.findOne({where: {id: id}})
    if(!userFound){
        return new HttpException('usuario no existe', HttpStatus.NOT_FOUND);
    }

    return userFound;
    }

    async deleteUser(id: number){
        const userFound = await this.usuarioRepository.findOne({where: {id: id}})

        if(!userFound){
            return new HttpException('el usuario no existe', HttpStatus.NOT_FOUND);
        }
        return this.usuarioRepository.delete({id});
    }

    async updateUser(id: number, Usuario: UpdateUsuarioDto){
        const userFound = await this.usuarioRepository.findOne({where: {id: id}})

        if(!userFound){
            return new HttpException('el usuario no existe', HttpStatus.NOT_FOUND);
        }
        const updateUsuario = Object.assign(userFound, Usuario)
        return this.usuarioRepository.save(updateUsuario);

    }

    async createPerfil(id: number, perfil: createPerfilDto)
    {
    const userFound = await this.usuarioRepository.findOne({where:{id}})
    if(!userFound){
            return new HttpException('el usuario no existe', HttpStatus.NOT_FOUND);
    }
    const newProfile = this.perfilRepository.create(perfil)
    const savedPerfil = await this.perfilRepository.save(newProfile)
    userFound.perfil = savedPerfil


    return this.usuarioRepository.save(userFound);
    }
}
