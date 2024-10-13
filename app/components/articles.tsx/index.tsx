import { Container, Grid, Typography } from "@mui/material";
import Card from "./cards";
import { forwardRef, useEffect, useState } from "react";
import { ObjectId } from "mongodb";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";
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
  const [articles, setArticles] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      const res = await fetch("/api/articles", { cache: "no-store" });

      if (!res.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await res.json();
      setArticles(data.data);
    } catch (e) {
      setError("Failed to load articles. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-[500px] flex justify-center items-center">
        <PulseLoader color="gray" size={10} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[500px] flex justify-center items-center">
        <Typography variant="h6" color="error">{error}</Typography>
      </div>
    );
  }

  return (
    <div className="min-h-[500px] w-full py-12 bg-gray-100">
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {articles.map((item: Post, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={item._id.toString()}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  id={item._id.toString()}
                  pic={item.image}
                  title={item.title}
                  description={item.description}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default forwardRef(Articles);
