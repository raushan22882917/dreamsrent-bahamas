'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRental } from '../../context/RentalContext';
import { ALL_LOCATIONS } from '../../data/vehicles';
import { MapPin, Calendar, Clock, Search } from 'lucide-react';

export const HeroSearch: React.FC = () => {
  const router = useRouter();
  const { searchCriteria, setSearchCriteria, setFilters } = useRental();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCriteria.pickupLocation) {
      setFilters(prev => ({
        ...prev,
        location: searchCriteria.pickupLocation === 'All' ? 'All' : searchCriteria.pickupLocation
      }));
    }
    router.push('/rental-grid');
  };

  return (
    <div className="max-w-6xl mx-auto -mt-10 sm:-mt-14 relative z-30">
      <div className="bg-white rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.08)] border border-[#EAEDF0] p-4 sm:p-6">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 items-center">
            
            {/* 1. Pickup Location */}
            <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#EAEDF0] pb-2 lg:pb-0 lg:pr-3">
              <label className="text-[11px] font-semibold text-[#878A99] block mb-1">
                Pickup Location
              </label>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#FFA633] flex-shrink-0" />
                <select
                  value={searchCriteria.pickupLocation}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, pickupLocation: e.target.value }))}
                  className="w-full bg-transparent text-xs font-semibold text-[#201F1D] focus:outline-none cursor-pointer truncate"
                >
                  <option value="All">All Locations</option>
                  {ALL_LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Drop Location */}
            <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#EAEDF0] pb-2 lg:pb-0 lg:pr-3">
              <label className="text-[11px] font-semibold text-[#878A99] block mb-1">
                Drop Location
              </label>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#FFA633] flex-shrink-0" />
                <select
                  value={searchCriteria.returnLocation}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, returnLocation: e.target.value }))}
                  className="w-full bg-transparent text-xs font-semibold text-[#201F1D] focus:outline-none cursor-pointer truncate"
                >
                  <option value="All">All Locations</option>
                  {ALL_LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Pickup Date */}
            <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#EAEDF0] pb-2 lg:pb-0 lg:pr-3">
              <label className="text-[11px] font-semibold text-[#878A99] block mb-1">
                Pickup Date
              </label>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-[#FFA633] flex-shrink-0" />
                <input 
                  type="date"
                  value={searchCriteria.pickupDate}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, pickupDate: e.target.value }))}
                  className="w-full bg-transparent text-xs font-semibold text-[#201F1D] focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* 4. Pickup Time */}
            <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#EAEDF0] pb-2 lg:pb-0 lg:pr-3">
              <label className="text-[11px] font-semibold text-[#878A99] block mb-1">
                Pickup Time
              </label>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#FFA633] flex-shrink-0" />
                <input 
                  type="time"
                  value={searchCriteria.pickupTime}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, pickupTime: e.target.value }))}
                  className="w-full bg-transparent text-xs font-semibold text-[#201F1D] focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* 5. Return Date */}
            <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#EAEDF0] pb-2 lg:pb-0 lg:pr-3">
              <label className="text-[11px] font-semibold text-[#878A99] block mb-1">
                Return Date
              </label>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-[#FFA633] flex-shrink-0" />
                <input 
                  type="date"
                  value={searchCriteria.returnDate}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, returnDate: e.target.value }))}
                  className="w-full bg-transparent text-xs font-semibold text-[#201F1D] focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* 6. Return Time */}
            <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#EAEDF0] pb-2 lg:pb-0 lg:pr-3">
              <label className="text-[11px] font-semibold text-[#878A99] block mb-1">
                Return Time
              </label>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#FFA633] flex-shrink-0" />
                <input 
                  type="time"
                  value={searchCriteria.returnTime}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, returnTime: e.target.value }))}
                  className="w-full bg-transparent text-xs font-semibold text-[#201F1D] focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* 7. Search Button */}
            <div className="lg:col-span-1 pt-2 lg:pt-0">
              <button
                type="submit"
                className="w-full h-11 bg-[#FFA633] hover:bg-[#e5952e] text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};
