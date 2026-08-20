'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, Lock, ArrowRight, UserCheck } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'vendor' | 'driver' | 'customer')[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, isAuthenticated, switchRole } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAEDF0] shadow-xl max-w-md w-full text-center space-y-6 animate-in fade-in">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 mx-auto flex items-center justify-center shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-black text-[#201F1D]">Authentication Required</h2>
            <p className="text-xs text-[#878A99] mt-1.5 leading-relaxed">
              This dashboard portal is fully secured with role-based access control. Please log in with your verified credentials.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/login"
              className="w-full py-3 bg-[#FFA633] hover:bg-[#e5952e] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all"
            >
              <span>Sign In to Your Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider my-2">Or Quick Switch Demo Role</div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => switchRole('admin')}
                className="p-2.5 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-[#FFA633] rounded-xl font-bold text-gray-800 text-left transition-all"
              >
                👑 Admin Portal
              </button>
              <button
                onClick={() => switchRole('vendor')}
                className="p-2.5 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-[#FFA633] rounded-xl font-bold text-gray-800 text-left transition-all"
              >
                🏢 Vendor Host
              </button>
              <button
                onClick={() => switchRole('driver')}
                className="p-2.5 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-[#FFA633] rounded-xl font-bold text-gray-800 text-left transition-all"
              >
                🚗 Driver Dispatch
              </button>
              <button
                onClick={() => switchRole('customer')}
                className="p-2.5 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-[#FFA633] rounded-xl font-bold text-gray-800 text-left transition-all"
              >
                👤 Customer Renter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAEDF0] shadow-xl max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-black text-[#201F1D]">Restricted Access Area</h2>
            <p className="text-xs text-[#878A99] mt-1.5 leading-relaxed">
              Your account is logged in as <b className="uppercase text-gray-900">{user.role}</b>. This section requires <b className="uppercase text-[#FFA633]">{allowedRoles.join(' / ')}</b> permissions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href={
                user.role === 'admin' ? '/admin' :
                user.role === 'vendor' ? '/vendor/dashboard' :
                user.role === 'driver' ? '/driver/dashboard' : '/dashboard'
              }
              className="flex-1 py-3 bg-[#FFA633] text-white font-bold text-xs rounded-xl shadow text-center"
            >
              Go to My Dashboard
            </Link>
            <button
              onClick={() => switchRole('admin')}
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl text-center"
            >
              Switch to Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
