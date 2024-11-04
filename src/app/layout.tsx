// src/app/layout.tsx

import { ReactNode } from 'react';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="bg-cream min-h-screen">
            <Navbar />
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
