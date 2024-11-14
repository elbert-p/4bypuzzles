// src/app/page.tsx

'use client';

import { products, Product, Material } from '../data/products';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  return (
    <main className="p-8 text-dark-gray">
      <h1 className="text-4xl mb-8">Puzzles</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

function ProductCard({ product }: { product: Product }) {
  const woodMaterial = product.materials.find((m) => m.name === 'Wood') || product.materials[0];
  const [mainImage, setMainImage] = useState<string>(woodMaterial.image);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(woodMaterial);

  const handleMaterialHover = (material: Material) => {
    setMainImage(material.image);
    setSelectedMaterial(material);
  };

  const handleMaterialLeave = () => {
    // Keep the last hovered material as the main image
  };

  return (
    <div>
      <Link
        href={{
          pathname: `/product/${product.id}`,
          query: { material: selectedMaterial.name },
        }}
      >
        <div className="cursor-pointer">
          <div className="rounded overflow-hidden relative">
            <Image
              src={mainImage}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-auto object-cover transform transition duration-300 hover:scale-[1.02]"
            />
            <div className="absolute bottom-0 left-0 flex space-x-2 p-2">
              {product.materials.map((material: Material) => (
                <Image
                  key={material.name}
                  src={material.image}
                  alt={material.name}
                  width={60}
                  height={60}
                  className={`object-cover w-12 h-12 rounded cursor-pointer border-2 ${
                    selectedMaterial.name === material.name ? 'border-black' : 'border-transparent'
                  }`}
                  onMouseEnter={() => handleMaterialHover(material)}
                  onMouseLeave={handleMaterialLeave}
                />
              ))}
            </div>
          </div>
          <h2 className="text-2xl mt-2">{product.name}</h2>
          <p className="text-xl text-gray-700">${product.price}</p>
        </div>
      </Link>
    </div>
  );
}
