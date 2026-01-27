import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@kormo-erp/database';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Global()
@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get('JWT_EXPIRATION', '1d'),
                },
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([User]), // Import User entity
    ],
    providers: [JwtStrategy, JwtAuthGuard],
    exports: [JwtModule, JwtAuthGuard, PassportModule],
})
export class AuthModule { }