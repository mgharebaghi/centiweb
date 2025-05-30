"use client";
import { ThemeProvider, responsiveFontSizes, createTheme } from "@mui/material";
import Banner from "./components/banner";
import Articles from "./components/articles.tsx";
import Generated from "./components/generated";
import Becomes from "./components/becomes";
import Make from "./components/usedToMake";
import { ThemeProvider as LightTheme } from "next-themes";
import { useRef } from "react";
import RoadmapComponent from "./components/roadmap";

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Home() {
  return (
    <LightTheme attribute="class" defaultTheme="light">
      <ThemeProvider theme={theme}>
        <Banner />
        <Articles />
        <Generated />
        <Becomes />
        {/* <RoadmapComponent /> */}
        <Make />
      </ThemeProvider>
    </LightTheme>
  );
}
