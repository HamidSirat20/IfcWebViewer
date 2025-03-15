import * as OBC from "@thatopen/components";
import * as THREE from "three";

export function addShadowsToModel(model: THREE.Object3D, world: OBC.World) {
  model.castShadow = true;
  model.receiveShadow = true;

  world.scene.three.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  console.log("Shadows applied to the model.");
}

export default addShadowsToModel;
