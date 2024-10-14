"use client";

import { Post } from "@/app/api/types/types";
import { Container, Typography, Box, Divider, Grid, Paper, CircularProgress, Chip } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeProvider, responsiveFontSizes, createTheme } from "@mui/material";
import Card from "../components/cards";
import { motion } from "framer-motion";
import ErrorBoundary from "../../components/ErrorBoundary";
import { FaCalendarAlt, FaUser, FaClock } from "react-icons/fa";

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4ECDC4',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

function Article({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [relatedArticles, setRelatedArticles] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articleRes, articlesRes] = await Promise.all([
          fetch("/api/article", {
            method: "POST",
            body: JSON.stringify({ id: params.id }),
          }),
          fetch("/api/articles")
        ]);

        if (!articleRes.ok || !articlesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const articleData = await articleRes.json();
        const articlesData = await articlesRes.json();

        if (articleData.status === "success") {
          setArticle(articleData.article);
          document.title = articleData.article.title;
          setRelatedArticles(articlesData.data.filter((art: Post) => art._id.toString() !== params.id));
        } else {
          throw new Error('Failed to fetch article');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, router]);

  if (loading) {
    return (
      <Box className="w-full min-h-screen flex justify-center items-center bg-gray-900">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Box className="w-full min-h-screen bg-gray-900 text-white">
          <Container maxWidth="lg" className="pt-24 pb-16">
            {article && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Paper elevation={3} className="p-8 mb-8 bg-gray-900 rounded-lg">
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                      <Typography variant="h3" fontWeight="bold" gutterBottom className="text-4xl md:text-5xl lg:text-6xl">
                        {article.title}
                      </Typography>
                      <Box className="flex flex-wrap gap-4 my-4">
                        <Chip icon={<FaCalendarAlt />} label={new Date(article.createdAt).toLocaleDateString()} color="primary" />
                        <Chip icon={<FaUser />} label={article.author || 'Anonymous'} color="primary" />
                        <Chip icon={<FaClock />} label={`${Math.ceil(article.content.split(' ').length / 200)} min read`} color="primary" />
                      </Box>
                      <Divider className="my-4" />
                      <Typography variant="h6" fontWeight="medium" gutterBottom className="text-gray-300">
                        {article.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} className="flex justify-center items-center">
                      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                        <Image
                          alt={article.title}
                          src={article.image}
                          width={400}
                          height={400}
                          placeholder="blur"
                          blurDataURL={`data:image/svg+xml;base64,${btoa(
                            '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="#1E1E1E"/></svg>'
                          )}`}
                          className="rounded-lg shadow-lg"
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" component="div">
                        <div
                          dangerouslySetInnerHTML={{ __html: article.content }}
                          className="prose prose-invert prose-lg max-w-none"
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            )}

            {relatedArticles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Typography variant="h4" fontWeight="bold" className="mb-6 mt-12 text-3xl md:text-4xl">
                  Suggested Articles
                </Typography>
                <Grid container spacing={4}>
                  {relatedArticles.slice(0, 3).map((item: Post, index: number) => (
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
              </motion.div>
            )}
          </Container>
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default Article;
