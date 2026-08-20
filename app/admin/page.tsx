'use client';

import React from 'react';
import Link from 'next/link';
import { useRental } from '../../context/RentalContext';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { 
  Car, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Users, 
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
    <DashboardLayout
      title="Fleet Admin Dashboard"
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Admin Dashboard' }]}
    >
      <div className="space-y-8 max-w-6xl">
        
        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white p-5 rounded-2xl border border-[#EAEDF0] shadow-sm flex items-center space-x-4">
            <div className="w-11 h-11 rounded-xl bg-orange-50 text-[#FFA633] flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400">Total Fleet</span>
              <p className="text-2xl font-black text-gray-900">{vehicles.length} Cars</p>
              <span className="text-[10px] text-emerald-600 font-bold">{availableVehiclesCount} Ready for Rent</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAEDF0] shadow-sm flex items-center space-x-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400">Active Bookings</span>
              <p className="text-2xl font-black text-gray-900">{activeBookingsCount}</p>
              <span className="text-[10px] text-gray-500 font-semibold">{bookings.length} All-Time</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAEDF0] shadow-sm flex items-center space-x-4">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400">Total Revenue</span>
              <p className="text-2xl font-black text-gray-900">${totalRevenue.toLocaleString()}</p>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +18.4% this month
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAEDF0] shadow-sm flex items-center space-x-4">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400">Total Renters</span>
              <p className="text-2xl font-black text-gray-900">4,820</p>
              <span className="text-[10px] text-blue-600 font-bold">100% Verified IDs</span>
            </div>
          </div>

        </div>

        {/* Recent Reservations Table */}
        <div className="bg-white rounded-2xl border border-[#EAEDF0] shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-[#201F1D]">Recent Customer Reservations</h2>
              <p className="text-xs text-[#878A99]">Live reservation pipeline and rental approvals</p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs font-bold text-[#FFA633] hover:underline flex items-center"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9FA] text-[#878A99] uppercase text-[10px] tracking-wider border-b border-[#EAEDF0]">
                <tr>
                  <th className="py-3 px-4">Reservation #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Car Selected</th>
                  <th className="py-3 px-4">Dates</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEDF0]">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900">{booking.reservationNumber}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-semibold text-gray-900">{booking.customer.fullName}</p>
                        <p className="text-[10px] text-gray-400">{booking.customer.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-700">{booking.vehicle.title}</td>
                    <td className="py-3 px-4 text-gray-500">
                      {booking.pickupDate} → {booking.returnDate} ({booking.days}d)
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900">${booking.totalAmount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' :
                        booking.status === 'Active Rental' ? 'bg-blue-100 text-blue-700' :
                        booking.status === 'Completed' ? 'bg-gray-100 text-gray-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {booking.status === 'Pending' && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                            className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                            title="Confirm"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        {booking.status === 'Confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'Active Rental')}
                            className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold hover:bg-blue-100"
                          >
                            Dispatch Car
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
