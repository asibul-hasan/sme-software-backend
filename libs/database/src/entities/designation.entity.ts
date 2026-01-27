import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('designations')
export class Designation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    company_id!: number;

    @Column({ length: 100 })
    name!: string;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @Column({ default: true })
    is_active!: boolean;

    @Column({ type: 'int', default: 0 })
    level!: number; // For hierarchy

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @Column({ nullable: true })
    deleted_at!: Date;
}