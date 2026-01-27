import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const seedService = app.get(SeedService);

    try {
        console.log('🌱 Starting seed...');
        await seedService.seed();
        console.log('✅ Seeding completed successfully');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    } finally {
        await app.close();
    }
}

bootstrap();