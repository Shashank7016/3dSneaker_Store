import { useState, useMemo } from "react";

interface ShoeCardProps {
  name: string;
  price: number;
  image?: string; // Make image optional since we'll generate one if not provided
  onCustomize: () => void;
  id?: number; // Add optional id for generating unique images
}

export function ShoeCard({
  name,
  price,
  image,
  onCustomize,
  id = Math.floor(Math.random() * 1000),
}: ShoeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate Pixabay image URL if no image is provided
  const imageUrl = useMemo(() => {
    if (image) return image;

    // Pixabay shoe image IDs (pre-selected to ensure they're shoe images)
    const shoeImageIds = [
      "2295441", // white sneakers
      "4071345", // running shoes
      "5539594", // colorful sneakers
      "5827733", // adidas
      "7562438", // stylish sneakers
      "2916622", // training shoes
      "2843633", // pair of sneakers
      // Removed problematic IDs that return 400 errors
    ];

    // Get a consistent image based on the id
    const imageIndex = id % shoeImageIds.length;
    const imageId = shoeImageIds[imageIndex];

    return `https://pixabay.com/get/g${imageId}_1280.jpg`;
  }, [image, id]);

  return (
    <div
      className="w-[300px] bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">{name}</h2>
      </div>
      <div className="p-4">
        <div className="relative h-[200px] w-full">
          <img
            src={imageUrl}
            alt={name}
            className={`w-full h-full object-cover transition-all duration-300 ease-in-out ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            loading="lazy"
          />
        </div>
      </div>
      <div className="p-4 flex justify-between items-center bg-gray-50">
        <span className="text-2xl font-bold">${price}</span>
        <button
          type="button"
          onClick={onCustomize}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
        >
          Customize
        </button>
      </div>
    </div>
  );
}
