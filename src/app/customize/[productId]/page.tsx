"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { shoeProducts, defaultMaterialProps } from '../../components/ShoeStore';

// Import CustomShoe component dynamically to avoid SSR issues with Three.js
const DynamicCustomShoe = dynamic(() => import('../../components/CustomShoe'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
        <p className="mt-4 text-gray-600">Loading Customizer...</p>
      </div>
    </div>
  )
});

// Define interfaces (these should be moved to a shared types file later)
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
  cartItemId: string;
  isCustomized: boolean;
}

export default function CustomizePage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shoeCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart from localStorage:', e);
      }
    }
  }, []);

  // Find the product based on the productId parameter
  // Also check if we're editing an existing cart item
  useEffect(() => {
    if (params.productId) {
      const productId = Number(params.productId);

      // First check if this is an existing cart item we're editing
      const cartItem = cart.find(item => item.id === productId);
      if (cartItem) {
        // We found this product in the cart, so we're editing an existing item
        setProduct(cartItem);
        return;
      }

      // If not in cart, look for it in the products list
      const foundProduct = shoeProducts.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // If product not found, redirect to home page
        router.push('/');
      }
    }
  }, [params.productId, router, cart]);

  // Cart functions
  const addToCart = (item: CartItem) => {
    const newCart = [...cart, item];
    setCart(newCart);
    // Save cart to localStorage
    localStorage.setItem('shoeCart', JSON.stringify(newCart));
    console.log("Added to cart:", item);

    // Navigate back to home page after adding to cart
    setTimeout(() => {
      router.push('/');
    }, 2000); // Wait 2 seconds to show the "Added to cart" message
  };

  const updateCartItem = (updatedItem: CartItem) => {
    const newCart = cart.map((item) =>
      item.cartItemId === updatedItem.cartItemId ? updatedItem : item
    );
    setCart(newCart);
    // Update localStorage
    localStorage.setItem('shoeCart', JSON.stringify(newCart));

    // Navigate back to home page after updating cart
    setTimeout(() => {
      router.push('/');
    }, 2000); // Wait 2 seconds to show the "Updated" message
  };

  // Handle close button click
  const handleClose = () => {
    router.push('/');
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <DynamicCustomShoe
        product={product}
        onClose={handleClose}
        onAddToCart={addToCart}
        onUpdateCart={updateCartItem}
      />
    </div>
  );
}
