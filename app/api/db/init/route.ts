import { NextResponse } from 'next/server';
import { query, initDatabase } from '../../../../lib/db';
import { VEHICLES_DATA } from '../../../../data/vehicles';

export async function POST() {
  try {
    await initDatabase();

    // 1. Seed Users
    const users = [
      {
        id: 'usr_admin_1',
        name: 'Admin Administrator',
        email: 'admin@dreamsrent.com',
        password: 'adminpassword123',
        role: 'admin',
        avatar: '/images/team/team_ceo_male_1787225259487.jpg',
        phone: '+1 (242) 555-0199',
        address: 'Nassau HQ, Bahamas',
        driver_license: 'DL-BAH-0001-ADM'
      },
      {
        id: 'usr_vendor_1',
        name: 'Carlos Host (Vendor)',
        email: 'vendor@dreamsrent.com',
        password: 'vendorpassword123',
        role: 'vendor',
        avatar: '/images/team/team_business_head_1787225318994.jpg',
        phone: '+1 (242) 555-0144',
        address: 'Paradise Island Hub, Bahamas',
        driver_license: 'DL-BAH-0089-VND'
      },
      {
        id: 'usr_driver_1',
        name: 'Marcus Chauffeur (Driver)',
        email: 'driver@dreamsrent.com',
        password: 'driverpassword123',
        role: 'driver',
        avatar: '/images/team/team_ceo_female_1787225300600.jpg',
        phone: '+1 (242) 555-0188',
        address: 'Lynden Pindling Airport, Bahamas',
        driver_license: 'DL-BAH-98442-EXP2028'
      },
      {
        id: 'usr_customer_1',
        name: 'John Renter',
        email: 'customer@dreamsrent.com',
        password: 'customerpassword123',
        role: 'customer',
        avatar: '/images/user_image.jpg',
        phone: '+1 (242) 555-0182',
        address: '14 Bay Street, Nassau, Bahamas',
        driver_license: 'DL-BAH-9920148'
      }
    ];

    for (const u of users) {
      await query(`
        INSERT INTO users (id, name, email, password, role, avatar, phone, address, driver_license)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (email) DO UPDATE SET
          name = EXCLUDED.name,
          role = EXCLUDED.role,
          avatar = EXCLUDED.avatar,
          phone = EXCLUDED.phone;
      `, [u.id, u.name, u.email, u.password, u.role, u.avatar, u.phone, u.address, u.driver_license]);
    }

    // 2. Seed 24 Vehicles
    for (const v of VEHICLES_DATA) {
      await query(`
        INSERT INTO vehicles (
          id, owner_id, slug, title, brand, model, year, category, 
          price_per_day, hourly_price, deposit, featured_image, 
          gallery_images, specs, features, location, rating, 
          reviews_count, status, license_plate, vin
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
        ) ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          price_per_day = EXCLUDED.price_per_day,
          status = EXCLUDED.status;
      `, [
        v.id,
        'usr_vendor_1',
        v.slug,
        v.title,
        v.brand,
        v.model,
        v.year,
        v.category,
        v.pricePerDay,
        v.hourlyPrice,
        v.deposit,
        v.featuredImage,
        v.galleryImages,
        JSON.stringify(v.specs),
        v.features,
        v.location,
        v.rating,
        v.reviewsCount,
        v.status,
        v.licensePlate,
        v.vin
      ]);
    }

    return NextResponse.json({
      success: true,
      message: 'PostgreSQL database initialized and seeded with 4 users and 24 vehicles!',
      vehiclesCount: VEHICLES_DATA.length,
      usersCount: users.length
    });
  } catch (error: any) {
    console.error('Database Init Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
