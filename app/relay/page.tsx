"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { FaServer, FaSpinner, FaDownload } from "react-icons/fa";
import { useRouter } from "next/navigation";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import ruby from "highlight.js/lib/languages/ruby";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/atom-one-dark.css";
import { message } from "antd";
import { FaCopy } from "react-icons/fa6";
import DOMPurify from "isomorphic-dompurify";

interface Post {
  title: string;
  content: string;
  date: string;
  author?: string;
  readTime?: string;
}

export default function RelayPage() {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("ruby", ruby);
    hljs.registerLanguage("python", python);

    (window as any).hljs = hljs;

    const style = document.createElement("style");
    style.textContent = `
      .prose ul { 
        list-style-type: disc !important;
        padding-left: 2em !important;
        margin: 1em 0 !important;
      }
      .prose ol {
        list-style-type: decimal !important;
        padding-left: 2em !important;
        margin: 1em 0 !important;
      }
      .prose table {
        border-collapse: collapse !important;
        width: 100% !important;
        margin: 1em 0 !important;
        display: block !important;
        overflow-x: auto !important;
        white-space: nowrap !important;
      }
      .prose th,
      .prose td {
        border: 1px solid #ddd !important;
        padding: 8px !important;
        text-align: left !important;
      }
      .prose th {
        background-color: #f5f5f5 !important;
      }
      @media (max-width: 768px) {
        pre {
          max-width: 100%;
          overflow-x: auto;
        }
        .code-content {
          font-size: 14px;
        }
        .copy-button {
          padding: 4px 8px;
          font-size: 12px;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const highlightCode = useCallback(() => {
    if (contentRef.current) {
      const codeBlocks = contentRef.current.querySelectorAll("pre code");
      codeBlocks.forEach((block: Element) => {
        hljs.highlightElement(block as HTMLElement);
        addCopyButton(block.parentElement as HTMLElement);
      });
    }
  }, []);

  const addCopyButton = (block: HTMLElement) => {
    if (block.querySelector(".copy-button")) return;

    const button = document.createElement("button");
    button.innerHTML = "<FaCopy /> Copy";
    button.className =
      "copy-button absolute top-2 right-2 bg-[#1a1a1a] text-white px-2 py-1 rounded text-sm";
    button.onclick = (e) => {
      e.preventDefault();
      const code = block.querySelector("code");
      if (code) {
        navigator.clipboard.writeText(code.innerText);
        message.success("Code copied to clipboard!");
      }
    };
    block.style.position = "relative";
    block.appendChild(button);
  };

  useEffect(() => {
    const fetchPost = async () => {
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
          setPost(data.data[0]);
        } else {
          setError("Article not found");
        }
      } catch (err) {
        setError("Failed to fetch article");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  useEffect(() => {
    if (post) {
      setTimeout(() => {
        highlightCode();
      }, 0);
    }
  }, [post, highlightCode]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      highlightCode();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [highlightCode]);

  const handleDownloadClick = () => {
    router.push('/download#relay-section');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/95 pt-20">
        <FaSpinner className="animate-spin text-4xl text-emerald-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/95 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xl bg-red-500/10 px-6 py-4 rounded-lg"
        >
          {error}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/95 pt-20">
      {post && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto px-4 py-12"
        >
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-emerald-500 mb-4">
              <FaServer className="text-xl" />
              <span className="text-sm uppercase tracking-wider">Relay Node</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-400 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              {post.author && (
                <>
                  <span>•</span>
                  <span>{post.author}</span>
                </>
              )}
              {post.readTime && (
                <>
                  <span>•</span>
                  <span>{post.readTime} read</span>
                </>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-emerald lg:prose-xl max-w-none"
            ref={contentRef}
          >
            <div 
              className="text-gray-200 code-content"
              dangerouslySetInnerHTML={{ 
                __html: `
                  <style>
                    .code-content ul { 
                      list-style-type: disc !important;
                      padding-left: 2em !important;
                      margin: 1em 0 !important;
                    }
                    .code-content ol {
                      list-style-type: decimal !important;
                      padding-left: 2em !important;
                      margin: 1em 0 !important;
                    }
                    .code-content table {
                      border-collapse: collapse !important;
                      width: 100% !important;
                      margin: 1em 0 !important;
                      display: block !important;
                      overflow-x: auto !important;
                      white-space: nowrap !important;
                    }
                    .code-content th,
                    .code-content td {
                      border: 1px solid #ddd !important;
                      padding: 8px !important;
                      text-align: left !important;
                    }
                    .code-content th {
                      background-color: #f5f5f5 !important;
                    }
                  </style>
                  ${DOMPurify.sanitize(post.content)}
                `
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-emerald-900/20 rounded-lg border border-emerald-500/20"
          >
            <h3 className="text-xl text-emerald-400 mb-4">Ready to Run a Relay Node?</h3>
            <p className="text-gray-300 mb-4">
              Download the Centichain software and start contributing to the network today.
            </p>
            <button 
              onClick={handleDownloadClick}
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <FaDownload />
              <span>Become</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
