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
  dimensions.visible = false;
  dimensions.snapDistance = 1;

  const toggleButton = BUI.Component.create<BUI.PanelSection>(() => {
    return BUI.html`
    <button
      id="measureButton"
      class="measure-button"
      @click="${() => {
        dimensions.enabled = !dimensions.enabled;
        const button = document.getElementById("measureButton");

        if (button) {
          const textNode = button.querySelector(".button-text");
          if (textNode) {
            textNode.textContent = dimensions.enabled
              ? "Measuring Active"
              : "Start Measurement";
          }
          button.classList.toggle("activated", dimensions.enabled);

          dimensions.visible = dimensions.enabled;
          dimensions.color.set(0x00ff00);
        }
      }}">
      <span class="material-symbols-outlined">measuring_tape</span>
      <span class="button-text">Start Measurement</span>
    </button>
  `;
  });

  const visibilityButton = BUI.Component.create<BUI.PanelSection>(() => {
    return BUI.html`
    <button
      id="visibilityButton"
      class="visibility-button"
      @click="${() => {
        dimensions.visible = !dimensions.visible;
        const button = document.getElementById("visibilityButton");

        if (button) {
          const textNode = button.querySelector(".button-text");
          if (textNode) {
            textNode.textContent = dimensions.visible
              ? "Hide Dimensions"
              : "Show Dimensions";
          }
          button.classList.toggle("hidden", !dimensions.visible);
        }
      }}">
      <span class="material-symbols-outlined">visibility</span>
      <span class="button-text">Show Dimensions</span>
    </button>
  `;
  });

  document.querySelector("#tools-tab ")?.append(toggleButton, visibilityButton);

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
