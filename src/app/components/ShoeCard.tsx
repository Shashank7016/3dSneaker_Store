import { useState } from 'react'
import Image from 'next/image'

interface ShoeCardProps {
  name: string
  price: number
  image: string
  onCustomize: () => void
}

export function ShoeCard({ name, price, image, onCustomize }: ShoeCardProps) {
  const [isHovered, setIsHovered] = useState(false)

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
          <Image
            src={image}
            alt={name}
            layout="fill"
            objectFit="contain"
            className={`transition-all duration-300 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        </div>
      </div>
      <div className="p-4 flex justify-between items-center bg-gray-50">
        <span className="text-2xl font-bold">${price}</span>
        <button 
          type='button'
          onClick={onCustomize}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
        >
          Customize
        </button>
      </div>
    </div>
  )
}