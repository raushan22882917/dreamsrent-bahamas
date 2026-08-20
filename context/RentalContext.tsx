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
  maxPrice: 1000,
  selectedFeatures: [],
  searchQuery: ''
};

const INITIAL_DEMO_BOOKINGS: Booking[] = [
  {
    id: 'book-101',
    reservationNumber: 'RES-2026-004412',
    vehicleId: 'mazda-1',
    vehicle: VEHICLES_DATA[0],
    pickupLocation: 'Tower Bridge',
    returnLocation: 'Tower Bridge',
    pickupDate: '2026-08-25',
    pickupTime: '10:00',
    returnDate: '2026-08-29',
    returnTime: '10:00',
    days: 4,
    dailyRate: 100,
    rentalSubtotal: 400,
    selectedExtras: [
      { id: 'extra-insurance', name: 'Full Comprehensive Damage Waiver', description: '', price: 25, priceType: 'per_day' }
    ],
    extrasTotal: 100,
    taxes: 50,
    depositAmount: 200,
    totalAmount: 550,
    amountPaid: 550,
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
    reservationNumber: 'RES-2026-004388',
    vehicleId: 'mazda-2',
    vehicle: VEHICLES_DATA[1],
    pickupLocation: 'Big Ben',
    returnLocation: 'Big Ben',
    pickupDate: '2026-08-22',
    pickupTime: '14:00',
    returnDate: '2026-08-26',
    returnTime: '14:00',
    days: 4,
    dailyRate: 120,
    rentalSubtotal: 480,
    selectedExtras: [
      { id: 'extra-gps', name: 'GPS Navigation System', description: '', price: 15, priceType: 'per_day' }
    ],
    extrasTotal: 60,
    taxes: 54,
    depositAmount: 250,
    totalAmount: 594,
    amountPaid: 200,
    balanceDue: 394,
    paymentType: 'deposit',
    paymentMethod: 'card',
    customer: {
      fullName: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      phone: '+1 (242) 555-0133',
      address: '22 Ocean Club Dr, Paradise Island',
      driverLicenseNumber: 'DL-US-98124501'
    },
    status: 'Active Rental',
    createdAt: '2026-08-19T14:30:00Z'
  }
];

const RentalContext = createContext<RentalContextType | undefined>(undefined);

export const RentalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(VEHICLES_DATA);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_DEMO_BOOKINGS);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>(defaultSearchCriteria);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('dreamsrent_wishlist');
    if (savedWishlist) {
      try { setWishlist(JSON.parse(savedWishlist)); } catch (e) {}
    }

    const savedBookings = localStorage.getItem('dreamsrent_bookings');
    if (savedBookings) {
      try { setBookings(JSON.parse(savedBookings)); } catch (e) {}
    }

    const savedVehicles = localStorage.getItem('dreamsrent_custom_vehicles');
    if (savedVehicles) {
      try { 
        const parsed = JSON.parse(savedVehicles);
        if (Array.isArray(parsed) && parsed.length >= 20) {
          setVehicles(parsed);
        } else {
          setVehicles(VEHICLES_DATA);
        }
      } catch (e) {
        setVehicles(VEHICLES_DATA);
      }
    } else {
      setVehicles(VEHICLES_DATA);
    }
  }, []);

  const toggleWishlist = (vehicleId: string) => {
    setWishlist(prev => {
      const next = prev.includes(vehicleId)
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId];
      localStorage.setItem('dreamsrent_wishlist', JSON.stringify(next));
      return next;
    });
  };

  const isInWishlist = (vehicleId: string) => wishlist.includes(vehicleId);

  const resetFilters = () => setFilters(defaultFilters);

  const createBooking = (bookingData: Omit<Booking, 'id' | 'reservationNumber' | 'createdAt'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `book-${Date.now()}`,
      reservationNumber: `RES-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString()
    };

    setBookings(prev => {
      const updated = [newBooking, ...prev];
      localStorage.setItem('dreamsrent_bookings', JSON.stringify(updated));
      return updated;
    });

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => {
      const updated = prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b);
      localStorage.setItem('dreamsrent_bookings', JSON.stringify(updated));
      return updated;
    });
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev => {
      const updated = prev.map(b => b.id === bookingId ? { ...b, status } : b);
      localStorage.setItem('dreamsrent_bookings', JSON.stringify(updated));
      return updated;
    });
  };

  const addVehicle = (newCar: Vehicle) => {
    setVehicles(prev => {
      const updated = [newCar, ...prev];
      localStorage.setItem('dreamsrent_custom_vehicles', JSON.stringify(updated));
      return updated;
    });
  };

  const updateVehicle = (id: string, updated: Partial<Vehicle>) => {
    setVehicles(prev => {
      const next = prev.map(v => v.id === id ? { ...v, ...updated } : v);
      localStorage.setItem('dreamsrent_custom_vehicles', JSON.stringify(next));
      return next;
    });
  };

  const deleteVehicle = (id: string) => {
    setVehicles(prev => {
      const next = prev.filter(v => v.id !== id);
      localStorage.setItem('dreamsrent_custom_vehicles', JSON.stringify(next));
      return next;
    });
  };

  // Compute Filtered Vehicles
  const filteredVehicles = vehicles.filter(car => {
    if (filters.category !== 'All' && car.category !== filters.category) return false;
    if (filters.location !== 'All' && car.location !== filters.location) return false;
    if (filters.transmission !== 'All' && car.specs.transmission !== filters.transmission) return false;
    if (filters.seats !== null && car.specs.seats < filters.seats) return false;
    if (car.pricePerDay > filters.maxPrice) return false;
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const match = car.title.toLowerCase().includes(q) ||
                    car.brand.toLowerCase().includes(q) ||
                    car.model.toLowerCase().includes(q) ||
                    car.location.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <RentalContext.Provider
      value={{
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
      }}
    >
      {children}
    </RentalContext.Provider>
  );
};

export const useRental = () => {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error('useRental must be used within a RentalProvider');
  }
  return context;
};
