"use client";

import { Typography, Container, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
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
    group relative w-full py-3 sm:py-4 px-4 sm:px-8
    transition-all duration-300
    text-emerald-400 bg-black/50
    border border-emerald-900/50
    flex items-center justify-center gap-2 sm:gap-3
    font-mono tracking-[0.2em] sm:tracking-[0.3em] text-base sm:text-lg
    hover:bg-emerald-950/30
    hover:border-emerald-700/50
    backdrop-blur-sm
    hover:text-emerald-300
  `;

  const getImageDimensions = () => ({
    width: {
      sm: 120,
      md: 160,
      lg: 200,
      xl: 240
    }[screenSize] || 200,
    height: {
      sm: 120,
      md: 160,
      lg: 200,
      xl: 240
    }[screenSize] || 200
  });

  if (!mounted) return null;

  return (
    <div 
      ref={bannerRef}
      className="min-h-[100dvh] relative overflow-hidden font-mono flex items-center select-none"
    >
      {/* Dynamic background gradient with animated noise */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"
        animate={{
          background: [
            'linear-gradient(to bottom, #000000, #001a1a, #000000)',
            'linear-gradient(to bottom, #000000, #002b1a, #000000)',
            'linear-gradient(to bottom, #000000, #001a1a, #000000)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          transform: 'scale(1.5)',
        }}
      />

      {/* Enhanced Matrix-style code rain with depth layers */}
      {[0.1, 0.15, 0.2, 0.25].map((opacity, layerIndex) => (
        <div key={layerIndex} className="absolute inset-0 bg-black/60">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            transition={{ duration: 2 }}
          >
            {Array.from({ length: Math.floor(window.innerWidth / 35) }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute top-0 text-emerald-500/${opacity * 100} text-[10px] sm:text-xs whitespace-nowrap font-mono`}
                style={{
                  left: `${(i * 2.5) + (layerIndex * 0.8)}%`,
                  transform: 'rotate(90deg)',
                  transformOrigin: 'left top',
                  filter: `blur(${layerIndex * 0.4}px)`
                }}
                initial={{ y: -1000 }}
                animate={{ y: 2000 }}
                transition={{
                  duration: 12 + Math.random() * 8 + layerIndex * 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5
                }}
              >
                {Array.from({ length: 30 }).map(() => 
                  String.fromCharCode(0x30A0 + Math.random() * 96)
                ).join('')}
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}

      {/* Animated circuit board pattern with glow */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(52,211,153,0.3) 2px, transparent 0),
            linear-gradient(45deg, rgba(52,211,153,0.15) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(52,211,153,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px, 50px 50px, 50px 50px',
          filter: 'drop-shadow(0 0 2px rgba(52,211,153,0.2))'
        }}
      />

      {/* Enhanced floating particles with trails */}
      <motion.div className="absolute inset-0">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-500/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 8px rgba(52,211,153,0.4)'
            }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3],
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </motion.div>

      <Container maxWidth="lg" className="relative z-10">
        <AnimatePresence>
          <motion.div
            className="flex flex-col items-center px-2 sm:px-4 gap-8 sm:gap-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute -inset-4 sm:-inset-8 bg-emerald-500/20 blur-xl sm:blur-2xl rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <Image
                src="/images/Logo.png"
                alt="Centichain Logo"
                {...getImageDimensions()}
                className="relative drop-shadow-[0_0_15px_rgba(52,211,153,0.5)] sm:drop-shadow-[0_0_25px_rgba(52,211,153,0.5)]"
                priority
              />
            </motion.div>

            <motion.div
              className="text-center space-y-4 sm:space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 sm:-inset-8 bg-emerald-900/40 blur-2xl sm:blur-3xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <Typography
                  variant="h1"
                  className="relative font-mono text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter"
                >
                  <motion.span 
                    className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-200 via-emerald-400 to-emerald-600"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(52,211,153,0.3)", 
                        "0 0 20px rgba(52,211,153,0.3)",
                        "0 0 10px rgba(52,211,153,0.3)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    REDEFINING
                    <br />
                    CRYPTOCURRENCY
                  </motion.span>
                </Typography>
              </div>

              <motion.div
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Typography 
                  variant="h6"
                  className="text-emerald-400/70 font-mono text-sm sm:text-base tracking-[0.3em] sm:tracking-[0.4em] uppercase"
                >
                  Next Generation Blockchain
                </Typography>
              </motion.div>
            </motion.div>

            <motion.div 
              className="w-full max-w-[280px] sm:max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/download" passHref className="w-full block">
                <Button variant="contained" className={buttonClass}>
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 5px rgba(52,211,153,0.5)",
                        "0 0 10px rgba(52,211,153,0.5)",
                        "0 0 5px rgba(52,211,153,0.5)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    INITIALIZE SYSTEM
                  </motion.span>
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FaArrowRight className="text-base sm:text-lg" />
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </div>
  );
}
