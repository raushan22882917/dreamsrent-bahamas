'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { useRental } from '../../../context/RentalContext';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { 
  Car, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Plus, 
  Eye, 
  Edit3, 
  ArrowRight
} from 'lucide-react';

export default function VendorDashboard() {
  const { user } = useAuth();
  const { vehicles, bookings } = useRental();

  const vendorVehicles = vehicles.slice(0, 6);
  const totalRevenue = 14850;
  const activeRentals = bookings.filter(b => b.status === 'Active Rental' || b.status === 'Confirmed');

  return (
    <DashboardLayout
      title="Vendor Dashboard"
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Vendor Dashboard' }]}
    >
      <div className="space-y-8 max-w-6xl">
        
        {/* Vendor Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-2xl border border-[#EAEDF0] shadow-sm">
          <div className="flex items-center space-x-4">
            <img 
              src={user?.avatar || '/images/user_image.jpg'} 
              alt={user?.name} 
              className="w-14 h-14 rounded-full object-cover border-2 border-[#FFA633]"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-[#201F1D]">{user?.name || 'Vendor Demo'}</h2>
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                  Verified Host
                </span>
              </div>
              <p className="text-xs text-[#878A99] mt-0.5">{user?.companyName || 'Island Exotic Cars Ltd'} • {user?.email}</p>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <Link
              href="/vendor/cars"
              className="px-4 py-2 bg-[#FFA633] hover:bg-[#e5952e] text-white font-bold text-xs rounded-xl shadow flex items-center space-x-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Vehicle</span>
            </Link>
            <Link
              href="/vendor/settings"
              className="px-4 py-2 bg-[#1B1B1B] hover:bg-black text-white font-bold text-xs rounded-xl shadow transition-all"
            >
              <span>Settings</span>
            </Link>
          </div>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-[#EAEDF0] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#878A99] uppercase">Active Fleet</span>
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#FFA633] flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#201F1D]">{vendorVehicles.length}</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">100% Insured</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAEDF0] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#878A99] uppercase">Earnings</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#201F1D]">${totalRevenue.toLocaleString()}</h3>
            <p className="text-[11px] text-gray-400 mt-1">Payout in 3 days</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAEDF0] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#878A99] uppercase">Bookings</span>
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#201F1D]">{activeRentals.length}</h3>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">Active rentals</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAEDF0] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#878A99] uppercase">Rating</span>
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-500 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#201F1D]">4.95 / 5.0</h3>
            <p className="text-[11px] text-[#878A99] mt-1">48 reviews</p>
          </div>
        </div>

        {/* Fleet Table */}
        <div className="bg-white rounded-2xl border border-[#EAEDF0] shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-[#201F1D]">My Listed Vehicles</h3>
              <p className="text-xs text-[#878A99]">Manage rates and vehicle status</p>
            </div>
            <Link href="/vendor/cars" className="text-xs font-bold text-[#FFA633] hover:underline flex items-center">
              <span>View All Fleet</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9FA] text-[#878A99] uppercase text-[10px] tracking-wider border-b border-[#EAEDF0]">
                <tr>
                  <th className="py-3 px-4">Vehicle</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Daily Rate</th>
                  <th className="py-3 px-4">Deposit</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEDF0]">
                {vendorVehicles.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img src={car.featuredImage} alt={car.title} className="w-12 h-9 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-[#201F1D]">{car.title}</p>
                          <p className="text-[10px] text-gray-400">{car.year} • {car.specs.transmission}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-600">{car.category}</td>
                    <td className="py-3 px-4 font-bold text-[#FFA633]">${car.pricePerDay} / day</td>
                    <td className="py-3 px-4 text-gray-500">${car.deposit}</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">
                        {car.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link href={`/rental/${car.slug}`} className="p-1.5 text-gray-500 hover:text-[#FFA633] bg-gray-100 rounded-lg">
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link href="/vendor/cars" className="p-1.5 text-gray-500 hover:text-blue-600 bg-gray-100 rounded-lg">
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>
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
