import * as React from "react";
import Helmet from "react-helmet";

export default function AdminHelmet() {
  return (
    <Helmet>
      <html lang="en-US" />
      <body className="admin" />
    </Helmet>
  );
}
