import * as React from "react";
import { createRoot } from "react-dom/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// import "@spyrothon/uikit/style.css";

import { ThemeProvider } from "@spyrothon/uikit";
import App from "./App";
import { store } from "./Store";

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
