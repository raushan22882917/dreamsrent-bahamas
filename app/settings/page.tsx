'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, MapPin, ShieldCheck, Check, Save } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || 'John Renter',
    email: user?.email || 'customer@demo.com',
    phone: user?.phone || '+1 (242) 555-0182',
    address: user?.address || '14 Bay Street, Nassau, Bahamas',
    driverLicenseNumber: 'DL-BAH-9920148',
    licenseExpiry: '2028-12-31'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 mb-1">
            <Link href="/dashboard" className="hover:text-orange-600">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-900">Profile Settings</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900">Account & Driver Profile</h1>
          <p className="text-sm text-gray-500">Update contact information, emergency contacts, and driver license details.</p>
        </div>

        {savedSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-2xl flex items-center">
            <Check className="w-4 h-4 mr-2" /> Profile information updated successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          
          <div className="flex items-center space-x-4 pb-6 border-b border-gray-100">
            <img 
              src={user?.avatar || '/images/team/team_business_head_1787225318994.jpg'} 
              alt={user?.name || 'User'}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-500 shadow-md"
            />
            <div>
              <h3 className="font-bold text-gray-900 text-base">{formData.name}</h3>
              <p className="text-xs text-gray-400">{formData.email}</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded-full uppercase">
                {user?.role || 'Customer'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            <div className="space-y-1">
              <label className="font-bold text-gray-700 uppercase">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 uppercase">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 uppercase">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 uppercase">Driver's License #</label>
              <input
                type="text"
                value={formData.driverLicenseNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, driverLicenseNumber: e.target.value }))}
                className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-gray-700 uppercase">Residential / Delivery Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/25 flex items-center space-x-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
