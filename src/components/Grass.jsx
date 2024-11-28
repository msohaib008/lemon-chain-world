import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { loadTextures, applyTextures } from "../utilities";

export const Grass = ({ model, textures, ...props }) => {
  const { scene } = useGLTF(model); // Load the tree model
  useEffect(() => {
    // Traverse the scene and make sure the trees don't have any colliders or RigidBody attached
    scene.traverse((child) => {
      if (child.isMesh) {
        // Make sure the tree meshes don't have any physics colliders or rigidbody
        child.geometry = child.geometry.clone(); // Clone geometry to avoid unwanted physics interaction
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    applyTextures(scene, textures, THREE);
  }, [scene]);

  return (
    <group {...props}>
      <primitive object={scene} />
    </group>
  );
};
