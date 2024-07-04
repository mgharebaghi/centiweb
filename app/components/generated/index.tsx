import { Container, Typography } from "@mui/material";
import { Col, Row } from "antd";
import { SiHiveBlockchain } from "react-icons/si";
import { FaExchangeAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

function Generated() {
  const [blockLoading, setBlockLoading] = useState<boolean>(false);
  const [blocks, setBlocks] = useState<string>("");
  const [transactions, setTransactions] = useState(0);
  const [trxLoading, setTrxLoading] = useState(false);

  useEffect(() => {
    generatedBlocks();
    confirmedTrxs();
  }, []);

  const generatedBlocks = async () => {
    setBlockLoading(true);
    const res = await fetch("/api/blocks");

    if (!res.ok) {
      setBlockLoading(false);
      setBlocks("0");
    } else {
      res.json().then((data) => {
        setBlockLoading(false);
        setBlocks(data.number);
      });
    }
  };

  const confirmedTrxs = async () => {
    setTrxLoading(true);
    const res = await fetch("/api/trxcount");

    if (!res.ok) {
      setTrxLoading(false);
      setTransactions(0);
    } else {
      res.json().then((data) => {
        setTrxLoading(false);
        setTransactions(Number(data.data));
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
                  {!blockLoading ? (
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
                  {!trxLoading ? (
                    transactions.toLocaleString()
                  ) : (
                    <PulseLoader color="white" size={5} />
                  )}
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
