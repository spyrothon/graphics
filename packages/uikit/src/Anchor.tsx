import * as React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import styles from "./Anchor.module.css";

type AnchorProps =
  | {
      href: string;
      target?: string;
      rel?: string;
      className?: string;
      children: React.ReactNode;
      onClick?: () => unknown;
    }
  | {
      href?: undefined;
      className?: string;
      children: React.ReactNode;
      onClick: () => unknown;
    };

export function Anchor(props: AnchorProps) {
  const { children, className, href, ...linkProps } = props;

  const isLocal = href == null || !/(?:^[a-z][a-z0-9+.-]*:|\/\/)/.test(href);

  if (!isLocal) {
    return (
      <a
        tabIndex={0}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(styles.anchor, "block-external", className)}
        {...linkProps}>
        {children}
      </a>
    );
  }

  if (href == null) {
    return (
      <span
        tabIndex={0}
        role="link"
        {...linkProps}
        className={classNames(styles.anchor, className)}>
        {children}
      </span>
    );
  }

  return (
    <Link tabIndex={0} to={href} {...linkProps} className={classNames(styles.anchor, className)}>
      {children}
    </Link>
  );
}
