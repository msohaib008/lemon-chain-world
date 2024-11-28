import { useGLTF, Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { applyTextures } from "../utilities";
import { useThree } from "@react-three/fiber";

export const Trees = ({ model, textures, ...props }) => {
  const { scene } = useGLTF(model); // Load the tree model
  const [selectedTree, setSelectedTree] = useState(null); // Store selected tree
  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());
  const { camera } = useThree(); // Access camera

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.geometry = child.geometry.clone(); // Clone geometry
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = child.material.clone(); // Clone material for independent changes
      }
    });
    applyTextures(scene, textures, THREE);
  }, [scene, textures]);

  const handlePointerMove = (event) => {
    pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  const handleClick = () => {
    raycaster.current.setFromCamera(pointer.current, camera); // Set raycaster based on pointer
    const intersects = raycaster.current.intersectObjects(scene.children, true); // Find intersected objects

    if (intersects.length > 0) {
      const closestObject = intersects[0].object; // Get the closest intersected object
      setSelectedTree(closestObject); // Store the selected tree
    }
  };

  return (
    <>
      <group {...props} onPointerMove={handlePointerMove} onClick={handleClick}>
        <primitive object={scene} />
        {selectedTree && (
          <Html
            position={[
              selectedTree.position.x,
              selectedTree.position.y + 50, // Offset to place above the tree
              selectedTree.position.z,
            ]}
            style={{ top: -110 }}
          >
            <button
              style={{
                background: "yellow",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                top: -117
              }}
              onClick={() => selectedTree.material.color.set("yellow")} // Highlight selected tree
            >
              Select Tree
            </button>
          </Html>
        )}
      </group>
    </>
  );
};
