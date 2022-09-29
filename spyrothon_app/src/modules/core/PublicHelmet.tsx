import * as React from "react";
import Helmet from "react-helmet";

type PublicHelmetProps = {
  className?: string;
};

export default function PublicHelmet(props: PublicHelmetProps) {
  const { className } = props;
  return (
    <Helmet>
      <title>Spyrothon</title>
      <body className={className} />
    </Helmet>
  );
}
