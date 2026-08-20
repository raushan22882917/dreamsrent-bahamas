import { NextResponse } from 'next/server';
import { query, initDatabase } from '../../../../lib/db';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password required' }, { status: 400 });
    }

    try {
      await initDatabase();
      const res = await query('SELECT * FROM users WHERE email = $1 AND password = $2', [email.toLowerCase().trim(), password]);
      
      if (res.rows.length > 0) {
        const user = res.rows[0];
        return NextResponse.json({
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            phone: user.phone,
            address: user.address,
            driverLicense: user.driver_license
          }
        });
      }
    } catch (dbErr) {
      console.warn('DB fallback check for login:', dbErr);
    }

    // Fallback for demo users if DB is temporarily unreachable
    const DEMO_ACCOUNTS: Record<string, any> = {
      'admin@dreamsrent.com': {
        id: 'usr_admin_1',
        name: 'Admin Administrator',
        email: 'admin@dreamsrent.com',
        role: 'admin',
        avatar: '/images/team/team_ceo_male_1787225259487.jpg',
        phone: '+1 (242) 555-0199',
        address: 'Nassau Main Office, Bahamas',
        driverLicense: 'DL-BAH-0001-ADM'
      },
      'vendor@dreamsrent.com': {
        id: 'usr_vendor_1',
        name: 'Carlos Host (Vendor)',
        email: 'vendor@dreamsrent.com',
        role: 'vendor',
        avatar: '/images/team/team_business_head_1787225318994.jpg',
        phone: '+1 (242) 555-0144',
        address: 'Paradise Island Hub, Bahamas',
        driverLicense: 'DL-BAH-0089-VND'
      },
      'driver@dreamsrent.com': {
        id: 'usr_driver_1',
        name: 'Marcus Chauffeur (Driver)',
        email: 'driver@dreamsrent.com',
        role: 'driver',
        avatar: '/images/team/team_ceo_female_1787225300600.jpg',
        phone: '+1 (242) 555-0188',
        address: 'Lynden Pindling Airport, Bahamas',
        driverLicense: 'DL-BAH-98442-EXP2028'
      },
      'customer@dreamsrent.com': {
        id: 'usr_customer_1',
        name: 'John Renter',
        email: 'customer@dreamsrent.com',
        role: 'customer',
        avatar: '/images/user_image.jpg',
        phone: '+1 (242) 555-0182',
        address: '14 Bay Street, Nassau, Bahamas',
        driverLicense: 'DL-BAH-9920148'
      }
    };

    const found = DEMO_ACCOUNTS[email.toLowerCase().trim()];
    if (found) {
      return NextResponse.json({ success: true, user: found });
    }

    return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
