"use client";
import React from "react";
import Image from "next/image";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import { ShoeModel } from "./ShoeModel";
import CustomShoe from "./CustomShoe";
import Scene3D from "./Scene3D";

// --- Define Interfaces Locally (Move to types file later) ---
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
interface CartItem extends Product {
  selectedSize: string;
  selectedMaterials: MaterialPropertiesDict;
  cartItemId: string; // Ensure this is defined
}
// ------------------------------------------------------------

const shoeProducts: Product[] = [
  {
    id: 1,
    name: "Classic Runner",
    price: 120,
    description: "Our signature running shoe with classic styling",
    isNew: true,
    url: "https://cdn.pixabay.com/photo/2016/06/03/17/35/shoes-1433925_640.jpg",
    type: "Running",
  },
  {
    id: 2,
    name: "Sport Elite",
    price: 140,
    description: "High-performance athletic shoe",
    url: "https://cdn.pixabay.com/photo/2016/03/27/22/16/fashion-1284496_640.jpg",
    type: "Running",
  },
  {
    id: 3,
    name: "Urban Walker",
    price: 110,
    description: "Perfect for city life and casual wear",
    url: "https://cdn.pixabay.com/photo/2014/12/31/11/41/shoes-584850_640.jpg",
    type: "Casual",
  },
  {
    id: 4,
    name: "Trail Blazer",
    price: 150,
    description: "Designed for outdoor adventures",
    url: "https://cdn.pixabay.com/photo/2021/03/08/12/31/oxford-shoes-6078993_640.jpg",
    type: "Training",
  },
  {
    id: 5,
    name: "Comfort Plus",
    price: 130,
    description: "Maximum comfort for everyday wear",
    isNew: true,
    url: "https://cdn.pixabay.com/photo/2021/03/08/12/06/oxford-shoes-6078951_640.jpg",
    type: "Casual",
  },
  {
    id: 6,
    name: "Speed Demon",
    price: 160,
    description: "Built for velocity and performance",
    url: "https://cdn.pixabay.com/photo/2018/12/17/23/39/baby-shoes-3881526_640.jpg",
    type: "Running",
  },
  {
    id: 7,
    name: "Daily Trainer",
    price: 125,
    description: "Your go-to training companion",
    type: "Training",
    url: "https://cdn.pixabay.com/photo/2020/06/29/04/33/shoes-5351339_640.jpg",
  },
  {
    id: 8,
    name: "Street Style",
    price: 145,
    description: "Where fashion meets function",
    type: "Casual",
    url: "https://cdn.pixabay.com/photo/2015/07/02/05/53/shoes-828414_640.jpg",
  },
  {
    id: 9,
    name: "Pro Performance",
    price: 170,
    description: "Professional grade athletic shoe",
    isNew: true,
    type: "Training",
    url: "https://cdn.pixabay.com/photo/2018/11/30/02/11/winter-boots-3846915_640.jpg",
  },
];

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

// --- ShoeCard Component (Inline Definition for now) ---
const ShoeCard = ({
  product,
  onCustomizeClick,
}: {
  product: Product;
  onCustomizeClick: (product: Product) => void;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const imageUrl = React.useMemo(() => {
    if (product.url) return product.url;
    const shoeImageIds = [
      "2295441",
      "4071345",
      "5539594",
      "5827733",
      "7562438",
      "2916622",
      "2843633",
    ];
    const imageIndex = product.id % shoeImageIds.length;
    const imageId = shoeImageIds[imageIndex];
    return `https://pixabay.com/get/g${imageId}_1280.jpg`;
  }, [product]);

  return (
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
        <div className="h-64 relative bg-gray-50 flex items-center justify-center">
          <div
            className={`transform transition-transform duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          >
            <img
              src={imageUrl}
              alt={product.name}
              className="object-cover h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
          <span className="text-lg font-bold text-blue-600">
            ${product.price}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <button
            onClick={() => onCustomizeClick(product)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Customize
          </button>
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300">
            Quick Add
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main ShoeStore Component ---
const ShoeStore = () => {
  const [sortOption, setSortOption] = React.useState<string>("");
  const [filterType, setFilterType] = React.useState<string>("");
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<
    Product | CartItem | null
  >(null);

  // --- Cart Functions ---
  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    console.log("Added to cart:", item);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateCartItem = (updatedItem: CartItem) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === updatedItem.cartItemId ? updatedItem : item
      )
    );
  };
  // --------------------

  // Function to open customizer for a NEW product
  const handleCustomizeNew = (productToCustomize: Product) => {
    setEditingItem(productToCustomize);
  };

  // Function to open customizer for an EXISTING cart item
  const handleEditCartItem = (cartItemToEdit: CartItem) => {
    setEditingItem(cartItemToEdit);
    setIsCartOpen(false); // Close cart drawer when editing
  };

  // Function to close the customizer
  const handleCloseCustomizer = () => {
    setEditingItem(null);
  };

  // Apply sorting and filtering to products
  const filteredProducts = React.useMemo(() => {
    let result = [...shoeProducts];

    // Apply type filter if selected
    if (filterType && filterType !== "All") {
      result = result.filter((product) => product.type === filterType);
    }

    // Apply sorting
    if (sortOption === "Lowest to Highest") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Highest to Lowest") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [sortOption, filterType]);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-20">
        {" "}
        {/* Make header sticky */}
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Custom Shoe Collection
          </h1>
          {/* Placeholder for CartIcon */}
          <button onClick={() => setIsCartOpen(true)} className="relative p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <select
                className="border rounded-lg px-3 py-2"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort by Price</option>
                <option value="Lowest to Highest">Lowest to Highest</option>
                <option value="Highest to Lowest">Highest to Lowest</option>
              </select>
              <select
                className="border rounded-lg px-3 py-2"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Running">Running</option>
                <option value="Training">Training</option>
                <option value="Casual">Casual</option>
              </select>
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredProducts.length} of {shoeProducts.length} models
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No shoes match your filter criteria.
              </p>
              <button
                onClick={() => {
                  setFilterType("");
                  setSortOption("");
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ShoeCard
                  key={product.id}
                  product={product}
                  onCustomizeClick={handleCustomizeNew}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Placeholder for CartDrawer */}
      {isCartOpen && (
        <div className="fixed inset-y-0 right-0 w-96 max-w-full bg-white shadow-xl z-30 p-6 transform transition ease-in-out duration-300 translate-x-0">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)}>&times;</button>
          </div>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.cartItemId}
                  className="flex space-x-4 border-b pb-4"
                >
                  {/* Basic cart item display - enhance later */}
                  <img
                    src={
                      item.url ||
                      `https://pixabay.com/get/g${(item.id % 7) + 1}_1280.jpg`
                    }
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Size: {item.selectedSize}
                    </p>
                    <p className="text-sm font-semibold">${item.price}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => handleEditCartItem(item)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {/* Overlay when cart is open */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}

      {/* Customizer Overlay */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-white overflow-auto">
          <CustomShoe
            key={
              (editingItem as CartItem).cartItemId ||
              (editingItem as Product).id
            }
            product={editingItem} // Use 'product' prop name
            onClose={handleCloseCustomizer}
            onAddToCart={addToCart}
            onUpdateCart={updateCartItem}
          />
        </div>
      )}
    </div>
  );
};

export default ShoeStore;
