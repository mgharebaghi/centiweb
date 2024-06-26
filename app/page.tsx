"use client";
import { ThemeProvider, responsiveFontSizes, createTheme } from "@mui/material";
import Banner from "./components/banner";
import Articles from "./components/articles.tsx";
import Generated from "./components/generated";
import Becomes from "./components/becomes";
import Make from "./components/usedToMake";

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Banner />
      <Articles />
      <Becomes />
      <Generated />
      <Make />
    </ThemeProvider>
  );
}
