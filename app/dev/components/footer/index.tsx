import { Typography } from "@mui/material";
import { Button, Col, Divider, Row } from "antd";
import { GrNext, GrPrevious } from "react-icons/gr";

function DevFooter(props: any) {
  return (
    <Row>
      <Col span={11} className="flex justify-end items-center pr-10">
        {props.items[Number(props.itemKey) - 1] ? (
          <Button
            type="text"
            icon={<GrPrevious />}
            className="text-2xl"
            onClick={() => {
              if (Number(props.itemKey) > 0) {
                let newNumber = Number(props.itemKey) - 1;
                props.setKey(newNumber.toString());
                window.scroll(0, 0);
              }
            }}
          />
        ) : null}
        <Typography className="text-slate-500">
          {props.items[Number(props.itemKey) - 1]
            ? props.items[Number(props.itemKey) - 1].label
            : null}
        </Typography>
      </Col>
      <Col span={2} className="flex justify-center items-center">
        <Divider type="vertical" />
      </Col>
      <Col span={11} className="flex justify-start items-center">
        <Typography className="text-slate-500">
          {props.items[Number(props.itemKey) + 1]
            ? props.items[Number(props.itemKey) + 1].label
            : null}
        </Typography>
        {props.items[Number(props.itemKey) + 1] ? (
          <Button
            type="text"
            icon={<GrNext />}
            className="text-2xl pl-3"
            onClick={() => {
              if (Number(props.itemKey) < props.items.length - 1) {
                let newNumber = Number(props.itemKey) + 1;
                props.setKey(newNumber.toString());
                window.scroll(0, 0);
              }
            }}
          />
        ) : null}
      </Col>
    </Row>
  );
}

export default DevFooter;
