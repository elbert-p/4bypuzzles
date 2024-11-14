// src/components/Navbar.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-dark-cream px-4 py-2 text-black flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        <Image src="/logo.png" alt="" width="60" height="60" />
      </Link>
      <Link
        href="/cart"
        className="text-lg transform transition duration-300 hover:scale-102 active:scale-98">
        Cart ({cartItemCount})
      </Link>
    </nav>
  );
}
