"use client";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

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

// Define MaterialProperties within this file too for clarity, or import if defined elsewhere
interface MaterialProperties {
  color: string;
  roughness: number;
  metalness: number;
}

// Define a type for the dictionary structure used in state/props
interface MaterialPropertiesDict {
  laces: MaterialProperties;
  mesh: MaterialProperties;
  caps: MaterialProperties;
  inner: MaterialProperties;
  sole: MaterialProperties;
  stripes: MaterialProperties;
  band: MaterialProperties;
  patch: MaterialProperties;
  // Allow potential other keys from Object.keys iteration if needed
  [key: string]: MaterialProperties;
}

interface ShoeModelProps {
  // Use the more specific dictionary type for the 'colors' prop
  colors: MaterialPropertiesDict;
  size: string;
  isRotating: boolean;
}

export function ShoeModel({ colors, size, isRotating }: ShoeModelProps) {
  const { scene } = useGLTF("/shoe-draco.glb");
  const mesh = useRef<THREE.Object3D>(null);

  useFrame((state, delta) => {
    // Add log to check if useFrame is running and the state of isRotating/mesh.current
    // console.log(`useFrame: isRotating=${isRotating}, mesh.current=${!!mesh.current}`);
    if (mesh.current && isRotating) {
      // Ensure mesh.current is treated as Object3D for rotation
      mesh.current.rotation.y += delta * 0.5;
    }
  });

  useEffect(() => {
    if (!scene) return; // Guard clause if scene isn't loaded yet

    console.log("ShoeModel: useEffect triggered. colors prop:", colors);

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const meshChild = child as THREE.Mesh;
        meshChild.castShadow = true;
        meshChild.receiveShadow = true;

        // Ensure we are working with a MeshStandardMaterial
        const currentMaterial = (
          Array.isArray(meshChild.material)
            ? meshChild.material[0]
            : meshChild.material
        ) as THREE.MeshStandardMaterial;

        if (
          !currentMaterial ||
          !(currentMaterial instanceof THREE.MeshStandardMaterial)
        ) {
          return;
        }

        // Use the map to find the corresponding part name for this mesh
        const partName = meshNameToPartMap[meshChild.name];
        if (!partName) {
          // Log unmapped meshes to help debugging
          // console.log(`ShoeModel: Skipping unmapped mesh: ${meshChild.name}`);
          return;
        }

        // Get the specific properties for this part using the mapped name
        const partProps = colors[partName];

        if (partProps) {
          let updated = false;
          // Apply custom properties if defined for this part
          // Check if properties actually changed to minimize updates
          const currentColorHex = `#${currentMaterial.color.getHexString()}`;
          if (currentColorHex.toLowerCase() !== partProps.color.toLowerCase()) {
            console.log(
              `ShoeModel: Updating color for ${partName} (${meshChild.name}) from ${currentColorHex} to ${partProps.color}`
            );
            currentMaterial.color.set(partProps.color);
            updated = true;
          }
          if (currentMaterial.roughness !== partProps.roughness) {
            console.log(
              `ShoeModel: Updating roughness for ${partName} (${meshChild.name}) from ${currentMaterial.roughness} to ${partProps.roughness}`
            );
            currentMaterial.roughness = partProps.roughness;
            updated = true;
          }
          if (currentMaterial.metalness !== partProps.metalness) {
            console.log(
              `ShoeModel: Updating metalness for ${partName} (${meshChild.name}) from ${currentMaterial.metalness} to ${partProps.metalness}`
            );
            currentMaterial.metalness = partProps.metalness;
            updated = true;
          }

          // Only mark for update if something actually changed
          if (updated) {
            currentMaterial.needsUpdate = true;
          }
        } else {
          console.warn(
            `ShoeModel: No properties found for mapped part: ${partName} (Mesh: ${meshChild.name})`
          );
        }
      }
    });
  }, [colors, scene]);

  useEffect(() => {
    const scale = 1 + (Number.parseInt(size) - 9) * 0.05;
    scene.scale.set(scale, scale, scale);
  }, [size, scene]);

  return <primitive object={scene} ref={mesh} />;
}
