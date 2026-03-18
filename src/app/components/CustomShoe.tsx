"use client";

import { useState } from "react";
import {
  useGLTF,
} from "@react-three/drei";
import { ColorPicker } from "./ColorPicker";
import { SizePicker } from "./SizePicker";
import Scene3D from "./Scene3D";
import type { Product, CartItem, MaterialPropertiesDict, ShoePart } from "../types";

// Define default properties using MaterialPropertiesDict structure
const defaultMaterialProps: MaterialPropertiesDict = {
  laces: { color: "#ffffff", roughness: 0.6, metalness: 0.1 },
  mesh: { color: "#ffffff", roughness: 0.8, metalness: 0.1 },
  caps: { color: "#ffffff", roughness: 0.4, metalness: 0.2 },
  inner: { color: "#ffffff", roughness: 0.7, metalness: 0.1 },
  sole: { color: "#ffffff", roughness: 0.7, metalness: 0.1 },
  stripes: { color: "#ffffff", roughness: 0.3, metalness: 0.3 },
  band: { color: "#ffffff", roughness: 0.5, metalness: 0.2 },
  patch: { color: "#ffffff", roughness: 0.5, metalness: 0.2 },
};

interface CustomShoeProps {
  product: Product | CartItem;
  onClose?: () => void;
  onAddToCart: (item: CartItem) => void;
  onUpdateCart: (item: CartItem) => void;
  editingCartItem?: CartItem;
}

