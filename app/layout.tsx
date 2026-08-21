import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { RentalProvider } from '../context/RentalContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

import { AppShell } from '../components/layout/AppShell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bahamas Luxury Drive - Luxury & Executive Car Rental Service',
  description: 'Bahamas premier car rental service. Rent sports convertibles, luxury sedans, and 7-passenger SUVs across Nassau Airport, Paradise Island, and Cable Beach.',
  keywords: 'car rental bahamas, nassau airport car rental, paradise island luxury rental, rent porsche bahamas, bahamas suv rental'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <RentalProvider>
            <AppShell>
              {children}
            </AppShell>
          </RentalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
