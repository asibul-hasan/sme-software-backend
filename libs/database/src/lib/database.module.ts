import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as entities from '../entities';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        console.log('DatabaseModule (Lib): Connecting...', { hasUrl: !!databaseUrl, env: configService.get('NODE_ENV') });

        if (databaseUrl) {
            const config: any = {
                type: 'postgres',
                url: databaseUrl,
                entities: Object.values(entities),
                synchronize: true,
                logging: true,
            };
            if (databaseUrl.includes('sslmode=require') || databaseUrl.includes('sslmode=prefer')) {
                config.extra = {
                    ssl: {
                        rejectUnauthorized: false,
                    },
                };
            }
            return config;
        }

        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: Object.values(entities),
          synchronize: true, // Auto-create tables (dev only)
          logging: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule { }
