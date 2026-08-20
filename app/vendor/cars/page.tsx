'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRental } from '../../../context/RentalContext';
import { Plus, Trash2, Edit2, Eye, MapPin, CheckCircle, Search } from 'lucide-react';

export default function VendorCarsPage() {
  const { vehicles } = useRental();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = vehicles.filter(v => 
    v.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-[#201F1D]">Vendor Fleet Management</h1>
            <p className="text-xs text-[#878A99]">Add, edit pricing, and control availability of your rental vehicles</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search fleet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-[#EAEDF0] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#FFA633]"
              />
            </div>
            <Link
              href="/vendor/dashboard"
              className="px-4 py-2 bg-[#FFA633] text-white font-bold text-xs rounded-xl shadow flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vehicle</span>
            </Link>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl border border-[#EAEDF0] shadow-sm overflow-hidden p-5 flex flex-col justify-between">
              <div>
                <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-gray-50">
                  <img src={car.featuredImage} alt={car.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#FFA633] text-white text-[10px] font-bold rounded-md">
                    {car.category}
                  </span>
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-md">
                    {car.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#201F1D] mb-1">{car.title}</h3>
                <p className="text-xs text-[#878A99] flex items-center mb-3">
                  <MapPin className="w-3 h-3 text-[#FFA633] mr-1" />
                  {car.location}
                </p>

                <div className="grid grid-cols-2 gap-2 py-2 border-y border-[#EAEDF0] text-[11px] text-gray-600 mb-3">
                  <span>Rate: <b>${car.pricePerDay}/day</b></span>
                  <span>Deposit: <b>${car.deposit}</b></span>
                  <span>Trans: <b>{car.specs.transmission}</b></span>
                  <span>Seats: <b>{car.specs.seats} Persons</b></span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  href={`/rental/${car.slug}`}
                  className="text-xs font-semibold text-gray-600 hover:text-[#FFA633] flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </Link>

                <div className="flex items-center space-x-2">
                  <button className="p-1.5 text-gray-500 hover:text-blue-600 bg-gray-100 rounded-lg text-xs font-semibold">
                    Edit
                  </button>
                  <button className="p-1.5 text-red-500 hover:bg-red-50 bg-gray-100 rounded-lg text-xs font-semibold">
                    Disable
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
