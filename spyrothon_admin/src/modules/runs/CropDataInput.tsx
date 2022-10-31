import * as React from "react";
import { CropTransform } from "@spyrothon/api";
import { FormControl, Stack, TextInput } from "@spyrothon/sparx";

interface CropDataInputProps {
  label?: React.ReactNode;
  transform: CropTransform;
  onChange: (transform: CropTransform) => void;
}

export default function CropDataInput(props: CropDataInputProps) {
  const { label, transform, onChange } = props;

  function changeHandler(position: keyof CropTransform) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...transform,
        [position]: parseInt(event.target.value),
      });
    };
  }

  return (
    <FormControl label={label} note="Enter as Top, Right, Bottom, Left">
      <Stack direction="horizontal" spacing="space-sm" wrap={false}>
        <TextInput type="number" value={transform.top} onChange={changeHandler("top")} />
        <TextInput type="number" value={transform.right} onChange={changeHandler("right")} />
        <TextInput type="number" value={transform.bottom} onChange={changeHandler("bottom")} />
        <TextInput type="number" value={transform.left} onChange={changeHandler("left")} />
      </Stack>
    </FormControl>
  );
}
