import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Designation, DesignationModulePermission, DesignationFormPermission } from '@kormo-erp/database';
import { PermissionService } from './services/permission.service';
import { PermissionGuard } from './guards/permission.guard';
import { ModuleGuard } from './guards/module.guard';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Designation, DesignationModulePermission, DesignationFormPermission])],
    providers: [PermissionService, PermissionGuard, ModuleGuard],
    exports: [PermissionService, PermissionGuard, ModuleGuard],
})
export class CommonModule { }