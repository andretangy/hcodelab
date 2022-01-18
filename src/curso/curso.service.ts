import { Injectable } from '@nestjs/common';
import { Prisma, Curso as CursoModel } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EditCursoDTO } from './dto/editCurso.dto';

@Injectable()
export class CursoService {
    
    constructor(private prisma: PrismaService) {} 

    async getCursos(): Promise<CursoModel[]> {
        return this.prisma.curso.findMany({});
    } 

    async getCursoById(id: number): Promise<CursoModel> {
        return this.prisma.curso.findUnique({
            where: { id: Number(id) }
        });
    } 
    
    async creteCurso(data:Prisma.CursoCreateInput): Promise<CursoModel> {
        return this.prisma.curso.create({
            data
        });
    }

    async updateCurso(cursoData: EditCursoDTO): Promise<CursoModel> {
        const {nome, descricao, tipo, cursoId} = cursoData;
        return this.prisma.curso.update({
            where: { id: Number(cursoId) },
            data: {nome, descricao, tipo}
        });
    }

    async deleteCurso(cursoId: number): Promise<CursoModel> {
        return this.prisma.curso.delete({
            where: { id: Number(cursoId) }
        });
    }
}