import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import ThemeProvider from "./components/ThemeProvider.jsx";
import "./index.css";
import { persister, queryClient } from "./lib/tanstackQuery.js";
import { persistor, store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}
        >
          <ThemeProvider>
            <App />
            <ReactQueryDevtools />
          </ThemeProvider>
        </PersistQueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
