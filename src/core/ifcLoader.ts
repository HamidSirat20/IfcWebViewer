import * as WEBIFC from "web-ifc";
import * as OBC from "@thatopen/components";
import { FragmentsGroup } from "@thatopen/fragments";
import shadowCreator, { addShadowsToModel } from "./shadow";

export async function setupIfcLoader(components: OBC.Components) {
  const fragments = components.get(OBC.FragmentsManager);
  const fragmentIfcLoader = components.get(OBC.IfcLoader);
  await fragmentIfcLoader.setup();

  // Check if webIfc is properly initialized
  if (!fragmentIfcLoader.settings.webIfc) {
    console.error("webIfc is not initialized properly");
  } else {
    console.log("webIfc initialized:", fragmentIfcLoader.settings.webIfc);
  }

  fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;

  // Exclude categories
  const excludeCategories = [
    WEBIFC.IFCTENDONANCHOR,
    WEBIFC.IFCREINFORCINGBAR,
    WEBIFC.IFCREINFORCINGELEMENT,
  ];
  excludeCategories.forEach((cat) =>
    fragmentIfcLoader.settings.excludedCategories.add(cat)
  );

  return fragmentIfcLoader;
}

export async function loadIfc(
  fragmentIfcLoader: OBC.IfcLoader,
  world: OBC.SimpleWorld<OBC.SimpleScene, OBC.SimpleCamera, OBC.SimpleRenderer>
): Promise<FragmentsGroup> {
  return new Promise((resolve, reject) => {
    const fileInput = document.getElementById("ifcFile") as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      reject(new Error("No file selected!"));
      return;
    }

    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const result = event.target?.result as ArrayBuffer;
        const buffer = new Uint8Array(result);

        // Add async/await here to ensure full loading
        const model = await fragmentIfcLoader.load(buffer);

        // Wait for scene updates
        await new Promise((resolve) => requestAnimationFrame(resolve));

        world.scene.three.add(model);
        world.meshes.add(model);
        addShadowsToModel(model, world);

        // Verify model existence
        if (!model) {
          reject(new Error("Failed to load model"));
          return;
        }

        resolve(model);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file!"));
    };

    reader.readAsArrayBuffer(file);
  });
}
