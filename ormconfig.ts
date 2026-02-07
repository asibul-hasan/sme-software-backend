import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const databaseUrl = process.env.DATABASE_URL;

const baseConfig: any = {
    type: 'postgres',
    entities: ['libs/database/src/entities/**/*.entity.ts'],
    migrations: ['apps/api-main/src/migrations/**/*.ts'],
    synchronize: false,
};

if (databaseUrl) {
    baseConfig.url = databaseUrl;
    if (databaseUrl.includes('sslmode=require') || databaseUrl.includes('sslmode=prefer')) {
        baseConfig.extra = {
            ssl: {
                rejectUnauthorized: false,
            },
        };
    }
} else {
    baseConfig.host = process.env.DB_HOST;
    baseConfig.port = parseInt(process.env.DB_PORT || '5432');
    baseConfig.username = process.env.DB_USER;
    baseConfig.password = process.env.DB_PASSWORD;
    baseConfig.database = process.env.DB_NAME;
}

export default new DataSource(baseConfig);