import { Injectable } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    
    constructor(private prisma: PrismaService) {} 

    async getUsers(): Promise<UserModel[]> {
        return this.prisma.user.findMany({});
    } 

    async getUserById(id: number): Promise<UserModel> {
        return this.prisma.user.findUnique({
            where: { id: Number(id) }
        });
    } 
    
    async creteUser(data:Prisma.UserCreateInput): Promise<UserModel> {
        return this.prisma.user.create({
            data
        });
    }
}