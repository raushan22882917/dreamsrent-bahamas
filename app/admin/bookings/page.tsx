'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRental } from '../../../context/RentalContext';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
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
    <DashboardLayout
      title="Customer Reservations & Bookings"
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Admin', href: '/admin' }, { label: 'Bookings' }]}
    >
      <div className="space-y-6 max-w-6xl">
        
        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAEDF0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by reservation #, customer, car..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-[#EAEDF0] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFA633]"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
            {['All', 'Confirmed', 'Active Rental', 'Completed', 'Cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  filterStatus === st
                    ? 'bg-[#FFA633] text-white shadow-sm'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl border border-[#EAEDF0] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9FA] text-[#878A99] uppercase text-[10px] tracking-wider border-b border-[#EAEDF0]">
                <tr>
                  <th className="py-3.5 px-4">Reservation Details</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Rental Period</th>
                  <th className="py-3.5 px-4">Financials</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEDF0]">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img src={b.vehicle.featuredImage} alt={b.vehicle.title} className="w-12 h-9 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-[#201F1D]">{b.vehicle.title}</p>
                          <p className="text-[10px] text-gray-400 font-mono">{b.reservationNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-semibold text-gray-900">{b.customer.fullName}</p>
                        <p className="text-[10px] text-gray-400">{b.customer.phone}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500">
                      <p className="font-semibold text-gray-700">{b.pickupDate} → {b.returnDate}</p>
                      <p className="text-[10px] text-gray-400">{b.pickupLocation} ({b.days} Days)</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-[#FFA633]">${b.totalAmount}</p>
                      <p className="text-[10px] text-gray-400">Paid: ${b.amountPaid}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' :
                        b.status === 'Active Rental' ? 'bg-blue-100 text-blue-700' :
                        b.status === 'Completed' ? 'bg-gray-100 text-gray-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {b.status === 'Pending' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Confirmed')}
                            className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold hover:bg-emerald-100"
                          >
                            Approve
                          </button>
                        )}
                        {b.status === 'Confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Active Rental')}
                            className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold hover:bg-blue-100"
                          >
                            Dispatch
                          </button>
                        )}
                        <Link
                          href="/confirmation"
                          className="p-1.5 text-gray-500 hover:text-gray-900 bg-gray-100 rounded-lg"
                          title="Print Voucher"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
