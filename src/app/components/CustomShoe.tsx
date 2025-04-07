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
  const [cart, setCart] = useState<CartItem[]>([]); // Keep local cart state for now
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
      };
      onUpdateCart(updatedItem);
      console.log("Updated Cart Item:", updatedItem);
      setShowUpdatedMessage(true);
      setTimeout(() => setShowUpdatedMessage(false), 2000);
    } else {
      // --- Add new item ---
      const newItem: CartItem = {
        ...(product as Product), // Spread base product info
        selectedSize: size,
        selectedMaterials: { ...materialProps },
        cartItemId: `${product.id}-${Date.now()}`,
      };
      onAddToCart(newItem);
      console.log("Added new item to Cart:", newItem);
      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 2000);
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
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Fullscreen 3D canvas */}
      <div className="absolute inset-0 pt-16">
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
          />
          <Environment preset="studio" />
        </Scene3D>
      </div>

      {/* Camera controls - floating bottom left */}
      <div className="absolute bottom-4 left-4 z-10 space-x-2">
        <button
          type="button"
          onClick={() => setIsRotating((prev) => !prev)}
          className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full shadow-lg hover:bg-white transition-colors duration-300"
        >
          {isRotating ? "Stop Rotation" : "Start Rotation"}
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
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
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
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
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
          onClick={() => setShowControls(true)}
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-blue-600 text-white px-3 py-6 rounded-l-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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
