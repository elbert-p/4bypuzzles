// src/app/product/[id]/page.tsx

'use client';

import { products, Product } from '../../../data/products';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useCart } from '../../../context/CartContext';

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
    const { addToCart } = useCart();
    const product: Product | undefined = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="p-8">
      <div className="flex flex-col md:flex-row">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="w-full md:w-1/2 h-auto"
        />
        <div className="md:ml-8">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl text-gray-700 mt-4">${product.price}</p>
          <p className="mt-4">{product.description}</p>
          <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
        </div>
      </div>
    </main>
  );
}



