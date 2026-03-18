"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { ShoeModel } from "./ShoeModel";
import { MaterialPropertiesDict } from "../types";
import ErrorBoundary from "./ErrorBoundary";

interface Scene3DProps {
  materials: MaterialPropertiesDict;
  size: string;
  isRotating?: boolean;
}

export default function Scene3D({ materials, size, isRotating = true }: Scene3DProps) {
  return (
    <div className="w-full h-full">
      <ErrorBoundary>
        <Canvas
          camera={{ position: [2, 1, 3], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          <PerspectiveCamera makeDefault position={[2, 1, 3]} fov={50} />
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={isRotating}
            autoRotateSpeed={1}
            minDistance={2}
            maxDistance={8}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            target={[0, 0, 0]}
          />
          
          {/* Lighting setup for better shoe visibility */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <pointLight position={[0, 5, 0]} intensity={0.3} />
          
          <ShoeModel 
            colors={materials} 
            size={size} 
            isRotating={isRotating} 
          />
          
          <Environment preset="city" />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
