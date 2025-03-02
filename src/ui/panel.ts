import * as BUI from "@thatopen/ui";
import { loadIfc } from "../core/ifcLoader";
import * as OBC from "@thatopen/components";

export function createPanel(
  fragmentIfcLoader: OBC.IfcLoader,
  world: OBC.SimpleWorld<OBC.SimpleScene, OBC.SimpleCamera, OBC.SimpleRenderer>
) {
  BUI.Manager.init();
  const panel = BUI.Component.create<BUI.PanelSection>(() => {
    return BUI.html`
   <div class="center-vertical" onclick="document.getElementById('ifcFile').click()">
        <img src="../../public/upload.svg" class="upload-image" alt="Upload">
        <input type="file" id="ifcFile" accept=".ifc" class="hidden-file-input"
        @change=${() => loadIfc(fragmentIfcLoader, world)}>

  </div>

    `;
  });

  document.getElementById("import-file")?.appendChild(panel);
}
