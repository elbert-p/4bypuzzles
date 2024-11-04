// src/components/Navbar.tsx

'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link href="/">
        <a className="text-xl font-bold">4 By Puzzles</a>
      </Link>
      <Link href="/cart">
        <a className="text-lg">
          Cart ({cartItemCount})
        </a>
      </Link>
    </nav>
  );
}
