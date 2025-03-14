import * as THREE from "three";
import * as OBC from "@thatopen/components";
import * as OBCF from "@thatopen/components-front";

export function setupWorld(container: HTMLElement) {
  const components = new OBC.Components();
  const worlds = components.get(OBC.Worlds);
  const world = worlds.create<
    OBC.SimpleScene,
    OBC.SimpleCamera,
    OBCF.PostproductionRenderer
  >();

  world.scene = new OBC.SimpleScene(components);
  world.renderer = new OBCF.PostproductionRenderer(components, container);
  world.camera = new OBC.SimpleCamera(components);
  components.init();

  world.scene.setup();
  world.scene.three.background = new THREE.Color("#2A3139");

  // Add grid
  const grids = components.get(OBC.Grids);
  const grid = grids.create(world);
  grid.isSetup = true;
  grid.config.color = new THREE.Color("white");
  grid.config.secondarySize = 15;
  grid.config.visible = true;

  // Setup Camera
  world.camera.controls.setLookAt(12, 16, 20, 0, 0, -10);
  const cullers = components.get(OBC.Cullers);
  const culler = cullers.create(world);
  culler.threshold = 200;
  culler.config.renderDebugFrame = true;
  const debugFrame = culler.renderer.domElement;
  document.body.appendChild(debugFrame);
  debugFrame.style.position = "fixed";
  debugFrame.style.left = "0";
  debugFrame.style.bottom = "0";
  debugFrame.style.visibility = "collapse";
  culler.needsUpdate = true;
  culler.needsUpdate = true;
  world.camera.controls.addEventListener("controlend", () => {
    culler.needsUpdate = true;
  });

  return { world, components };
}
