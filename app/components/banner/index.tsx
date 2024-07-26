import { Typography, Button, Container } from "@mui/material";
import { Col, Row } from "antd";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

export default function Banner() {
  const btn_class =
    "w-[100%] h-16 border-[1px] grid justify-center items-center rounded-md transition duration-200 border-slate-600 text-white bg-slate-600 hover:bg-white hover:border-slate-600 hover:text-slate-600";
  return (
    <div className="banner h-screen">
      <Row className="w-100% items-end text-center pb-1 mt-[75px]">
        <Col span={24}>
          <Typography
            fontWeight="bold"
            className="bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-900 banner-title"
          >
            A Fully Decentralized Network With
          </Typography>
        </Col>
      </Row>
      <Row className="text-center" style={{ height: "170px" }}>
        <Col span={24}>
          <TypeAnimation
            sequence={[
              "Easy Use For Everyone",
              2800,
              "Low Cost To Participate",
              2800,
              "Optimal Energy Consumption",
              2800,
              "Civilized And Fair",
              2800,
              "New Consensus Mechanism",
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
              className="bg-clip-text text-transparent bg-gradient-to-r from-slate-950 to-slate-500"
            >
              And you do not need specialized hardware or high-performance
              computing devices like miners, nor do you need to stake any value
              in the network
            </Typography>
          </div>
        </Col>
      </Row>
      <Container maxWidth="sm" className="mt-10">
        <Row>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            xxl={12}
            className="flex justify-center p-3"
          >
            <Link href="/download" className={btn_class}>
              <Typography>Download</Typography>
            </Link>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            xxl={12}
            className="flex justify-center p-3"
          >
            <Link
              href="/articles/66901aa0261897ff8bf5d199"
              className={btn_class}
            >
              <Typography>Read More</Typography>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
