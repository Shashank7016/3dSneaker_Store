// CartDrawer component
import React from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  url?: string;
  description?: string;
  isNew?: boolean;
  type?: string;
}
interface MaterialProperties {
  color: string;
  roughness: number;
  metalness: number;
}
interface MaterialPropertiesDict {
  [key: string]: MaterialProperties;
}
interface CartItem extends Product {
  selectedSize: string;
  selectedMaterials: MaterialPropertiesDict;
  cartItemId: string;
  isCustomized: boolean;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (cartItemId: string) => void;
  onEditItem: (item: CartItem) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onEditItem,
}) => {
  // Prevent background scroll when cart is open
  React.useEffect(() => {
    if (isOpen) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollTop}px`;
      document.body.style.width = '100%';

      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollTop);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getImageUrl = (item: CartItem) => {
    if (item.url) return item.url;
    const shoeImageIds = ["2295441", "4071345", "5539594", "5827733", "7562438", "2916622", "2843633"];
    const imageIndex = item.id % shoeImageIds.length;
    const imageId = shoeImageIds[imageIndex];
    return `https://pixabay.com/get/g${imageId}_1280.jpg`;
  };

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <>
      <div
        className={`fixed inset-y-0 right-0 w-[420px] max-w-full bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
            <p className="text-xs text-gray-400 mt-0.5">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6" style={{ overscrollBehavior: 'contain' }}>
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-1">Start adding some shoes!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {cartItems.map((item) => (
                <li
                  key={item.cartItemId}
                  className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100/80 transition-colors duration-200"
                >
                  <div className="flex gap-3">
                    <Image
                      src={getImageUrl(item)}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="w-14 h-14 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Size: {item.selectedSize}
                          </p>
                          {item.isCustomized && (
                            <span className="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] rounded-full mt-1 font-medium">
                              Customized
                            </span>
                          )}
                        </div>
                        <p className="font-bold text-gray-900 text-sm flex-shrink-0">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onEditItem(item)}
                            className="text-xs text-indigo-500 hover:text-indigo-600 font-medium"
                          >
                            Edit
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => onRemoveItem(item.cartItemId)}
                            className="text-xs text-gray-400 hover:text-red-500 font-medium transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                        <span className="text-xs text-gray-400">Qty: {item.quantity || 1}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">Total</span>
              <span className="text-xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={() => window.location.href = '/checkout'}
              className="w-full btn-premium text-white py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
            >
              Checkout
            </button>
            <p className="text-[11px] text-gray-400 text-center mt-2">Free shipping on orders over $100</p>
          </div>
        )}
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        style={{ touchAction: 'none' }}
      />
    </>
  );
};

export default CartDrawer;
