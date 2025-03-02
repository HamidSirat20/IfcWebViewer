import * as OBC from "@thatopen/components";
import * as BUI from "@thatopen/ui";
import * as OBCF from "@thatopen/components-front";

export function setupLengthMeasurementWithUI(
  components: OBC.Components,
  world: OBC.SimpleWorld<OBC.SimpleScene, OBC.SimpleCamera, OBC.SimpleRenderer>,
  container: HTMLElement
) {
  // Initialize the Length Measurement Component
  const dimensions = components.get(OBCF.LengthMeasurement);
  dimensions.world = world;
  dimensions.enabled = false; // Initially disabled
  dimensions.snapDistance = 1;

  // Set up the button to toggle the dimension tool
  const toggleButton = BUI.Component.create<BUI.PanelSection>(() => {
    return BUI.html`
      <bim-button label="Toggle Length Measurement"
        @click="${() => {
          dimensions.enabled = !dimensions.enabled; // Toggle the dimension tool
        }}">
      </bim-button>
    `;
  });

  document.body.append(toggleButton);

  // Set up the Escape key event to deactivate the dimension tool
  window.onkeydown = (event) => {
    if (event.code === "Escape") {
      dimensions.enabled = false; // Deactivate the dimension tool when Escape is pressed
    }
  };

  // Set up mouse event for creating dimensions (double-click event)
  container.ondblclick = () => {
    if (dimensions.enabled) {
      dimensions.create(); // Create a dimension if tool is enabled
    }
  };
}
