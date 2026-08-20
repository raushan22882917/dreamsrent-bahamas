'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRental } from '../context/RentalContext';
import { VEHICLE_CATEGORIES, ALL_LOCATIONS } from '../data/vehicles';
import { HeroSearch } from '../components/home/HeroSearch';
import { VehicleCard } from '../components/ui/VehicleCard';
import { 
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Award,
  Users,
  Car,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

const POPULAR_BRANDS = ['All Brands', 'Ferrari', 'Chevrolet', 'Tesla', 'Audi', 'Porsche', 'Mercedes-Benz', 'BMW', 'Land Rover'];

export default function HomePage() {
  const { vehicles } = useRental();
  const [selectedBrand, setSelectedBrand] = useState('All Brands');

  // Filter vehicles by brand for the Brand Tabs section
  const filteredBrandVehicles = selectedBrand === 'All Brands'
    ? vehicles
    : vehicles.filter(v => 
        v.brand.toLowerCase() === selectedBrand.toLowerCase() || 
        v.title.toLowerCase().includes(selectedBrand.toLowerCase())
      );

  const displayedBrandVehicles = filteredBrandVehicles.slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. Hero Banner (Exact Match to DreamsRent Live Theme) */}
      <section 
        className="relative bg-white py-16 sm:py-24 overflow-hidden bg-cover bg-no-repeat bg-right"
        style={{ backgroundImage: "url('/images/banner.jpg')" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#EAEDF0] text-xs font-semibold text-[#201F1D]">
                <span className="text-base leading-none">👍</span>
                <span>100% Trusted car rental platform in the Bahamas</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#201F1D] tracking-tight leading-[1.15]">
                Find Your Best <br />
                <span className="text-[#FFA633]">Dream Car for Rental</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#7A7A7A] font-normal leading-relaxed max-w-xl">
                Experience the ultimate in comfort, performance, and sophistication with our luxury car rentals. From sleek sedans and stylish coupes to spacious SUVs and elegant convertibles, we offer a range of premium vehicles to suit your preferences.
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <Link 
                  href="/rental-grid"
                  className="inline-flex items-center space-x-2 px-7 py-3.5 bg-white hover:bg-[#FFA633] text-[#201F1D] hover:text-white font-bold rounded-xl border border-[#201F1D] hover:border-[#FFA633] shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>View All 24 Cars</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            {/* Right Car Image */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <img 
                src="/images/car-right.png" 
                alt="Find Your Best Dream Car" 
                className="w-full max-w-[620px] h-auto object-contain transform hover:scale-102 transition-transform duration-500 drop-shadow-2xl"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 2. Floating Search Box Banner */}
      <div className="px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <HeroSearch />
      </div>

      {/* 3. How It Works Section (100% Pixel-Perfect Match to Screenshot) */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#201F1D] tracking-tight">
              How It Works
            </h2>
            <div className="flex justify-center my-3">
              <img src="/images/title-head.png" alt="" className="h-2.5 w-auto object-contain" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
            </div>
            <p className="text-sm text-[#7A7A7A] leading-relaxed">
              Booking a car rental is a straightforward process that typically involves the following steps
            </p>
          </div>

          {/* 3 Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 text-center">
            
            {/* Step 1: Choose Locations (Teal #127384) */}
            <div className="flex flex-col items-center group">
              <div className="w-[104px] h-[104px] rounded-full border-2 border-dashed border-[#127384] p-2 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-[#127384] flex items-center justify-center shadow-md">
                  <img 
                    src="/images/services-icon-01.svg" 
                    alt="Choose Locations" 
                    className="w-10 h-10 filter brightness-0 invert" 
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#201F1D] mb-3">
                1. Choose Locations
              </h3>
              <p className="text-xs sm:text-[13px] text-[#7A7A7A] leading-relaxed max-w-sm">
                Determine the date & location for your car rental. Consider factors such as your travel itinerary, pickup/drop-off locations (e.g., airport, city center) and duration of rental.
              </p>
            </div>

            {/* Step 2: Pick-Up Locations (Orange #FFA633) */}
            <div className="flex flex-col items-center group">
              <div className="w-[104px] h-[104px] rounded-full border-2 border-dashed border-[#FFA633] p-2 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-[#FFA633] flex items-center justify-center shadow-md">
                  <img 
                    src="/images/services-icon-02.svg" 
                    alt="Pick-Up Locations" 
                    className="w-10 h-10 filter brightness-0 invert" 
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#201F1D] mb-3">
                2. Pick-Up Locations
              </h3>
              <p className="text-xs sm:text-[13px] text-[#7A7A7A] leading-relaxed max-w-sm">
                Check the availability of your desired vehicle type for your chosen dates and location. Ensure that the rental rates, taxes, fees, and any additional charges.
              </p>
            </div>

            {/* Step 3: Book your Car (Charcoal #201F1D) */}
            <div className="flex flex-col items-center group">
              <div className="w-[104px] h-[104px] rounded-full border-2 border-dashed border-[#201F1D] p-2 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-[#201F1D] flex items-center justify-center shadow-md">
                  <img 
                    src="/images/services-icon-03.svg" 
                    alt="Book your Car" 
                    className="w-10 h-10 filter brightness-0 invert" 
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#201F1D] mb-3">
                3. Book your Car
              </h3>
              <p className="text-xs sm:text-[13px] text-[#7A7A7A] leading-relaxed max-w-sm">
                Once you&apos;ve found car rental option, proceed to make a reservation. Provide the required information, including your details, driver&apos;s license, and payment details.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Explore Most Popular Cars (Real Database Vehicles) */}
      <section className="bg-[#F8F9FA] py-24 border-y border-[#EAEDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#201F1D] tracking-tight">
              Explore Most Popular Cars
            </h2>
            <div className="flex justify-center my-3">
              <img src="/images/title-head.png" alt="" className="h-2.5 w-auto object-contain" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
            </div>
            <p className="text-sm text-[#7A7A7A]">
              Live vehicle fleet pulled directly from our database, featuring full engine specs and instant booking.
            </p>
          </div>

          {/* Brand Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white rounded-2xl border border-[#EAEDF0] shadow-sm">
              {POPULAR_BRANDS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-5 py-2 rounded-xl font-semibold text-xs transition-all ${
                    selectedBrand === brand
                      ? 'bg-[#FFA633] text-white shadow'
                      : 'text-[#6B7280] hover:text-[#201F1D] hover:bg-gray-50'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Cars Grid (Real Photos from car-01.jpg to car-24.jpg) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedBrandVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} viewMode="grid" />
            ))}
          </div>

          {/* View All Fleet CTA */}
          <div className="text-center mt-12">
            <Link
              href="/rental-grid"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#1B1B1B] hover:bg-black text-white text-xs font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore All {vehicles.length} Vehicles in Fleet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. Most Popular Cartypes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#201F1D] tracking-tight">
            Most Popular Cartypes
          </h2>
          <div className="flex justify-center my-3">
            <img src="/images/title-head.png" alt="" className="h-2.5 w-auto object-contain" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
          </div>
          <p className="text-sm text-[#7A7A7A]">
            Choose from our luxury vehicle categories to match your travel needs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {[
            { name: 'Sport', count: '6 Cars', img: '/images/cars/car-01.jpg' },
            { name: 'Luxury', count: '5 Cars', img: '/images/cars/car-04.jpg' },
            { name: 'SUV / 4x4', count: '5 Cars', img: '/images/cars/car-07.jpg' },
            { name: 'Convertible', count: '3 Cars', img: '/images/cars/car-02.jpg' },
            { name: 'Sedan', count: '3 Cars', img: '/images/cars/car-03.jpg' },
            { name: 'Economy', count: '2 Cars', img: '/images/cars/car-05.jpg' }
          ].map((type) => (
            <Link
              key={type.name}
              href={`/rental-grid?category=${encodeURIComponent(type.name)}`}
              className="bg-white p-4 rounded-2xl border border-[#EAEDF0] hover:border-[#FFA633] shadow-sm hover:shadow-lg transition-all text-center group"
            >
              <img src={type.img} alt={type.name} className="w-full h-24 object-cover rounded-xl mb-3 group-hover:scale-105 transition-transform" />
              <h4 className="font-bold text-xs text-[#201F1D] group-hover:text-[#FFA633] transition-colors">{type.name}</h4>
              <p className="text-[11px] text-[#878A99]">{type.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Why Choose DreamsRent Feature Banner */}
      <section className="bg-[#127384] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mx-auto md:mx-0">
                <ShieldCheck className="w-6 h-6 text-[#FFA633]" />
              </div>
              <h4 className="font-bold text-base">Verified Fleet</h4>
              <p className="text-xs text-white/80">Every vehicle undergoes strict multi-point safety inspection.</p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mx-auto md:mx-0">
                <Award className="w-6 h-6 text-[#FFA633]" />
              </div>
              <h4 className="font-bold text-base">Best Rate Guarantee</h4>
              <p className="text-xs text-white/80">Competitive daily rates with transparent pricing and zero hidden fees.</p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mx-auto md:mx-0">
                <Users className="w-6 h-6 text-[#FFA633]" />
              </div>
              <h4 className="font-bold text-base">VIP Chauffeur Option</h4>
              <p className="text-xs text-white/80">Licensed professional drivers available for airport transfers & tours.</p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mx-auto md:mx-0">
                <PhoneCall className="w-6 h-6 text-[#FFA633]" />
              </div>
              <h4 className="font-bold text-base">24/7 Roadside Assistance</h4>
              <p className="text-xs text-white/80">Round-the-clock emergency support across all islands.</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
