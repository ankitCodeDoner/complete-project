import { createTheme } from "@mui/material/styles";
// theme.d.ts
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    sidebar: {
      mainBg: string;
      textPrimary: string;
      textSecondary: string;
    };
  }
  interface PaletteOptions {
    sidebar?: {
      mainBg?: string;
      textPrimary?: string;
      textSecondary?: string;
    };
  }
}
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#75158A",
    },
    secondary: {
      main: "#f97316",
    },
    sidebar: {
      mainBg: "#111827",
      textPrimary: "#ffffff",
      textSecondary: "#9ca3af",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },
  },
});
export default theme;
