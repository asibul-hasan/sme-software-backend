import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

@Entity('companies')
export class Company {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    name!: string;

    @Column({ length: 100, unique: true })
    code!: string;

    @Column({ type: 'text', nullable: true })
    address!: string;

    @Column({ length: 20, nullable: true })
    phone!: string;

    @Column({ length: 100, nullable: true })
    email!: string;

    @Column({ default: true })
    is_active!: boolean;

    @Column({ type: 'date' })
    subscription_expiry!: Date;

    @Column({ type: 'int', default: 7 })
    grace_period_days!: number;

    @Column({ default: 'ACTIVE' }) // ACTIVE, SUSPENDED, EXPIRED
    status!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @Column({ nullable: true })
    deleted_at!: Date;

    // Relations
    @OneToMany('Branch', (branch: any) => branch.company)
    branches!: any[];
}