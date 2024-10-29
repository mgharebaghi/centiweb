"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import { PulseLoader } from "react-spinners";
import { IoReorderThree } from "react-icons/io5";
import Image from "next/image";
import CustomDrawer from "./components/drawer";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaQrcode,
  FaFileAlt,
  FaDownload,
  FaCode,
  FaEnvelope,
} from "react-icons/fa";

const menuItems = [
  { label: "Explorer", path: "/scan", color: "#FF6B6B", icon: <FaQrcode /> },
  {
    label: "Whitepaper",
    path: "/articles/671fcec5d136b9550a238077",
    color: "#FFA07A",
    icon: <FaFileAlt />,
  },
  {
    label: "Download",
    path: "/download",
    color: "#98D8C8",
    icon: <FaDownload />,
  },
  { label: "DEV", path: "/dev", color: "#4CAF50", icon: <FaCode /> },
  {
    label: "Contact",
    path: "/contact",
    color: "#9370DB",
    icon: <FaEnvelope />,
  },
];

function Menu() {
  const [activeItem, setActiveItem] = useState<string>("");
  const [coins, setCoins] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 640px)");

  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    setActiveItem(pathname ?? "");
    fetchCoins();
    socketInitializer();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [pathname]);

  const socketInitializer = async () => {
    try {
      const response = await fetch('/api/sockets');
      const data = await response.json();
      
      const websocket = new WebSocket(data.wsEndpoint);
      
      websocket.onopen = () => {
        console.log('Connected to WebSocket server');
      };

      websocket.onmessage = (event) => {
        console.log('Received message:', event.data);
      };

      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      websocket.onclose = () => {
        console.log('Disconnected from WebSocket server');
      };

      setWs(websocket);
    } catch (error) {
      console.error('Failed to initialize WebSocket:', error);
    }
  };

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

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg w-full"
    >
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src="/images/Logo.png"
              alt="Centichain Logo"
              width={48}
              height={48}
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14"
            />
          </motion.div>

          {isDesktop && (
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2 md:space-x-4">
              {menuItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={item.path}
                    className={`px-2 md:px-3 py-1 md:py-2 rounded-md text-xs md:text-sm font-medium transition duration-300 ease-in-out flex items-center ${
                      activeItem === item.path
                        ? `bg-opacity-20 text-white`
                        : "text-gray-300 hover:text-white hover:bg-opacity-10"
                    }`}
                    style={{
                      backgroundColor:
                        activeItem === item.path ? item.color : "transparent",
                      boxShadow:
                        activeItem === item.path
                          ? `0 0 10px ${item.color}`
                          : "none",
                    }}
                  >
                    <span className="mr-1 md:mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex items-center">
            <AnimatePresence>
              <motion.div
                key={coins}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="mr-2 sm:mr-4"
              >
                {coins !== null ? (
                  <span className="text-xs sm:text-sm font-medium text-gray-300">
                    {isMobile
                      ? `CENTIs: ${Number(coins).toLocaleString()}`
                      : `Remaining CENTIs: ${Number(coins).toLocaleString()}`}
                  </span>
                ) : (
                  <PulseLoader size={4} color="#E5E7EB" />
                )}
              </motion.div>
            </AnimatePresence>

            {!isDesktop && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDrawerOpen(true)}
                className="p-1 sm:p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
              >
                <IoReorderThree className="h-5 w-5 sm:h-6 sm:w-6" />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {!isDesktop && (
        <CustomDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          menuItems={menuItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      )}
    </motion.nav>
  );
}

export default Menu;
