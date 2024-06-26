import { Typography, Button } from "@mui/material";
import { Col, Row } from "antd";
import { TypeAnimation } from "react-type-animation";

export default function Banner() {
  return (
    <div className="banner">
      <Row className="w-100% items-end text-center pb-1 mt-[75px]">
        <Col span={24}>
          <Typography
            fontWeight="bold"
            className="bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-900 banner-title"
          >
            A fully decentralized Network with
          </Typography>
        </Col>
      </Row>
      <Row className="text-center" style={{ height: "170px" }}>
        <Col span={24}>
          <TypeAnimation
            sequence={[
              "Easy use for everyone",
              2800,
              "Low cost to participate",
              2800,
              "Optimal energy consumption",
              2800,
              "Civilized and fair",
              2800,
              "New consensus mechanism",
              2800,
            ]}
            wrapper="span"
            speed={5}
            repeat={Infinity}
            className="type-animation-wrapper"
          />
        </Col>
      </Row>
      <Row className=" h-auto text-center flex items-center">
        <Col span={24} className="flex justify-center">
          <div className="banner-description">
            <Typography
              variant="h5"
              className="bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-green-600"
            >
              And you do not need specialized hardware or high-performance
              computing devices like miners, nor do you need to stake any value
              in the network
            </Typography>
          </div>
        </Col>
      </Row>
      <Row className="flex items-center">
        <Col span={24} className="flex justify-center pt-6">
          <Button
            variant="outlined"
            className="w-72 h-14 border-slate-600 text-white bg-slate-600 hover:bg-white hover:border-slate-600 hover:text-slate-600"
          >
            <Typography>read more</Typography>
          </Button>
        </Col>
      </Row>
    </div>
  );
}
