import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UtilsService } from '../utils/utils.service';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDTO } from './dto/editUser.dto';


@Injectable()
export class UserService {
    
    constructor(private prisma: PrismaService, private utilsService: UtilsService) {} 

    async getUsers(): Promise<UserModel[]> {
        return this.prisma.user.findMany({});
    } 

    async getUserById(id: number): Promise<UserModel> {
        return this.prisma.user.findUnique({
            where: { id: Number(id) }
        });
    } 

    //se seus pacotes forem muito úteis, cria o NPM packege,
    //privado, repositório do NPM.
    
    async creteUser(data:Prisma.UserCreateInput): Promise<UserModel> {

        //ao criar a senha estavom enviando o parâmetro data.
        data.password = await this.utilsService.convertPassword(data.password);
        //data.password = senha criptografada
        const user = await this.prisma.user.create({
            data
        });
        //envio do e-mail, se user existe!
        if (user) {
            //envie o e-mail
            const send = await this.utilsService.sendMail(user.email, 'Emerj - Bemvindo'); 
        } else {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: 'Falha ao cadastrar usuário!'
                },
                HttpStatus.FORBIDDEN
            );
        }
        return user;
    }

    async updateUser(userData: EditUserDTO): Promise<UserModel> {
        const {name, email, password, userId} = userData;
        const hashedPassword = await this.utilsService.convertPassword(password);
        return this.prisma.user.update({
            where: { id: Number(userId) },
            data: {name, email, password: hashedPassword}
        });
    }

    async deleteUser(userId: number): Promise<UserModel> {
        return this.prisma.user.delete({
            where: { id: Number(userId) }
        });
    }
}