import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Designation } from './designation.entity';
import { Permission } from './permission.entity';

@Entity('designation_permissions')
export class DesignationPermission {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    designation_id!: number;

    @Column()
    permission_id!: number;

    @Column()
    company_id!: number;

    @CreateDateColumn()
    created_at!: Date;

    // Relations
    @ManyToOne(() => Designation)
    @JoinColumn({ name: 'designation_id' })
    designation!: Designation;

    @ManyToOne(() => Permission)
    @JoinColumn({ name: 'permission_id' })
    permission!: Permission;
}