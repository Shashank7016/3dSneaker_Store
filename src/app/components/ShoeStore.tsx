"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product, CartItem, MaterialPropertiesDict } from "../types";

export const shoeProducts: Product[] = [
  {
    id: 1,
    name: "Classic Runner",
    price: 120,
    description: "Our signature running shoe with classic styling and premium comfort",
    isNew: true,
    url: "https://cdn.pixabay.com/photo/2016/06/03/17/35/shoes-1433925_640.jpg",
    type: "Running",
  },
  {
    id: 2,
    name: "Sport Elite",
    price: 140,
    description: "High-performance athletic shoe engineered for champions",
    url: "https://cdn.pixabay.com/photo/2016/03/27/22/16/fashion-1284496_640.jpg",
    type: "Running",
  },
  {
    id: 3,
    name: "Urban Walker",
    price: 110,
    description: "Perfect for city life and casual wear with modern aesthetics",
    url: "https://cdn.pixabay.com/photo/2014/12/31/11/41/shoes-584850_640.jpg",
    type: "Casual",
  },
  {
    id: 4,
    name: "Trail Blazer",
    price: 150,
    description: "Designed for outdoor adventures with superior grip and durability",
    url: "https://cdn.pixabay.com/photo/2021/03/08/12/31/oxford-shoes-6078993_640.jpg",
    type: "Training",
  },
  {
    id: 5,
    name: "Comfort Plus",
    price: 130,
    description: "Maximum comfort for everyday wear with cloud-like cushioning",
    isNew: true,
    url: "https://cdn.pixabay.com/photo/2021/03/08/12/06/oxford-shoes-6078951_640.jpg",
    type: "Casual",
  },
  {
    id: 6,
    name: "Speed Demon",
    price: 160,
    description: "Built for velocity and performance with aerodynamic design",
    url: "https://cdn.pixabay.com/photo/2018/12/17/23/39/baby-shoes-3881526_640.jpg",
    type: "Running",
  },
  {
    id: 7,
    name: "Daily Trainer",
    price: 125,
    description: "Your go-to training companion for every workout session",
    type: "Training",
    url: "https://cdn.pixabay.com/photo/2020/06/29/04/33/shoes-5351339_640.jpg",
  },
  {
    id: 8,
    name: "Street Style",
    price: 145,
    description: "Where fashion meets function in perfect harmony",
    type: "Casual",
    url: "https://cdn.pixabay.com/photo/2015/07/02/05/53/shoes-828414_640.jpg",
  },
  {
    id: 9,
    name: "Pro Performance",
    price: 170,
    description: "Professional grade athletic shoe for serious athletes",
    isNew: true,
    type: "Training",
    url: "https://cdn.pixabay.com/photo/2018/11/30/02/11/winter-boots-3846915_640.jpg",
  },
];

// Define default properties using MaterialPropertiesDict structure
export const defaultMaterialProps: MaterialPropertiesDict = {
  laces: { color: "#ffffff", roughness: 0.6, metalness: 0.1 },
  mesh: { color: "#ffffff", roughness: 0.8, metalness: 0.1 },
  caps: { color: "#ffffff", roughness: 0.4, metalness: 0.2 },
  inner: { color: "#ffffff", roughness: 0.7, metalness: 0.1 },
  sole: { color: "#ffffff", roughness: 0.7, metalness: 0.1 },
  stripes: { color: "#ffffff", roughness: 0.3, metalness: 0.3 },
  band: { color: "#ffffff", roughness: 0.5, metalness: 0.2 },
  patch: { color: "#ffffff", roughness: 0.5, metalness: 0.2 },
};

// Available shoe sizes
const availableSizes = ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"];

// --- Scroll Reveal Hook ---
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

