"use client";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { MaterialPropertiesDict } from "../types";

// Map internal GLTF mesh names to the user-facing part names used in state
// **IMPORTANT: Verify these mesh names (`shoe`, `shoe_1`, etc.) against your actual GLTF model!**
const meshNameToPartMap: Record<string, keyof MaterialPropertiesDict> = {
  shoe: "laces",
  shoe_1: "mesh",
  shoe_2: "caps",
  shoe_3: "inner",
  shoe_4: "sole",
  shoe_5: "stripes",
  shoe_6: "band",
  shoe_7: "patch",
};

interface ShoeModelProps {
  colors: MaterialPropertiesDict;
  size: string;
  isRotating?: boolean;
}

export function ShoeModel({ colors, size, isRotating }: ShoeModelProps) {
  const { scene } = useGLTF("/shoe-draco.glb");
  const mesh = useRef<THREE.Group>(null);
  const rotationSpeed = useRef(0); // For smooth transition

  useFrame((state, delta) => {
    if (mesh.current) {
      // Smooth transition for rotation speed
      const targetSpeed = isRotating ? 0.3 : 0;
      rotationSpeed.current = THREE.MathUtils.lerp(rotationSpeed.current, targetSpeed, delta * 3);
      
      // Apply rotation
      mesh.current.rotation.y += delta * rotationSpeed.current;
      
      // Subtle floating animation (only when rotating)
      if (isRotating) {
        const time = state.clock.getElapsedTime();
        mesh.current.position.y = Math.sin(time * 0.8) * 0.02;
      } else {
        // Smoothly return to center position when not rotating
        mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, 0, delta * 2);
      }
    }
  });

  useEffect(() => {
    if (!scene || !colors) {
      console.warn("ShoeModel: Scene or colors not available yet");
      return;
    }

    console.log("ShoeModel: Applying materials", colors);

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const meshChild = child as THREE.Mesh;
        const meshName = meshChild.name;
        
        console.log(`ShoeModel: Processing mesh: ${meshName}`);

        // Enable shadows
        meshChild.castShadow = true;
        meshChild.receiveShadow = true;

        // Map mesh name to part name
        const partName = meshNameToPartMap[meshName];
        
        if (!partName || !colors[partName]) {
          console.warn(`ShoeModel: No mapping found for mesh: ${meshName}`);
          return;
        }

        const partProps = colors[partName];
        
        if (!partProps) {
          console.warn(`ShoeModel: No properties found for part: ${partName}`);
          return;
        }

        // Ensure the mesh has a material
        if (!meshChild.material) {
          console.warn(`ShoeModel: No material found for mesh: ${meshName}`);
          return;
        }

        // Handle both single materials and material arrays
        const materials = Array.isArray(meshChild.material) 
          ? meshChild.material 
          : [meshChild.material];

        materials.forEach((material, index) => {
          if (material instanceof THREE.MeshStandardMaterial) {
            const currentMaterial = material as THREE.MeshStandardMaterial;
            
            console.log(`ShoeModel: Updating material ${index} for ${partName} (${meshName})`);
            
            // Apply the properties smoothly
            currentMaterial.color.set(partProps.color);
            currentMaterial.roughness = partProps.roughness;
            currentMaterial.metalness = partProps.metalness;
            currentMaterial.needsUpdate = true;
          } else {
            console.warn(`ShoeModel: Material is not MeshStandardMaterial for ${meshName}[${index}]`);
          }
        });
      }
    });
  }, [colors, scene]);

  useEffect(() => {
    if (!scene) return;
    
    // Scale based on size
    const scale = 0.8 + (Number.parseInt(size) - 9) * 0.03;
    scene.scale.set(scale, scale, scale);
    
    // Position the shoe nicely in view
    scene.position.set(0, -0.5, 0);
    scene.rotation.set(0, Math.PI / 6, 0);
  }, [size, scene]);

  if (!scene) {
    console.warn("ShoeModel: Scene not loaded yet");
    return null;
  }

  return <primitive object={scene} ref={mesh} />;
}

useGLTF.preload("/shoe-draco.glb");
