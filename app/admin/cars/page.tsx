'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRental } from '../../../context/RentalContext';
import { Vehicle } from '../../../types/rental';
import { ALL_LOCATIONS } from '../../../data/vehicles';
import { 
  Car, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  MapPin, 
  DollarSign, 
  ShieldCheck,
  Search
} from 'lucide-react';

export default function AdminCarsPage() {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useRental();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Vehicle | null>(null);

  // Form State for Adding / Editing
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    year: 2024,
    category: 'Luxury' as Vehicle['category'],
    pricePerDay: 120,
    deposit: 250,
    location: ALL_LOCATIONS[0],
    transmission: 'Automatic' as Vehicle['specs']['transmission'],
    seats: 5,
    status: 'Available' as Vehicle['status'],
    featuredImage: '/images/cars/car-01.jpg'
  });

  const handleOpenAdd = () => {
    setEditingCar(null);
    setFormData({
      title: '',
      brand: '',
      model: '',
      year: 2024,
      category: 'Luxury',
      pricePerDay: 120,
      deposit: 250,
      location: ALL_LOCATIONS[0],
      transmission: 'Automatic',
      seats: 5,
      status: 'Available',
      featuredImage: '/images/cars/car-01.jpg'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (v: Vehicle) => {
    setEditingCar(v);
    setFormData({
      title: v.title,
      brand: v.brand,
      model: v.model,
      year: v.year,
      category: v.category,
      pricePerDay: v.pricePerDay,
      deposit: v.deposit,
      location: v.location,
      transmission: v.specs.transmission,
      seats: v.specs.seats,
      status: v.status,
      featuredImage: v.featuredImage
    });
    setModalOpen(true);
  };

  const handleSaveCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCar) {
      updateVehicle(editingCar.id, {
        title: formData.title,
        brand: formData.brand,
        model: formData.model,
        year: Number(formData.year),
        category: formData.category,
        pricePerDay: Number(formData.pricePerDay),
        deposit: Number(formData.deposit),
        location: formData.location,
        status: formData.status,
        featuredImage: formData.featuredImage,
        specs: {
          ...editingCar.specs,
          transmission: formData.transmission,
          seats: Number(formData.seats)
        }
      });
    } else {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const newCar: Vehicle = {
        id: 'car-' + Date.now(),
        slug,
        title: formData.title,
        brand: formData.brand,
        model: formData.model,
        year: Number(formData.year),
        category: formData.category,
        pricePerDay: Number(formData.pricePerDay),
        deposit: Number(formData.deposit),
        location: formData.location,
        featuredImage: formData.featuredImage,
        galleryImages: [formData.featuredImage, '/images/cars/car-02.jpg'],
        specs: {
          transmission: formData.transmission,
          mileage: 'Unlimited',
          fuelType: 'Petrol',
          seats: Number(formData.seats),
          doors: 4,
          luggage: '3 Bags',
          airConditioning: true
        },
        features: ['Multi-zone A/C', 'Navigation system', 'Apple CarPlay', 'Bluetooth'],
        rating: 5.0,
        reviewsCount: 1,
        status: formData.status
      };
      addVehicle(newCar);
    }
    setModalOpen(false);
  };

  const filtered = vehicles.filter(v => 
    v.title.toLowerCase().includes(search.toLowerCase()) || 
    v.brand.toLowerCase().includes(search.toLowerCase()) ||
    v.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 mb-1">
              <Link href="/admin" className="hover:text-orange-600">Admin</Link>
              <span>/</span>
              <span className="text-gray-900">Fleet Inventory</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900">Manage Fleet Inventory</h1>
            <p className="text-sm text-gray-500">Configure all 20 vehicles, edit rates, and update operational readiness.</p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/25 flex items-center space-x-2 flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Vehicle</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search vehicles by name, brand, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <span className="text-xs font-bold text-gray-500">{filtered.length} Vehicles</span>
        </div>

        {/* Vehicles Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="px-6 py-4">Vehicle Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Location Hub</th>
                  <th className="px-6 py-4">Daily Rate</th>
                  <th className="px-6 py-4">Deposit</th>
                  <th className="px-6 py-4">Fleet Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img src={v.featuredImage} alt={v.title} className="w-14 h-10 rounded-lg object-cover border border-gray-100" />
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{v.title}</p>
                          <p className="text-[10px] text-gray-400">{v.specs.transmission} • {v.specs.seats} Seats • {v.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 font-bold rounded-lg text-[10px] uppercase">
                        {v.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{v.location}</td>
                    <td className="px-6 py-4 font-black text-gray-900 text-sm">${v.pricePerDay}/day</td>
                    <td className="px-6 py-4 text-emerald-600 font-bold">${v.deposit}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        v.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(v)}
                        className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Edit Vehicle"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to remove ${v.title} from the fleet?`)) {
                            deleteVehicle(v.id);
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Vehicle"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingCar ? `Edit ${editingCar.title}` : 'Add New Vehicle to Fleet'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCar} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-700 uppercase">Vehicle Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700 uppercase">Make / Brand *</label>
                    <input
                      type="text"
                      required
                      value={formData.brand}
                      onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700 uppercase">Model *</label>
                    <input
                      type="text"
                      required
                      value={formData.model}
                      onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700 uppercase">Year *</label>
                    <input
                      type="number"
                      required
                      value={formData.year}
                      onChange={(e) => setFormData(prev => ({ ...prev, year: Number(e.target.value) }))}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700 uppercase">Daily Rate ($) *</label>
                    <input
                      type="number"
                      required
                      value={formData.pricePerDay}
                      onChange={(e) => setFormData(prev => ({ ...prev, pricePerDay: Number(e.target.value) }))}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700 uppercase">Security Deposit ($) *</label>
                    <input
                      type="number"
                      required
                      value={formData.deposit}
                      onChange={(e) => setFormData(prev => ({ ...prev, deposit: Number(e.target.value) }))}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700 uppercase">Location Hub *</label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    >
                      {ALL_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700 uppercase">Fleet Status *</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    >
                      <option value="Available">Available</option>
                      <option value="Rented">Rented</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md"
                  >
                    Save Vehicle
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
