
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee, User } from '@kormo-erp/database';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
// mport { UserService } from '../../core/user/user.service'; // Assuming User Service exists for account creation

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    // private readonly userService: UserService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    // Check if employee ID already exists if manual, or generate one
    // For now, let's assume auto-generation or manual input validation
    
    // Check email uniqueness if provided
    if (createEmployeeDto.email) {
      const existing = await this.employeeRepository.findOne({ where: { email: createEmployeeDto.email } });
      if (existing) {
        throw new ConflictException('Email already exists');
      }
    }

    // Generate Employee ID if not present (Simple logic for now)
    const count = await this.employeeRepository.count();
    const employeeId = `EMP-${(count + 1).toString().padStart(4, '0')}`;

    const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      employee_id: employeeId,
      // If creating a user account, we would handle that here or in a transaction
    });

    return await this.employeeRepository.save(employee);
  }

  async findAll(query: any): Promise<Employee[]> {
    // Implement filtering logic based on query params (branch, dept, status, name)
    const qb = this.employeeRepository.createQueryBuilder('employee');
    
    if (query.branch_id) {
        qb.andWhere(':branch_id = ANY(employee.branch_ids)', { branch_id: query.branch_id });
    }
    
    if (query.department_id) {
        qb.andWhere('employee.department_id = :department_id', { department_id: query.department_id });
    }

    if (query.status) {
        qb.andWhere('employee.status = :status', { status: query.status });
    }

    if (query.search) {
        qb.andWhere('(employee.full_name ILIKE :search OR employee.employee_id ILIKE :search)', { search: `%${query.search}%` });
    }

    return await qb.getMany();
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.findOne(id);
    
    // Update fields
    Object.assign(employee, updateEmployeeDto);
    
    return await this.employeeRepository.save(employee);
  }

  async remove(id: number): Promise<void> {
    const result = await this.employeeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }
}
