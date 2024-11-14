// src/data/products.ts

export interface Material {
  name: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  materials: Material[];
  additionalDetails: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Nine Piece Classic',
    price: 9.99,
    description: 'A simple looking puzzle with a creative solution.',
    materials: [
      { name: 'Wood', image: '/images/puzzle1.jpg' },
      { name: 'Acrylic', image: '/images/puzzle2.jpg' },
      { name: 'MDF', image: '/images/puzzle1.jpg' },
    ],
    additionalDetails: 'Handcrafted with precision and attention to detail.',
  },
  {
    id: '2',
    name: 'Puzzle Two',
    price: 14.99,
    description: 'An intermediate puzzle for enthusiasts.',
    materials: [
      { name: 'Wood', image: '/images/puzzle2.jpg'},
      { name: 'Acrylic', image: '/images/puzzle1.jpg' },// /images/puzzle2_acrylic.jpg
      { name: 'MDF', image: '/images/puzzle2.jpg' }, // /images/puzzle2_mdf.jpg
    ],
    additionalDetails: 'Challenging yet satisfying to solve.',
  },
  // Add more products as needed
];
