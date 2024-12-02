

export const loadTextures = async (textureLoader, TEXTURE_PATH) => {
    const textureFiles = {
        grass: `${TEXTURE_PATH}grass_color.png`,
        bark: `${TEXTURE_PATH}bark_color.png`,
        foliage: `${TEXTURE_PATH}foliage_color-foliage_opacity.png`,
        leaves: `${TEXTURE_PATH}1234.png`,
        bricksColor: `${TEXTURE_PATH}Bricks_color.png`,
        bricksNormal: `${TEXTURE_PATH}Bricks_normal.png`,
        trackColor: `${TEXTURE_PATH}track_color.jpg`,
        tracksNormal: `${TEXTURE_PATH}tracks_normal.jpg`,
        trackRough: `${TEXTURE_PATH}track_rough.jpg`,
        foliageColor: `${TEXTURE_PATH}foliage_color-foliage_opacity.png`,
        foliageAlpha: `${TEXTURE_PATH}Foliage_Alpha.png`,
        foliageNormal: `${TEXTURE_PATH}foliage_normal.png`,
        foliageRough: `${TEXTURE_PATH}foliage_roughness@channels=G.png`,
        wallNormal: `${TEXTURE_PATH}tiglchydy_2K_Normal.jpg`,
        wallRough: `${TEXTURE_PATH}tiglchydy_2K_Roughness.jpg`,
        doorColor: `${TEXTURE_PATH}istockphoto-173201523-612x612.jpg`,
        solar: `${TEXTURE_PATH}istockphoto-185692745-612x612.jpg`,
        roof: `${TEXTURE_PATH}tfrneges_2K_Albedo.jpg`,
        roofNormal: `${TEXTURE_PATH}tfrneges_2K_Normal.jpg`,
        roofRough: `${TEXTURE_PATH}tfrneges_2K_Roughness.jpg`,
        oldHouse: `${TEXTURE_PATH}house-old-photo-texture-of-building_640v640.jpg`,
        oldRock: `${TEXTURE_PATH}old-rock-wall-texture-1619999.jpg`,
        locomotive: `${TEXTURE_PATH}locomotive_diffuse.png`,
        grama: `${TEXTURE_PATH}Grama_Albedo.png`,
        gramaNormal: `${TEXTURE_PATH}Grama_Normal.png`,
        gramaRough: `${TEXTURE_PATH}Grama_Roughness.png`,
        path: `${TEXTURE_PATH}vkvnfa2_2K_Albedo.jpg`,
        lemon: `${TEXTURE_PATH}textureLemon_Tree.png`,
        terra: `${TEXTURE_PATH}vkvnfa2_2K_Albedo.jpg`,
        terraNormal: `${TEXTURE_PATH}Terra_Normal.png`,
        terraRough: `${TEXTURE_PATH}Terra_Rough.png`,
        grassNew: `${TEXTURE_PATH}grass_new.png`,
        grass1: `${TEXTURE_PATH}grass_2.png`,
        grass2: `${TEXTURE_PATH}grass_3.png`,
    }
    const texturePromises = Object.entries(textureFiles).map(([key, path]) => {
        return new Promise((resolve, reject) => {
          textureLoader.load(
            path,
            (texture) => {
              resolve({ key, texture });
            },
            undefined, // Optional progress handler
            (err) => reject({ key, error: err })
          );
        });
      });

      const loadedTextures = await Promise.all(texturePromises);
      const textures = {};
      loadedTextures.forEach(({ key, texture }) => {
        textures[key] = texture;
      });
    
      console.log("All textures loaded:", textures);
      return textures;
};


