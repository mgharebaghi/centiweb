"use client";
import "../prism";
import Typography from "@mui/material/Typography";
import { Layout, Menu, ConfigProvider, theme, message, Button, Typography as AntTypography, Tabs } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { ObjectId } from "mongodb";
import { useEffect, useState, useRef, useCallback } from "react";
import "react-quill/dist/quill.snow.css";
import { RiMenuFold2Fill, RiMenuUnfold2Fill } from "react-icons/ri";
import { PulseLoader } from "react-spinners";
import DevFooter from "./components/footer";
import { TbApi } from "react-icons/tb";
import { GiHouseKeys } from "react-icons/gi";
import { CiMoneyBill } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import { FaFileExport, FaCopy } from "react-icons/fa6";
import { SiBnbchain } from "react-icons/si";
import dynamic from 'next/dynamic';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import ruby from 'highlight.js/lib/languages/ruby';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/atom-one-dark.css';
import { motion, AnimatePresence } from 'framer-motion';
import { forwardRef } from 'react';
import { ReactQuillProps } from 'react-quill';
import ReactQuill from 'react-quill';
import ReactDOM from 'react-dom';

const DynamicReactQuill = dynamic(() => 
  import('react-quill').then((mod) => {
    const Component = forwardRef<ReactQuill, ReactQuillProps>((props, ref) => <mod.default {...props} ref={ref} />);
    Component.displayName = 'DynamicReactQuill';
    return Component;
  }),
  { ssr: false }
);

interface Item {
  key: string;
  icon: any;
  label: string;
}

interface Post {
  _id: ObjectId;
  title: string;
  content: string;
  description: string;
}

interface TitleItem {
  id: string;
  text: string;
  level: number;
}

