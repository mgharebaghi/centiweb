import { Container } from "@mui/material";
import { Col, Row } from "antd";
import Card from "./cards";
import { forwardRef, useEffect, useState } from "react";
import { ObjectId } from "mongodb";
import { PulseLoader } from "react-spinners";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";

interface Post {
  _id: ObjectId;
  title: string;
  description: string;
  content: string;
  type: string;
  image: string;
}

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [serverMsg, setServerMsg] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    getArticles();
  }, []);

  const getArticles = async () => {
    router.refresh();
    setLoading(true);
    try {
      const res = await fetch("/api/articles", {cache: "no-store"});

      if (!res.ok) {
        setLoading(false);
        setServerMsg("Error from server!");
      } else {
        const data = await res.json();
        setLoading(false);
        setArticles(data.data);
      }
    } catch (e) {
      setLoading(false);
      setServerMsg("Server Error!");
    }
  };

  return (
    <div className="min-h-[500px] w-[100%] pt-3 pb-3 border-t-[1px]">
      <Container maxWidth="xl">
        <Row>
          {!loading ? (
            articles.map((item: Post, index: number) => {
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
            })
          ) : (
            <div className="w-full min-h-[500px] flex justify-center items-center">
              <PulseLoader color="gray" size={5} />
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default forwardRef(Articles);
