import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_logs')
export class UserLog {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_id!: number;

    @Column({ length: 50 })
    action!: string; // 'LOGIN', 'LOGOUT', 'VIEW_PAGE', etc.

    @Column({ length: 45, nullable: true })
    ip_address!: string;

    @Column({ type: 'text', nullable: true })
    user_agent!: string;

    @Column({ type: 'jsonb', nullable: true })
    details!: any; // Store extra info

    @CreateDateColumn()
    created_at!: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;
}
