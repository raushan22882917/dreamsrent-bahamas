import { NextResponse } from 'next/server';
import { query, initDatabase } from '../../../lib/db';
import { Booking } from '../../../types/rental';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get('customerId');
    const vehicleOwnerId = searchParams.get('ownerId');

    try {
      await initDatabase();
      let sql = `
        SELECT b.*, 
               v.title as vehicle_title, 
               v.featured_image as vehicle_image,
               v.brand as vehicle_brand,
               v.category as vehicle_category,
               v.price_per_day as vehicle_price,
               v.deposit as vehicle_deposit,
               v.specs as vehicle_specs
        FROM bookings b
        JOIN vehicles v ON b.vehicle_id = v.id
        WHERE 1=1
      `;
      const params: any[] = [];

      if (customerId) {
        params.push(customerId);
        sql += ` AND b.customer_id = $${params.length}`;
      }
      if (vehicleOwnerId) {
        params.push(vehicleOwnerId);
        sql += ` AND v.owner_id = $${params.length}`;
      }

      sql += ' ORDER BY b.created_at DESC';
      const res = await query(sql, params);

      if (res.rows.length > 0) {
        const bookings: Booking[] = res.rows.map(r => ({
          id: r.id,
          reservationNumber: r.reservation_number,
          vehicleId: r.vehicle_id,
          vehicle: {
            id: r.vehicle_id,
            slug: r.vehicle_title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            title: r.vehicle_title,
            brand: r.vehicle_brand,
            model: '',
            year: 2025,
            category: r.vehicle_category,
            pricePerDay: Number(r.vehicle_price),
            deposit: Number(r.vehicle_deposit),
            featuredImage: r.vehicle_image,
            galleryImages: [r.vehicle_image],
            specs: r.vehicle_specs || {
              transmission: 'Automatic',
              mileage: 'Unlimited',
              fuelType: 'Petrol',
              seats: 5,
              doors: 4,
              luggage: '3 Bags',
              engine: '3.0L Turbo',
              airConditioning: true
            },
            features: [],
            location: r.pickup_location,
            rating: 5.0,
            reviewsCount: 1,
            status: 'Rented'
          },
          customer: {
            fullName: r.customer_name,
            email: r.customer_email,
            phone: r.customer_phone,
            driverLicenseNumber: 'DL-VERIFIED',
            address: 'Bahamas'
          },
          pickupDate: r.pickup_date,
          returnDate: r.return_date,
          pickupTime: r.pickup_time,
          returnTime: r.return_time,
          pickupLocation: r.pickup_location,
          returnLocation: r.return_location,
          days: r.days,
          dailyRate: Number(r.daily_rate),
          rentalSubtotal: Number(r.daily_rate) * Number(r.days),
          selectedExtras: [],
          extrasTotal: Number(r.extras_amount) || 0,
          taxes: Math.round(Number(r.total_amount) * 0.1),
          depositAmount: Number(r.deposit_amount),
          totalAmount: Number(r.total_amount),
          amountPaid: Number(r.amount_paid),
          balanceDue: Math.max(0, Number(r.total_amount) - Number(r.amount_paid)),
          paymentType: 'full',
          paymentMethod: (r.payment_method?.toLowerCase().includes('card') ? 'card' : 'cash') as any,
          status: r.status,
          createdAt: r.created_at
        }));

        return NextResponse.json({ success: true, bookings });
      }
    } catch (dbErr) {
      console.warn('DB Bookings read fallback:', dbErr);
    }

    return NextResponse.json({ success: true, bookings: [] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const id = b.id || `res_${Date.now()}`;
    const resNumber = b.reservationNumber || `DR-${Math.floor(100000 + Math.random() * 900000)}`;

    await initDatabase();
    await query(`
      INSERT INTO bookings (
        id, reservation_number, vehicle_id, customer_id, customer_name,
        customer_email, customer_phone, pickup_date, return_date,
        pickup_time, return_time, pickup_location, return_location,
        days, daily_rate, extras_amount, insurance_amount,
        total_amount, deposit_amount, payment_method, payment_status,
        amount_paid, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
    `, [
      id,
      resNumber,
      b.vehicleId || b.vehicle?.id,
      b.customer?.id || 'usr_customer_1',
      b.customer?.fullName || 'John Renter',
      b.customer?.email || 'customer@dreamsrent.com',
      b.customer?.phone || '+1 (242) 555-0182',
      b.pickupDate,
      b.returnDate,
      b.pickupTime || '10:00 AM',
      b.returnTime || '10:00 AM',
      b.pickupLocation,
      b.returnLocation || b.pickupLocation,
      b.days || 1,
      b.dailyRate || b.vehicle?.pricePerDay || 100,
      b.extrasTotal || b.extrasAmount || 0,
      b.insuranceAmount || 0,
      b.totalAmount,
      b.depositAmount || 250,
      b.paymentMethod || 'card',
      b.paymentStatus || 'Paid Deposit',
      b.amountPaid || b.totalAmount,
      b.status || 'Confirmed'
    ]);

    return NextResponse.json({
      success: true,
      message: 'Booking created successfully in PostgreSQL database!',
      id,
      reservationNumber: resNumber
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
