import { NextResponse } from 'next/server';
import { query, initDatabase } from '../../../../lib/db';
import { VEHICLES_DATA } from '../../../../data/vehicles';

export async function POST() {
  try {
    await initDatabase();

    // 1. Seed Users
    const users = [
      { id: 'usr_admin_1', name: 'Admin Administrator', email: 'admin@dreamsrent.com', password: 'adminpassword123', role: 'admin', avatar: '/images/team/team_ceo_male_1787225259487.jpg', phone: '+1 (242) 555-0199', address: 'Nassau Main Office, Bahamas', driver_license: 'DL-BAH-0001-ADM' },
      { id: 'usr_vendor_1', name: 'Carlos Host (Vendor)', email: 'vendor@dreamsrent.com', password: 'vendorpassword123', role: 'vendor', avatar: '/images/team/team_business_head_1787225318994.jpg', phone: '+1 (242) 555-0144', address: 'Paradise Island Marina Hub, Bahamas', driver_license: 'DL-BAH-0089-VND' },
      { id: 'usr_vendor_2', name: 'Elena Luxury Fleets (Vendor 2)', email: 'elena@dreamsrent.com', password: 'vendorpassword123', role: 'vendor', avatar: '/images/team/team_ceo_female_1787225300600.jpg', phone: '+1 (242) 555-0122', address: 'Cable Beach Resort Hub', driver_license: 'DL-BAH-0092-VND' },
      { id: 'usr_driver_1', name: 'Marcus Chauffeur (Driver)', email: 'driver@dreamsrent.com', password: 'driverpassword123', role: 'driver', avatar: '/images/team/team_business_head_1787225318994.jpg', phone: '+1 (242) 555-0188', address: 'Lynden Pindling Airport (NAS), Bahamas', driver_license: 'DL-BAH-98442-EXP2028' },
      { id: 'usr_customer_1', name: 'John Renter (Customer)', email: 'customer@dreamsrent.com', password: 'customerpassword123', role: 'customer', avatar: '/images/user_image.jpg', phone: '+1 (242) 555-0182', address: '14 Bay Street, Nassau, Bahamas', driver_license: 'DL-BAH-9920148' }
    ];

    for (const u of users) {
      await query(`
        INSERT INTO users (id, name, email, password, role, avatar, phone, address, driver_license)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          email = EXCLUDED.email,
          role = EXCLUDED.role,
          avatar = EXCLUDED.avatar;
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

    // 3. Seed 20 Real Customer Bookings
    const customerNames = [
      { name: 'Alexander Wright', email: 'alex.wright@gmail.com', phone: '+1 (305) 882-9011' },
      { name: 'Sophia Loren Martinez', email: 'sophia.martinez@outlook.com', phone: '+1 (415) 392-8812' },
      { name: 'David Beckham Jr', email: 'david.b@luxurytours.co', phone: '+1 (212) 774-0091' },
      { name: 'Chloe Dubois', email: 'chloe.dubois@voyage.fr', phone: '+33 6 12 34 56 78' },
      { name: 'Michael Chang', email: 'm.chang@techcorp.io', phone: '+1 (650) 441-9923' },
      { name: 'Isabella Rossi', email: 'isabella.rossi@milan.it', phone: '+39 340 1234567' },
      { name: 'Lucas Sterling', email: 'lucas.sterling@bahamasvip.com', phone: '+1 (242) 555-8821' },
      { name: 'Olivia Harrington', email: 'olivia.h@estatecapital.co', phone: '+1 (786) 902-1144' },
      { name: 'Ethan James Vance', email: 'ethan.vance@advisors.net', phone: '+1 (312) 881-2299' },
      { name: 'Mia Gabriella', email: 'mia.gabriella@yachtcharter.com', phone: '+1 (305) 551-7733' },
      { name: 'William Henderson', email: 'william.h@apexinvest.com', phone: '+1 (404) 991-3322' },
      { name: 'Emily Watson', email: 'emily.watson@oxford.ac.uk', phone: '+44 7700 900123' },
      { name: 'James Thornton', email: 'j.thornton@islandvillas.com', phone: '+1 (242) 555-0914' },
      { name: 'Charlotte Dupont', email: 'char.dupont@paris.fr', phone: '+33 7 99 88 77 66' },
      { name: 'Benjamin Cole', email: 'b.cole@innovatetech.com', phone: '+1 (206) 555-4411' },
      { name: 'Ava Montgomery', email: 'ava.m@fashionhouse.com', phone: '+1 (310) 555-7788' },
      { name: 'Henry Cavendish', email: 'h.cavendish@royalmarina.uk', phone: '+44 7911 123456' },
      { name: 'Grace O’Connor', email: 'grace.oconnor@dublin.ie', phone: '+353 87 123 4567' },
      { name: 'Daniel Kim', email: 'daniel.kim@seoulventures.kr', phone: '+82 10 1234 5678' },
      { name: 'Victoria Sinclair', email: 'victoria.sinclair@sinclairlaw.com', phone: '+1 (617) 555-9988' }
    ];

    const statuses = ['Confirmed', 'Active Rental', 'Completed', 'Confirmed', 'Active Rental', 'Completed', 'Confirmed'];
    const locations = ['Nassau Airport (NAS)', 'Paradise Island Hub', 'Cable Beach Resort Hub', 'Downtown Nassau Harbor', 'Lynden Pindling International'];

    for (let i = 0; i < 20; i++) {
      const car = VEHICLES_DATA[i % VEHICLES_DATA.length];
      const cust = customerNames[i];
      const days = 2 + (i % 5);
      const dailyRate = car.pricePerDay;
      const total = dailyRate * days;
      const deposit = car.deposit;
      const status = statuses[i % statuses.length];
      const pickupDate = `2026-08-${String(15 + (i % 12)).padStart(2, '0')}`;
      const returnDate = `2026-08-${String(15 + (i % 12) + days).padStart(2, '0')}`;
      const resNum = `RES-2026-${String(100420 + i).padStart(6, '0')}`;

      await query(`
        INSERT INTO bookings (
          id, reservation_number, vehicle_id, customer_id, customer_name,
          customer_email, customer_phone, pickup_date, return_date,
          pickup_time, return_time, pickup_location, return_location,
          days, daily_rate, extras_amount, insurance_amount,
          total_amount, deposit_amount, payment_method, payment_status,
          amount_paid, status
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23
        ) ON CONFLICT (id) DO UPDATE SET
          status = EXCLUDED.status,
          total_amount = EXCLUDED.total_amount;
      `, [
        `bk_${100 + i}`,
        resNum,
        car.id,
        'usr_customer_1',
        cust.name,
        cust.email,
        cust.phone,
        pickupDate,
        returnDate,
        '10:00 AM',
        '04:00 PM',
        car.location || locations[i % locations.length],
        car.location || locations[i % locations.length],
        days,
        dailyRate,
        25,
        50,
        total + 75,
        deposit,
        'Credit Card',
        'Paid in Full',
        total + 75,
        status
      ]);
    }

    const countUsers = await query('SELECT count(*) FROM users');
    const countCars = await query('SELECT count(*) FROM vehicles');
    const countBookings = await query('SELECT count(*) FROM bookings');

    return NextResponse.json({
      success: true,
      message: 'PostgreSQL database initialized and seeded with 24 vehicles, 20 bookings, and 5 users!',
      databaseCounts: {
        users: Number(countUsers.rows[0].count),
        vehicles: Number(countCars.rows[0].count),
        bookings: Number(countBookings.rows[0].count)
      }
    });
  } catch (error: any) {
    console.error('Database Init Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
