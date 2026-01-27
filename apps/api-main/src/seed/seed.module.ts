import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company, Branch, Designation, User, CompanyModule } from '@kormo-erp/database';
import { SeedService } from './seed.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Company, Branch, Designation, User, CompanyModule]),
    ],
    providers: [SeedService],
    exports: [SeedService],
})
export class SeedModule { }