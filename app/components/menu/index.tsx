"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoReorderThree } from "react-icons/io5";
import { PulseLoader } from "react-spinners";
import {
  FaQrcode,
  FaFileAlt,
  FaDownload,
  FaCode,
  FaEnvelope,
  FaUsers,
} from "react-icons/fa";

const menuItems = [
  { label: "Explorer", path: "/scan", icon: <FaQrcode /> },
  {
    label: "Whitepaper",
    path: "/articles/671fcec5d136b9550a238077", 
    icon: <FaFileAlt />,
  },
  {
    label: "Download",
    path: "/download",
    icon: <FaDownload />,
  },
  { label: "DEV", path: "/dev", icon: <FaCode /> },
  {
    label: "Contributors",
    path: "/contributors",
    icon: <FaUsers />,
  },
  {
    label: "Contact", 
    path: "/contact",
    icon: <FaEnvelope />,
  },
];

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [coins, setCoins] = useState<number | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      const res = await fetch("/api/coins", { cache: "no-store" });
      const data = await res.json();
      setCoins(Number(data.message));
    } catch (error) {
      console.error("Error fetching coins:", error);
      setCoins(null);
    }
  };

  const menuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  const isPathActive = (menuPath: string) => {
    if (menuPath === '/dev') {
      return pathname.startsWith('/dev');
    }
    return pathname === menuPath;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - Left Corner */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer absolute left-4"
            onClick={() => router.push("/")}
          >
            <Image
              src="/images/Logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </motion.div>

          {/* Desktop Menu - Centered */}
          {!isMobile && (
            <div className="flex items-center justify-center flex-1 space-x-8">
              {menuItems.map((item) => (
                <Link 
                  key={item.path}
                  href={item.path}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-md text-sm
                    transition-all duration-200
                    ${isPathActive(item.path) ? 
                      'text-emerald-400 bg-emerald-900/20' : 
                      'text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/10'
                    }
                  `}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Remaining CENTIs - Right Corner */}
          <div className="absolute right-4 flex items-center">
            {coins !== null ? (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm font-medium text-emerald-400"
              >
                {isMobile ? 
                  `${Number(coins).toLocaleString()} CENTIs` :
                  `Remaining CENTIs: ${Number(coins).toLocaleString()}`
                }
              </motion.span>
            ) : (
              <PulseLoader size={4} color="#34D399" />
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-emerald-400 ml-4"
              >
                <IoReorderThree className="w-8 h-8" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center space-x-3 px-3 py-2 rounded-md text-base
                      transition-all duration-200
                      ${isPathActive(item.path) ?
                        'text-emerald-400 bg-emerald-900/20' :
                        'text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/10'
                      }
                    `}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Menu;
