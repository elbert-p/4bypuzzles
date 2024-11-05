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
      name: 'Nine piece classic',
      price: 9.99,
      description: 'A simple looking puzzle with a creative solution.',
      image: '/images/puzzle1.jpg',
    },
    {
      id: '2',
      name: 'Puzzle Two',
      price: 14.99,
      description: 'An intermediate puzzle for enthusiasts.',
      image: '/images/puzzle2.jpg',
    },
    {
      id: '3',
      name: 'Puzzle',
      price: 9.99,
      description: 'An intermediate puzzle for enthusiasts.',
      image: '/images/puzzle1.jpg',
    },
    {
      id: '4',
      name: 'Puzzle',
      price: 14.99,
      description: 'An intermediate puzzle for enthusiasts.',
      image: '/images/puzzle1.jpg',
    },
    // Add more products as needed
  ];
  