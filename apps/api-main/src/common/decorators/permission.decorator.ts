import { SetMetadata } from '@nestjs/common';
import { FormEnum, ActionEnum } from '@kormo-erp/core';
import { PERMISSION_KEY } from '../guards/permission.guard';

/**
 * Permission Decorator
 * 
 * Usage:
 * @Permission(FormEnum.EMPLOYEE_LIST, ActionEnum.CREATE)
 * createEmployee() { ... }
 */
export const Permission = (form: FormEnum, action: ActionEnum) =>
    SetMetadata(PERMISSION_KEY, { form, action });