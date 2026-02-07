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
import { Form } from './form.entity';

@Entity('designation_form_permissions')
@Unique(['designation_id', 'form_id'])
export class DesignationFormPermission {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    designation_id!: number;

    @Column()
    form_id!: number;

    @Column({ default: false })
    can_view!: boolean;

    @Column({ default: false })
    can_create!: boolean;

    @Column({ default: false })
    can_edit!: boolean;

    @Column({ default: false })
    can_delete!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    // Relations
    @ManyToOne(() => Designation, (designation) => designation.formPermissions)
    @JoinColumn({ name: 'designation_id' })
    designation!: Designation;

    @ManyToOne(() => Form)
    @JoinColumn({ name: 'form_id' })
    form!: Form;
}
