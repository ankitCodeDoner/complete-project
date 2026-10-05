import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import theme from "./utils/theme.ts";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import "react-quill/dist/quill.snow.css";
import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Toaster />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
