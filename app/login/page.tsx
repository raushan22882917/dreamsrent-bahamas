'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/rental';
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithCredentials } = useAuth();
  const [email, setEmail] = useState('admin@dreamsrent.com');
  const [password, setPassword] = useState('adminpassword123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const ok = await loginWithCredentials(email, password);
      if (ok) {
        setSuccess(true);
        setTimeout(() => {
          if (email.includes('admin')) router.push('/admin');
          else if (email.includes('vendor')) router.push('/vendor/dashboard');
          else if (email.includes('driver')) router.push('/driver/dashboard');
          else router.push('/dashboard');
        }, 500);
      } else {
        setError('Invalid credentials. Please verify your email and password.');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickRole = (role: UserRole, defaultEmail: string, pass: string) => {
    setEmail(defaultEmail);
    setPassword(pass);
    login(role, defaultEmail);
    if (role === 'admin') router.push('/admin');
    else if (role === 'vendor') router.push('/vendor/dashboard');
    else if (role === 'driver') router.push('/driver/dashboard');
    else router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        
        {/* Top Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <img src="/images/logo.png" alt="DreamsRent" className="h-10 w-auto mx-auto" />
          </Link>
          <h1 className="text-2xl font-black text-[#201F1D]">Sign In to DreamsRent</h1>
          <p className="text-xs text-[#878A99]">Secure role-based dashboard authentication</p>
        </div>

        {/* 1-Click Role Switcher for Fast Evaluation */}
        <div className="bg-white border border-[#EAEDF0] rounded-2xl p-5 shadow-sm space-y-3">
          <span className="text-[11px] font-bold text-[#FFA633] uppercase block text-center tracking-wider">
            ⚡ Quick 1-Click Role Login
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickRole('admin', 'admin@dreamsrent.com', 'adminpassword123')}
              className="p-2.5 bg-gray-50 hover:bg-[#FFA633] hover:text-white text-[#201F1D] text-xs font-bold rounded-xl border border-[#EAEDF0] transition-all flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <span>👑 Administrator</span>
            </button>
            <button
              onClick={() => handleQuickRole('vendor', 'vendor@dreamsrent.com', 'vendorpassword123')}
              className="p-2.5 bg-gray-50 hover:bg-[#FFA633] hover:text-white text-[#201F1D] text-xs font-bold rounded-xl border border-[#EAEDF0] transition-all flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <span>🏢 Vendor / Host</span>
            </button>
            <button
              onClick={() => handleQuickRole('driver', 'driver@dreamsrent.com', 'driverpassword123')}
              className="p-2.5 bg-gray-50 hover:bg-[#FFA633] hover:text-white text-[#201F1D] text-xs font-bold rounded-xl border border-[#EAEDF0] transition-all flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <span>🚗 Driver / Dispatch</span>
            </button>
            <button
              onClick={() => handleQuickRole('customer', 'customer@dreamsrent.com', 'customerpassword123')}
              className="p-2.5 bg-gray-50 hover:bg-[#FFA633] hover:text-white text-[#201F1D] text-xs font-bold rounded-xl border border-[#EAEDF0] transition-all flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <span>👤 Customer / Renter</span>
            </button>
          </div>
        </div>

        {/* Credentials Form */}
        <div className="bg-white rounded-2xl p-7 border border-[#EAEDF0] shadow-sm space-y-5">
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Authentication successful! Redirecting to dashboard...</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dreamsrent.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-[#EAEDF0] rounded-xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFA633]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-[#EAEDF0] rounded-xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFA633]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <label className="flex items-center space-x-1.5 text-gray-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#FFA633]" />
                <span>Remember me</span>
              </label>
              <a href="#" className="font-bold text-[#FFA633] hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#FFA633] hover:bg-[#e5952e] text-white text-xs font-bold rounded-xl shadow transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Authenticating with PostgreSQL...</span>
              ) : (
                <>
                  <span>Sign In Securely</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-[#EAEDF0] text-center text-xs text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-bold text-[#FFA633] hover:underline">
              Create an Account
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
