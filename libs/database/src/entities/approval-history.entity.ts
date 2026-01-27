import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity('approval_history')
export class ApprovalHistory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    company_id!: number;

    @Column()
    branch_id!: number;

    @Column({ length: 100 })
    form_code!: string;

    @Column({ length: 50 })
    action!: string;

    @Column({ type: 'jsonb' })
    record_data: any; // The data being approved

    @Column()
    requested_by!: number; // user_id

    @Column({ nullable: true })
    approved_by!: number; // user_id

    @Column({ length: 50, default: 'PENDING' }) // PENDING, APPROVED, REJECTED
    status!: string;

    @Column({ type: 'text', nullable: true })
    remarks!: string;

    @CreateDateColumn()
    created_at!: Date;

    @Column({ nullable: true })
    approved_at!: Date;
}