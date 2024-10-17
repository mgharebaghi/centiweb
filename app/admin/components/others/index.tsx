'use client'
import { Col, Empty, Row } from "antd";
import { ObjectId } from "mongodb";
import Card from "../cards";
import { Typography } from "@mui/material";
import { PulseLoader } from "react-spinners";
interface Post {
  _id: ObjectId;
  title: string;
  description: string;
  content: string;
  type: string;
  image: string;
}

function Others(props: any) {
  return (
    <Row className="min-h-[500px]">
      {!props.loading && props.err === "" ? (
        props.others.length > 0 ? (
          props.others.map((item: Post, index: number) => {
            return (
              <Col
                key={index}
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="p-3"
              >
                <Card
                  id={item._id.toString()}
                  pic={item.image}
                  title={item.title}
                  description={item.description}
                  content={item.content}
                  type={item.type}
                  index={index}
                  getData={props.fetchData}
                  setData={props.setData}
                  getUrl={"/api/others"}
                />
              </Col>
            );
          })
        ) : (
          <Col
            span={24}
            className="min-h-500px flex justify-center items-center"
          >
            <Empty />
          </Col>
        )
      ) : props.err !== "" && !props.loading ? (
        <Typography color="red">{props.err}</Typography>
      ) : (
        <Col span={24} className="min-h-500px flex justify-center items-center">
          <PulseLoader color="gray" size="5px" />
        </Col>
      )}
    </Row>
  );
}

export default Others;
