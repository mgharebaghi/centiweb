'use client'
import { Typography } from "@mui/material";
import { Col, Modal, Row } from "antd";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineEditNote, MdDelete } from "react-icons/md";
import { PiSealWarningBold } from "react-icons/pi";
import Editor from "./components/editMod";
import DeleteModal from "./components/deleteMod";
import { motion } from "framer-motion";

interface CardProps {
  id: string;
  index: number;
  pic: string;
  title: string;
  description: string;
  content: string;
  type: string;
  getData: (url: string, setData: React.Dispatch<React.SetStateAction<any>>) => void;
  setData: React.Dispatch<React.SetStateAction<any>>;
  getUrl: string;
}

export default function Card({
  id,
  index,
  pic,
  title,
  description,
  content,
  type,
  getData,
  setData,
  getUrl
}: CardProps) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl bg-white w-full min-h-[250px] shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
    >
      <Row className="h-full">
        <Col xs={24} sm={24} md={24} lg={9} xl={9} xxl={9} className="flex justify-center items-center min-h-[250px] p-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image alt={title} className="rounded-lg object-cover w-full h-full" src={pic} width={300} height={250} />
          </motion.div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={15} xl={15} xxl={15} className="min-h-[250px] flex flex-col justify-between p-6">
          <div>
            <Typography variant="h5" className="mb-4 font-bold text-gray-800">{title}</Typography>
            <Typography className="mb-6 text-gray-600 line-clamp-3">{description}</Typography>
          </div>
          <Row className="w-full">
            <Col span={12} className="flex justify-start">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-blue-500 hover:bg-blue-500 hover:text-white rounded-full transition duration-300 p-3"
                onClick={() => setOpenEdit(true)}
              >
                <MdOutlineEditNote size={28} />
              </motion.button>
            </Col>
            <Col span={12} className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-red-500 hover:bg-red-500 hover:text-white rounded-full transition duration-300 p-3"
                onClick={() => setOpenDelete(true)}
              >
                <MdDelete size={28} />
              </motion.button>
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
          id={id}
          title={title}
          content={content}
          type={type}
          description={description}
          getData={getData}
          setData={setData}
          getUrl={getUrl}
        />
      </Modal>

      <Modal
        title={
          <Row className="mb-5 items-center">
            <Col span={3}>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <PiSealWarningBold size={30} color="orange" />
              </motion.div>
            </Col>
            <Col span={21}>
              <Typography variant="h6" fontWeight="bold">
                Deleting {title}
              </Typography>
            </Col>
          </Row>
        }
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        footer={null}
      >
        <DeleteModal
          title={title}
          setOpenDelete={setOpenDelete}
          getData={getData}
          setData={setData}
          getUrl={getUrl}
          id={id}
        />
      </Modal>
    </motion.div>
  );
}
