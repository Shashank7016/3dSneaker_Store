"use client"
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { ShoeModel } from './ShoeModel';
import CustomShoe from './CustomShoe';
const shoeProducts = [
  {
    id: 1,
    name: "Classic Runner",
    price: 120,
    description: "Our signature running shoe with classic styling",
    isNew: true
  },
  {
    id: 2,
    name: "Sport Elite",
    price: 140,
    description: "High-performance athletic shoe"
  },
  {
    id: 3,
    name: "Urban Walker",
    price: 110,
    description: "Perfect for city life and casual wear"
  },
  {
    id: 4,
    name: "Trail Blazer",
    price: 150,
    description: "Designed for outdoor adventures"
  },
  {
    id: 5,
    name: "Comfort Plus",
    price: 130,
    description: "Maximum comfort for everyday wear",
    isNew: true
  },
  {
    id: 6,
    name: "Speed Demon",
    price: 160,
    description: "Built for velocity and performance"
  },
  {
    id: 7,
    name: "Daily Trainer",
    price: 125,
    description: "Your go-to training companion"
  },
  {
    id: 8,
    name: "Street Style",
    price: 145,
    description: "Where fashion meets function"
  },
  {
    id: 9,
    name: "Pro Performance",
    price: 170,
    description: "Professional grade athletic shoe",
    isNew: true
  }
];

const ShoeCard = ({ product }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          {product.isNew && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                New
              </span>
            </div>
          )}
          <div className="h-64 relative bg-gray-50">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 1, 5]} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <ShoeModel 
                colors={{}} 
                size="9" 
                isRotating={isHovered}
                isCustomView={true}
              />
              <OrbitControls 
                enablePan={false} 
                enableZoom={false}
                enableRotate={!isHovered}
              />
              <Environment preset="studio" />
            </Canvas>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
            <span className="text-lg font-bold text-blue-600">${product.price}</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Customize
            </button>
            <button
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300"
            >
              Quick Add
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="w-full max-w-4xl bg-white rounded-lg">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="sr-only">Close</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <CustomShoe />
          </div>
        </div>
      )}
    </>
  );
};

const ShoeStore = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Custom Shoe Collection
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <select className="border rounded-lg px-3 py-2">
                <option>Sort by Price</option>
                <option>Lowest to Highest</option>
                <option>Highest to Lowest</option>
              </select>
              <select className="border rounded-lg px-3 py-2">
                <option>Filter by Type</option>
                <option>Running</option>
                <option>Training</option>
                <option>Casual</option>
              </select>
            </div>
            <div className="text-sm text-gray-500">
              Showing {shoeProducts.length} models
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shoeProducts.map((product) => (
              <ShoeCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShoeStore;