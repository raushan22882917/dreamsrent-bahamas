'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Save, User, Building, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

export default function VendorSettingsPage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-2xl font-black text-[#201F1D]">Vendor Profile & Fleet Settings</h1>
          <p className="text-xs text-[#878A99]">Update your commercial rental company information and payout details</p>
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-emerald-800 text-xs font-bold animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Vendor profile changes saved successfully!</span>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-[#EAEDF0] shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Company / Host Name</label>
                <input 
                  type="text" 
                  defaultValue={user?.companyName || 'Island Exotic Cars Ltd'} 
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-[#EAEDF0] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFA633]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Host Contact Person</label>
                <input 
                  type="text" 
                  defaultValue={user?.name || 'Vendor Demo'} 
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-[#EAEDF0] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFA633]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Business Email</label>
                <input 
                  type="email" 
                  defaultValue={user?.email || 'vendor11@dreamsrent.com'} 
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-[#EAEDF0] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFA633]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Hotline Phone</label>
                <input 
                  type="text" 
                  defaultValue={user?.phone || '+1 (242) 555-0155'} 
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-[#EAEDF0] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFA633]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Fleet Depot & Return Address</label>
              <input 
                type="text" 
                defaultValue={user?.address || 'Paradise Island Marina, Nassau, Bahamas'} 
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-[#EAEDF0] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFA633]"
              />
            </div>

            <div className="pt-4 border-t border-[#EAEDF0] flex justify-end">
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-[#FFA633] hover:bg-[#e5952e] text-white font-bold text-xs rounded-xl shadow flex items-center space-x-2 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
