'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { useRental } from '../../../context/RentalContext';
import { 
  Car, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Plus, 
  Eye, 
  Edit3, 
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

export default function VendorDashboard() {
  const { user } = useAuth();
  const { vehicles, bookings } = useRental();

  // Vendor's fleet
  const vendorVehicles = vehicles.slice(0, 6); // Demo vendor fleet
  const totalRevenue = 14850;
  const activeRentals = bookings.filter(b => b.status === 'Active Rental' || b.status === 'Confirmed');

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Vendor Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 sm:p-8 rounded-2xl border border-[#EAEDF0] shadow-sm mb-8">
          <div className="flex items-center space-x-4">
            <img 
              src={user?.avatar || '/images/user_image.jpg'} 
              alt={user?.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-[#FFA633]"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-[#201F1D]">{user?.name || 'Vendor Demo'}</h1>
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
              className="px-5 py-2.5 bg-[#FFA633] hover:bg-[#e5952e] text-white font-bold text-xs rounded-xl shadow flex items-center space-x-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>List New Car</span>
            </Link>
            <Link
              href="/vendor/settings"
              className="px-5 py-2.5 bg-[#201F1D] hover:bg-gray-800 text-white font-bold text-xs rounded-xl shadow flex items-center space-x-2 transition-all"
            >
              <span>Host Settings</span>
            </Link>
          </div>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-white p-6 rounded-2xl border border-[#EAEDF0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#878A99] uppercase tracking-wider">My Active Fleet</span>
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FFA633] flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-[#201F1D]">{vendorVehicles.length}</h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1">100% Insured & Active</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EAEDF0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#878A99] uppercase tracking-wider">Total Earnings</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-[#201F1D]">${totalRevenue.toLocaleString()}</h3>
            <p className="text-xs text-gray-400 mt-1">Payout scheduled in 3 days</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EAEDF0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#878A99] uppercase tracking-wider">Current Bookings</span>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-[#201F1D]">{activeRentals.length}</h3>
            <p className="text-xs text-blue-600 font-semibold mt-1">Active rentals on road</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EAEDF0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#878A99] uppercase tracking-wider">Host Rating</span>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-[#201F1D]">4.95 / 5.0</h3>
            <p className="text-xs text-[#878A99] mt-1">From 48 verified renters</p>
          </div>

        </div>

        {/* Vendor's Listed Vehicles Table */}
        <div className="bg-white rounded-2xl border border-[#EAEDF0] shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#201F1D]">My Listed Vehicles</h2>
              <p className="text-xs text-[#878A99]">Manage rates, availability, and vehicle dispatch status</p>
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
                  <tr key={car.id} className="hover:bg-gray-50 transition-colors">
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
                        <Link href={`/rental/${car.slug}`} className="p-1.5 text-gray-500 hover:text-[#FFA633] bg-gray-100 rounded-lg" title="Preview Car">
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link href="/vendor/cars" className="p-1.5 text-gray-500 hover:text-blue-600 bg-gray-100 rounded-lg" title="Edit Pricing">
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
    </div>
  );
}
