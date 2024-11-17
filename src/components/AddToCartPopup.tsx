// src/components/AddToCartPopup.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CartItem } from '../context/CartContext';

interface AddToCartPopupProps {
  item: CartItem;
  onClose: () => void;
}

export default function AddToCartPopup({ item, onClose }: AddToCartPopupProps) {
  const [visible, setVisible] = useState(true);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (visible && !hovering) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [visible, hovering, onClose]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-20 right-4 bg-white shadow-lg border rounded-lg p-4 w-80 z-50 text-dark-gray"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <button
        className="absolute top-2 right-2 text-gray-500 text-2xl"
        onClick={() => {
          setVisible(false);
          onClose();
        }}
      >
        ×
      </button>
      <h3 className="text-lg mb-2">
        <span className="text-green-500">✔️</span> Item added to your cart
      </h3>
      <div className="flex items-center">
        <Image
          src={item.selectedColor.images[0]}
          alt={item.name}
          width={50}
          height={50}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="ml-4">
          <h4 className="text-lg font-semibold">{item.name}</h4>
          <p className="text-sm">Material: {item.selectedMaterial.name}</p>
          <p className="text-sm">Color: {item.selectedColor.name}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <Link
          href="/cart"
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 text-center transform transition duration-300 hover:scale-102 active:scale-98"
        >
          View My Cart
        </Link>
        <Link
          href="/checkout"
          className="bg-green-500 text-white px-4 py-2 rounded mb-2 text-center transform transition duration-300 hover:scale-102 active:scale-98"
        >
          Check Out
        </Link>
        <button
          className="text-sm transform transition duration-300 hover:scale-102 active:scale-98"
          onClick={() => {
            setVisible(false);
            onClose();
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
