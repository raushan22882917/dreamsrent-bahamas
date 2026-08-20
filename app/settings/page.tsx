'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Camera, CheckCircle } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <DashboardLayout
      title="Account Settings"
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Settings' }]}
    >
      <div className="space-y-8 max-w-5xl">
        
        <div className="bg-white rounded-2xl border border-[#EAEDF0] shadow-sm p-6 sm:p-8">
          
          <h2 className="text-lg font-bold text-[#201F1D] mb-6">
            Account Settings
          </h2>

          <div className="border-t border-[#EAEDF0] pt-6">
            <h3 className="text-sm font-bold text-[#201F1D] mb-4">
              Basic Information
            </h3>

            {savedSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-emerald-800 text-xs font-bold animate-in fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Account profile updated successfully!</span>
              </div>
            )}

            {/* Profile Photo */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-gray-700 mb-3">Profile Photo</label>
              <div className="flex items-center space-x-5">
                <img 
                  src={user?.avatar || '/images/user_image.jpg'} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                />
                <div>
                  <button 
                    type="button"
                    className="px-4 py-2 bg-[#1B1B1B] hover:bg-black text-white text-xs font-bold rounded-lg shadow-sm flex items-center space-x-2 transition-colors mb-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change</span>
                  </button>
                  <p className="text-[11px] text-[#878A99]">Recommended size is 500px x 500px</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    defaultValue={user?.name || 'Administrator'}
                    required
                    className="w-full px-4 py-2.5 bg-white border border-[#EAEDF0] rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFA633]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    defaultValue={user?.email || 'admin@dreamsrent.com'}
                    required
                    className="w-full px-4 py-2.5 bg-white border border-[#EAEDF0] rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFA633]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    defaultValue={user?.phone || '+1 (242) 555-0199'}
                    required
                    className="w-full px-4 py-2.5 bg-white border border-[#EAEDF0] rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFA633]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Office / Home Location
                  </label>
                  <input 
                    type="text" 
                    defaultValue={user?.address || 'Nassau Main Office, Bahamas'}
                    className="w-full px-4 py-2.5 bg-white border border-[#EAEDF0] rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFA633]"
                  />
                </div>

              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#FFA633] hover:bg-[#e5952e] text-white font-bold text-xs rounded-xl shadow transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
