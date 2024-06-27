"use client";
// import { Tabs } from "antd";
import Articles from "./components/articles";
import Devs from "./components/devs";
import Production from "./components/production";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Others from "./components/others";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { GrArticle, GrCode, GrProductHunt, GrRestroom } from "react-icons/gr";
import { Content, Header } from "antd/es/layout/layout";

export default function AdminProfile() {
  const [articles, setArticles] = useState([]);
  const [devs, setDevs] = useState([]);
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [key, setKey] = useState("1");

  const fetchData = async (url: string, setData: any) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Server problem!");
      const data = await res.json();
      setData(data.data);
    } catch (e) {
      setErr(e + "");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("/api/articles", setArticles);
    fetchData("/api/devs", setDevs);
    fetchData("/api/others", setOthers);
  }, []);

  const items = [
    {
      key: "1",
      icon: <GrArticle />,
      label: "Articles",
    },
    {
      key: "2",
      icon: <GrCode />,
      label: "DEV",
    },
    {
      key: "3",
      icon: <GrRestroom />,
      label: "Others",
    },
    {
      key: "4",
      icon: <GrProductHunt />,
      label: "Production",
    },
  ];

  return (
    <div className="min-h-[750px] w-[full] pt-[80px]">
      <Layout>
        <Sider trigger={null} theme="light">
          <Menu
            theme="light"
            mode="inline"
            items={items}
            defaultSelectedKeys={[key]}
            onClick={(e) => {
              setKey(e.key);
            }}
            key={Number(key)}
          />
        </Sider>
        <Layout>
          <Header className="p-0 shadow-sm bg-white"></Header>
          <Content className="min-h-[750px] rounded-md p-5 bg-white w-[95%] m-5">
            {key === "1" ? (
              <Articles
                fetchData={fetchData}
                setData={setArticles}
                articles={articles}
                loading={loading}
                err={err}
              />
            ) : key === "2" ? (
              <Devs
                fetchData={fetchData}
                setData={setDevs}
                devs={devs}
                loading={loading}
                err={err}
              />
            ) : key === "3" ? (
              <Others
                fetchData={fetchData}
                setData={setOthers}
                others={others}
                loading={loading}
                err={err}
              />
            ) : key === "4" ? (
              <Production
                fetchData={fetchData}
                setArticles={setArticles}
                setDevs={setDevs}
                setOthers={setOthers}
              />
            ) : null}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
