import * as OBC from "@thatopen/components";
import * as OBCF from "@thatopen/components-front";

export function minMaps(
  components: OBC.Components,
  world: OBC.SimpleWorld<
    OBC.SimpleScene,
    OBC.SimpleCamera,
    OBCF.PostproductionRenderer
  >
) {
  const maps = new OBC.MiniMaps(components);
  const map = maps.create(world);
  const mapContainer = document.getElementById("minimap") as HTMLDivElement;
  const canvas = map.renderer.domElement;
  canvas.style.borderRadius = "12px";
  mapContainer.append(canvas);
  map.resize();
}
