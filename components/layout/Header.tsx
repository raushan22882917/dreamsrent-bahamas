'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useRental } from '../../context/RentalContext';
import { UserRole } from '../../types/rental';
import { 
  Heart, 
  Menu, 
  X, 
  ChevronDown, 
  PhoneCall, 
  User, 
  Shield, 
  Briefcase, 
  Navigation, 
  LogOut, 
  Check, 
  Car, 
  Calendar,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { user, login, logout, switchRole, isAuthenticated } = useAuth();
  const { wishlist } = useRental();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Luxury Fleet', href: '/rental-grid' },
    { label: 'About Us', href: '/about-us' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact-us' },
  ];

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#EAEDF0] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. Official Brand Logo */}
          <Link href="/" className="flex items-center group py-2">
            <img 
              src="/images/logo.png" 
              alt="Bahamas Luxury Drive" 
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/logo.svg';
              }}
            />
          </Link>

          {/* 2. Clean, Focused Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3.5 py-2 text-xs lg:text-sm font-bold rounded-xl transition-all duration-200 ${
                    active
                      ? 'text-[#FFA633] bg-orange-50/60'
                      : 'text-[#201F1D] hover:text-[#FFA633] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* 3. Right Action Area */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* VIP Concierge Phone */}
            <a 
              href="tel:+12425550199" 
              className="hidden xl:flex items-center space-x-2 text-xs font-bold text-gray-600 hover:text-[#FFA633] transition-colors py-2 px-3 rounded-xl hover:bg-gray-50"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#FFA633]" />
              <span>+1 (242) 555-0199</span>
            </a>

            {/* Wishlist Link */}
            <Link 
              href="/wishlist" 
              className="relative p-2.5 rounded-xl text-gray-600 hover:text-[#FFA633] hover:bg-gray-50 transition-colors"
              title="Saved Vehicles"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-1.5 right-1.5 w-4 h-4 bg-[#FFA633] text-white rounded-full text-[9px] flex items-center justify-center font-black">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Account / Auth Dropdown */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2.5 py-1.5 pl-2 pr-3 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-[#EAEDF0] transition-all"
                >
                  <img 
                    src={user.avatar || '/images/user_image.jpg'} 
                    alt={user.name} 
                    className="w-7 h-7 rounded-full object-cover border-2 border-[#FFA633]"
                  />
                  <div className="text-left">
                    <span className="text-xs font-bold text-[#201F1D] block leading-none truncate max-w-[110px]">
                      {user.name}
                    </span>
                    <span className="text-[9px] text-[#878A99] font-bold uppercase">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-[#EAEDF0] py-2 z-50 animate-in fade-in duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-[#EAEDF0]">
                      <p className="text-xs font-bold text-[#201F1D] truncate">{user.name}</p>
                      <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                    </div>

                    {/* Role-Specific Portal Link */}
                    <div className="py-1.5 text-xs border-b border-[#EAEDF0]">
                      <Link
                        href={
                          user.role === 'admin' ? '/admin' :
                          user.role === 'vendor' ? '/vendor/dashboard' :
                          user.role === 'driver' ? '/driver/dashboard' : '/my-bookings'
                        }
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-4 py-2 font-bold text-[#FFA633] hover:bg-orange-50/50 transition-colors"
                      >
                        <Shield className="w-4 h-4 text-[#FFA633]" />
                        <span className="capitalize">Go to {user.role} Portal</span>
                      </Link>

                      <Link
                        href="/rental-grid"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Car className="w-4 h-4 text-gray-400" />
                        <span>Browse 24 Supercars</span>
                      </Link>
                    </div>

                    {/* Fast Role Switcher */}
                    <div className="px-3.5 py-2 bg-gray-50/70 border-b border-[#EAEDF0]">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                        Switch Active Role:
                      </p>
                      <div className="grid grid-cols-2 gap-1">
                        {(['admin', 'vendor', 'driver', 'customer'] as UserRole[]).map((r) => (
                          <button
                            key={r}
                            onClick={() => handleRoleSelect(r)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold capitalize flex items-center justify-between transition-colors ${
                              user.role === r 
                                ? 'bg-[#FFA633] text-white shadow-xs' 
                                : 'bg-white text-gray-700 hover:bg-gray-200/80 border border-gray-200'
                            }`}
                          >
                            <span>{r}</span>
                            {user.role === r && <Check className="w-3 h-3" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Logout */}
                    <div className="pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-3.5 py-2 text-xs font-bold text-gray-700 hover:text-[#FFA633] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/rental-grid"
                  className="px-4 py-2.5 bg-[#FFA633] hover:bg-[#e5952e] text-white text-xs font-black rounded-xl shadow-md shadow-orange-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  Book a Car
                </Link>
              </div>
            )}

          </div>

          {/* 4. Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            <Link 
              href="/wishlist" 
              className="relative p-2 text-gray-700"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-1 right-1 w-4 h-4 bg-[#FFA633] text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-800 hover:bg-gray-100"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 5. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#EAEDF0] px-4 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  pathname === link.href
                    ? 'text-[#FFA633] bg-orange-50'
                    : 'text-[#201F1D] hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Auth Area */}
          <div className="pt-4 border-t border-[#EAEDF0] space-y-3">
            {isAuthenticated && user ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-xl">
                  <img src={user.avatar || '/images/user_image.jpg'} alt={user.name} className="w-9 h-9 rounded-full object-cover border-2 border-[#FFA633]" />
                  <div>
                    <p className="text-xs font-bold text-[#201F1D]">{user.name}</p>
                    <p className="text-[10px] text-gray-500 capitalize">Active Role: {user.role}</p>
                  </div>
                </div>

                <Link
                  href={
                    user.role === 'admin' ? '/admin' :
                    user.role === 'vendor' ? '/vendor/dashboard' :
                    user.role === 'driver' ? '/driver/dashboard' : '/my-bookings'
                  }
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 bg-[#FFA633] text-white text-xs font-bold text-center rounded-xl shadow"
                >
                  Go to {user.role.toUpperCase()} Dashboard
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full py-2 bg-gray-100 text-red-600 text-xs font-bold text-center rounded-xl"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 bg-gray-100 text-center font-bold text-xs rounded-xl text-gray-800"
                >
                  Sign In
                </Link>
                <Link
                  href="/rental-grid"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 bg-[#FFA633] text-center font-bold text-xs text-white rounded-xl shadow"
                >
                  Book a Car
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
