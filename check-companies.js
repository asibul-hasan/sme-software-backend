const { Client } = require('pg');

const connectionString = 'postgresql://neondb_owner:npg_qNEe3X1Siovh@ep-solitary-cherry-ai9yl5q6-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
});

async function checkCompanies() {
  try {
    await client.connect();
    console.log('Connected to database');

    const res = await client.query(`SELECT * FROM companies WHERE id = 1`);
    if (res.rows.length === 0) {
        console.log('Company ID 1 not found in "companies" table!');
    } else {
        console.log('Found in "companies":', res.rows[0]);
    }
    
    const resSingular = await client.query(`SELECT * FROM company WHERE id = 1`);
    if (resSingular.rows.length === 0) {
        console.log('Company ID 1 not found in "company" table!');
    } else {
         console.log('Found in "company":', resSingular.rows[0]);
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

checkCompanies();