export const applyTextures = (object, textures, THREE) => {
    object.traverse((child) => {
        if (child.isMesh) {
            // console.log({ meshName: child.material.name })
            if (child.material.name === 'bark') {
                child.material.map = textures.bark;
            } else if (child.material.name === 'foliage') {
                child.material.map = textures.foliage;
                child.material.color.set(0xFFFFFF);
            }
            else if (child.material.name === "Material.011") {
                child.material.map = textures.bricksColor;
                child.material.normalMap = textures.bricksNormal;
            }
            else if (child.material.name === "2a4e5ad4bb9256ba1932a1969a924998") {
                child.material.map = textures.grassNew;
                // child.material.normalMap = textures.grassNew;

                // Flip the texture (optional, flip only one direction if needed)
                child.material.map.repeat.set(1, -1); // Flip vertically (or set -1 for horizontal flip)
                // child.material.map.offset.set(0, 0);   // Adjust offset if necessary

                // Set texture wrapping and double-side rendering
                child.material.map.wrapS = THREE.RepeatWrapping;
                child.material.map.wrapT = THREE.RepeatWrapping;
                // child.material.side = THREE.DoubleSide;  // Render both sides of the geometry

                // child.material.transparent = true;
                // child.material.alphaTest = 0.8;  // Optional: set alpha threshold

                // child.material.metalness = 0;
                // child.material.roughness = 0;

                // Set depth properties for transparency handling
                child.material.depthWrite = false;
                child.material.depthTest = true;

                // Force material to update
                child.material.needsUpdate = true;
            }

            else if (child.material.name === "90ff913e03da487e5ddab999d4146e7a") {
                child.material.map = textures.grass2;
                child.material.normalMap = textures.grass2;

                // Flip the texture as needed
                child.material.map.repeat.set(1, -1); // Flip vertically (or change to -1 for horizontal)

                // Set texture wrapping and other material properties
                child.material.map.wrapS = THREE.RepeatWrapping;
                child.material.map.wrapT = THREE.RepeatWrapping;
                child.material.side = THREE.DoubleSide;

                // child.material.transparent = true;
                child.material.alphaTest = 0.8;

                child.material.metalness = 0;
                child.material.roughness = 0;

                child.material.depthWrite = false;
                child.material.depthTest = true;

                child.material.needsUpdate = true;
            }

            else if (child.material.name === "90e98e3d36fa30652c016cd1d8a334c9") {
                child.material.map = textures.grass1;
                // child.material.normalMap = textures.grass1;

                // Flip the texture as needed
                child.material.map.repeat.set(1, -1); // Flip vertically

                // Set texture wrapping and other material properties
                child.material.map.wrapS = THREE.RepeatWrapping;
                child.material.map.wrapT = THREE.RepeatWrapping;
                child.material.side = THREE.DoubleSide;

                // child.material.transparent = true;
                child.material.alphaTest = 0.8;

                // child.material.metalness = 0;
                // child.material.roughness = 0;

                child.material.depthWrite = false;
                child.material.depthTest = true;

                child.material.needsUpdate = true;

                // Move the object downward if necessary
                // child.position.y -= 3;
            }




            else if (child.material.name === "Material.004") {
                child.material.map = textures.trackColor; // Set the color texture
                child.material.normalMap = textures.tracksNormal; // Set the normal map
                child.material.roughnessMap = textures.trackRough; // Set the roughness map
                child.material.color.set(0xFFFFFF); // This helps avoid tinting from the color texture
                child.material.transparent = true; // Enable transparency if needed
                child.material.needsUpdate = true;
            }
            else if (child.material.name === "Material.005") {
                child.material.color.set(0x808080); // This helps avoid tinting from the color texture
            }
            else if (child.material.name === "leaves") {
                child.material.map = textures.foliageColor;         // Set color texture
                child.material.alphaMap = textures.foliageAlpha;    // Set alpha texture
                child.material.normalMap = textures.foliageNormal;   // Set normal map
                child.material.roughnessMap = textures.foliageRough;
                child.material.color.set(0xBACD92); // This helps avoid tinting from the color texture
            }
            else if (child.material.name === 'NewTree_Plane2') {
                // console.log({ tree: child })
                child.material.map = textures.lemon;
                // child.material.map = null;

                // Set the color (e.g., red for testing)
                // child.material.color.set(0xff0000);

                // Reset emissive color to black
                child.material.emissive.set(0x000d00);

                // Adjust material properties
                child.material.metalness = 0;
                child.material.roughness = 0;
                child.material.transparent = true; // Disable transparency for testing
                child.material.alphaTest = 0.8; // Disable alpha testing
                // child.material.alphaMap = textures.lemon;
                // Force the material to update
                child.material.needsUpdate = true;
            }
            else if (child.material.name === 'Material.006') {
                // console.log({ tree: child })
                child.material.map = textures.lemon;
                // child.material.map = null;

                // Set the color (e.g., red for testing)
                // child.material.color.set(0xff0000);

                // Reset emissive color to black
                child.material.emissive.set(0x000d00);

                // // Adjust material properties
                child.material.metalness = 0;
                child.material.roughness = 0;
                // child.material.transparent = true; // Disable transparency for testing
                // child.material.alphaTest = 0.8; // Disable alpha testing
                // // child.material.alphaMap = textures.lemon;
                // // Force the material to update
                child.material.needsUpdate = true;
            }
            else if (child.material.name === "Material.007") {
                child.material.map = textures.oldHouse
            }
            else if (child.material.name === "istockphoto-173201523-612x612") { //doors
                child.material.map = textures.doorColor;
                child.material.map.wrapS = THREE.RepeatWrapping;
                child.material.map.wrapT = THREE.RepeatWrapping;

                // Flip the texture if needed (optional)
                child.material.map.repeat.set(1, 1); // Flip the texture vertically

                // Flip the material to apply it to the opposite side (back face)
                child.material.side = THREE.BackSide; // Make the material visible on the opposite side

                // Optional: Adjust the color or other properties
                // child.material.color.set(0x000000);

                child.material.needsUpdate = true;
            }
            else if (child.material.name === "Solar") {
                child.material.map = textures.solar
            }
            else if (child.material.name === "Red_Roof_tfrneges.002") {
                child.material.map = textures.roof; // Set the color texture
                child.material.normalMap = textures.roofNormalNormal; // Set the normal map
                child.material.roughnessMap = textures.roofRough;
            }

            else if (child.material.name === "Material.017") {
                child.material.map = textures.oldHouse;         // Set color texture
                // child.material.normalMap = textures.wallNormal;   // Set normal map
                // child.material.roughnessMap = textures.wallRough;// Set default color for untextured parts
            }
            else if (child.material.name === "Material.010") {// Set default color for untextured parts
                child.material.map = textures.oldRock
            }
            else if (child.material.name === "Material.012") {// Set default color for untextured parts
                child.material.map = textures.doorColor;
                child.material.color.set(0x573D2C);
            }
            else if (child.material.name === "Material.011") {// Set default color for untextured parts
                // child.material.map = textures.doorColor;
                child.material.color.set(0xFFFF00);
            }
            else if (child.material.name === "Material.013") {// Set default color for untextured parts
                child.material.map = textures.oldRock
            }
            else if (child.material.name === "Material.019") {
                child.material.map = textures.locomotive
            }
            else if (child.material.name === "vagon.001") {
            }
            else if (child.material.name === "Grama") {
                child.material.map = textures.grama; // Set the color texture
                // child.material.normalMap = textures.gramaNormal; // Set the normal map
                // child.material.roughnessMap = textures.gramaRough; // Set the roughness map
                // console.log({ grama: child })
                child.material.vertexColors = false;
                // child.material.combine = THREE.MixOperation,
                child.material.color.set(0xC4DAD2);

                child.material.transparent = true;
                child.material.needsUpdate = true;
                child.material.map.wrapS = THREE.RepeatWrapping;
                child.material.map.wrapT = THREE.RepeatWrapping;
                child.material.map.repeat.set(1, -1); // Flipping vertically

                child.material.needsUpdate = true; // Ensure the material updates

            }
            else if (child.material.name === "Terra") {
                console.log({ child });

                child.material.map = textures.terra; // Set the color texture
                child.material.normalMap = textures.terraNormal; // Set the normal map (optional)
                child.material.roughnessMap = textures.terraRough;

                // Set the base color (brown)
                child.material.color.set(0x000000);

                // Ensure no emissive color that could make the material darker
                child.material.emissive.set(0xA27B5C);

                // Apply wrapping to the texture
                child.material.map.wrapS = THREE.RepeatWrapping;
                child.material.map.wrapT = THREE.RepeatWrapping;

                // Set texture repetition, no flipping unless needed
                child.material.map.repeat.set(1, 1); // No flipping, adjust as needed

                // Adjust material properties to improve visibility
                child.material.metalness = 0;  // Set non-metallic
                child.material.roughness = 0.5; // Moderate roughness
                child.material.transparent = false;  // Ensure it's not transparent

                // Ensure the material is updated
                child.material.needsUpdate = true;

                // Additional checks
                console.log("Material properties", child.material);
            }

            else if (child.material.name === "fbecdf28f52f33b7b10907efd41571db") {
                child.material.map = textures.doorColor;
            }
            else {
                child.material.color.set(0x228B22); // Set default color for untextured parts
            }
        }
    });
};
