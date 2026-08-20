'use client';

import React from 'react';
import Link from 'next/link';
import { useRental } from '../../context/RentalContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Car, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Users, 
  ShieldCheck, 
  Plus, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { vehicles, bookings, updateBookingStatus } = useRental();
  const { user } = useAuth();

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status !== 'Cancelled' ? b.totalAmount : 0), 0);
  const availableVehiclesCount = vehicles.filter(v => v.status === 'Available').length;
  const activeBookingsCount = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Active Rental').length;

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="bg-gray-950 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/25">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black">DreamsRent Fleet Admin Portal</h1>
                <span className="px-2.5 py-0.5 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-bold rounded-full uppercase">
                  {user?.role || 'Admin'}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Bahamas Fleet Management & Operations Center</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/admin/cars"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center space-x-2"
            >
              <Car className="w-4 h-4 text-orange-400" />
              <span>Manage 20 Vehicles</span>
            </Link>
            <Link
              href="/admin/bookings"
              className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>All Bookings</span>
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400">Total Fleet</span>
              <p className="text-2xl font-black text-gray-900">{vehicles.length} Cars</p>
              <span className="text-[10px] text-emerald-600 font-bold">{availableVehiclesCount} Ready for Rent</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400">Active Bookings</span>
              <p className="text-2xl font-black text-gray-900">{activeBookingsCount}</p>
              <span className="text-[10px] text-gray-500 font-semibold">{bookings.length} All-Time</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400">Total Revenue</span>
              <p className="text-2xl font-black text-gray-900">${totalRevenue.toLocaleString()}</p>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +18.4% this month
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400">Registered Renters</span>
              <p className="text-2xl font-black text-gray-900">142</p>
              <span className="text-[10px] text-gray-400 font-semibold">100% ID Verified</span>
            </div>
          </div>

        </div>

        {/* Live Reservations Table & Status Controls */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-10">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-base">Recent Customer Bookings & Dispatch</h3>
              <p className="text-xs text-gray-400">Change vehicle dispatch status in real time</p>
            </div>
            <Link href="/admin/bookings" className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center">
              <span>View All ({bookings.length})</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="px-6 py-4">Reservation #</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Vehicle</th>
                  <th className="px-6 py-4">Pickup Location</th>
                  <th className="px-6 py-4">Rental Dates</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status & Dispatch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-gray-900">{b.reservationNumber}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{b.customer.fullName}</p>
                      <p className="text-[10px] text-gray-400">{b.customer.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <img src={b.vehicle.featuredImage} alt={b.vehicle.title} className="w-10 h-7 rounded object-cover" />
                        <span className="font-semibold text-gray-800">{b.vehicle.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{b.pickupLocation}</td>
                    <td className="px-6 py-4 text-gray-600">{b.pickupDate} to {b.returnDate}</td>
                    <td className="px-6 py-4 font-black text-gray-900">${b.totalAmount}</td>
                    <td className="px-6 py-4">
                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold border border-gray-200 bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Picked Up">Picked Up</option>
                        <option value="Active Rental">Active Rental</option>
                        <option value="Returned">Returned</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
