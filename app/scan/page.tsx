"use client";
import { Container } from "@mui/material";
import { Col, Row } from "antd";
import ScanedBlocks from "./components/blocks";
import ScanedTrx from "./components/transactions";
import { useEffect } from "react";

export default function Scan() {
  useEffect(() => {
    document.title = "Centichain - Scan";
  }, []);
  return (
    <Container maxWidth="xl" className="pt-[80px] shadow-md rounded-b-md">
      <Row>
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
  );
}
