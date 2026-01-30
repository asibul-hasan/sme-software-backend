import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@kormo-erp/database';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        DatabaseModule,
        SeedModule,
    ],
})
class SeedRunnerModule { }

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(SeedRunnerModule);
    const seedService = app.get(SeedService);

    try {
        await seedService.seed();
        console.log('Seed completed successfully');
    } catch (error) {
        console.error('Seed failed', error);
    } finally {
        await app.close();
    }
}

bootstrap();
