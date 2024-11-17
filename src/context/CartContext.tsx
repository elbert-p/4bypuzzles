// src/context/CartContext.tsx

'use client';

import { createContext, useState, ReactNode, useContext } from 'react';
import { Product, Material, Color } from '../data/products';

export interface CartItem extends Product {
  quantity: number;
  selectedMaterial: Material;
  selectedColor: Color;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product, material: Material, color: Color) => void;
  removeFromCart: (id: string, materialName: string, colorName: string) => void;
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

  const addToCart = (product: Product, material: Material, color: Color) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.id === product.id &&
          item.selectedMaterial.name === material.name &&
          item.selectedColor.name === color.name
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id &&
          item.selectedMaterial.name === material.name &&
          item.selectedColor.name === color.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          { ...product, quantity: 1, selectedMaterial: material, selectedColor: color },
        ];
      }
    });
  };

  const removeFromCart = (id: string, materialName: string, colorName: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedMaterial.name === materialName &&
            item.selectedColor.name === colorName
          )
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
