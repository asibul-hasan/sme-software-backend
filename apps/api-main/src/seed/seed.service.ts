import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company, Branch, Designation, User, CompanyModule } from '@kormo-erp/database';
import { ModuleEnum } from '@kormo-erp/core';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(Company)
        private companyRepo: Repository<Company>,
        @InjectRepository(Branch)
        private branchRepo: Repository<Branch>,
        @InjectRepository(Designation)
        private designationRepo: Repository<Designation>,
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(CompanyModule)
        private companyModuleRepo: Repository<CompanyModule>,
    ) { }

    async seed() {
        // Create company
        const company = await this.companyRepo.save({
            name: 'Test Company Ltd',
            code: 'TEST001',
            email: 'company@test.com',
            phone: '01700000000',
            subscription_expiry: new Date('2025-12-31'),
            status: 'ACTIVE',
        });

        // Enable modules for company
        const modules = [
            ModuleEnum.HR,
            ModuleEnum.INVENTORY,
            ModuleEnum.SALES,
            ModuleEnum.SETTINGS,
        ];

        for (const module of modules) {
            await this.companyModuleRepo.save({
                company_id: company.id,
                module_code: module,
                is_enabled: true,
                enabled_at: new Date(),
            });
        }

        // Create branches
        const headOffice = await this.branchRepo.save({
            company_id: company.id,
            name: 'Head Office',
            code: 'HO',
            is_head_office: true,
        });

        const branch1 = await this.branchRepo.save({
            company_id: company.id,
            name: 'Branch 1',
            code: 'BR1',
        });

        // Create designations (IMPORTANT: Names must match permissions.config.ts)
        const ownerDesignation = await this.designationRepo.save({
            company_id: company.id,
            name: 'Owner',
            description: 'Full system access',
            level: 100,
        });

        const managerDesignation = await this.designationRepo.save({
            company_id: company.id,
            name: 'Manager',
            description: 'Branch management access',
            level: 50,
        });

        const employeeDesignation = await this.designationRepo.save({
            company_id: company.id,
            name: 'Employee',
            description: 'Basic operational access',
            level: 10,
        });

        // Create users
        const hashedPassword = await bcrypt.hash('password123', 10);

        await this.userRepo.save({
            company_id: company.id,
            designation_id: ownerDesignation.id,
            branch_ids: [headOffice.id, branch1.id],
            name: 'Owner User',
            email: 'owner@test.com',
            password: hashedPassword,
            phone: '01700000001',
        });

        await this.userRepo.save({
            company_id: company.id,
            designation_id: managerDesignation.id,
            branch_ids: [branch1.id],
            name: 'Manager User',
            email: 'manager@test.com',
            password: hashedPassword,
            phone: '01700000002',
        });

        await this.userRepo.save({
            company_id: company.id,
            designation_id: employeeDesignation.id,
            branch_ids: [branch1.id],
            name: 'Employee User',
            email: 'employee@test.com',
            password: hashedPassword,
            phone: '01700000003',
        });

        console.log('✅ Seed data created successfully!');
        console.log('');
        console.log('Test Accounts:');
        console.log('  Owner: owner@test.com / password123');
        console.log('  Manager: manager@test.com / password123');
        console.log('  Employee: employee@test.com / password123');
    }
}