import pg from 'pg';
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:wiYVzGoUZmMDoyFAeAXtStwPzmRMMyoj@postgres.railway.internal:5432/railway';

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes('railway.internal') ? undefined : { rejectUnauthorized: false }
});

async function makeAdmin(targetEmail, targetName, targetPassword) {
  const client = await pool.connect();
  try {
    const email = (targetEmail || 'admin@dreamsrent.com').toLowerCase().trim();
    const name = targetName || 'Admin Administrator';
    const password = targetPassword || 'adminpassword123';

    console.log(`Checking user with email: ${email}`);
    const existing = await client.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existing.rows.length > 0) {
      await client.query('UPDATE users SET role = $1 WHERE email = $2', ['admin', email]);
      console.log(`Successfully updated ${email} to role 'admin'!`);
    } else {
      const id = `usr_admin_${Date.now()}`;
      await client.query(`
        INSERT INTO users (id, name, email, password, role, avatar, phone, address, driver_license)
        VALUES ($1, $2, $3, $4, 'admin', $5, $6, $7, $8)
      `, [
        id,
        name,
        email,
        password,
        '/images/team/team_ceo_male_1787225259487.jpg',
        '+1 (242) 555-0199',
        'Nassau Main Office, Bahamas',
        'DL-BAH-0001-ADM'
      ]);
      console.log(`Successfully created new Admin user ${email} (ID: ${id}) with role 'admin'!`);
    }

    const res = await client.query('SELECT id, name, email, role FROM users WHERE role = $1', ['admin']);
    console.log('\n Current Admins on Railway:');
    console.table(res.rows);
  } catch (err) {
    console.error('Error setting admin role:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

const args = process.argv.slice(2);
const emailArg = args[0] || 'admin@dreamsrent.com';
const nameArg = args[1] || 'Admin Administrator';
const passArg = args[2] || 'adminpassword123';

makeAdmin(emailArg, nameArg, passArg);
