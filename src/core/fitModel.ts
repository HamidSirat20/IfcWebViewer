import * as OBC from "@thatopen/components";
import { FragmentsGroup } from "@thatopen/fragments";
import * as BUI from "@thatopen/ui";

export function fitModel(
  components: OBC.Components,
  model: FragmentsGroup,
  world: OBC.World
) {
  const fragmentBbox = components.get(OBC.BoundingBoxer);
  fragmentBbox.add(model);
  const bbox = fragmentBbox.getMesh();
  fragmentBbox.reset();
  BUI.Manager.init();

  const panel = BUI.Component.create<BUI.PanelSection>(() => {
    return BUI.html`
                <button
                    id="visibilityButton"
                    class="fit-btn"
                    <bim-button
                        label="Fit BIM model"
                        @click="${() => {
                          world.camera.controls?.fitToSphere(bbox, true);
                        }}">
                        </bim-button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 9V6.616q0-.231-.192-.424T19.385 6H17V5h2.385q.69 0 1.152.463T21 6.616V9zM3 9V6.616q0-.691.463-1.153T4.615 5H7v1H4.616q-.231 0-.424.192T4 6.616V9zm14 10v-1h2.385q.23 0 .423-.192t.192-.424V15h1v2.385q0 .69-.462 1.152T19.385 19zM4.615 19q-.69 0-1.153-.462T3 17.384V15h1v2.385q0 .23.192.423t.423.192H7v1zm2.231-3.846V8.846h10.308v6.308z"/></svg>
                    Fit
                </button>
    `;
  });
  console.log("fit model print");

  document.getElementById("model-tab")?.appendChild(panel);
}
