import { StrictMode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import ThemeProvider from "./components/ThemeProvider";
import { initGA } from "./lib/analytics";

import "./index.css";

import { TooltipProvider } from "./components/ui/tooltip";
import { persister, queryClient } from "./lib/tanstackQuery";
import { persistor, store } from "./store/store";

initGA();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
          >
            <TooltipProvider>
              <App />
            </TooltipProvider>
            <ReactQueryDevtools />
          </PersistQueryClientProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
