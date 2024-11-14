// src/app/cart/page.tsx

'use client';

import { useCart } from '../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="flex flex-col items-center justify-start min-h-screen pt-[20vh]">
        <h1 className="text-3xl md:text-4xl mb-8 text-dark-gray">
          Your cart is empty
        </h1>
        <Link
          href="/"
          className="bg-blue-500 text-white px-6 py-3 rounded text-base md:text-lg transform transition duration-300 hover:scale-102 active:scale-98"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-dark-gray mb-8">
        Your Cart
      </h1>
      {cart.map((item) => (
        <div
          key={`${item.id}-${item.selectedMaterial.name}`}
          className="flex items-center mb-4 flex-nowrap md:flex-wrap"
        >
          <Image
            src={item.selectedMaterial.image}
            alt={item.name}
            width={150}
            height={150}
            className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
          />
          <div className="ml-4 flex-1 text-dark-gray text-lg md:text-xl">
            <h2 className="text-xl md:text-2xl">{item.name}</h2>
            <p>Material: {item.selectedMaterial.name}</p>
            <p>
              ${item.price} x {item.quantity}
            </p>
            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded text-sm md:text-base mt-0 md:mt-2 transform transition duration-300 hover:scale-102 active:scale-98"
            onClick={() => removeFromCart(item.id, item.selectedMaterial.name)}
          >
            Remove
          </button>
        </div>
      ))}
      <h2 className="text-xl md:text-2xl font-bold mt-8 text-dark-gray">
        Total: ${total.toFixed(2)}
      </h2>
      <Link
        href="/checkout"
        className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded text-base md:text-lg transform transition duration-300 hover:scale-102 active:scale-98"
      >
        Proceed to Checkout
      </Link>
    </main>
  );
}
