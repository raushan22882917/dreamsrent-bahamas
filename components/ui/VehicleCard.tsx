'use client';

import React from 'react';
import Link from 'next/link';
import { Vehicle } from '../../types/rental';
import { useRental } from '../../context/RentalContext';
import { 
  Heart, 
  MapPin, 
  Calendar,
  User
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
      <div className="bg-white rounded-[15px] border border-[#EAEDF0] shadow-[0_4px_24px_rgba(222,222,222,0.25)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col md:flex-row group">
        
        {/* Car Image Container */}
        <div className="relative md:w-[320px] h-[220px] md:h-auto bg-[#f8f9fa] flex-shrink-0 overflow-hidden">
          <Link href={`/rental/${vehicle.slug}`}>
            <img 
              src={vehicle.featuredImage} 
              alt={vehicle.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
          
          {/* Brand Tag (White pill matching screenshot) */}
          <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-white text-[#201F1D] text-[12px] font-semibold rounded-md shadow-sm border border-gray-100">
            {vehicle.brand || vehicle.category}
          </span>

          {/* Wishlist Heart */}
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
              <h3 className="text-lg font-bold text-[#201F1D] group-hover:text-[#127384] transition-colors">
                <Link href={`/rental/${vehicle.slug}`}>
                  {vehicle.title}
                </Link>
              </h3>
            </div>

            {/* Spec Matrix (6 Items with SVG icons) */}
            <div className="grid grid-cols-3 gap-y-2.5 gap-x-4 my-3 text-xs text-[#7A7A7A]">
              <div className="flex items-center space-x-1.5">
                <img src="/images/car-parts-01.svg" alt="Gear" className="w-3.5 h-3.5 opacity-60" />
                <span className="truncate">{vehicle.specs.transmission}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <img src="/images/car-parts-02.svg" alt="Mileage" className="w-3.5 h-3.5 opacity-60" />
                <span>{vehicle.specs.mileage}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <img src="/images/car-parts-03.svg" alt="Fuel" className="w-3.5 h-3.5 opacity-60" />
                <span>{vehicle.specs.fuelType}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <img src="/images/car-parts-04.svg" alt="Steering" className="w-3.5 h-3.5 opacity-60" />
                <span>Left</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <img src="/images/car-parts-05.svg" alt="Year" className="w-3.5 h-3.5 opacity-60" />
                <span>{vehicle.year}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <img src="/images/car-parts-06.svg" alt="Seats" className="w-3.5 h-3.5 opacity-60" />
                <span>{vehicle.specs.seats} Persons</span>
              </div>
            </div>
          </div>

          {/* Pricing & Location Box */}
          <div className="bg-[#F8F9FA] rounded-[8px] px-3.5 py-2.5 my-3 flex items-center justify-between border border-[#F0F0F0]">
            <div className="flex items-center space-x-1.5 text-xs text-[#7A7A7A]">
              <MapPin className="w-3.5 h-3.5 text-[#878A99]" />
              <span>{vehicle.location}</span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#878A99]">Starting From </span>
              <span className="text-[17px] font-bold text-[#E53935] ml-0.5">${vehicle.pricePerDay}</span>
              <span className="text-[11px] text-[#7A7A7A] ml-1">Day</span>
            </div>
          </div>

          {/* Rent Now Button */}
          <Link 
            href={`/rental/${vehicle.slug}`}
            className="w-full py-3 bg-[#201F1D] group-hover:bg-[#127384] text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-colors duration-300"
          >
            <Calendar className="w-4 h-4" />
            <span>Rent Now</span>
          </Link>
        </div>

      </div>
    );
  }

  // Grid View (Exact Match to Screenshot)
  return (
    <div className="bg-white rounded-[15px] border border-[#EAEDF0] shadow-[0_4px_24px_rgba(222,222,222,0.25)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col group">
      
      {/* Car Image Container */}
      <div className="relative h-[220px] bg-[#f8f9fa] overflow-hidden">
        <Link href={`/rental/${vehicle.slug}`}>
          <img 
            src={vehicle.featuredImage} 
            alt={vehicle.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Brand Tag (White pill on top-left of image) */}
        <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-white text-[#201F1D] text-[12px] font-semibold rounded-md shadow-sm border border-gray-100">
          {vehicle.brand || vehicle.category}
        </span>

        {/* Wishlist Heart on top-right */}
        <button 
          onClick={() => toggleWishlist(vehicle.id)}
          className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow transition-colors ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:text-red-500'
          }`}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* Author Avatar Overlapping the Image Bottom-Right (As seen in screenshot) */}
        <div className="absolute -bottom-3.5 right-4 w-7 h-7 rounded-full border-2 border-white bg-[#D9D9D9] flex items-center justify-center shadow-md z-10 overflow-hidden">
          <img 
            src="/images/user_image.jpg" 
            alt="Host" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-[17px] font-bold text-[#201F1D] group-hover:text-[#127384] transition-colors mt-1 mb-3 line-clamp-1">
            <Link href={`/rental/${vehicle.slug}`}>
              {vehicle.title}
            </Link>
          </h3>

          {/* 6 Specs Matrix with SVG Icons (2 rows x 3 columns) */}
          <div className="grid grid-cols-3 gap-y-2.5 gap-x-2 py-2.5 text-[12px] text-[#7A7A7A]">
            <div className="flex items-center space-x-1.5">
              <img src="/images/car-parts-01.svg" alt="Gear" className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
              <span className="truncate">{vehicle.specs.transmission}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <img src="/images/car-parts-02.svg" alt="Mileage" className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
              <span className="truncate">{vehicle.specs.mileage}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <img src="/images/car-parts-03.svg" alt="Fuel" className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
              <span className="truncate">{vehicle.specs.fuelType}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <img src="/images/car-parts-04.svg" alt="Steering" className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
              <span className="truncate">Left</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <img src="/images/car-parts-05.svg" alt="Year" className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
              <span className="truncate">{vehicle.year}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <img src="/images/car-parts-06.svg" alt="Seats" className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
              <span className="truncate">{vehicle.specs.seats} Persons</span>
            </div>
          </div>

          {/* Location & Starting From Red Price Box (Matches Screenshot) */}
          <div className="bg-[#F8F9FA] rounded-[8px] px-3.5 py-2.5 my-3 flex items-center justify-between border border-[#F0F0F0]">
            <div className="flex items-center space-x-1.5 text-xs text-[#7A7A7A]">
              <MapPin className="w-3.5 h-3.5 text-[#878A99]" />
              <span className="truncate max-w-[130px]">{vehicle.location}</span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#878A99]">Starting From </span>
              <span className="text-[17px] font-bold text-[#E53935] ml-0.5">${vehicle.pricePerDay}</span>
              <span className="text-[11px] text-[#7A7A7A] ml-1">Day</span>
            </div>
          </div>
        </div>

        {/* Full-width Rent Now Button with Calendar Icon */}
        <Link 
          href={`/rental/${vehicle.slug}`}
          className="w-full py-3 bg-[#201F1D] group-hover:bg-[#127384] text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-colors duration-300 mt-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Rent Now</span>
        </Link>

      </div>

    </div>
  );
};
