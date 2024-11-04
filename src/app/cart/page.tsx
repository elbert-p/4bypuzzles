// src/app/cart/page.tsx

'use client';

import { useCart } from '../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) return <p className="p-8">Your cart is empty.</p>;

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      {cart.map((item) => (
        <div key={item.id} className="flex items-center mb-4">
          <Image src={item.image} alt={item.name} width={100} height={100} />
          <div className="ml-4 flex-1">
            <h2 className="text-2xl">{item.name}</h2>
            <p>${item.price} x {item.quantity}</p>
            <p>Total: ${item.price * item.quantity}</p>
          </div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}
      <h2 className="text-2xl font-bold mt-8">Total: ${total.toFixed(2)}</h2>
      <Link href="/checkout">
        <a className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded">
          Proceed to Checkout
        </a>
      </Link>
    </main>
  );
}
