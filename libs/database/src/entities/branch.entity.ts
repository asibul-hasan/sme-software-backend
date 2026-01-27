import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity('branches')
export class Branch {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    company_id!: number;

    @Column({ length: 255 })
    name!: string;

    @Column({ length: 100 })
    code!: string;

    @Column({ type: 'text', nullable: true })
    address!: string;

    @Column({ length: 20, nullable: true })
    phone!: string;

    @Column({ default: false })
    is_head_office!: boolean;

    @Column({ default: true })
    is_active!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @Column({ nullable: true })
    deleted_at!: Date;

    // Relations
    @ManyToOne('Company', (company: any) => company.branches)
    @JoinColumn({ name: 'company_id' })
    company!: any;
}