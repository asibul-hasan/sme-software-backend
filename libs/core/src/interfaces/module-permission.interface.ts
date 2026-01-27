import { ActionEnum } from '../enums/action.enum';

export interface IFormPermission {
    [formCode: string]: {
        [key in ActionEnum]?: boolean;
    };
}

export interface IModulePermission {
    module: string;
    enabled: boolean;
    forms: IFormPermission;
}

export interface IPermissionConfig {
    modules: IModulePermission[];
}