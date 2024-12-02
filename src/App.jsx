import { KeyboardControls, Html, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import * as THREE from "three";
import { useState, Suspense } from "react";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];
function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return <Html center style={{width: 100}}>Loading...</Html>
}
function App() {
  return (
    <>
      <KeyboardControls map={keyboardMap}>
        <Canvas
          shadows
          camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}
          style={{
            touchAction: "none",
          }}
        >
          <color attach="background" args={["#87ceeb"]} />
          <Suspense fallback={<Loader />}>

            <Experience />
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </>
  );
}

export default App;
