// src/app/product/[id]/page.tsx

'use client';

import { useParams } from 'next/navigation';
import { products } from '../../../data/products';
import Image from 'next/image';
import { useCart } from '../../../context/CartContext';

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] overflow-hidden p-8">
      <main className="flex flex-grow items-top justify-center w-full max-w-screen-lg">
        <div className="flex flex-col md:flex-row w-full">
          <div className="md:flex-1 flex items-start justify-start pb-0 md:pb-8 md:pr-0">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="object-contain w-full h-auto rounded"
            />
          </div>
          <div className="flex flex-col justify-start items-start mt-4 md:ml-8 md:mt-0">
            <h1 className="text-3xl md:text-4xl font-bold text-dark-gray">
              {product.name}
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 mt-4">
              ${product.price}
            </p>
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
    </div>
  );
}
