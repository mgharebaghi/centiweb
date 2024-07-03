"use client";

import { Post } from "@/app/api/types/types";
import { Container, Typography } from "@mui/material";
import { Col, Divider, Row } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { ThemeProvider, responsiveFontSizes, createTheme } from "@mui/material";
import Card from "../components/cards";

let theme = createTheme();
theme = responsiveFontSizes(theme);

function Article({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Post>();
  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<Post[]>([]);
  const [artLoading, setArtLoading] = useState(false);
  const route = useRouter();

  useEffect(() => {
    fetchData();
    getArticles();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/article", {
      method: "POST",
      body: JSON.stringify({ id: params.id }),
    });

    if (!res.ok) {
      setLoading(false);
      route.push("/404");
    } else {
      res.json().then((data) => {
        if (data.status === "success") {
          setLoading(false);
          setArticle(data.article);
          document.title = data.article.title;
        } else {
          setLoading(false);
          route.push("/404");
        }
      });
    }
  };

  const getArticles = async () => {
    setArtLoading(true);
    let response = await fetch("/api/articles");

    if (!response.ok) {
      setArtLoading(false);
    } else {
      response
        .json()
        .then((data) => {
          data.data.map((art: Post, index: number) => {
            if (art._id.toString() !== params.id) {
              setArticles((prevData) => [...prevData, art]);
            }
          });
        })
        .then(() => {
          setArtLoading(false);
        });
    }
  };

  return (
    <div className="w-full min-h-[750px]">
      <Container
        maxWidth="lg"
        className="pt-20 pb-10 shadow-md rounded-b-md min-h-[750px] break-words"
      >
        {!loading && article && !artLoading ? (
          <ThemeProvider theme={theme}>
            <Row>
              <Col
                xs={24}
                sm={24}
                md={18}
                lg={18}
                xl={18}
                xxl={18}
                className="p-3 pb-0"
              >
                <Typography variant="h3" fontWeight="bold">
                  {article.title}
                </Typography>
                <Divider />
                <Typography variant="h6" fontWeight="bold">
                  {article.description}
                </Typography>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={6}
                lg={6}
                xl={6}
                xxl={6}
                className="flex justify-center items-end pl-3 pt-3"
              >
                <Image
                  alt={article.title}
                  src={article.image}
                  width={300}
                  height={300}
                  placeholder="blur"
                  blurDataURL={`${(
                    <PulseLoader size={10} className="text-slate-600" />
                  )}`}
                  className="rounded-sm"
                />
              </Col>
              <Col span={24} className="p-3 pt-0">
                <Typography variant="h6">
                  <div
                    dangerouslySetInnerHTML={{ __html: article.content }}
                    className="break-words"
                  />
                </Typography>
              </Col>
            </Row>
            <Divider />
            <Row>
              {articles.map((item: Post, index: number) => {
                return (
                  <Col
                    key={index}
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                    xxl={12}
                    className="flex justify-center items-center mb-1 p-3"
                    data-aos="fade-zoom-in"
                  >
                    <Card
                      id={item._id}
                      pic={item.image}
                      title={item.title}
                      description={item.description}
                    />
                  </Col>
                );
              })}
            </Row>
          </ThemeProvider>
        ) : (
          <div className="w-full min-h-[700px] flex justify-center items-center">
            <PulseLoader size={5} />
          </div>
        )}
      </Container>
    </div>
  );
}

export default Article;
