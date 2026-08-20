'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useRental } from '../../context/RentalContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { 
  Calendar, 
  Heart, 
  CreditCard, 
  Car, 
  MapPin, 
  ArrowRight, 
  Plus,
  Clock
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { bookings, wishlist, vehicles } = useRental();

  const activeBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Active Rental');
  const wishlistCars = vehicles.filter(v => wishlist.includes(v.id));

  return (
    <DashboardLayout
      title="Customer Dashboard"
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Customer Dashboard' }]}
    >
      <div className="space-y-8 max-w-6xl">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl p-6 border border-[#EAEDF0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img 
              src={user?.avatar || '/images/user_image.jpg'} 
              alt={user?.name || 'Customer'}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#FFA633]"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-[#201F1D]">Welcome Back, {user?.name || 'John Renter'}!</h2>
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                  Verified Renter
                </span>
              </div>
              <p className="text-xs text-[#878A99] mt-0.5">{user?.email || 'customer@demo.com'} • {user?.phone || '+1 (242) 555-0182'}</p>
            </div>
          </div>

          <Link
            href="/rental-grid"
            className="px-5 py-2.5 bg-[#FFA633] hover:bg-[#e5952e] text-white text-xs font-bold rounded-xl shadow flex items-center space-x-1.5 transition-all flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Book Another Car</span>
          </Link>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-[#EAEDF0] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#878A99] uppercase">Active Rentals</span>
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#FFA633] flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#201F1D]">{activeBookings.length}</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Keys ready for pickup</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAEDF0] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#878A99] uppercase">Total Bookings</span>
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#201F1D]">{bookings.length}</h3>
            <p className="text-[11px] text-gray-400 mt-1">All-time reservation history</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAEDF0] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#878A99] uppercase">Saved in Wishlist</span>
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#201F1D]">{wishlist.length}</h3>
            <p className="text-[11px] text-gray-400 mt-1">Dream cars saved</p>
          </div>
        </div>

        {/* Current Active Rentals */}
        <div className="bg-white rounded-2xl border border-[#EAEDF0] shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-[#201F1D]">Current & Upcoming Reservations</h3>
            <Link href="/my-bookings" className="text-xs font-bold text-[#FFA633] hover:underline flex items-center">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {activeBookings.length === 0 ? (
            <div className="text-center py-10">
              <Car className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-500">You do not have any active reservations.</p>
              <Link href="/rental-grid" className="inline-block mt-3 px-4 py-2 bg-[#FFA633] text-white text-xs font-bold rounded-xl">
                Browse Rental Cars
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {activeBookings.map((b) => (
                <div key={b.id} className="p-4 bg-gray-50 rounded-xl border border-[#EAEDF0] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <img src={b.vehicle.featuredImage} alt={b.vehicle.title} className="w-16 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-[#201F1D] text-xs sm:text-sm">{b.vehicle.title}</h4>
                      <p className="text-[11px] text-gray-400">{b.reservationNumber} • {b.pickupLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#FFA633] block">${b.totalAmount}</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">{b.status}</span>
                    </div>
                    <Link
                      href="/confirmation"
                      className="px-3 py-1.5 bg-[#1B1B1B] text-white text-xs font-bold rounded-lg"
                    >
                      Voucher
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
