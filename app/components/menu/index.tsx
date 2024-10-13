"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import { PulseLoader } from "react-spinners";
import { IoReorderThree } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import CustomDrawer from "./components/drawer";
import { motion, AnimatePresence } from "framer-motion";
import { FaQrcode, FaCheckCircle, FaBroadcastTower, FaFileAlt, FaDownload } from "react-icons/fa";

const menuItems = [
  { label: "Scan", path: "/scan", color: "#FF6B6B", icon: <FaQrcode /> },
  { label: "Validator", path: "/articles/669017ee261897ff8bf5d197", color: "#4ECDC4", icon: <FaCheckCircle /> },
  { label: "Relay", path: "/articles/6690198b261897ff8bf5d198", color: "#45B7D1", icon: <FaBroadcastTower /> },
  { label: "Whitepaper", path: "/articles/66901aa0261897ff8bf5d199", color: "#FFA07A", icon: <FaFileAlt /> },
  { label: "Download", path: "/download", color: "#98D8C8", icon: <FaDownload /> },
];

function Menu() {
  const [activeItem, setActiveItem] = useState("");
  const [coins, setCoins] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    setActiveItem(pathname);
    fetchCoins();
  }, [pathname]);

  const fetchCoins = async () => {
    try {
      const res = await fetch("/api/coins", { cache: "no-store" });
      const data = await res.json();
      setCoins(data.message);
    } catch (error) {
      console.error("Failed to fetch coins:", error);
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
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex-shrink-0 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <FaHome className="h-8 w-8 text-white hover:text-blue-400 transition-colors duration-300" />
          </motion.div>
          
          {isDesktop ? (
            <div className="hidden lg:flex items-center space-x-4 flex-grow justify-center">
              {menuItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center ${
                      activeItem === item.path
                        ? `bg-opacity-20 text-white`
                        : "text-gray-300 hover:text-white hover:bg-opacity-10"
                    }`}
                    style={{
                      backgroundColor: activeItem === item.path ? item.color : "transparent",
                      boxShadow: activeItem === item.path ? `0 0 10px ${item.color}` : "none",
                    }}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDrawerOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
            >
              <IoReorderThree className="h-6 w-6" />
            </motion.button>
          )}

          <AnimatePresence>
            <motion.div
              key={coins}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
              {coins !== null ? (
                <span className="text-sm font-medium text-gray-300">
                  Remaining CENTIs: {Number(coins).toLocaleString()}
                </span>
              ) : (
                <PulseLoader size={5} color="#E5E7EB" />
              )}
            </motion.div>
          </AnimatePresence>
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
