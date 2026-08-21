'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRental } from '../context/RentalContext';
import { VEHICLE_CATEGORIES, ALL_LOCATIONS } from '../data/vehicles';
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
  Calendar,
  MapPin,
  Sparkles,
  Zap,
  Clock,
  Star,
  Fuel,
  Gauge,
  Sliders,
  Check,
  ChevronDown,
  HelpCircle,
  Compass,
  KeyRound,
  DollarSign
} from 'lucide-react';

const BAHAMAS_HUBS = [
  { name: 'Nassau Airport (NAS)', label: 'Lynden Pindling Intl', icon: '✈️' },
  { name: 'Paradise Island Hub', label: 'Atlantis & Marina', icon: '🏝️' },
  { name: 'Cable Beach Resort Hub', label: 'Baha Mar Area', icon: '🏖️' },
  { name: 'Downtown Nassau Harbor', label: 'Cruise Port Terminal', icon: '⚓' },
];

const SPOTLIGHT_HERO_CARS = [
  {
    id: 'car-1',
    title: 'Ferrari 458 MM Speciale',
    slug: 'ferrari-458-mm-speciale',
    brand: 'Ferrari',
    category: 'Sport',
    price: 160,
    hp: '597 HP',
    speed: '3.0s 0-60',
    img: '/images/cars/car-01.jpg',
    rating: 5.0,
    reviews: 28
  },
  {
    id: 'car-2',
    title: '2018 Chevrolet Camaro',
    slug: '2018-chevrolet-camaro',
    brand: 'Chevrolet',
    category: 'Convertible',
    price: 100,
    hp: '455 HP',
    speed: '4.0s 0-60',
    img: '/images/cars/car-02.jpg',
    rating: 4.9,
    reviews: 34
  },
  {
    id: 'car-3',
    title: 'Tesla Model 3 Sport',
    slug: 'tesla-camry-se-350',
    brand: 'Tesla',
    category: 'Sedan',
    price: 120,
    hp: '450 HP',
    speed: '3.1s 0-60',
    img: '/images/cars/car-03.jpg',
    rating: 4.9,
    reviews: 19
  }
];

const FAQS = [
  {
    q: 'What documents are required to rent a vehicle in the Bahamas?',
    a: 'You will need a valid driver\'s license from your home country or an International Driving Permit (IDP), a valid passport, and a credit or debit card for the security deposit.'
  },
  {
    q: 'Can I get airport pickup and drop-off at Nassau (NAS)?',
    a: 'Yes! We provide complimentary VIP airport delivery at Lynden Pindling International Airport (NAS). Our representative will meet you right outside arrivals with your keys ready.'
  },
  {
    q: 'Is insurance included in the daily rental rate?',
    a: 'All our rentals come with basic third-party liability insurance. Comprehensive Collision Damage Waiver (CDW) and zero-deductible premium protection can be selected during checkout.'
  },
  {
    q: 'Can I drive the vehicle across different Bahamas islands?',
    a: 'Vehicles rented on New Providence / Nassau can be driven freely anywhere on the island, including Paradise Island and Cable Beach. Inter-island ferry transport requires advance authorization.'
  }
];

