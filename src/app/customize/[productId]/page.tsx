"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { shoeProducts } from '../../components/ShoeStore';
import type { Product, CartItem } from '../../types';

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

export default function CustomizePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [editingCartItem, setEditingCartItem] = useState<CartItem | undefined>();

  // Load cart from localStorage on component mount
  useEffect(() => {
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

  // Find the product and check if we're editing an existing cart item
  useEffect(() => {
    if (params.productId) {
      const productId = Number(params.productId);
      const editItemId = searchParams.get('editItem');

      // Find the base product
      const foundProduct = shoeProducts.find(p => p.id === productId);
      if (!foundProduct) {
        router.push('/');
        return;
      }
      setProduct(foundProduct);

      // If editItem parameter is provided, find the specific cart item
      if (editItemId) {
        const cartItem = cart.find(item => item.cartItemId === editItemId);
        if (cartItem) {
          setEditingCartItem(cartItem);
        }
      } else {
        setEditingCartItem(undefined);
      }
    }
  }, [params.productId, router, cart, searchParams]);

  // Helper function to check if items are identical for quantity increase
  const areItemsIdentical = (newItem: CartItem, existingItem: CartItem): boolean => {
    if (newItem.id !== existingItem.id || 
        newItem.selectedSize !== existingItem.selectedSize ||
        newItem.isCustomized || existingItem.isCustomized) {
      return false;
    }

    // Check if materials are identical
    const newMaterials = newItem.selectedMaterials;
    const existingMaterials = existingItem.selectedMaterials;
    
    return Object.keys(newMaterials).every(key => {
      const newMat = newMaterials[key];
      const existingMat = existingMaterials[key];
      return newMat.color === existingMat.color &&
             newMat.roughness === existingMat.roughness &&
             newMat.metalness === existingMat.metalness;
    });
  };

  // Cart functions
  const addToCart = (item: CartItem) => {
    // Check if an identical item already exists (for non-customized items)
    if (!item.isCustomized) {
      const existingItemIndex = cart.findIndex(cartItem => areItemsIdentical(item, cartItem));
      
      if (existingItemIndex >= 0) {
        // Increase quantity of existing item
        const newCart = cart.map((cartItem, index) => 
          index === existingItemIndex 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        setCart(newCart);
        localStorage.setItem('shoeCart', JSON.stringify(newCart));
        console.log("Increased quantity for existing item:", item);
      } else {
        // Add as new item
        const newCart = [...cart, item];
        setCart(newCart);
        localStorage.setItem('shoeCart', JSON.stringify(newCart));
        console.log("Added new item to cart:", item);
      }
    } else {
      // Always add customized items as new entries
      const newCart = [...cart, item];
      setCart(newCart);
      localStorage.setItem('shoeCart', JSON.stringify(newCart));
      console.log("Added customized item to cart:", item);
    }

    // Navigate back to home page after adding to cart
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  const updateCartItem = (updatedItem: CartItem) => {
    const newCart = cart.map((item) =>
      item.cartItemId === updatedItem.cartItemId ? updatedItem : item
    );
    setCart(newCart);
    localStorage.setItem('shoeCart', JSON.stringify(newCart));

    // Navigate back to home page after updating cart
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

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
        editingCartItem={editingCartItem}
      />
    </div>
  );
}
