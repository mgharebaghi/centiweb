"use client";
import { Tabs } from "antd";
import Articles from "./components/articles";
import Devs from "./components/devs";
import Production from "./components/production";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Others from "./components/others";

export default function AdminProfile() {
  const [articles, setArticles] = useState([]);
  const [devs, setDevs] = useState([]);
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");

  const getArticles = async () => {
    setLoading(true);
    await fetch("/api/articles")
      .then((res) => {
        if (!res.ok) {
          setErr("Server problem!");
          setLoading(false);
        } else {
          res.json().then((data) => {
            setLoading(false);
            setArticles(data.data);
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getDevs = async () => {
    setLoading(true);
    await fetch("/api/devs")
      .then((res) => {
        if (!res.ok) {
          setErr("Server problem!");
          setLoading(false);
        } else {
          res.json().then((data) => {
            setLoading(false);
            setDevs(data.data);
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getOthers = async () => {
    setLoading(true);
    await fetch("/api/others").then((res) => {
      if (!res.ok) {
        setLoading(false);
        setErr("server Problem");
      } else {
        res.json().then((data) => {
          setLoading(false);
          setOthers(data.data);
        });
      }
    });
  };
  const tabs = [
    {
      lable: "Articles",
      key: "1",
      children: (
        <Articles
          getArticles={getArticles}
          articles={articles}
          loading={loading}
          err={err}
        />
      ),
    },
    {
      lable: "DEVs",
      key: "2",
      children: (
        <Devs getDevs={getDevs} devs={devs} loading={loading} err={err} />
      ),
    },
    {
      lable: "Others",
      key: "3",
      children: (
        <Others
          getOthers={getOthers}
          others={others}
          loading={loading}
          err={err}
        />
      ),
    },
    {
      lable: "Production",
      key: "4",
      children: <Production getArticles={getArticles} devs={getDevs} />,
    },
  ];

  useEffect(() => {
    document.title = "Admin panel";
  }, []);

  return (
    <Container maxWidth="xl" className="pt-75px">
      <Tabs
        defaultValue={0}
        className="mt-5"
        type="line"
        style={{ minHeight: "500px" }}
        items={tabs.map((item) => {
          return {
            label: item.lable,
            key: item.key,
            children: item.children,
          };
        })}
      />
    </Container>
  );
}
