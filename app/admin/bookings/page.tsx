'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRental } from '../../../context/RentalContext';
import { Calendar, Search, MapPin, Printer, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AdminBookingsPage() {
  const { bookings, updateBookingStatus } = useRental();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = bookings.filter(b => {
    if (filterStatus !== 'All' && b.status !== filterStatus) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchRes = b.reservationNumber.toLowerCase().includes(q);
      const matchCust = b.customer.fullName.toLowerCase().includes(q);
      const matchCar = b.vehicle.title.toLowerCase().includes(q);
      if (!matchRes && !matchCust && !matchCar) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 mb-1">
              <Link href="/admin" className="hover:text-orange-600">Admin</Link>
              <span>/</span>
              <span className="text-gray-900">Reservations</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900">All Customer Bookings</h1>
            <p className="text-sm text-gray-500">Monitor active island rentals, security deposits, and customer agreements.</p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by reservation #, customer, car..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
            {['All', 'Confirmed', 'Picked Up', 'Active Rental', 'Completed', 'Cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  filterStatus === st 
                    ? 'bg-orange-500 text-white shadow-sm' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="px-6 py-4">Reservation #</th>
                  <th className="px-6 py-4">Customer & Driver</th>
                  <th className="px-6 py-4">Vehicle</th>
                  <th className="px-6 py-4">Pickup / Return Hub</th>
                  <th className="px-6 py-4">Dates</th>
                  <th className="px-6 py-4">Paid / Deposit</th>
                  <th className="px-6 py-4">Dispatch Status</th>
                  <th className="px-6 py-4 text-right">Voucher</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-gray-900">{b.reservationNumber}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{b.customer.fullName}</p>
                      <p className="text-[10px] text-gray-400">{b.customer.email}</p>
                      <p className="text-[10px] text-gray-400">{b.customer.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <img src={b.vehicle.featuredImage} alt={b.vehicle.title} className="w-12 h-8 rounded object-cover" />
                        <span className="font-semibold text-gray-800">{b.vehicle.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <p className="font-semibold text-gray-800">{b.pickupLocation}</p>
                      <p className="text-[10px] text-gray-400">To: {b.returnLocation}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <p className="font-semibold text-gray-800">{b.pickupDate} ({b.pickupTime})</p>
                      <p className="text-[10px] text-gray-400">{b.returnDate} ({b.returnTime})</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-black text-gray-900">${b.amountPaid}</p>
                      <p className="text-[10px] text-emerald-600 font-bold">Dep: ${b.depositAmount}</p>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold border border-gray-200 bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Picked Up">Picked Up</option>
                        <option value="Active Rental">Active Rental</option>
                        <option value="Returned">Returned</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/confirmation?id=${b.id}`}
                        className="inline-flex items-center text-xs font-bold text-gray-700 hover:text-orange-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Print Voucher"
                      >
                        <Printer className="w-4 h-4" />
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
