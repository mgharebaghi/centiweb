"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, Typography, Button, Box, useMediaQuery, Grid, Divider, Chip, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TypeAnimation from "./TypeAnimation";
import Link from "next/link";
import Image from "next/image";

const Banner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0a1f00 0%, #0a1f00 100%)",
        minHeight: "100vh",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid rgba(16, 185, 129, 0.1)",
        fontFamily: "'Inter', sans-serif",
        pt: { xs: 10, sm: 12, md: 6 },
        pb: { xs: 4, sm: 5, md: 6 },
      }}
    >
      {/* Blockchain grid network with minimal light pulses */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Grid overlay for the checkerboard effect */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: {
              xs: "10% 10%",
              sm: "6.67% 6.67%",
              md: "5% 5%",
            },
          }}
        />

        {/* Grid structure without glowing points */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(10, 1fr)",
              sm: "repeat(15, 1fr)",
              md: "repeat(20, 1fr)",
            },
            gridTemplateRows: {
              xs: "repeat(10, 1fr)",
              sm: "repeat(15, 1fr)",
              md: "repeat(20, 1fr)",
            },
          }}
        >
          {/* Generate grid lines */}
          {Array.from({ length: isMobile ? 100 : isTablet ? 225 : 400 }).map((_, index) => {
            const row = Math.floor(index / (isMobile ? 10 : isTablet ? 15 : 20));
            const col = index % (isMobile ? 10 : isTablet ? 15 : 20);

            return (
              <Box
                key={`grid-cell-${index}`}
                sx={{
                  position: "relative",
                  gridRow: row + 1,
                  gridColumn: col + 1,
                }}
              >
                {/* Horizontal connection */}
                {col < (isMobile ? 9 : isTablet ? 14 : 19) && (
                  <Box
                    sx={{
                      position: "absolute",
                      height: "1px",
                      right: 0,
                      width: "100%",
                      background: "rgba(16, 185, 129, 0.1)",
                    }}
                  />
                )}

                {/* Vertical connection */}
                {row < (isMobile ? 9 : isTablet ? 14 : 19) && (
                  <Box
                    sx={{
                      position: "absolute",
                      width: "1px",
                      bottom: 0,
                      height: "100%",
                      background: "rgba(16, 185, 129, 0.1)",
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Box>

        {/* Mixed pulses: full lines and center-crossing pulses */}
        {Array.from({ length: 20 + Math.floor(Math.random() * 10) }).map((_, index) => {
          // Grid dimensions
          const gridCols = isMobile ? 10 : isTablet ? 15 : 20;
          const gridRows = isMobile ? 10 : isTablet ? 15 : 20;

          // Grid center point
          const centerX = gridCols / 2;
          const centerY = gridRows / 2;

          // Determine pulse type:
          // 0-1: full horizontal/vertical lines
          // 2: center cross horizontal
          // 3: center cross vertical
          const pulseType = index % 4;

          if (pulseType < 2) {
            // Full line pulse (horizontal or vertical)
            const isHorizontal = pulseType === 0;

            // We want some lines to go through center area
            let linePosition;
            if (index % 6 < 3) {
              // 50% chance for center-passing lines
              // Lines that pass through or near center
              const offset = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2
              linePosition = Math.floor(isHorizontal ? centerY : centerX) + offset;
            } else {
              // Random position
              linePosition = Math.floor(Math.random() * (isHorizontal ? gridRows : gridCols));
            }

            // Direction (left-right, right-left, top-bottom, bottom-top)
            const isReversed = Math.random() > 0.5;

            return (
              <motion.div
                key={`pulse-fullline-${index}`}
                style={{
                  position: "absolute",
                  left: isHorizontal ? 0 : `${(linePosition / gridCols) * 100}%`,
                  top: isHorizontal ? `${(linePosition / gridRows) * 100}%` : 0,
                  width: isHorizontal ? "100%" : "1px",
                  height: isHorizontal ? "1px" : "100%",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{
                    x: isHorizontal ? (isReversed ? "100%" : "0%") : 0,
                    y: !isHorizontal ? (isReversed ? "100%" : "0%") : 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: isHorizontal ? (isReversed ? "0%" : "100%") : 0,
                    y: !isHorizontal ? (isReversed ? "0%" : "100%") : 0,
                    opacity: [0, 0.3, 0.8, 0.3, 0],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 3,
                    ease: "linear",
                    repeat: Infinity,
                    delay: index * 0.5,
                    times: [0, 0.2, 0.5, 0.8, 1],
                  }}
                  style={{
                    position: "absolute",
                    width: isHorizontal ? "10%" : "1px",
                    height: !isHorizontal ? "10%" : "1px",
                    background: isHorizontal
                      ? `linear-gradient(${
                          isReversed ? -90 : 90
                        }deg, rgba(16, 185, 129, 0) 0%, rgba(16, 185, 129, 0.9) 50%, rgba(16, 185, 129, 0) 100%)`
                      : `linear-gradient(${
                          isReversed ? 180 : 0
                        }deg, rgba(16, 185, 129, 0) 0%, rgba(16, 185, 129, 0.9) 50%, rgba(16, 185, 129, 0) 100%)`,
                    boxShadow: "0 0 6px rgba(16, 185, 129, 0.6)",
                  }}
                />
              </motion.div>
            );
          } else {
            // Center cross pulse - start or end in center
            const isHorizontal = pulseType === 2;
            const startAtCenter = Math.random() > 0.5;

            // Calculate start and end points
            const startX = isHorizontal ? (startAtCenter ? centerX : Math.random() > 0.5 ? 0 : gridCols) : centerX;
            const startY = isHorizontal ? centerY : startAtCenter ? centerY : Math.random() > 0.5 ? 0 : gridRows;
            const endX = isHorizontal ? (startAtCenter ? (Math.random() > 0.5 ? 0 : gridCols) : centerX) : centerX;
            const endY = isHorizontal ? centerY : startAtCenter ? (Math.random() > 0.5 ? 0 : gridRows) : centerY;

            // Convert to percentages
            const startXPercent = (startX / gridCols) * 100;
            const startYPercent = (startY / gridRows) * 100;
            const endXPercent = (endX / gridCols) * 100;
            const endYPercent = (endY / gridRows) * 100;

            // Calculate length and angle
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const length = Math.sqrt(
              Math.pow(endXPercent - startXPercent, 2) + Math.pow(endYPercent - startYPercent, 2)
            );
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

            return (
              <motion.div
                key={`pulse-center-${index}`}
                style={{
                  position: "absolute",
                  left: `${startXPercent}%`,
                  top: `${startYPercent}%`,
                  width: `${length}%`,
                  height: "1px",
                  transformOrigin: "0 0",
                  transform: `rotate(${angle}deg)`,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ x: "0%", opacity: 0 }}
                  animate={{ x: "100%", opacity: [0, 0.3, 0.8, 0.3, 0] }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    ease: "linear",
                    repeat: Infinity,
                    delay: index * 0.5,
                    times: [0, 0.2, 0.5, 0.8, 1],
                  }}
                  style={{
                    position: "absolute",
                    width: "15%",
                    height: "1px",
                    background:
                      "linear-gradient(90deg, rgba(16, 185, 129, 0) 0%, rgba(16, 185, 129, 0.9) 50%, rgba(16, 185, 129, 0) 100%)",
                    boxShadow: "0 0 6px rgba(16, 185, 129, 0.6)",
                  }}
                />
              </motion.div>
            );
          }
        })}
      </Box>

      {/* Updated gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 50% 50%, 
            rgba(10, 31, 0, 0.4) 0%, 
            rgba(10, 31, 0, 0.6) 50%, 
            rgba(10, 31, 0, 0.8) 100%)`,
          mixBlendMode: "multiply",
          zIndex: 1,
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3, md: 4 },
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={{ xs: 4, sm: 6, md: 8 }}
          alignItems="center"
          justifyContent="center"
          sx={{
            minHeight: {
              xs: "calc(100vh - 100px)",
              sm: "calc(100vh - 100px)",
              md: "calc(100vh - 80px)",
            },
            width: "100%",
            mt: { xs: 8, sm: 0, md: 0 },
          }}
        >
          <Grid
            item
            xs={12}
            sm={10}
            md={6}
            lg={6}
            sx={{
              order: { xs: 2, sm: 2, md: 1 },
              textAlign: { xs: "center", sm: "center", md: "left" },
            }}
          >
            <Box>
              {/* Floating badge */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <Chip
                  label="Revolutionary Blockchain Technology"
                  sx={{
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "#10b981",
                    borderRadius: "50px",
                    fontWeight: 600,
                    mb: 3,
                    px: { xs: 1, md: 2 },
                    py: { xs: 0.5, md: 0.75 },
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    backdropFilter: "blur(10px)",
                    fontSize: { xs: "0.75rem", md: "0.875rem" },
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: {
                      xs: "2rem",
                      sm: "2.75rem",
                      md: "3.5rem",
                      lg: "4rem",
                    },
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.95)",
                    mb: { xs: 1, md: 1.5 },
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  Centichain
                </Typography>
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    fontSize: {
                      xs: "1.1rem",
                      sm: "1.25rem",
                      md: "1.5rem",
                      lg: "1.75rem",
                    },
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.85)",
                    letterSpacing: "0.01em",
                    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                    mb: { xs: 3, md: 4 },
                    mt: { xs: 1, md: 1.5 },
                  }}
                >
                  <TypeAnimation
                    text={[
                      "Redefining Cryptocurrency",
                      "Building the Future of Finance",
                      "Decentralized. Secure. Scalable.",
                      "Join the Financial Revolution",
                      "Empowering Global Transactions",
                    ]}
                    speed={50}
                    delay={0}
                    loop={true}
                    repeat={true}
                    repeatDelay={5000}
                    switchDelay={5000}
                  />
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "1rem",
                      sm: "1.1rem",
                      md: "1.2rem",
                      lg: "1.25rem",
                    },
                    color: "rgba(255,255,255,0.8)",
                    maxWidth: { xs: "100%", md: "540px" },
                    mb: { xs: 4, md: 5 },
                    lineHeight: 1.6,
                    mx: { xs: "auto", md: 0 },
                    pr: { md: 6, lg: 8 },
                  }}
                >
                  A next generation blockchain designed exclusively as a store of value. Redefining cryptocurrency with
                  unmatched security and reliability.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{
                    flexWrap: "wrap",
                    justifyContent: { xs: "center", md: "flex-start" },
                    mb: { xs: 5, md: 0 },
                  }}
                >
                  <Button
                    href="/download"
                    variant="contained"
                    LinkComponent={Link}
                    sx={{
                      background: "rgba(29, 71, 0, 0.1)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(29, 71, 0, 0.2)",
                      color: "#fff",
                      px: { xs: 4, md: 5 },
                      py: 1.5,
                      borderRadius: "4px",
                      fontSize: "0.9rem",
                      fontWeight: 400,
                      letterSpacing: "0.02em",
                      textTransform: "none",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        background: "rgba(29, 71, 0, 0.2)",
                        transform: "translateY(-1px)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                      "& .arrow": {
                        transition: "transform 0.2s ease",
                        opacity: 0.7,
                        fontSize: "1.1rem",
                      },
                      "&:hover .arrow": {
                        transform: "translateX(4px)",
                        opacity: 1,
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      Start as a Node
                      <span className="arrow">→</span>
                    </Box>
                  </Button>
                  <Button
                    href="https://centichain.org/articles/671fcec5d136b9550a238077"
                    variant="text"
                    sx={{
                      color: "rgba(255, 255, 255, 0.6)",
                      px: { xs: 4, md: 5 },
                      py: 1.5,
                      borderRadius: "4px",
                      fontSize: "0.9rem",
                      fontWeight: 400,
                      letterSpacing: "0.02em",
                      textTransform: "none",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.03)",
                        color: "rgba(255, 255, 255, 0.8)",
                      },
                      "& .arrow": {
                        transition: "all 0.2s ease",
                        opacity: 0.5,
                        fontSize: "1.1rem",
                      },
                      "&:hover .arrow": {
                        transform: "translateX(4px)",
                        opacity: 0.8,
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      Learn More
                      <span className="arrow">→</span>
                    </Box>
                  </Button>
                </Stack>
              </motion.div>

              <Box
                sx={{
                  my: { xs: 4, md: 6 },
                  display: { xs: "block", md: "block" },
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    {[
                      { value: "100%", label: "Asset Security" },
                      { value: "21M", label: "Maximum Supply" },
                      { value: "100%", label: "Decentralized" },
                    ].map((stat, i) => (
                      <Grid item xs={4} key={i}>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: {
                                xs: "1.1rem",
                                sm: "1.25rem",
                                md: "1.4rem",
                              },
                              fontWeight: 500,
                              color: "rgba(255, 255, 255, 0.9)",
                              fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {stat.value}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: {
                                xs: "0.8rem",
                                sm: "0.85rem",
                                md: "0.9rem",
                              },
                              color: "rgba(255, 255, 255, 0.5)",
                              fontWeight: 400,
                              letterSpacing: "0.02em",
                            }}
                          >
                            {stat.label}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={6}
            sx={{
              order: { xs: 1, sm: 1, md: 2 },
              mb: { xs: 2, sm: 3, md: 0 },
              mt: { xs: 6, sm: 0, md: 0 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform: { xs: "scale(0.9)", sm: "scale(1)" },
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "480px",
                  height: isMobile ? "240px" : isTablet ? "320px" : isLargeScreen ? "480px" : "400px",
                }}
              >
                {/* Decorative elements */}
                <Box
                  component={motion.div}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  sx={{
                    position: "absolute",
                    inset: { xs: "-5%", md: "-10%" },
                    border: "1px dashed rgba(16, 185, 129, 0.3)",
                    borderRadius: "50%",
                    zIndex: 0,
                  }}
                />

                <Box
                  component={motion.div}
                  animate={{
                    rotate: [360, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  sx={{
                    position: "absolute",
                    inset: { xs: "-2%", md: "-5%" },
                    border: "1px dashed rgba(16, 185, 129, 0.2)",
                    borderRadius: "50%",
                    zIndex: 0,
                  }}
                />

                {/* Glow effect */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: { xs: "10%", md: "15%" },
                    background: "radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(40px)",
                  }}
                />

                {/* Logo container */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "85%", sm: "80%", md: "75%", lg: "70%" },
                      height: { xs: "85%", sm: "80%", md: "75%", lg: "70%" },
                      position: "relative",
                    }}
                  >
                    <Image
                      src="/images/Logo.png"
                      alt="Centichain Logo"
                      layout="fill"
                      objectFit="contain"
                      priority
                      style={{
                        filter: "drop-shadow(0 0 25px rgba(16, 185, 129, 0.4))",
                      }}
                    />
                  </Box>
                </motion.div>

                {/* Floating particles - only show on non-mobile for performance */}
                {!isMobile &&
                  Array.from({ length: 6 }).map((_, i) => (
                    <Box
                      key={i}
                      component={motion.div}
                      animate={{
                        y: [Math.random() * 20, -Math.random() * 20, Math.random() * 20],
                        x: [Math.random() * 20, -Math.random() * 20, Math.random() * 20],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      sx={{
                        position: "absolute",
                        width: 4 + Math.random() * 6,
                        height: 4 + Math.random() * 6,
                        borderRadius: "50%",
                        backgroundColor: "#10b981",
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                        filter: "blur(1px)",
                      }}
                    />
                  ))}
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
