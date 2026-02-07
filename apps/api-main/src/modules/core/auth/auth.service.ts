import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Designation, UserLog } from '@kormo-erp/database';
import { IJwtPayload } from '@kormo-erp/core';
import { PermissionService } from '../../../common/services/permission.service';
// import { PermissionService } from '../../common/services/permission.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(Designation)
        private designationRepo: Repository<Designation>,
        @InjectRepository(UserLog)
        private userLogRepo: Repository<UserLog>,
        private jwtService: JwtService,
        private permissionService: PermissionService,
    ) { }

    async login(loginDto: LoginDto, ip: string, userAgent: string) {
        const user = await this.userRepo.findOne({
            where: { email: loginDto.email, is_active: true, deleted_at: null },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Update last login
        await this.userRepo.update(user.id, { last_login: new Date() });

        // Generate JWT
        const payload: IJwtPayload = {
            sub: user.id,
            email: user.email,
            company_id: user.company_id,
            designation_id: user.designation_id,
            branch_ids: user.branch_ids,
        };

        // Fetch designation name
        const designation = await this.designationRepo.findOne({ where: { id: user.designation_id } });

        // Fetch permissions
        const permissions = await this.permissionService.getPermissions(user.designation_id, user.company_id);

        // Log activity
        await this.userLogRepo.save({
            user_id: user.id,
            action: 'LOGIN',
            ip_address: ip,
            user_agent: userAgent,
            details: { email: user.email },
        });

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                company_id: user.company_id,
                designation: designation ? designation.name : null,
                branch_ids: user.branch_ids,
            },
            permissions: permissions,
        };
    }

    async getProfile(userId: number) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            select: ['id', 'name', 'email', 'phone', 'company_id', 'designation_id', 'branch_ids'],
        });

        const designation = await this.designationRepo.findOne({
            where: { id: user.designation_id },
        });

        return {
            ...user,
            designation: designation ? designation.name : null,
        };
    }

    async getPermissions(userId: number) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const permissions = await this.permissionService.getPermissions(
            user.designation_id,
            user.company_id,
        );

        return permissions;
    }
}