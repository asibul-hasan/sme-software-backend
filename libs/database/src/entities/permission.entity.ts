import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100, unique: true })
    code!: string; // e.g., 'inventory.product.create'

    @Column({ length: 100 })
    module!: string; // e.g., 'inventory'

    @Column({ length: 100 })
    resource!: string; // e.g., 'product'

    @Column({ length: 50 })
    action!: string; // e.g., 'create', 'view', 'edit', 'delete'

    @Column({ length: 255 })
    name!: string;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}