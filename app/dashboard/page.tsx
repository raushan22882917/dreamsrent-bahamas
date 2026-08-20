'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useRental } from '../../context/RentalContext';
import { 
  Calendar, 
  Heart, 
  CreditCard, 
  Settings, 
  Car, 
  MapPin, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { bookings, wishlist, vehicles } = useRental();

  const activeBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Active Rental');
  const wishlistCars = vehicles.filter(v => wishlist.includes(v.id));

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img 
              src={user?.avatar || '/images/team/team_business_head_1787225318994.jpg'} 
              alt={user?.name || 'Customer'}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-500 shadow-md"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-gray-900">Welcome Back, {user?.name || 'Customer'}!</h1>
                <span className="px-2.5 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded-full uppercase">
                  Verified Renter
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{user?.email || 'customer@demo.com'} • {user?.phone || '+1 (242) 555-0182'}</p>
            </div>
          </div>

          <Link
            href="/rental-grid"
            className="px-6 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-500/25 flex items-center space-x-2 transition-all flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Book Another Car</span>
          </Link>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400">Total Bookings</span>
              <p className="text-2xl font-black text-gray-900">{bookings.length}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400">Active Rentals</span>
              <p className="text-2xl font-black text-gray-900">{activeBookings.length}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400">Saved Wishlist</span>
              <p className="text-2xl font-black text-gray-900">{wishlist.length}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400">Account Standing</span>
              <p className="text-base font-black text-emerald-600">Good / Active</p>
            </div>
          </div>

        </div>

        {/* Active / Recent Bookings */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Your Active & Upcoming Rentals</h2>
            <Link href="/my-bookings" className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center">
              <span>View All History</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.slice(0, 2).map((booking) => (
                <div 
                  key={booking.id}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
                >
                  <div className="flex items-center space-x-5 w-full md:w-auto">
                    <img 
                      src={booking.vehicle.featuredImage} 
                      alt={booking.vehicle.title} 
                      className="w-24 h-16 rounded-xl object-cover border border-gray-100"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                          {booking.reservationNumber}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-base mt-1">{booking.vehicle.title}</h3>
                      <p className="text-xs text-gray-400">{booking.pickupLocation} • {booking.pickupDate} to {booking.returnDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                      <span className="text-xs text-gray-400">Total Paid:</span>
                      <p className="text-lg font-black text-gray-900">${booking.amountPaid}</p>
                    </div>
                    <Link
                      href={`/confirmation?id=${booking.id}`}
                      className="px-4 py-2 bg-gray-900 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      View Voucher
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
              <p className="text-xs text-gray-500">No active bookings yet.</p>
              <Link href="/rental-grid" className="mt-3 inline-block text-xs font-bold text-orange-600">
                Browse available cars &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Wishlist Quick Preview */}
        {wishlistCars.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Saved Vehicles in Wishlist</h2>
              <Link href="/wishlist" className="text-xs font-bold text-orange-600 hover:text-orange-700">
                View Full Wishlist &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistCars.slice(0, 4).map((v) => (
                <div key={v.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-3">
                  <img src={v.featuredImage} alt={v.title} className="w-full h-32 object-cover rounded-xl" />
                  <div>
                    <span className="text-[10px] font-bold text-orange-600 uppercase">{v.category}</span>
                    <h3 className="font-bold text-gray-900 text-sm truncate">{v.title}</h3>
                    <p className="text-xs font-black text-gray-900 mt-1">${v.pricePerDay}/day</p>
                  </div>
                  <Link
                    href={`/rental/${v.slug}`}
                    className="block w-full py-2 bg-gray-900 hover:bg-orange-600 text-white text-center text-xs font-bold rounded-xl transition-colors"
                  >
                    Rent Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
