import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CursoController } from './curso.controller';
import { CursoService } from './curso.service';

@Module({
  controllers: [CursoController],
  providers: [CursoService, PrismaService]
})
export class CursoModule {}
