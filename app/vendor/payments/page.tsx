'use client';

import React from 'react';
import Link from 'next/link';
import { DollarSign, ArrowDownLeft, CheckCircle2, Download, CreditCard } from 'lucide-react';

export default function VendorPaymentsPage() {
  const payouts = [
    { id: 'PAY-8941', date: '2026-08-18', amount: 3450, status: 'Completed', method: 'Direct Bank Wire (FirstCaribbean)' },
    { id: 'PAY-8820', date: '2026-08-11', amount: 4820, status: 'Completed', method: 'Direct Bank Wire (FirstCaribbean)' },
    { id: 'PAY-8702', date: '2026-08-04', amount: 6580, status: 'Completed', method: 'Direct Bank Wire (FirstCaribbean)' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-[#201F1D]">Vendor Earnings & Payouts</h1>
            <p className="text-xs text-[#878A99]">Track vehicle rental disbursements, commissions, and bank transfers</p>
          </div>
          <button className="px-4 py-2 bg-[#FFA633] text-white font-bold text-xs rounded-xl shadow flex items-center space-x-1.5">
            <DollarSign className="w-4 h-4" />
            <span>Request Instant Payout</span>
          </button>
        </div>

        {/* Payout Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-[#EAEDF0] shadow-sm">
            <span className="text-xs text-[#878A99] font-bold uppercase">Pending Balance</span>
            <h3 className="text-3xl font-black text-[#201F1D] mt-2">$2,840.00</h3>
            <p className="text-xs text-emerald-600 mt-1">Scheduled for release on Friday</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EAEDF0] shadow-sm">
            <span className="text-xs text-[#878A99] font-bold uppercase">Total Lifetime Paid</span>
            <h3 className="text-3xl font-black text-[#201F1D] mt-2">$14,850.00</h3>
            <p className="text-xs text-gray-400 mt-1">3 Completed disbursements</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EAEDF0] shadow-sm">
            <span className="text-xs text-[#878A99] font-bold uppercase">Payout Account</span>
            <h3 className="text-lg font-bold text-[#201F1D] mt-2">CIBC FirstCaribbean</h3>
            <p className="text-xs text-[#878A99] mt-1">Account ending in •••• 9924</p>
          </div>
        </div>

        {/* Payout History Table */}
        <div className="bg-white rounded-2xl border border-[#EAEDF0] shadow-sm p-6">
          <h2 className="text-base font-bold text-[#201F1D] mb-4">Disbursement History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9FA] text-[#878A99] uppercase text-[10px] tracking-wider border-b border-[#EAEDF0]">
                <tr>
                  <th className="py-3 px-4">Payout ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Payout Method</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEDF0]">
                {payouts.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-bold text-[#201F1D]">{p.id}</td>
                    <td className="py-3 px-4 text-gray-500">{p.date}</td>
                    <td className="py-3 px-4 text-gray-700">{p.method}</td>
                    <td className="py-3 px-4 font-bold text-emerald-600">${p.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="p-1.5 text-gray-500 hover:text-[#FFA633] bg-gray-100 rounded-lg">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
