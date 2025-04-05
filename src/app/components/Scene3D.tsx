"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import ErrorBoundary from "./ErrorBoundary";

interface Scene3DProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
}

export default function Scene3D({
  children,
  className = "",
  fallback,
}: Scene3DProps) {
  const [isReady, setIsReady] = useState(false);
  const mountedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set a flag that this component is mounted
    mountedRef.current = true;

    // Only render the canvas when the component is fully mounted
    // and the container is available in the DOM
    const timer = setTimeout(() => {
      if (mountedRef.current && containerRef.current) {
        setIsReady(true);
      }
    }, 150);

    return () => {
      // Signal that we're unmounting
      mountedRef.current = false;
      clearTimeout(timer);
      setIsReady(false);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {isReady && (
        <ErrorBoundary fallback={fallback}>
          <Canvas
            frameloop="demand"
            gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
            dpr={[1, 2]}
          >
            {children}
          </Canvas>
        </ErrorBoundary>
      )}
    </div>
  );
}
