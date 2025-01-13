"use client";

import { Post } from "@/app/api/types/types";
import {
  CircularProgress,
  Tooltip,
  Snackbar,
  Container,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import {
  FaHeart,
  FaFacebookF,
  FaLinkedinIn,
  FaLink,
  FaSun,
  FaMoon,
  FaUser,
  FaTelegram,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

function Article({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [similarArticles, setSimilarArticles] = useState<Post[]>([]);
  const [savedArticles, setSavedArticles] = useState<Set<string>>(new Set());
  const router = useRouter();
  const { scrollY } = useScroll();

  const theme = {
    light: {
      bg: "bg-white",
      text: "text-gray-900",
      secondaryText: "text-gray-600",
      accent: "text-blue-600",
      border: "border-gray-200",
      card: "bg-gray-50",
      hover: "hover:bg-gray-100",
    },
    dark: {
      bg: "bg-gray-900",
      text: "text-gray-100",
      secondaryText: "text-gray-400",
      accent: "text-blue-400",
      border: "border-gray-700",
      card: "bg-gray-800",
      hover: "hover:bg-gray-700",
    },
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch("/api/article", {
          method: "POST",
          body: JSON.stringify({ id: params.id }),
        });

        if (!response.ok) throw new Error("Failed to fetch article");

        const data = await response.json();
        if (data.status === "success") {
          setArticle(data.article);
          document.title = data.article.title;
        } else {
          throw new Error("Article not found");
        }
      } catch (error) {
        console.error("Error:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.id, router]);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadingProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchSimilarArticles = async () => {
      if (!article) return;

      try {
        const response = await fetch("/api/similar-articles", {
          method: "POST",
          body: JSON.stringify({
            id: article._id,
            type: article.type,
          }),
        });

        if (!response.ok) throw new Error("Failed to fetch similar articles");

        const data = await response.json();
        if (data.status === "success") {
          setSimilarArticles(data.articles);
        }
      } catch (error) {
        console.error("Error fetching similar articles:", error);
      }
    };

    fetchSimilarArticles();
  }, [article]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = article?.title || "";

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title
          )}&url=${encodeURIComponent(url)}`
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "telegram":
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        setSnackbarOpen(true);
        break;
    }
  };

  const toggleSaveArticle = (articleId: string) => {
    setSavedArticles(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(articleId)) {
        newSaved.delete(articleId);
      } else {
        newSaved.add(articleId);
      }
      return newSaved;
    });
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen ${currentTheme.bg} flex items-center justify-center`}
      >
        <CircularProgress className={currentTheme.accent} />
      </div>
    );
  }

  if (!article) {
    return (
      <div
        className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} flex items-center justify-center`}
      >
        <p>Article not found</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div
        className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} transition-colors duration-300`}
      >
        {/* Progress bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
          <div
            className="h-full bg-blue-500 transition-all duration-200"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        <Container maxWidth="lg" className="py-12 pt-24">
          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-12">
              <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
              <div
                className={`flex items-center gap-4 ${currentTheme.secondaryText}`}
              >
                <div className="flex items-center gap-2">
                  <FaUser className="text-sm" />
                  <span>{article.author || "Anonymous"}</span>
                </div>
                <span>•</span>
                <time dateTime={new Date(article.createdAt).toISOString()}>
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>•</span>
                <span>
                  {Math.ceil(article.content.split(" ").length / 200)} min read
                </span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="aspect-video relative rounded-lg overflow-hidden mb-12">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div
              className={`prose prose-lg mx-auto ${
                isDarkMode ? "prose-invert" : ""
              }`}
            >
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            {/* Actions */}
            <div
              className={`mt-12 pt-6 pb-6 border-t border-b ${currentTheme.border} flex justify-between items-center`}
            >
              <div className="flex gap-4">
                <Tooltip title={isLiked ? "Unlike" : "Like"}>
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full transition-transform hover:scale-110 ${currentTheme.hover}`}
                  >
                    <FaHeart
                      className={`text-xl ${
                        isLiked ? "text-red-500" : currentTheme.secondaryText
                      }`}
                    />
                  </button>
                </Tooltip>
              </div>

              <div className="flex gap-4">
                <Tooltip title="Share on X">
                  <button
                    onClick={() => handleShare("twitter")}
                    className={`p-2 rounded-full transition-transform hover:scale-110 ${currentTheme.hover}`}
                  >
                    <FaXTwitter className="text-xl" />
                  </button>
                </Tooltip>
                <Tooltip title="Share on Facebook">
                  <button
                    onClick={() => handleShare("facebook")}
                    className={`p-2 rounded-full transition-transform hover:scale-110 ${currentTheme.hover}`}
                  >
                    <FaFacebookF className="text-xl text-[#4267B2]" />
                  </button>
                </Tooltip>
                <Tooltip title="Share on LinkedIn">
                  <button
                    onClick={() => handleShare("linkedin")}
                    className={`p-2 rounded-full transition-transform hover:scale-110 ${currentTheme.hover}`}
                  >
                    <FaLinkedinIn className="text-xl text-[#0077B5]" />
                  </button>
                </Tooltip>
                <Tooltip title="Share on Telegram">
                  <button
                    onClick={() => handleShare("telegram")}
                    className={`p-2 rounded-full transition-transform hover:scale-110 ${currentTheme.hover}`}
                  >
                    <FaTelegram className="text-xl text-[#0088cc]" />
                  </button>
                </Tooltip>
                <Tooltip title="Copy link">
                  <button
                    onClick={() => handleShare("copy")}
                    className={`p-2 rounded-full transition-transform hover:scale-110 ${currentTheme.hover}`}
                  >
                    <FaLink
                      className={`text-xl ${currentTheme.secondaryText}`}
                    />
                  </button>
                </Tooltip>
              </div>
            </div>

            {/* Suggested Articles */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">More Articles</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {similarArticles.map((article) => (
                  <motion.div
                    key={article._id.toString()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className={`${currentTheme.card} rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer`}
                    onClick={() => router.push(`/articles/${article._id}`)}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveArticle(article._id.toString());
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
                      >
                        {savedArticles.has(article._id.toString()) ? (
                          <FaBookmark className="text-white text-xs" />
                        ) : (
                          <FaRegBookmark className="text-white text-xs" />
                        )}
                      </button>
                    </div>
                    
                    <div className="p-3">
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs mt-2">
                        <FaUser className="text-xs" />
                        <span className={currentTheme.secondaryText}>
                          {article.author || "Anonymous"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </article>
        </Container>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg ${currentTheme.card} ${currentTheme.hover}`}
        >
          {isDarkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-blue-600" />
          )}
        </button>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message="Link copied to clipboard!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </div>
    </ErrorBoundary>
  );
}

export default Article;
