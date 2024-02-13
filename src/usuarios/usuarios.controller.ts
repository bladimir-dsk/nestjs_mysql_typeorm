import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/createusuario.dto';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';
import { createPerfilDto } from './dto/createperfil.dto';

@Controller('usuarios')
export class UsuariosController {

    constructor(private usuarioService: UsuariosService){}

    @Post()
    createUsers(@Body() newUsuario: CreateUsuarioDto ){   
        return this.usuarioService.createuser(newUsuario);
    }

    @Get()
    getUsers(): Promise<Usuario[]>{
        return this.usuarioService.getUsers();
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe)id: number){
        return this.usuarioService.getUser(id);

    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe)id: number){
        return this.usuarioService.deleteUser(id);

    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe)id: number, @Body() newUsuario: UpdateUsuarioDto){
        return this.usuarioService.updateUser(id, newUsuario);
    }

    @Post(':id/perfil')
    createPerfil(@Param('id', ParseIntPipe)id: number, @Body() perfil: createPerfilDto ){
       return this.usuarioService.createPerfil(id, perfil)

    }




}
