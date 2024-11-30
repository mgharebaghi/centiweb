"use client";

import { Typography, Container, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { FaDownload, FaBookOpen } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Banner() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    setMounted(true);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const buttonClass = 
    "w-full py-3 px-6 rounded-lg transition-all duration-300 text-slate-200 bg-transparent hover:bg-slate-700/80 hover:text-white border border-slate-300 hover:border-slate-200 flex items-center justify-center font-medium tracking-wide shadow-sm hover:shadow-lg backdrop-blur-sm";

  const blockVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    },
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-slate-300 flex items-center relative overflow-hidden font-sans pt-16 px-4 sm:px-6 lg:px-8">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient orbs */}
        {Array.from({length: 3}).map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl"
            style={{
              background: i === 0 ? 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)' :
                        i === 1 ? 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 70%)' :
                                 'radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 70%)',
              width: `${Math.random() * 50 + 30}%`,
              height: `${Math.random() * 50 + 30}%`,
              left: `${i * 30}%`,
              top: `${Math.random() * 60}%`
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}

        {/* Subtle floating particles */}
        <div className="absolute inset-0">
          {Array.from({length: isMobile ? 20 : 40}).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.3 + 0.2})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20],
                x: [-20, 20],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <Container maxWidth="lg" className="relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
          }}
        >
          <motion.div variants={blockVariants} className="flex justify-center">
            <Image
              src="/images/Logo.png"
              alt="Centichain Logo"
              width={300}
              height={300}
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              priority
            />
          </motion.div>

          <motion.div variants={blockVariants}>
            <Typography
              variant="h1"
              fontWeight="bold"
              className="h-20 text-center mb-5 text-slate-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent"
            >
              Revolutionizing Decentralization
            </Typography>
          </motion.div>

          <motion.div variants={blockVariants}>
            <TypeAnimation
              sequence={[
                "Simplicity for All",
                2500,
                "Affordable Participation",
                2500,
                "Eco-Friendly Operation",
                2500,
                "Equitable and Ethical",
                2500,
                "Innovative Consensus",
                2500,
              ]}
              wrapper="div"
              speed={50}
              repeat={Infinity}
              className="text-2xl sm:text-3xl md:text-4xl text-center h-20 tracking-wide text-green-300 font-bold"
            />
          </motion.div>

          <motion.div variants={blockVariants} className="mb-16">
            <Typography variant="h6" className="text-center text-slate-300 font-light leading-relaxed tracking-wide text-base sm:text-lg md:text-xl max-w-3xl mx-auto backdrop-blur-sm bg-slate-900/30 p-6 rounded-xl">
              Empowering everyone with accessible, efficient, and sustainable blockchain technology that shapes the future of decentralized systems
            </Typography>
          </motion.div>

          <motion.div variants={blockVariants}>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 max-w-2xl mx-auto">
              <Link href="/download" passHref className="w-full sm:w-auto">
                <Button variant="outlined" className={`${buttonClass} hover:scale-105`}>
                  <FaDownload className="mr-3 text-lg" /> Get Started
                </Button>
              </Link>
              <Link href="/articles/671fcec5d136b9550a238077" passHref className="w-full sm:w-auto">
                <Button variant="outlined" className={`${buttonClass} hover:scale-105`}>
                  <FaBookOpen className="mr-3 text-lg" /> Explore More
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
