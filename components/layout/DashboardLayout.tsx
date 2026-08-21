'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/rental';
import { 
  LayoutDashboard,
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
  ChevronDown,
  LogOut,
  Settings,
  DollarSign,
  Globe,
  Check,
  Shield,
  Briefcase,
  User as UserIcon,
  Navigation
} from 'lucide-react';
import { AuthGuard } from '../auth/AuthGuard';

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
  allowedRoles?: ('admin' | 'vendor' | 'driver' | 'customer')[];
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  subtitle,
  breadcrumb = [{ label: 'Home', href: '/' }, { label: title }],
  allowedRoles,
  children
}) => {
  const pathname = usePathname();
  const { user, login, logout, switchRole, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const getSidebarSections = () => {
    if (user?.role === 'vendor') {
      return [
        {
          heading: 'DASHBOARD',
          items: [
            { label: 'Overview', href: '/vendor/dashboard', icon: LayoutDashboard },
            { label: 'My Bookings', href: '/vendor/bookings', icon: Calendar },
          ]
        },
        {
          heading: 'FLEET MANAGEMENT',
          items: [
            { label: 'My Vehicles', href: '/vendor/cars', icon: Car },
            { label: 'Fleet Inventory', href: '/rental-grid', icon: Tag },
          ]
        },
        {
          heading: 'FINANCE & ACCOUNT',
          items: [
            { label: 'Earnings & Payouts', href: '/vendor/payments', icon: DollarSign },
            { label: 'Vendor Profile', href: '/vendor/settings', icon: Settings },
          ]
        }
      ];
    }

    if (user?.role === 'driver') {
      return [
        {
          heading: 'DISPATCH',
          items: [
            { label: 'Trips & Schedule', href: '/driver/dashboard', icon: Navigation },
            { label: 'Fleet Hub', href: '/rental-grid', icon: MapPin },
            { label: 'My Profile', href: '/settings', icon: Settings },
          ]
        }
      ];
    }

    // Default Admin & Executive Management
    return [
      {
        heading: 'EXECUTIVE OVERVIEW',
        items: [
          { label: 'Admin Dashboard', href: '/admin', icon: LayoutDashboard },
          { label: 'Reservations & Bookings', href: '/admin/bookings', icon: Calendar },
        ]
      },
      {
        heading: 'FLEET & OPERATIONS',
        items: [
          { label: 'Manage Vehicles', href: '/admin/cars', icon: Car },
          { label: 'Driver Dispatch', href: '/driver/dashboard', icon: UserCheck },
          { label: 'Public Fleet Catalog', href: '/rental-grid', icon: MapPin },
        ]
      },
      {
        heading: 'FINANCE & SETTINGS',
        items: [
          { label: 'Payments & Revenue', href: '/payments', icon: DollarSign },
          { label: 'System Settings', href: '/settings', icon: Settings },
        ]
      }
    ];
  };

  const sidebarSections = getSidebarSections();

  const handleQuickRoleSwitch = (role: UserRole) => {
    switchRole(role);
    setRoleDropdownOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      
      {/* Sleek Dashboard Top Navbar */}
      <header className="bg-white border-b border-[#EAEDF0] sticky top-0 z-40 px-4 sm:px-6 h-16 flex items-center justify-between shadow-xs">
        
        {/* Left: Logo & Sidebar Toggle */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <img 
              src="/images/logo.png" 
              alt="Bahamas Luxury Drive" 
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
            className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Center Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/rental-grid"
            className="px-3.5 py-1.5 bg-[#1B1B1B] hover:bg-black text-white text-xs font-bold rounded-lg shadow-sm flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Reservation</span>
          </Link>

          <Link
            href="/"
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Live Site</span>
          </Link>
        </div>

        {/* Right: Quick Role Switcher & User Profile */}
        <div className="flex items-center space-x-3">
          
          {/* Quick Role Switcher Badge */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 border border-orange-200 text-[#FFA633] text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="capitalize">{user?.role || 'Switch Role'}</span>
              <ChevronDown className="w-3 h-3 ml-0.5" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#EAEDF0] py-2 z-50 animate-in fade-in">
                <p className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Switch Active Role:
                </p>
                {(['admin', 'vendor', 'driver', 'customer'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleQuickRoleSwitch(r)}
                    className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold capitalize transition-colors ${
                      user?.role === r 
                        ? 'bg-orange-50 text-[#FFA633] font-bold' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      {r === 'admin' && <Shield className="w-3.5 h-3.5 text-[#FFA633]" />}
                      {r === 'vendor' && <Briefcase className="w-3.5 h-3.5 text-blue-500" />}
                      {r === 'driver' && <Navigation className="w-3.5 h-3.5 text-emerald-500" />}
                      {r === 'customer' && <UserIcon className="w-3.5 h-3.5 text-purple-500" />}
                      <span>{r}</span>
                    </span>
                    {user?.role === r && <Check className="w-3.5 h-3.5 text-[#FFA633]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 p-1 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <img 
                  src={user.avatar || '/images/user_image.jpg'} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#FFA633]"
                />
                <div className="hidden sm:block text-left">
                  <span className="text-xs font-bold text-[#201F1D] block leading-none">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-[#878A99] font-semibold uppercase">
                    {user.role}
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:block" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#EAEDF0] py-2 z-50 animate-in fade-in">
                  <div className="px-4 py-2 border-b border-[#EAEDF0]">
                    <p className="text-xs font-bold text-[#201F1D] truncate">{user.name}</p>
                    <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      <Shield className="w-4 h-4 text-[#FFA633]" />
                      <span>Admin Overview</span>
                    </Link>

                    <Link
                      href="/admin/cars"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      <Car className="w-4 h-4 text-gray-400" />
                      <span>Manage Fleet</span>
                    </Link>

                    <Link
                      href="/admin/bookings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Live Reservations</span>
                    </Link>

                    <Link
                      href="/settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                      <span>Settings</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-[#EAEDF0]">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-[#FFA633] hover:bg-[#e5952e] text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
            >
              Sign In
            </Link>
          )}

        </div>

      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex">
        
        {/* Desktop Sidebar */}
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

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full">
          
          {/* Breadcrumbs & Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-black text-[#201F1D] tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-xs text-[#878A99] mt-0.5">{subtitle}</p>
            )}
            <div className="flex items-center space-x-2 text-xs text-[#878A99] mt-1.5">
              {breadcrumb.map((b, i) => (
                <React.Fragment key={b.label}>
                  {i > 0 && <ChevronRight className="w-3 h-3 text-gray-400" />}
                  {b.href ? (
                    <Link href={b.href} className="hover:text-[#FFA633] transition-colors font-medium">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="font-bold text-gray-700">{b.label}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Children Slot (Protected by AuthGuard) */}
          <AuthGuard allowedRoles={allowedRoles}>
            {children}
          </AuthGuard>

        </main>

      </div>

    </div>
  );
};
