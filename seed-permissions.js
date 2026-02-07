const { Client } = require('pg');

const connectionString = 'postgresql://neondb_owner:npg_qNEe3X1Siovh@ep-solitary-cherry-ai9yl5q6-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }, // Use false for robustness in this script
});

const PERMISSIONS = [
  // HR Module
  { code: 'hr.employee.view', module: 'hr', resource: 'employee', action: 'view', name: 'View Employees' },
  { code: 'hr.employee.create', module: 'hr', resource: 'employee', action: 'create', name: 'Create Employee' },
  { code: 'hr.employee.edit', module: 'hr', resource: 'employee', action: 'edit', name: 'Edit Employee' },
  { code: 'hr.employee.delete', module: 'hr', resource: 'employee', action: 'delete', name: 'Delete Employee' },
  { code: 'hr.attendance.view', module: 'hr', resource: 'attendance', action: 'view', name: 'View Attendance' },
  { code: 'hr.attendance.create', module: 'hr', resource: 'attendance', action: 'create', name: 'Record Attendance' },

  // Inventory Module
  { code: 'inventory.product.view', module: 'inventory', resource: 'product', action: 'view', name: 'View Products' },
  { code: 'inventory.product.create', module: 'inventory', resource: 'product', action: 'create', name: 'Create Product' },
  { code: 'inventory.product.edit', module: 'inventory', resource: 'product', action: 'edit', name: 'Edit Product' },
  { code: 'inventory.product.delete', module: 'inventory', resource: 'product', action: 'delete', name: 'Delete Product' },
  { code: 'inventory.stock.view', module: 'inventory', resource: 'stock', action: 'view', name: 'View Stock' },
  { code: 'inventory.stock.adjust', module: 'inventory', resource: 'stock', action: 'adjust', name: 'Adjust Stock' },

  // Sales Module
  { code: 'sales.invoice.view', module: 'sales', resource: 'invoice', action: 'view', name: 'View Invoices' },
  { code: 'sales.invoice.create', module: 'sales', resource: 'invoice', action: 'create', name: 'Create Invoice' },
  { code: 'sales.customer.view', module: 'sales', resource: 'customer', action: 'view', name: 'View Customers' },

  // Settings
  { code: 'settings.user.view', module: 'settings', resource: 'user', action: 'view', name: 'View Users' },
  { code: 'settings.user.create', module: 'settings', resource: 'user', action: 'create', name: 'Create User' },
  { code: 'settings.user.edit', module: 'settings', resource: 'user', action: 'edit', name: 'Edit User' },
  
  // Reports
  { code: 'reports.sales.view', module: 'reports', resource: 'sales', action: 'view', name: 'View Sales Reports' },
];

async function seedPermissions() {
  try {
    await client.connect();
    console.log('Connected to database');

    // 1. Update Company Expiry
    await client.query(`UPDATE company SET subscription_expiry = '2030-12-31' WHERE code = 'TEST001'`);
    console.log('✅ Updated company subscription expiry to 2030-12-31');

    // 2. Get Owner Designation and Company
    const ownerRes = await client.query(`SELECT id, company_id FROM designation WHERE name = 'Owner' LIMIT 1`);
    if (ownerRes.rows.length === 0) {
        console.error('Owner designation not found! Run direct-seed.js first.');
        return;
    }
    const owner = ownerRes.rows[0];
    console.log(`Found Owner designation ID: ${owner.id}, Company ID: ${owner.company_id}`);

    // 3. Insert Permissions and Assign to Owner
    for (const p of PERMISSIONS) {
        // Insert Permission if not exists
        const permRes = await client.query(`
            INSERT INTO permissions (code, module, resource, action, name, description, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, '', NOW(), NOW())
            ON CONFLICT (code) DO UPDATE SET updated_at = NOW()
            RETURNING id
        `, [p.code, p.module, p.resource, p.action, p.name]);
        
        let permId;
        if (permRes.rows.length > 0) {
             permId = permRes.rows[0].id;
        } else {
             // Fetch existing if update didn't return (though RETURNING should work with ON CONFLICT DO UPDATE)
             const existing = await client.query(`SELECT id FROM permissions WHERE code = $1`, [p.code]);
             permId = existing.rows[0].id;
        }

        // Assign to Owner
        await client.query(`
            INSERT INTO designation_permissions (designation_id, permission_id, company_id, created_at)
            SELECT $1, $2, $3, NOW()
            WHERE NOT EXISTS (
                SELECT 1 FROM designation_permissions WHERE designation_id = $1 AND permission_id = $2
            )
        `, [owner.id, permId, owner.company_id]);
        
        console.log(`Processed permission: ${p.code}`);
    }

    console.log('✅ Permissions seeded successfully!');

  } catch (err) {
    console.error('Error seeding permissions:', err);
  } finally {
    await client.end();
  }
}

seedPermissions();
