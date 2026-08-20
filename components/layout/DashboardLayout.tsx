'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { 
  Clock, 
  Calendar, 
  CalendarDays, 
  Users, 
  UserCheck, 
  MapPin, 
  Car, 
  Tag, 
  Sliders, 
  Palette, 
  Armchair, 
  Cog, 
  DoorClosed, 
  Sparkles, 
  ShieldCheck,
  Plus,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Settings,
  DollarSign,
  FileText
} from 'lucide-react';

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  subtitle,
  breadcrumb = [{ label: 'Home', href: '/' }, { label: title }],
  children
}) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const sidebarSections = [
    {
      heading: 'BOOKINGS',
      items: [
        { label: 'Reservations', href: '/admin/bookings', icon: Clock },
        { label: 'Bookings', href: user?.role === 'vendor' ? '/vendor/dashboard' : '/admin/bookings', icon: Calendar },
        { label: 'Calendar', href: '/admin', icon: CalendarDays },
      ]
    },
    {
      heading: 'MANAGEMENT',
      items: [
        { label: 'Customers', href: '/admin', icon: Users },
        { label: 'Drivers', href: '/driver/dashboard', icon: UserCheck },
        { label: 'Locations', href: '/rental-grid', icon: MapPin },
      ]
    },
    {
      heading: 'RENTALS',
      items: [
        { label: 'Rental Fleet', href: user?.role === 'vendor' ? '/vendor/cars' : '/admin/cars', icon: Car },
        { label: 'Brands', href: '/rental-grid', icon: Tag },
        { label: 'Models', href: '/rental-grid', icon: Sliders },
        { label: 'Colors', href: '/rental-grid', icon: Palette },
        { label: 'Seats', href: '/rental-grid', icon: Armchair },
        { label: 'Cylinders', href: '/rental-grid', icon: Cog },
        { label: 'Doors', href: '/rental-grid', icon: DoorClosed },
        { label: 'Features', href: '/rental-grid', icon: Sparkles },
        { label: 'Safety Features', href: '/rental-grid', icon: ShieldCheck },
      ]
    },
    {
      heading: 'FINANCE & SETTINGS',
      items: [
        { label: 'Earnings / Payments', href: user?.role === 'vendor' ? '/vendor/payments' : '/payments', icon: DollarSign },
        { label: 'Account Settings', href: user?.role === 'vendor' ? '/vendor/settings' : '/settings', icon: Settings },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      
      {/* Top Bar (Exact Match to Screenshot) */}
      <header className="bg-white border-b border-[#EAEDF0] sticky top-0 z-40 px-4 sm:px-6 h-16 flex items-center justify-between shadow-sm">
        
        {/* Left: Logo & Sidebar Toggle */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <img 
              src="/images/logo.png" 
              alt="DreamsRent" 
              className="h-8 sm:h-9 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/logo.svg';
              }}
            />
          </Link>
          
          <button 
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
              setMobileSidebarOpen(!mobileSidebarOpen);
            }}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Center/Left: + New Reservation Button */}
        <div className="hidden sm:flex items-center space-x-3">
          <Link
            href="/rental-grid"
            className="px-4 py-2 bg-[#1B1B1B] hover:bg-black text-white text-xs font-bold rounded-lg shadow-sm flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Reservation</span>
          </Link>
        </div>

        {/* Right: User Avatar & Name */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2.5">
            <img 
              src={user?.avatar || '/images/user_image.jpg'} 
              alt={user?.name} 
              className="w-9 h-9 rounded-full object-cover border-2 border-[#FFA633]"
            />
            <div className="hidden md:block text-left">
              <span className="text-xs font-bold text-[#201F1D] block leading-none">
                {user?.name || 'Admin Administrator'}
              </span>
              <span className="text-[10px] text-[#878A99] font-semibold uppercase">
                {user?.role || 'Admin'}
              </span>
            </div>
          </div>
        </div>

      </header>

      {/* Main Container */}
      <div className="flex-1 flex">
        
        {/* Desktop Sidebar (Exact match to categories in screenshot) */}
        <aside 
          className={`bg-white border-r border-[#EAEDF0] flex-shrink-0 transition-all duration-300 ${
            sidebarOpen ? 'w-64' : 'w-0 overflow-hidden border-none'
          } hidden lg:block`}
        >
          <div className="py-6 px-4 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
            {sidebarSections.map((sec) => (
              <div key={sec.heading} className="space-y-1">
                <p className="px-3 text-[10px] font-bold text-[#878A99] tracking-wider uppercase mb-2">
                  {sec.heading}
                </p>
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        active 
                          ? 'bg-[#FFA633]/15 text-[#FFA633] font-bold' 
                          : 'text-[#4E5564] hover:text-[#201F1D] hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-[#FFA633]' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}

            <div className="pt-4 border-t border-[#EAEDF0]">
              <button
                onClick={() => logout()}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            ></div>
            <div className="relative w-64 max-w-[80vw] bg-white h-full shadow-2xl p-4 overflow-y-auto space-y-6 z-10">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="font-black text-sm text-[#201F1D]">Dashboard Menu</span>
                <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {sidebarSections.map((sec) => (
                <div key={sec.heading} className="space-y-1">
                  <p className="text-[10px] font-bold text-[#878A99] tracking-wider uppercase mb-1">
                    {sec.heading}
                  </p>
                  {sec.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#4E5564] hover:bg-gray-50"
                    >
                      <item.icon className="w-4 h-4 text-gray-400" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content View */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl">
          
          {/* Breadcrumbs & Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-black text-[#201F1D] tracking-tight">{title}</h1>
            <div className="flex items-center space-x-2 text-xs text-[#878A99] mt-1">
              {breadcrumb.map((b, i) => (
                <React.Fragment key={b.label}>
                  {i > 0 && <ChevronRight className="w-3 h-3 text-gray-400" />}
                  {b.href ? (
                    <Link href={b.href} className="hover:text-[#FFA633] transition-colors">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-gray-700">{b.label}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Children Slot */}
          {children}

        </main>

      </div>

    </div>
  );
};
