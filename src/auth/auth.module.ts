import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './jwt-auth-guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule, 
    PassportModule, 
    JwtModule.register({
      secret: jwtConstants.secret, 
      signOptions: { expiresIn: '7200s' },
    }),
  ],
  controllers: [AuthController],
  providers: [{provide: APP_GUARD, useClass: JwtAuthGuard}, JwtStrategy, AuthService, PrismaService]
})
export class AuthModule {}
