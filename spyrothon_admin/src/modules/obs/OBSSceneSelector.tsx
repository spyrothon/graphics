import * as React from "react";
import { FormControl, SelectInput, Text } from "@spyrothon/sparx";

import { useOBSStore } from "./OBSStore";
import type { OBSScene } from "./OBSTypes";

type OBSSceneSelectorProps = {
  label?: React.ReactNode;
  note?: React.ReactNode;
  selectedSceneName?: string;
  className?: string;
  onSelect: (entry?: OBSScene) => unknown;
};

export default function OBSSceneSelector(props: OBSSceneSelectorProps) {
  const {
    label = "OBS Scene",
    note = "Name of the scene to use in OBS.",
    selectedSceneName,
    className,
    onSelect,
  } = props;
  const scenes = useOBSStore((state) => state.data.sceneList);
  const sceneOptions = scenes.map((scene) => ({ name: scene.sceneName, value: scene }));

  const selected = React.useMemo(
    () => sceneOptions.find((entry) => entry.name === selectedSceneName),
    [selectedSceneName, sceneOptions],
  );

  return (
    <FormControl label={label} note={note}>
      <SelectInput
        className={className}
        items={sceneOptions}
        renderItem={(entry) => entry?.name ?? "(unnamed)"}
        selectedItem={selected}
        renderPlaceholder={() => <Text>Select an OBS Scene</Text>}
        onSelect={(entry) => onSelect(entry?.value)}
      />
    </FormControl>
  );
}
