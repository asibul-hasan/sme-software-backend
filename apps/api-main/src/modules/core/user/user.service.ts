import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@kormo-erp/database';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserContext } from '@kormo-erp/core';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto, currentUser: IUserContext) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      company_id: currentUser.company_id, // Assign to creator's company
    });

    return this.userRepository.save(user);
  }

  async findAll(currentUser: IUserContext) {
    return this.userRepository.find({
      where: { company_id: currentUser.company_id },
      select: ['id', 'name', 'email', 'phone', 'designation_id', 'branch_ids', 'is_active', 'created_at'], // Exclude password
    });
  }

  async findOne(id: number, currentUser: IUserContext) {
    const user = await this.userRepository.findOne({
      where: { id, company_id: currentUser.company_id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const { password, ...result } = user;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto, currentUser: IUserContext) {
    const user = await this.findOne(id, currentUser);
    
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.userRepository.update(id, {
        ...updateUserDto,
    });
    
    return this.findOne(id, currentUser);
  }

  async remove(id: number, currentUser: IUserContext) {
    const user = await this.findOne(id, currentUser);
    return this.userRepository.softDelete(id); // Using soft delete
  }
}
