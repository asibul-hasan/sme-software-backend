const { Client } = require('pg');

const connectionString = 'postgresql://neondb_owner:npg_qNEe3X1Siovh@ep-solitary-cherry-ai9yl5q6-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
});

const FORMS = [
  // HR
  { code: 'HR_1001', module: 'HR', name: 'Employee Form', actions: { view:true, create:true, edit:true, delete:true } },
  { code: 'HR_1002', module: 'HR', name: 'Attendance Form', actions: { view:true, create:true, edit:true, delete:true } },
  
  // Inventory
  { code: 'IN_1001', module: 'INVENTORY', name: 'Product Form', actions: { view:true, create:true, edit:true, delete:true } },
  { code: 'IN_1002', module: 'INVENTORY', name: 'Permission Form', actions: { view:true, create:true, edit:true, delete:true } }, // Wait, product category? User said IN_1002 used for form permission? No "IN_1001, IN_1002 it is used for under form permission". Let's assume generic names.
  
  // Sales
  { code: 'SL_1001', module: 'SALES', name: 'Invoice Form', actions: { view:true, create:true, edit:true, delete:true } },
  
  // Settings
  { code: 'ST_1001', module: 'SETTINGS', name: 'User Access Form', actions: { view:true, create:true, edit:true, delete:true } },
];

const MODULES = ['HR', 'INVENTORY', 'SALES', 'SETTINGS', 'REPORTS'];

async function seedForms() {
  try {
    await client.connect();
    console.log('Connected to database');

    // 1. Get Owner Designation
    const ownerRes = await client.query(`SELECT id FROM designations WHERE name = 'Owner' LIMIT 1`);
    if (ownerRes.rows.length === 0) {
        console.error('Owner designation not found! Run fix-backend-data.js first.');
        return;
    }
    const ownerId = ownerRes.rows[0].id;
    console.log(`Found Owner ID: ${ownerId}`);

    // 2. Clear existing forms? (Optional, use ON CONFLICT)
    // Actually, let's just insert/update forms.

    for (const f of FORMS) {
        // Insert Form
        const formRes = await client.query(`
            INSERT INTO forms (code, module, name, actions, created_at, updated_at)
            VALUES ($1, $2, $3, $4, NOW(), NOW())
            ON CONFLICT (code) DO UPDATE SET 
                module = EXCLUDED.module,
                name = EXCLUDED.name,
                actions = EXCLUDED.actions,
                updated_at = NOW()
            RETURNING id
        `, [f.code, f.module, f.name, f.actions]);
        
        const formId = formRes.rows[0].id;
        console.log(`Processed Form: ${f.code} (ID: ${formId})`);

        // 3. Assign Form Permissions to Owner (Full Access)
        await client.query(`
            INSERT INTO designation_form_permissions (designation_id, form_id, can_view, can_create, can_edit, can_delete, created_at, updated_at)
            VALUES ($1, $2, true, true, true, true, NOW(), NOW())
            ON CONFLICT (designation_id, form_id) DO UPDATE SET
                can_view = true, can_create = true, can_edit = true, can_delete = true, updated_at = NOW()
        `, [ownerId, formId]);
    }

    // 4. Assign Module Permissions to Owner
    for (const m of MODULES) {
        await client.query(`
            INSERT INTO designation_module_permissions (designation_id, module_code, has_access, created_at, updated_at)
            VALUES ($1, $2, true, NOW(), NOW())
            ON CONFLICT (designation_id, module_code) DO UPDATE SET
                has_access = true, updated_at = NOW()
        `, [ownerId, m]);
        console.log(`Processed Module: ${m}`);
    }

    console.log('✅ Forms and Permissions seeded successfully!');

  } catch (err) {
    console.error('Error seeding forms:', err);
  } finally {
    await client.end();
  }
}

seedForms();
