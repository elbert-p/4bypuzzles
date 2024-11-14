// src/context/CartContext.tsx

'use client';

import { createContext, useState, ReactNode, useContext } from 'react';
import { Product, Material } from '../data/products';

export interface CartItem extends Product {
  quantity: number;
  selectedMaterial: Material;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product, material: Material) => void;
  removeFromCart: (id: string, materialName: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, material: Material) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.selectedMaterial.name === material.name
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.selectedMaterial.name === material.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1, selectedMaterial: material }];
      }
    });
  };

  const removeFromCart = (id: string, materialName: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === id && item.selectedMaterial.name === materialName)
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
