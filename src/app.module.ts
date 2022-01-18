import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { CursoModule } from './curso/curso.module';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [UserModule, CursoModule, AuthModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
