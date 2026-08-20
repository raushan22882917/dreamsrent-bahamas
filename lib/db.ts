import { Pool } from 'pg';

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' && !connectionString?.includes('localhost') && !connectionString?.includes('railway.internal')
        ? { rejectUnauthorized: false }
        : undefined,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}

export async function query(text: string, params?: any[]) {
  const db = getDbPool();
  return await db.query(text, params);
}

export async function initDatabase() {
  const db = getDbPool();
  
  // Create tables if not exist
  await db.query(`
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
}
