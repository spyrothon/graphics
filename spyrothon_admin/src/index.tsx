import * as React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Link } from "react-router-dom";
import { setAnchorRenderer, ThemeProvider as SparxThemeProvider } from "@spyrothon/sparx";
import { ThemeProvider } from "@spyrothon/uikit";

import App from "./App";
import { store } from "./Store";

import "@spyrothon/uikit/style.css";
import "@spyrothon/sparx/style.css";
import "@spyrothon/sparx/default.css";

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
