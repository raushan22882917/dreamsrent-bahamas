'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types/rental';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole, customEmail?: string) => void;
  loginWithCredentials: (email: string, password?: string) => Promise<boolean>;
  switchRole: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const DEMO_USERS: Record<UserRole, User> = {
  admin: {
    id: 'usr_admin_1',
    name: 'Admin Administrator',
    email: 'admin@dreamsrent.com',
    role: 'admin',
    avatar: '/images/team/team_ceo_male_1787225259487.jpg',
    phone: '+1 (242) 555-0199',
    address: 'DreamsRent HQ, Nassau, Bahamas'
  },
  vendor: {
    id: 'usr_vendor_1',
    name: 'Carlos Host (Vendor)',
    email: 'vendor@dreamsrent.com',
    role: 'vendor',
    avatar: '/images/team/team_business_head_1787225318994.jpg',
    companyName: 'Island Exotic Cars Ltd',
    phone: '+1 (242) 555-0155',
    address: 'Paradise Island Marina, Bahamas'
  },
  driver: {
    id: 'usr_driver_1',
    name: 'Marcus Chauffeur',
    email: 'driver@dreamsrent.com',
    role: 'driver',
    avatar: '/images/team/team_ceo_female_1787225300600.jpg',
    phone: '+1 (242) 555-0177',
    driverLicense: 'BAH-DL-98442-EXP2028',
    address: 'Airport Terminal Hub, Nassau'
  },
  customer: {
    id: 'usr_customer_1',
    name: 'John Renter',
    email: 'customer@dreamsrent.com',
    role: 'customer',
    avatar: '/images/user_image.jpg',
    phone: '+1 (242) 555-0182',
    address: '14 Bay Street, Nassau, Bahamas'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Admin
  const [user, setUser] = useState<User | null>(DEMO_USERS.admin);

  useEffect(() => {
    const saved = localStorage.getItem('dreamsrent_auth_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
  }, []);

  const login = (role: UserRole, customEmail?: string) => {
    const baseUser = DEMO_USERS[role];
    const newUser: User = {
      ...baseUser,
      email: customEmail || baseUser.email
    };
    setUser(newUser);
    localStorage.setItem('dreamsrent_auth_user', JSON.stringify(newUser));
  };

  const loginWithCredentials = async (email: string, password = 'password123'): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('dreamsrent_auth_user', JSON.stringify(data.user));
        return true;
      }
    } catch (e) {
      console.warn('API login fallback:', e);
    }

    // Fallback based on email
    const lower = email.toLowerCase();
    if (lower.includes('admin')) login('admin', email);
    else if (lower.includes('vendor')) login('vendor', email);
    else if (lower.includes('driver')) login('driver', email);
    else login('customer', email);
    return true;
  };

  const switchRole = (role: UserRole) => {
    login(role);
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
        loginWithCredentials,
        switchRole,
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
