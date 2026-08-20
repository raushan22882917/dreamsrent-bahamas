'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Lock, ArrowRight, ShieldAlert } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'vendor' | 'driver' | 'customer')[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAEDF0] shadow-xl max-w-md w-full text-center space-y-6 animate-in fade-in">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 mx-auto flex items-center justify-center shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-black text-[#201F1D]">Access Restricted</h2>
            <p className="text-xs text-[#878A99] mt-1.5 leading-relaxed">
              You must be logged in to view this dashboard. Please sign in with your account credentials.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/login"
              className="w-full py-3.5 bg-[#FFA633] hover:bg-[#e5952e] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all active:scale-[0.99]"
            >
              <span>Sign In to Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
            <h2 className="text-xl font-black text-[#201F1D]">Unauthorized Role</h2>
            <p className="text-xs text-[#878A99] mt-1.5 leading-relaxed">
              Your account does not have permission to view this section.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href={
                user.role === 'admin' ? '/admin' :
                user.role === 'vendor' ? '/vendor/dashboard' :
                user.role === 'driver' ? '/driver/dashboard' : '/dashboard'
              }
              className="w-full py-3.5 bg-[#FFA633] hover:bg-[#e5952e] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all"
            >
              <span>Go to My Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
