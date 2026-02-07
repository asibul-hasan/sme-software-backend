import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength, IsNumber, IsArray } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsNumber()
    designation_id?: number;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    branch_ids?: number[];

    @IsOptional()
    @IsNumber()
    company_id?: number;

    @IsOptional()
    @IsNumber()
    created_by?: number;
}
