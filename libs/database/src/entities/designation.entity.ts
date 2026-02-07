import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

@Entity('designations')
export class Designation {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany('DesignationPermission', (designationPermission: any) => designationPermission.designation)
    permissions!: any[];

    @OneToMany('DesignationModulePermission', (dmp: any) => dmp.designation)
    modulePermissions!: any[];

    @OneToMany('DesignationFormPermission', (dfp: any) => dfp.designation)
    formPermissions!: any[];

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