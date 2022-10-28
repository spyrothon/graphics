import * as React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Link } from "react-router-dom";
import { setAnchorRenderer, ThemeProvider as SparxThemeProvider } from "@spyrothon/sparx";
import { ThemeProvider } from "@spyrothon/uikit";

// These style imports come first so that the app's styles take precedence.
import "@spyrothon/uikit/style.css";
import "@spyrothon/sparx/style.css";
import "@spyrothon/sparx/default.css";

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
      <SparxThemeProvider>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </SparxThemeProvider>
    </Provider>
  </DndProvider>,
);
