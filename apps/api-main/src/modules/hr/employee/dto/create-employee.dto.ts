
import { 
    IsEmail, IsNotEmpty, IsString, IsOptional, IsDateString, IsEnum, IsNumber, IsArray, ValidateNested 
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
    // --- Personal Information ---
    @IsNotEmpty()
    @IsString()
    full_name: string;

    @IsOptional()
    @IsString()
    father_name?: string;

    @IsOptional()
    @IsString()
    mother_name?: string;

    @IsOptional()
    @IsDateString()
    dob?: string;

    @IsOptional()
    @IsString()
    gender?: string;

    @IsOptional()
    @IsString()
    blood_group?: string;

    @IsOptional()
    @IsString()
    nid?: string;

    @IsOptional()
    @IsString()
    passport_no?: string;

    @IsOptional()
    @IsString()
    marital_status?: string;

    @IsOptional()
    @IsString()
    religion?: string;

    @IsOptional()
    @IsString()
    photo_url?: string;

    // --- Contact Information ---
    @IsOptional()
    @IsString()
    present_address?: string;

    @IsOptional()
    @IsString()
    permanent_address?: string;

    @IsNotEmpty()
    @IsString()
    mobile: string;

    @IsOptional()
    @IsString()
    emergency_contact?: string;

    @IsOptional()
    @IsEmail()
    email?: string; // Personal email

    // --- Employment Information ---
    @IsNotEmpty()
    @IsString()
    designation_id: number; // Will validate existence in service

    @IsNotEmpty()
    @IsNumber()
    department_id: number;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    branch_ids?: number[];

    @IsNotEmpty()
    @IsNumber()
    primary_branch_id: number;

    @IsNotEmpty()
    @IsDateString()
    join_date: string;

    @IsOptional()
    @IsString()
    employment_type?: string;

    @IsOptional()
    @IsNumber()
    reporting_manager_id?: number;

    @IsOptional()
    @IsString()
    status?: string = 'Active';

    // --- Bank Information ---
    @IsOptional()
    @IsString()
    bank_name?: string;

    @IsOptional()
    @IsString()
    bank_branch?: string;

    @IsOptional()
    @IsString()
    account_number?: string;

    @IsOptional()
    @IsString()
    account_holder_name?: string;

    @IsOptional()
    @IsString()
    routing_number?: string;

    // --- Salary Information ---
    @IsOptional()
    @IsNumber()
    basic_salary?: number;

    @IsOptional()
    @IsNumber()
    house_rent?: number;

    @IsOptional()
    @IsNumber()
    medical_allowance?: number;

    @IsOptional()
    @IsNumber()
    conveyance_allowance?: number;

    @IsOptional()
    @IsNumber()
    other_allowance?: number;

    @IsOptional()
    @IsNumber()
    gross_salary?: number;

    // --- Documents ---
    @IsOptional()
    documents?: any[];

    // --- User Account (Optional creation) ---
    @IsOptional()
    create_user_account?: boolean;

    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsNumber()
    role_id?: number;
}
