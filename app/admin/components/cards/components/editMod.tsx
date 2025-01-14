import React, { useState } from "react";
import {
  Button,
  Typography,
  Container,
  Paper,
  Box,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { Col, Input, Row, Select, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";

const { Dragger } = Upload;

function EditMod(props: any) {
  const [activeStep, setActiveStep] = useState(0);
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [select, setSelect] = useState(props.type);
  const [desc, setDesc] = useState(props.description);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgColor, setMsgColor] = useState("");
  const [file, setFile] = useState<File>();
  const [postImg, setPostImg] = useState(props.image);
  const [author, setAuthor] = useState(props.author);
  const [previewMode, setPreviewMode] = useState(false);

  const steps = ["Basic Info", "Content", "Media", "Preview & Publish"];

  const selectOpt = [
    { value: "article", label: "Article" },
    { value: "dev", label: "DEV" },
    { value: "becomes", label: "Becomes" },
    { value: "whitepaper", label: "Whitepaper" },
  ];

  const handleFileUpload = (info: any) => {
    const { status } = info.file;
    if (status === "done") {
      setFile(info.file.originFileObj);
      setPostImg(`/images/${info.file.name}`);
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  async function update() {
    setLoading(true);
    if (title && content && desc && file && select && author) {
      const formData = new FormData();
      formData.set("file", file);

      try {
        const imgUpload = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!imgUpload.ok) throw new Error("Image Upload problem!");

        const imgUploadData = await imgUpload.json();
        if (imgUploadData.status === "success") {
          await postData();
        } else {
          throw new Error("Image upload Problem!");
        }
      } catch (error: any) {
        setMsgColor("error");
        setMsg(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setMsgColor("error");
      setMsg("Please fill in all inputs correctly!");
    }
  }

  const postData = async () => {
    const data = {
      id: props.id,
      title,
      content,
      type: select,
      description: desc,
      image: postImg,
      author,
      updatedAt: new Date().toISOString(),
    };
    try {
      const response = await fetch("/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Server error!");

      const responseData = await response.json();
      if (responseData.message === "success") {
        props.getData(props.getUrl, props.setData);
        setMsg("Your post has been updated successfully!");
        setMsgColor("success");
      }
    } catch (error: any) {
      setMsg(error.message);
      setMsgColor("error");
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={16}>
                <Input
                  size="large"
                  placeholder="Enter your post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
              <Col xs={24} md={8}>
                <Select
                  size="large"
                  placeholder="Choose a category"
                  className="w-full"
                  value={select}
                  options={selectOpt}
                  onChange={(val) => setSelect(val)}
                />
              </Col>
            </Row>
            <Input
              size="large"
              placeholder="Enter author's name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-4"
            />
            <Input.TextArea
              rows={4}
              placeholder="Enter your description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="mt-4"
            />
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4"
          >
            <Editor
              apiKey="2xuwpiwtg6dpym37fkznj8mvxvgl0yknv717zz9p0jpyffrx"
              value={content}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "codesample",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help | code | codesample",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={(content) => setContent(content)}
            />
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4"
          >
            <Dragger
              name="file"
              multiple={false}
              action="/api/upload"
              onChange={handleFileUpload}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single image upload. Strictly prohibit from
                uploading company data or other sensitive files.
              </p>
            </Dragger>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4"
          >
            <Paper elevation={2} className="p-6">
              <Typography variant="h5" className="mb-4">
                {title}
              </Typography>
              <Typography variant="subtitle1" className="mb-2">
                By {author}
              </Typography>
              <Typography variant="body1" className="mb-4">
                {desc}
              </Typography>
              {postImg && (
                <img
                  src={postImg}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded mb-4"
                />
              )}
              <div
                className="preview-content"
                dangerouslySetInnerHTML={{
                  __html: `
                    <style>
                      .preview-content ul { 
                        list-style-type: disc !important;
                        padding-left: 2em !important;
                        margin: 1em 0 !important;
                      }
                      .preview-content ol {
                        list-style-type: decimal !important;
                        padding-left: 2em !important;
                        margin: 1em 0 !important;
                      }
                      .preview-content table {
                        border-collapse: collapse !important;
                        width: 100% !important;
                        margin: 1em 0 !important;
                      }
                      .preview-content th,
                      .preview-content td {
                        border: 1px solid #ddd !important;
                        padding: 8px !important;
                        text-align: left !important;
                      }
                      .preview-content th {
                        background-color: #f5f5f5 !important;
                      }
                    </style>
                    ${content}
                  `,
                }}
              />
            </Paper>
          </motion.div>
        );
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} className="p-6 mt-8">
        <Typography
          variant="h4"
          className="mb-6 text-center font-bold text-gray-800"
        >
          Edit Post
        </Typography>

        <Stepper activeStep={activeStep} className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent(activeStep)}

        <Box className="mt-6 flex justify-between">
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <div>
            {msg && (
              <Typography
                color={msgColor === "error" ? "error" : "success"}
                className="mr-4"
              >
                {msg}
              </Typography>
            )}
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={update}
                disabled={loading}
              >
                {loading ? <PulseLoader size={10} color="white" /> : "Update"}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </Box>
      </Paper>
    </Container>
  );
}

export default EditMod;
