import { Module, Global } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '@kormo-erp/database';
import { SubscriptionGuard } from './guards/subscription.guard';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Company])],
    providers: [
        SubscriptionGuard,
        {
            provide: APP_GUARD,
            useClass: SubscriptionGuard,
        },
    ],
    exports: [SubscriptionGuard],
})
export class SubscriptionModule { }