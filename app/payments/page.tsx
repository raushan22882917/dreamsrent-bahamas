'use client';

import React from 'react';
import Link from 'next/link';
import { useRental } from '../../context/RentalContext';
import { CreditCard, Download, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function PaymentsPage() {
  const { bookings } = useRental();

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 mb-1">
            <Link href="/dashboard" className="hover:text-orange-600">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-900">Billing & Invoices</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900">Payments & Invoices</h1>
          <p className="text-sm text-gray-500">View transaction history, download tax receipts, and check deposit refunds.</p>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-base">Transaction Records</h3>
            <span className="text-xs text-gray-400 font-semibold">{bookings.length} Total Records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="px-6 py-4">Transaction / Ref</th>
                  <th className="px-6 py-4">Vehicle</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount Paid</th>
                  <th className="px-6 py-4">Deposit</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-gray-900">{b.reservationNumber}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{b.vehicle.title}</td>
                    <td className="px-6 py-4 text-gray-500">{new Date(b.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-black text-gray-900">${b.amountPaid}</td>
                    <td className="px-6 py-4 font-semibold text-emerald-600">${b.depositAmount}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/confirmation?id=${b.id}`}
                        className="inline-flex items-center text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Download className="w-3 h-3 mr-1" /> PDF
                      </Link>
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
