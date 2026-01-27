import { MigrationInterface, QueryRunner } from 'typeorm';

export class PermissionSchema1704100000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Permissions table
        await queryRunner.query(`
      CREATE TABLE permissions (
        id SERIAL PRIMARY KEY,
        code VARCHAR(100) UNIQUE NOT NULL,
        module VARCHAR(100) NOT NULL,
        resource VARCHAR(100) NOT NULL,
        action VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Designation permissions (pivot table)
        await queryRunner.query(`
      CREATE TABLE designation_permissions (
        id SERIAL PRIMARY KEY,
        designation_id INTEGER NOT NULL REFERENCES designations(id),
        permission_id INTEGER NOT NULL REFERENCES permissions(id),
        company_id INTEGER NOT NULL REFERENCES companies(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(designation_id, permission_id)
      )
    `);

        // Forms table
        await queryRunner.query(`
      CREATE TABLE forms (
        id SERIAL PRIMARY KEY,
        code VARCHAR(100) UNIQUE NOT NULL,
        module VARCHAR(100) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        actions JSONB DEFAULT '{}',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Company modules table
        await queryRunner.query(`
      CREATE TABLE company_modules (
        id SERIAL PRIMARY KEY,
        company_id INTEGER NOT NULL REFERENCES companies(id),
        module_code VARCHAR(50) NOT NULL,
        is_enabled BOOLEAN DEFAULT true,
        enabled_at DATE,
        expires_at DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(company_id, module_code)
      )
    `);

        // Approval rules table
        await queryRunner.query(`
      CREATE TABLE approval_rules (
        id SERIAL PRIMARY KEY,
        company_id INTEGER NOT NULL REFERENCES companies(id),
        branch_id INTEGER REFERENCES branches(id),
        form_code VARCHAR(100) NOT NULL,
        action VARCHAR(50) NOT NULL,
        approver_designation_ids INTEGER[] DEFAULT '{}',
        required_approvals INTEGER DEFAULT 1,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Approval history table
        await queryRunner.query(`
      CREATE TABLE approval_history (
        id SERIAL PRIMARY KEY,
        company_id INTEGER NOT NULL REFERENCES companies(id),
        branch_id INTEGER NOT NULL REFERENCES branches(id),
        form_code VARCHAR(100) NOT NULL,
        action VARCHAR(50) NOT NULL,
        record_data JSONB NOT NULL,
        requested_by INTEGER NOT NULL REFERENCES users(id),
        approved_by INTEGER REFERENCES users(id),
        status VARCHAR(50) DEFAULT 'PENDING',
        remarks TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        approved_at TIMESTAMP
      )
    `);

        // Indexes
        await queryRunner.query(`CREATE INDEX idx_permissions_code ON permissions(code)`);
        await queryRunner.query(`CREATE INDEX idx_permissions_module ON permissions(module)`);
        await queryRunner.query(`CREATE INDEX idx_designation_permissions_designation ON designation_permissions(designation_id)`);
        await queryRunner.query(`CREATE INDEX idx_designation_permissions_company ON designation_permissions(company_id)`);
        await queryRunner.query(`CREATE INDEX idx_forms_code ON forms(code)`);
        await queryRunner.query(`CREATE INDEX idx_forms_module ON forms(module)`);
        await queryRunner.query(`CREATE INDEX idx_company_modules_company ON company_modules(company_id)`);
        await queryRunner.query(`CREATE INDEX idx_approval_rules_company ON approval_rules(company_id)`);
        await queryRunner.query(`CREATE INDEX idx_approval_history_company ON approval_history(company_id)`);
        await queryRunner.query(`CREATE INDEX idx_approval_history_status ON approval_history(status)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS approval_history`);
        await queryRunner.query(`DROP TABLE IF EXISTS approval_rules`);
        await queryRunner.query(`DROP TABLE IF EXISTS company_modules`);
        await queryRunner.query(`DROP TABLE IF EXISTS forms`);
        await queryRunner.query(`DROP TABLE IF EXISTS designation_permissions`);
        await queryRunner.query(`DROP TABLE IF EXISTS permissions`);
    }
}