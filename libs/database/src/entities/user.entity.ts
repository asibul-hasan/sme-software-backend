import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import type { Company } from './company.entity';
import type { Designation } from './designation.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    company_id!: number;

    @Column()
    designation_id!: number;

    @Column('int', { array: true, default: [] })
    branch_ids!: number[];

    @Column({ length: 255 })
    name!: string;

    @Column({ length: 100, unique: true })
    email!: string;

    @Column({ length: 255 })
    password!: string;

    @Column({ length: 20, nullable: true })
    phone!: string;

    @Column({ default: true })
    is_active!: boolean;

    @Column({ nullable: true })
    last_login!: Date;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @Column({ nullable: true })
    deleted_at!: Date;

    // Relations
    @ManyToOne('Company')
    @JoinColumn({ name: 'company_id' })
    company!: any;

    @ManyToOne('Designation')
    @JoinColumn({ name: 'designation_id' })
    designation!: any;
}