'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/rental';
import { Car, Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('vendor11@dreamsrent.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('admin')) {
      login('admin', email);
      router.push('/admin');
    } else if (email.includes('vendor')) {
      login('vendor', email);
      router.push('/vendor/dashboard');
    } else if (email.includes('driver')) {
      login('driver', email);
      router.push('/driver/dashboard');
    } else {
      login('customer', email);
      router.push('/dashboard');
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    login(role);
    if (role === 'admin') {
      router.push('/admin');
    } else if (role === 'vendor') {
      router.push('/vendor/dashboard');
    } else if (role === 'driver') {
      router.push('/driver/dashboard');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        
        {/* Top Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <img src="/images/logo.svg" alt="DreamsRent" className="h-12 w-auto mx-auto" />
          </Link>
          <h1 className="text-2xl font-black text-[#201F1D]">Sign In to DreamsRent</h1>
          <p className="text-xs text-[#878A99]">Select a role or login to access your dashboard</p>
        </div>

        {/* 1-Click Role Switcher for Demo */}
        <div className="bg-white border border-[#EAEDF0] rounded-2xl p-5 shadow-sm space-y-3">
          <span className="text-[11px] font-bold text-[#FFA633] uppercase block text-center tracking-wider">
            ⚡ Quick 1-Click Demo Login by Role
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickLogin('admin')}
              className="p-2.5 bg-gray-50 hover:bg-[#FFA633] hover:text-white text-[#201F1D] text-xs font-bold rounded-xl border border-[#EAEDF0] transition-all flex items-center justify-center space-x-1.5"
            >
              <span>👑 Administrator</span>
            </button>
            <button
              onClick={() => handleQuickLogin('vendor')}
              className="p-2.5 bg-gray-50 hover:bg-[#FFA633] hover:text-white text-[#201F1D] text-xs font-bold rounded-xl border border-[#EAEDF0] transition-all flex items-center justify-center space-x-1.5"
            >
              <span>🏢 Vendor / Host</span>
            </button>
            <button
              onClick={() => handleQuickLogin('driver')}
              className="p-2.5 bg-gray-50 hover:bg-[#FFA633] hover:text-white text-[#201F1D] text-xs font-bold rounded-xl border border-[#EAEDF0] transition-all flex items-center justify-center space-x-1.5"
            >
              <span>🚗 Driver / Dispatch</span>
            </button>
            <button
              onClick={() => handleQuickLogin('customer')}
              className="p-2.5 bg-gray-50 hover:bg-[#FFA633] hover:text-white text-[#201F1D] text-xs font-bold rounded-xl border border-[#EAEDF0] transition-all flex items-center justify-center space-x-1.5"
            >
              <span>👤 Customer / Renter</span>
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-8 border border-[#EAEDF0] shadow-sm space-y-6">
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-[#EAEDF0] rounded-xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFA633]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-[#EAEDF0] rounded-xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFA633]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#FFA633] hover:bg-[#e5952e] text-white font-bold rounded-xl shadow transition-all flex items-center justify-center space-x-2 text-xs"
            >
              <span>Sign In to Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
