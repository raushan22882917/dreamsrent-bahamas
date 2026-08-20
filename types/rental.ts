export type Transmission = 'Automatic' | 'Manual' | 'Dual-Clutch (PDK)';
export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
export type CarCategory = 'Luxury' | 'Sport' | 'SUV / 4x4' | 'Sedan' | 'Convertible' | 'Economy';
export type VehicleStatus = 'Available' | 'Reserved' | 'Rented' | 'Maintenance';

export interface Vehicle {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  category: CarCategory;
  pricePerDay: number;
  hourlyPrice?: number;
  deposit: number;
  featuredImage: string;
  galleryImages: string[];
  specs: {
    transmission: Transmission;
    mileage: string;
    fuelType: FuelType;
    seats: number;
    doors: number;
    luggage: string;
    engine?: string;
    airConditioning: boolean;
  };
  features: string[];
  location: string;
  rating: number;
  reviewsCount: number;
  status: VehicleStatus;
  licensePlate?: string;
  vin?: string;
  featured?: boolean;
}

export interface BookingExtra {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: 'per_day' | 'fixed';
}

export interface Booking {
  id: string;
  reservationNumber: string;
  vehicleId: string;
  vehicle: Vehicle;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  days: number;
  dailyRate: number;
  rentalSubtotal: number;
  selectedExtras: BookingExtra[];
  extrasTotal: number;
  taxes: number;
  depositAmount: number;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
  paymentType: 'full' | 'deposit';
  paymentMethod: 'card' | 'cash' | 'apple_pay' | 'google_pay';
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    driverLicenseNumber: string;
    licenseExpiry?: string;
    emergencyContact?: string;
  };
  status: 'Pending' | 'Confirmed' | 'Picked Up' | 'Active Rental' | 'Returned' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export type UserRole = 'admin' | 'vendor' | 'driver' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  companyName?: string;
  driverLicense?: string;
}
