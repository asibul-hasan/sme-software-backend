import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('forms')
export class Form {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100, unique: true })
    code!: string; // e.g., 'EMPLOYEE_LIST', 'PRODUCT_CREATE'

    @Column({ length: 100 })
    module!: string; // e.g., 'hr', 'inventory'

    @Column({ length: 255 })
    name!: string;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @Column({ type: 'jsonb', default: {} })
    actions!: any; // { view: true, create: true, edit: true, delete: false }

    @Column({ default: true })
    is_active!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}