import { Container, Typography } from "@mui/material";
import { Col, Divider, message, Row } from "antd";
import Image from "next/image";
import { FaCopy } from "react-icons/fa";

function Relay() {
  const relayCmd =
    "wget -N https://centichain.org/downloads/relay-service && chmod 777 relay-service && ./relay-service";

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Command copied",
      style: { marginTop: "70px" },
    });
  };

  return (
    <Row className=" min-h-[300px] pr-1">
      {contextHolder}
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        className="bg-slate-800 flex justify-center items-center rounded-r-full p-2"
      >
        <Row>
          <Col
            xs={24}
            sm={24}
            md={5}
            lg={5}
            xl={5}
            xxl={5}
            className="grid justify-center content-center"
          >
            <Image
              src="/images/ubuntu.png"
              alt="centichain relay ubuntu"
              width={100}
              height={100}
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={19}
            lg={19}
            xl={19}
            xxl={19}
            className="grid justify-start content-center p-3"
          >
            <Typography
              variant="h4"
              // fontWeight="bold"
              className="text-slate-700 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-white"
            >
              Maximize Your Earnings with Centichain’s Relay Node
            </Typography>
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
        className="grid justify-center content-center p-1"
      >
        <Row>
          <Col span={24} className="pr-5 text-center">
            <Typography
              variant="h5"
              className="text-slate-300"
              fontWeight="bold"
            >
              Copy this command into your ubuntu server
            </Typography>
          </Col>
        </Row>
        <Divider />
        <Row className="p-4">
          <Col
            xs={24}
            sm={24}
            md={22}
            lg={22}
            xl={22}
            xxl={22}
            className="min-h-40px p-3 bg-slate-200 rounded-l-md select-none"
          >
            <Typography fontWeight="bold">{relayCmd}</Typography>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={2}
            lg={2}
            xl={2}
            xxl={2}
            className="min-h-[40px] bg-slate-700 rounded-r-md grid justify-center content-center text-white hover:bg-slate-200 hover:text-slate-700 cursor-pointer transition duration-200"
            onClick={() => {
              navigator.clipboard.writeText(relayCmd);
              success();
            }}
          >
            <FaCopy size={30} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Relay;
