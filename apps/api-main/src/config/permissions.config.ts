import { IPermissionConfig, ModuleEnum, FormEnum, ActionEnum } from '@kormo-erp/core';

/**
 * HARDCODED PERMISSION CONFIGURATION
 * 
 * THIS IS TEMPORARY - Will be replaced by API-driven permissions from database
 * when Support Dashboard is ready.
 * 
 * Structure:
 * - Owner designation: Full access to everything
 * - Manager designation: Limited access
 * - Employee designation: View-only access
 */

export const OWNER_PERMISSIONS: IPermissionConfig = {
    modules: [
        {
            module: ModuleEnum.HR,
            enabled: true,
            forms: {
                [FormEnum.EMPLOYEE_LIST]: {
                    [ActionEnum.VIEW]: true,
                    [ActionEnum.CREATE]: true,
                    [ActionEnum.EDIT]: true,
                    [ActionEnum.DELETE]: true,
                    [ActionEnum.EXPORT]: true,
                },
                [FormEnum.EMPLOYEE_CREATE]: {
                    [ActionEnum.VIEW]: true,
                    [ActionEnum.CREATE]: true,
                },
                [FormEnum.EMPLOYEE_EDIT]: {
                    [ActionEnum.VIEW]: true,
                    [ActionEnum.EDIT]: true,
                },
            },
        },
        {
            module: ModuleEnum.INVENTORY,
            enabled: true,
            forms: {
                [FormEnum.PRODUCT_LIST]: {
                    [ActionEnum.VIEW]: true,
                    [ActionEnum.CREATE]: true,
                    [ActionEnum.EDIT]: true,
                    [ActionEnum.DELETE]: true,
                },
                [FormEnum.PRODUCT_CREATE]: {
                    [ActionEnum.VIEW]: true,
                    [ActionEnum.CREATE]: true,
                },
                [FormEnum.STOCK_ADJUST]: {
                    [ActionEnum.VIEW]: true,
                    [ActionEnum.CREATE]: true,
                    [ActionEnum.APPROVE]: true,
                },
            },
        },
        {
            module: ModuleEnum.SALES,
            enabled: true,
            forms: {
                [FormEnum.POS_SALE]: {
                    [ActionEnum.VIEW]: true,
                    [ActionEnum.CREATE]: true,
                },
                [FormEnum.SALE_RETURN]: {
                    [ActionEnum.VIEW]: true,
                    [ActionEnum.CREATE]: true,
                    [ActionEnum.APPROVE]: true,
                },
            },
        },
        {
            module: ModuleEnum.SETTINGS,
            enabled: true,
            forms: {
                [FormEnum.DESIGNATION_MANAGE]: {
                    [ActionEnum.VIEW]: true,
                    [ActionEnum.CREATE]: true,
                    [ActionEnum.EDIT]: true,
                    [ActionEnum.DELETE]: true,
                },
                [FormEnum.PERMISSION_MANAGE]: {
                    [ActionEnum.VIEW]: true,
                    [ActionEnum.EDIT]: true,
                },
            },
        },
    ],
};

export const MANAGER_PERMISSIONS: IPermissionConfig = {
    modules: [
        {
            module: ModuleEnum.HR,
            enabled: true,
            forms: {
                [FormEnum.EMPLOYEE_LIST]: {
                    [ActionEnum.VIEW]: true,
                    [ActionEnum.CREATE]: true,
                    [ActionEnum.EDIT]: true,
                    [ActionEnum.DELETE]: false, // Managers cannot delete
                },
                [FormEnum.EMPLOYEE_CREATE]: {
                    [ActionEnum.VIEW]: true,
                    [ActionEnum.CREATE]: true,
                },
            },
        },
        {
            module: ModuleEnum.INVENTORY,
            enabled: true,
            forms: {
                [FormEnum.PRODUCT_LIST]: {
                    [ActionEnum.VIEW]: true,
                    [ActionEnum.CREATE]: true,
                    [ActionEnum.EDIT]: true,
                },
                [FormEnum.STOCK_ADJUST]: {
                    [ActionEnum.VIEW]: true,
                    [ActionEnum.APPROVE]: true, // Managers approve stock adjustments
                },
            },
        },
        {
            module: ModuleEnum.SALES,
            enabled: true,
            forms: {
                [FormEnum.POS_SALE]: {
                    [ActionEnum.VIEW]: true,
                    [ActionEnum.CREATE]: true,
                },
            },
        },
    ],
};

export const EMPLOYEE_PERMISSIONS: IPermissionConfig = {
    modules: [
        {
            module: ModuleEnum.HR,
            enabled: true,
            forms: {
                [FormEnum.EMPLOYEE_LIST]: {
                    [ActionEnum.VIEW]: true,
                },
            },
        },
        {
            module: ModuleEnum.INVENTORY,
            enabled: true,
            forms: {
                [FormEnum.PRODUCT_LIST]: {
                    [ActionEnum.VIEW]: true,
                },
            },
        },
        {
            module: ModuleEnum.SALES,
            enabled: true,
            forms: {
                [FormEnum.POS_SALE]: {
                    [ActionEnum.VIEW]: true,
                    [ActionEnum.CREATE]: true,
                },
            },
        },
    ],
};

/**
 * Map designation names to permission configs
 * 
 * FUTURE: This will be replaced by database queries
 */
export const DESIGNATION_PERMISSION_MAP: Record<string, IPermissionConfig> = {
    'Owner': OWNER_PERMISSIONS,
    'Manager': MANAGER_PERMISSIONS,
    'Employee': EMPLOYEE_PERMISSIONS,
};