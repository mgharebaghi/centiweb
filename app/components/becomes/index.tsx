import { Button, Typography } from "@mui/material";
import { Col, Row } from "antd";
import { useRouter } from "next/navigation";

function Becomes() {
  const route = useRouter();
  return (
    <Row className="min-h-[500px]">
      {/* relay */}
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        className="min-h-[500px] flex justify-center items-center pb-5"
      >
        <Row className="w-[90%]">
          <Col span={24} className="grid justify-center">
            <img
              src="/images/RelayLaptop.png"
              className="w-[300px] h-[300px]"
            />
          </Col>
          <Col span={24} className="grid justify-center text-center break-all">
            <Typography variant="h4" fontWeight="bold">
              Become a Relay
            </Typography>
            <Typography>
              You can become a relay node on the Centichain network and earn
              rewards. More relay nodes on the Centichain network mean a more
              secure, faster, and more decentralized network. By becoming a
              relay node, you will contribute to the improvement of the network.
            </Typography>
          </Col>
          <Col span={24} className="grid justify-center pt-3">
            <Button
              variant="outlined"
              onClick={() => route.push('/articles/668540112b7f6349a1f3bbb8')}
              className="border-slate-600 text-slate-600 hover:border-slate-600 hover:bg-slate-600 hover:text-white"
            >
              How to become
            </Button>
          </Col>
        </Row>
      </Col>

      {/* validator */}
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        className="min-h-[500px] bg-slate-300 flex justify-center items-center pb-5 rounded-tl-md"
      >
        <Row className="w-[90%]">
          <Col span={24} className="grid justify-center">
            <img
              src="/images/ValidatorMonitor.png"
              className="w-[300px] h-[300px]"
            />
          </Col>
          <Col span={24} className="grid justify-center text-center break-all">
            <Typography variant="h4" fontWeight="bold">
              Become a Validator
            </Typography>
            <Typography>
              As a validator, you contribute to the network’s security and
              consensus, and in return, you receive rewards for your service.
              It’s a win-win situation where you support the Centichain
              ecosystem while earning incentives.
            </Typography>
          </Col>
          <Col span={24} className="grid justify-center pt-3">
            <Button
              onClick={() => route.push("/articles/66853f1a2b7f6349a1f3bbb7")}
              variant="outlined"
              className="border-slate-600 text-white bg-slate-600 hover:border-slate-600 hover:bg-white hover:text-slate-600"
            >
              How to become
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Becomes;
