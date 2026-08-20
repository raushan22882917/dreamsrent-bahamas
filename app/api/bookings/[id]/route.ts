import { NextResponse } from 'next/server';
import { query, initDatabase } from '../../../../lib/db';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    await initDatabase();
    const res = await query('UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *', [status, id]);

    if (res.rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Booking ${id} status updated to ${status} in PostgreSQL!`,
      booking: res.rows[0]
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
