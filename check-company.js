const { Client } = require('pg');

const connectionString = 'postgresql://neondb_owner:npg_qNEe3X1Siovh@ep-solitary-cherry-ai9yl5q6-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
});

async function check() {
  try {
    await client.connect();
    console.log('Connected to database');

    const userRes = await client.query(`SELECT id, email, company_id FROM users WHERE email = 'owner@test.com'`);
    if (userRes.rows.length === 0) {
        console.log('User not found!');
        return;
    }
    const user = userRes.rows[0];
    console.log('User:', user);

    const companyRes = await client.query(`SELECT * FROM company WHERE id = $1`, [user.company_id]);
    if (companyRes.rows.length === 0) {
        console.log('Company not found!');
        return;
    }
    const company = companyRes.rows[0];
    console.log('Company:', company);

    const now = new Date();
    const expiry = new Date(company.subscription_expiry);
    console.log('Now:', now);
    console.log('Expiry:', expiry);
    console.log('Expired?', now > expiry);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

check();
