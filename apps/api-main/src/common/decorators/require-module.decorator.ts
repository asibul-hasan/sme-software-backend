import { SetMetadata } from '@nestjs/common';
import { ModuleEnum } from '@kormo-erp/core';
import { MODULE_KEY } from '../guards/module.guard';

/**
 * RequireModule Decorator
 * 
 * Usage:
 * @RequireModule(ModuleEnum.HR)
 * @Controller('hr/employee')
 * export class EmployeeController { ... }
 */
export const RequireModule = (module: ModuleEnum) =>
    SetMetadata(MODULE_KEY, module);