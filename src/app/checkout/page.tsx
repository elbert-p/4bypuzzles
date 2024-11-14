// src/app/checkout/page.tsx

'use client';

import { useCart } from '../../context/CartContext';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="p-8 text-dark-gray">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
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
        </div>
      ))}
      <h2 className="text-xl md:text-2xl font-bold mt-8 text-dark-gray">
        Total Amount: ${total.toFixed(2)}
      </h2>
      <p className="mt-4">Payment processing will be implemented here.</p>
    </main>
  );
}
