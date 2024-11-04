// src/app/page.tsx

import { products } from '../data/products';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">Puzzles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
              <Link href={`/product/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
                <h2 className="text-2xl font-semibold mt-4">{product.name}</h2>
                <p className="text-xl text-gray-700">${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
