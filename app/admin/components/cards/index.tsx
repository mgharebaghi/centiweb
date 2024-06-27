'use client'
import { Typography } from "@mui/material";
import { Col, Divider, Modal, Row, Spin } from "antd";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Editor from "./components/editMod";
import { PiSealWarningBold } from "react-icons/pi";
import DeleteModal from "./components/deleteMod";

export default function Card(props: any) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div
      key={props.index}
      className="rounded-md bg-gray-50 w-[100%] min-h-[200px] shadow-md"
    >
      <Row>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={9}
          xl={9}
          xxl={9}
          className="flex justify-center items-center min-h-[200px]"
        >
          <Image alt="img" className="rounded-2xl" src={props.pic} width={200} height={200} />
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
          <Row className="w-[50%] float-end">
            <Col span={24} className="p-3 flex justify-end">
              <Col span={8} className="flex justify-center items-center">
                <div
                  className="text-slate-400 cursor-pointer hover:bg-slate-400 hover:text-white rounded-sm transition duration-150 p-1"
                  onClick={() => setOpenEdit(true)}
                >
                  <MdOutlineEditNote size={25} />
                </div>
              </Col>
              <Col span={8} className="flex justify-center items-center">
                <div
                  className="text-red-600 cursor-pointer hover:bg-red-500 hover:text-white rounded-sm transition duration-150 p-1"
                  onClick={() => setOpenDelete(true)}
                >
                  <MdDelete size={25} />
                </div>
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        title="Edit"
        open={openEdit}
        width="100%"
        onCancel={() => setOpenEdit(false)}
        footer={null}
      >
        <Editor
          id={props.id}
          title={props.title}
          content={props.content}
          type={props.type}
          description={props.description}
          getData={props.getData}
          setData={props.setData}
          getUrl={props.getUrl}
        />
      </Modal>

      <Modal
        title={
          <Row className="mb-5">
            <Col span={3}>
              <PiSealWarningBold size={30} color="orange" />{" "}
            </Col>
            <Col span={21}>
              <Typography variant="h6" fontWeight="bold">
                Deleting {props.title}
              </Typography>
            </Col>
          </Row>
        }
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        footer={null}
      >
        <DeleteModal
          title={props.title}
          setOpenDelete={setOpenDelete}
          getData={props.getData}
          setData={props.setData}
          getUrl={props.getUrl}
          id={props.id}
        />
      </Modal>
    </div>
  );
}
