import { useAnimations, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { applyTextures } from "../utilities";
import * as THREE from 'three';

export const Map = ({ model,onLoaded ,textures, ...props }) => {
  const { scene, animations } = useGLTF(model);
  const group = useRef();
  const { actions } = useAnimations(animations, group);


  useEffect(() => {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      applyTextures(scene, textures, THREE);

      if (onLoaded) {
        onLoaded(); // Call parent component's onLoaded function
      }
  }, [scene, onLoaded]);


  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[animations[0].name].play();
    }
  }, [actions]);

  return (
    <group>
      <RigidBody type="fixed" colliders="trimesh">
        <primitive object={scene} {...props} ref={group} />
      </RigidBody>

    </group>
  );
};
