import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, CurrentUser, IUserContext } from '@kormo-erp/core';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Req() req: Request) {
        const ip = req.ip || req.connection.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || '';
        return this.authService.login(loginDto, ip as string, userAgent);
    }

    @Get('me')
    async getMe(@CurrentUser() user: IUserContext) {
        return this.authService.getProfile(user.id);
    }

    @Get('permissions')
    async getPermissions(@CurrentUser() user: IUserContext) {
        return this.authService.getPermissions(user.id);
    }
}