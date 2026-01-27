import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Designation } from '@kormo-erp/database';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Designation]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }