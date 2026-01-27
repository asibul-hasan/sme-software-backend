import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global() // Make it global so we don't need to import everywhere
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                autoLoadEntities: true, // This will auto-load all entities
                synchronize: false, // NEVER true in production
                logging: configService.get('NODE_ENV') === 'development',
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule { }