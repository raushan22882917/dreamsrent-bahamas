'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  Send, 
  Check, 
  ArrowUp
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121212] text-[#888888] pt-20 pb-8 relative overflow-hidden font-sans">
      
      {/* Decorative theme tyre mark background on left */}
      <img 
        src="/images/footer-left.png" 
        alt="" 
        className="absolute left-0 bottom-0 opacity-15 pointer-events-none max-w-[320px]" 
        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 4 Footer Columns (Exact match to DreamsRent Screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-16">
          
          {/* Column 1: About Company */}
          <div>
            <h4 className="text-lg font-bold text-white mb-2">
              About Company
            </h4>
            <div className="w-8 h-[2px] bg-[#FFA633] mb-6"></div>

            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/about-us" className="hover:text-[#FFA633] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#FFA633] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#FFA633] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#FFA633] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Vehicle Type */}
          <div>
            <h4 className="text-lg font-bold text-white mb-2">
              Vehicle Type
            </h4>
            <div className="w-8 h-[2px] bg-[#FFA633] mb-6"></div>

            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/about-us" className="hover:text-[#FFA633] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#FFA633] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#FFA633] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#FFA633] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-2">
              Quick Links
            </h4>
            <div className="w-8 h-[2px] bg-[#FFA633] mb-6"></div>

            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/contact-us" className="hover:text-[#FFA633] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/rental-grid" className="hover:text-[#FFA633] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#FFA633] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#FFA633] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-2">
              Contact Info
            </h4>
            <div className="w-8 h-[2px] bg-[#FFA633] mb-6"></div>

            {/* Phone */}
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#FFA633] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <a href="tel:+919600158844" className="text-sm font-medium text-[#888888] hover:text-white transition-colors">
                +919600158844
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#FFA633] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <a href="mailto:demo@example.com" className="text-sm font-medium text-[#888888] hover:text-white transition-colors">
                demo@example.com
              </a>
            </div>

            {/* Newsletter Input Box */}
            <div className="pt-2">
              {subscribed ? (
                <div className="p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-xl text-emerald-400 text-xs flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="bg-white rounded-xl p-1.5 flex items-center shadow-md">
                  <Mail className="w-4 h-4 text-gray-400 ml-2.5 flex-shrink-0" />
                  <input
                    type="email"
                    required
                    placeholder="Enter You Email Here"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
                  />
                  <button
                    type="submit"
                    className="w-9 h-9 rounded-lg bg-[#FFA633] hover:bg-[#e5952e] text-white flex items-center justify-center transition-colors flex-shrink-0"
                    title="Submit"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-white block mb-3">
                Connect with us
              </span>
              <div className="flex items-center space-x-2">
                {/* Facebook */}
                <a href="#" className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity">
                  f
                </a>
                {/* Instagram */}
                <a href="#" className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity">
                  📷
                </a>
                {/* Behance */}
                <a href="#" className="w-8 h-8 rounded-full bg-[#1769FF] text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity">
                  Bē
                </a>
                {/* Twitter */}
                <a href="#" className="w-8 h-8 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity">
                  𝕏
                </a>
                {/* LinkedIn */}
                <a href="#" className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity">
                  in
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Centered Copyright and Scroll-to-Top Button */}
        <div className="pt-6 border-t border-gray-900/80 flex items-center justify-between relative">
          <div className="w-full text-center">
            <p className="text-xs text-[#666666]">
              © 2026 Bahamas Luxury Drive. All Rights Reserved.
            </p>
          </div>

          {/* Scroll to Top floating right */}
          <button
            onClick={scrollToTop}
            className="absolute right-0 bottom-0 w-9 h-9 rounded-full border border-[#FFA633]/40 bg-[#FFA633]/10 hover:bg-[#FFA633] text-[#FFA633] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
