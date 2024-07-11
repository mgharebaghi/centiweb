import { Drawer, List, ListItem, Typography } from "@mui/material";
import { Col, Row } from "antd";
import Image from "next/image";
import { BiArrowBack } from "react-icons/bi";
import { GrValidate } from "react-icons/gr";
import { IoMdPaper } from "react-icons/io";
import { IoDownloadOutline } from "react-icons/io5";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { SiDailydotdev, SiRelay } from "react-icons/si";

function CustomDrawer(props: any) {
  return (
    <Drawer
      PaperProps={{
        elevation: 0,
        sx: {
          width: "65%",
          backgroundColor: "white",
          position: "absolute",
        },
      }}
      open={props.toggle}
      onClose={() => props.setToggle(!props.toggle)}
      anchor="right"
    >
      <Row className="shadow-sm">
        <Col span={12} className="p-3 flex items-center">
          <BiArrowBack
            size={25}
            onClick={() => props.setToggle(!props.toggle)}
          />
        </Col>
        <Col span={12} className="p-3 flex justify-end">
          <Image
            alt="centichain logo"
            src="/images/Logo.png"
            width={40}
            height={40}
            onClick={() => {
              props.router.push("/");
              props.setValue(-1);
              props.setToggle(!props.toggle);
            }}
          />
        </Col>
      </Row>
      <List>
        <ListItem
          className="w-full active:bg-slate-700 active:text-white transition duration-150"
          onClick={() => {
            window.scroll(0, 0);
            props.router.push("/scan");
            props.setValue(0);
            props.setToggle(!props.toggle);
          }}
        >
          <MdOutlineDocumentScanner className="mr-2 mb-1" />
          <Typography>SCAN</Typography>
        </ListItem>
        <ListItem
          className="w-full active:bg-slate-700 active:text-white transition duration-150"
          onClick={() => {
            window.scroll(0, 0);
            props.router.push("/articles/66853f1a2b7f6349a1f3bbb7");
            props.setValue(0);
            props.setToggle(!props.toggle);
          }}
        >
          <GrValidate className="mr-2 mb-1" />
          <Typography>VALIDATOR</Typography>
        </ListItem>
        <ListItem
          className="w-full active:bg-slate-700 active:text-white transition duration-150"
          onClick={() => {
            window.scroll(0, 0);
            props.router.push("/articles/668540112b7f6349a1f3bbb8");
            props.setValue(0);
            props.setToggle(!props.toggle);
          }}
        >
          <SiRelay className="mr-2 mb-1" />
          <Typography>RELAY</Typography>
        </ListItem>
        <ListItem
          className="w-full active:bg-slate-700 active:text-white transition duration-150"
          onClick={() => {
            window.scroll(0, 0);
            props.router.push("/articles/66854dddbe58431231ea08b8");
            props.setValue(0);
            props.setToggle(!props.toggle);
          }}
        >
          <IoMdPaper className="mr-2 mb-1" />
          <Typography>WHITEPAPER</Typography>
        </ListItem>
        <ListItem
          className="w-full active:bg-slate-700 active:text-white transition duration-150"
          onClick={() => {
            window.scroll(0, 0);
            props.router.push("/download");
            props.setValue(0);
            props.setToggle(!props.toggle);
          }}
        >
          <IoDownloadOutline className="mr-2 mb-1" />
          <Typography>DOWNLOAD</Typography>
        </ListItem>
        {/* <ListItem
          className="w-full active:bg-slate-700 active:text-white transition duration-150"
          onClick={() => {
            window.scroll(0, 0);
            props.router.push("/dev");
            props.setValue(0);
            props.setToggle(!props.toggle);
          }}
        >
          <SiDailydotdev className="mr-2 mb-1" />
          <Typography>DEV</Typography>
        </ListItem> */}
      </List>
    </Drawer>
  );
}

export default CustomDrawer;
