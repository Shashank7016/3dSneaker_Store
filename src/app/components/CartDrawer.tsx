// Placeholder for CartDrawer component
import React from "react";

// Assuming interfaces are defined elsewhere or passed as generics if needed
interface Product {
  id: number;
  name: string;
  price: number;
  url?: string;
  [key: string]: any;
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
  if (!isOpen) return null;

  // Basic image fallback logic (same as in ShoeStore placeholder)
  const getImageUrl = (item: CartItem) => {
    if (item.url) return item.url;
    const shoeImageIds = [
      "2295441",
      "4071345",
      "5539594",
      "5827733",
      "7562438",
      "2916622",
      "2843633",
    ];
    const imageIndex = item.id % shoeImageIds.length;
    const imageId = shoeImageIds[imageIndex];
    return `https://pixabay.com/get/g${imageId}_1280.jpg`;
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 right-0 w-96 max-w-full bg-white shadow-xl z-40 p-6 transform transition ease-in-out duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-6 overflow-y-auto h-[calc(100vh-150px)] pr-2">
            {" "}
            {/* Adjust height as needed */}
            {cartItems.map((item) => (
              <li
                key={item.cartItemId}
                className="flex space-x-4 border-b pb-4"
              >
                <img
                  src={getImageUrl(item)}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded flex-shrink-0"
                />
                <div className="flex-grow">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Size: {item.selectedSize}
                  </p>
                  <p className="text-sm font-semibold">${item.price}</p>
                  {/* Optional: Display simplified material info */}
                  {/* <p className="text-xs text-gray-500 mt-1">Customized</p> */}
                </div>
                <div className="flex flex-col space-y-2 text-right flex-shrink-0">
                  <button
                    onClick={() => onEditItem(item)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.cartItemId)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {/* Optional: Add Checkout Button */}
        {/* <div className="mt-6 border-t pt-4">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Proceed to Checkout</button>
         </div> */}
      </div>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>
    </>
  );
};

export default CartDrawer;
