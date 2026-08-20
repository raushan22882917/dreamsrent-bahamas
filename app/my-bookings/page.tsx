'use client';

import React from 'react';
import Link from 'next/link';
import { useRental } from '../../context/RentalContext';
import { Calendar, MapPin, ShieldCheck, Printer, XCircle, ArrowRight } from 'lucide-react';

export default function MyBookingsPage() {
  const { bookings, cancelBooking } = useRental();

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 mb-1">
              <Link href="/dashboard" className="hover:text-orange-600">Dashboard</Link>
              <span>/</span>
              <span className="text-gray-900">Reservations</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900">My Rental Bookings</h1>
            <p className="text-sm text-gray-500">Manage upcoming island rentals, download vouchers, and view history.</p>
          </div>

          <Link
            href="/rental-grid"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/25 flex items-center space-x-2 flex-shrink-0"
          >
            <span>Book New Car</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bookings List */}
        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div 
                key={booking.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
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
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>

                {/* Car & Itinerary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  
                  {/* Car info */}
                  <div className="flex items-center space-x-4">
                    <img 
                      src={booking.vehicle.featuredImage} 
                      alt={booking.vehicle.title} 
                      className="w-28 h-20 rounded-2xl object-cover border border-gray-200"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-orange-600">{booking.vehicle.category}</span>
                      <h3 className="font-bold text-gray-900 text-base">{booking.vehicle.title}</h3>
                      <p className="text-xs text-gray-400">${booking.dailyRate} / day</p>
                    </div>
                  </div>

                  {/* Dates & Locations */}
                  <div className="space-y-2 text-xs bg-gray-50 p-4 rounded-2xl">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                      <span><strong>Pickup:</strong> {booking.pickupLocation} ({booking.pickupDate})</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                      <span><strong>Return:</strong> {booking.returnLocation} ({booking.returnDate})</span>
                    </div>
                  </div>

                  {/* Pricing & Actions */}
                  <div className="flex flex-col items-end space-y-3">
                    <div className="text-right">
                      <span className="text-xs text-gray-400">Total ({booking.days} Days)</span>
                      <p className="text-xl font-black text-gray-900">${booking.totalAmount}</p>
                    </div>

                    <div className="flex space-x-2">
                      <Link
                        href={`/confirmation?id=${booking.id}`}
                        className="px-4 py-2 bg-gray-900 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center space-x-1"
                      >
                        <Printer className="w-3.5 h-3.5 mr-1" />
                        <span>Voucher</span>
                      </Link>

                      {booking.status !== 'Cancelled' && (
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to cancel this reservation?')) {
                              cancelBooking(booking.id);
                            }
                          }}
                          className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm space-y-4">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-lg font-bold text-gray-900">No Rental Bookings Found</h3>
            <p className="text-xs text-gray-500">Ready to cruise the Bahamas? Select a car and make your reservation.</p>
            <Link
              href="/rental-grid"
              className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl"
            >
              Explore 20 Available Vehicles
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
