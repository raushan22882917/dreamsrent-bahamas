'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Car, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  HeartHandshake, 
  Award,
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
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-12 border-t border-gray-800 relative overflow-hidden">
      
      {/* Decorative PHP theme background flourishes */}
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
        
        {/* Top Feature Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Best Rate Guarantee</h4>
              <p className="text-xs text-gray-400">Direct island bookings with zero hidden booking fees</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Free Cancellation</h4>
              <p className="text-xs text-gray-400">Cancel 100% free up to 24 hours prior to pickup</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">24/7 Roadside Assistance</h4>
              <p className="text-xs text-gray-400">Instant on-island support across all Bahamas branches</p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          
          {/* Brand Info & Newsletter */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src="/images/logo.svg" 
                alt="DreamsRent Bahamas" 
                className="h-9 w-auto brightness-200"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <span className="text-xl font-black text-white">
                DREAMS<span className="text-orange-500">RENT</span>
              </span>
            </Link>
            
            <p className="text-xs text-gray-400 leading-relaxed">
              Bahamas premier exotic and luxury car rental service. Offering high-performance convertibles, premium sedans, and 7-passenger island SUVs.
            </p>

            {/* Newsletter Subscription Box */}
            <div className="pt-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                Subscribe to Island Deals
              </span>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  required
                  placeholder="Enter email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-l-xl text-xs text-white focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-r-xl transition-colors flex items-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center">
                  <Check className="w-3 h-3 mr-1" /> Subscribed successfully!
                </p>
              )}
            </div>
          </div>

          {/* About & Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">About & Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/about-us" className="hover:text-orange-400 transition-colors">About DreamsRent</Link></li>
              <li><Link href="/our-team" className="hover:text-orange-400 transition-colors">Our Leadership Team</Link></li>
              <li><Link href="/rental-grid" className="hover:text-orange-400 transition-colors">Rental Fleet Grid</Link></li>
              <li><Link href="/rental-list" className="hover:text-orange-400 transition-colors">Rental Fleet List</Link></li>
              <li><Link href="/faq" className="hover:text-orange-400 transition-colors">Rental FAQs & Policies</Link></li>
              <li><Link href="/contact-us" className="hover:text-orange-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Locations & Categories */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">Island Hubs & Vehicles</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start"><MapPin className="w-3.5 h-3.5 mr-1.5 text-orange-500 flex-shrink-0 mt-0.5" /> Nassau Airport Terminal (NAS)</li>
              <li className="flex items-start"><MapPin className="w-3.5 h-3.5 mr-1.5 text-orange-500 flex-shrink-0 mt-0.5" /> Paradise Island Marina</li>
              <li className="flex items-start"><MapPin className="w-3.5 h-3.5 mr-1.5 text-orange-500 flex-shrink-0 mt-0.5" /> Cable Beach Resort Strip</li>
              <li className="flex items-start"><MapPin className="w-3.5 h-3.5 mr-1.5 text-orange-500 flex-shrink-0 mt-0.5" /> Freeport Harbour Center</li>
              <li className="flex items-start"><MapPin className="w-3.5 h-3.5 mr-1.5 text-orange-500 flex-shrink-0 mt-0.5" /> Downtown Cruise Port</li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">Customer Concierge</h4>
            <div className="space-y-2 text-xs text-gray-400 mb-6">
              <p className="flex items-center"><Phone className="w-3.5 h-3.5 mr-2 text-orange-500" /> +1 (242) 555-DREAMS</p>
              <p className="flex items-center"><Mail className="w-3.5 h-3.5 mr-2 text-orange-500" /> reservations@dreamsrent.com</p>
              <p className="flex items-center"><Clock className="w-3.5 h-3.5 mr-2 text-orange-500" /> 24 Hours / 7 Days a Week</p>
            </div>

            <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2">Connect With Us</span>
            <div className="flex space-x-2">
              <span className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500 cursor-pointer transition-colors" title="Global Portal">
                <Globe className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500 cursor-pointer transition-colors" title="Social Channels">
                <Share2 className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500 cursor-pointer transition-colors" title="Live WhatsApp Concierge">
                <MessageCircle className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500 cursor-pointer transition-colors" title="Live Dispatch Broadcast">
                <Radio className="w-4 h-4" />
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2026 DreamsRent Bahamas Car Rental. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Rental Agreement</span>
            <span>Security Deposit Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
