"use client";
import { Button, Typography } from "@mui/material";
import { Col, Divider, Input, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import dynamic from "next/dynamic";
import React, { useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { PulseLoader } from "react-spinners";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function Production(props: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [select, setSelect] = useState("");
  const [desc, setDesc] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgColor, setMsgColor] = useState("");
  const [file, setFile] = useState<File>();
  const [postImg, setPostImg] = useState("");

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  const modules = {
    toolbar: toolbarOptions,
  };

  const selectOpt = [
    { value: "article", label: "Article" },
    { value: "dev", label: "DEV" },
    { value: "becomes", label: "Becomes" },
    { value: "whitepaper", label: "Whitepaper" },
  ];

  async function insert() {
    setLoading(true);
    if (
      title !== "" &&
      content !== "" &&
      desc !== "" &&
      file &&
      select !== ""
    ) {
      const formData = new FormData();
      formData.set("file", file ?? new Blob());

      const imgUpload = await props.imageUpload(formData);

      if (!imgUpload.ok) {
        setLoading(false);
        setMsgColor("red");
        setMsg("Image Upload problem!");
      } else {
        imgUpload.json().then((message: any) => {
          if (message.status === "success") {
            postData();
          } else {
            setMsgColor("red");
            setLoading(false);
            setMsg("Image upload Problem!");
          }
        });
      }
    } else {
      setLoading(false);
      setMsgColor("red");
      setMsg("Please fill in all inputs correctly!");
    }
  }

  const postData = async () => {
    const data = {
      title,
      content,
      type: select,
      description: desc,
      image: postImg,
    };
    await fetch("./api/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) {
        setMsg("server error!");
        setLoading(false);
      } else {
        res.json().then((message) => {
          if (message.message === "success") {
            if (select === "dev") {
              props.fetchData("/api/devs", props.setDevs);
            } else if (select === "article") {
              props.fetchData("/api/articles", props.setArticles);
            } else {
              props.fetchData("/api/others", props.setOtehrs);
            }
            setMsg("Your data inserted :)");
            setLoading(false);
            setMsgColor("green");
          }
        });
      }
    });
  };

  return (
    <div className="w-[100%]">
      <Row className="mb-3">
        <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16} className="p-1">
          <Input
            type="text"
            className="w-[100%]"
            placeholder="Enter your text's title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8} className="p-1">
          <Select
            placeholder="Choos a category"
            className="w-[100%]"
            options={selectOpt}
            onChange={(val) => setSelect(val)}
          />
        </Col>
      </Row>
      <Row className="w-[100%] mb-3">
        <Col span={24}>
          <TextArea
            placeholder="Enter your description"
            className="w-[100%]"
            onChange={(e) => setDesc(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mb-3 min-h-[400px]">
        <Col span={24}>
          <ReactQuill
            theme="snow"
            modules={modules}
            style={{ height: "350px" }}
            onChange={(txt) => {
              setContent(txt);
            }}
          />
        </Col>
      </Row>
      <Divider />
      <Row className="mb-3">
        <Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8} className="p-1">
          <input
            type="file"
            accept="image/"
            onChange={({ target }) => {
              if (target.files) {
                const file = target.files[0];
                setPostImg(`/images/${file.name}`);
                setFile(file);
              }
            }}
          />
        </Col>
      </Row>
      <Row className="w-[100%]">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Button
            variant="outlined"
            className="border-slate-600 text-slate-600 w-[250px] hover:bg-gray-600 hover:text-white"
            onClick={insert}
          >
            Create post
          </Button>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={16}
          lg={16}
          xl={16}
          xxl={16}
          className="flex items-center"
        >
          {loading ? (
            <PulseLoader size="5px" color="gray" />
          ) : (
            <Typography color={msgColor}>{msg}</Typography>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Production;
