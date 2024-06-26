import { Button, Typography } from "@mui/material";
import { Col, Row } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Card(props: any) {
  const route = useRouter();
  return (
    <div className="rounded-md bg-gray-50 w-[100%] min-h-[200px] shadow-md hover:shadow-xl transition duration-150">
      <Row>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={9}
          xl={9}
          xxl={9}
          className="flex justify-center items-center"
        >
          <Image alt="img" src={props.pic} width={200} height={200} />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={15}
          xl={15}
          xxl={15}
          className="min-h-[200px]"
        >
          <Row className="min-h-[40px]">
            <Col span={24} className="p-3">
              <Typography variant="h5">{props.title}</Typography>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="pl-3 min-h-[100px]">
              <Typography>{props.description}</Typography>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="p-3 flex justify-center">
              <Button
                variant="contained"
                className="w-[90%]"
                onClick={() => {
                  route.push(`articles/${props.id}`);
                  window.scroll(0, 0);
                }}
              >
                read more
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
