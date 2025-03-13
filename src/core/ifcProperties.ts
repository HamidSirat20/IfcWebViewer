import * as BUI from "@thatopen/ui";
import * as OBC from "@thatopen/components";
import * as OBCF from "@thatopen/components-front";
import * as BUIC from "@thatopen/ui-obc";
import { FragmentsGroup } from "@thatopen/fragments";

export async function setupProperties(
  components: OBC.Components,
  model: FragmentsGroup | undefined,
  world: OBC.SimpleWorld
) {
  // Initialize properties table
  const [propertiesTable, updatePropertiesTable] =
    BUIC.tables.elementProperties({
      components,
      fragmentIdMap: {},
    });

  propertiesTable.preserveStructureOnFilter = true;
  propertiesTable.indentationInText = false;

  // Setup selection highlighter
  const highlighter = components.get(OBCF.Highlighter);
  highlighter.setup({ world });

  highlighter.events.select.onHighlight.add((fragmentIdMap) => {
    updatePropertiesTable({ fragmentIdMap });
  });

  highlighter.events.select.onClear.add(() => {
    updatePropertiesTable({ fragmentIdMap: {} });
  });

  // Create properties panel UI
  const propertiesPanel = BUI.Component.create(() => {
    const onTextInput = (e: Event) => {
      const input = e.target as BUI.TextInput;
      propertiesTable.queryString = input.value !== "" ? input.value : null;
    };

    const expandTable = (e: Event) => {
      const button = e.target as BUI.Button;
      propertiesTable.expanded = !propertiesTable.expanded;
      console.log(propertiesTable);
      button.label = propertiesTable.expanded ? "Collapse" : "Expand";
    };

    const copyAsTSV = async () => {
      await navigator.clipboard.writeText(propertiesTable.tsv);
    };

    return BUI.html`
      <bim-panel label="Properties">
        <bim-panel-section label="Element Data">
          <div style="display: flex; gap: 0.5rem;">
            <bim-button @click=${expandTable} label=${
      propertiesTable.expanded ? "Collapse" : "Expand"
    }></bim-button>
            <bim-button @click=${copyAsTSV} label="Copy as TSV"></bim-button>
          </div>
          <bim-text-input @input=${onTextInput} placeholder="Search Property" debounce="250"></bim-text-input>
          ${propertiesTable}
        </bim-panel-section>
      </bim-panel>
    `;
  });
  document.querySelector(".properties")?.appendChild(propertiesPanel);
}

export async function processModelRelations(
  components: OBC.Components,
  model: FragmentsGroup
) {
  const indexer = components.get(OBC.IfcRelationsIndexer);
  await indexer.process(model);
}
