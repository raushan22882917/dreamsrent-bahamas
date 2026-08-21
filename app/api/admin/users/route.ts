import { NextResponse } from 'next/server';
import { query, initDatabase } from '../../../lib/db';

// GET all users with their roles
export async function GET() {
  try {
    await initDatabase();
    const result = await query('SELECT id, name, email, role, phone, address, created_at FROM users ORDER BY created_at ASC');
    return NextResponse.json({ success: true, users: result.rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST to create a new admin or promote an existing user to admin
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password, role = 'admin', phone, address, driverLicense } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    await initDatabase();

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await query('SELECT * FROM users WHERE email = $1', [normalizedEmail]);

    if (existing.rows.length > 0) {
      // Update existing user role to admin (or specified role)
      await query(
        `UPDATE users SET role = $1 WHERE email = $2`,
        [role, normalizedEmail]
      );

      const updated = await query('SELECT id, name, email, role, phone, address FROM users WHERE email = $1', [normalizedEmail]);
      return NextResponse.json({
        success: true,
        message: `User ${normalizedEmail} role successfully updated to '${role}' on Railway database.`,
        user: updated.rows[0]
      });
    } else {
      // Create new user with admin role
      const id = `usr_admin_${Date.now()}`;
      const userName = name || 'Admin User';
      const userPassword = password || 'adminpassword123';
      const avatar = '/images/team/team_ceo_male_1787225259487.jpg';

      await query(
        `INSERT INTO users (id, name, email, password, role, avatar, phone, address, driver_license)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [id, userName, normalizedEmail, userPassword, role, avatar, phone || '+1 (242) 555-0199', address || 'Nassau HQ, Bahamas', driverLicense || 'DL-BAH-ADM-01']
      );

      return NextResponse.json({
        success: true,
        message: `New user created with '${role}' role in Railway database.`,
        user: {
          id,
          name: userName,
          email: normalizedEmail,
          role,
          phone: phone || '+1 (242) 555-0199',
          address: address || 'Nassau HQ, Bahamas'
        }
      });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
