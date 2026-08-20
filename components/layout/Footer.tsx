'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Award, 
  ShieldCheck, 
  HeartHandshake, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Check, 
  Globe, 
  Share2, 
  MessageCircle, 
  Radio 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#151515] text-gray-300 pt-16 pb-12 border-t border-gray-800 relative overflow-hidden">
      
      {/* Decorative theme background flourishes */}
      <img 
        src="/images/footer-left.png" 
        alt="" 
        className="absolute left-0 bottom-0 opacity-10 pointer-events-none max-w-[250px]" 
        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
      />
      <img 
        src="/images/footer-right.png" 
        alt="" 
        className="absolute right-0 bottom-0 opacity-10 pointer-events-none max-w-[250px]" 
        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top 3 Feature Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFA633]/15 border border-[#FFA633]/30 flex items-center justify-center text-[#FFA633] flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">Best Rate Guarantee</h4>
              <p className="text-xs text-gray-400 mt-0.5">Direct reservations with zero hidden booking fees</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFA633]/15 border border-[#FFA633]/30 flex items-center justify-center text-[#FFA633] flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">Free Cancellation</h4>
              <p className="text-xs text-gray-400 mt-0.5">Cancel 100% free up to 24 hours prior to pickup</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFA633]/15 border border-[#FFA633]/30 flex items-center justify-center text-[#FFA633] flex-shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">24/7 Roadside Assistance</h4>
              <p className="text-xs text-gray-400 mt-0.5">Instant customer support across all locations</p>
            </div>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-12">
          
          {/* Column 1: Brand Info & Newsletter (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <img 
                src="/images/logo.png" 
                alt="DreamsRent" 
                className="h-10 w-auto object-contain brightness-0 invert"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/logo.svg';
                }}
              />
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed pr-4">
              Bahamas premier exotic and luxury car rental service. Offering high-performance convertibles, premium sedans, and 7-passenger island SUVs.
            </p>

            <div className="pt-2">
              <h5 className="text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-2">
                Subscribe to Exclusive Deals
              </h5>
              
              {subscribed ? (
                <div className="p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-xl text-emerald-400 text-xs flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Thank you for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-white/10 border border-gray-700 rounded-l-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFA633]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#FFA633] hover:bg-[#e5952e] text-white rounded-r-xl transition-colors flex items-center justify-center"
                    title="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: About & Quick Links (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              About & Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/about-us" className="hover:text-[#FFA633] transition-colors">
                  About DreamsRent
                </Link>
              </li>
              <li>
                <Link href="/our-team" className="hover:text-[#FFA633] transition-colors">
                  Our Leadership Team
                </Link>
              </li>
              <li>
                <Link href="/rental-grid" className="hover:text-[#FFA633] transition-colors">
                  Rental Fleet Grid
                </Link>
              </li>
              <li>
                <Link href="/rental-list" className="hover:text-[#FFA633] transition-colors">
                  Rental Fleet List
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#FFA633] transition-colors">
                  Rental FAQs & Policies
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#FFA633] transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Locations & Hubs (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Locations & Hubs
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-center space-x-1.5 hover:text-[#FFA633] cursor-pointer">
                <MapPin className="w-3.5 h-3.5 text-[#FFA633] flex-shrink-0" />
                <span>Tower Bridge</span>
              </li>
              <li className="flex items-center space-x-1.5 hover:text-[#FFA633] cursor-pointer">
                <MapPin className="w-3.5 h-3.5 text-[#FFA633] flex-shrink-0" />
                <span>Big Ben</span>
              </li>
              <li className="flex items-center space-x-1.5 hover:text-[#FFA633] cursor-pointer">
                <MapPin className="w-3.5 h-3.5 text-[#FFA633] flex-shrink-0" />
                <span>Buckingham Palace</span>
              </li>
              <li className="flex items-center space-x-1.5 hover:text-[#FFA633] cursor-pointer">
                <MapPin className="w-3.5 h-3.5 text-[#FFA633] flex-shrink-0" />
                <span>Nassau Airport (NAS)</span>
              </li>
              <li className="flex items-center space-x-1.5 hover:text-[#FFA633] cursor-pointer">
                <MapPin className="w-3.5 h-3.5 text-[#FFA633] flex-shrink-0" />
                <span>Paradise Island</span>
              </li>
              <li className="flex items-center space-x-1.5 hover:text-[#FFA633] cursor-pointer">
                <MapPin className="w-3.5 h-3.5 text-[#FFA633] flex-shrink-0" />
                <span>Cable Beach</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Concierge (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Customer Concierge
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#FFA633] flex-shrink-0" />
                <a href="tel:+12425553732" className="hover:text-white transition-colors">
                  +1 (242) 555-DREAMS
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#FFA633] flex-shrink-0" />
                <a href="mailto:reservations@dreamsrent.com" className="hover:text-white transition-colors">
                  reservations@dreamsrent.com
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-[#FFA633] flex-shrink-0" />
                <span>24 Hours / 7 Days a Week</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block mb-2">
                Connect With Us
              </span>
              <div className="flex items-center space-x-2">
                <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#FFA633] hover:text-white text-gray-300 flex items-center justify-center transition-colors">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#FFA633] hover:text-white text-gray-300 flex items-center justify-center transition-colors">
                  <Share2 className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#FFA633] hover:text-white text-gray-300 flex items-center justify-center transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#FFA633] hover:text-white text-gray-300 flex items-center justify-center transition-colors">
                  <Radio className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 mt-4 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 DreamsRent. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/faq" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/faq" className="hover:text-gray-300 transition-colors">
              Terms of Rental Agreement
            </Link>
            <Link href="/faq" className="hover:text-gray-300 transition-colors">
              Security Deposit Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
