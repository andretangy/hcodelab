import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    
    @Get()
    async getUsers(): Promise<UserModel[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: number): Promise<UserModel> {
        return this.userService.getUserById(id);
    }

    @Post()
    async createUser(@Body() userData: Prisma.UserCreateInput): Promise<UserModel> {
        return this.userService.creteUser(userData);
    }

    @Put(':id')
    async updateUser() {
        return 'Executando via put, alteração de um usuário';
    }

    @Delete(':id')
    async deleteUser() {
        return 'Executando dia delete, excluindo um usuário';
    }

    

}
