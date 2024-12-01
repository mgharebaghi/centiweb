"use client";

import { Typography, Container, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaBookOpen } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { debounce } from 'lodash';

export default function Banner() {
  const [mounted, setMounted] = useState(false);
  const [screenSize, setScreenSize] = useState('lg');
  const { ref: bannerRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize('sm');
      else if (width < 768) setScreenSize('md');
      else if (width < 1024) setScreenSize('lg');
      else setScreenSize('xl');
    };
    
    const debouncedCheck = debounce(checkScreenSize, 250);
    checkScreenSize();
    window.addEventListener('resize', debouncedCheck);
    setMounted(true);
    
    return () => window.removeEventListener('resize', debouncedCheck);
  }, []);

  const buttonClass = `
    group relative w-full py-3 px-6 rounded-lg 
    transition-all duration-300 
    text-slate-200 bg-transparent 
    hover:bg-gradient-to-r from-blue-500/20 to-green-500/20
    hover:text-white border border-slate-300/50 
    hover:border-slate-200 flex items-center justify-center 
    font-medium tracking-wide shadow-sm hover:shadow-lg 
    backdrop-blur-sm
  `;

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
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.3
      }
    }
  };

  const getImageDimensions = () => ({
    width: {
      sm: 180,
      md: 240,
      lg: 300,
      xl: 360
    }[screenSize] || 300,
    height: {
      sm: 180,
      md: 240,
      lg: 300,
      xl: 360
    }[screenSize] || 300
  });

  if (!mounted) {
    return null;
  }

  return (
    <div 
      ref={bannerRef}
      className="min-h-screen bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-slate-950 via-slate-900 to-slate-800 text-slate-300 flex items-center relative overflow-hidden font-sans pt-16 pb-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Enhanced Animated Background with Glassmorphism */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-950/70 backdrop-blur-[2px]" />
        
        {/* Dynamic Gradient Orbs */}
        {Array.from({length: 3}).map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-[100px]"
            style={{
              background: [
                'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(147,51,234,0.2) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 70%)'
              ][i],
              width: `${Math.random() * 50 + 30}%`,
              height: `${Math.random() * 50 + 30}%`,
              left: `${i * 30}%`,
              top: `${Math.random() * 60}%`
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({length: {sm: 15, md: 25, lg: 40, xl: 50}[screenSize] || 40}).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-blue-400 to-green-400"
              style={{
                width: Math.random() * (screenSize === 'sm' ? 2 : 3) + 1 + 'px',
                height: Math.random() * (screenSize === 'sm' ? 2 : 3) + 1 + 'px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20],
                x: [-20, 20],
                opacity: [0, 0.8, 0],
                scale: [1, 1.2, 1]
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
        <AnimatePresence>
          {inView && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                visible: { transition: { staggerChildren: 0.3 } },
              }}
            >
              <motion.div variants={blockVariants} className="flex justify-center">
                <div className="relative group">
                  <Image
                    src="/images/Logo.png"
                    alt="Centichain Logo"
                    {...getImageDimensions()}
                    className="drop-shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-3"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>

              <motion.div variants={blockVariants}>
                <Typography
                  variant="h1"
                  fontWeight="bold"
                  className="h-auto min-h-[5rem] text-center mb-5 text-slate-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent px-2 hover:scale-105 transition-transform duration-300"
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
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center min-h-[4rem] tracking-wide text-green-300 font-bold px-2 drop-shadow-lg"
                />
              </motion.div>

              <motion.div variants={blockVariants} className="mb-8 sm:mb-12 lg:mb-16 px-2">
                <Typography 
                  variant="h6" 
                  className="text-center text-slate-300 font-light leading-relaxed tracking-wide text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto backdrop-blur-md bg-slate-900/40 p-4 sm:p-6 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-colors duration-300"
                >
                  Empowering everyone with accessible, efficient, and sustainable blockchain technology that shapes the future of decentralized systems
                </Typography>
              </motion.div>

              <motion.div variants={blockVariants}>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 max-w-2xl mx-auto px-4">
                  <Link href="/download" passHref className="w-full sm:w-auto">
                    <Button variant="outlined" className={`${buttonClass} text-sm sm:text-base`}>
                      <FaDownload className="mr-2 sm:mr-3 text-base sm:text-lg group-hover:rotate-12 transition-transform duration-300" /> 
                      Get Started
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                  </Link>
                  <Link href="/articles/671fcec5d136b9550a238077" passHref className="w-full sm:w-auto">
                    <Button variant="outlined" className={`${buttonClass} text-sm sm:text-base`}>
                      <FaBookOpen className="mr-2 sm:mr-3 text-base sm:text-lg group-hover:rotate-12 transition-transform duration-300" /> 
                      Explore More
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
