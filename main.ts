import { setupWorld } from "./src/core/worldSetUp.ts";
import { loadIfc, setupIfcLoader } from "./src/core/ifcLoader.ts";
import { createPanel } from "./src/ui/panel.ts";
import { setupStats } from "./src/core/stats.ts";
import sectionPlane from "./src/core/sectionPlane.ts";
import { setupLengthMeasurementWithUI } from "./src/core/measure.ts";
import { minMaps } from "./src/core/miniMap.ts";
import "bootstrap/dist/css/bootstrap.min.css"; // For styles
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // For JavaScript functionality
import {
  processModelRelations,
  setupProperties,
} from "./src/core/ifcProperties.ts";

async function main() {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const container = document.getElementById("container");
      if (!container) throw new Error("Container element not found!");

      const { world, components } = setupWorld(container);
      const fragmentIfcLoader = await setupIfcLoader(components);

      // Setup other components
      sectionPlane(components, world, container);
      minMaps(components, world);
      createPanel(fragmentIfcLoader, world);
      setupLengthMeasurementWithUI(components, world, container);
      setupStats(world.renderer);

      // Add event listeners safely
      const loadBtn = document.getElementById("import-file");
      const fileInput = document.getElementById("ifcFile");

      if (!loadBtn || !fileInput) {
        throw new Error("Required UI elements not found!");
      }

      fileInput.addEventListener("change", async () => {
        try {
          const model = await loadIfc(fragmentIfcLoader, world);
          console.log("Model after loading:", model);
          setupProperties(components, model, world);
          processModelRelations(components, model);
        } catch (error) {
          console.error("Loading failed:", error);
        }
      });
    } catch (error) {
      console.error("Initialization error:", error);
    }
  });
}

main();
