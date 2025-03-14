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
        <div class="icon-button" onclick="document.getElementById('ifcFile').click()">
              <img src="../../upload.svg" class="upload-image" alt="Upload"> Load .ifc File
              <input type="file" id="ifcFile" accept=".ifc" class="hidden-file-input"
              @change=${() => loadIfc(fragmentIfcLoader, world)}>

        </div>

    `;
  });
  document.getElementById("model-tab")?.appendChild(panel);
}
