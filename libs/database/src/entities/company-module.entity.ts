import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('company_modules')
export class CompanyModule {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    company_id!: number;

    @Column({ length: 50 })
    module_code!: string; // 'hr', 'inventory', 'sales', 'accounting'

    @Column({ default: true })
    is_enabled!: boolean;

    @Column({ type: 'date', nullable: true })
    enabled_at!: Date;

    @Column({ type: 'date', nullable: true })
    expires_at!: Date; // For module-level subscription

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}