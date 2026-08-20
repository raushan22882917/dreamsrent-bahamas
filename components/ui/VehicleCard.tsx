'use client';

import React from 'react';
import Link from 'next/link';
import { Vehicle } from '../../types/rental';
import { useRental } from '../../context/RentalContext';
import { 
  Heart, 
  MapPin, 
  Star, 
  Calendar,
  ArrowRight
} from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  viewMode?: 'grid' | 'list';
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, viewMode = 'grid' }) => {
  const { toggleWishlist, isInWishlist } = useRental();
  const isFavorite = isInWishlist(vehicle.id);

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-[15px] border border-[#EAEDF0] shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col md:flex-row group">
        
        {/* Car Image Container */}
        <div className="relative md:w-[320px] h-[220px] md:h-auto bg-[#f8f9fa] flex-shrink-0 overflow-hidden">
          <Link href={`/rental/${vehicle.slug}`}>
            <img 
              src={vehicle.featuredImage} 
              alt={vehicle.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
          
          <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-[#FFA633] text-white rounded-md text-xs font-semibold shadow-sm">
            {vehicle.brand || vehicle.category}
          </span>

          <button 
            onClick={() => toggleWishlist(vehicle.id)}
            className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow transition-colors ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:text-red-500'
            }`}
            title="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Content Info */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <img 
                src="/images/user_image.jpg" 
                alt="Owner" 
                className="w-9 h-9 rounded-full object-cover border border-gray-200" 
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <h3 className="text-lg font-bold text-[#201F1D] group-hover:text-[#FFA633] transition-colors">
                <Link href={`/rental/${vehicle.slug}`}>
                  {vehicle.title}
                </Link>
              </h3>
            </div>

            {/* Spec Matrix (6 Items with SVG icons) */}
            <div className="grid grid-cols-3 gap-y-3 gap-x-4 my-4 py-3 border-y border-[#EAEDF0] text-xs text-[#555]">
              <div className="flex items-center space-x-2">
                <img src="/images/car-parts-01.svg" alt="Gear" className="w-4 h-4 opacity-70" />
                <span className="truncate">{vehicle.specs.transmission}</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/images/car-parts-02.svg" alt="Mileage" className="w-4 h-4 opacity-70" />
                <span>{vehicle.specs.mileage}</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/images/car-parts-03.svg" alt="Fuel" className="w-4 h-4 opacity-70" />
                <span>{vehicle.specs.fuelType}</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/images/car-parts-04.svg" alt="Steering" className="w-4 h-4 opacity-70" />
                <span>Left</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/images/car-parts-05.svg" alt="Year" className="w-4 h-4 opacity-70" />
                <span>{vehicle.year}</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/images/car-parts-06.svg" alt="Seats" className="w-4 h-4 opacity-70" />
                <span>{vehicle.specs.seats} Persons</span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-2 text-xs text-[#878A99]">
              <MapPin className="w-4 h-4 text-[#FFA633]" />
              <span>{vehicle.location}</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className="text-[11px] text-[#878A99] block">Starting From</span>
                <span className="text-xl font-bold text-[#201F1D]">
                  ${vehicle.pricePerDay} <span className="text-xs font-normal text-[#878A99]">/ Day</span>
                </span>
              </div>

              <Link 
                href={`/rental/${vehicle.slug}`}
                className="px-5 py-2.5 bg-[#127384] hover:bg-[#FFA633] text-white text-xs font-bold rounded-lg flex items-center space-x-2 shadow-sm transition-colors duration-300"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Rent Now</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    );
  }

  // Grid View (Matches DreamsRent Clean Listing Item)
  return (
    <div className="bg-white rounded-[15px] border border-[#EAEDF0] shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col group">
      
      {/* Car Image */}
      <div className="relative h-[210px] bg-[#f8f9fa] overflow-hidden">
        <Link href={`/rental/${vehicle.slug}`}>
          <img 
            src={vehicle.featuredImage} 
            alt={vehicle.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-[#FFA633] text-white rounded-md text-[12px] font-semibold shadow-sm">
          {vehicle.brand || vehicle.category}
        </span>

        <button 
          onClick={() => toggleWishlist(vehicle.id)}
          className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow transition-colors ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:text-red-500'
          }`}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Owner Avatar & Title */}
          <div className="flex items-center space-x-3 mb-3">
            <img 
              src="/images/user_image.jpg" 
              alt="Owner" 
              className="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
            <h3 className="text-base font-bold text-[#201F1D] group-hover:text-[#FFA633] transition-colors line-clamp-1">
              <Link href={`/rental/${vehicle.slug}`}>
                {vehicle.title}
              </Link>
            </h3>
          </div>

          {/* 6 Specs Matrix with SVG Icons */}
          <div className="grid grid-cols-3 gap-y-2.5 gap-x-2 py-3 border-y border-[#EAEDF0] text-[11px] text-[#6B7280]">
            <div className="flex items-center space-x-1.5">
              <img src="/images/car-parts-01.svg" alt="Gear" className="w-3.5 h-3.5 opacity-75 flex-shrink-0" />
              <span className="truncate">{vehicle.specs.transmission}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <img src="/images/car-parts-02.svg" alt="Mileage" className="w-3.5 h-3.5 opacity-75 flex-shrink-0" />
              <span className="truncate">{vehicle.specs.mileage}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <img src="/images/car-parts-03.svg" alt="Fuel" className="w-3.5 h-3.5 opacity-75 flex-shrink-0" />
              <span className="truncate">{vehicle.specs.fuelType}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <img src="/images/car-parts-04.svg" alt="Steering" className="w-3.5 h-3.5 opacity-75 flex-shrink-0" />
              <span className="truncate">Left</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <img src="/images/car-parts-05.svg" alt="Year" className="w-3.5 h-3.5 opacity-75 flex-shrink-0" />
              <span className="truncate">{vehicle.year}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <img src="/images/car-parts-06.svg" alt="Seats" className="w-3.5 h-3.5 opacity-75 flex-shrink-0" />
              <span className="truncate">{vehicle.specs.seats} Persons</span>
            </div>
          </div>

          {/* Location & Starting From Price */}
          <div className="flex items-center justify-between mt-3.5 mb-3.5">
            <div className="flex items-center space-x-1 text-xs text-[#878A99]">
              <MapPin className="w-3.5 h-3.5 text-[#FFA633]" />
              <span className="truncate max-w-[130px]">{vehicle.location}</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#878A99] block leading-none">Starting From</span>
              <span className="text-base font-black text-[#201F1D]">
                ${vehicle.pricePerDay} <span className="text-[11px] font-normal text-[#878A99]">/ Day</span>
              </span>
            </div>
          </div>
        </div>

        {/* Full-width Rent Now Button */}
        <Link 
          href={`/rental/${vehicle.slug}`}
          className="w-full py-2.5 bg-[#127384] hover:bg-[#FFA633] text-white text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 shadow-sm transition-colors duration-300"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Rent Now</span>
        </Link>

      </div>

    </div>
  );
};
