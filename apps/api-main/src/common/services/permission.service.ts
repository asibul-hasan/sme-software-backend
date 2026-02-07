import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    Designation,
    DesignationModulePermission,
    DesignationFormPermission,
    Form
} from '@kormo-erp/database';
import {
    IPermissionConfig,
    IModulePermission,
    IFormPermission,
    ModuleEnum,
    FormEnum,
    ActionEnum
} from '@kormo-erp/core';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Designation)
        private designationRepo: Repository<Designation>,
        @InjectRepository(DesignationModulePermission)
        private designationModuleRepo: Repository<DesignationModulePermission>,
        @InjectRepository(DesignationFormPermission)
        private designationFormRepo: Repository<DesignationFormPermission>,
    ) { }

    /**
     * Get permissions for a user
     */
    async getPermissions(designationId: number, companyId: number): Promise<IPermissionConfig> {
        // 1. Fetch Module Permissions
        const modulePermissions = await this.designationModuleRepo.find({
            where: { designation_id: designationId, has_access: true },
        });

        // 2. Fetch Form Permissions (with joined Form entity to get module/code)
        const formPermissions = await this.designationFormRepo.find({
            where: { designation_id: designationId },
            relations: ['form'],
        });

        // 3. Construct IPermissionConfig
        const modulesMap = new Map<string, IModulePermission>();

        // Initialize modules from module permissions
        for (const mp of modulePermissions) {
            modulesMap.set(mp.module_code, {
                module: mp.module_code,
                enabled: true,
                forms: {},
            });
        }

        // Fill in form permissions
        for (const fp of formPermissions) {
            const moduleCode = fp.form.module; // Assuming Form entity has 'module' column matching module_code
            let moduleConfig = modulesMap.get(moduleCode);

            // If module config missing but form permission exists, should we add module?
            // User says "when module permission given then form permission".
            // So logic implies module permission must exist.
            // But if we want robust, we might add it. Let's assume strict: only if module enabled.
            if (!moduleConfig) {
                 // For safety, let's create it implicitly if form access exists?
                 // No, respect module level switch.
                 continue; // Skip if module disabled
            }

            const formCode = fp.form.code; // e.g., 'HR_1001'

            moduleConfig.forms[formCode] = {
                [ActionEnum.VIEW]: fp.can_view,
                [ActionEnum.CREATE]: fp.can_create,
                [ActionEnum.EDIT]: fp.can_edit,
                [ActionEnum.DELETE]: fp.can_delete,
            };
        }

        return {
            modules: Array.from(modulesMap.values()),
        };
    }

    /**
     * Check if user has permission for a specific action
     */
    async hasPermission(
        designationId: number,
        companyId: number,
        formCode: string, // Changed from FormEnum to string to support dynamic codes
        action: ActionEnum,
    ): Promise<boolean> {
        // Optimized: Query DB directly instead of loading full config?
        // For now, reuse getPermissions to keep consistent caching layer if added later.
        const config = await this.getPermissions(designationId, companyId);
        
        for (const module of config.modules) {
            if (!module.enabled) continue;
            const formPerm = module.forms[formCode];
            if (formPerm && formPerm[action] === true) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if module is enabled
     */
    async hasModule(
        designationId: number,
        companyId: number,
        moduleCode: string,
    ): Promise<boolean> {
        const perm = await this.designationModuleRepo.findOne({
            where: { designation_id: designationId, module_code: moduleCode, has_access: true },
        });
        return !!perm;
    }

    /**
     * Get all enabled modules for user
     */
    async getEnabledModules(
        designationId: number,
        companyId: number,
    ): Promise<string[]> {
        const perms = await this.designationModuleRepo.find({
            where: { designation_id: designationId, has_access: true },
        });
        return perms.map(p => p.module_code);
    }
}