import { Environment, OrthographicCamera, Html, useProgress, Sky } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { Suspense, useEffect, useRef, useState } from "react";
import { CharacterController } from "./CharacterController";
import { Map } from "./Map";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { Trees } from "./Trees";
import { Grass } from "./Grass";
import { TextureLoader } from "three"
import { loadTextures } from "../utilities";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

const maps = {
  environment_lemon_chain: {
    scale: 0.0005,
    position: [0, -20.5, 0],
  }
};

// You can add a set of trees to be rendered
const trees = [
  { modelPath: 'models/trees.glb', position: [0, -20.5, 0], scale: [0.0005, 0.0005, 0.0005] },
];
export const Experience = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [textures, setTextures] = useState(null);
  const shadowCameraRef = useRef();
  const { map } = useControls("Map", {
    map: {
      value: "environment_lemon_chain",
      options: Object.keys(maps),
    },
  });
  // Load tree models using GLTFLoader with DRACOLoader
  const loadTreeModel = (path) => useLoader(GLTFLoader, path, (loader) => {
    loader.setDRACOLoader(dracoLoader); // Attach DRACOLoader to GLTFLoader
  });


  const [mapLoaded, setMapLoaded] = useState(false); // State to track map load status

  const onMapLoaded = () => {
    setMapLoaded(true); // Set to true once the map is loaded
  };
  const textureLoader = new TextureLoader();

  

  const useLoadTexture = async () => {
    await loadTextures(textureLoader, 'Textures/').then((txtrs) => {
      console.log("Textures ready for use:", txtrs);
      setTextures(txtrs)
    });
  }

  useEffect(()=>{
    useLoadTexture();
  },[])
  return (
    <>
      {textures &&
        <>
          {/* <Environment
            path="https://drive.google.com/file/d/1R4tJm3Th_Qg5C_bXh5nz_hs52v10-zVl/uc?export=download&id=FILE_ID"
            background={false}
          /> */}
                    <hemisphereLight intensity={0.6} />

          <directionalLight
            intensity={0.4}
            castShadow
            position={[-15, 10, 15]}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.00005}
          >
            <OrthographicCamera
              left={-22}
              right={15}
              top={10}
              bottom={-20}
              ref={shadowCameraRef}
              attach={"shadow-camera"}
            />
          </directionalLight>
          {/* <Suspense fallback={<Loader />}> */}
          <Physics key={map} debug={false}>
            <Map
              scale={maps[map].scale}
              position={maps[map].position}
              model={`models/${map}.glb`}
              onLoaded={onMapLoaded}
              textures={textures}
            />
            {mapLoaded && <CharacterController />}

          </Physics>
          <Trees
            model="models/New_trees.glb"
            textures={textures} position={[0, -20.5, 0]}
            scale={[0.0005, 0.0005, 0.0005]}
          />
          <Grass model="models/grass.glb" textures={textures} position={[0, -20.5, 0]} scale={[0.05, 0.05, 0.05]} />
          {/* </Suspense> */}
        </>}
    </>
  );
};
