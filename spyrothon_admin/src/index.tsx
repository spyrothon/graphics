import * as React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Link } from "react-router-dom";
import { setAnchorRenderer, ThemeProvider } from "@spyrothon/sparx";

// These style imports come first so that the app's styles take precedence.
import "@spyrothon/sparx/dist/style.css";
import "@spyrothon/sparx/dist/default.css";

// This blank code is needed to keep `simple-import-sort` from complaining that
// the following imports should be moved to above the CSS.
const _t = null;
import App from "./App";
import { store } from "./Store";

setAnchorRenderer(({ href, ...props }) => <Link to={href} {...props} />);

const root = createRoot(document.querySelector("#app-container")!);

root.render(
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </DndProvider>,
);
