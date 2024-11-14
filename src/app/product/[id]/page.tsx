// src/app/product/[id]/page.tsx

'use client';

import { useParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { products, Product, Material } from '../../../data/products';
import Image from 'next/image';
import { useCart } from '../../../context/CartContext';
import { useState } from 'react';
import AddToCartPopup from '../../../components/AddToCartPopup';
import { CartItem } from  '../../../context/CartContext'

export default function ProductPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  const product: Product | undefined = products.find((p) => p.id === id);

  const [showPopup, setShowPopup] = useState(false);
  const [addedItem, setAddedItem] = useState<CartItem | null>(null);
  
  const materialParam = product
  ? searchParams.get('material')
  : null;
  const defaultMaterial: Material = product
  ? product.materials.find((m) => m.name === materialParam) ||
    product.materials.find((m) => m.name === 'Wood') ||
    product.materials[0]
  : ({} as Material); // Fallback to an empty object or a default Material

  const [selectedMaterial, setSelectedMaterial] = useState<Material>(defaultMaterial);
  const [mainImage, setMainImage] = useState<string>(defaultMaterial.image);

  if (!product) {
    return <p>Product not found.</p>;
  }

  const handleMaterialSelect = (material: Material) => {
    setSelectedMaterial(material);
    setMainImage(material.image);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedMaterial);
    setAddedItem({ ...product, selectedMaterial, quantity: 1 });
    setShowPopup(true);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] overflow-hidden p-8 text-dark-gray">
      <main className="flex flex-grow items-top justify-center w-full max-w-screen-lg">
        <div className="flex flex-col md:flex-row w-full">
          <div className="md:flex-1 flex items-start justify-start pb-0 md:pb-8 md:pr-0 relative">
            <Image
              src={mainImage}
              alt={product.name}
              width={400}
              height={400}
              className="object-contain w-full h-auto rounded"
            />
          </div>
          <div className="flex flex-col justify-start items-start mt-4 md:ml-8 md:mt-0">
            <h1 className="text-3xl md:text-4xl">{product.name}</h1>
            <p className="text-xl md:text-2xl text-gray-700 mt-4">${product.price}</p>
            <p className="mt-2 md:mt-4 text-base md:text-lg">{product.description}</p>
            {/* Material selection images moved above "Selected Material" text */}
            <div className="mt-4 flex space-x-2">
              {product.materials.map((material: Material) => (
                <Image
                  key={material.name}
                  src={material.image}
                  alt={material.name}
                  width={80}
                  height={80}
                  className={`object-cover w-20 h-20 rounded cursor-pointer border-2 ${
                    selectedMaterial.name === material.name ? 'border-black' : 'border-transparent'
                  }`}
                  onMouseEnter={() => setMainImage(material.image)}
                  onMouseLeave={() => setMainImage(selectedMaterial.image)}
                  onClick={() => handleMaterialSelect(material)}
                />
              ))}
            </div>
            <div className="mt-4">
              <span className="text-lg font-semibold">Selected Material: </span>
              <span className="text-lg">{selectedMaterial.name}</span>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white text-lg px-4 py-2 rounded transform transition duration-300 hover:scale-102 active:scale-98"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Additional Details</h2>
              <p className="mt-2 md:mt-4 text-base md:text-lg">{product.additionalDetails}</p>
            </div>
          </div>
        </div>
      </main>
      {showPopup && addedItem && <AddToCartPopup item={addedItem} onClose={() => setShowPopup(false)} />}
    </div>
  );
}