function Dev() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [items, setItems] = useState<Array<Item>>([]);
  const [key, setKey] = useState<string>("0");
  const quillRef = useRef<any>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [titles, setTitles] = useState<TitleItem[]>([]);
  const [activeTitle, setActiveTitle] = useState<string>("");

  useEffect(() => {
    document.title = "Centichain - DEV";
    getItems();
    
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('ruby', ruby);
    hljs.registerLanguage('python', python);
    
    (window as any).hljs = hljs;
  }, []);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.options.modules.syntax = true;
      editor.options.modules.toolbar = false;
      if (editor.theme.modules.toolbar) {
        editor.theme.modules.toolbar.container.style.display = 'none';
      }
    }
  }, [key, posts]);

  const getItems = async () => {
    setLoading(true);
    const res = await fetch("/api/devs");

    if (!res.ok) {
      setLoading(false);
      console.log("get data problem!");
    } else {
      const data = await res.json();
      setLoading(false);
      setPosts(data.data);
    }
  };

  useEffect(() => {
    const newItems = posts.map((item, index) => {
      let icon = item.title.includes("API") ? <TbApi /> :
                 item.title.includes("Keypair") ? <GiHouseKeys /> :
                 item.title.includes("UTXO") ? <CiMoneyBill /> :
                 item.title.includes("Transaction") ? <GrTransaction /> :
                 item.title.includes("Reciepts") ? <FaFileExport /> :
                 item.title.includes("Blockchain") ? <SiBnbchain /> : null;
      return {
        key: index.toString(),
        icon,
        label: item.title,
      };
    });
    setItems(newItems);
  }, [posts]);

  const highlightCode = useCallback(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const content = editor.root;
      const codeBlocks = content.querySelectorAll('pre');
      codeBlocks.forEach((block: HTMLElement) => {
        const codeElement = block.querySelector('code');
        if (codeElement) {
          hljs.highlightElement(codeElement);
        }
        addCopyButton(block);
      });
    }
  }, []);

  const addCopyButton = (block: HTMLElement) => {
    if (block.querySelector('.copy-button')) return;

    const button = document.createElement('button');
    button.innerHTML = '<FaCopy /> Copy';
    button.className = 'copy-button absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded';
    button.onclick = (e) => {
      e.preventDefault();
      const code = block.querySelector('code');
      if (code) {
        navigator.clipboard.writeText(code.innerText);
        message.success('Code copied to clipboard!');
      }
    };
    block.style.position = 'relative';
    block.appendChild(button);
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      pre {
        position: relative;
      }
      .copy-button {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 10;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      highlightCode();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [highlightCode]);

  const handleCollapse = (isCollapsed: boolean) => {
    setCollapsed(isCollapsed);
    setTimeout(() => {
      if (quillRef.current) {
        const editor = quillRef.current.getEditor();
        editor.update();
        highlightCode();
      }
    }, 500);
  };

  const extractTitles = useCallback(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const content = editor.root;
      const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const newTitles: TitleItem[] = Array.from(headings as NodeListOf<HTMLHeadingElement>).map((heading, index) => ({
        id: `heading-${index}`,
        text: heading.textContent || '',
        level: parseInt(heading.tagName[1]),
      }));
      setTitles(newTitles);
    }
  }, []);

  useEffect(() => {
    extractTitles();
  }, [key, posts, extractTitles]);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let currentActiveTitle = '';
        headings.forEach((heading: Element) => {
          const rect = heading.getBoundingClientRect();
          if (rect.top <= 100) {
            currentActiveTitle = heading.id;
          }
        });
        setActiveTitle(currentActiveTitle);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-[64px] flex flex-col">
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#3498db',
            colorBgBase: '#111827',
            colorTextBase: '#f3f4f6',
          },
        }}
      >
        <Layout className="flex-grow">
          <Header className="flex items-center justify-between px-6 bg-gradient-to-r from-gray-900 to-black shadow-lg border-b border-gray-800">
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleCollapse(!collapsed)}
                className="text-gray-300 hover:text-white mr-4 focus:outline-none transition-colors duration-200"
              >
                {collapsed ? <RiMenuUnfold2Fill size={24} /> : <RiMenuFold2Fill size={24} />}
              </motion.button>
              <Typography variant="h4" className="text-gray-100 font-bold text-2xl">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Centichain DEV
                </span>
              </Typography>
            </div>
          </Header>
          <Layout>
            <Sider
              collapsed={collapsed}
              className="bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl border-r border-gray-700 transition-all duration-300"
            >
              <Menu
                mode="inline"
                selectedKeys={[key]}
                className="bg-transparent border-r-0"
              >
                {items.map((item) => (
                  <Menu.Item
                    key={item.key}
                    icon={item.icon}
                    onClick={() => setKey(item.key)}
                    className={`
                      text-gray-300 hover:text-white transition-colors duration-200
                      ${item.key === key ? 'bg-gradient-to-r from-slate-800 to-slate-600 text-white font-bold shadow-md' : ''}
                    `}
                  >
                    {!collapsed && (
                      <span className={`
                        ${item.key === key ? 'border-l-4 border-white pl-2 text-white' : ''}
                      `}>
                        {item.label}
                      </span>
                    )}
                  </Menu.Item>
                ))}
              </Menu>
            </Sider>
            <Layout className="p-6 bg-gray-900">
              <Content className="bg-gray-800 rounded-lg p-6 shadow-xl" ref={contentRef}>
                <AnimatePresence mode="wait">
                  {!loading && Number(key) < posts.length ? (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="prose prose-invert max-w-none"
                      onAnimationComplete={highlightCode}
                    >
                      <h1 className="text-3xl font-bold mb-6">{posts[Number(key)].title}</h1>
                      <DynamicReactQuill
                        ref={quillRef}
                        value={posts[Number(key)].content}
                        readOnly={true}
                        theme="snow"
                        modules={{
                          syntax: true,
                          toolbar: false,
                        }}
                        onChange={highlightCode}
                        className="bg-gray-700 rounded-lg text-gray-100"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-center items-center h-64"
                    >
                      <PulseLoader color="#3498db" size={15} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Content>
            </Layout>
          </Layout>
        </Layout>
        <Footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
          <DevFooter items={items} itemKey={key} setKey={setKey} />
        </Footer>
      </ConfigProvider>
    </div>
  );
}

export default Dev;
