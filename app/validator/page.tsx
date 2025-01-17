"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaServer, FaSpinner, FaDownload } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Post {
  title: string;
  content: string;
  date: string;
  author?: string;
  readTime?: string;
}

export default function ValidatorPage() {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("/api/becomes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: "validator" }),
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

  const handleDownloadClick = () => {
    router.push('/download#validator-section');
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
              <span className="text-sm uppercase tracking-wider">Validator Node</span>
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
          >
            <div 
              className="text-gray-200"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-emerald-900/20 rounded-lg border border-emerald-500/20"
          >
            <h3 className="text-xl text-emerald-400 mb-4">Ready to Run a Validator Node?</h3>
            <p className="text-gray-300 mb-4">
              Download the Centichain software and start validating transactions on the network today.
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


