'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types/rental';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole, customEmail?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const DEMO_USERS: Record<UserRole, User> = {
  admin: {
    id: 'user-admin',
    name: 'Admin Administrator',
    email: 'admin@dreamsrent.com',
    role: 'admin',
    avatar: '/images/user_image.jpg',
    phone: '+1 (242) 555-0199',
    address: 'DreamsRent HQ, Nassau, Bahamas'
  },
  vendor: {
    id: 'user-vendor-11',
    name: 'Vendor Demo',
    email: 'vendor11@dreamsrent.com',
    role: 'vendor',
    avatar: '/images/user_image.jpg',
    companyName: 'Island Exotic Cars Ltd',
    phone: '+1 (242) 555-0155',
    address: 'Paradise Island Marina, Bahamas'
  },
  driver: {
    id: 'user-driver-01',
    name: 'Marcus Chauffeur',
    email: 'driver@dreamsrent.com',
    role: 'driver',
    avatar: '/images/user_image.jpg',
    phone: '+1 (242) 555-0177',
    driverLicense: 'BAH-DL-98442-EXP2028',
    address: 'Airport Terminal Hub, Nassau'
  },
  customer: {
    id: 'user-customer',
    name: 'John Renter',
    email: 'customer@demo.com',
    role: 'customer',
    avatar: '/images/user_image.jpg',
    phone: '+1 (242) 555-0182',
    address: '14 Bay Street, Nassau, Bahamas'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Admin as requested by the user
  const [user, setUser] = useState<User | null>(DEMO_USERS.admin);

  useEffect(() => {
    const saved = localStorage.getItem('dreamsrent_auth_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        setUser(DEMO_USERS.admin);
      }
    } else {
      setUser(DEMO_USERS.admin);
    }
  }, []);

  const login = (role: UserRole, customEmail?: string) => {
    const baseUser = DEMO_USERS[role] || DEMO_USERS.admin;
    const finalUser: User = {
      ...baseUser,
      email: customEmail || baseUser.email
    };
    setUser(finalUser);
    localStorage.setItem('dreamsrent_auth_user', JSON.stringify(finalUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dreamsrent_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
