// src/data/products.ts

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
  }
  
  export const products: Product[] = [
    {
      id: '1',
      name: 'Puzzle One',
      price: 19.99,
      description: 'A challenging puzzle for beginners.',
      image: '/images/puzzle1.jpg',
    },
    {
      id: '2',
      name: 'Puzzle Two',
      price: 24.99,
      description: 'An intermediate puzzle for enthusiasts.',
      image: '/images/puzzle2.jpg',
    },
    {
      id: '3',
      name: 'Puzzle Two',
      price: 24.99,
      description: 'An intermediate puzzle for enthusiasts.',
      image: '/images/puzzle2.jpg',
    },
    {
      id: '4',
      name: 'Puzzle Two',
      price: 24.99,
      description: 'An intermediate puzzle for enthusiasts.',
      image: '/images/puzzle2.jpg',
    },
    // Add more products as needed
  ];
  