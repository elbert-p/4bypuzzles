// src/app/page.tsx

import { products } from '../data/products';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-4xl mb-8 text-dark-gray">Puzzles</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id}>
            <Link href={`/product/${product.id}`}>
              <div className="cursor-pointer">
                {/* Wrapper div for rounded corners and overflow hidden */}
                <div className="rounded overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover transform transition duration-300 hover:scale-[1.02]"
                  />
                </div>
                <h2 className="text-2xl mt-2 text-dark-gray">{product.name}</h2>
                <p className="text-xl text-gray-700">${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}


