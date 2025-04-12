'use client';

import { ReactNode } from 'react';
import { Header } from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { AuthProvider } from '@/context/AuthContext';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </AuthProvider>
  );
}
