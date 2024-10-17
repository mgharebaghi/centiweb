"use client";
import { Col, Empty, Row, Typography } from "antd";
import Card from "../cards";
import { PulseLoader } from "react-spinners";
import { Post } from "@/app/api/types/types";

function Articles(props: any) {
  return (
    <Row className="min-h-[500px]">
      {!props.loading && props.err === "" ? (
        props.articles.length > 0 ? (
          props.articles.map((item: Post, index: number) => {
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
                  getUrl={"/api/articles"}
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

export default Articles;
