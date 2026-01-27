import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Branch } from './branch.entity';

@Entity('user_branches')
export class UserBranch {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_id!: number;

    @Column()
    branch_id!: number;

    @Column({ default: false })
    is_primary!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    // Relations
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Branch)
    @JoinColumn({ name: 'branch_id' })
    branch!: Branch;
}