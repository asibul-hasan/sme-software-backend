import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('approval_rules')
export class ApprovalRule {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    company_id!: number;

    @Column({ nullable: true })
    branch_id!: number; // null = applies to all branches

    @Column({ length: 100 })
    form_code!: string; // Which form requires approval

    @Column({ length: 50 })
    action!: string; // Which action requires approval (create, edit, delete)

    @Column('int', { array: true, default: [] })
    approver_designation_ids!: number[]; // Which designations can approve

    @Column({ type: 'int', default: 1 })
    required_approvals!: number; // How many approvals needed

    @Column({ default: true })
    is_active!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}