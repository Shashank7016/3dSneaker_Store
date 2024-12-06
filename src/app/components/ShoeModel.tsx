"use client"
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function ShoeModel({ colors, size, isRotating, isCustomView }) {
  const { scene } = useGLTF('/shoe-draco.glb')
  const mesh = useRef()
  const originalMaterials = useRef({})

  useFrame((state, delta) => {
    if (mesh.current && isRotating) {
      mesh.current.rotation.y += delta * 0.5
    }
  })

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (!originalMaterials.current[child.name]) {
          originalMaterials.current[child.name] = child.material.clone()
        }
        // Changed the condition here - apply custom colors when NOT in custom view
        if (!isCustomView) {
          switch(child.name) {
            case 'shoe': child.material.color.set(colors.laces); break;
            case 'shoe_1': child.material.color.set(colors.mesh); break;
            case 'shoe_2': child.material.color.set(colors.caps); break;
            case 'shoe_3': child.material.color.set(colors.inner); break;
            case 'shoe_4': child.material.color.set(colors.sole); break;
            case 'shoe_5': child.material.color.set(colors.stripes); break;
            case 'shoe_6': child.material.color.set(colors.band); break;
            case 'shoe_7': child.material.color.set(colors.patch); break;
          }
        } else {
          // In custom view, reset to original materials
          child.material = originalMaterials.current[child.name].clone()
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