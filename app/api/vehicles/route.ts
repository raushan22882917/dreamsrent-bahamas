import { NextResponse } from 'next/server';
import { query, initDatabase } from '../../../lib/db';
import { VEHICLES_DATA } from '../../../data/vehicles';
import { Vehicle } from '../../../types/rental';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get('ownerId');
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');

    try {
      await initDatabase();
      let sql = 'SELECT * FROM vehicles WHERE 1=1';
      const params: any[] = [];

      if (ownerId) {
        params.push(ownerId);
        sql += ` AND owner_id = $${params.length}`;
      }
      if (category && category !== 'All') {
        params.push(category);
        sql += ` AND category = $${params.length}`;
      }
      if (brand && brand !== 'All') {
        params.push(brand);
        sql += ` AND brand = $${params.length}`;
      }

      sql += ' ORDER BY created_at DESC';
      const res = await query(sql, params);

      if (res.rows.length > 0) {
        const mappedVehicles: Vehicle[] = res.rows.map(r => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          brand: r.brand,
          model: r.model,
          year: r.year,
          category: r.category,
          pricePerDay: Number(r.price_per_day),
          hourlyPrice: r.hourly_price ? Number(r.hourly_price) : undefined,
          deposit: Number(r.deposit),
          featuredImage: r.featured_image,
          galleryImages: r.gallery_images || [r.featured_image],
          specs: r.specs,
          features: r.features || [],
          location: r.location,
          rating: Number(r.rating),
          reviewsCount: r.reviews_count,
          status: r.status,
          licensePlate: r.license_plate,
          vin: r.vin
        }));

        return NextResponse.json({ success: true, vehicles: mappedVehicles });
      }
    } catch (dbErr) {
      console.warn('DB read fallback:', dbErr);
    }

    return NextResponse.json({ success: true, vehicles: VEHICLES_DATA });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      id = `car_${Date.now()}`,
      ownerId = 'usr_vendor_1',
      title,
      brand,
      model,
      year = 2025,
      category = 'Luxury',
      pricePerDay,
      deposit = 250,
      featuredImage = '/images/cars/car-01.jpg',
      specs,
      features = [],
      location = 'Nassau Main Port',
      status = 'Available'
    } = body;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    await initDatabase();
    await query(`
      INSERT INTO vehicles (
        id, owner_id, slug, title, brand, model, year, category,
        price_per_day, hourly_price, deposit, featured_image,
        gallery_images, specs, features, location, rating,
        reviews_count, status, license_plate, vin
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
    `, [
      id,
      ownerId,
      slug,
      title,
      brand,
      model,
      year,
      category,
      pricePerDay,
      Math.round(pricePerDay / 5),
      deposit,
      featuredImage,
      [featuredImage],
      JSON.stringify(specs || {
        transmission: 'Automatic',
        mileage: 'Unlimited',
        fuelType: 'Petrol',
        seats: 5,
        doors: 4,
        luggage: '3 Bags',
        engine: '3.0L Turbo',
        airConditioning: true
      }),
      features,
      location,
      5.0,
      1,
      status,
      `BS-${Math.floor(1000 + Math.random() * 9000)}`,
      `1G1${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    ]);

    return NextResponse.json({ success: true, message: 'Vehicle saved to PostgreSQL database!', id });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
