import { Container, Grid, Typography, Box } from "@mui/material";
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
      <Box className="w-full min-h-screen flex justify-center items-center bg-gray-100">
        <PulseLoader color="#4A5568" size={15} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="w-full min-h-screen flex justify-center items-center bg-gray-100">
        <Typography variant="h6" color="error" className="text-red-500">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="min-h-screen w-full py-16 bg-gray-100 bg-opacity-90 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}></div>
      <Container maxWidth="xl" className="relative z-10">
        <Typography
          variant="h2"
          className="text-slate-800 mb-12 text-center font-bold tracking-wide"
        >
          Latest Articles
        </Typography>
        <Grid container spacing={6}>
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
    </Box>
  );
}

export default forwardRef(Articles);
