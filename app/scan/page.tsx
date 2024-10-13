"use client";
import { Container, ThemeProvider, createTheme } from "@mui/material";
import { Col, Row } from "antd";
import ScanedBlocks from "./components/blocks";
import ScanedTrx from "./components/transactions";
import { useEffect } from "react";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Scan() {
  useEffect(() => {
    document.title = "Centichain - Scan";
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="bg-gray-900 min-h-screen">
        <Container maxWidth="xl" className="pt-[80px] shadow-lg rounded-b-md">
          <Row gutter={[16, 16]}>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="p-3 min-h-[750px]"
            >
              <ScanedBlocks />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="p-3 min-h-[750px]"
            >
              <ScanedTrx />
            </Col>
          </Row>
        </Container>
      </div>
    </ThemeProvider>
  );
}
