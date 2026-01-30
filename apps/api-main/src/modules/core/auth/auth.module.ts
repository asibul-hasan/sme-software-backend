import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Designation } from '@kormo-erp/database';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CommonModule } from '../../../common/common.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Designation]),
        CommonModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }