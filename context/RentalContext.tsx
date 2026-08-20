'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle, Booking, CarCategory, Transmission } from '../types/rental';
import { VEHICLES_DATA } from '../data/vehicles';

interface SearchCriteria {
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
}

interface FilterState {
  category: string;
  location: string;
  transmission: string;
  seats: number | null;
  maxPrice: number;
  selectedFeatures: string[];
  searchQuery: string;
}

interface RentalContextType {
  vehicles: Vehicle[];
  bookings: Booking[];
  wishlist: string[];
  searchCriteria: SearchCriteria;
  filters: FilterState;
  setSearchCriteria: React.Dispatch<React.SetStateAction<SearchCriteria>>;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  toggleWishlist: (vehicleId: string) => void;
  isInWishlist: (vehicleId: string) => boolean;
  createBooking: (bookingData: Omit<Booking, 'id' | 'reservationNumber' | 'createdAt'>) => Booking;
  cancelBooking: (bookingId: string) => void;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (id: string, updated: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  filteredVehicles: Vehicle[];
}

const defaultSearchCriteria: SearchCriteria = {
  pickupLocation: 'Nassau Airport (NAS)',
  returnLocation: 'Nassau Airport (NAS)',
  pickupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
  pickupTime: '10:00',
  returnDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
  returnTime: '10:00'
};

const defaultFilters: FilterState = {
  category: 'All',
  location: 'All',
  transmission: 'All',
  seats: null,
  maxPrice: 350,
  selectedFeatures: [],
  searchQuery: ''
};

const INITIAL_DEMO_BOOKINGS: Booking[] = [
  {
    id: 'book-101',
    reservationNumber: 'RES-2026-004412',
    vehicleId: 'car-1',
    vehicle: VEHICLES_DATA[0],
    pickupLocation: 'Nassau Airport (NAS)',
    returnLocation: 'Nassau Airport (NAS)',
    pickupDate: '2026-08-25',
    pickupTime: '10:00',
    returnDate: '2026-08-29',
    returnTime: '10:00',
    days: 4,
    dailyRate: 110,
    rentalSubtotal: 440,
    selectedExtras: [
      { id: 'extra-insurance', name: 'Full Comprehensive Damage Waiver', description: '', price: 25, priceType: 'per_day' }
    ],
    extrasTotal: 100,
    taxes: 54,
    depositAmount: 200,
    totalAmount: 594,
    amountPaid: 594,
    balanceDue: 0,
    paymentType: 'full',
    paymentMethod: 'card',
    customer: {
      fullName: 'John Renter',
      email: 'customer@demo.com',
      phone: '+1 (242) 555-0182',
      address: '14 Bay Street, Nassau, Bahamas',
      driverLicenseNumber: 'DL-BAH-9920148'
    },
    status: 'Confirmed',
    createdAt: '2026-08-20T10:15:00Z'
  },
  {
    id: 'book-102',
    reservationNumber: 'RES-2026-003891',
    vehicleId: 'car-5',
    vehicle: VEHICLES_DATA[4],
    pickupLocation: 'Paradise Island',
    returnLocation: 'Paradise Island',
    pickupDate: '2026-08-10',
    pickupTime: '14:00',
    returnDate: '2026-08-14',
    returnTime: '14:00',
    days: 4,
    dailyRate: 250,
    rentalSubtotal: 1000,
    selectedExtras: [],
    extrasTotal: 0,
    taxes: 100,
    depositAmount: 500,
    totalAmount: 1100,
    amountPaid: 1100,
    balanceDue: 0,
    paymentType: 'full',
    paymentMethod: 'card',
    customer: {
      fullName: 'John Renter',
      email: 'customer@demo.com',
      phone: '+1 (242) 555-0182',
      address: '14 Bay Street, Nassau, Bahamas',
      driverLicenseNumber: 'DL-BAH-9920148'
    },
    status: 'Completed',
    createdAt: '2026-08-05T12:00:00Z'
  }
];

const RentalContext = createContext<RentalContextType | undefined>(undefined);

export const RentalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(VEHICLES_DATA);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_DEMO_BOOKINGS);
  const [wishlist, setWishlist] = useState<string[]>(['car-1', 'car-5']);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>(defaultSearchCriteria);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  useEffect(() => {
    const savedVehicles = localStorage.getItem('dreamsrent_vehicles');
    if (savedVehicles) {
      try { setVehicles(JSON.parse(savedVehicles)); } catch(e) {}
    }
    const savedBookings = localStorage.getItem('dreamsrent_bookings');
    if (savedBookings) {
      try { setBookings(JSON.parse(savedBookings)); } catch(e) {}
    }
    const savedWishlist = localStorage.getItem('dreamsrent_wishlist');
    if (savedWishlist) {
      try { setWishlist(JSON.parse(savedWishlist)); } catch(e) {}
    }
  }, []);

  const toggleWishlist = (vehicleId: string) => {
    setWishlist(prev => {
      const updated = prev.includes(vehicleId) ? prev.filter(id => id !== vehicleId) : [...prev, vehicleId];
      localStorage.setItem('dreamsrent_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const isInWishlist = (vehicleId: string) => wishlist.includes(vehicleId);

  const resetFilters = () => setFilters(defaultFilters);

  const createBooking = (bookingData: Omit<Booking, 'id' | 'reservationNumber' | 'createdAt'>): Booking => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newBooking: Booking = {
      ...bookingData,
      id: 'book-' + Date.now(),
      reservationNumber: `RES-2026-${randomNum}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('dreamsrent_bookings', JSON.stringify(updated));
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b);
    setBookings(updated);
    localStorage.setItem('dreamsrent_bookings', JSON.stringify(updated));
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status } : b);
    setBookings(updated);
    localStorage.setItem('dreamsrent_bookings', JSON.stringify(updated));
  };

  const addVehicle = (vehicle: Vehicle) => {
    const updated = [vehicle, ...vehicles];
    setVehicles(updated);
    localStorage.setItem('dreamsrent_vehicles', JSON.stringify(updated));
  };

  const updateVehicle = (id: string, updatedFields: Partial<Vehicle>) => {
    const updated = vehicles.map(v => v.id === id ? { ...v, ...updatedFields } : v);
    setVehicles(updated);
    localStorage.setItem('dreamsrent_vehicles', JSON.stringify(updated));
  };

  const deleteVehicle = (id: string) => {
    const updated = vehicles.filter(v => v.id !== id);
    setVehicles(updated);
    localStorage.setItem('dreamsrent_vehicles', JSON.stringify(updated));
  };

  const filteredVehicles = vehicles.filter(v => {
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = v.title.toLowerCase().includes(q);
      const matchBrand = v.brand.toLowerCase().includes(q);
      const matchCat = v.category.toLowerCase().includes(q);
      if (!matchTitle && !matchBrand && !matchCat) return false;
    }
    if (filters.category !== 'All' && v.category !== filters.category) return false;
    if (filters.location !== 'All' && v.location !== filters.location) return false;
    if (filters.transmission !== 'All' && v.specs.transmission !== filters.transmission) return false;
    if (filters.seats !== null && v.specs.seats < filters.seats) return false;
    if (v.pricePerDay > filters.maxPrice) return false;
    if (filters.selectedFeatures.length > 0) {
      const hasAll = filters.selectedFeatures.every(f => v.features.includes(f));
      if (!hasAll) return false;
    }
    return true;
  });

  return (
    <RentalContext.Provider value={{
      vehicles,
      bookings,
      wishlist,
      searchCriteria,
      filters,
      setSearchCriteria,
      setFilters,
      resetFilters,
      toggleWishlist,
      isInWishlist,
      createBooking,
      cancelBooking,
      updateBookingStatus,
      addVehicle,
      updateVehicle,
      deleteVehicle,
      filteredVehicles
    }}>
      {children}
    </RentalContext.Provider>
  );
};

export const useRental = () => {
  const context = useContext(RentalContext);
  if (!context) throw new Error('useRental must be used within a RentalProvider');
  return context;
};
