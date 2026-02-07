const { Client } = require('pg');
const bcrypt = require('bcrypt');

const connectionString = 'postgresql://neondb_owner:npg_qNEe3X1Siovh@ep-solitary-cherry-ai9yl5q6-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: true, // adjust if needed for your environment, typically Neon needs ssl
  },
});

async function seed() {
  try {
    await client.connect();
    console.log('Connected to database');

    // Create Tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS company (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(50),
        email VARCHAR(100),
        phone VARCHAR(20),
        subscription_expiry TIMESTAMP,
        status VARCHAR(20) DEFAULT 'ACTIVE',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Ensured table: company');

    await client.query(`
      CREATE TABLE IF NOT EXISTS designation (
        id SERIAL PRIMARY KEY,
        company_id INTEGER REFERENCES company(id),
        name VARCHAR(100) NOT NULL,
        description TEXT,
        level INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Ensured table: designation');

    await client.query(`
      CREATE TABLE IF NOT EXISTS branch (
        id SERIAL PRIMARY KEY,
        company_id INTEGER REFERENCES company(id),
        name VARCHAR(100) NOT NULL,
        code VARCHAR(50),
        is_head_office BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Ensured table: branch');

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        company_id INTEGER REFERENCES company(id),
        designation_id INTEGER REFERENCES designation(id),
        branch_ids INTEGER[],
        name VARCHAR(255) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        is_active BOOLEAN DEFAULT TRUE,
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP
      );
    `);
    console.log('Ensured table: users');

    // Create Company
    const companyRes = await client.query(`
      INSERT INTO company (name, code, email, phone, subscription_expiry, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      RETURNING id
    `, ['Test Company Ltd', 'TEST001', 'company@test.com', '01700000000', '2025-12-31', 'ACTIVE']);
    const companyId = companyRes.rows[0].id;
    console.log('Created company:', companyId);

    // Create Designations
    const ownerDesRes = await client.query(`
      INSERT INTO designation (company_id, name, description, level, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING id
    `, [companyId, 'Owner', 'Full system access', 100]);
    const ownerDesId = ownerDesRes.rows[0].id; // Changed ownerDesRes.rows.id to ownerDesRes.rows[0].id
    console.log('Created Owner designation:', ownerDesId);

    // Create Branch
    const branchRes = await client.query(`
      INSERT INTO branch (company_id, name, code, is_head_office, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING id
    `, [companyId, 'Head Office', 'HO', true]);
    const branchId = branchRes.rows[0].id;
    console.log('Created Head Office branch:', branchId);

    // Create User
    const hashedPassword = await bcrypt.hash('password123', 10);
    const userRes = await client.query(`
      INSERT INTO users (
        company_id, designation_id, branch_ids, name, email, password, phone, is_active, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
      RETURNING id
    `, [
      companyId, 
      ownerDesId, 
      [branchId], 
      'Owner User', 
      'owner@test.com', 
      hashedPassword, 
      '01700000001', 
      true
    ]);
    console.log('Created Owner user:', userRes.rows[0].id);

    console.log('✅ Seed complete!');
  } catch (err) {
    console.error('Error seeding:', err);
  } finally {
    await client.end();
  }
}

seed();
