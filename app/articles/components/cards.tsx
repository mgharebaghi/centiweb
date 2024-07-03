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
          <Row className="min-h-[150px] grid content-center">
            <Col span={24} className="p-3">
              <Typography variant="h5" fontWeight="bold">{props.title}</Typography>
            </Col>
          </Row>
          {/* <Row>
            <Col span={24} className="pl-3 min-h-[100px]">
              <Typography>
                {props.description.length > 200
                  ? props.description.substring(0, 200) + "..."
                  : props.description}
              </Typography>
            </Col>
          </Row> */}
          <Row>
            <Col span={24} className="min-h-[50px] flex justify-center items-end pb-3">
              <Button
                variant="contained"
                className="w-[90%]"
                onClick={() => {
                  route.push(`${props.id}`);
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
