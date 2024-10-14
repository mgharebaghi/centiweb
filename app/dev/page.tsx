"use client";
import "../prism";
import Typography from "@mui/material/Typography";
import { Layout, Menu, ConfigProvider, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { RiMenuFold2Fill, RiMenuUnfold2Fill } from "react-icons/ri";
import { PulseLoader } from "react-spinners";
import DevFooter from "./components/footer";
import { TbApi } from "react-icons/tb";
import { GiHouseKeys } from "react-icons/gi";
import { CiMoneyBill } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import { FaFileExport } from "react-icons/fa6";
import { SiBnbchain } from "react-icons/si";
import dynamic from 'next/dynamic';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import ruby from 'highlight.js/lib/languages/ruby';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/atom-one-dark.css';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicReactQuill = dynamic(() => import('react-quill'), { ssr: false });

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

function Dev() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [items, setItems] = useState<Array<Item>>([]);
  const [key, setKey] = useState<string>("0");

  useEffect(() => {
    document.title = "Centichain - DEV";
    getItems();
    
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('ruby', ruby);
    hljs.registerLanguage('python', python);
    
    (window as any).hljs = hljs;
  }, []);

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

  return (
    <div className="pt-16 bg-gray-900">
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#3498db',
            colorBgBase: '#1a1a2e',
            colorTextBase: '#ffffff',
          },
        }}
      >
        <Layout className="min-h-screen">
          <Header className="flex items-center justify-between px-6 bg-gradient-to-r from-blue-900 to-purple-900">
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCollapsed(!collapsed)}
                className="text-white mr-4"
              >
                {collapsed ? <RiMenuUnfold2Fill size={24} /> : <RiMenuFold2Fill size={24} />}
              </motion.button>
              <Typography variant="h4" className="text-white font-bold">
                Centichain DEV
              </Typography>
            </div>
          </Header>
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={(broken) => {
                setCollapsed(broken);
              }}
              className="bg-gray-900"
            >
              <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[key]}
                items={items}
                onClick={(e) => setKey(e.key)}
                className="mt-4"
              />
            </Sider>
            <Layout className="p-6 bg-gray-800">
              <Content className="bg-gray-700 rounded-lg p-6">
                <AnimatePresence mode="wait">
                  {!loading && Number(key) < posts.length ? (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="prose prose-invert max-w-none"
                    >
                      <h1 className="text-3xl font-bold mb-6">{posts[Number(key)].title}</h1>
                      <DynamicReactQuill
                        value={posts[Number(key)].content}
                        readOnly={true}
                        theme="snow"
                        modules={{
                          toolbar: false,
                          syntax: {
                            highlight: (text: string) => hljs.highlightAuto(text).value,
                          },
                        }}
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
          <Footer className="bg-gray-900 text-white">
            <DevFooter items={items} itemKey={key} setKey={setKey} />
          </Footer>
        </Layout>
      </ConfigProvider>
    </div>
  );
}

export default Dev;
