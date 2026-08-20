'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRental } from '../context/RentalContext';
import { VEHICLE_CATEGORIES, ALL_LOCATIONS } from '../data/vehicles';
import { HeroSearch } from '../components/home/HeroSearch';
import { VehicleCard } from '../components/ui/VehicleCard';
import { 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

const POPULAR_BRANDS = ['Mazda', 'Audi', 'Honda', 'Toyota', 'Acura', 'Tesla'];

export default function HomePage() {
  const { vehicles } = useRental();
  const [selectedBrand, setSelectedBrand] = useState('Mazda');

  // Filter vehicles by brand for the Brand Tabs section
  const brandVehicles = vehicles.filter(v => 
    v.brand.toLowerCase() === selectedBrand.toLowerCase() || 
    v.title.toLowerCase().includes(selectedBrand.toLowerCase())
  );

  const displayedBrandVehicles = brandVehicles.length > 0 
    ? brandVehicles 
    : vehicles.slice(0, 3);

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
                <span>100% Trusted car rental platform in the World</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#201F1D] tracking-tight leading-[1.15]">
                Find Your Best <br />
                <span className="text-[#FFA633]">Dream Car for Rental</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#7A7A7A] font-normal leading-relaxed max-w-xl">
                Experience the ultimate in comfort, performance, and sophistication with our luxury car rentals. From sleek sedans and stylish coupes to spacious SUVs and elegant convertibles, we offer a range of premium vehicles to suit your preferences and lifestyle.
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <Link 
                  href="/rental-grid"
                  className="inline-flex items-center space-x-2 px-7 py-3.5 bg-white hover:bg-[#FFA633] text-[#201F1D] hover:text-white font-bold rounded-xl border border-[#201F1D] hover:border-[#FFA633] shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>View All Cars</span>
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
      <div className="px-4 sm:px-6 lg:px-8">
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

      {/* 4. Explore Most Popular Cars (Brand Tab Filters) */}
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
              Here&apos;s a list of some of the most popular cars globally, based on sales and customer preferences
            </p>
          </div>

          {/* Brand Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white rounded-2xl border border-[#EAEDF0] shadow-sm">
              {POPULAR_BRANDS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-6 py-2 rounded-xl font-semibold text-xs transition-all ${
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

          {/* Brand Cars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedBrandVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} viewMode="grid" />
            ))}
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
            Most popular worldwide Car Category due to their reliability, affordability, and features.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { name: 'Crossover', count: '5 Cars', icon: '🚙' },
            { name: 'Family MPV', count: '1 Car', icon: '🚐' },
            { name: 'Pickup', count: '3 Cars', icon: '🛻' },
            { name: 'Sedan', count: '5 Cars', icon: '🚗' },
            { name: 'Sports Coupe', count: '4 Cars', icon: '🏎️' }
          ].map((type) => (
            <Link
              key={type.name}
              href={`/rental-grid?category=${encodeURIComponent(type.name)}`}
              className="p-6 bg-white rounded-2xl border border-[#EAEDF0] text-center hover:border-[#FFA633] hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)] transition-all group block"
            >
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                {type.icon}
              </div>
              <h6 className="font-bold text-[#201F1D] text-sm group-hover:text-[#FFA633] transition-colors">
                {type.name}
              </h6>
              <p className="text-xs text-[#878A99] mt-1">{type.count}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/rental-grid"
            className="inline-flex items-center space-x-2 px-7 py-3.5 bg-[#201F1D] hover:bg-[#FFA633] text-white font-bold text-xs rounded-xl shadow transition-colors"
          >
            <span>View all Cars</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. Facts By The Numbers */}
      <section className="relative bg-[#201F1D] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img src="/images/count-bg.jpg" alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
        </div>
        <img src="/images/facts-left.png" alt="" className="absolute left-0 top-0 opacity-20 pointer-events-none" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
        <img src="/images/facts-right.png" alt="" className="absolute right-0 bottom-0 opacity-20 pointer-events-none" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white">Facts By The Numbers</h2>
            <div className="flex justify-center my-3">
              <img src="/images/title-head.png" alt="" className="h-2.5 w-auto object-contain filter brightness-200" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
            </div>
            <p className="text-sm text-gray-400">
              Here are some dreamsrent interesting facts presented by the numbers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FFA633]/20 flex items-center justify-center mb-4">
                <img src="/images/bx-car.svg" alt="Customers" className="w-6 h-6" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
              </div>
              <h4 className="text-3xl sm:text-4xl font-extrabold text-[#FFA633]">16 K+</h4>
              <p className="text-xs font-medium text-gray-300">Happy Customers</p>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FFA633]/20 flex items-center justify-center mb-4">
                <img src="/images/bx-headphone.svg" alt="Cars" className="w-6 h-6" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
              </div>
              <h4 className="text-3xl sm:text-4xl font-extrabold text-[#FFA633]">2547 +</h4>
              <p className="text-xs font-medium text-gray-300">Count of Cars</p>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FFA633]/20 flex items-center justify-center mb-4">
                <img src="/images/bx-heart.svg" alt="Solutions" className="w-6 h-6" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
              </div>
              <h4 className="text-3xl sm:text-4xl font-extrabold text-[#FFA633]">625 K+</h4>
              <p className="text-xs font-medium text-gray-300">Car Center Solutions</p>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FFA633]/20 flex items-center justify-center mb-4">
                <img src="/images/bx-history.svg" alt="Kilometers" className="w-6 h-6" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
              </div>
              <h4 className="text-3xl sm:text-4xl font-extrabold text-[#FFA633]">200 K+</h4>
              <p className="text-xs font-medium text-gray-300">Total Kilometer</p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Recommended Car Rental Deals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-[#201F1D]">Recommended Car Rental deals</h2>
            <p className="text-sm text-[#7A7A7A] mt-2">
              Here are some versatile options that cater to different needs
            </p>
          </div>
          <Link
            href="/rental-grid"
            className="text-xs font-bold text-[#FFA633] hover:text-[#e5952e] flex items-center mt-4 md:mt-0"
          >
            <span>View All Deals</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.slice(0, 6).map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} viewMode="grid" />
          ))}
        </div>
      </section>

    </div>
  );
}
