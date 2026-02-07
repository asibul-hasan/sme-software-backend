
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { User } from './user.entity';

@Entity('employees')
export class Employee {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    employee_id!: string; // Manual or auto-generated ID (e.g., EMP-001)

    // --- Personal Information ---
    @Column({ length: 255 })
    full_name!: string;

    @Column({ length: 255, nullable: true })
    father_name!: string;

    @Column({ length: 255, nullable: true })
    mother_name!: string;

    @Column({ type: 'date', nullable: true })
    dob!: Date;

    @Column({ length: 20, nullable: true })
    gender!: string;

    @Column({ length: 10, nullable: true })
    blood_group!: string;

    @Column({ length: 50, nullable: true })
    nid!: string;

    @Column({ length: 50, nullable: true })
    passport_no!: string;

    @Column({ length: 20, nullable: true })
    marital_status!: string;

    @Column({ length: 50, nullable: true })
    religion!: string;

    @Column({ nullable: true })
    photo_url!: string;

    // --- Contact Information ---
    @Column({ type: 'text', nullable: true })
    present_address!: string;

    @Column({ type: 'text', nullable: true })
    permanent_address!: string;

    @Column({ length: 20 })
    mobile!: string;

    @Column({ length: 20, nullable: true })
    emergency_contact!: string;

    @Column({ length: 100, nullable: true })
    email!: string;

    // --- Employment Information ---
    @Column()
    designation_id!: number;

    @Column()
    department_id!: number; // Assuming a Department entity exists or strictly ID

    @Column('int', { array: true, default: [] })
    branch_ids!: number[];

    @Column()
    primary_branch_id!: number;

    @Column({ type: 'date' })
    join_date!: Date;

    @Column({ length: 50, default: 'Permanent' })
    employment_type!: string; // Permanent, Contractual, Probation

    @Column({ nullable: true })
    reporting_manager_id!: number;

    @Column({ length: 20, default: 'Active' })
    status!: string; // Active, Inactive, Terminated, Resigned

    // --- Bank Information ---
    @Column({ length: 100, nullable: true })
    bank_name!: string;

    @Column({ length: 100, nullable: true })
    bank_branch!: string;

    @Column({ length: 50, nullable: true })
    account_number!: string;

    @Column({ length: 100, nullable: true })
    account_holder_name!: string;

    @Column({ length: 50, nullable: true })
    routing_number!: string;

    // --- Salary Information ---
    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    basic_salary!: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    house_rent!: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    medical_allowance!: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    conveyance_allowance!: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    other_allowance!: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    gross_salary!: number;

    // --- Documents (Stored as JSON array of URLs/Metadata) ---
    @Column('jsonb', { nullable: true })
    documents!: any;

    @Column()
    company_id!: number;

    // --- System ---
    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    // --- Relations ---
    @OneToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ nullable: true })
    user_id!: number;
}
