import { setupWorld } from "./src/core/worldSetUp.ts";
import { setupIfcLoader } from "./src/core/ifcLoader.ts";
import { createPanel } from "./src/ui/panel.ts";
import { setupStats } from "./src/core/stats.ts";
import sectionPlane from "./src/core/sectionPlane.ts";
import { setupLengthMeasurementWithUI } from "./src/core/measure.ts";

// Setup World
const container = document.getElementById("container")!;
const { world, components } = setupWorld(container);
const fragmentIfcLoader = await setupIfcLoader(components);

// Setup Clipper
sectionPlane(components, world, container);

// Setup UI
createPanel(fragmentIfcLoader, world);
//add dimensions
setupLengthMeasurementWithUI(components, world, container);
// Performance monitoring
setupStats(world.renderer);
