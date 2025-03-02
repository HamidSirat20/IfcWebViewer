import * as THREE from "three";
import * as OBC from "@thatopen/components";

export function setupWorld(container: HTMLElement) {
  const components = new OBC.Components();
  const worlds = components.get(OBC.Worlds);
  const world = worlds.create<
    OBC.SimpleScene,
    OBC.SimpleCamera,
    OBC.SimpleRenderer
  >();

  world.scene = new OBC.SimpleScene(components);
  world.renderer = new OBC.SimpleRenderer(components, container);
  world.camera = new OBC.SimpleCamera(components);
  components.init();

  world.scene.setup();
  world.scene.three.background = null;

  // Add grid
  const grids = components.get(OBC.Grids);
  const grid = grids.create(world);
  grid.isSetup = true;
  grid.config.color = new THREE.Color("blue");
  grid.config.secondarySize = 15;
  grid.config.visible = true;

  // Setup Camera
  world.camera.controls.setLookAt(12, 16, 20, 0, 0, -10);
  return { world, components };
}
