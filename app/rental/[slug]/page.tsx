'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRental } from '../../../context/RentalContext';
import { BOOKING_EXTRAS, ALL_LOCATIONS } from '../../../data/vehicles';
import { BookingExtra } from '../../../types/rental';
import { 
  Fuel, 
  Gauge, 
  Users, 
  Settings2, 
  Heart, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Check, 
  Calendar, 
  Clock, 
  DollarSign,
  ArrowRight,
  Info,
  Car
} from 'lucide-react';

export default function SingleRentalPage() {
  const params = useParams();
  const router = useRouter();
  const { vehicles, searchCriteria, setSearchCriteria, toggleWishlist, isInWishlist } = useRental();
  
  const slug = params?.slug as string;
  const vehicle = vehicles.find(v => v.slug === slug) || vehicles[0];
  const isFavorite = isInWishlist(vehicle.id);

  const [activeImage, setActiveImage] = useState(vehicle.featuredImage);
  const [selectedExtras, setSelectedExtras] = useState<BookingExtra[]>([BOOKING_EXTRAS[3]]); // Default full insurance

  // Calculate rental duration in days
  const start = new Date(searchCriteria.pickupDate);
  const end = new Date(searchCriteria.returnDate);
  const diffTime = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const days = isNaN(diffTime) ? 3 : diffTime;

  // Calculate totals
  const rentalSubtotal = vehicle.pricePerDay * days;
  const extrasTotal = selectedExtras.reduce((sum, extra) => {
    return sum + (extra.priceType === 'per_day' ? extra.price * days : extra.price);
  }, 0);
  const taxes = Math.round((rentalSubtotal + extrasTotal) * 0.10); // 10% VAT
  const depositAmount = vehicle.deposit;
  const totalAmount = rentalSubtotal + extrasTotal + taxes;

  const handleToggleExtra = (extra: BookingExtra) => {
    setSelectedExtras(prev => {
      const exists = prev.some(e => e.id === extra.id);
      return exists ? prev.filter(e => e.id !== extra.id) : [...prev, extra];
    });
  };

  const handleProceedToCheckout = () => {
    // Save selected draft booking to session storage
    const draftBooking = {
      vehicleId: vehicle.id,
      pickupLocation: searchCriteria.pickupLocation,
      returnLocation: searchCriteria.returnLocation,
      pickupDate: searchCriteria.pickupDate,
      pickupTime: searchCriteria.pickupTime,
      returnDate: searchCriteria.returnDate,
      returnTime: searchCriteria.returnTime,
      days,
      dailyRate: vehicle.pricePerDay,
      rentalSubtotal,
      selectedExtras,
      extrasTotal,
      taxes,
      depositAmount,
      totalAmount
    };
    sessionStorage.setItem('dreamsrent_draft_booking', JSON.stringify(draftBooking));
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <span>/</span>
          <Link href="/rental-grid" className="hover:text-orange-600">Fleet</Link>
          <span>/</span>
          <span className="text-gray-900">{vehicle.title}</span>
        </div>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 font-bold text-xs rounded-full uppercase">
                {vehicle.category}
              </span>
              <div className="flex items-center text-xs text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 mr-1" />
                <span>{vehicle.rating}</span>
                <span className="text-gray-400 font-normal ml-1">({vehicle.reviewsCount} reviews)</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900">{vehicle.title}</h1>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <MapPin className="w-4 h-4 text-orange-500 mr-1" />
              Available for pickup at: <strong className="ml-1 text-gray-700">{vehicle.location}</strong>
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => toggleWishlist(vehicle.id)}
              className={`p-3 rounded-2xl border transition-all ${
                isFavorite 
                  ? 'bg-red-50 border-red-200 text-red-500' 
                  : 'bg-white border-gray-200 text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
            </button>

            <div className="text-right">
              <div className="text-3xl font-black text-orange-600">${vehicle.pricePerDay}</div>
              <div className="text-xs font-semibold text-gray-400">per day / unlimited miles</div>
            </div>
          </div>
        </div>

        {/* Main Grid: Gallery & Specs (Left) vs Booking Widget (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Gallery */}
            <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm space-y-4">
              <div className="h-80 sm:h-[420px] rounded-2xl overflow-hidden bg-gray-100">
                <img 
                  src={activeImage} 
                  alt={vehicle.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {vehicle.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-24 h-18 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImage === img ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Car className="w-5 h-5 mr-2 text-orange-500" />
                Vehicle Specifications
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
                  <span className="text-gray-400 uppercase font-bold text-[10px] flex items-center">
                    <Settings2 className="w-3.5 h-3.5 mr-1 text-orange-500" /> Transmission
                  </span>
                  <p className="font-bold text-gray-900 text-sm">{vehicle.specs.transmission}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
                  <span className="text-gray-400 uppercase font-bold text-[10px] flex items-center">
                    <Fuel className="w-3.5 h-3.5 mr-1 text-orange-500" /> Fuel Type
                  </span>
                  <p className="font-bold text-gray-900 text-sm">{vehicle.specs.fuelType}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
                  <span className="text-gray-400 uppercase font-bold text-[10px] flex items-center">
                    <Users className="w-3.5 h-3.5 mr-1 text-orange-500" /> Seating
                  </span>
                  <p className="font-bold text-gray-900 text-sm">{vehicle.specs.seats} Passengers</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
                  <span className="text-gray-400 uppercase font-bold text-[10px] flex items-center">
                    <Gauge className="w-3.5 h-3.5 mr-1 text-orange-500" /> Mileage Limit
                  </span>
                  <p className="font-bold text-gray-900 text-sm">{vehicle.specs.mileage}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
                  <span className="text-gray-400 uppercase font-bold text-[10px]">Doors</span>
                  <p className="font-bold text-gray-900 text-sm">{vehicle.specs.doors} Doors</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
                  <span className="text-gray-400 uppercase font-bold text-[10px]">Luggage Space</span>
                  <p className="font-bold text-gray-900 text-sm">{vehicle.specs.luggage}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
                  <span className="text-gray-400 uppercase font-bold text-[10px]">Model Year</span>
                  <p className="font-bold text-gray-900 text-sm">{vehicle.year}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
                  <span className="text-gray-400 uppercase font-bold text-[10px]">Engine</span>
                  <p className="font-bold text-gray-900 text-sm truncate">{vehicle.specs.engine || 'High Performance'}</p>
                </div>
              </div>
            </div>

            {/* Included Features */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Included Vehicle Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {vehicle.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Add-Ons */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Optional Extras & Add-On Services</h2>
              <div className="space-y-3">
                {BOOKING_EXTRAS.map((extra) => {
                  const isSelected = selectedExtras.some(e => e.id === extra.id);
                  return (
                    <label
                      key={extra.id}
                      onClick={() => handleToggleExtra(extra)}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-orange-500 bg-orange-50/40' 
                          : 'border-gray-100 hover:border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{extra.name}</p>
                          <p className="text-xs text-gray-500">{extra.description}</p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0 ml-4">
                        <span className="text-base font-black text-gray-900">+${extra.price}</span>
                        <span className="text-[10px] text-gray-400 block font-semibold">
                          {extra.priceType === 'per_day' ? '/ day' : 'one-time'}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Live Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl space-y-6">
              
              <div className="pb-4 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase">Reservation Cost</span>
                <div className="flex items-baseline mt-1">
                  <span className="text-3xl font-black text-orange-600">${vehicle.pricePerDay}</span>
                  <span className="text-xs font-semibold text-gray-400 ml-1">/ day</span>
                </div>
              </div>

              {/* Date & Location Selectors */}
              <div className="space-y-4">
                
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase flex items-center mb-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 mr-1" /> Pickup Location
                  </label>
                  <select
                    value={searchCriteria.pickupLocation}
                    onChange={(e) => setSearchCriteria(prev => ({ ...prev, pickupLocation: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold"
                  >
                    {ALL_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase flex items-center mb-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 mr-1" /> Return Location
                  </label>
                  <select
                    value={searchCriteria.returnLocation}
                    onChange={(e) => setSearchCriteria(prev => ({ ...prev, returnLocation: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold"
                  >
                    {ALL_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Pickup Date</label>
                    <input
                      type="date"
                      value={searchCriteria.pickupDate}
                      onChange={(e) => setSearchCriteria(prev => ({ ...prev, pickupDate: e.target.value }))}
                      className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Return Date</label>
                    <input
                      type="date"
                      value={searchCriteria.returnDate}
                      onChange={(e) => setSearchCriteria(prev => ({ ...prev, returnDate: e.target.value }))}
                      className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold"
                    />
                  </div>
                </div>

              </div>

              {/* Price Calculation Matrix */}
              <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>${vehicle.pricePerDay} × {days} Days</span>
                  <span className="font-bold text-gray-900">${rentalSubtotal}</span>
                </div>

                {extrasTotal > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Selected Extras ({selectedExtras.length})</span>
                    <span className="font-bold text-gray-900">+${extrasTotal}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Estimated Taxes & Fees (10%)</span>
                  <span className="font-bold text-gray-900">${taxes}</span>
                </div>

                <div className="flex justify-between text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                  <span className="flex items-center font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Refundable Deposit
                  </span>
                  <span className="font-bold">${depositAmount}</span>
                </div>

                <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-gray-900">Estimated Total:</span>
                  <span className="text-2xl font-black text-orange-600">${totalAmount}</span>
                </div>
              </div>

              {/* CTA Action */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2 transition-all transform active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-[11px] text-gray-400 text-center flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                Free cancellation up to 24 hours before pickup
              </p>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
