import React, { useState, useCallback } from "react";
import { Button, Typography } from "@mui/material";
import { Col, Input, Row, Select, Upload, message } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";
import { PulseLoader } from "react-spinners";

const { Dragger } = Upload;

function Editor(props: any) {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [select, setSelect] = useState(props.type);
  const [desc, setDesc] = useState(props.description);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgColor, setMsgColor] = useState("");
  const [file, setFile] = useState<File>();
  const [postImg, setPostImg] = useState("");

  const selectOpt = [
    { value: "article", label: "Article" },
    { value: "dev", label: "DEV" },
    { value: "becomes", label: "Becomes" },
    { value: "whitepaper", label: "Whitepaper" },
  ];

  const handleFileUpload = useCallback((info: any) => {
    const { status } = info.file;
    if (status === 'done') {
      setFile(info.file.originFileObj);
      setPostImg(`/images/${info.file.name}`);
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }, []);

  const update = useCallback(async () => {
    setLoading(true);
    if (title && content && desc && file) {
      const formData = new FormData();
      formData.set("file", file);

      try {
        const imgUpload = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!imgUpload.ok) {
          throw new Error("Image Upload problem!");
        }

        const imgUploadData = await imgUpload.json();
        if (imgUploadData.status === "success") {
          await postData();
        } else {
          throw new Error("Image upload Problem!");
        }
      } catch (error: any) {
        setMsgColor("red");
        setMsg(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setMsgColor("red");
      setMsg("Please fill in all inputs correctly!");
    }
  }, [title, content, desc, file]);

  const postData = async () => {
    const data = {
      id: props.id,
      title,
      content,
      type: select,
      description: desc,
      image: postImg,
    };
    try {
      const res = await fetch("/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Server error!");
      }

      const message = await res.json();
      if (message.message === "success") {
        props.getData(props.getUrl, props.setData);
        setMsg("Your data updated :)");
        setMsgColor("green");
      }
    } catch (error: any) {
      setMsg(error.message);
      setMsgColor("red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} md={16}>
          <Input
            value={title}
            size="large"
            placeholder="Enter your text's title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Col>
        <Col xs={24} md={8}>
          <Select
            value={select}
            size="large"
            placeholder="Choose a category"
            className="w-full"
            options={selectOpt}
            onChange={(val) => setSelect(val)}
          />
        </Col>
      </Row>
      <Row className="mb-6">
        <Col span={24}>
          <TextArea
            value={desc}
            rows={4}
            placeholder="Enter your description"
            onChange={(e) => setDesc(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mb-6">
        <Col span={24}>
          <TinyMCEEditor
            apiKey="2xuwpiwtg6dpym37fkznj8mvxvgl0yknv717zz9p0jpyffrx"
            initialValue={props.content}
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

                editor.on('NodeChange SetContent', function() {
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
        </Col>
      </Row>
      <Row className="mb-6">
        <Col span={24}>
          <Dragger
            name="file"
            multiple={false}
            action="/api/upload"
            onChange={handleFileUpload}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single image upload. Strictly prohibited from uploading company data or other sensitive files.
            </p>
          </Dragger>
        </Col>
      </Row>
      <Row gutter={16} align="middle">
        <Col>
          <Button
            variant="contained"
            color="primary"
            className="px-8 py-2"
            onClick={update}
            disabled={loading}
          >
            Update post
          </Button>
        </Col>
        <Col>
          {loading ? (
            <PulseLoader size={10} color="#1890ff" />
          ) : (
            <Typography style={{ color: msgColor }}>{msg}</Typography>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Editor;
