'use client';

import React, { useState, useEffect } from 'react';
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
  PhoneCall, 
  Star, 
  Sparkles, 
  MapPin, 
  Zap, 
  Clock, 
  Compass, 
  Key, 
  Check, 
  Gauge, 
  Flame,
  Plane,
  HeartHandshake
} from 'lucide-react';

export default function HomePage() {
  const { vehicles } = useRental();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [featuredCarIndex, setFeaturedCarIndex] = useState(0);

  // Top 5 Highlighted Supercars for the Interactive 3D Showcase
  const spotlightVehicles = vehicles.slice(0, 5);
  const currentSpotlight = spotlightVehicles[featuredCarIndex] || vehicles[0];

  // Auto-rotate spotlight car every 6 seconds unless user manually interacts
  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedCarIndex((prev) => (prev + 1) % (spotlightVehicles.length || 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [spotlightVehicles.length]);

  // Filter vehicles by category
  const filteredVehicles = selectedCategory === 'All'
    ? vehicles
    : vehicles.filter(v => v.category.toLowerCase() === selectedCategory.toLowerCase());

  const displayedVehicles = filteredVehicles.slice(0, 8);

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-[#201F1D] selection:bg-[#FFA633] selection:text-white">
      
      {/* ══════════════════════════════════════════════════════════════════════
          1. CINEMATIC LUXURY 3D HERO SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[640px] lg:min-h-[720px] bg-[#121316] overflow-hidden flex items-center justify-center py-16 sm:py-20 lg:py-24">
        
        {/* Ambient Dark Coastal Gradient & Glow Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Subtle animated light orbs */}
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-[#FFA633]/20 via-[#FFA633]/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-tl from-amber-500/15 via-orange-600/5 to-transparent rounded-full blur-3xl"></div>
          
          {/* Subtle Grid overlay for high-tech automotive feel */}
          <div 
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          ></div>

          {/* Fallback image layer */}
          <div 
            className="absolute inset-0 opacity-15 bg-cover bg-center mix-blend-luminosity"
            style={{ backgroundImage: "url('/images/banner.jpg')" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Headline & VIP Offer */}
            <div className="lg:col-span-6 space-y-6 text-white text-center lg:text-left">
              
              {/* Trust Pill */}
              <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#FFA633] shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#FFA633] animate-ping"></span>
                <span>BAHAMAS #1 PREMIER LUXURY & SUPERCAR RENTAL</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-white leading-[1.12]">
                Drive The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA633] via-amber-400 to-orange-400">Extraordinary</span> Across Nassau.
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                Experience Paradise Island, Cable Beach, and Nassau in luxury. Enjoy VIP Airport terminal delivery at Lynden Pindling (NAS), zero security deposit options, and 24 verified late-model exotics.
              </p>

              {/* Highlights List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs text-gray-200">
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10">
                  <Plane className="w-4 h-4 text-[#FFA633]" />
                  <span>Free NAS Airport Drop</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-[#FFA633]" />
                  <span>Full Island Insurance</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10">
                  <Zap className="w-4 h-4 text-[#FFA633]" />
                  <span>Instant Confirmation</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                <Link 
                  href="/rental-grid"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-[#FFA633] hover:bg-[#e5952e] text-white font-black text-sm rounded-2xl shadow-xl shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>Explore 24 Supercars</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a 
                  href="tel:+12425550199"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-2xl border border-white/20 backdrop-blur-md transition-all duration-300"
                >
                  <PhoneCall className="w-4 h-4 text-[#FFA633]" />
                  <span>VIP Concierge</span>
                </a>
              </div>

              {/* Renter Social Proof */}
              <div className="pt-2 flex items-center justify-center lg:justify-start space-x-4">
                <div className="flex -space-x-2">
                  <img src="/images/team/team_ceo_male_1787225259487.jpg" alt="Renter" className="w-8 h-8 rounded-full border-2 border-[#121316] object-cover" />
                  <img src="/images/team/team_business_head_1787225318994.jpg" alt="Renter" className="w-8 h-8 rounded-full border-2 border-[#121316] object-cover" />
                  <img src="/images/team/team_ceo_female_1787225300600.jpg" alt="Renter" className="w-8 h-8 rounded-full border-2 border-[#121316] object-cover" />
                </div>
                <div className="text-left text-xs">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="ml-1.5 font-bold text-white">4.98 / 5.0</span>
                  </div>
                  <span className="text-[11px] text-gray-400">Trusted by 4,850+ island travelers</span>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive 3D Supercar Showcase Spotlight */}
            <div className="lg:col-span-6 relative">
              
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden group">
                
                {/* Floating Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#FFA633]/20 border border-[#FFA633]/40 text-[#FFA633] text-[11px] font-bold uppercase tracking-wider">
                    {currentSpotlight?.category} Edition
                  </span>
                  <div className="flex items-center space-x-1 text-white">
                    <span className="text-xs text-gray-400">Daily Rate:</span>
                    <span className="text-xl font-black text-[#FFA633]">${currentSpotlight?.pricePerDay}</span>
                    <span className="text-[10px] text-gray-400">/day</span>
                  </div>
                </div>

                {/* Car Title & Location */}
                <div className="text-left mb-4">
                  <h3 className="text-2xl font-black text-white">{currentSpotlight?.title}</h3>
                  <p className="text-xs text-gray-300 flex items-center mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FFA633] mr-1" />
                    {currentSpotlight?.location || 'Nassau Airport (NAS) Hub'}
                  </p>
                </div>

                {/* Big Vehicle Photo with cinematic hover glow */}
                <div className="relative h-56 sm:h-72 w-full flex items-center justify-center my-4 overflow-hidden rounded-2xl bg-gradient-to-b from-black/20 to-black/60">
                  <img 
                    src={currentSpotlight?.featuredImage || '/images/car-right.png'} 
                    alt={currentSpotlight?.title} 
                    className="w-full h-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700 shadow-2xl"
                  />
                  
                  {/* Floating Specs Badges on top of image */}
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] text-white flex items-center space-x-2">
                    <Gauge className="w-3.5 h-3.5 text-[#FFA633]" />
                    <span>{currentSpotlight?.specs?.transmission || 'Automatic'}</span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] text-white flex items-center space-x-2">
                    <Users className="w-3.5 h-3.5 text-[#FFA633]" />
                    <span>{currentSpotlight?.specs?.seats || 5} Seats</span>
                  </div>
                </div>

                {/* Spotlight Car Selector Thumbnails */}
                <div className="pt-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-left mb-2">
                    Select Featured Supercar:
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {spotlightVehicles.map((car, idx) => (
                      <button
                        key={car.id}
                        onClick={() => setFeaturedCarIndex(idx)}
                        className={`relative rounded-xl overflow-hidden border-2 transition-all p-0.5 ${
                          featuredCarIndex === idx 
                            ? 'border-[#FFA633] scale-105 shadow-md shadow-orange-500/30' 
                            : 'border-white/10 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={car.featuredImage} alt={car.title} className="w-full h-10 object-cover rounded-lg" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Reserve Button for Featured Car */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">Deposit: ${currentSpotlight?.deposit} (Refundable)</span>
                  <Link
                    href={`/rental/${currentSpotlight?.slug}`}
                    className="px-5 py-2.5 bg-white hover:bg-[#FFA633] text-[#121316] hover:text-white text-xs font-extrabold rounded-xl transition-all duration-300 flex items-center space-x-1.5"
                  >
                    <span>Instant Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. FLOATING SMART BOOKING BAR
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-30">
        <HeroSearch />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          3. SIGNATURE BAHAMAS FLEET (INTERACTIVE TABS)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#FFA633] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Late-Model Exotics & Convertibles</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#201F1D] tracking-tight">
              Explore Our Island Fleet
            </h2>
            <p className="text-xs sm:text-sm text-[#878A99] mt-1 max-w-lg">
              All 24 luxury vehicles are company-owned, immaculately maintained, and ready for instant delivery across the Bahamas.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {['All', 'Sport', 'Convertible', 'Sedan', 'SUV', 'Luxury'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#FFA633] text-white shadow-md shadow-orange-500/20'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-[#EAEDF0]'
                }`}
              >
                {cat === 'All' ? 'All Fleet (24)' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/rental-grid"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-[#201F1D] hover:bg-[#FFA633] text-white text-xs font-black rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Browse Full 24-Car Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. VIP BAHAMIAN PERKS (WHY RENT WITH DREAMSSRENT)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 border-y border-[#EAEDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-[#FFA633] uppercase tracking-wider">
              The Bahamas Luxury Drive Standard
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#201F1D] tracking-tight">
              Why Discerning Travelers Choose Us
            </h2>
            <p className="text-xs sm:text-sm text-[#878A99]">
              Designed from the ground up for frictionless luxury rentals throughout Nassau & Paradise Island.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-[#F8F9FA] p-7 rounded-3xl border border-[#EAEDF0] hover:border-[#FFA633]/50 transition-all duration-300 hover:shadow-xl group space-y-4">
              <div className="w-13 h-13 rounded-2xl bg-orange-50 text-[#FFA633] flex items-center justify-center group-hover:bg-[#FFA633] group-hover:text-white transition-colors duration-300">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#201F1D]">VIP Terminal Drop-off</h3>
              <p className="text-xs text-[#878A99] leading-relaxed">
                Step off your flight at Lynden Pindling (NAS) and your cleaned, air-conditioned vehicle is waiting directly at the VIP curb.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#F8F9FA] p-7 rounded-3xl border border-[#EAEDF0] hover:border-[#FFA633]/50 transition-all duration-300 hover:shadow-xl group space-y-4">
              <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#201F1D]">Zero Hidden Island Fees</h3>
              <p className="text-xs text-[#878A99] leading-relaxed">
                Transparent pricing with local Bahamas insurance, airport concession fees, and 24/7 roadside rescue clearly included upfront.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#F8F9FA] p-7 rounded-3xl border border-[#EAEDF0] hover:border-[#FFA633]/50 transition-all duration-300 hover:shadow-xl group space-y-4">
              <div className="w-13 h-13 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#201F1D]">Chauffeur & Driver Options</h3>
              <p className="text-xs text-[#878A99] leading-relaxed">
                Prefer to sit back? Book our licensed local chauffeurs for private island tours, dining reservations, or corporate events.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#F8F9FA] p-7 rounded-3xl border border-[#EAEDF0] hover:border-[#FFA633]/50 transition-all duration-300 hover:shadow-xl group space-y-4">
              <div className="w-13 h-13 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#201F1D]">60-Second Digital Check-In</h3>
              <p className="text-xs text-[#878A99] leading-relaxed">
                No waiting in counter queues. Verify your driver&apos;s license securely on your phone and start driving immediately.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. BAHAMAS SIGNATURE DRIVING DESTINATIONS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-[#FFA633] uppercase tracking-wider">
            Island Escapes
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#201F1D] tracking-tight">
            Curated Bahamian Driving Routes
          </h2>
          <p className="text-xs sm:text-sm text-[#878A99]">
            Take the top down and cruise the most scenic coastal highways across New Providence Island.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Route 1: Paradise Island */}
          <div className="relative rounded-3xl overflow-hidden group shadow-lg h-80 bg-gray-900">
            <img 
              src="/images/cars/car-01.jpg" 
              alt="Paradise Island" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-6 flex flex-col justify-end">
              <span className="text-[10px] font-bold text-[#FFA633] uppercase tracking-wider">Scenic Coastal Drive</span>
              <h3 className="text-lg font-bold text-white mt-1">Paradise Island & Atlantis Marina</h3>
              <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                Cross the iconic harbor bridge in a Ferrari 458 or Camaro SS and explore world-class dining and resorts.
              </p>
              <div className="mt-3">
                <Link href="/rental-grid" className="text-xs font-bold text-[#FFA633] hover:underline inline-flex items-center">
                  <span>View Recommended Convertibles</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Route 2: Cable Beach */}
          <div className="relative rounded-3xl overflow-hidden group shadow-lg h-80 bg-gray-900">
            <img 
              src="/images/cars/car-02.jpg" 
              alt="Cable Beach" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-6 flex flex-col justify-end">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Resort Strip</span>
              <h3 className="text-lg font-bold text-white mt-1">Cable Beach & Baha Mar Blvd</h3>
              <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                Smooth highway cruising with sunset ocean views, luxury casinos, and beach clubs.
              </p>
              <div className="mt-3">
                <Link href="/rental-grid" className="text-xs font-bold text-[#FFA633] hover:underline inline-flex items-center">
                  <span>View Executive Sedans</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Route 3: West Bay & Clifton */}
          <div className="relative rounded-3xl overflow-hidden group shadow-lg h-80 bg-gray-900">
            <img 
              src="/images/cars/car-08.jpg" 
              alt="Clifton Heritage" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-6 flex flex-col justify-end">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Coastal Heritage</span>
              <h3 className="text-lg font-bold text-white mt-1">Clifton Heritage & Western Ocean Drive</h3>
              <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                Unwind with lush tropical scenery and turquoise coastlines in a premium Range Rover SUV.
              </p>
              <div className="mt-3">
                <Link href="/rental-grid" className="text-xs font-bold text-[#FFA633] hover:underline inline-flex items-center">
                  <span>View Luxury SUVs</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6. STATS & LIVE ISLAND NUMBERS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#121316] py-16 text-white border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div>
              <p className="text-3xl sm:text-5xl font-black text-[#FFA633]">4,850+</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">
                Completed Rentals
              </p>
            </div>

            <div>
              <p className="text-3xl sm:text-5xl font-black text-white">24</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">
                Verified Supercars
              </p>
            </div>

            <div>
              <p className="text-3xl sm:text-5xl font-black text-[#FFA633]">15 Min</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">
                Avg. Airport Dispatch
              </p>
            </div>

            <div>
              <p className="text-3xl sm:text-5xl font-black text-emerald-400">4.98 ★</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">
                Customer Satisfaction
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7. VERIFIED GUEST REVIEWS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold text-[#FFA633] uppercase tracking-wider">
            Verified Experiences
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#201F1D] tracking-tight">
            Loved By Island Travelers
          </h2>
          <p className="text-xs sm:text-sm text-[#878A99]">
            Read genuine feedback from guests who rented during their Bahamas vacation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-7 rounded-3xl border border-[#EAEDF0] shadow-sm space-y-4">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed italic">
              &quot;Rented the Ferrari 458 for 4 days on Paradise Island. The car was delivered straight to our resort lobby within 15 minutes of landing at NAS airport. Flawless service!&quot;
            </p>
            <div className="flex items-center space-x-3 pt-2 border-t border-gray-100">
              <img src="/images/team/team_ceo_male_1787225259487.jpg" alt="Renter" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-xs font-bold text-[#201F1D]">David Montgomery</p>
                <p className="text-[10px] text-gray-400">New York, USA • Rented Ferrari 458</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#EAEDF0] shadow-sm space-y-4">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed italic">
              &quot;The Camaro SS Convertible was the highlight of our Cable Beach honeymoon. Transparent pricing with zero hidden fees at return. Will definitely book again next season.&quot;
            </p>
            <div className="flex items-center space-x-3 pt-2 border-t border-gray-100">
              <img src="/images/team/team_ceo_female_1787225300600.jpg" alt="Renter" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-xs font-bold text-[#201F1D]">Sophia & Lucas Sterling</p>
                <p className="text-[10px] text-gray-400">London, UK • Rented Chevrolet Camaro</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#EAEDF0] shadow-sm space-y-4">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed italic">
              &quot;Booked a Range Rover for our family trip. The digital check-in took 45 seconds on my phone and the car had complimentary bottled waters and chilled AC. 10/10.&quot;
            </p>
            <div className="flex items-center space-x-3 pt-2 border-t border-gray-100">
              <img src="/images/team/team_business_head_1787225318994.jpg" alt="Renter" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-xs font-bold text-[#201F1D]">Carlos Hernandez</p>
                <p className="text-[10px] text-gray-400">Miami, FL • Rented Range Rover</p>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          8. VIP CALL TO ACTION BANNER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#121316] via-[#1C1E24] to-[#121316] p-8 sm:p-14 text-white overflow-hidden shadow-2xl border border-white/10">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFA633]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold text-[#FFA633] uppercase tracking-wider">
                Instant Bahamas Reservations
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Ready to Experience Your Dream Ride in the Bahamas?
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                Reserve in 60 seconds online or speak directly with our 24/7 Nassau Airport dispatch team.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                href="/rental-grid"
                className="px-8 py-4 bg-[#FFA633] hover:bg-[#e5952e] text-white font-extrabold text-xs text-center rounded-2xl shadow-xl shadow-orange-500/25 transition-all"
              >
                Book Your Supercar Now
              </Link>
              <a
                href="tel:+12425550199"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs text-center rounded-2xl border border-white/20 backdrop-blur-md transition-all flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-4 h-4 text-[#FFA633]" />
                <span>Call +1 (242) 555-0199</span>
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
