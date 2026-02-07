import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, Designation, UserLog } from '@kormo-erp/database';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CommonModule } from '../../../common/common.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Designation, UserLog]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: configService.get('JWT_EXPIRATION') || '1d' as any },
            }),
            inject: [ConfigService],
        }),
        CommonModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }