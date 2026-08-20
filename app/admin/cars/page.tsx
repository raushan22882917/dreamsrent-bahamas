'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRental } from '../../../context/RentalContext';
import { Vehicle } from '../../../types/rental';
import { ALL_LOCATIONS } from '../../../data/vehicles';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { 
  Car, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  MapPin, 
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
    year: 2025,
    category: 'Sport' as Vehicle['category'],
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
      year: 2025,
      category: 'Sport',
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
      const newCar: Vehicle = {
        id: `car-custom-${Date.now()}`,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: formData.title,
        brand: formData.brand,
        model: formData.model,
        year: Number(formData.year),
        category: formData.category,
        pricePerDay: Number(formData.pricePerDay),
        hourlyPrice: Math.round(Number(formData.pricePerDay) / 5),
        deposit: Number(formData.deposit),
        featuredImage: formData.featuredImage,
        galleryImages: [formData.featuredImage, '/images/cars/car-02.jpg', '/images/cars/car-03.jpg'],
        specs: {
          transmission: formData.transmission,
          mileage: 'Unlimited',
          fuelType: 'Petrol',
          seats: Number(formData.seats),
          doors: 4,
          luggage: '3 Bags',
          engine: '3.0L Turbo',
          airConditioning: true
        },
        features: ['Navigation', 'Bluetooth', 'Multi-zone A/C', 'Touchscreen'],
        location: formData.location,
        rating: 5.0,
        reviewsCount: 1,
        status: formData.status,
        licensePlate: `BS-${Math.floor(1000 + Math.random() * 9000)}`,
        vin: `1G1${Math.random().toString(36).substring(2, 10).toUpperCase()}`
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
    <DashboardLayout
      title="Fleet Management"
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Admin', href: '/admin' }, { label: 'Fleet Management' }]}
    >
      <div className="space-y-6 max-w-6xl">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#EAEDF0] shadow-sm">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by title, brand, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-[#EAEDF0] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#FFA633]"
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-[#FFA633] hover:bg-[#e5952e] text-white text-xs font-bold rounded-xl shadow flex items-center space-x-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Car</span>
            </button>
          </div>
        </div>

        {/* Cars Table */}
        <div className="bg-white rounded-2xl border border-[#EAEDF0] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9FA] text-[#878A99] uppercase text-[10px] tracking-wider border-b border-[#EAEDF0]">
                <tr>
                  <th className="py-3.5 px-4">Vehicle Details</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Daily Rate</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEDF0]">
                {filtered.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={car.featuredImage} 
                          alt={car.title} 
                          className="w-14 h-10 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                        />
                        <div>
                          <p className="font-bold text-[#201F1D]">{car.title}</p>
                          <p className="text-[10px] text-gray-400">
                            {car.brand} • {car.year} • {car.specs.transmission} • {car.specs.seats} Seats
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gray-700">{car.category}</td>
                    <td className="py-3.5 px-4 text-gray-500">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 text-[#FFA633] mr-1" />
                        {car.location}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#FFA633]">${car.pricePerDay} / day</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        car.status === 'Available' ? 'bg-emerald-100 text-emerald-700' :
                        car.status === 'Rented' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {car.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenEdit(car)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Edit Vehicle"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete ${car.title}?`)) {
                              deleteVehicle(car.id);
                            }
                          }}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                          title="Delete Vehicle"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Add / Edit */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <h3 className="text-lg font-black text-[#201F1D]">
                  {editingCar ? 'Edit Vehicle Details' : 'Add New Car to Fleet'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCar} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Car Title</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title} 
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. 2025 Porsche 911 GT3 RS"
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Brand</label>
                    <input 
                      type="text" 
                      required
                      value={formData.brand} 
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="e.g. Porsche"
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Daily Price ($)</label>
                    <input 
                      type="number" 
                      required
                      value={formData.pricePerDay} 
                      onChange={(e) => setFormData({ ...formData, pricePerDay: Number(e.target.value) })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Security Deposit ($)</label>
                    <input 
                      type="number" 
                      required
                      value={formData.deposit} 
                      onChange={(e) => setFormData({ ...formData, deposit: Number(e.target.value) })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Category</label>
                    <select 
                      value={formData.category} 
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold"
                    >
                      <option value="Luxury">Luxury</option>
                      <option value="Sport">Sport</option>
                      <option value="SUV / 4x4">SUV / 4x4</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Convertible">Convertible</option>
                      <option value="Economy">Economy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Location Hub</label>
                    <select 
                      value={formData.location} 
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold"
                    >
                      {ALL_LOCATIONS.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Status</label>
                    <select 
                      value={formData.status} 
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold"
                    >
                      <option value="Available">Available</option>
                      <option value="Rented">Rented</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Car Photo Asset</label>
                    <select 
                      value={formData.featuredImage} 
                      onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold"
                    >
                      {Array.from({ length: 20 }, (_, i) => {
                        const num = String(i + 1).padStart(2, '0');
                        return <option key={num} value={`/images/cars/car-${num}.jpg`}>Car Photo {num}</option>;
                      })}
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
                  <button 
                    type="button" 
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-2.5 bg-[#FFA633] text-white font-bold rounded-xl shadow"
                  >
                    {editingCar ? 'Update Car' : 'Save & Publish'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
