'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Check } from 'lucide-react';

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 bg-orange-100 text-orange-700 font-bold text-xs rounded-full uppercase tracking-wider">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
            We Are Here To Assist Your Travel
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            Have questions regarding island delivery, long-term rentals, or customized chauffeur packages? Contact our Nassau team anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Info Column */}
          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Direct Phone Support</h3>
              <p className="text-xs text-gray-500">Call our 24/7 reservation hotline</p>
              <p className="text-sm font-bold text-orange-600">+1 (242) 555-DRIVE</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Email Concierge</h3>
              <p className="text-xs text-gray-500">Inquiries and corporate bookings</p>
              <p className="text-sm font-bold text-orange-600">reservations@bahamasluxurydrive.com</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Primary Headquarters</h3>
              <p className="text-xs text-gray-500">Lynden Pindling International Airport (NAS)</p>
              <p className="text-xs font-semibold text-gray-700">Nassau, New Providence, Bahamas</p>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-2xl font-black text-gray-900">Send an Inquiry</h2>

            {submitted && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-2xl flex items-center">
                <Check className="w-4 h-4 mr-2" /> Message sent successfully! Our concierge will contact you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 uppercase">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Richardson"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 uppercase">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. marcus@example.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 uppercase">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (242) ..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 uppercase">Subject</label>
                  <input
                    type="text"
                    defaultValue="Rental Reservation Inquiry"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 uppercase">Your Message *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about your rental dates, preferred car category, or special requests..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/25 flex items-center space-x-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
