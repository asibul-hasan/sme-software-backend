import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Unique,
} from 'typeorm';
import { Designation } from './designation.entity';

@Entity('designation_module_permissions')
@Unique(['designation_id', 'module_code'])
export class DesignationModulePermission {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    designation_id!: number;

    @Column({ length: 50 })
    module_code!: string; // e.g., 'HR', 'INVENTORY'

    @Column({ default: false })
    has_access!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    // Relations
    @ManyToOne(() => Designation, (designation) => designation.modulePermissions)
    @JoinColumn({ name: 'designation_id' })
    designation!: Designation;
}
