'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRental } from '../../context/RentalContext';
import { useAuth } from '../../context/AuthContext';
import { BookingExtra } from '../../types/rental';
import { 
  ShieldCheck, 
  CreditCard, 
  MapPin, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Car, 
  Check, 
  Tag, 
  Lock,
  ArrowRight,
  UploadCloud
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { vehicles, createBooking } = useRental();
  const { user } = useAuth();

  const [draft, setDraft] = useState<any>(null);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [paymentChoice, setPaymentChoice] = useState<'full' | 'deposit'>('full');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cash'>('card');
  const [licenseFile, setLicenseFile] = useState<string | null>(null);

  // Form Fields
  const [customerInfo, setCustomerInfo] = useState({
    fullName: user?.name || 'John Renter',
    email: user?.email || 'customer@demo.com',
    phone: user?.phone || '+1 (242) 555-0182',
    address: user?.address || '14 Bay Street, Nassau, Bahamas',
    driverLicenseNumber: 'DL-BAH-9920148',
    licenseExpiry: '2028-12-31',
    emergencyContact: '+1 (242) 555-0911'
  });

  useEffect(() => {
    const saved = sessionStorage.getItem('dreamsrent_draft_booking');
    if (saved) {
      setDraft(JSON.parse(saved));
    } else {
      // Fallback draft with vehicle 1
      const v = vehicles[0];
      setDraft({
        vehicleId: v.id,
        pickupLocation: 'Nassau Airport (NAS)',
        returnLocation: 'Nassau Airport (NAS)',
        pickupDate: new Date().toISOString().split('T')[0],
        pickupTime: '10:00',
        returnDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        returnTime: '10:00',
        days: 3,
        dailyRate: v.pricePerDay,
        rentalSubtotal: v.pricePerDay * 3,
        selectedExtras: [],
        extrasTotal: 0,
        taxes: Math.round(v.pricePerDay * 3 * 0.10),
        depositAmount: v.deposit,
        totalAmount: v.pricePerDay * 3 + Math.round(v.pricePerDay * 3 * 0.10)
      });
    }
  }, [vehicles]);

  if (!draft) {
    return <div className="min-h-screen flex items-center justify-center">Loading reservation details...</div>;
  }

  const vehicle = vehicles.find(v => v.id === draft.vehicleId) || vehicles[0];

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SUMMER20' || promoCode.trim().toUpperCase() === 'DREAMS20') {
      setDiscountPercent(20);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "SUMMER20" for 20% off!');
    }
  };

  const discountAmount = Math.round((draft.rentalSubtotal * discountPercent) / 100);
  const adjustedTotal = draft.totalAmount - discountAmount;
  const amountToPayNow = paymentChoice === 'deposit' ? draft.depositAmount : adjustedTotal;
  const balanceDue = paymentChoice === 'deposit' ? (adjustedTotal - draft.depositAmount) : 0;

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking = createBooking({
      vehicleId: vehicle.id,
      vehicle,
      pickupLocation: draft.pickupLocation,
      returnLocation: draft.returnLocation,
      pickupDate: draft.pickupDate,
      pickupTime: draft.pickupTime,
      returnDate: draft.returnDate,
      returnTime: draft.returnTime,
      days: draft.days,
      dailyRate: draft.dailyRate,
      rentalSubtotal: draft.rentalSubtotal,
      selectedExtras: draft.selectedExtras,
      extrasTotal: draft.extrasTotal,
      taxes: draft.taxes,
      depositAmount: draft.depositAmount,
      totalAmount: adjustedTotal,
      amountPaid: amountToPayNow,
      balanceDue,
      paymentType: paymentChoice,
      paymentMethod: paymentMethod === 'cash' ? 'cash' : 'card',
      customer: customerInfo,
      status: 'Confirmed'
    });

    sessionStorage.removeItem('dreamsrent_draft_booking');
    router.push(`/confirmation?id=${newBooking.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <span>/</span>
          <Link href="/rental-grid" className="hover:text-orange-600">Fleet</Link>
          <span>/</span>
          <span className="text-gray-900">Secure Checkout</span>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-8">
          Complete Your Vehicle Reservation
        </h1>

        <form onSubmit={handleSubmitBooking} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Customer Details & Payment (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Driver & Customer Information */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-sm">
                  1
                </div>
                <h2 className="text-lg font-bold text-gray-900">Primary Driver Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 uppercase">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerInfo.fullName}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 uppercase">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 uppercase">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 uppercase">Driver's License Number *</label>
                  <input
                    type="text"
                    required
                    value={customerInfo.driverLicenseNumber}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, driverLicenseNumber: e.target.value }))}
                    className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-gray-700 uppercase">Residential / Hotel Address</label>
                  <input
                    type="text"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                {/* License Document Upload */}
                <div className="sm:col-span-2 space-y-1 pt-2">
                  <label className="font-bold text-gray-700 uppercase flex items-center justify-between">
                    <span>Driver's License / Passport Photo (Optional)</span>
                    <span className="text-gray-400 font-normal">PDF, JPG, PNG (Max 5MB)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-orange-400 cursor-pointer bg-gray-50/50">
                    <UploadCloud className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-600 font-semibold">Click to upload or drag driver license scan</p>
                    <p className="text-[10px] text-gray-400">Speeds up pickup check-in at the terminal</p>
                  </div>
                </div>

              </div>
            </div>

            {/* 2. Payment Method & Options */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-sm">
                  2
                </div>
                <h2 className="text-lg font-bold text-gray-900">Payment & Security Deposit</h2>
              </div>

              {/* Payment Type Switcher */}
              <div className="grid grid-cols-2 gap-4">
                <label 
                  onClick={() => setPaymentChoice('full')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentChoice === 'full' 
                      ? 'border-orange-500 bg-orange-50/40 shadow-sm' 
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <input type="radio" checked={paymentChoice === 'full'} readOnly className="text-orange-600" />
                    <span className="font-bold text-gray-900 text-sm">Pay Full Balance</span>
                  </div>
                  <p className="text-xs text-gray-500">Pay ${adjustedTotal} now with instant confirmation.</p>
                </label>

                <label 
                  onClick={() => setPaymentChoice('deposit')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentChoice === 'deposit' 
                      ? 'border-orange-500 bg-orange-50/40 shadow-sm' 
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <input type="radio" checked={paymentChoice === 'deposit'} readOnly className="text-orange-600" />
                    <span className="font-bold text-gray-900 text-sm">Pay Deposit Only</span>
                  </div>
                  <p className="text-xs text-gray-500">Pay ${draft.depositAmount} deposit now. Pay remainder at pickup.</p>
                </label>
              </div>

              {/* Payment Card Simulation */}
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 flex items-center">
                      <CreditCard className="w-4 h-4 text-orange-500 mr-2" /> Credit or Debit Card
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 flex items-center">
                      <Lock className="w-3 h-3 mr-1" /> 256-Bit SSL Encrypted
                    </span>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Card Number (4242 •••• •••• 4242)"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        defaultValue="12/28"
                        className="px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold"
                      />
                      <input
                        type="text"
                        placeholder="CVC / CVV"
                        defaultValue="888"
                        className="px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Order Summary & Promo Code (1 Col) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl space-y-6">
              
              {/* Vehicle Preview Card */}
              <div className="flex items-center space-x-4 pb-6 border-b border-gray-100">
                <img 
                  src={vehicle.featuredImage} 
                  alt={vehicle.title} 
                  className="w-20 h-16 rounded-xl object-cover border border-gray-100 shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{vehicle.title}</h3>
                  <span className="text-xs font-semibold text-orange-600">${vehicle.pricePerDay}/day</span>
                  <span className="text-[11px] text-gray-400 block">{draft.days} Days Rental</span>
                </div>
              </div>

              {/* Itinerary */}
              <div className="space-y-3 text-xs">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">Pickup:</span>
                    <span className="text-gray-500">{draft.pickupLocation} • {draft.pickupDate} ({draft.pickupTime})</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">Return:</span>
                    <span className="text-gray-500">{draft.returnLocation} • {draft.returnDate} ({draft.returnTime})</span>
                  </div>
                </div>
              </div>

              {/* Promo Code Box */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Promo Code (e.g. SUMMER20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs uppercase font-bold"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-gray-900 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1.5 flex items-center">
                    <Check className="w-3 h-3 mr-1" /> 20% Promo Discount Applied!
                  </p>
                )}
              </div>

              {/* Pricing Breakdown */}
              <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Rental Subtotal ({draft.days} days)</span>
                  <span className="font-bold text-gray-900">${draft.rentalSubtotal}</span>
                </div>

                {draft.extrasTotal > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Selected Extras</span>
                    <span className="font-bold text-gray-900">+${draft.extrasTotal}</span>
                  </div>
                )}

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Promo Discount (20%)</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Taxes & Fees (10%)</span>
                  <span className="font-bold text-gray-900">${draft.taxes}</span>
                </div>

                <div className="flex justify-between text-emerald-700 bg-emerald-50 p-2 rounded-lg font-bold">
                  <span>Refundable Security Deposit</span>
                  <span>${draft.depositAmount}</span>
                </div>

                <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-gray-900">Total Charged:</span>
                  <span className="text-2xl font-black text-orange-600">${amountToPayNow}</span>
                </div>

                {balanceDue > 0 && (
                  <div className="flex justify-between text-[11px] text-amber-700 font-bold bg-amber-50 p-2 rounded-lg">
                    <span>Balance Due at Pickup:</span>
                    <span>${balanceDue}</span>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2 transition-all transform active:scale-98"
              >
                <span>Confirm & Pay ${amountToPayNow}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
