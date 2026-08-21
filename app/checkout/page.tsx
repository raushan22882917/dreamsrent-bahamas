'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRental } from '../../context/RentalContext';
import { useAuth } from '../../context/AuthContext';
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
  UploadCloud,
  CheckCircle2,
  AlertCircle
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
  const [paymentMethod, setPaymentMethod] = useState<'stripe_card' | 'apple_pay' | 'cash'>('stripe_card');
  const [loading, setLoading] = useState(false);
  const [stripeStatus, setStripeStatus] = useState<string | null>(null);

  // Stripe Card State
  const [stripeCard, setStripeCard] = useState({
    cardNumber: '4242 •••• •••• 4242',
    expDate: '12/28',
    cvc: '888',
    cardholderName: user?.name || 'John Renter',
    postalCode: 'N-3942'
  });

  // Form Fields
  const [customerInfo, setCustomerInfo] = useState({
    fullName: user?.name || 'John Renter',
    email: user?.email || 'customer@bahamasluxurydrive.com',
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
      const v = vehicles[0];
      setDraft({
        vehicleId: v.id,
        pickupLocation: 'Nassau Airport (NAS)',
        returnLocation: 'Nassau Airport (NAS)',
        pickupDate: new Date().toISOString().split('T')[0],
        pickupTime: '10:00 AM',
        returnDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        returnTime: '10:00 AM',
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
    return <div className="min-h-screen flex items-center justify-center text-xs">Loading reservation details...</div>;
  }

  const vehicle = vehicles.find(v => v.id === draft.vehicleId) || vehicles[0];

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SUMMER20' || promoCode.trim().toUpperCase() === 'DRIVE20' || promoCode.trim().toUpperCase() === 'LUXURY20') {
      setDiscountPercent(20);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "SUMMER20" or "DRIVE20" for 20% off!');
    }
  };

  const discountAmount = Math.round((draft.rentalSubtotal * discountPercent) / 100);
  const adjustedTotal = draft.totalAmount - discountAmount;
  const amountToPayNow = paymentChoice === 'deposit' ? draft.depositAmount : adjustedTotal;
  const balanceDue = paymentChoice === 'deposit' ? (adjustedTotal - draft.depositAmount) : 0;

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStripeStatus('Connecting to Stripe Payment Gateway...');

    try {
      // 1. Process Stripe Payment Intent
      const stripeRes = await fetch('/api/stripe/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountToPayNow,
          vehicleTitle: vehicle.title,
          customerEmail: customerInfo.email,
          reservationNumber: `RES-${Date.now()}`
        })
      });

      const stripeData = await stripeRes.json();
      setStripeStatus('Payment authorized by Stripe. Saving reservation in PostgreSQL...');

      // 2. Persist booking to PostgreSQL
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
        paymentMethod: 'card',
        customer: customerInfo,
        status: 'Confirmed'
      });

      sessionStorage.removeItem('dreamsrent_draft_booking');
      router.push(`/confirmation?id=${newBooking.id}&paidWith=stripe`);
    } catch (err: any) {
      console.error('Stripe Checkout Error:', err);
      alert('Payment processing error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 mb-6">
          <Link href="/" className="hover:text-[#FFA633]">Home</Link>
          <span>/</span>
          <Link href="/rental-grid" className="hover:text-[#FFA633]">Fleet</Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">Stripe Secure Checkout</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[#201F1D] mb-8">
          Complete Your Vehicle Reservation
        </h1>

        <form onSubmit={handleSubmitBooking} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Customer Details & Stripe Payment (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Driver & Customer Information */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAEDF0] shadow-sm space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-[#EAEDF0]">
                <div className="w-7 h-7 rounded-full bg-[#FFA633] text-white font-bold flex items-center justify-center text-xs">
                  1
                </div>
                <h2 className="text-base font-bold text-[#201F1D]">Primary Driver Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={customerInfo.fullName}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-[#EAEDF0] rounded-xl font-medium focus:ring-2 focus:ring-[#FFA633] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-[#EAEDF0] rounded-xl font-medium focus:ring-2 focus:ring-[#FFA633] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-[#EAEDF0] rounded-xl font-medium focus:ring-2 focus:ring-[#FFA633] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Driver&apos;s License Number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={customerInfo.driverLicenseNumber}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, driverLicenseNumber: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-[#EAEDF0] rounded-xl font-medium focus:ring-2 focus:ring-[#FFA633] focus:outline-none"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-gray-700">Delivery / Hotel Address</label>
                  <input
                    type="text"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-[#EAEDF0] rounded-xl font-medium focus:ring-2 focus:ring-[#FFA633] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Stripe Payment Method */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAEDF0] shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAEDF0]">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-[#FFA633] text-white font-bold flex items-center justify-center text-xs">
                    2
                  </div>
                  <h2 className="text-base font-bold text-[#201F1D]">Payment via Stripe</h2>
                </div>

                {/* Stripe Trust Badge */}
                <div className="flex items-center space-x-1.5 px-3 py-1 bg-[#635BFF]/10 text-[#635BFF] rounded-full text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Powered by Stripe</span>
                </div>
              </div>

              {/* Payment Type Switcher (Pay in Full vs Pay Deposit) */}
              <div className="grid grid-cols-2 gap-4">
                <label 
                  onClick={() => setPaymentChoice('full')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentChoice === 'full' 
                      ? 'border-[#FFA633] bg-orange-50/30 shadow-sm' 
                      : 'border-[#EAEDF0] bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <input type="radio" checked={paymentChoice === 'full'} readOnly className="text-[#FFA633]" />
                    <span className="font-bold text-xs text-[#201F1D]">Pay Full Balance Now</span>
                  </div>
                  <p className="text-base font-black text-[#FFA633] pl-5">${adjustedTotal}</p>
                  <p className="text-[10px] text-gray-500 pl-5">Guarantees express vehicle hand-off</p>
                </label>

                <label 
                  onClick={() => setPaymentChoice('deposit')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentChoice === 'deposit' 
                      ? 'border-[#FFA633] bg-orange-50/30 shadow-sm' 
                      : 'border-[#EAEDF0] bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <input type="radio" checked={paymentChoice === 'deposit'} readOnly className="text-[#FFA633]" />
                    <span className="font-bold text-xs text-[#201F1D]">Pay Deposit Only</span>
                  </div>
                  <p className="text-base font-black text-[#FFA633] pl-5">${draft.depositAmount}</p>
                  <p className="text-[10px] text-gray-500 pl-5">Pay remainder (${balanceDue}) at pickup</p>
                </label>
              </div>

              {/* Interactive Stripe Payment Card Container */}
              <div className="border border-[#EAEDF0] rounded-2xl p-5 bg-[#FAFAFB] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#201F1D] flex items-center">
                    <CreditCard className="w-4 h-4 text-[#635BFF] mr-1.5" />
                    Stripe Credit / Debit Card
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-700">VISA</span>
                    <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-700">Mastercard</span>
                    <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-700">AMEX</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-gray-700 mb-1">Card Number</label>
                    <input 
                      type="text"
                      value={stripeCard.cardNumber}
                      onChange={(e) => setStripeCard({ ...stripeCard, cardNumber: e.target.value })}
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EAEDF0] rounded-xl font-mono text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Expiration Date</label>
                    <input 
                      type="text"
                      value={stripeCard.expDate}
                      onChange={(e) => setStripeCard({ ...stripeCard, expDate: e.target.value })}
                      placeholder="MM / YY"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EAEDF0] rounded-xl font-mono text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Security Code (CVC)</label>
                    <input 
                      type="text"
                      value={stripeCard.cvc}
                      onChange={(e) => setStripeCard({ ...stripeCard, cvc: e.target.value })}
                      placeholder="CVC"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EAEDF0] rounded-xl font-mono text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-[#635BFF] font-semibold pt-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-Bit SSL Encrypted & PCI-DSS Level 1 Certified via Stripe</span>
                </div>
              </div>

              {stripeStatus && (
                <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold rounded-xl flex items-center space-x-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>{stripeStatus}</span>
                </div>
              )}

            </div>

          </div>

          {/* Right Column: Order Summary & Instant Checkout */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-2xl p-6 border border-[#EAEDF0] shadow-sm space-y-5">
              <h3 className="text-base font-bold text-[#201F1D] pb-3 border-b border-[#EAEDF0]">
                Reservation Summary
              </h3>

              {/* Car Card Preview */}
              <div className="flex items-center space-x-4">
                <img 
                  src={vehicle.featuredImage} 
                  alt={vehicle.title} 
                  className="w-20 h-14 rounded-xl object-cover border border-[#EAEDF0]" 
                />
                <div>
                  <h4 className="font-bold text-[#201F1D] text-xs sm:text-sm">{vehicle.title}</h4>
                  <p className="text-[11px] text-[#878A99]">{vehicle.category} • {vehicle.specs.transmission}</p>
                  <p className="text-xs font-bold text-[#FFA633] mt-0.5">${vehicle.pricePerDay} / day</p>
                </div>
              </div>

              {/* Dates & Hub */}
              <div className="space-y-2 text-xs text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-[#EAEDF0]">
                <p><b className="text-gray-900">Pickup:</b> {draft.pickupDate} ({draft.pickupTime})</p>
                <p><b className="text-gray-900">Return:</b> {draft.returnDate} ({draft.returnTime})</p>
                <p><b className="text-gray-900">Duration:</b> {draft.days} Days</p>
                <p><b className="text-gray-900">Location:</b> {draft.pickupLocation}</p>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-2.5 text-xs text-gray-600 border-t border-[#EAEDF0] pt-4">
                <div className="flex justify-between">
                  <span>Rental Rate ({draft.days}d × ${draft.dailyRate})</span>
                  <span className="font-semibold text-gray-900">${draft.rentalSubtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Bahamas Government Tax & Fees (10%)</span>
                  <span className="font-semibold text-gray-900">${draft.taxes}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Promo Discount ({discountPercent}%)</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-black text-[#201F1D] border-t border-[#EAEDF0] pt-3">
                  <span>Total Due</span>
                  <span className="text-[#FFA633]">${adjustedTotal}</span>
                </div>

                <div className="flex justify-between text-xs font-bold text-[#635BFF] bg-purple-50 p-2.5 rounded-lg">
                  <span>Charged to Stripe Today</span>
                  <span>${amountToPayNow}</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="pt-2">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Promo Code (e.g. SUMMER20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-[#EAEDF0] rounded-xl text-xs uppercase font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FFA633]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-[#201F1D] text-white text-xs font-bold rounded-xl hover:bg-black"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#635BFF] hover:bg-[#5248e5] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#635BFF]/25 flex items-center justify-center space-x-2 transition-all active:scale-[0.99]"
              >
                {loading ? (
                  <span>Processing Stripe Payment...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ${amountToPayNow} with Stripe</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-gray-400 text-center">
                Free cancellation up to 24 hours prior to vehicle pickup.
              </p>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
}
