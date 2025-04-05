"use client"
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface ShoeModelProps {
  colors: {
    laces: string;
    mesh: string;
    caps: string;
    inner: string;
    sole: string;
    stripes: string;
    band: string;
    patch: string;
  };
  size: string;
  isRotating: boolean;
  isCustomView: boolean;
}

export function ShoeModel({ colors, size, isRotating, isCustomView }: ShoeModelProps) {
  const { scene } = useGLTF('/shoe-draco.glb')
  const mesh = useRef<THREE.Object3D>(null)
  const originalMaterials = useRef<{ [key: string]: THREE.Material }>({})

  useFrame((state, delta) => {
    if (mesh.current && isRotating) {
      (mesh.current as THREE.Mesh).rotation.y += delta * 0.5
    }
  })

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const meshChild = child as THREE.Mesh;
        meshChild.castShadow = true
        meshChild.receiveShadow = true
        if (!originalMaterials.current[meshChild.name]) {
          const material = Array.isArray(meshChild.material) ? meshChild.material[0] : meshChild.material;
          originalMaterials.current[meshChild.name] = material.clone();
        }
        if (!isCustomView) {
          const material = Array.isArray(meshChild.material) ? meshChild.material[0] : meshChild.material;
          if (material instanceof THREE.MeshStandardMaterial) {
            switch(meshChild.name) {
              case 'shoe': material.color.set(colors.laces); break;
              case 'shoe_1': material.color.set(colors.mesh); break;
              case 'shoe_2': material.color.set(colors.caps); break;
              case 'shoe_3': material.color.set(colors.inner); break;
              case 'shoe_4': material.color.set(colors.sole); break;
              case 'shoe_5': material.color.set(colors.stripes); break;
              case 'shoe_6': material.color.set(colors.band); break;
              case 'shoe_7': material.color.set(colors.patch); break;
            }
          }
        } else {
          const material = Array.isArray(meshChild.material) ? meshChild.material[0] : meshChild.material;
          material.copy(originalMaterials.current[meshChild.name]);
        }
      }
    })
  }, [colors, scene, isCustomView])

  useEffect(() => {
    const scale = 1 + (Number.parseInt(size) - 9) * 0.05
    scene.scale.set(scale, scale, scale)
  }, [size, scene])

  return <primitive object={scene} ref={mesh} />
}