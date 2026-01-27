import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, CurrentUser, IUserContext } from '@kormo-erp/core';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
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