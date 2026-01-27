import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FormEnum, ActionEnum } from '@kormo-erp/core';
import { PermissionService } from '../services/permission.service';

export const PERMISSION_KEY = 'permission';

/**
 * Permission Guard
 * 
 * Checks if user has permission to perform an action on a form
 * Uses PermissionService which abstracts hardcoded vs DB permissions
 */
@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private permissionService: PermissionService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Get permission metadata from decorator
        const requiredPermission = this.reflector.getAllAndOverride<{
            form: FormEnum;
            action: ActionEnum;
        }>(PERMISSION_KEY, [context.getHandler(), context.getClass()]);

        if (!requiredPermission) {
            // No permission required - allow
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new ForbiddenException('User not authenticated');
        }

        // Check permission
        const hasPermission = await this.permissionService.hasPermission(
            user.designation_id,
            user.company_id,
            requiredPermission.form,
            requiredPermission.action,
        );

        if (!hasPermission) {
            throw new ForbiddenException(
                `You do not have permission to ${requiredPermission.action} ${requiredPermission.form}`,
            );
        }

        return true;
    }
}