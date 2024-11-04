// src/components/Navbar.tsx

'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-dark-cream p-4 text-black flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        4by Puzzles
      </Link>
      <Link href="/cart" className="text-lg">
        Cart ({cartItemCount})
      </Link>
    </nav>
  );
}
