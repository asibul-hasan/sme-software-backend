import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser, IUserContext } from '@kormo-erp/core';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @CurrentUser() user: IUserContext) {
    return this.userService.create(createUserDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: IUserContext) {
    return this.userService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: IUserContext) {
    return this.userService.findOne(+id, user); // Assuming ID is number
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @CurrentUser() user: IUserContext) {
    return this.userService.update(+id, updateUserDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: IUserContext) {
    return this.userService.remove(+id, user);
  }
}
