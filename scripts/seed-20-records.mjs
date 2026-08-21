import pg from 'pg';
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:wiYVzGoUZmMDoyFAeAXtStwPzmRMMyoj@postgres.railway.internal:5432/railway';

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes('railway.internal') ? undefined : { rejectUnauthorized: false }
});

async function main() {
  console.log(' Connecting to Railway PostgreSQL database...');
  const client = await pool.connect();

  try {
    console.log(' Creating Database Schema if not exists...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'customer',
        avatar VARCHAR(500),
        phone VARCHAR(100),
        address VARCHAR(255),
        driver_license VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS vehicles (
        id VARCHAR(100) PRIMARY KEY,
        owner_id VARCHAR(100) REFERENCES users(id) ON DELETE SET NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        brand VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        year INTEGER NOT NULL,
        category VARCHAR(100) NOT NULL,
        price_per_day NUMERIC(10, 2) NOT NULL,
        hourly_price NUMERIC(10, 2),
        deposit NUMERIC(10, 2) NOT NULL,
        featured_image VARCHAR(500) NOT NULL,
        gallery_images TEXT[],
        specs JSONB NOT NULL,
        features TEXT[],
        location VARCHAR(255) NOT NULL,
        rating NUMERIC(3, 1) DEFAULT 5.0,
        reviews_count INTEGER DEFAULT 1,
        status VARCHAR(50) DEFAULT 'Available',
        license_plate VARCHAR(50),
        vin VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS bookings (
        id VARCHAR(100) PRIMARY KEY,
        reservation_number VARCHAR(100) UNIQUE NOT NULL,
        vehicle_id VARCHAR(100) REFERENCES vehicles(id) ON DELETE CASCADE,
        customer_id VARCHAR(100) REFERENCES users(id) ON DELETE SET NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(100) NOT NULL,
        pickup_date VARCHAR(50) NOT NULL,
        return_date VARCHAR(50) NOT NULL,
        pickup_time VARCHAR(50) NOT NULL,
        return_time VARCHAR(50) NOT NULL,
        pickup_location VARCHAR(255) NOT NULL,
        return_location VARCHAR(255) NOT NULL,
        days INTEGER NOT NULL,
        daily_rate NUMERIC(10, 2) NOT NULL,
        extras_amount NUMERIC(10, 2) DEFAULT 0,
        insurance_amount NUMERIC(10, 2) DEFAULT 0,
        total_amount NUMERIC(10, 2) NOT NULL,
        deposit_amount NUMERIC(10, 2) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        payment_status VARCHAR(50) NOT NULL DEFAULT 'Paid Deposit',
        amount_paid NUMERIC(10, 2) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'Confirmed',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log(' Seeding 5 Role Users...');
    const users = [
      { id: 'usr_admin_1', name: 'Admin Administrator', email: 'admin@bahamasluxurydrive.com', password: 'adminpassword123', role: 'admin', avatar: '/images/team/team_ceo_male_1787225259487.jpg', phone: '+1 (242) 555-0199', address: 'Nassau Main Office, Bahamas', driver_license: 'DL-BAH-0001-ADM' },
      { id: 'usr_vendor_1', name: 'Carlos Host (Vendor)', email: 'vendor@bahamasluxurydrive.com', password: 'vendorpassword123', role: 'vendor', avatar: '/images/team/team_business_head_1787225318994.jpg', phone: '+1 (242) 555-0144', address: 'Paradise Island Marina Hub, Bahamas', driver_license: 'DL-BAH-0089-VND' },
      { id: 'usr_vendor_2', name: 'Elena Luxury Fleets (Vendor 2)', email: 'elena@bahamasluxurydrive.com', password: 'vendorpassword123', role: 'vendor', avatar: '/images/team/team_ceo_female_1787225300600.jpg', phone: '+1 (242) 555-0122', address: 'Cable Beach Resort Hub', driver_license: 'DL-BAH-0092-VND' },
      { id: 'usr_driver_1', name: 'Marcus Chauffeur (Driver)', email: 'driver@bahamasluxurydrive.com', password: 'driverpassword123', role: 'driver', avatar: '/images/team/team_business_head_1787225318994.jpg', phone: '+1 (242) 555-0188', address: 'Lynden Pindling Airport (NAS), Bahamas', driver_license: 'DL-BAH-98442-EXP2028' },
      { id: 'usr_customer_1', name: 'John Renter (Customer)', email: 'customer@bahamasluxurydrive.com', password: 'customerpassword123', role: 'customer', avatar: '/images/user_image.jpg', phone: '+1 (242) 555-0182', address: '14 Bay Street, Nassau, Bahamas', driver_license: 'DL-BAH-9920148' }
    ];

    for (const u of users) {
      await client.query(`
        INSERT INTO users (id, name, email, password, role, avatar, phone, address, driver_license)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          email = EXCLUDED.email,
          role = EXCLUDED.role,
          avatar = EXCLUDED.avatar;
      `, [u.id, u.name, u.email, u.password, u.role, u.avatar, u.phone, u.address, u.driver_license]);
    }

    console.log(' Seeding 24 Vehicles...');
    const vehiclesData = [
      { id: 'car-1', title: 'Ferrari 458 MM Speciale', brand: 'Ferrari', model: '458 MM', year: 2024, category: 'Sport', price: 160, deposit: 400, img: '/images/cars/car-01.jpg', loc: 'Nassau Airport (NAS)' },
      { id: 'car-2', title: '2018 Chevrolet Camaro', brand: 'Chevrolet', model: 'Camaro SS', year: 2023, category: 'Convertible', price: 100, deposit: 250, img: '/images/cars/car-02.jpg', loc: 'Paradise Island Hub' },
      { id: 'car-3', title: 'Tesla Camry SE 350', brand: 'Tesla', model: 'Model 3 Sport', year: 2024, category: 'Sedan', price: 120, deposit: 300, img: '/images/cars/car-03.jpg', loc: 'Cable Beach Resort Hub' },
      { id: 'car-4', title: 'Audi A3 2019 New', brand: 'Audi', model: 'A3 Quattro', year: 2024, category: 'Luxury', price: 140, deposit: 350, img: '/images/cars/car-04.jpg', loc: 'Downtown Nassau Harbor' },
      { id: 'car-5', title: '2023 Acura Integra', brand: 'Acura', model: 'Integra A-Spec', year: 2023, category: 'Sport', price: 110, deposit: 250, img: '/images/cars/car-05.jpg', loc: 'Lynden Pindling International' },
      { id: 'car-6', title: 'Porsche 911 Carrera GTS', brand: 'Porsche', model: '911 Carrera GTS', year: 2024, category: 'Sport', price: 220, deposit: 500, img: '/images/cars/car-06.jpg', loc: 'Paradise Island Hub' },
      { id: 'car-7', title: 'Range Rover Sport HSE', brand: 'Land Rover', model: 'Range Rover Sport', year: 2024, category: 'SUV / 4x4', price: 180, deposit: 450, img: '/images/cars/car-07.jpg', loc: 'Nassau Airport (NAS)' },
      { id: 'car-8', title: 'Mercedes-Benz G63 AMG', brand: 'Mercedes-Benz', model: 'G63 AMG Biturbo', year: 2024, category: 'SUV / 4x4', price: 280, deposit: 600, img: '/images/cars/car-08.jpg', loc: 'Cable Beach Resort Hub' },
      { id: 'car-9', title: 'BMW M4 Competition', brand: 'BMW', model: 'M4 Coupe', year: 2024, category: 'Sport', price: 175, deposit: 400, img: '/images/cars/car-09.jpg', loc: 'Downtown Nassau Harbor' },
      { id: 'car-10', title: 'Rolls-Royce Ghost Series II', brand: 'Rolls-Royce', model: 'Ghost', year: 2024, category: 'Luxury', price: 450, deposit: 1000, img: '/images/cars/car-10.jpg', loc: 'Paradise Island Hub' },
      { id: 'car-11', title: 'Lamborghini Urus S', brand: 'Lamborghini', model: 'Urus S Twin-Turbo', year: 2024, category: 'SUV / 4x4', price: 350, deposit: 800, img: '/images/cars/car-11.jpg', loc: 'Lynden Pindling International' },
      { id: 'car-12', title: 'Bentley Continental GT V8', brand: 'Bentley', model: 'Continental GT', year: 2024, category: 'Luxury', price: 320, deposit: 750, img: '/images/cars/car-12.jpg', loc: 'Paradise Island Hub' },
      { id: 'car-13', title: 'Aston Martin DB12 Coupe', brand: 'Aston Martin', model: 'DB12 Twin-Turbo', year: 2024, category: 'Sport', price: 290, deposit: 700, img: '/images/cars/car-13.jpg', loc: 'Nassau Airport (NAS)' },
      { id: 'car-14', title: 'Mercedes-AMG GT Black Series', brand: 'Mercedes-Benz', model: 'AMG GT', year: 2024, category: 'Sport', price: 260, deposit: 600, img: '/images/cars/car-14.jpg', loc: 'Cable Beach Resort Hub' },
      { id: 'car-15', title: 'McLaren 720S Spider', brand: 'McLaren', model: '720S Spider', year: 2024, category: 'Convertible', price: 380, deposit: 900, img: '/images/cars/car-15.jpg', loc: 'Paradise Island Hub' },
      { id: 'car-16', title: 'Cadillac Escalade Platinum', brand: 'Cadillac', model: 'Escalade ESV', year: 2024, category: 'SUV / 4x4', price: 160, deposit: 400, img: '/images/cars/car-16.jpg', loc: 'Downtown Nassau Harbor' },
      { id: 'car-17', title: 'Ford Mustang Dark Horse V8', brand: 'Ford', model: 'Mustang GT', year: 2024, category: 'Sport', price: 115, deposit: 250, img: '/images/cars/car-17.jpg', loc: 'Nassau Airport (NAS)' },
      { id: 'car-18', title: 'Jeep Wrangler Rubicon 4xe', brand: 'Jeep', model: 'Wrangler Rubicon', year: 2024, category: 'SUV / 4x4', price: 130, deposit: 300, img: '/images/cars/car-18.jpg', loc: 'Cable Beach Resort Hub' },
      { id: 'car-19', title: 'Porsche Macan GTS Sport', brand: 'Porsche', model: 'Macan GTS', year: 2024, category: 'SUV / 4x4', price: 155, deposit: 350, img: '/images/cars/car-19.jpg', loc: 'Lynden Pindling International' },
      { id: 'car-20', title: 'BMW 760i xDrive Executive', brand: 'BMW', model: '760i M Sport', year: 2024, category: 'Luxury', price: 210, deposit: 500, img: '/images/cars/car-20.jpg', loc: 'Paradise Island Hub' },
      { id: 'car-21', title: 'Audi RS6 Avant Quattro', brand: 'Audi', model: 'RS6 Avant', year: 2024, category: 'Luxury', price: 195, deposit: 450, img: '/images/cars/car-01.jpg', loc: 'Downtown Nassau Harbor' },
      { id: 'car-22', title: 'Lexus LC500 V8 Convertible', brand: 'Lexus', model: 'LC500', year: 2024, category: 'Convertible', price: 190, deposit: 450, img: '/images/cars/car-02.jpg', loc: 'Paradise Island Hub' },
      { id: 'car-23', title: 'Corvette Z06 Mid-Engine', brand: 'Chevrolet', model: 'Corvette Z06', year: 2024, category: 'Sport', price: 205, deposit: 500, img: '/images/cars/car-03.jpg', loc: 'Nassau Airport (NAS)' },
      { id: 'car-24', title: 'Mercedes-Maybach S680 V12', brand: 'Mercedes-Benz', model: 'Maybach S680', year: 2024, category: 'Luxury', price: 420, deposit: 1000, img: '/images/cars/car-04.jpg', loc: 'Paradise Island Hub' }
    ];

    for (const v of vehiclesData) {
      const slug = v.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await client.query(`
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
        slug,
        v.title,
        v.brand,
        v.model,
        v.year,
        v.category,
        v.price,
        Math.round(v.price / 5),
        v.deposit,
        v.img,
        [v.img, '/images/cars/car-02.jpg', '/images/cars/car-03.jpg'],
        JSON.stringify({
          transmission: 'Automatic',
          mileage: 'Unlimited',
          fuelType: 'Petrol',
          seats: 5,
          doors: 4,
          luggage: '3 Bags',
          engine: '3.0L Twin-Turbo V6',
          airConditioning: true
        }),
        ['GPS Navigation', 'Bluetooth Audio', 'Touchscreen Infotainment', 'Leather Seats', 'Rear Camera', 'Cruise Control'],
        v.loc,
        5.0,
        Math.floor(1 + Math.random() * 15),
        'Available',
        `BS-${Math.floor(1000 + Math.random() * 9000)}`,
        `1G1${Math.random().toString(36).substring(2, 10).toUpperCase()}`
      ]);
    }

    console.log(' Seeding 20 Real Customer Bookings in PostgreSQL...');
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
      const car = vehiclesData[i];
      const cust = customerNames[i];
      const days = 2 + (i % 5);
      const dailyRate = car.price;
      const total = dailyRate * days;
      const deposit = car.deposit;
      const status = statuses[i % statuses.length];
      const pickupDate = `2026-08-${String(15 + (i % 12)).padStart(2, '0')}`;
      const returnDate = `2026-08-${String(15 + (i % 12) + days).padStart(2, '0')}`;
      const resNum = `RES-2026-${String(100420 + i).padStart(6, '0')}`;

      await client.query(`
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
        car.loc || locations[i % locations.length],
        car.loc || locations[i % locations.length],
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

    console.log(' Successfully seeded 24 Vehicles, 20 Bookings, and 5 Users in Railway PostgreSQL!');

    const countUsers = await client.query('SELECT count(*) FROM users');
    const countCars = await client.query('SELECT count(*) FROM vehicles');
    const countBookings = await client.query('SELECT count(*) FROM bookings');

    console.log(`\n Database Status Summary:`);
    console.log(`• Total Users: ${countUsers.rows[0].count}`);
    console.log(`• Total Vehicles: ${countCars.rows[0].count}`);
    console.log(`• Total Bookings: ${countBookings.rows[0].count}`);

  } catch (err) {
    console.error(' Seeding Error:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
