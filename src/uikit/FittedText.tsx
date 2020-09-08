import * as React from "react";
import classNames from "classnames";

type FittedTextProps = {
  maxSize?: number;
  children: React.ReactNode;
  className?: string;
};

export default function FittedText(props: FittedTextProps) {
  const { maxSize = Infinity, className, children } = props;

  const outerRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);

  const [fontSize, setFontSize] = React.useState(16);

  React.useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (outer == null || inner == null) return;

    const outerWidth = outer.clientWidth;
    const innerWidth = inner.clientWidth;
    const currentFontSize = parseInt(inner.style.getPropertyValue("font-size"));

    setFontSize(Math.min(maxSize, (outerWidth / innerWidth) * currentFontSize));
    console.log(outerWidth, innerWidth, currentFontSize);
  }, [maxSize, children]);

  return (
    <div ref={outerRef} className={classNames(className)}>
      <span ref={innerRef} style={{ whiteSpace: "nowrap", display: "inline-block", fontSize }}>
        {children}
      </span>
    </div>
  );
}
