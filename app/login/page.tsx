'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, CornerDownLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithCredentials } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const ok = await loginWithCredentials(username.trim(), password);
      if (ok) {
        setSuccess(true);
        setTimeout(() => {
          const lower = username.toLowerCase();
          if (lower.includes('admin')) {
            router.push('/admin');
          } else if (lower.includes('vendor')) {
            router.push('/vendor/dashboard');
          } else if (lower.includes('driver')) {
            router.push('/driver/dashboard');
          } else {
            router.push('/dashboard');
          }
        }, 500);
      } else {
        setError('Invalid username/email or password. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-12 px-4 flex items-center justify-center">
      <div className="max-w-[480px] w-full">
        
        {/* White Card matching official DreamsRent PHP Template */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#EAEDF0] space-y-6">
          
          {/* Back To Home Button */}
          <div>
            <Link 
              href="/" 
              className="inline-flex items-center space-x-2 text-xs font-bold text-[#201F1D] bg-[#F8F9FA] hover:bg-[#FFA633] hover:text-white px-4 py-2 rounded-full border border-[#EAEDF0] transition-all"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
              <span>Back To Home</span>
            </Link>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-[#201F1D]">Sign In</h1>
            <p className="text-xs text-[#878A99]">We&apos;ll send a confirmation code to your email.</p>
          </div>

          {/* Error / Success Alerts */}
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Login successful! Opening dashboard...</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5 text-xs">
            
            {/* Username / Email */}
            <div>
              <label className="block text-xs font-bold text-[#201F1D] mb-1.5">
                Username / Email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your email or username"
                className="w-full px-4 py-3 bg-white border border-[#EAEDF0] rounded-xl text-xs font-medium text-[#201F1D] focus:outline-none focus:ring-2 focus:ring-[#FFA633] transition-all placeholder:text-gray-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[#201F1D] mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-4 pr-11 py-3 bg-white border border-[#EAEDF0] rounded-xl text-xs font-medium text-[#201F1D] focus:outline-none focus:ring-2 focus:ring-[#FFA633] transition-all placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#FFA633] focus:ring-[#FFA633] border-gray-300"
                />
                <span className="text-xs font-semibold text-[#201F1D]">Remember me</span>
              </label>

              <Link href="/faq" className="text-xs font-bold text-[#FFA633] hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#FFA633] hover:bg-[#e5952e] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Signing In...</span>
              ) : (
                <span>Sign In</span>
              )}
            </button>

            {/* Don't have an account */}
            <div className="text-center pt-2 text-xs text-gray-500">
              Don&apos;t have an account yet?{' '}
              <Link href="/register" className="font-bold text-[#FFA633] hover:underline">
                Register
              </Link>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}
