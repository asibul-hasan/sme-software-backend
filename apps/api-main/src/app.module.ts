import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from '@kormo-erp/database';
import { AuthModule as AuthLibModule, JwtAuthGuard } from '@kormo-erp/auth';
import { SubscriptionModule, SubscriptionGuard } from '@kormo-erp/subscription';
import { CommonModule } from './common/common.module';
import { PermissionGuard } from './common/guards/permission.guard';
import { ModuleGuard } from './common/guards/module.guard';
import { AuthModule } from './modules/core/auth/auth.module';
import { UserModule } from './modules/core/user/user.module';
import { SeedModule } from './seed/seed.module';
import { EmployeeModule } from './modules/hr/employee/employee.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        DatabaseModule,
        AuthLibModule,
        SubscriptionModule,
        CommonModule,
        AuthModule,
        UserModule,
        SeedModule,
        EmployeeModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: ModuleGuard,
        },
        {
            provide: APP_GUARD,
            useClass: PermissionGuard,
        },
    ],
})
export class AppModule { }