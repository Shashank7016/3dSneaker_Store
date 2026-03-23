"use client";

import { useState } from "react";
import {
  useGLTF,
} from "@react-three/drei";
import Link from "next/link";
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
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-200/15 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/15 rounded-full blur-3xl animate-glow-pulse-delayed" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-rose-200/10 rounded-full blur-3xl animate-glow-pulse" />
      </div>

      {/* Header — floating pill navbar */}
      <header className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="flex items-center justify-between h-14 px-5 bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-sm shadow-gray-200/20">
            {/* Left — back + product info */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div className="h-5 w-px bg-gray-200" />
              <div>
                <h1 className="text-sm font-bold text-gray-900 tracking-tight">{product.name}</h1>
                <p className="text-[11px] text-gray-400 font-medium">${product.price} &middot; Customizer</p>
              </div>
            </div>

            {/* Center — editing badge */}
            {editingCartItem && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                <span className="text-[11px] text-amber-700 font-semibold">Editing cart item</span>
              </div>
            )}

            {/* Right — logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-gray-900 tracking-tight hidden sm:block">Forma</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex h-[calc(100vh-5.5rem)] mt-3 mx-4 sm:mx-6 lg:mx-8 gap-3">
        {/* 3D Viewer */}
        <div className={`relative bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
          showControls ? 'flex-1' : 'flex-[2]'
        }`}>
          <Scene3D
            materials={materialProps}
            size={size}
            isRotating={isRotating}
          />

          {/* Rotation toggle */}
          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className={`absolute top-4 right-16 p-2.5 rounded-xl shadow-sm transition-all duration-300 ${
              isRotating
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white border border-gray-200/50'
            }`}
            title={isRotating ? "Stop Rotation" : "Start Rotation"}
          >
            {isRotating ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>

          {/* 3D Instructions */}
          <div className="absolute bottom-4 left-4 bg-gray-900/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[11px] font-medium">
            Drag to rotate &middot; Scroll to zoom
          </div>
        </div>

        {/* Controls Panel */}
        <div className={`bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl transition-all duration-500 ease-in-out transform ${
          showControls
            ? 'w-96 opacity-100 translate-x-0'
            : 'w-0 opacity-0 translate-x-full overflow-hidden'
        }`}>
          <div className={`h-full flex flex-col transition-opacity duration-300 ${
            showControls ? 'opacity-100 delay-200' : 'opacity-0'
          }`}>
            {/* Panel Header */}
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">Customize</h2>
              <p className="text-xs text-gray-400 mt-0.5">Select a part, then pick colors and materials</p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
              {/* Size Selection */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Size</h3>
                <SizePicker size={size} onChange={setSize} />
              </div>

              {/* Part Selection */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Select Part</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(materialProps).map((part) => (
                    <button
                      type="button"
                      key={part}
                      onClick={() => setSelectedPart(part as ShoePart)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedPart === part
                          ? "bg-gray-900 text-white shadow-sm"
                          : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80"
                      }`}
                    >
                      {part.charAt(0).toUpperCase() + part.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Customization */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  {(selectedPart as string).charAt(0).toUpperCase() + (selectedPart as string).slice(1)} Color
                </h3>

                <div className="bg-gray-50/80 rounded-xl p-4 space-y-4 border border-gray-100">
                  <ColorPicker
                    color={materialProps[selectedPart].color}
                    onChange={(color) => handleMaterialPropChange(selectedPart, "color", color)}
                  />

                  {/* Material Properties */}
                  <div className="space-y-4 pt-2">
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-medium text-gray-500">Roughness</span>
                        <span className="font-semibold text-gray-700">{materialProps[selectedPart].roughness}</span>
                      </div>
                      <input
                        id="roughness-slider"
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={materialProps[selectedPart].roughness}
                        onChange={(e) => handleMaterialPropChange(selectedPart, "roughness", parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-medium text-gray-500">Metalness</span>
                        <span className="font-semibold text-gray-700">{materialProps[selectedPart].metalness}</span>
                      </div>
                      <input
                        id="metalness-slider"
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={materialProps[selectedPart].metalness}
                        onChange={(e) => handleMaterialPropChange(selectedPart, "metalness", parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 border-t border-gray-100 space-y-2.5">
              {editingCartItem ? (
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={handleUpdateExisting}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-xl font-semibold text-sm shadow-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={showUpdatedMessage}
                  >
                    {showUpdatedMessage ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="w-full bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={showAddedMessage}
                  >
                    {showAddedMessage ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-xl font-semibold text-sm shadow-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={showAddedMessage}
                >
                  {showAddedMessage ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Added to Cart!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Add to Cart
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Toggle Panel Button */}
        <button
          type="button"
          onClick={() => setShowControls(!showControls)}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600 p-2.5 rounded-xl shadow-sm border border-gray-200/50 transition-all duration-300 z-20"
          title={showControls ? "Hide Controls" : "Show Controls"}
        >
          {showControls ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

useGLTF.preload("/shoe-draco.glb");
