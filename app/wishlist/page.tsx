'use client';

import React from 'react';
import Link from 'next/link';
import { useRental } from '../../context/RentalContext';
import { VehicleCard } from '../../components/ui/VehicleCard';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Heart, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, vehicles } = useRental();
  const savedCars = vehicles.filter(v => wishlist.includes(v.id));

  return (
    <DashboardLayout
      title="My Saved Vehicles"
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]}
    >
      <div className="space-y-6 max-w-6xl">
        
        {savedCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCars.map((car) => (
              <VehicleCard key={car.id} vehicle={car} viewMode="grid" />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-16 text-center border border-[#EAEDF0] shadow-sm space-y-4 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 mx-auto flex items-center justify-center">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Your Wishlist is Empty</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Click the heart icon on any vehicle card across the rental catalog to save cars here for quick comparison.
            </p>
            <Link
              href="/rental-grid"
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#FFA633] hover:bg-[#e5952e] text-white text-xs font-bold rounded-xl shadow"
            >
              <span>Browse Rental Fleet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
