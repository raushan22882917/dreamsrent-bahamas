import React from 'react';
import Link from 'next/link';
import { Car, ShieldCheck, HeartHandshake, Award, Users, MapPin, ArrowRight } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 bg-orange-100 text-orange-700 font-bold text-xs rounded-full uppercase tracking-wider">
            About DreamsRent Bahamas
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
            Redefining Island Travel with Luxury & Reliability
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            Founded with a passion for world-class hospitality, DreamsRent provides pristine exotic cars, luxury SUVs, and executive cruisers across Nassau and Paradise Island.
          </p>
        </div>

        {/* Story & Image Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">Our Heritage</span>
            <h2 className="text-3xl font-black text-gray-900 leading-tight">
              Driven by Excellence, Dedicated to Your Journey
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We started with a vision to eliminate the standard hassles of rental car counters — long lines, surprise insurance costs, and outdated vehicles. 
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Today, DreamsRent operates a 20-vehicle modern fleet with instant airport terminal handovers, flexible 20% deposits, and 24/7 roadside peace of mind.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-center">
              <div>
                <p className="text-3xl font-black text-orange-600">20+</p>
                <p className="text-xs text-gray-400 font-semibold mt-1">Luxury Cars</p>
              </div>
              <div>
                <p className="text-3xl font-black text-orange-600">5</p>
                <p className="text-xs text-gray-400 font-semibold mt-1">Island Hubs</p>
              </div>
              <div>
                <p className="text-3xl font-black text-orange-600">99.8%</p>
                <p className="text-xs text-gray-400 font-semibold mt-1">Satisfaction</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="/images/cars/car-04.jpg" 
              alt="DreamsRent Bahamas Fleet" 
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-sm">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Pristine Fleet Condition</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every convertible, sports car, and 7-seater SUV is meticulously detailed and safety-checked before every customer rental.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Zero Hidden Surcharges</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Transparent upfront pricing inclusive of unlimited island mileage, transparent taxes, and full refundable deposits.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-sm">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">White-Glove Delivery</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Direct delivery right to your terminal at Nassau Airport (NAS) or your resort concierge on Paradise Island.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
