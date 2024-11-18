// src/components/Navbar.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white px-4 py-2 text-black flex justify-between items-center border-b border-gray-200">
      <Link href="/" className="text-xl font-bold">
        <Image src="/logo.png" alt="Logo" width="60" height="60" />
      </Link>
      <Link
        href="/cart"
        className="text-lg transform transition duration-300 hover:scale-102 active:scale-98"
      >
        Cart ({cartItemCount})
      </Link>
    </nav>
  );
}
