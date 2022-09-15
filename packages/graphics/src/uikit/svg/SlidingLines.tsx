import * as React from "react";

import styles from "./SlidingLines.module.css";

type LineProps = {
  x: number;
  y: number;
  height: number;
  width: number;
  color: string;
};

function Line(props: LineProps) {
  const { x, y, width, height, color } = props;
  return (
    <line
      x1={x}
      y1={y}
      x2={x}
      y2={y + height}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
    />
  );
}

type LineStackProps = {
  x: number;
  y: number;
  totalHeight: number;
  minHeight: number;
  maxHeight: number;
  width: number;
  gap: number;
};

const COLOR_OPTIONS = ["#382645", "#704B8A"];

function LineStack(props: LineStackProps) {
  const { x, y, totalHeight, minHeight, maxHeight, width, gap } = props;

  const [lines] = React.useState(() => {
    const lines: JSX.Element[] = [];

    let currentHeight = 0;
    while (currentHeight <= totalHeight) {
      const opacity = Math.random() * 0.5 + 0.1;
      const scaledOpacity = Math.floor(opacity * 255);
      const nextHeight = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
      lines.push(
        <Line
          key={currentHeight}
          x={x}
          y={currentHeight}
          height={nextHeight}
          width={width}
          color={`${COLOR_OPTIONS[scaledOpacity % COLOR_OPTIONS.length]}${scaledOpacity.toString(
            16,
          )}`}
        />,
      );
      currentHeight += nextHeight + gap;
    }

    return lines;
  });

  const [delay] = React.useState(() => Math.random() * 2500 - 700);
  const [time] = React.useState(() => Math.random() * 5 + 13);
  const [direction] = React.useState(() =>
    Math.floor(Math.random() * 1001) % 2 === 0 ? "alternate" : "alernate-reverse",
  );

  const style = {
    "--stackHeight": `${totalHeight}px`,
    "--randomDelay": delay,
    "--randomTime": time,
    "--randomDirection": direction,
  } as React.CSSProperties;

  return (
    <g x={x} y={y} className={styles.stack} style={style}>
      {lines}
    </g>
  );
}

type SlidingLinesProps = {
  lineWidth?: number;
  className?: string;
};

export default function SlidingLines(props: SlidingLinesProps) {
  const { lineWidth = 16, className } = props;

  const containerRef = React.useRef<SVGSVGElement>(null);
  const [size, setSize] = React.useState([0, 0]);

  React.useLayoutEffect(() => {
    const container = containerRef.current;
    if (container == null) return;

    const style = window.getComputedStyle(container);
    const width = Math.ceil(parseFloat(style.width));
    const height = Math.ceil(parseFloat(style.height));

    setSize([width, height]);
  }, []);

  const [width, height] = size;
  const renderedHeight = height * 4;

  const maxStacks = 30;

  const [stacks, setStacks] = React.useState<JSX.Element[]>([]);

  React.useEffect(() => {
    let currentX = lineWidth / 2;
    let index = 0;
    const stacks: JSX.Element[] = [];
    while (currentX < width + lineWidth && index < maxStacks) {
      stacks.push(
        <LineStack
          key={currentX}
          x={currentX}
          y={-height * 2}
          totalHeight={renderedHeight}
          minHeight={lineWidth}
          maxHeight={lineWidth * 5}
          width={lineWidth}
          gap={lineWidth * 1.5}
        />,
      );

      index += 1;
      currentX += lineWidth * 1.5;
    }

    setStacks(stacks);
  }, [lineWidth, width, height]);

  return (
    <svg
      ref={containerRef}
      preserveAspectRatio="xMinYMid meet"
      viewBox={`0 0 ${width} ${height}`}
      className={className}>
      {stacks}
    </svg>
  );
}
