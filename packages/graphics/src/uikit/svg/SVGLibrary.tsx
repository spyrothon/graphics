import * as React from "react";

export enum Filters {
  SHARP_BLUR = "sharpBlur",
}

function SharpBlur() {
  return (
    <filter id={Filters.SHARP_BLUR}>
      <feGaussianBlur stdDeviation="12" />
      <feColorMatrix
        type="matrix"
        values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0" />
      <feComposite in2="SourceGraphic" operator="in" />
    </filter>
  );
}

export const SVGFilters = {
  [Filters.SHARP_BLUR]: SharpBlur,
};

export default function SVGLibrary() {
  return (
    <svg style={{ display: "none" }}>
      {Object.values(SVGFilters).map((Filter, index) => (
        <Filter key={index} />
      ))}
    </svg>
  );
}
