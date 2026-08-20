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
  Bell,
  Check
} from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { user, login, logout, isAuthenticated } = useAuth();
  const { wishlist } = useRental();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [rentalsDropdownOpen, setRentalsDropdownOpen] = useState(false);
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);

  const handleRoleChange = (newRole: UserRole) => {
    login(newRole);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm transition-all border-b border-[#EAEDF0]">
      
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with official logo.png */}
          <Link href="/" className="flex items-center group">
            <img 
              src="/images/logo.png" 
              alt="Dreams Rent" 
              className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-102"
              onError={(e) => {
                // Fallback to SVG if PNG is missing
                (e.target as HTMLImageElement).src = '/images/logo.svg';
              }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-2">
            
            {/* Home Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setHomeDropdownOpen(true)}
              onMouseLeave={() => setHomeDropdownOpen(false)}
            >
              <Link 
                href="/"
                className={`flex items-center px-3.5 py-2 text-sm font-semibold transition-colors ${
                  pathname === '/' ? 'text-[#FFA633]' : 'text-[#201F1D] hover:text-[#FFA633]'
                }`}
              >
                Home <ChevronDown className="w-3.5 h-3.5 ml-1 text-gray-400" />
              </Link>

              {homeDropdownOpen && (
                <div className="absolute top-full left-0 w-44 bg-white rounded-xl shadow-xl border border-[#EAEDF0] py-2 z-50 animate-in fade-in duration-150">
                  <Link 
                    href="/" 
                    className="flex items-center px-4 py-2 text-xs font-semibold text-[#FFA633] bg-orange-50/50"
                    onClick={() => setHomeDropdownOpen(false)}
                  >
                    Home 01
                  </Link>
                  <Link 
                    href="/rental-grid" 
                    className="flex items-center px-4 py-2 text-xs font-semibold text-[#201F1D] hover:text-[#FFA633] hover:bg-gray-50"
                    onClick={() => setHomeDropdownOpen(false)}
                  >
                    Home 02 (Fleet)
                  </Link>
                </div>
              )}
            </div>

            {/* Rentals Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setRentalsDropdownOpen(true)}
              onMouseLeave={() => setRentalsDropdownOpen(false)}
            >
              <button 
                className={`flex items-center px-3.5 py-2 text-sm font-semibold transition-colors ${
                  ['/rental-grid', '/rental-list'].includes(pathname) ? 'text-[#FFA633]' : 'text-[#201F1D] hover:text-[#FFA633]'
                }`}
              >
                Rental <ChevronDown className="w-3.5 h-3.5 ml-1 text-gray-400" />
              </button>

              {rentalsDropdownOpen && (
                <div className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-xl border border-[#EAEDF0] py-2 z-50 animate-in fade-in duration-150">
                  <Link 
                    href="/rental-grid" 
                    className="flex items-center px-4 py-2 text-xs font-semibold text-[#201F1D] hover:text-[#FFA633] hover:bg-gray-50"
                    onClick={() => setRentalsDropdownOpen(false)}
                  >
                    Rental Grid
                  </Link>
                  <Link 
                    href="/rental-list" 
                    className="flex items-center px-4 py-2 text-xs font-semibold text-[#201F1D] hover:text-[#FFA633] hover:bg-gray-50"
                    onClick={() => setRentalsDropdownOpen(false)}
                  >
                    Rental List
                  </Link>
                </div>
              )}
            </div>

            {/* Pages Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setPagesDropdownOpen(true)}
              onMouseLeave={() => setPagesDropdownOpen(false)}
            >
              <button 
                className={`flex items-center px-3.5 py-2 text-sm font-semibold transition-colors ${
                  ['/about-us', '/our-team', '/faq'].includes(pathname) ? 'text-[#FFA633]' : 'text-[#201F1D] hover:text-[#FFA633]'
                }`}
              >
                Pages <ChevronDown className="w-3.5 h-3.5 ml-1 text-gray-400" />
              </button>

              {pagesDropdownOpen && (
                <div className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-xl border border-[#EAEDF0] py-2 z-50 animate-in fade-in duration-150">
                  <Link 
                    href="/about-us" 
                    className="flex items-center px-4 py-2 text-xs font-semibold text-[#201F1D] hover:text-[#FFA633] hover:bg-gray-50"
                    onClick={() => setPagesDropdownOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link 
                    href="/our-team" 
                    className="flex items-center px-4 py-2 text-xs font-semibold text-[#201F1D] hover:text-[#FFA633] hover:bg-gray-50"
                    onClick={() => setPagesDropdownOpen(false)}
                  >
                    Our Team
                  </Link>
                  <Link 
                    href="/faq" 
                    className="flex items-center px-4 py-2 text-xs font-semibold text-[#201F1D] hover:text-[#FFA633] hover:bg-gray-50"
                    onClick={() => setPagesDropdownOpen(false)}
                  >
                    FAQ
                  </Link>
                </div>
              )}
            </div>

            {/* Blog Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setBlogDropdownOpen(true)}
              onMouseLeave={() => setBlogDropdownOpen(false)}
            >
              <button 
                className="flex items-center px-3.5 py-2 text-sm font-semibold text-[#201F1D] hover:text-[#FFA633] transition-colors"
              >
                Blog <ChevronDown className="w-3.5 h-3.5 ml-1 text-gray-400" />
              </button>

              {blogDropdownOpen && (
                <div className="absolute top-full left-0 w-44 bg-white rounded-xl shadow-xl border border-[#EAEDF0] py-2 z-50 animate-in fade-in duration-150">
                  <Link 
                    href="/faq" 
                    className="flex items-center px-4 py-2 text-xs font-semibold text-[#201F1D] hover:text-[#FFA633] hover:bg-gray-50"
                    onClick={() => setBlogDropdownOpen(false)}
                  >
                    Blog List
                  </Link>
                  <Link 
                    href="/faq" 
                    className="flex items-center px-4 py-2 text-xs font-semibold text-[#201F1D] hover:text-[#FFA633] hover:bg-gray-50"
                    onClick={() => setBlogDropdownOpen(false)}
                  >
                    Blog Grid
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/contact-us" 
              className={`px-3.5 py-2 text-sm font-semibold transition-colors ${
                pathname === '/contact-us' ? 'text-[#FFA633]' : 'text-[#201F1D] hover:text-[#FFA633]'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right User & Notifications Bar */}
          <div className="hidden lg:flex items-center space-x-3.5">
            
            {/* Notification Bell */}
            <button className="w-9 h-9 rounded-full bg-[#F5F6F8] hover:bg-gray-200/70 flex items-center justify-center text-gray-700 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FFA633] rounded-full"></span>
            </button>

            {/* Wishlist Link */}
            <Link 
              href="/wishlist" 
              className="relative p-2 text-gray-600 hover:text-[#FFA633] transition-colors"
              title="Saved Vehicles"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFA633] text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Dropdown (Matches Screenshot with round avatar + Vendor Demo ˇ) */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2.5 p-1 pl-1.5 pr-2.5 hover:bg-gray-50 rounded-full transition-all"
                >
                  <img 
                    src={user.avatar || '/images/user_image.jpg'} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full object-cover border border-[#FFA633]"
                  />
                  <span className="text-xs font-bold text-[#201F1D]">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#EAEDF0] py-3 z-50 animate-in fade-in duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-[#EAEDF0]">
                      <p className="text-xs font-bold text-[#201F1D] truncate">{user.name}</p>
                      <p className="text-[11px] text-[#878A99] truncate">{user.email}</p>
                      <span className="inline-block mt-1.5 px-2 py-0.5 bg-[#FFA633]/15 text-[#FFA633] text-[10px] font-bold rounded-md uppercase">
                        Role: {user.role}
                      </span>
                    </div>

                    {/* Role Specific Links */}
                    <div className="py-2 text-xs border-b border-[#EAEDF0]">
                      {user.role === 'vendor' && (
                        <>
                          <Link href="/vendor/dashboard" className="flex items-center px-4 py-2 font-medium text-gray-700 hover:text-[#FFA633] hover:bg-gray-50" onClick={() => setUserDropdownOpen(false)}>
                            Dashboard
                          </Link>
                          <Link href="/vendor/cars" className="flex items-center px-4 py-2 font-medium text-gray-700 hover:text-[#FFA633] hover:bg-gray-50" onClick={() => setUserDropdownOpen(false)}>
                            Cars
                          </Link>
                          <Link href="/vendor/payments" className="flex items-center px-4 py-2 font-medium text-gray-700 hover:text-[#FFA633] hover:bg-gray-50" onClick={() => setUserDropdownOpen(false)}>
                            Payments
                          </Link>
                          <Link href="/vendor/settings" className="flex items-center px-4 py-2 font-medium text-gray-700 hover:text-[#FFA633] hover:bg-gray-50" onClick={() => setUserDropdownOpen(false)}>
                            Settings
                          </Link>
                        </>
                      )}

                      {user.role === 'admin' && (
                        <>
                          <Link href="/admin" className="flex items-center px-4 py-2 font-medium text-gray-700 hover:text-[#FFA633] hover:bg-gray-50" onClick={() => setUserDropdownOpen(false)}>
                            Admin Overview
                          </Link>
                          <Link href="/admin/cars" className="flex items-center px-4 py-2 font-medium text-gray-700 hover:text-[#FFA633] hover:bg-gray-50" onClick={() => setUserDropdownOpen(false)}>
                            All Fleet Vehicles
                          </Link>
                          <Link href="/admin/bookings" className="flex items-center px-4 py-2 font-medium text-gray-700 hover:text-[#FFA633] hover:bg-gray-50" onClick={() => setUserDropdownOpen(false)}>
                            All Bookings
                          </Link>
                        </>
                      )}

                      {user.role === 'driver' && (
                        <Link href="/driver/dashboard" className="flex items-center px-4 py-2 font-medium text-gray-700 hover:text-[#FFA633] hover:bg-gray-50" onClick={() => setUserDropdownOpen(false)}>
                          Driver Dispatch Trips
                        </Link>
                      )}

                      {user.role === 'customer' && (
                        <>
                          <Link href="/dashboard" className="flex items-center px-4 py-2 font-medium text-gray-700 hover:text-[#FFA633] hover:bg-gray-50" onClick={() => setUserDropdownOpen(false)}>
                            Customer Dashboard
                          </Link>
                          <Link href="/my-bookings" className="flex items-center px-4 py-2 font-medium text-gray-700 hover:text-[#FFA633] hover:bg-gray-50" onClick={() => setUserDropdownOpen(false)}>
                            My Bookings
                          </Link>
                          <Link href="/payments" className="flex items-center px-4 py-2 font-medium text-gray-700 hover:text-[#FFA633] hover:bg-gray-50" onClick={() => setUserDropdownOpen(false)}>
                            Invoices
                          </Link>
                        </>
                      )}
                    </div>

                    {/* 1-Click Role Switcher */}
                    <div className="px-4 py-2 bg-gray-50 text-[11px] border-b border-[#EAEDF0]">
                      <p className="font-bold text-gray-500 mb-1.5 uppercase text-[9px] tracking-wider">Switch Demo Role:</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {(['admin', 'vendor', 'driver', 'customer'] as UserRole[]).map((r) => (
                          <button
                            key={r}
                            onClick={() => handleRoleChange(r)}
                            className={`px-2 py-1 rounded-md text-left font-bold capitalize text-[10px] flex items-center justify-between ${
                              user.role === r ? 'bg-[#FFA633] text-white' : 'bg-white text-gray-700 hover:bg-gray-200/70 border border-gray-200'
                            }`}
                          >
                            <span>{r}</span>
                            {user.role === r && <Check className="w-3 h-3 ml-1" />}
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
                        className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <span>Logout Account</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/login"
                  className="px-4 py-2 text-xs font-bold text-[#201F1D] hover:text-[#FFA633] transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register"
                  className="px-4 py-2 bg-[#FFA633] hover:bg-[#e5952e] text-white text-xs font-bold rounded-xl shadow transition-all"
                >
                  Register
                </Link>
              </div>
            )}

          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EAEDF0] px-4 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <Link href="/" className="block py-2 text-sm font-bold text-[#201F1D]" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="/rental-grid" className="block py-2 text-sm font-bold text-[#201F1D]" onClick={() => setMobileMenuOpen(false)}>
            Rentals
          </Link>
          <Link href="/about-us" className="block py-2 text-sm font-bold text-[#201F1D]" onClick={() => setMobileMenuOpen(false)}>
            About Us
          </Link>
          <Link href="/contact-us" className="block py-2 text-sm font-bold text-[#201F1D]" onClick={() => setMobileMenuOpen(false)}>
            Contact Us
          </Link>
          {user && (
            <div className="pt-4 border-t border-[#EAEDF0]">
              <p className="text-xs font-bold text-gray-400 mb-2">Logged in as {user.name} ({user.role})</p>
              <div className="grid grid-cols-2 gap-2">
                {(['admin', 'vendor', 'driver', 'customer'] as UserRole[]).map(r => (
                  <button
                    key={r}
                    onClick={() => {
                      login(r);
                      setMobileMenuOpen(false);
                    }}
                    className="p-2 bg-gray-100 rounded-lg text-xs font-bold capitalize text-gray-800"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

    </header>
  );
};
