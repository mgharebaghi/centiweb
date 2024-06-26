import { Button, Typography } from "@mui/material";
import { Col, Divider, Row } from "antd";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

function DeleteModal(props: any) {
  const [delMsg, setDelMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function delArt() {
    setLoading(true);
    const data = {
      id: props.id,
    };
    await fetch("/api/delete", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) {
        setLoading(false);
        setDelMsg("Server error!");
      } else {
        res.json().then((data) => {
          if (data.status === "done") {
            setLoading(false);
            props.getData();
            props.setOpenDelete(false);
          } else {
            setLoading(false);
            setDelMsg(data.status);
          }
        });
      }
    });
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Typography>
            Are you sure?! you want to delete the {props.title} article?
          </Typography>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={14} className="flex items-center">
          <Typography color="red">{delMsg}</Typography>
        </Col>
        <Col span={10}>
          <Row>
            <Col span={12}>
              <Button
                variant="outlined"
                className="min-h-[40px]"
                onClick={() => props.setOpenDelete(false)}
              >
                cancel
              </Button>
            </Col>
            <Col span={12}>
              <Button
                variant="contained"
                className="min-h-[40px]"
                onClick={delArt}
              >
                {loading ? <PulseLoader color="white" size={3} /> : "delete"}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default DeleteModal;
