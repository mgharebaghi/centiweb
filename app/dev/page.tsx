"use client";
import "../prism";
import Typography from "@mui/material/Typography";
import {
  Layout,
  Menu,
  ConfigProvider,
  theme,
  message,
  Button,
  Typography as AntTypography,
  Tabs,
  Drawer,
  Input,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { ObjectId } from "mongodb";
import { useEffect, useState, useRef, useCallback } from "react";
import "react-quill/dist/quill.snow.css";
import {
  RiMenuFold2Fill,
  RiMenuUnfold2Fill,
  RiSearchLine,
} from "react-icons/ri";
import { PulseLoader } from "react-spinners";
import DevFooter from "./components/footer";
import { TbApi } from "react-icons/tb";
import { GiHouseKeys } from "react-icons/gi";
import { CiMoneyBill } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import {
  FaFileExport,
  FaCopy,
  FaBookOpen,
  FaGithub,
  FaDiscord,
} from "react-icons/fa6";
import { SiBnbchain } from "react-icons/si";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import ruby from "highlight.js/lib/languages/ruby";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/atom-one-dark.css";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { useMediaQuery } from "@mui/material";

interface Item {
  key: string;
  icon: any;
  label: string;
  children?: Item[];
}

interface Post {
  _id: ObjectId;
  title: string;
  content: string;
  description: string;
  category?: string;
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
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Array<Post>>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>("v1.0");
  const quillRef = useRef<any>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [titles, setTitles] = useState<TitleItem[]>([]);
  const [activeTitle, setActiveTitle] = useState<string>("");
  const router = useRouter();
  const params = useParams();
  const isMobile = useMediaQuery("(max-width:768px)");
  const isTablet = useMediaQuery("(max-width:1024px)");

  useEffect(() => {
    document.title = "Centichain - DEV";
    getItems();

    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("ruby", ruby);
    hljs.registerLanguage("python", python);

    (window as any).hljs = hljs;

    // Add styles for bullet lists and mobile responsiveness
    const style = document.createElement("style");
    style.textContent = `
      .prose ul {
        list-style-type: disc;
        padding-left: 1.5em;
        margin: 1em 0;
      }
      .prose li {
        margin: 0.5em 0;
      }
      @media (max-width: 768px) {
        pre {
          max-width: 100%;
          overflow-x: auto;
        }
        .code-content {
          font-size: 14px;
        }
        .copy-button {
          padding: 4px 8px;
          font-size: 12px;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (posts.length > 0 && params.slug) {
      const index = posts.findIndex(
        (post) => post.title.toLowerCase().replace(/\s+/g, "-") === params.slug
      );
      if (index !== -1) {
        setKey(index.toString());
      }
    }
  }, [posts, params.slug]);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.options.modules.syntax = true;
      editor.options.modules.toolbar = false;
      if (editor.theme.modules.toolbar) {
        editor.theme.modules.toolbar.container.style.display = "none";
      }
    }
    highlightCode();
  }, [key, posts]);

  const getItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/devs");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setLoading(false);
      setPosts(data.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
      message.error("Failed to load content. Please try again later.");
    }
  };

  useEffect(() => {
    const newItems = posts.map((item, index) => {
      let icon = item.title.includes("API") ? (
        <TbApi />
      ) : item.title.includes("Keypair") ? (
        <GiHouseKeys />
      ) : item.title.includes("Balance") ? (
        <CiMoneyBill />
      ) : item.title.includes("Transaction") ? (
        <GrTransaction />
      ) : item.title.includes("Reciept") ? (
        <FaFileExport />
      ) : item.title.includes("Blockchain") ? (
        <SiBnbchain />
      ) : item.title.includes("Introduction") ? (
        <FaBookOpen />
      ) : null;
      return {
        key: index.toString(),
        icon,
        label: item.title,
      };
    });
    setItems(newItems);
    setTimeout(() => {
      highlightCode();
    }, 1000);
  }, [posts]);

  const highlightCode = useCallback(() => {
    if (contentRef.current) {
      const codeBlocks = contentRef.current.querySelectorAll("pre code");
      codeBlocks.forEach((block: Element) => {
        hljs.highlightElement(block as HTMLElement);
        addCopyButton(block.parentElement as HTMLElement);
      });
    }
  }, []);

  const addCopyButton = (block: HTMLElement) => {
    if (block.querySelector(".copy-button")) return;

    const button = document.createElement("button");
    button.innerHTML = "<FaCopy /> Copy";
    button.className =
      "copy-button absolute top-2 right-2 bg-[#1a1a1a] text-white px-2 py-1 rounded text-sm";
    button.onclick = (e) => {
      e.preventDefault();
      const code = block.querySelector("code");
      if (code) {
        navigator.clipboard.writeText(code.innerText);
        message.success("Code copied to clipboard!");
      }
    };
    block.style.position = "relative";
    block.appendChild(button);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      pre {
        position: relative;
        max-width: 100%;
        overflow-x: auto;
      }
      .copy-button {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 10;
      }
      @media (max-width: 768px) {
        .ant-layout-sider {
          position: fixed;
          height: 100vh;
          z-index: 999;
          left: 0;
          top: 64px;
        }
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
    if (isMobile) {
      setDrawerVisible(!drawerVisible);
    } else {
      setCollapsed(isCollapsed);
      setTimeout(() => {
        highlightCode();
      }, 0);
    }
  };

  const handleMenuClick = (selectedKey: string) => {
    setKey(selectedKey);
    if (isMobile) {
      setDrawerVisible(false);
    }
  };

  const extractTitles = useCallback(() => {
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );
      const newTitles: TitleItem[] = Array.from(headings).map(
        (heading, index) => ({
          id: `heading-${index}`,
          text: heading.textContent || "",
          level: parseInt(heading.tagName[1]),
        })
      );
      setTitles(newTitles);
    }
  }, []);

  useEffect(() => {
    extractTitles();
    setTimeout(() => {
      highlightCode();
    }, 0);
  }, [key, posts, extractTitles, highlightCode]);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const headings = contentRef.current.querySelectorAll(
          "h1, h2, h3, h4, h5, h6"
        );
        let currentActiveTitle = "";
        headings.forEach((heading: Element) => {
          const rect = heading.getBoundingClientRect();
          if (rect.top <= 100) {
            currentActiveTitle = heading.id;
          }
        });
        setActiveTitle(currentActiveTitle);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (posts.length > 0 && key) {
      const currentPost = posts[Number(key)];
      if (currentPost) {
        const slug = currentPost.title.toLowerCase().replace(/\s+/g, "-");
        router.push(`/dev/${slug}`);
      }
    }
  }, [key, posts, router]);

  const renderSideMenu = () => (
    <Menu
      mode="inline"
      selectedKeys={[key]}
      className="bg-transparent border-r-0 mt-3"
    >
      {items.map((item) => (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          onClick={() => handleMenuClick(item.key)}
          className={`
            text-gray-300 hover:text-white transition-colors duration-200
            ${
              item.key === key
                ? "bg-[#1a1a1a] text-white font-bold shadow-md"
                : ""
            }
          `}
        >
          {!collapsed && (
            <span
              className={`
              ${
                item.key === key
                  ? "border-l-4 border-[#80ff80] pl-2 text-white"
                  : ""
              }
            `}
            >
              {item.label}
            </span>
          )}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex flex-col pt-[60px]">
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#80ff80",
            colorBgBase: "#0a0a0a",
            colorTextBase: "#f3f4f6",
          },
        }}
      >
        <Layout className="flex-grow">
          <Header className="w-full flex items-center justify-between px-4 sm:px-6 bg-[#1a1a1a] shadow-lg border-b border-[#333333]">
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleCollapse(!collapsed)}
                className="text-gray-300 hover:text-white mr-4 focus:outline-none transition-colors duration-200"
              >
                {(isMobile ? !drawerVisible : collapsed) ? (
                  <RiMenuUnfold2Fill size={24} />
                ) : (
                  <RiMenuFold2Fill size={24} />
                )}
              </motion.button>
              
            </div>
          </Header>
          <Layout>
            {isMobile ? (
              <Drawer
                placement="left"
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                width={250}
                className="bg-[#0a0a0a]"
                bodyStyle={{ padding: 0, backgroundColor: "#1a1a1a" }}
              >
                {renderSideMenu()}
              </Drawer>
            ) : (
              <Sider
                collapsed={collapsed}
                className="bg-[#1a1a1a] shadow-2xl border-r border-[#333333] transition-all duration-300"
                collapsible
                trigger={null}
              >
                {renderSideMenu()}
              </Sider>
            )}
            <Layout className="p-4 sm:p-6 bg-[#0a0a0a]">
              <Content
                className="bg-[#1a1a1a] rounded-lg p-4 sm:p-6 shadow-xl overflow-hidden"
                ref={contentRef}
              >
                <AnimatePresence mode="wait">
                  {!loading && Number(key) < posts.length ? (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="prose prose-invert max-w-none"
                    >

                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            posts[Number(key)].content
                          ),
                        }}
                        className="p-2 sm:p-4 code-content text-wrap break-words prose prose-invert max-w-none prose-ul:list-disc prose-li:my-1 text-sm sm:text-base"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col justify-center items-center h-64 space-y-4"
                    >
                      <PulseLoader color="#80ff80" size={15} />
                      <p className="text-gray-400">Loading content...</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Content>
            </Layout>
          </Layout>
        </Layout>
        <Footer className="bg-[#0a0a0a] text-gray-300 border-t border-[#333333]">
          <DevFooter items={items} itemKey={key} setKey={setKey} />
        </Footer>
      </ConfigProvider>
    </div>
  );
}

export default Dev;
