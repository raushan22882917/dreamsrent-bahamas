'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/rental';
import { 
  Lock, 
  ShieldAlert, 
  ArrowRight, 
  Shield, 
  Briefcase, 
  Navigation, 
  User as UserIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'vendor' | 'driver' | 'customer')[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const router = useRouter();
  const { user, login, loginWithCredentials, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const ok = await loginWithCredentials(email, password);
      if (!ok) {
        setError('Invalid credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    login(role);
  };

  // If NOT authenticated, show a gorgeous Sign In / Quick Demo Access Box
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAEDF0] shadow-xl max-w-lg w-full space-y-6 animate-in fade-in">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FFA633] mx-auto flex items-center justify-center shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black text-[#201F1D]">Sign In to Access Dashboard</h2>
            <p className="text-xs text-[#878A99]">
              Choose a role for instant 1-click access or enter your account credentials.
            </p>
          </div>

          {/* Quick 1-Click Role Login Buttons */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">
              Fast 1-Click Demo Login
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="p-3 rounded-2xl bg-orange-50 hover:bg-orange-100 border border-orange-200 text-left transition-all active:scale-[0.98] flex items-center space-x-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-[#FFA633] text-white flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#201F1D] leading-tight">Admin</p>
                  <p className="text-[9px] text-gray-500">Full Fleet Control</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('vendor')}
                className="p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-left transition-all active:scale-[0.98] flex items-center space-x-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#201F1D] leading-tight">Vendor / Host</p>
                  <p className="text-[9px] text-gray-500">Fleet & Bookings</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('driver')}
                className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-left transition-all active:scale-[0.98] flex items-center space-x-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#201F1D] leading-tight">Driver</p>
                  <p className="text-[9px] text-gray-500">Trips & Schedule</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('customer')}
                className="p-3 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-left transition-all active:scale-[0.98] flex items-center space-x-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-500 text-white flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#201F1D] leading-tight">Customer</p>
                  <p className="text-[9px] text-gray-500">My Rentals</p>
                </div>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#EAEDF0] w-full"></div>
            <span className="bg-white px-3 text-[10px] uppercase font-bold text-gray-400 absolute">or sign in with password</span>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleManualLogin} className="space-y-3 text-xs">
            {error && (
              <div className="p-2.5 bg-red-50 text-red-600 text-xs font-semibold rounded-xl flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <input
                type="email"
                placeholder="Email (e.g. admin@dreamsrent.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#EAEDF0] rounded-xl font-medium focus:ring-2 focus:ring-[#FFA633] focus:outline-none"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password (e.g. adminpassword123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#EAEDF0] rounded-xl font-medium focus:ring-2 focus:ring-[#FFA633] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#FFA633] hover:bg-[#e5952e] text-white font-bold rounded-xl shadow-sm flex items-center justify-center space-x-2 transition-all active:scale-[0.99]"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In with Credentials'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    );
  }

  // If role not authorized for this specific page
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAEDF0] shadow-xl max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-black text-[#201F1D]">Unauthorized Role</h2>
            <p className="text-xs text-[#878A99] mt-1.5 leading-relaxed">
              Your account currently has the <span className="font-bold text-[#FFA633] capitalize">{user.role}</span> role. This section requires <span className="font-bold text-gray-900">{allowedRoles.join(', ')}</span> permissions.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => login('admin')}
              className="w-full py-3 bg-[#FFA633] hover:bg-[#e5952e] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all"
            >
              <span>Switch to Admin Role</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href={
                user.role === 'admin' ? '/admin' :
                user.role === 'vendor' ? '/vendor/dashboard' :
                user.role === 'driver' ? '/driver/dashboard' : '/dashboard'
              }
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl flex items-center justify-center transition-all block"
            >
              Go to My {user.role.toUpperCase()} Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
