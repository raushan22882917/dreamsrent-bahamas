'use client';

import React from 'react';
import Link from 'next/link';
import { useRental } from '../../context/RentalContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Calendar, MapPin, Printer, XCircle, ArrowRight } from 'lucide-react';

export default function MyBookingsPage() {
  const { bookings, cancelBooking } = useRental();

  return (
    <DashboardLayout
      title="My Rental Bookings"
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'My Bookings' }]}
    >
      <div className="space-y-6 max-w-5xl">
        
        {/* Bookings List */}
        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div 
                key={booking.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EAEDF0] shadow-sm space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#EAEDF0] gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono font-bold bg-gray-100 text-gray-800 px-3 py-1 rounded-lg">
                      {booking.reservationNumber}
                    </span>
                    <span className="text-xs text-gray-400">
                      Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    booking.status === 'Confirmed' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : booking.status === 'Cancelled'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Car Image & Info */}
                  <div className="lg:col-span-6 flex items-center space-x-4">
                    <img 
                      src={booking.vehicle.featuredImage} 
                      alt={booking.vehicle.title}
                      className="w-28 h-20 rounded-xl object-cover border border-[#EAEDF0] flex-shrink-0" 
                    />
                    <div>
                      <h3 className="text-base font-bold text-[#201F1D]">{booking.vehicle.title}</h3>
                      <p className="text-xs text-[#878A99] flex items-center mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#FFA633] mr-1" />
                        {booking.pickupLocation}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        ${booking.dailyRate} / day • {booking.days} Days Total
                      </p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="lg:col-span-3 text-xs text-gray-600 space-y-1">
                    <p><b className="text-gray-900">Pickup:</b> {booking.pickupDate} ({booking.pickupTime})</p>
                    <p><b className="text-gray-900">Return:</b> {booking.returnDate} ({booking.returnTime})</p>
                  </div>

                  {/* Total & Action */}
                  <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-end justify-between gap-3">
                    <div className="text-right">
                      <span className="text-xs text-[#878A99] block">Total Amount</span>
                      <span className="text-xl font-black text-[#FFA633]">${booking.totalAmount}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link
                        href="/confirmation"
                        className="px-3.5 py-2 bg-[#1B1B1B] hover:bg-black text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Voucher</span>
                      </Link>

                      {booking.status !== 'Cancelled' && (
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to cancel this booking?')) {
                              cancelBooking(booking.id);
                            }
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                          title="Cancel Reservation"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#EAEDF0]">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">No Bookings Found</h3>
            <p className="text-xs text-gray-500 mb-6">You haven&apos;t reserved any rental vehicles yet.</p>
            <Link
              href="/rental-grid"
              className="px-6 py-2.5 bg-[#FFA633] text-white font-bold text-xs rounded-xl shadow inline-flex items-center space-x-2"
            >
              <span>Explore Rental Fleet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
