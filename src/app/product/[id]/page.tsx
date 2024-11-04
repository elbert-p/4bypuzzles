// src/app/product/[id]/page.tsx

'use client';

import { useParams } from 'next/navigation';
import { products, Product } from '../../../data/products';
import Image from 'next/image';
import { useCart } from '../../../context/CartContext';

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product: Product | undefined = products.find((p) => p.id === id);

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <main className="p-8">
      <div className="flex flex-col md:flex-row">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
            className="w-full md:w-1/2 h-auto object-cover max-h-fit md:max-h-full"
        />
        <div className="md:ml-8 mt-4 md:mt-0">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-gray">{product.name}</h1>
        <p className="text-lg md:text-2xl text-gray-700 mt-4">${product.price}</p>
        <p className="mt-4 text-dark-gray">{product.description}</p>
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
