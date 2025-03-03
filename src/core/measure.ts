import * as OBC from "@thatopen/components";
import * as BUI from "@thatopen/ui";
import * as OBCF from "@thatopen/components-front";

export function setupLengthMeasurementWithUI(
  components: OBC.Components,
  world: OBC.SimpleWorld<
    OBC.SimpleScene,
    OBC.SimpleCamera,
    OBCF.PostproductionRenderer
  >,
  container: HTMLElement
) {
  const dimensions = components.get(OBCF.LengthMeasurement);
  dimensions.world = world;
  dimensions.enabled = false;
  dimensions.snapDistance = 1;

  const toggleButton = BUI.Component.create<BUI.PanelSection>(() => {
    return BUI.html`
    <button
      id="measureButton"
      style="border: none; background-color: lightgray; padding: 8px 12px; border-radius: 5px;"
      @click="${() => {
        dimensions.enabled = !dimensions.enabled;
        const button = document.getElementById("measureButton");
        if (button) {
          button.textContent = dimensions.enabled ? "Activated" : "Measure";
          button.style.color = dimensions.enabled ? "green" : "black";
          dimensions.visible = dimensions.enabled ? true : false; //add to this to another function to hide dimensions
          dimensions.color.set(0xff0000);
        }
      }}">
      Measure
    </button>
  `;
  });

  toggleButton.style.border = "none";
  toggleButton.style.backgroundColor = "#FFFFFF";

  document.querySelector("#measureBtn")?.appendChild(toggleButton);

  window.onkeydown = (event) => {
    if (event.code === "Escape") {
      dimensions.enabled = false;
    }
  };

  window.onkeydown = (event) => {
    if (event.code === "Delete") {
      dimensions.delete();
    }
  };

  container.onclick = () => {
    if (dimensions.enabled) {
      dimensions.visible = true;
      dimensions.create();
    }
  };
}
