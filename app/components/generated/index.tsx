import { Container, Typography } from "@mui/material";
import { Col, Row } from "antd";
import { SiHiveBlockchain } from "react-icons/si";
import { FaExchangeAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

function Generated() {
  const [loading, setLoading] = useState<boolean>(false);
  const [blocks, setBlocks] = useState<string>("");

  useEffect(() => {
    generatedBlocks();
  }, []);

  const generatedBlocks = async () => {
    setLoading(true);
    const res = await fetch("/api/blocks");

    if (!res.ok) {
      setLoading(false);
      setBlocks("0");
    } else {
      res.json().then((data) => {
        setLoading(false);
        setBlocks(data.number);
      });
    }
  };

  return (
    <div className="w-[100%] bg-slate-700">
      <Container className="min-h-[400px]">
        <Row>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            className="text-white min-h-[400px] flex justify-center items-center"
          >
            <Row>
              <Col span={24} className="grid justify-center">
                <SiHiveBlockchain size={100} />
              </Col>
              <Col span={24} className="text-center">
                <Typography variant="h3" className="text-white">
                  {!loading ? (
                    Number(blocks).toLocaleString()
                  ) : (
                    <PulseLoader color="white" size={5} />
                  )}
                </Typography>
                <Typography>Blocks generated</Typography>
              </Col>
            </Row>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            className="text-white min-h-[400px] flex justify-center items-center"
          >
            <Row>
              <Col span={24} className="grid justify-center">
                <FaExchangeAlt size={100} />
              </Col>
              <Col span={24} className="text-center">
                <Typography variant="h3" className="text-white">
                  {Number(2000).toLocaleString()}
                </Typography>
                <Typography>Transactions confirmed</Typography>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Generated;
