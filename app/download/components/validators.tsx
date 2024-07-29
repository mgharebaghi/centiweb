import { Container, Typography } from "@mui/material";
import { Col, Divider, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { SiApple, SiLinux, SiWindows } from "react-icons/si";
import { TypeAnimation } from "react-type-animation";

function Validators() {
  return (
    <Row className="h-screen bg-slate-100 flex items-center">
      <Container maxWidth="lg" className="pb-[10%] select-none">
        <Row>
          <Col span={24} className="flex justify-center">
            <Image
              alt="Centichanin logo"
              src="/images/Logo.png"
              width={300}
              height={300}
            />
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className="flex justify-center text-center text-slate-700"
          >
            <Typography variant="h2" fontWeight="bold">
              The Validator Built
            </Typography>
          </Col>
          <Col
            span={12}
            className="flex justify-end pr-3 text-slate-700 items-center"
          >
            <Typography variant="h3" fontWeight="bold">
              To Be
            </Typography>
          </Col>
          <Col span={12} className="flex justify-start items-center">
            <TypeAnimation
              sequence={["Easy", 2800, "Free", 2800, "New", 2800]}
              wrapper="span"
              speed={5}
              repeat={Infinity}
              className="dl-type-animation-wrapper font-sans"
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} className="text-center">
            <Typography className="text-slate-400">V0.9.2</Typography>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col
            xs={24}
            sm={24}
            md={8}
            lg={8}
            xl={8}
            xxl={8}
            className="flex justify-center pt-5"
          >
            <Link
              href="https://centichain.org/downloads/updates/windows/x64/v0.9.2/Centichain_0.9.2_x64_en-US.msi"
              // target="_blank"
              className="w-[95%] flex justify-center items-center bg-slate-700 text-slate-100 hover:bg-white hover:text-slate-700 border-[1px] border-slate-700 rounded-md h-[80px] transition duration-200"
            >
              <SiWindows className="mr-2" size={40} />
              <Typography variant="h3">Windows</Typography>
              <span className="ml-1 mt-6"></span>
            </Link>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={8}
            lg={8}
            xl={8}
            xxl={8}
            className="flex justify-center pt-5"
          >
            <Link
              href="#"
              // target="_blank"
              className="w-[95%] flex justify-center items-center bg-slate-700 text-slate-100 hover:bg-white hover:text-slate-700 border-[1px] border-slate-700 rounded-md h-[80px] transition duration-200"
            >
              <SiApple className="mr-2" size={50} />
              <Typography variant="h3">Mac</Typography>
              <span className="ml-1 mt-6">soon...</span>
            </Link>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={8}
            lg={8}
            xl={8}
            xxl={8}
            className="flex justify-center pt-5"
          >
            <Link
              href="#"
              // target="_blank"
              className="w-[95%] flex justify-center items-center bg-slate-700 text-slate-100 hover:bg-white hover:text-slate-700 border-[1px] border-slate-700 rounded-md h-[80px] transition duration-200"
            >
              <SiLinux className="mr-2" size={50} />
              <Typography variant="h3">Linux</Typography>
              <span className="ml-1 mt-6">soon...</span>
            </Link>
          </Col>
        </Row>
      </Container>
    </Row>
  );
}

export default Validators;
