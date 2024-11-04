// src/app/checkout/page.tsx

'use client';

import { useCart } from '../../context/CartContext';

export default function CheckoutPage() {
  const { cart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="p-8 text-dark-gray">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      <p>Total Amount: ${total.toFixed(2)}</p>
      <p>Payment processing will be implemented here.</p>
    </main>
  );
}