export default function HomePage() {
  const router = useRouter();
  const { vehicles } = useRental();
  
  // Hero Search State
  const [serviceType, setServiceType] = useState<'self_drive' | 'chauffeur' | 'airport'>('self_drive');
  const [selectedLocation, setSelectedLocation] = useState('Nassau Airport (NAS)');
  const [pickupDate, setPickupDate] = useState('2026-08-25');
  const [returnDate, setReturnDate] = useState('2026-08-29');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Spotlight Car Index
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  // Active Category Filter for Fleet Showroom
  const [activeFleetCategory, setActiveFleetCategory] = useState('All');
  
  // FAQ Open State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeSpotlightCar = SPOTLIGHT_HERO_CARS[spotlightIndex];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (selectedLocation) query.set('location', selectedLocation);
    if (selectedCategory && selectedCategory !== 'All') query.set('category', selectedCategory);
    router.push(`/rental-grid?${query.toString()}`);
  };

  // Filter vehicles for showcase
  const displayedVehicles = activeFleetCategory === 'All'
    ? vehicles.slice(0, 6)
    : vehicles.filter(v => v.category.toLowerCase().includes(activeFleetCategory.toLowerCase()) || activeFleetCategory.toLowerCase().includes(v.category.toLowerCase())).slice(0, 6);

  return (
    <div className="min-h-screen bg-white text-[#201F1D] font-sans selection:bg-[#FFA633]/30">
      
      {/* ========================================================
          1. NEW FORMAT HERO: EXECUTIVE SPLIT VISUALIZER
      ======================================================== */}
      <section className="relative bg-gradient-to-b from-[#FDFBF7] via-[#F8F9FA] to-white pt-8 pb-16 lg:py-20 overflow-hidden border-b border-[#EAEDF0]">
        
        {/* Subtle Background Accent Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFA633]/10 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#127384]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Live Ticker */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>24 Luxury Vehicles Ready for Instant Nassau Delivery</span>
            </div>
            <div className="hidden sm:flex items-center space-x-6 text-xs text-[#878A99] font-medium">
              <span className="flex items-center"><Check className="w-3.5 h-3.5 text-[#FFA633] mr-1" /> Free Airport Meet & Greet</span>
              <span className="flex items-center"><Check className="w-3.5 h-3.5 text-[#FFA633] mr-1" /> Free Cancellation (24h)</span>
              <span className="flex items-center"><Check className="w-3.5 h-3.5 text-[#FFA633] mr-1" /> 0% Hidden Fees</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Bold Headline & Interactive Booking Engine */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-3">
                <span className="text-xs font-bold tracking-widest text-[#FFA633] uppercase flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" /> DreamsRent Bahamas VIP Fleet
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#201F1D] tracking-tight leading-[1.1]">
                  Drive Your Dream in <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA633] to-[#e68a19]">
                    Bahamas Paradise
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed max-w-xl font-normal">
                  Experience Nassau, Paradise Island & Cable Beach in high-performance sports cars, luxury convertibles, and executive SUVs.
                </p>
              </div>

              {/* Service Tab Selector */}
              <div className="inline-flex p-1 bg-gray-100/90 rounded-2xl border border-gray-200 shadow-inner">
                <button
                  type="button"
                  onClick={() => setServiceType('self_drive')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    serviceType === 'self_drive' 
                      ? 'bg-white text-[#201F1D] shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  🚗 Self-Drive Rental
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('chauffeur')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    serviceType === 'chauffeur' 
                      ? 'bg-white text-[#201F1D] shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  🎩 VIP Chauffeur
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('airport')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    serviceType === 'airport' 
                      ? 'bg-white text-[#201F1D] shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  ✈️ Airport Express
                </button>
              </div>

              {/* Instant Search Bar Card */}
              <form 
                onSubmit={handleHeroSearch}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EAEDF0] shadow-xl space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  
                  {/* Pick-Up Location */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center">
                      <MapPin className="w-3 h-3 text-[#FFA633] mr-1" /> Pick-Up Hub
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:ring-2 focus:ring-[#FFA633] focus:outline-none"
                    >
                      <option value="Nassau Airport (NAS)">Nassau Airport (NAS)</option>
                      <option value="Paradise Island Hub">Paradise Island Hub</option>
                      <option value="Cable Beach Resort Hub">Cable Beach Resort Hub</option>
                      <option value="Downtown Nassau Harbor">Downtown Nassau Harbor</option>
                    </select>
                  </div>

                  {/* Vehicle Category */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center">
                      <Car className="w-3 h-3 text-[#FFA633] mr-1" /> Car Type
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:ring-2 focus:ring-[#FFA633] focus:outline-none"
                    >
                      {VEHICLE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat} Vehicles</option>
                      ))}
                    </select>
                  </div>

                  {/* Dates Range */}
                  <div className="space-y-1 sm:col-span-2 md:col-span-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 text-[#FFA633] mr-1" /> Rental Period
                    </label>
                    <div className="flex items-center space-x-1.5">
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-1/2 px-2 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[11px] font-bold text-gray-800 focus:ring-2 focus:ring-[#FFA633] focus:outline-none"
                      />
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-1/2 px-2 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[11px] font-bold text-gray-800 focus:ring-2 focus:ring-[#FFA633] focus:outline-none"
                      />
                    </div>
                  </div>

                </div>

                {/* Search Submit Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-gray-100 gap-3">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Best Price Guaranteed • Instant Confirmation</span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#FFA633] hover:bg-[#e5952e] text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center space-x-2"
                  >
                    <span>Search Available Cars</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </form>

            </div>

            {/* Right Column: Interactive Featured Car Spotlight */}
            <div className="lg:col-span-5 relative">
              
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAEDF0] shadow-xl relative overflow-hidden group">
                
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1.5 bg-orange-50 text-[#FFA633] px-3 py-1 rounded-full text-xs font-black">
                    <Star className="w-3.5 h-3.5 fill-[#FFA633]" />
                    <span>Featured Spotlight</span>
                  </div>
                  <span className="text-xs font-bold text-gray-400">
                    {spotlightIndex + 1} of {SPOTLIGHT_HERO_CARS.length}
                  </span>
                </div>

                {/* Car Image with smooth transition */}
                <div className="relative h-56 sm:h-64 flex items-center justify-center my-2">
                  <img
                    src={activeSpotlightCar.img}
                    alt={activeSpotlightCar.title}
                    className="max-h-full max-w-full object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Car Title & Price */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400">{activeSpotlightCar.brand} • {activeSpotlightCar.category}</span>
                      <h3 className="text-xl font-black text-[#201F1D] leading-tight">{activeSpotlightCar.title}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-[#FFA633]">${activeSpotlightCar.price}</span>
                      <span className="text-[10px] text-gray-400 block font-bold">/ day</span>
                    </div>
                  </div>

                  {/* Engine Specs Badges */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-100 text-center text-xs">
                    <div className="bg-gray-50 p-2 rounded-xl">
                      <span className="text-[10px] text-gray-400 block font-semibold">Power</span>
                      <span className="font-bold text-gray-800">{activeSpotlightCar.hp}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-xl">
                      <span className="text-[10px] text-gray-400 block font-semibold">0-60 mph</span>
                      <span className="font-bold text-gray-800">{activeSpotlightCar.speed}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-xl">
                      <span className="text-[10px] text-gray-400 block font-semibold">Rating</span>
                      <span className="font-bold text-gray-800">{activeSpotlightCar.rating} ★</span>
                    </div>
                  </div>

                  {/* Action & Switcher Controls */}
                  <div className="flex items-center space-x-3 pt-1">
                    <Link
                      href={`/rental/${activeSpotlightCar.slug}`}
                      className="flex-1 py-3 bg-[#1B1B1B] hover:bg-black text-white text-xs font-bold rounded-xl text-center shadow-sm transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <span>Reserve This Car</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {/* Next Car Toggle */}
                    <div className="flex items-center space-x-1">
                      {SPOTLIGHT_HERO_CARS.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSpotlightIndex(idx)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            spotlightIndex === idx 
                              ? 'bg-[#FFA633] w-6' 
                              : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                          title={`View car ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================================
          2. BAHAMAS ISLAND PICKUP HUBS STRIP
      ======================================================== */}
      <section className="bg-white py-8 border-b border-[#EAEDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BAHAMAS_HUBS.map((hub) => (
              <Link
                key={hub.name}
                href={`/rental-grid?location=${encodeURIComponent(hub.name)}`}
                className="flex items-center space-x-3 p-3.5 rounded-2xl bg-gray-50 hover:bg-orange-50/60 border border-gray-100 hover:border-orange-200 transition-all group"
              >
                <div className="text-2xl p-2 rounded-xl bg-white shadow-xs group-hover:scale-110 transition-transform">
                  {hub.icon}
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#201F1D] group-hover:text-[#FFA633] transition-colors leading-tight">
                    {hub.name}
                  </h4>
                  <p className="text-[10px] text-[#878A99] font-medium mt-0.5">{hub.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. FEATURED FLEET SHOWROOM (NEW TABBED FORMAT)
      ======================================================== */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFA633] block mb-1">
                Luxury & Performance Catalog
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#201F1D] tracking-tight">
                Explore Available Fleet
              </h2>
              <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 max-w-lg">
                24 fully serviced vehicles in stock. Clean interior guaranteed with multi-point safety check.
              </p>
            </div>

            <Link
              href="/rental-grid"
              className="inline-flex items-center space-x-2 text-xs font-bold text-[#FFA633] hover:underline"
            >
              <span>View All 24 Vehicles</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {['All', 'Sport', 'Convertible', 'Luxury', 'SUV / 4x4', 'Sedan'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFleetCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  activeFleetCategory === cat
                    ? 'bg-[#FFA633] text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* 3-Column Vehicle Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} viewMode="grid" />
            ))}
          </div>

          {/* View Full Catalog Button */}
          <div className="text-center mt-12">
            <Link
              href="/rental-grid"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-[#1B1B1B] hover:bg-black text-white text-xs font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore All Fleet & Real-Time Availability</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================
          4. 4 VALUE PILLARS & TRUST METRICS (INTERACTIVE FORMAT)
      ======================================================== */}
      <section className="py-20 bg-white border-b border-[#EAEDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFA633]">
              The DreamsRent Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#201F1D] tracking-tight">
              Why Discerning Travelers Choose Us
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7A7A]">
              We deliver more than just cars — we provide effortless island mobility and VIP hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#F8F9FA] rounded-3xl p-6 border border-[#EAEDF0] hover:border-orange-200 transition-all space-y-3 group hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#FFA633] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#201F1D]">15-Min Airport Delivery</h3>
              <p className="text-xs text-[#7A7A7A] leading-relaxed">
                Step right off your plane at Lynden Pindling (NAS) and drive away immediately without waiting in taxi lines.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-3xl p-6 border border-[#EAEDF0] hover:border-orange-200 transition-all space-y-3 group hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#201F1D]">100% Insured & Inspected</h3>
              <p className="text-xs text-[#7A7A7A] leading-relaxed">
                Every vehicle undergoes a 45-point mechanical and safety test with comprehensive insurance protection.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-3xl p-6 border border-[#EAEDF0] hover:border-orange-200 transition-all space-y-3 group hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#201F1D]">Transparent Pricing</h3>
              <p className="text-xs text-[#7A7A7A] leading-relaxed">
                All daily rates and deposit amounts are clearly detailed upfront with zero surprise desk fees.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-3xl p-6 border border-[#EAEDF0] hover:border-orange-200 transition-all space-y-3 group hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#201F1D]">24/7 Island Concierge</h3>
              <p className="text-xs text-[#7A7A7A] leading-relaxed">
                Live customer support, emergency roadside dispatch, and local island recommendations 24 hours a day.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          5. BAHAMAS SCENIC DRIVE DESTINATIONS
      ======================================================== */}
      <section className="py-20 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFA633]">
              Island Exploration
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#201F1D] tracking-tight">
              Top Bahamas Scenic Drives
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7A7A]">
              Recommended routes for unforgettable coastal memories with your DreamsRent convertible or SUV.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-3xl overflow-hidden border border-[#EAEDF0] shadow-sm group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="/images/cars/car-02.jpg" 
                  alt="Paradise Island Loop" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute bottom-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold rounded-lg">
                  12 Miles • Coastal Views
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-base font-bold text-[#201F1D]">Paradise Island & Marina Drive</h3>
                <p className="text-xs text-[#7A7A7A] leading-relaxed">
                  Cruise over the Sidney Poitier Bridge to Atlantis, Versailles Gardens, and Ocean Club Estates.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden border border-[#EAEDF0] shadow-sm group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="/images/cars/car-01.jpg" 
                  alt="West Bay Street" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute bottom-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold rounded-lg">
                  18 Miles • Sunset Highway
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-base font-bold text-[#201F1D]">West Bay Street & Clifton Heritage</h3>
                <p className="text-xs text-[#7A7A7A] leading-relaxed">
                  The ultimate coastal highway along Cable Beach leading into national park reefs and historic caves.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden border border-[#EAEDF0] shadow-sm group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="/images/cars/car-04.jpg" 
                  alt="Downtown Nassau" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute bottom-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold rounded-lg">
                  8 Miles • Heritage Route
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-base font-bold text-[#201F1D]">Downtown Nassau & Fort Fincastle</h3>
                <p className="text-xs text-[#7A7A7A] leading-relaxed">
                  Historic colonial architecture, Queen&apos;s Staircase, local rum distilleries, and harbor viewpoints.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          6. INTERACTIVE FAQ ACCORDION
      ======================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFA633]">
              Got Questions?
            </span>
            <h2 className="text-3xl font-black text-[#201F1D] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7A7A]">
              Everything you need to know about renting a car in Nassau & the Bahamas.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-[#F8F9FA] rounded-2xl border border-[#EAEDF0] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-[#201F1D] hover:text-[#FFA633] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180 text-[#FFA633]' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-[#6B7280] leading-relaxed animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          7. VIP CONCIERGE CTA BANNER
      ======================================================== */}
      <section className="bg-[#127384] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFA633]">
                Need Custom Itinerary or Yacht Transfer?
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Speak with our Bahamas VIP Concierge
              </h3>
              <p className="text-xs sm:text-sm text-white/80">
                Call our Nassau office at <b>+1 (242) 555-0199</b> or message us for custom multi-vehicle bookings.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact-us"
                className="px-7 py-3.5 bg-[#FFA633] hover:bg-[#e5952e] text-white text-xs font-black rounded-xl shadow-lg transition-all"
              >
                Contact VIP Concierge
              </Link>
              <Link
                href="/rental-grid"
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-black rounded-xl border border-white/20 transition-all"
              >
                View Full Fleet Catalog
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
