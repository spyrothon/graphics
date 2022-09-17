import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./Store";
import ThemeProvider from "./uikit/ThemeProvider";

const root = createRoot(document.querySelector("#app-container")!);

root.render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
);
