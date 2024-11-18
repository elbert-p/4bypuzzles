// src/data/products.ts

export interface Color {
  name: string;
  images: string[]; // Array of image paths
}

export interface Material {
  name: string;
  colors: Color[];
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
    price: 11.99,
    description: 'A simple looking puzzle with a creative solution.',
    materials: [
      {
        name: 'MDF',
        colors: [
          {
            name: 'Brown',
            images: ['/images/puzzle1/MDF/classic/2.jpg',
              '/images/puzzle1/MDF/classic/1.jpg',
              '/images/puzzle1/MDF/classic/3.jpg',
              '/images/puzzle1/MDF/classic/4.jpg',
              '/images/puzzle1/MDF/classic/5.jpg',
              '/images/puzzle1/MDF/classic/6.jpg',
            ],
          },
        ],
      },
      {
        name: 'Acrylic',
        colors: [
          {
            name: 'Classic',
            images: ['/images/puzzle1/acrylic/classic/2.jpg',
              '/images/puzzle1/acrylic/classic/1.jpg',
              '/images/puzzle1/acrylic/classic/3.jpg',
              '/images/puzzle1/acrylic/classic/4.jpg',
              '/images/puzzle1/acrylic/classic/5.jpg',
              '/images/puzzle1/acrylic/classic/6.jpg',
              '/images/puzzle1/acrylic/classic/7.jpg'
            ],
          },
          {
            name: 'Charcoal',
            images: ['/images/puzzle1/acrylic/charcoal/2.jpg',
              '/images/puzzle1/acrylic/charcoal/1.jpg',
              '/images/puzzle1/acrylic/charcoal/3.jpg',
              '/images/puzzle1/acrylic/charcoal/4.jpg',
              '/images/puzzle1/acrylic/charcoal/5.jpg',
              '/images/puzzle1/acrylic/charcoal/6.jpg',
            ],
          },
        ],
      },
    ],
    additionalDetails: 'Handcrafted with precision and attention to detail.',
  },
  {
    id: '2',
    name: '11 Square Packing',
    price: 9.99,
    description: 'A classic problem in physical form',
    materials: [
      {
        name: 'MDF',
        colors: [
          {
            name: 'Brown',
            images: ['/images/puzzle2/MDF/classic/2.jpg',
              '/images/puzzle2/MDF/classic/1.jpg',
              '/images/puzzle2/MDF/classic/3.jpg',
              '/images/puzzle2/MDF/classic/4.jpg',
              '/images/puzzle2/MDF/classic/5.jpg',
              '/images/puzzle2/MDF/classic/6.jpg',
            ],
          },
        ],
      },
      {
        name: 'Acrylic',
        colors: [
          {
            name: 'Classic',
            images: ['/images/puzzle2/acrylic/classic/2.jpg',
              '/images/puzzle2/acrylic/classic/1.jpg',
              '/images/puzzle2/acrylic/classic/3.jpg',
              '/images/puzzle2/acrylic/classic/4.jpg',
              '/images/puzzle2/acrylic/classic/5.jpg',
              '/images/puzzle2/acrylic/classic/6.jpg',
            ],
          },
        ],
      },
    ],
    additionalDetails: 'Handcrafted with precision and attention to detail.',
  },
  // Add more products as needed
];
