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
  FaServer,
  FaHome,
  FaChevronDown,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Drawer from "@mui/material/Drawer";

const menuItems = [
  { 
    label: "Explorer", 
    path: "/scan", 
    icon: <FaQrcode />,
    submenu: [
      { label: "Blocks", path: "/scan/blocks" },
      { label: "Transactions", path: "/scan/transactions" }
    ]

  },
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
    label: "Become a Node",
    path: "/node",
    icon: <FaServer />,
    submenu: [
      { label: "Relay", path: "/relay" },
      { label: "Validator", path: "/validator" },
      { label: "Contributors", path: "/contributors" },
    ],
  },
  {
    label: "Contact",
    path: "/contact",
    icon: <FaEnvelope />,
  },
];

const drawerMenuItems = [
  { label: "Home", path: "/", icon: <FaHome /> },
  ...menuItems
];

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [coins, setCoins] = useState<number | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isMedium = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    fetchCoins();
  }, []);

  // Close submenu when pathname changes
  useEffect(() => {
    setOpenSubmenu(null);
  }, [pathname]);

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
        duration: 0.2,
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  const isPathActive = (menuPath: string) => {
    if (menuPath === "/dev") {
      return pathname.startsWith("/dev");
    }
    if (menuPath === "/node") {
      return pathname.startsWith("/node") || pathname === "/contributors";
    }
    if (menuPath === "/scan") {
      return pathname === "/scan" || pathname === "/transactions";
    }
    return pathname === menuPath;
  };

  const handleSubmenuClick = (path: string) => {
    if (openSubmenu === path) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(path);
    }
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
          {!isMedium && (
            <div className="flex items-center justify-center flex-1 space-x-8">
              {menuItems.map((item) => (
                <div key={item.path} className="relative">
                  {item.submenu ? (
                    <div className="relative">
                      <button
                        onClick={() => handleSubmenuClick(item.path)}
                        className={`
                          flex items-center space-x-2 px-3 py-2 rounded-md text-sm
                          transition-all duration-200
                          ${
                            isPathActive(item.path)
                              ? "text-emerald-400 bg-emerald-900/20"
                              : "text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/10"
                          }
                        `}
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                        <FaChevronDown
                          className={`ml-1 transition-transform ${
                            openSubmenu === item.path ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openSubmenu === item.path && (
                        <div className="absolute top-full left-0 mt-1 py-2 w-48 bg-black/90 backdrop-blur-lg rounded-md shadow-lg">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.path}
                              href={subItem.path}
                              className={`block px-4 py-2 text-sm ${
                                pathname === subItem.path
                                  ? "text-emerald-400 bg-emerald-900/20"
                                  : "text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/10"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`
                        flex items-center space-x-2 px-3 py-2 rounded-md text-sm
                        transition-all duration-200
                        ${
                          isPathActive(item.path)
                            ? "text-emerald-400 bg-emerald-900/20"
                            : "text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/10"
                        }
                      `}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
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
                {isMobile
                  ? `${Number(coins).toLocaleString()} CENTIs`
                  : `Remaining CENTIs: ${Number(coins).toLocaleString()}`}
              </motion.span>
            ) : (
              <PulseLoader size={4} color="#34D399" />
            )}

            {/* Mobile/Medium Menu Button */}
            {isMedium && (
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

        {/* Mobile/Medium Menu Drawer */}
        <Drawer
          anchor="right"
          open={isMedium && isOpen}
          onClose={() => setIsOpen(false)}
          PaperProps={{
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              backdropFilter: "blur(10px)",
              width: "75%",
            },
          }}
        >
          <div className="relative px-2 pt-16 pb-3 space-y-1">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-emerald-400"
            >
              <IoClose className="w-6 h-6" />
            </button>
            {drawerMenuItems.map((item) => (
              <div key={item.path}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => handleSubmenuClick(item.path)}
                      className={`
                        w-full flex items-center justify-between space-x-3 px-3 py-2 rounded-md text-base
                        transition-all duration-200
                        ${
                          isPathActive(item.path)
                            ? "text-emerald-400 bg-emerald-900/20"
                            : "text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/10"
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <FaChevronDown
                        className={`transition-transform ${
                          openSubmenu === item.path ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openSubmenu === item.path && (
                      <div className="pl-8 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.path}
                            href={subItem.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-2 rounded-md text-sm ${
                              pathname === subItem.path
                                ? "text-emerald-400 bg-emerald-900/20"
                                : "text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/10"
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center space-x-3 px-3 py-2 rounded-md text-base
                      transition-all duration-200
                      ${
                        isPathActive(item.path)
                          ? "text-emerald-400 bg-emerald-900/20"
                          : "text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/10"
                      }
                    `}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    </nav>
  );
}

export default Menu;
