"use client";
import { ThemeProvider, responsiveFontSizes, createTheme } from "@mui/material";
import Validators from "./components/validators";
import Relay from "./components/relay";
import { useEffect } from "react";

let theme = createTheme();
theme = responsiveFontSizes(theme);

function Download() {
  useEffect(() => {
    document.title = "Centichain - Download";
  }, []);
  return (
    <div className="w-full pt-[75px] min-h-[750px]">
      <ThemeProvider theme={theme}>
        <Validators />
        <Relay />
      </ThemeProvider>
    </div>
  );
}

export default Download;
