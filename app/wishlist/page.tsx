'use client';

import React from 'react';
import Link from 'next/link';
import { useRental } from '../../context/RentalContext';
import { VehicleCard } from '../../components/ui/VehicleCard';
import { Heart, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, vehicles } = useRental();
  const savedCars = vehicles.filter(v => wishlist.includes(v.id));

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 mb-1">
              <Link href="/dashboard" className="hover:text-orange-600">Dashboard</Link>
              <span>/</span>
              <span className="text-gray-900">Wishlist</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900">Saved Dream Vehicles</h1>
            <p className="text-sm text-gray-500">All your favorite cars saved for your next Bahamas getaway.</p>
          </div>

          <Link
            href="/rental-grid"
            className="px-6 py-3 bg-gray-900 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-2 flex-shrink-0 transition-colors"
          >
            <span>Explore All Fleet</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {savedCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedCars.map((car) => (
              <VehicleCard key={car.id} vehicle={car} viewMode="grid" />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 mx-auto flex items-center justify-center">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Your Wishlist is Empty</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Click the heart icon on any vehicle card across the rental catalog to save cars here for quick comparison.
            </p>
            <Link
              href="/rental-grid"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl"
            >
              <span>Browse 20 Luxury Cars</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
