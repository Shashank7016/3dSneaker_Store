"use client";

import { useState, useEffect } from "react";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  useGLTF,
} from "@react-three/drei";
import { ShoeModel } from "./ShoeModel";
import { ColorPicker } from "./ColorPicker";
import { SizePicker } from "./SizePicker";
import Scene3D from "./Scene3D";

// Define base interfaces first
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  isNew?: boolean;
  url?: string;
  type?: string;
}

interface MaterialProperties {
  color: string;
  roughness: number;
  metalness: number;
}

// Define the dictionary type using MaterialProperties
interface MaterialPropertiesDict {
  laces: MaterialProperties;
  mesh: MaterialProperties;
  caps: MaterialProperties;
  inner: MaterialProperties;
  sole: MaterialProperties;
  stripes: MaterialProperties;
  band: MaterialProperties;
  patch: MaterialProperties;
  [key: string]: MaterialProperties;
}

// Define CartItem using Product and MaterialPropertiesDict
interface CartItem extends Product {
  selectedSize: string;
  selectedMaterials: MaterialPropertiesDict;
  cartItemId: string;
  isCustomized: boolean;
}

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

type ShoePart = keyof typeof defaultMaterialProps;

interface CustomShoeProps {
  // Accept either a base Product (for new customization)
  // or a CartItem (when editing an existing one)
  product: Product | CartItem;
  onClose?: () => void;
  onAddToCart: (item: CartItem) => void; // Function to add a new configuration to cart
  onUpdateCart: (item: CartItem) => void; // Function to update an existing cart item
}

