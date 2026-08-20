'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useRental } from '../../context/RentalContext';
import { 
  CheckCircle2, 
  Printer, 
  MapPin, 
  ArrowRight
} from 'lucide-react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('id');
  const { bookings } = useRental();

  const booking = bookings.find(b => b.id === bookingId) || bookings[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Success Header */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl text-center space-y-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full uppercase tracking-wider">
          Booking Confirmed & Ready
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          Thank You, {booking.customer.fullName}!
        </h1>

        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Your vehicle reservation has been received. A confirmation voucher has been sent to <strong className="text-gray-800">{booking.customer.email}</strong>.
        </p>

        <div className="inline-block bg-orange-50 border border-orange-200 px-6 py-3 rounded-2xl">
          <span className="text-xs text-orange-700 font-semibold block uppercase tracking-wider">Reservation Number</span>
          <span className="text-xl font-black text-orange-600 font-mono">{booking.reservationNumber}</span>
        </div>
      </div>

      {/* Booking Details Card (Printable Voucher) */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm space-y-8 print:shadow-none print:border-none">
        
        {/* Header in voucher */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <div>
            <span className="text-xl font-black text-gray-900">DREAMS<span className="text-orange-500">RENT</span> BAHAMAS</span>
            <p className="text-xs text-gray-400">Official Customer Rental Voucher</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400">Status</span>
            <p className="text-sm font-bold text-emerald-600">{booking.status}</p>
          </div>
        </div>

        {/* Reserved Vehicle */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 p-4 bg-gray-50 rounded-2xl">
          <img 
            src={booking.vehicle.featuredImage} 
            alt={booking.vehicle.title} 
            className="w-36 h-24 rounded-xl object-cover border border-gray-200"
          />
          <div className="flex-1 text-center sm:text-left">
            <span className="text-xs font-bold text-orange-600 uppercase">{booking.vehicle.category}</span>
            <h3 className="text-lg font-bold text-gray-900">{booking.vehicle.title}</h3>
            <p className="text-xs text-gray-500">
              {booking.vehicle.specs.transmission} • {booking.vehicle.specs.fuelType} • {booking.vehicle.specs.seats} Passengers
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400">Rate:</span>
            <p className="text-lg font-black text-gray-900">${booking.dailyRate} / day</p>
          </div>
        </div>

        {/* Itinerary Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-orange-50/40 border border-orange-100 rounded-2xl text-xs">
          <div className="space-y-1">
            <span className="font-bold text-orange-900 uppercase flex items-center">
              <MapPin className="w-3.5 h-3.5 text-orange-600 mr-1" /> Pickup Location & Time
            </span>
            <p className="font-semibold text-gray-800 text-sm">{booking.pickupLocation}</p>
            <p className="text-gray-500">{booking.pickupDate} at {booking.pickupTime}</p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-orange-900 uppercase flex items-center">
              <MapPin className="w-3.5 h-3.5 text-orange-600 mr-1" /> Return Location & Time
            </span>
            <p className="font-semibold text-gray-800 text-sm">{booking.returnLocation}</p>
            <p className="text-gray-500">{booking.returnDate} at {booking.returnTime}</p>
          </div>
        </div>

        {/* Payment & Invoice Breakdown */}
        <div className="space-y-3 text-xs border-t border-gray-100 pt-6">
          <h4 className="font-bold text-gray-900 text-sm mb-2">Payment Summary</h4>
          <div className="flex justify-between text-gray-600">
            <span>Rental Duration:</span>
            <span className="font-semibold text-gray-900">{booking.days} Days</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Rental Subtotal:</span>
            <span className="font-semibold text-gray-900">${booking.rentalSubtotal}</span>
          </div>
          {booking.extrasTotal > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Selected Extras:</span>
              <span className="font-semibold text-gray-900">+${booking.extrasTotal}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-600">
            <span>Taxes & Airport Concession:</span>
            <span className="font-semibold text-gray-900">${booking.taxes}</span>
          </div>
          <div className="flex justify-between text-emerald-700 bg-emerald-50 p-2 rounded-lg font-bold">
            <span>Refundable Security Deposit:</span>
            <span>${booking.depositAmount}</span>
          </div>
          <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-200">
            <span>Total Amount:</span>
            <span className="text-orange-600">${booking.totalAmount}</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-emerald-600">
            <span>Amount Paid Now:</span>
            <span>${booking.amountPaid}</span>
          </div>
          {booking.balanceDue > 0 && (
            <div className="flex justify-between text-xs font-bold text-amber-600">
              <span>Balance Due at Pickup:</span>
              <span>${booking.balanceDue}</span>
            </div>
          )}
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 print:hidden">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3.5 bg-white border border-gray-300 hover:border-gray-400 font-bold text-gray-800 text-xs rounded-xl shadow-sm flex items-center justify-center space-x-2"
        >
          <Printer className="w-4 h-4" />
          <span>Print Rental Voucher</span>
        </button>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center space-x-2"
          >
            <span>Go to Customer Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <Suspense fallback={<div className="text-center py-20">Loading voucher...</div>}>
        <ConfirmationContent />
      </Suspense>
    </div>
  );
}
