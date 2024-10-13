"use client";

import { Post } from "@/app/api/types/types";
import { Container, Typography, Box, Divider, Grid, Paper, CircularProgress } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeProvider, responsiveFontSizes, createTheme } from "@mui/material";
import Card from "../components/cards";
import { motion } from "framer-motion";
import ErrorBoundary from "../../components/ErrorBoundary";

let theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
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
                <Paper elevation={3} className="p-6 mb-8 bg-gray-900">
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                      <Typography variant="h3" fontWeight="bold" gutterBottom>
                        {article.title}
                      </Typography>
                      <Divider className="my-4" />
                      <Typography variant="h6" fontWeight="medium" gutterBottom>
                        {article.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} className="flex justify-center items-center">
                      <Image
                        alt={article.title}
                        src={article.image}
                        width={300}
                        height={300}
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${btoa(
                          '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="100%" height="100%" fill="#1E1E1E"/></svg>'
                        )}`}
                        className="rounded-md shadow-lg"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" component="div">
                        <div
                          dangerouslySetInnerHTML={{ __html: article.content }}
                          className="prose prose-invert max-w-none"
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            )}

            {relatedArticles.length > 0 && (
              <>
                <Typography variant="h4" fontWeight="bold" className="mb-6 mt-12">
                  Related Articles
                </Typography>
                <Grid container spacing={4}>
                  {relatedArticles.map((item: Post, index: number) => (
                    <Grid item xs={12} sm={6} key={item._id.toString()}>
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
              </>
            )}
          </Container>
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default Article;