export default function CustomShoe({
  product,
  onClose,
  onAddToCart,
  onUpdateCart,
  editingCartItem,
}: CustomShoeProps) {
  // Initialize state based on whether we are editing a CartItem or customizing a new Product
  const [materialProps, setMaterialProps] = useState<MaterialPropertiesDict>(() => {
    if (editingCartItem?.selectedMaterials) {
      return editingCartItem.selectedMaterials;
    }
    return defaultMaterialProps;
  });

  const [selectedPart, setSelectedPart] = useState<ShoePart>("mesh");
  const [size, setSize] = useState(() => {
    if (editingCartItem) {
      return editingCartItem.selectedSize;
    }
    return "9";
  });

  const [showControls, setShowControls] = useState(true);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [showUpdatedMessage, setShowUpdatedMessage] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  const handleMaterialPropChange = (
    part: ShoePart,
    prop: keyof MaterialPropertiesDict[ShoePart],
    value: string | number
  ) => {
    setMaterialProps((prev) => {
      const updated = { ...prev };
      updated[part] = { ...updated[part], [prop]: value };
      return updated;
    });
  };

  const handleAddAsNew = () => {
    const cartItem: CartItem = {
      ...product,
      selectedSize: size,
      selectedMaterials: materialProps,
      cartItemId: `${product.id}-${Date.now()}-${Math.random()}`,
      isCustomized: true,
      quantity: 1,
    };

    onAddToCart(cartItem);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  const handleUpdateExisting = () => {
    if (editingCartItem) {
      const updatedItem: CartItem = {
        ...editingCartItem,
        selectedSize: size,
        selectedMaterials: materialProps,
        isCustomized: true,
      };

      onUpdateCart(updatedItem);
      setShowUpdatedMessage(true);
      setTimeout(() => setShowUpdatedMessage(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 group"
              >
                <svg className="w-6 h-6 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Customize Your Shoe
                </h1>
                <p className="text-sm text-gray-600">{product.name} - ${product.price}</p>
              </div>
            </div>
            
            {/* Size Change Notice for Customized Shoes */}
            {editingCartItem && (
              <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2">
                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-amber-800 font-medium">You can change the size here for customized shoes</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex h-[calc(100vh-4rem)]">
        {/* 3D Viewer */}
        <div className={`relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
          showControls ? 'flex-1' : 'flex-[2]'
        }`}>
          <Scene3D 
            materials={materialProps} 
            size={size} 
            isRotating={isRotating} 
          />
          
          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className={`absolute top-4 right-16 p-3 rounded-xl shadow-lg transition-all duration-300 ease-out hover:shadow-xl transform hover:scale-105 ${
              isRotating 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700'
            }`}
            title={isRotating ? "Stop Rotation" : "Start Rotation"}
          >
            {isRotating ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>

          {/* 3D Instructions */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs">
            Drag to rotate • Scroll to zoom
          </div>
        </div>

        {/* Controls Panel - Smoother animations */}
        <div className={`bg-white/95 backdrop-blur-sm border-l border-gray-200/50 shadow-xl transition-all duration-500 ease-in-out transform ${
          showControls 
            ? 'w-96 opacity-100 translate-x-0 scale-x-100' 
            : 'w-0 opacity-0 translate-x-full scale-x-0 overflow-hidden'
        }`}>
          <div className={`h-full flex flex-col transition-opacity duration-300 ease-in-out ${
            showControls ? 'opacity-100 delay-200' : 'opacity-0'
          }`}>
            {/* Panel Header */}
            <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50">
              <h2 className="text-xl font-bold text-gray-900">Customize</h2>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Size Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h10a2 2 0 002-2v-4a2 2 0 00-2-2H7" />
                  </svg>
                  Size Selection
                </h3>
                <SizePicker size={size} onChange={setSize} />
              </div>

              {/* Part Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                  Select Part
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(materialProps).map((part) => (
                    <button
                      type="button"
                      key={part}
                      onClick={() => setSelectedPart(part as ShoePart)}
                      className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        selectedPart === part
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"
                      }`}
                    >
                      {part.charAt(0).toUpperCase() + part.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Customization */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h10a2 2 0 002-2v-4a2 2 0 00-2-2H7" />
                  </svg>
                  Customize {(selectedPart as string).charAt(0).toUpperCase() + (selectedPart as string).slice(1)}
                </h3>
                
                <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                  <ColorPicker
                    color={materialProps[selectedPart].color}
                    onChange={(color) => handleMaterialPropChange(selectedPart, "color", color)}
                  />

                  {/* Material Properties */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="roughness-slider" className="block text-sm font-medium text-gray-700 mb-2">
                        Roughness: {materialProps[selectedPart].roughness}
                      </label>
                      <input
                        id="roughness-slider"
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={materialProps[selectedPart].roughness}
                        onChange={(e) => handleMaterialPropChange(selectedPart, "roughness", parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div>
                      <label htmlFor="metalness-slider" className="block text-sm font-medium text-gray-700 mb-2">
                        Metalness: {materialProps[selectedPart].metalness}
                      </label>
                      <input
                        id="metalness-slider"
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={materialProps[selectedPart].metalness}
                        onChange={(e) => handleMaterialPropChange(selectedPart, "metalness", parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50 space-y-3">
              {editingCartItem ? (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleUpdateExisting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={showUpdatedMessage}
                  >
                    {showUpdatedMessage ? (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Updated!
                      </span>
                    ) : (
                      "Update This Item"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleAddAsNew}
                    className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-4 rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={showAddedMessage}
                  >
                    {showAddedMessage ? (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Added!
                      </span>
                    ) : (
                      "Add as New Item"
                    )}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleAddAsNew}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={showAddedMessage}
                >
                  {showAddedMessage ? (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Added to Cart!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01" />
                      </svg>
                      Add to Cart
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Settings Button - Smoother positioning */}
        <button
          type="button"
          onClick={() => setShowControls(!showControls)}
          className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 p-3 rounded-xl shadow-lg transition-all duration-300 ease-out hover:shadow-xl transform hover:scale-105 z-20`}
          title={showControls ? "Hide Controls" : "Show Controls"}
        >
          <div className={`transition-transform duration-300 ease-in-out ${showControls ? 'rotate-0' : 'rotate-180'}`}>
            {showControls ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}

useGLTF.preload("/shoe-draco.glb");
