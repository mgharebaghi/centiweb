"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Container,
  Typography,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TypeAnimation from "./TypeAnimation";
import Link from "next/link";

const Banner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isClient, setIsClient] = useState(false);

  // Use useEffect to ensure component only renders once on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return null on first render to prevent hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0a1f1c 0%, #0f2818 100%)",
        pt: { xs: 12, md: 20 },
        pb: { xs: 10, md: 16 },
        borderBottom: "1px solid rgba(16, 185, 129, 0.2)",
        fontFamily: "'Poppins', 'Inter', sans-serif",
      }}
    >
      {/* Animated particles background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: 0.07,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2310b981' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='30' cy='10' r='2'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='40' cy='20' r='2'/%3E%3Ccircle cx='10' cy='30' r='2'/%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='50' cy='30' r='2'/%3E%3Ccircle cx='20' cy='40' r='2'/%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='30' cy='50' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Glowing accent */}
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "20%",
          width: "50%",
          height: "50%",
          borderRadius: "50%",
          filter: "blur(150px)",
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0) 70%)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 8,
          }}
        >
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" },
              position: "relative",
              zIndex: 1,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4.5rem" },
                  fontWeight: 800,
                  color: "#ffffff",
                  mb: 3,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <Box
                  sx={{
                    display: "block",
                    height: { xs: "2.5rem", md: "3.5rem", lg: "4.5rem" },
                    mb: 1,
                  }}
                >
                  Centichain
                </Box>
                <Box
                  component="span"
                  sx={{
                    fontSize: { xs: "1.75rem", md: "2.5rem", lg: "3rem" },
                    display: "block",
                    background:
                      "linear-gradient(90deg, #10b981 0%, #059669 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 700,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  <TypeAnimation 
                    text={[
                      "Redefining Cryptocurrency",
                      "Securing Digital Wealth",
                      "The Future of Value Storage",
                      "Unmatched Asset Security"
                    ]}
                    speed={70}
                    delay={0}
                    loop={true}
                    repeat={true}
                    repeatDelay={5000}
                    switchDelay={5000}
                  />
                </Box>
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  color: "rgba(255,255,255,0.8)",
                  maxWidth: "500px",
                  mb: 5,
                  mx: { xs: "auto", md: 0 },
                  fontWeight: 400,
                  lineHeight: 1.7,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                A next generation blockchain designed exclusively as a store of
                value. Redefining cryptocurrency with unmatched security,
                immutability, and reliability for preserving digital wealth.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 3,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/download"
                  sx={{
                    background:
                      "linear-gradient(90deg, #10b981 0%, #059669 100%)",
                    px: 4,
                    py: 1.5,
                    borderRadius: "8px",
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "0 4px 14px rgba(16, 185, 129, 0.4)",
                    fontFamily: "'Inter', sans-serif",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(16, 185, 129, 0.6)",
                    },
                  }}
                >
                  Start as a Node
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component="a"
                  href="https://centichain.org/articles/671fcec5d136b9550a238077"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderColor: "rgba(16, 185, 129, 0.6)",
                    color: "#10b981",
                    px: 4,
                    py: 1.5,
                    borderRadius: "8px",
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontFamily: "'Inter', sans-serif",
                    "&:hover": {
                      borderColor: "#10b981",
                      background: "rgba(16, 185, 129, 0.05)",
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 5,
                  mt: 6,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                {[
                  {
                    value: "100%",
                    label: "Asset Security",
                  },
                  {
                    value: "21M",
                    label: "Maximum Supply",
                  },
                  {
                    value: "Fully",
                    label: "Decentralized",
                  },
                ].map((stat, i) => (
                  <Box key={i} sx={{ textAlign: "center" }}>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "#10b981",
                        display: "block",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "0.875rem",
                        color: "rgba(255,255,255,0.6)",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Box>

          {!isMobile && isClient && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{ flex: 1 }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: "500px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Vault/treasure visualization */}
                <svg
                  width="400"
                  height="400"
                  viewBox="0 0 400 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: "absolute",
                    opacity: 0.15,
                  }}
                >
                  <path
                    d="M200 50L300 100L200 150L100 100L200 50Z"
                    fill="url(#vault_gradient)"
                    stroke="url(#vault_gradient)"
                    strokeWidth="2"
                  />
                  <path
                    d="M100 100V250L200 300V150"
                    stroke="url(#vault_gradient)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M300 100V250L200 300"
                    stroke="url(#vault_gradient)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M150 75L250 125M150 125L250 175"
                    stroke="url(#vault_gradient)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <defs>
                    <linearGradient
                      id="vault_gradient"
                      x1="100"
                      y1="50"
                      x2="300"
                      y2="300"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#10b981" />
                      <stop offset="1" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Animated value tokens */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      y: i % 2 === 0 ? [-5, 5, -5] : [5, -5, 5],
                      x: i % 3 === 0 ? [-5, 5, -5] : [5, -5, 5],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                    style={{
                      position: "absolute",
                      top: `${150 + Math.sin(i * 0.8) * 80}px`,
                      left: `${150 + Math.cos(i * 0.8) * 80}px`,
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: `rgba(16, 185, 129, ${0.4 + i * 0.08})`,
                      boxShadow: `0 0 ${8 + i * 2}px ${
                        4 + i
                      }px rgba(16, 185, 129, 0.3)`,
                    }}
                  />
                ))}

                {/* Central value storage element */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: [0.9, 1.05, 0.9],
                    opacity: 1,
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  style={{
                    position: "absolute",
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)",
                    border: "1px solid rgba(16, 185, 129, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 30px 10px rgba(16, 185, 129, 0.15)",
                  }}
                >
                  {/* Coin/value symbol */}
                  <motion.div
                    animate={{
                      rotateY: 360,
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      boxShadow: "0 0 20px 5px rgba(16, 185, 129, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    <span>¢</span>
                  </motion.div>
                </motion.div>

                {/* Security rings */}
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    position: "absolute",
                    width: "240px",
                    height: "240px",
                    borderRadius: "50%",
                    border: "1px dashed rgba(16, 185, 129, 0.3)",
                  }}
                />
                <motion.div
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    position: "absolute",
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%",
                    border: "1px dashed rgba(16, 185, 129, 0.4)",
                  }}
                />
              </Box>
            </motion.div>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
