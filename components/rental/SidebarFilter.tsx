'use client';

import React from 'react';
import { useRental } from '../../context/RentalContext';
import { ALL_LOCATIONS, VEHICLE_CATEGORIES } from '../../data/vehicles';
import { RotateCcw, SlidersHorizontal, MapPin, Users, Settings2, DollarSign } from 'lucide-react';

const COMMON_FEATURES = [
  'Multi-zone A/C',
  'Navigation system',
  'Apple CarPlay',
  'Heated front seats',
  'Bluetooth',
  'Keyless Start',
  'Panoramic Sunroof',
  'Adaptive Cruise Control'
];

export const SidebarFilter: React.FC = () => {
  const { filters, setFilters, resetFilters, filteredVehicles } = useRental();

  const handleFeatureToggle = (feature: string) => {
    setFilters(prev => {
      const exists = prev.selectedFeatures.includes(feature);
      const updated = exists 
        ? prev.selectedFeatures.filter(f => f !== feature) 
        : [...prev.selectedFeatures, feature];
      return { ...prev, selectedFeatures: updated };
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-orange-500" />
          <h3 className="font-bold text-gray-900 text-base">Filter Vehicles</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center space-x-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Location Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center">
          <MapPin className="w-3.5 h-3.5 text-orange-500 mr-1.5" /> Pickup Location
        </label>
        <select
          value={filters.location}
          onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:ring-2 focus:ring-orange-500 focus:outline-none"
        >
          <option value="All">All Bahamas Locations</option>
          {ALL_LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* 2. Vehicle Category */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          Vehicle Category
        </label>
        <div className="space-y-1.5">
          {VEHICLE_CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center justify-between text-xs font-medium text-gray-700 cursor-pointer p-1.5 hover:bg-gray-50 rounded-lg">
              <span className="flex items-center">
                <input
                  type="radio"
                  name="vehicleCategory"
                  checked={filters.category === cat}
                  onChange={() => setFilters(prev => ({ ...prev, category: cat }))}
                  className="w-3.5 h-3.5 text-orange-600 focus:ring-orange-500 mr-2"
                />
                {cat === 'All' ? 'All Categories' : cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Seating Capacity */}
      <div className="space-y-2 pt-4 border-t border-gray-100">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center">
          <Users className="w-3.5 h-3.5 text-orange-500 mr-1.5" /> Minimum Seats
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {[2, 4, 5, 7].map((seatCount) => (
            <button
              key={seatCount}
              onClick={() => setFilters(prev => ({ ...prev, seats: prev.seats === seatCount ? null : seatCount }))}
              className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                filters.seats === seatCount
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {seatCount}+ Seats
            </button>
          ))}
        </div>
      </div>

      {/* 4. Transmission */}
      <div className="space-y-2 pt-4 border-t border-gray-100">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center">
          <Settings2 className="w-3.5 h-3.5 text-orange-500 mr-1.5" /> Transmission
        </label>
        <select
          value={filters.transmission}
          onChange={(e) => setFilters(prev => ({ ...prev, transmission: e.target.value }))}
          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:ring-2 focus:ring-orange-500 focus:outline-none"
        >
          <option value="All">All Transmissions</option>
          <option value="Automatic">Automatic Only</option>
          <option value="Dual-Clutch (PDK)">Dual-Clutch / Sport PDK</option>
          <option value="Manual">Manual</option>
        </select>
      </div>

      {/* 5. Max Daily Rate Slider */}
      <div className="space-y-2 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs font-bold text-gray-700">
          <span className="uppercase tracking-wider flex items-center">
            <DollarSign className="w-3.5 h-3.5 text-orange-500" /> Max Price:
          </span>
          <span className="text-orange-600 font-black text-sm">${filters.maxPrice} / day</span>
        </div>
        <input
          type="range"
          min="50"
          max="350"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-orange-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
          <span>$50/day</span>
          <span>$350/day</span>
        </div>
      </div>

      {/* 6. Included Features Checkboxes */}
      <div className="space-y-2 pt-4 border-t border-gray-100">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          Features & Technology
        </label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {COMMON_FEATURES.map((feat) => (
            <label key={feat} className="flex items-center text-xs text-gray-600 cursor-pointer hover:text-gray-900">
              <input
                type="checkbox"
                checked={filters.selectedFeatures.includes(feat)}
                onChange={() => handleFeatureToggle(feat)}
                className="w-3.5 h-3.5 rounded text-orange-600 focus:ring-orange-500 mr-2"
              />
              <span>{feat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="pt-2 text-center text-xs font-bold text-gray-500 bg-gray-50 p-2.5 rounded-xl">
        Showing <span className="text-orange-600">{filteredVehicles.length}</span> Available Cars
      </div>

    </div>
  );
};
