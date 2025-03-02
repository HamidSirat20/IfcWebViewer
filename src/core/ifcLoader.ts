import * as WEBIFC from "web-ifc";
import * as OBC from "@thatopen/components";
import * as THREE from "three";

export async function setupIfcLoader(components: OBC.Components) {
  const fragments = components.get(OBC.FragmentsManager);
  const fragmentIfcLoader = components.get(OBC.IfcLoader);
  await fragmentIfcLoader.setup();
  fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;

  // Exclude categories
  var excludeCategories = [
    WEBIFC.IFCTENDONANCHOR,
    WEBIFC.IFCREINFORCINGBAR,
    WEBIFC.IFCREINFORCINGELEMENT,
  ].forEach((cat) => fragmentIfcLoader.settings.excludedCategories.add(cat));

  return fragmentIfcLoader;
}

export async function loadIfc(
  fragmentIfcLoader: OBC.IfcLoader,
  world: OBC.SimpleWorld<OBC.SimpleScene, OBC.SimpleCamera, OBC.SimpleRenderer>
) {
  const fileInput = document.getElementById("ifcFile") as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (!file) {
    console.error("No file selected!");
    return;
  }

  const reader = new FileReader();
  reader.onload = async (event) => {
    const result = event.target?.result as ArrayBuffer;
    if (!result) {
      console.error(" FileReader did not return valid data.");
      return;
    }

    const buffer = new Uint8Array(result);

    try {
      const model = await fragmentIfcLoader.load(buffer);
      world.scene.three.add(model);
      world.meshes.add(model);
    } catch (error) {
      console.error("Error Loading IFC Model:", error);
    }
  };

  reader.readAsArrayBuffer(file);
}
