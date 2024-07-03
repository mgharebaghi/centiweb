"use client";
import "../prism";
import { Typography } from "@mui/material";
import { Button, Layout, Menu, Row } from "antd";
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
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [items, setItems] = useState<Array<Item>>([]);
  const [key, setKey] = useState<string>("0");

  useEffect(() => {
    document.title = "Centichain - DEV";
    getItems();
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
    posts.map((item, index) => {
      let icon = item.title.includes("API") ? (
        <TbApi />
      ) : item.title.includes("Keypair") ? (
        <GiHouseKeys />
      ) : item.title.includes("UTXO") ? (
        <CiMoneyBill />
      ) : item.title.includes("Transaction") ? (
        <GrTransaction />
      ) : item.title.includes("Reciepts") ? (
        <FaFileExport />
      ) : item.title.includes("Blockchain") ? (
        <SiBnbchain />
      ) : null;
      let newItem: Item = {
        key: index.toString(),
        icon,
        label: item.title,
      };
      setItems((prevData) => [...prevData, newItem]);
    });
  }, [posts]);

  return (
    <div className="pt-[80px] min-h-[750px]">
      <Layout>
        <Sider trigger={null} theme="light" collapsible collapsed={collapsed}>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[key]}
            items={items ? items : []}
            onClick={(e) => setKey(e.key)}
            key={Number(key)}
          />
        </Sider>
        <Layout>
          <Header className="p-0 bg-white shadow-sm">
            <Button
              type="text"
              icon={collapsed ? <RiMenuUnfold2Fill /> : <RiMenuFold2Fill />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                color: "black",
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 600,
              borderRadius: "10px",
              backgroundColor: "white",
              wordBreak: "break-all",
              width: "95%",
            }}
          >
            {!loading && Number(key) < posts.length ? (
              <Typography>
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{
                    __html: posts[Number(key)].content,
                  }}
                />
              </Typography>
            ) : (
              <div className="min-h-[600px] flex justify-center items-center">
                <PulseLoader color="gray" size={5} />
              </div>
            )}
          </Content>
          <Footer className="bg-white shadow-sm">
            <DevFooter items={items} itemKey={key} setKey={setKey} />
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default Dev;
