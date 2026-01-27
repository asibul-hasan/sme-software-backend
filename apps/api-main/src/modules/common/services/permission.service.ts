import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Designation } from '@kormo-erp/database';
import {
    IPermissionConfig,
    IModulePermission,
    ModuleEnum,
    FormEnum,
    ActionEnum
} from '@kormo-erp/core';
import { DESIGNATION_PERMISSION_MAP } from '../../../config/permissions.config';

/**
 * Permission Service
 * 
 * THIS IS THE ABSTRACTION LAYER - The only place that knows about hardcoded vs DB permissions
 * 
 * TODAY: Reads from DESIGNATION_PERMISSION_MAP (hardcoded)
 * FUTURE: Reads from database via API
 * 
 * ALL OTHER CODE stays the same when switching
 */
@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Designation)
        private designationRepo: Repository<Designation>,
    ) { }

    /**
     * Get permissions for a user
     * 
     * @param designationId - User's designation ID
     * @param companyId - User's company ID
     * @returns Permission configuration
     */
    async getPermissions(designationId: number, companyId: number): Promise<IPermissionConfig> {
        // Get designation
        const designation = await this.designationRepo.findOne({
            where: { id: designationId, company_id: companyId },
        });

        if (!designation) {
            return { modules: [] };
        }

        // TODAY: Return hardcoded permissions
        const permissions = DESIGNATION_PERMISSION_MAP[designation.name] || { modules: [] };

        // FUTURE: Replace above with database query
        // const permissions = await this.fetchPermissionsFromDatabase(designationId, companyId);

        return permissions;
    }

    /**
     * Check if user has permission for a specific action
     */
    async hasPermission(
        designationId: number,
        companyId: number,
        formCode: FormEnum,
        action: ActionEnum,
    ): Promise<boolean> {
        const permissions = await this.getPermissions(designationId, companyId);

        for (const module of permissions.modules) {
            if (!module.enabled) continue;

            const formPermissions = module.forms[formCode];
            if (formPermissions && formPermissions[action] === true) {
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
        moduleCode: ModuleEnum,
    ): Promise<boolean> {
        const permissions = await this.getPermissions(designationId, companyId);

        const module = permissions.modules.find(m => m.module === moduleCode);
        return module ? module.enabled : false;
    }

    /**
     * Get all enabled modules for user
     */
    async getEnabledModules(
        designationId: number,
        companyId: number,
    ): Promise<string[]> {
        const permissions = await this.getPermissions(designationId, companyId);
        return permissions.modules
            .filter(m => m.enabled)
            .map(m => m.module);
    }

    /**
     * FUTURE: Fetch permissions from database
     * This method will replace the hardcoded config when Support Dashboard is ready
     */
    // private async fetchPermissionsFromDatabase(
    //   designationId: number,
    //   companyId: number,
    // ): Promise<IPermissionConfig> {
    //   // Query designation_permissions table
    //   // Build IPermissionConfig from database
    //   // Return structured permissions
    // }
}