'use client';

import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRental } from '../../../context/RentalContext';
import { MapPin, Calendar, Clock, Phone, User, CheckCircle, Navigation } from 'lucide-react';

export default function DriverDashboard() {
  const { user } = useAuth();
  const { bookings } = useRental();

  const assignedTrips = bookings.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Driver Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAEDF0] shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={user?.avatar || '/images/user_image.jpg'} alt="Driver" className="w-14 h-14 rounded-full border-2 border-emerald-500 object-cover" />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-[#201F1D]">{user?.name || 'Marcus Chauffeur'}</h1>
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">On-Duty</span>
              </div>
              <p className="text-xs text-[#878A99]">License: {user?.driverLicense || 'BAH-DL-98442-EXP2028'} • Nassau Airport Terminal</p>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <span className="text-xs text-[#878A99] font-bold block">Assigned Pickups Today</span>
            <span className="text-2xl font-black text-[#FFA633]">3 Trips</span>
          </div>
        </div>

        {/* Assigned Trips Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#201F1D]">Today&apos;s Dispatch Schedule</h2>
          {assignedTrips.map((b) => (
            <div key={b.id} className="bg-white p-6 rounded-2xl border border-[#EAEDF0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <img src={b.vehicle.featuredImage} alt={b.vehicle.title} className="w-20 h-16 rounded-xl object-cover" />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-[#201F1D]">{b.vehicle.title}</h3>
                    <span className="text-xs text-[#878A99]">({b.reservationNumber})</span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <User className="w-3.5 h-3.5 text-[#FFA633] mr-1" />
                    Renter: {b.customer.fullName} • {b.customer.phone}
                  </p>
                  <p className="text-xs text-[#878A99] flex items-center mt-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-500 mr-1" />
                    Pickup at: <b className="text-gray-800 ml-1">{b.pickupLocation}</b> ({b.pickupTime})
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <a
                  href={`tel:${b.customer.phone}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Renter</span>
                </a>
                <button className="px-4 py-2 bg-[#127384] hover:bg-[#0e5c6a] text-white text-xs font-bold rounded-xl flex items-center space-x-1">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Start Navigation</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