// --- ShoeCard Component ---
const ShoeCard = ({
  product,
  onQuickAddClick,
}: {
  product: Product;
  onQuickAddClick: (product: Product) => void;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const imageUrl = React.useMemo(() => {
    if (product.url) return product.url;
    const shoeImageIds = ["2295441", "4071345", "5539594", "5827733", "7562438", "2916622", "2843633"];
    const imageIndex = product.id % shoeImageIds.length;
    const imageId = shoeImageIds[imageIndex];
    return `https://pixabay.com/get/g${imageId}_1280.jpg`;
  }, [product]);

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden card-hover border border-gray-100 shadow-sm flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* New badge */}
      {product.isNew && (
        <div className="absolute top-3 left-3 z-20">
          <span className="bg-indigo-500 text-white px-2.5 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider">
            New
          </span>
        </div>
      )}

      {/* Image container */}
      <div className="relative h-56 sm:h-64 bg-gray-50 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton" />
        )}
        <img
          src={imageUrl}
          alt={product.name}
          className={`w-full h-full object-cover img-zoom ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Hover overlay with actions */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`} />

        {/* Quick action buttons on hover */}
        <div className={`absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-400 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}>
          <Link
            href={`/customize/${product.id}`}
            className="flex-1 bg-white/95 backdrop-blur-sm text-gray-900 text-center py-2.5 px-4 rounded-lg btn-text hover:bg-white transition-colors"
          >
            Customize
          </Link>
          <button
            type="button"
            onClick={() => onQuickAddClick(product)}
            className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-colors"
            title="Quick Add"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="card-title group-hover:text-indigo-600 transition-colors duration-200">
              {product.name}
            </h3>
            <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-md mt-1.5 font-medium">
              {product.type}
            </span>
          </div>
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
        </div>

        <p className="card-body text-sm mt-2 flex-1">{product.description}</p>
      </div>
    </div>
  );
};

// --- Main ShoeStore Component ---
const ShoeStore = () => {
  const router = useRouter();
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [showQuickAddNotification, setShowQuickAddNotification] = React.useState(false);
  const [filterType, setFilterType] = React.useState("");
  const [sortOption, setSortOption] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [headerScrolled, setHeaderScrolled] = React.useState(false);
  const productsRef = React.useRef<HTMLDivElement>(null);

  // Initialize scroll reveal
  useScrollReveal();

  // Track header scroll state
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Load cart from localStorage
  React.useEffect(() => {
    const savedCart = localStorage.getItem('shoeCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        const cartWithQuantity = parsedCart.map((item: CartItem) => ({
          ...item,
          quantity: item.quantity || 1
        }));
        setCart(cartWithQuantity);
      } catch (e) {
        console.error('Error loading cart from localStorage:', e);
      }
    }
  }, []);

  // Enhanced cart statistics
  const cartStats = React.useMemo(() => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const uniqueItems = cart.length;
    return { total, itemCount, uniqueItems };
  }, [cart]);

  // Enhanced filtering and sorting
  const filteredAndSortedProducts = React.useMemo(() => {
    const filtered = shoeProducts.filter(product => {
      const matchesType = !filterType || product.type === filterType;
      const matchesSearch = !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });

    if (sortOption === "Lowest to Highest") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Highest to Lowest") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Newest") {
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return filtered;
  }, [sortOption, filterType, searchQuery]);

  // Cart functions
  const quickAddToCart = (product: Product) => {
    const newItemTemplate: Partial<CartItem> = {
      ...product,
      selectedSize: "9",
      selectedMaterials: { ...defaultMaterialProps },
      isCustomized: false,
      quantity: 1,
    };

    const existingItemIndex = cart.findIndex(item =>
      item.id === product.id &&
      item.selectedSize === "9" &&
      !item.isCustomized
    );

    let newCart: CartItem[];
    if (existingItemIndex >= 0) {
      newCart = cart.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      const newItem: CartItem = {
        ...newItemTemplate as CartItem,
        cartItemId: `${product.id}-${Date.now()}`,
      };
      newCart = [...cart, newItem];
    }

    setCart(newCart);
    localStorage.setItem('shoeCart', JSON.stringify(newCart));
    setShowQuickAddNotification(true);
    setTimeout(() => setShowQuickAddNotification(false), 3000);
  };

  const updateCartItemQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    const newCart = cart.map(item =>
      item.cartItemId === cartItemId
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(newCart);
    localStorage.setItem('shoeCart', JSON.stringify(newCart));
  };

  const updateCartItemSize = (cartItemId: string, newSize: string) => {
    const item = cart.find(item => item.cartItemId === cartItemId);
    if (!item || item.isCustomized) return;

    const existingItemIndex = cart.findIndex(cartItem =>
      cartItem.id === item.id &&
      cartItem.selectedSize === newSize &&
      !cartItem.isCustomized &&
      cartItem.cartItemId !== cartItemId
    );

    let newCart: CartItem[];
    if (existingItemIndex >= 0) {
      newCart = cart.map((cartItem, index) =>
        index === existingItemIndex
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem.cartItemId === cartItemId ? null : cartItem
      ).filter(Boolean) as CartItem[];
    } else {
      newCart = cart.map(cartItem =>
        cartItem.cartItemId === cartItemId
          ? { ...cartItem, selectedSize: newSize }
          : cartItem
      );
    }

    setCart(newCart);
    localStorage.setItem('shoeCart', JSON.stringify(newCart));
  };

  const removeFromCart = (cartItemId: string) => {
    const newCart = cart.filter(item => item.cartItemId !== cartItemId);
    setCart(newCart);
    localStorage.setItem('shoeCart', JSON.stringify(newCart));
  };

  const handleEditCartItem = (item: CartItem) => {
    router.push(`/customize/${item.id}?editItem=${item.cartItemId}`);
  };


  const filterCategories = [
    { label: "All", value: "" },
    { label: "Running", value: "Running" },
    { label: "Casual", value: "Casual" },
    { label: "Training", value: "Training" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto">
            <div className="w-16 h-16 border-[3px] border-gray-200 border-t-indigo-500 rounded-full animate-spin" />
          </div>
          <p className="mt-6 text-gray-400 text-sm font-normal">Loading your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] relative">
      {/* ===== Sticky Header ===== */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        headerScrolled
          ? "glass border-b border-gray-200/40"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-gray-900 tracking-tight">Forma</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-sm mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search shoes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 shadow-sm transition-all duration-200 placeholder:text-gray-400"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartStats.itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">{cartStats.itemCount}</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ===== Category Filter Pills ===== */}
      <section ref={productsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="reveal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="section-heading">Our Collection</h2>
            <p className="text-sm text-gray-400 mt-1.5 font-normal">
              {filteredAndSortedProducts.length} shoes available
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Category Pills */}
            <div className="flex gap-1 bg-gray-100 border border-gray-200/80 p-1 rounded-lg">
              {filterCategories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFilterType(cat.value)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    filterType === cat.value
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 shadow-sm cursor-pointer font-medium"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="Lowest to Highest">Price: Low to High</option>
              <option value="Highest to Lowest">Price: High to Low</option>
              <option value="Newest">Newest First</option>
            </select>
          </div>
        </div>
      </section>

      {/* ===== Product Grid ===== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {filteredAndSortedProducts.map((product) => (
            <div key={product.id} className="reveal h-full">
              <ShoeCard product={product} onQuickAddClick={quickAddToCart} />
            </div>
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-base font-normal">No shoes match your search.</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(""); setFilterType(""); }}
              className="mt-3 text-indigo-500 font-medium text-sm hover:text-indigo-600 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* ===== Footer ===== */}
      <footer className="bg-white border-t border-gray-100 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-md flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-base font-semibold text-gray-900">Forma</span>
            </Link>
            <p className="text-sm text-gray-400 font-normal">
              &copy; 2024 Forma. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ===== Cart Sidebar ===== */}
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-out animate-slide-in-right flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">Your Cart</h3>
                <p className="text-xs text-gray-400 mt-0.5 font-normal">{cartStats.itemCount} item{cartStats.itemCount !== 1 ? 's' : ''}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium text-sm mb-1">Your cart is empty</p>
                  <p className="text-gray-400 text-sm font-normal mb-6">Start adding some shoes!</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="btn-premium btn-text text-white px-6 py-2.5 rounded-lg"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.cartItemId} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100/80 transition-colors duration-200">
                      <div className="flex gap-3">
                        <img
                          src={item.url || `https://pixabay.com/get/g${(item.id % 7) + 1}_1280.jpg`}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h4 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h4>
                              {item.isCustomized && (
                                <span className="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] rounded-full mt-0.5 font-medium">
                                  Customized
                                </span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.cartItemId)}
                              className="text-gray-300 hover:text-red-400 p-0.5 transition-colors flex-shrink-0"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          {/* Size */}
                          <div className="flex items-center mt-1.5 gap-2">
                            <span className="text-xs text-gray-400">Size:</span>
                            <select
                              value={item.selectedSize}
                              onChange={(e) => updateCartItemSize(item.cartItemId, e.target.value)}
                              className={`text-xs border border-gray-200 rounded-lg px-1.5 py-0.5 ${
                                item.isCustomized ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'
                              }`}
                              disabled={item.isCustomized}
                            >
                              {availableSizes.map(size => (
                                <option key={size} value={size}>{size}</option>
                              ))}
                            </select>
                          </div>

                          {/* Quantity & Price */}
                          <div className="flex items-center justify-between mt-2.5">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => updateCartItemQuantity(item.cartItemId, item.quantity - 1)}
                                className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateCartItemQuantity(item.cartItemId, item.quantity + 1)}
                                className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </button>
                            </div>
                            <span className="font-bold text-gray-900 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>

                          {/* Edit link */}
                          <button
                            type="button"
                            onClick={() => handleEditCartItem(item)}
                            className="mt-2 text-xs text-indigo-500 hover:text-indigo-600 font-medium"
                          >
                            {item.isCustomized ? 'Edit Design' : 'Customize'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500 font-medium">Total</span>
                  <span className="text-lg font-bold text-gray-900 tracking-tight">${cartStats.total}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push('/checkout');
                  }}
                  className="w-full btn-premium btn-text text-white py-3 rounded-lg"
                >
                  Checkout
                </button>
                <p className="text-[11px] text-gray-400 text-center mt-2.5 font-normal">Free shipping on orders over $100</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* ===== Quick Add Notification ===== */}
      {showQuickAddNotification && (
        <div className="fixed bottom-6 right-6 z-50 toast-enter">
          <div className="bg-gray-900 text-white rounded-xl shadow-2xl px-5 py-3 flex items-center gap-3">
            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">Added to cart</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoeStore;
