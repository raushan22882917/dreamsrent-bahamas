'use client';

import React from 'react';
import Link from 'next/link';
import { useRental } from '../../context/RentalContext';
import { SidebarFilter } from '../../components/rental/SidebarFilter';
import { VehicleCard } from '../../components/ui/VehicleCard';
import { Grid, List, Search, SlidersHorizontal } from 'lucide-react';

export default function RentalListPage() {
  const { filteredVehicles, filters, setFilters } = useRental();

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 mb-2">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Rental Fleet</span>
            <span>/</span>
            <span className="text-orange-600">List View</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
            Available Rental Vehicles
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse our complete 20-vehicle luxury fleet with full specification breakdowns.
          </p>
        </div>

        {/* Top Search & Layout Switcher Bar */}
        <div className="bg-white rounded-2xl p-4 mb-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Live Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by car make, model, or category..."
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <span className="text-xs font-semibold text-gray-500 mr-2">View:</span>
            <Link
              href="/rental-grid"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 border border-gray-200"
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </Link>
            <Link
              href="/rental-list"
              className="p-2 rounded-lg bg-orange-50 text-orange-600 border border-orange-200"
              title="List View"
            >
              <List className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <SidebarFilter />
            </div>
          </div>

          {/* Right Fleet List */}
          <div className="lg:col-span-3 space-y-4">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} viewMode="list" />
              ))
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-500 mx-auto flex items-center justify-center">
                  <SlidersHorizontal className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No Vehicles Match Your Current Filter</h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Try adjusting your price range, selecting a different pickup location, or resetting filters to browse all 20 cars.
                </p>
                <button
                  onClick={() => setFilters({
                    category: 'All',
                    location: 'All',
                    transmission: 'All',
                    seats: null,
                    maxPrice: 350,
                    selectedFeatures: [],
                    searchQuery: ''
                  })}
                  className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
