import React, { useState, useEffect } from "react";
import { Button, Typography, Container, Paper } from "@mui/material";
import { Col, Divider, Input, Row, Select, Upload, message } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { Editor } from "@tinymce/tinymce-react";
import { PulseLoader } from "react-spinners";
import { FaCopy } from "react-icons/fa";

const { Dragger } = Upload;

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
  const [author, setAuthor] = useState("");

  const selectOpt = [
    { value: "article", label: "Article" },
    { value: "dev", label: "DEV" },
    { value: "becomes", label: "Becomes" },
    { value: "whitepaper", label: "Whitepaper" },
  ];

  const handleFileUpload = (info: any) => {
    const { status } = info.file;
    if (status === 'done') {
      setFile(info.file.originFileObj);
      setPostImg(`/images/${info.file.name}`);
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  async function insert() {
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
      title,
      content,
      type: select,
      description: desc,
      image: postImg,
      author,
      createdAt: new Date().toISOString(),
    };
    try {
      const response = await fetch("./api/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Server error!");

      const responseData = await response.json();
      if (responseData.message === "success") {
        if (select === "dev") {
          props.fetchData("/api/devs", props.setDevs);
        } else if (select === "article") {
          props.fetchData("/api/articles", props.setArticles);
        } else {
          props.fetchData("/api/others", props.setOtehrs);
        }
        setMsg("Your data inserted successfully!");
        setMsgColor("success");
      }
    } catch (error: any) {
      setMsg(error.message);
      setMsgColor("error");
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} className="p-6 mt-8">
        <Typography variant="h4" className="mb-6 text-center font-bold text-gray-800">Create New Post</Typography>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Input
              size="large"
              placeholder="Enter your text's title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              size="large"
              placeholder="Choose a category"
              className="w-full"
              options={selectOpt}
              onChange={(val) => setSelect(val)}
            />
          </Col>
        </Row>
        <Input
          size="large"
          placeholder="Enter author's name"
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-4"
        />
        <TextArea
          rows={4}
          placeholder="Enter your description"
          onChange={(e) => setDesc(e.target.value)}
          className="mt-4"
        />
        <div className="mt-6">
          <Editor
            apiKey="2xuwpiwtg6dpym37fkznj8mvxvgl0yknv717zz9p0jpyffrx"
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                'codesample', 'emoticons', 'hr', 'nonbreaking', 'pagebreak', 'paste',
                'print', 'save', 'directionality', 'fullscreen', 'template', 'textpattern',
                'toc', 'visualchars'
              ],
              toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help | code | codesample | link image | ' +
                'emoticons hr nonbreaking pagebreak paste | ' +
                'print save | ltr rtl | fullscreen | template | ' +
                'toc visualchars',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              image_class_list: [
                { title: 'Responsive', value: 'img-fluid' },
              ],
              codesample_languages: [
                { text: 'HTML/XML', value: 'markup' },
                { text: 'JavaScript', value: 'javascript' },
                { text: 'CSS', value: 'css' },
                { text: 'PHP', value: 'php' },
                { text: 'Ruby', value: 'ruby' },
                { text: 'Python', value: 'python' },
                { text: 'Java', value: 'java' },
                { text: 'C', value: 'c' },
                { text: 'C#', value: 'csharp' },
                { text: 'C++', value: 'cpp' }
              ],
              setup: function(editor) {
                editor.on('init', function() {
                  editor.getBody().addEventListener('click', function(e) {
                    const target = e.target as HTMLElement;
                    if (target.classList.contains('copy-button')) {
                      e.preventDefault();
                      const codeBlock = target.closest('pre');
                      if (codeBlock) {
                        const code = codeBlock.querySelector('code');
                        if (code) {
                          navigator.clipboard.writeText(code.innerText);
                          message.success('Code copied to clipboard!');
                        }
                      }
                    }
                  });
                });

                editor.on('NodeChange', function(e) {
                  const codeBlocks = editor.getBody().querySelectorAll('pre');
                  codeBlocks.forEach((block) => {
                    if (!block.querySelector('.copy-button')) {
                      const button = editor.dom.create('button', {
                        'class': 'copy-button absolute bottom-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-full shadow-md hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-1',
                        'innerHTML': '<span class="icon"><svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg></span><span>Copy</span>'
                      });
                      editor.dom.setStyles(block, { position: 'relative', paddingBottom: '2.5rem' });
                      block.appendChild(button);
                    }
                  });
                });

                editor.on('SetContent', function() {
                  const codeBlocks = editor.getBody().querySelectorAll('pre');
                  codeBlocks.forEach((block) => {
                    if (!block.querySelector('.copy-button')) {
                      const button = editor.dom.create('button', {
                        'class': 'copy-button absolute bottom-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-full shadow-md hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-1',
                        'innerHTML': '<span class="icon"><svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg></span><span>Copy</span>'
                      });
                      editor.dom.setStyles(block, { position: 'relative', paddingBottom: '2.5rem' });
                      block.appendChild(button);
                    }
                  });
                });
              }
            }}
            onEditorChange={(txt) => setContent(txt)}
          />
        </div>
        <Divider />
        <Dragger
          name="file"
          multiple={false}
          action="/api/upload"
          onChange={handleFileUpload}
          className="mt-4"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single image upload. Strictly prohibit from uploading company data or other
            sensitive files.
          </p>
        </Dragger>
        <Row justify="space-between" align="middle" className="mt-6">
          <Col>
            <Button
              variant="contained"
              color="primary"
              onClick={insert}
              disabled={loading}
            >
              {loading ? <PulseLoader size={10} color="white" /> : "Create Post"}
            </Button>
          </Col>
          <Col>
            {msg && (
              <Typography color={msgColor === "error" ? "error" : "success"}>
                {msg}
              </Typography>
            )}
          </Col>
        </Row>
      </Paper>
    </Container>
  );
}

export default Production;