export default function CustomShoe({
  product,
  onClose,
  onAddToCart,
  onUpdateCart,
}: CustomShoeProps) {
  // Initialize state based on whether we are editing a CartItem or customizing a new Product
  const initialMaterials =
    (product as CartItem).selectedMaterials || defaultMaterialProps;
  const initialSize = (product as CartItem).selectedSize || "9";

  const [materialProps, setMaterialProps] =
    useState<MaterialPropertiesDict>(initialMaterials);
  const [selectedPart, setSelectedPart] = useState<ShoePart | null>(null);
  const [size, setSize] = useState<string>(initialSize);
  const [isRotating, setIsRotating] = useState(false);
  const [showControls, setShowControls] = useState(false);
  // We no longer need local cart state as it's managed in the parent component
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [showUpdatedMessage, setShowUpdatedMessage] = useState(false);

  // Reset state if the product prop changes (e.g., editing a different item)
  useEffect(() => {
    setMaterialProps(
      (product as CartItem).selectedMaterials || defaultMaterialProps
    );
    setSize((product as CartItem).selectedSize || "9");
    setSelectedPart(null); // Reset selected part when item changes
  }, [product]);

  // Add keyboard event listener for rotation (press 'R' to toggle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'r') {
        setIsRotating(prev => !prev);
      }
      // Add escape key to close customizer if onClose is provided
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Show controls panel after a small delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Generic handler to update any material property for the selected part
  const handleMaterialPropChange = (
    part: ShoePart,
    prop: keyof MaterialProperties,
    value: string | number
  ) => {
    setMaterialProps((prev) => {
      const newProps = {
        ...prev,
        [part]: {
          ...prev[part],
          [prop]: value,
        },
      };
      // Log the updated state right after setting it
      console.log("CustomShoe: Updated materialProps State:", newProps);
      return newProps;
    });
  };

  const handleSaveOrUpdate = () => {
    // Check if we are editing an existing CartItem by looking for cartItemId
    if ((product as CartItem).cartItemId) {
      // --- Update existing item ---
      const updatedItem: CartItem = {
        ...(product as CartItem), // Spread existing cart item data
        selectedSize: size,
        selectedMaterials: { ...materialProps }, // Use current materials
        isCustomized: true, // Mark as customized
      };
      onUpdateCart(updatedItem);
      console.log("Updated Cart Item:", updatedItem);
      setShowUpdatedMessage(true);
      // The parent component will handle navigation after the timeout
    } else {
      // --- Add new item ---
      const newItem: CartItem = {
        ...(product as Product), // Spread base product info
        selectedSize: size,
        selectedMaterials: { ...materialProps },
        cartItemId: `${product.id}-${Date.now()}`,
        isCustomized: true, // Mark as customized
      };
      onAddToCart(newItem);
      console.log("Added new item to Cart:", newItem);
      setShowAddedMessage(true);
      // The parent component will handle navigation after the timeout
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-gray-900">
      {/* Top header bar */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm px-6 py-4 flex justify-between items-center shadow-md">
        <h2 className="text-2xl font-bold">
          {product ? `Customize ${product.name}` : "Custom Sneaker Designer"}
        </h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg transition-colors border border-blue-200 hover:border-blue-300 shadow-sm"
            aria-label="Return to store"
            title="Return to store (or press ESC)"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Store</span>
          </button>
        )}
      </div>

      {/* Fullscreen 3D canvas */}
      <div className={`absolute inset-0 pt-16 ${isRotating ? 'rotation-active' : ''}`}>
        <style jsx>{`
          .rotation-active::after {
            content: '';
            position: absolute;
            bottom: 16px;
            left: 50%;
            transform: translateX(-50%);
            width: 150px;
            height: 4px;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.6), transparent);
            border-radius: 2px;
            opacity: ${isRotating ? 0.8 : 0};
            transition: opacity 0.3s ease;
          }
        `}</style>

        {/* First-time user tip - shows only when not rotating */}
        {!isRotating && (
          <div className="absolute bottom-20 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm max-w-xs animate-fade-in-out">
            <p>💡 Tip: Click "Start Rotation" to view the shoe from all angles</p>
          </div>
        )}

        <Scene3D
          className="h-full w-full"
          fallback={
            <div className="h-full w-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">Unable to load 3D view</p>
            </div>
          }
        >
          <PerspectiveCamera makeDefault position={[0, 1, 5]} />
          <ambientLight intensity={0.7} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={0.8}
          />
          <ShoeModel
            colors={materialProps}
            size={size}
            isRotating={isRotating}
          />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            autoRotate={isRotating}
            autoRotateSpeed={4}
          />
          <Environment preset="studio" />
        </Scene3D>
      </div>

      {/* Camera controls - floating bottom left */}
      <div className="absolute bottom-4 left-4 z-10 space-x-2">
        <button
          type="button"
          onClick={() => setIsRotating(!isRotating)}
          className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full shadow-lg hover:bg-white transition-colors duration-300 flex items-center gap-2 group relative"
          aria-label={isRotating ? "Stop rotation" : "Start rotation"}
          title={`${isRotating ? "Stop" : "Start"} rotation (or press 'R' key)`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${isRotating ? 'animate-spin' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {isRotating ? "Stop Rotation" : "Start Rotation"}
          <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Press 'R' key to toggle rotation
          </span>
        </button>
      </div>

      {/* Controls panel - sliding in from right */}
      <div
        className={`absolute top-16 bottom-0 right-0 w-80 bg-white/90 backdrop-blur-sm shadow-lg p-6 transition-transform duration-500 ease-in-out ${
          showControls ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto space-y-8 flex flex-col">
          {/* Size and Customization Sections */}
          <div className="flex-grow space-y-8">
            {/* Size selection */}
            <div>
              <SizePicker size={size} onChange={setSize} />
            </div>

            {/* Color customization section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Select Part</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(materialProps).map((part) => (
                    <button
                      type="button"
                      key={part}
                      onClick={() => setSelectedPart(part as ShoePart)}
                      className={`px-3 py-2 rounded-md ${
                        selectedPart === part
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      } hover:bg-blue-500 hover:text-white transition-colors duration-300`}
                    >
                      {part}
                    </button>
                  ))}
                </div>
              </div>
              {selectedPart && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Choose Color</h3>
                    <ColorPicker
                      color={materialProps[selectedPart].color}
                      onChange={(color) =>
                        handleMaterialPropChange(selectedPart, "color", color)
                      }
                    />
                  </div>

                  {/* Roughness Slider */}
                  <div>
                    <label
                      htmlFor="roughness"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Roughness:{" "}
                      {materialProps[selectedPart].roughness.toFixed(2)}
                    </label>
                    <input
                      type="range"
                      id="roughness"
                      min="0"
                      max="1"
                      step="0.01"
                      value={materialProps[selectedPart].roughness}
                      onChange={(e) =>
                        handleMaterialPropChange(
                          selectedPart,
                          "roughness",
                          Number.parseFloat(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
                      style={{
                        background: 'linear-gradient(to right, #3b82f6, #dbeafe)',
                        height: '8px',
                        borderRadius: '4px'
                      }}
                    />
                  </div>

                  {/* Metalness Slider */}
                  <div>
                    <label
                      htmlFor="metalness"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Metalness:{" "}
                      {materialProps[selectedPart].metalness.toFixed(2)}
                    </label>
                    <input
                      type="range"
                      id="metalness"
                      min="0"
                      max="1"
                      step="0.01"
                      value={materialProps[selectedPart].metalness}
                      onChange={(e) =>
                        handleMaterialPropChange(
                          selectedPart,
                          "metalness",
                          Number.parseFloat(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
                      style={{
                        background: 'linear-gradient(to right, #9ca3af, #e5e7eb)',
                        height: '8px',
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Price and Save/Update Button */}
          <div className="pt-6 border-t mt-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">
                ${product?.price || 120}
              </span>
              <button
                type="button"
                onClick={handleSaveOrUpdate} // Call the unified handler
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={showAddedMessage || showUpdatedMessage} // Disable during feedback
              >
                {(product as CartItem).cartItemId
                  ? showUpdatedMessage
                    ? "Updated!"
                    : "Update Cart Item"
                  : showAddedMessage
                  ? "Added!"
                  : "Add to Cart"}
              </button>
            </div>
            {/* Hide/show controls toggle */}
            <button
              type="button"
              onClick={() => setShowControls(false)}
              className="mt-4 px-4 py-2 border border-gray-300 text-gray-600 rounded-full w-full hover:bg-gray-100 transition-colors duration-300"
            >
              Hide Controls
            </button>
          </div>
        </div>
      </div>

      {/* Show controls button (when hidden) */}
      {!showControls && (
        <button
          type="button"
          onClick={() => setShowControls(true)}
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-blue-600 text-white px-3 py-6 rounded-l-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

useGLTF.preload("/shoe-draco.glb");
