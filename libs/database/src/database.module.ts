import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global() // Make it global so we don't need to import everywhere
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const databaseUrl = configService.get<string>('DATABASE_URL');
                const isDev = configService.get('NODE_ENV') === 'development';
                console.log('DatabaseModule: Connecting...', { hasUrl: !!databaseUrl, env: configService.get('NODE_ENV') });

                // If a DATABASE_URL is provided (e.g. Neon), prefer it.
                if (databaseUrl) {
                    const config: any = {
                        type: 'postgres',
                        url: databaseUrl,
                        autoLoadEntities: true,
                        synchronize: true, // AUTO-CREATE TABLES
                        logging: isDev,
                    };

                    // If the URL indicates SSL (common with Neon), add ssl config so pg accepts the connection.
                    // We set rejectUnauthorized to false here because many managed Postgres providers
                    // require it; adjust for your security needs.
                    if (databaseUrl.includes('sslmode=require') || databaseUrl.includes('sslmode=prefer')) {
                         config.extra = {
                            ssl: {
                                rejectUnauthorized: false,
                            },
                        };
                    }

                    return config;
                }

                // Fall back to explicit DB_* variables for local Postgres
                return {
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: parseInt(configService.get('DB_PORT') || '5432', 10),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    autoLoadEntities: true, // This will auto-load all entities
                    synchronize: true, // EQ: AUTO-CREATE TABLES
                    logging: isDev,
                };
            },
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule { }