import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Prisma, Curso as CursoModel } from '@prisma/client';
import { CreateCursoDTO } from './dto/createCurso.dto';
import { EditCursoDTO } from './dto/editCurso.dto';
import { CursoService } from './curso.service';

@Controller('curso')
export class CursoController {
    constructor(private readonly cursoService: CursoService){}

    @Get()
    async getCursos(): Promise<CursoModel[]> {
        return this.cursoService.getCursos();
    }

    @Get(':id')
    async getCursoById(@Param('id') id: number): Promise<CursoModel> {
        return this.cursoService.getCursoById(id);
    }

    @Post()
    //CreateCursoDTO or Prisma.CursoCreateInput
    async createCurso(@Body() cursoData: CreateCursoDTO): Promise<CursoModel> {
        return this.cursoService.creteCurso(cursoData);
    }

    @Put(':id')
    async updateCurso(@Body() cursoData: EditCursoDTO, @Param('id') cursoId: number): Promise<CursoModel> {
        cursoData.cursoId = cursoId;
        return this.cursoService.updateCurso(cursoData);
    }

    @Delete(':id')
    async deleteCurso(@Param('id') cursoId: number) {
        return this.cursoService.deleteCurso(cursoId);
    }
}
