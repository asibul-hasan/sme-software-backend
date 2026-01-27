import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ModuleEnum } from '@kormo-erp/core';
import { PermissionService } from '../services/permission.service';

export const MODULE_KEY = 'module';

/**
 * Module Guard
 * 
 * Checks if a module is enabled for the user's company
 */
@Injectable()
export class ModuleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private permissionService: PermissionService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredModule = this.reflector.getAllAndOverride<ModuleEnum>(
            MODULE_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredModule) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new ForbiddenException('User not authenticated');
        }

        const hasModule = await this.permissionService.hasModule(
            user.designation_id,
            user.company_id,
            requiredModule,
        );

        if (!hasModule) {
            throw new ForbiddenException(
                `Module ${requiredModule} is not enabled for your account`,
            );
        }

        return true;
    }
}