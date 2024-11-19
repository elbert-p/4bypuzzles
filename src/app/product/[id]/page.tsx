// src/app/product/[id]/page.tsx

'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { products, Product, Material, Color } from '../../../data/products';
import Image from 'next/image';
import { useCart } from '../../../context/CartContext';
import { useState } from 'react';
import AddToCartPopup from '../../../components/AddToCartPopup';
import { CartItem } from '../../../context/CartContext';
import { Swiper, SwiperSlide } from 'swiper/react';

// Adjust the import based on your Swiper version
// For Swiper v9 and above:
import { Pagination, Navigation } from 'swiper/modules';

// For Swiper v8 and below, uncomment the following line and comment out the above line:
// import { Pagination, Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import Custom Swiper Styles
import '../../../swiper-custom.css'; // Adjust the path based on your project structure

export default function ProductPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  // Find the product or set a default empty product
  const foundProduct = products.find((p) => p.id === id);
  const productNotFound = !foundProduct;
  const product: Product = foundProduct || {
    id: '',
    name: 'Product Not Found',
    price: 0,
    description: '',
    materials: [],
    additionalDetails: '',
  };

  // Now, all Hooks are called unconditionally
  const materialParam = searchParams.get('material');
  const colorParam = searchParams.get('color');

  // Provide default values to prevent errors if materials are empty
  const defaultMaterial: Material =
    product.materials.find((m) => m.name === materialParam) ||
    product.materials[0] ||
    { name: '', colors: [] };

  const defaultColor: Color =
    defaultMaterial.colors.find((c) => c.name === colorParam) ||
    defaultMaterial.colors[0] ||
    { name: '', images: [] };

  const [showPopup, setShowPopup] = useState(false);
  const [addedItem, setAddedItem] = useState<CartItem | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(defaultMaterial);
  const [selectedColor, setSelectedColor] = useState<Color>(defaultColor);
  const [mainImage, setMainImage] = useState<string>(defaultColor.images[0] || '');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  if (productNotFound) {
    return <p>Product not found.</p>;
  }

  const handleMaterialSelect = (material: Material) => {
    setSelectedMaterial(material);
    const newDefaultColor = material.colors[0] || { name: '', images: [] };
    setSelectedColor(newDefaultColor);
    setMainImage(newDefaultColor.images[0] || '');
    setSelectedImageIndex(0);
  };

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
    setMainImage(color.images[0] || '');
    setSelectedImageIndex(0);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedMaterial, selectedColor);
    setAddedItem({ ...product, selectedMaterial, selectedColor, quantity: 1 });
    setShowPopup(true);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] overflow-hidden p-8 text-dark-gray">
      <main className="flex flex-grow items-top justify-center w-full max-w-screen-lg">
        <div className="flex flex-col md:flex-row w-full">
          {/* Left Column: Thumbnails (Hidden on small screens) */}
          <div className="hidden md:flex flex-col items-start md:items-center mr-4">
            {selectedColor.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${selectedColor.name} ${index + 1}`}
                width={80}
                height={80}
                className={`object-cover w-20 h-20 rounded cursor-pointer border-2 mb-2 transition duration-200 ${
                  selectedImageIndex === index ? 'border-black' : 'border-transparent'
                }`}
                onMouseEnter={() => {
                  setMainImage(image);
                  setSelectedImageIndex(index);
                }}
              />
            ))}
          </div>

          {/* Main Image / Swipeable Gallery */}
          <div className="md:flex-1 flex items-start justify-start pb-0 md:pb-8 md:pr-0 relative">
            {/* Desktop View */}
            <div className="hidden md:block w-full h-auto rounded">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-contain w-full h-auto rounded"
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center bg-gray-200">
                  <p>No Image Available</p>
                </div>
              )}
            </div>

            {/* Mobile View: Swiper Gallery */}
            <div className="block md:hidden w-full h-auto rounded">
              {selectedColor.images.length > 0 ? (
                <Swiper
                  modules={[Pagination, Navigation]}
                  spaceBetween={10}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  navigation
                  className="mySwiper"
                >
                  {selectedColor.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={image}
                        alt={`${selectedColor.name} ${index + 1}`}
                        width={400}
                        height={400}
                        className="object-contain w-full h-auto rounded"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="w-full h-96 flex items-center justify-center bg-gray-200">
                  <p>No Image Available</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col justify-start items-start mt-4 md:ml-8 md:mt-0">
            <h1 className="text-3xl md:text-4xl">{product.name}</h1>
            <p className="text-xl md:text-2xl text-gray-700 mt-4">${product.price}</p>
            <p className="mt-2 md:mt-4 text-base md:text-lg">{product.description}</p>
            {/* Material Selector */}
            {product.materials.length > 0 && (
              <>
                <div className="mt-4 flex space-x-2">
                  {product.materials.map((material: Material) => (
                    <Image
                      key={material.name}
                      src={material.colors[0]?.images[0] || ''}
                      alt={material.name}
                      width={80}
                      height={80}
                      className={`object-cover w-20 h-20 rounded cursor-pointer border-2 transition duration-200 ${
                        selectedMaterial.name === material.name ? 'border-black' : 'border-transparent'
                      }`}
                      onClick={() => handleMaterialSelect(material)}
                    />
                  ))}
                </div>
                <div className="mt-2">
                  <span className="text-lg font-semibold">Material: </span>
                  <span className="text-lg">{selectedMaterial.name}</span>
                </div>
              </>
            )}
            {/* Color Selector */}
            {selectedMaterial.colors.length > 1 && (
              <div className="mt-4">
                {/* Removed the "Select Color:" span */}
                <div className="flex space-x-2">
                  {selectedMaterial.colors.map((color: Color) => (
                    <Image
                      key={color.name}
                      src={color.images[0] || ''}
                      alt={color.name}
                      width={80}
                      height={80}
                      className={`object-cover w-16 h-16 rounded cursor-pointer border-2 transition duration-200 ${
                        selectedColor.name === color.name ? 'border-black' : 'border-transparent'
                      }`}
                      onClick={() => handleColorSelect(color)}
                    />
                  ))}
                </div>
                <div className="mt-2">
                  <span className="text-lg font-semibold">Color: </span>
                  <span className="text-lg">{selectedColor.name}</span>
                </div>
              </div>
            )}
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
      {showPopup && addedItem && (
        <AddToCartPopup item={addedItem} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}
