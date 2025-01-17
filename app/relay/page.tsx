"use client";

import React from "react";
import { CircularProgress, Container, Snackbar, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import {
  FaBookmark,
  FaCalendarAlt,
  FaClock,
  FaFacebookF,
  FaHeart,
  FaLink,
  FaLinkedinIn,
  FaMoon,
  FaRegBookmark,
  FaShareAlt,
  FaSun,
  FaTelegram,
  FaUser,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import ErrorBoundary from "../components/ErrorBoundary";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  author?: string;
  image?: string;
  type?: string;
}

export default function RelayPage() {
  const [article, setArticle] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [similarArticles, setSimilarArticles] = useState<Post[]>([]);
  const [savedArticles, setSavedArticles] = useState<Set<string>>(new Set());
  const [showShareMenu, setShowShareMenu] = useState(false);
  const router = useRouter();

  const theme = {
    light: {
      bg: "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50",
      text: "text-slate-900",
      secondaryText: "text-slate-600",
      accent: "text-green-600",
      border: "border-slate-200",
      card: "bg-white/90 backdrop-blur-sm",
      hover: "hover:bg-slate-100",
      gradient: "from-white to-slate-50",
    },
    dark: {
      bg: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
      text: "text-slate-100",
      secondaryText: "text-slate-400",
      accent: "text-green-400",
      border: "border-slate-800",
      card: "bg-slate-800/90 backdrop-blur-sm",
      hover: "hover:bg-slate-700",
      gradient: "from-slate-900 to-slate-800",
    },
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch("/api/becomes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: "relay" }),
        });

        const data = await response.json();

        if (data.status === "success" && data.data.length > 0) {
          setArticle({
            ...data.data[0],
            _id: "relay",
            image: "/relay.jpg",
            createdAt: new Date().toISOString(),
          });
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
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadingProgress(scrolled);
      setIsHeaderVisible(winScroll < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (showShareMenu) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showShareMenu]);

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
    setShowShareMenu(false);
  };

  const toggleSaveArticle = (articleId: string) => {
    setSavedArticles((prev) => {
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
        <motion.div
          className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600 z-50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: readingProgress / 100 }}
          style={{ transformOrigin: "0%" }}
        />

        {/* Floating Header */}
        <AnimatePresence>
          {!isHeaderVisible && (
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              className={`fixed top-0 left-0 right-0 z-40 ${currentTheme.card} border-b ${currentTheme.border} backdrop-blur-lg bg-opacity-80`}
            >
              <Container maxWidth="lg" className="py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold truncate max-w-2xl">
                    {article.title}
                  </h2>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-2 rounded-full transition-all ${currentTheme.hover}`}
                    >
                      <FaHeart
                        className={
                          isLiked ? "text-red-500" : currentTheme.secondaryText
                        }
                      />
                    </button>
                    <button
                      onClick={() => toggleSaveArticle(article._id.toString())}
                      className={`p-2 rounded-full transition-all ${currentTheme.hover}`}
                    >
                      {savedArticles.has(article._id.toString()) ? (
                        <FaBookmark className={currentTheme.accent} />
                      ) : (
                        <FaRegBookmark className={currentTheme.secondaryText} />
                      )}
                    </button>
                  </div>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>

        <Container maxWidth="lg" className="py-12 pt-24">
          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {article.title}
              </h1>
              <div
                className={`flex flex-wrap items-center gap-6 ${currentTheme.secondaryText} text-sm`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white">
                    {article.author?.[0]?.toUpperCase() || "A"}
                  </div>
                  <div>
                    <div className="font-medium text-base">
                      {article.author || "Anonymous"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <time dateTime={new Date(article.createdAt).toISOString()}>
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock />
                  <span>
                    {Math.ceil(article.content.split(" ").length / 200)} min
                    read
                  </span>
                </div>
              </div>
            </motion.header>

            {/* Featured Image */}
            {article.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-[21/9] relative rounded-xl overflow-hidden mb-12 shadow-2xl"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`prose prose-lg mx-auto ${
                isDarkMode ? "prose-invert" : ""
              } prose-headings:font-bold prose-a:text-green-600 dark:prose-a:text-green-400`}
            >
              <div
                className="preview-content"
                dangerouslySetInnerHTML={{
                  __html: article.content,
                }}
              />
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`mt-12 p-6 rounded-xl ${currentTheme.card} shadow-lg`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-full transition-all ${currentTheme.hover} flex items-center gap-2`}
                  >
                    <FaHeart
                      className={`text-xl ${
                        isLiked ? "text-red-500" : currentTheme.secondaryText
                      }`}
                    />
                    <span>Like</span>
                  </button>
                  <button
                    onClick={() => toggleSaveArticle(article._id.toString())}
                    className={`p-3 rounded-full transition-all ${currentTheme.hover} flex items-center gap-2`}
                  >
                    {savedArticles.has(article._id.toString()) ? (
                      <>
                        <FaBookmark
                          className={`text-xl ${currentTheme.accent}`}
                        />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <FaRegBookmark
                          className={`text-xl ${currentTheme.secondaryText}`}
                        />
                        <span>Save</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowShareMenu(!showShareMenu);
                    }}
                    className={`p-3 rounded-full transition-all ${currentTheme.hover} flex items-center gap-2`}
                  >
                    <FaShareAlt
                      className={`text-xl ${currentTheme.secondaryText}`}
                    />
                    <span>Share</span>
                  </button>

                  {/* Share Menu Popup */}
                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`absolute bottom-full right-0 mb-2 p-2 ${currentTheme.card} rounded-lg shadow-xl border ${currentTheme.border} z-50`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex flex-col gap-2">
                          {[
                            {
                              icon: FaXTwitter,
                              platform: "twitter",
                              label: "Twitter",
                              color: "text-slate-800 dark:text-white",
                            },
                            {
                              icon: FaFacebookF,
                              platform: "facebook",
                              label: "Facebook",
                              color: "text-[#4267B2]",
                            },
                            {
                              icon: FaLinkedinIn,
                              platform: "linkedin",
                              label: "LinkedIn",
                              color: "text-[#0077B5]",
                            },
                            {
                              icon: FaTelegram,
                              platform: "telegram",
                              label: "Telegram",
                              color: "text-[#0088cc]",
                            },
                            {
                              icon: FaLink,
                              platform: "copy",
                              label: "Copy Link",
                              color: currentTheme.secondaryText,
                            },
                          ].map(({ icon: Icon, platform, label, color }) => (
                            <button
                              key={platform}
                              onClick={() => handleShare(platform)}
                              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${currentTheme.hover} w-full`}
                            >
                              <Icon className={`text-xl ${color}`} />
                              <span className="whitespace-nowrap">{label}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </article>
        </Container>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg ${currentTheme.card} ${currentTheme.hover} backdrop-blur-sm bg-opacity-80`}
        >
          {isDarkMode ? (
            <FaSun className="text-xl text-yellow-400" />
          ) : (
            <FaMoon className="text-xl text-blue-600" />
          )}
        </motion.button>

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
