"use client"

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei'
import { ShoeModel } from './ShoeModel'
import { ColorPicker } from './ColorPicker'
import { SizePicker } from './SizePicker'
import { ShoeCard } from './ShoeCard'

const defaultColors = {
  laces: '#ffffff',
  mesh: '#ffffff',
  caps: '#ffffff',
  inner: '#ffffff',
  sole: '#ffffff',
  stripes: '#ffffff',
  band: '#ffffff',
  patch: '#ffffff',
}

type ColorPart = keyof typeof defaultColors;

export default function CustomShoe() {
  const [isCustomizing, setIsCustomizing] = useState(false)
  const [colors, setColors] = useState(defaultColors)
  const [selectedPart, setSelectedPart] = useState<ColorPart | null>(null)
  const [size, setSize] = useState('9')
  const [isRotating, setIsRotating] = useState(false)
  const [isCustomView, setIsCustomView] = useState(true)

  const handleCustomize = () => {
    setIsCustomizing(true)
  }

  const handleColorChange = (color: string) => {
    if (selectedPart) {
      setColors(prev => ({ ...prev, [selectedPart]: color }))
    }
  }

  const toggleView = () => {
    if (isCustomView) {
      // Switching to realistic view, keep current colors
      setSelectedPart(null)
    } else {
      // Switching to custom view, reset colors to white
      setColors(defaultColors)
      setSelectedPart(null)
    }
    setIsCustomView(!isCustomView)
  }

  if (!isCustomizing) {
    return (
      <ShoeCard
        name="Custom Sneaker"
        price={120}
        image="/placeholder.svg?height=200&width=200"
        onCustomize={handleCustomize}
      />
    )
  }

  return (
    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">Custom Sneaker Designer</h2>
      </div>
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2 aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-inner relative">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 1, 5]} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <ShoeModel 
                colors={colors} 
                size={size} 
                isRotating={isRotating} 
                isCustomView={isCustomView} 
              />
              <OrbitControls enablePan={false} enableZoom={true} />
              <Environment preset={isCustomView ? "city" : "studio"} />
            </Canvas>
            <div className="absolute bottom-4 left-4 space-x-2">
              <button 
                type="button"
                onClick={() => setIsRotating(!isRotating)}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-300"
              >
                <span className="sr-only">{isRotating ? 'Stop' : 'Start'} shoe rotation</span>
                <span aria-hidden="true">{isRotating ? 'Stop Rotation' : 'Start Rotation'}</span>
              </button>
              <button
                type="button"
                onClick={toggleView}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-300"
              >
                <span className="sr-only">Switch to {isCustomView ? 'realistic' : 'custom'} view</span>
                <span aria-hidden="true">{isCustomView ? 'Custom View' : 'Realistic View'}</span>
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 space-y-6">
            <SizePicker size={size} onChange={setSize} />
            {!isCustomView && (
              <>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Select Part</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(colors).map((part) => (
                      <button
                        type="button"
                        key={part}
                        onClick={() => setSelectedPart(part as ColorPart)}
                        className={`px-3 py-2 rounded ${selectedPart === part ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-500 hover:text-white transition-colors duration-300`}
                      >
                        {part}
                      </button>
                    ))}
                  </div>
                </div>
                {selectedPart && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Choose Color</h3>
                    <ColorPicker color={colors[selectedPart]} onChange={handleColorChange} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="p-6 flex justify-between items-center bg-gray-50">
        <span className="text-2xl font-bold">$120</span>
        <button 
          type="button" 
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

useGLTF.preload('/shoe-draco.glb')