import React from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SiApple, SiLinux } from "react-icons/si";
import { FaWindows } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  FaDownload,
  FaInfoCircle,
  FaShieldAlt,
  FaCoins,
  FaUsers,
  FaDesktop,
  FaMemory,
  FaHdd,
  FaNetworkWired,
} from "react-icons/fa";

function Validators() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Animation variants - simplified for faster display
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Download options
  const downloadOptions = [
    {
      icon: FaWindows,
      text: "Windows",
      link: "https://centichain.org/downloads/updates/windows/x64/v0.25.0/Centichain_0.25.0_x64_en-US.msi",
      available: true,
      requirements: "Windows 10 or later, 64-bit processor required",
      size: "15 MB",
    },
    {
      icon: SiApple,
      text: "macOS",
      link: "#",
      available: false,
      requirements: "macOS 11 (Big Sur) or later versions",
      size: "Coming soon",
    },
    {
      icon: SiLinux,
      text: "Linux",
      link: "#",
      available: false,
      requirements: "Ubuntu 20.04 LTS or newer distributions",
      size: "Coming soon",
    },
  ];

  const benefits = [
    {
      icon: <FaShieldAlt size={16} />,
      title: "Network Security",
      description:
        "Help secure the blockchain by validating transactions and maintaining consensus",
    },
    {
      icon: <FaCoins size={16} />,
      title: "Earn Rewards",
      description:
        "Receive tokens for your contribution to the network's operation and security",
    },
    {
      icon: <FaUsers size={16} />,
      title: "Community Participation",
      description:
        "Become an active member of the Centichain ecosystem and help shape its future",
    },
  ];

  // System requirements items
  const systemRequirements = [
    {
      icon: <FaDesktop size={isMobile ? 14 : 18} />,
      title: "CPU",
      value: "Quad-core 3GHz+",
      description:
        "High-performance processor needed for blockchain validation",
    },
    {
      icon: <FaMemory size={isMobile ? 14 : 18} />,
      title: "RAM",
      value: "8GB min",
      description:
        "Sufficient memory for transaction processing and chain state",
    },
    {
      icon: <FaHdd size={isMobile ? 14 : 18} />,
      title: "Storage",
      value: "256GB SSD",
      description: "Fast storage for blockchain data and transaction history",
    },
    {
      icon: <FaNetworkWired size={isMobile ? 14 : 18} />,
      title: "Network",
      value: "100+ Mbps",
      description: "High-speed connection for real-time network communication",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full w-full flex flex-col"
    >
      <Box
        sx={{
          width: "100%",
          px: isMobile ? 1 : 2,
          maxWidth: "100%",
          overflowX: "hidden",
        }}
      >
        {/* Responsive grid layout */}
        <Grid
          container
          spacing={isMobile ? 1 : isTablet ? 1.5 : 2}
          sx={{ width: "100%" }}
        >
          {/* Description section - full width on mobile */}
          <Grid item xs={12} md={4}>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  mb: isMobile ? 1 : 1.5,
                  fontWeight: 600,
                  fontSize: isMobile ? "1.1rem" : "1.2rem",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Run a Validator Node
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  mb: isMobile ? 1.5 : 2,
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Validators secure the Centichain network by verifying
                transactions and earning rewards.
              </Typography>

              {/* Benefits Section - Mobile/Tablet version */}
              {(isMobile || isTablet) && (
                <Grid container spacing={1.5} sx={{ mb: 2 }}>
                  <Grid item xs={12}>
                    {/* Benefits Section - Mobile version */}
                    <Box
                      sx={{
                        background:
                          "linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.08)",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          background:
                            "linear-gradient(90deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))",
                          py: 0.6,
                          borderBottom: "1px solid rgba(16,185,129,0.1)",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            textAlign: "center",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          Benefits
                        </Typography>
                      </Box>

                      <Box sx={{ p: 1, flexGrow: 1 }}>
                        {benefits.map((benefit, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: index < benefits.length - 1 ? 0.8 : 0,
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                color: "#10b981",
                                background:
                                  "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.1))",
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              {React.cloneElement(benefit.icon, { size: 10 })}
                            </Box>

                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: "white",
                                fontWeight: 600,
                                fontSize: "0.7rem",
                                lineHeight: 1.2,
                              }}
                            >
                              {benefit.title}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              )}

              {/* Benefits Section - Desktop view */}
              {!isMobile && !isTablet && (
                <Box
                  sx={{
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    minHeight: "340px", // Increased from 300px to make it bigger
                  }}
                >
                  <Box
                    sx={{
                      background:
                        "linear-gradient(90deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))",
                      py: 0.8,
                      borderBottom: "1px solid rgba(16,185,129,0.1)",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        textAlign: "center",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Benefits
                    </Typography>
                  </Box>

                  <Box sx={{ p: 1.5, flexGrow: 1 }}>
                    {benefits.map((benefit, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          mb: index < benefits.length - 1 ? 2 : 0, // Increased spacing between items
                          gap: 1.5,
                          py: 0.5, // Added vertical padding to each benefit item
                        }}
                      >
                        <Box
                          sx={{
                            color: "#10b981",
                            background:
                              "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.1))",
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            mt: 0.25,
                          }}
                        >
                          {React.cloneElement(benefit.icon, { size: 14 })}
                        </Box>

                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              color: "white",
                              fontWeight: 600,
                              fontSize: "0.85rem",
                              lineHeight: 1.3,
                              mb: 0.5, // Increased spacing between title and description
                            }}
                          >
                            {benefit.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(255,255,255,0.8)",
                              fontSize: "0.8rem",
                              lineHeight: 1.4, // Increased line height for better readability
                              display: "block",
                            }}
                          >
                            {benefit.description}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Right side - download options */}
          <Grid item xs={12} md={8}>
            <Typography
              variant="h6"
              sx={{
                color: "#10b981",
                mb: isMobile ? 1 : 1.5,
                fontWeight: 600,
                fontSize: isMobile ? "0.9rem" : "1rem",
                textAlign: { xs: "center", md: "left" },
                textShadow: "0 0 8px rgba(16,185,129,0.2)",
              }}
            >
              Download Validator Software
            </Typography>

            {/* Download Grid */}
            <Grid
              container
              spacing={isMobile ? 1 : 1.5}
              sx={{ width: "100%", mb: 3 }}
            >
              {downloadOptions.map((option, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Box
                    sx={{
                      py: isMobile ? 1.5 : 2,
                      px: isMobile ? 1.5 : 2,
                      borderRadius: "8px",
                      height: "100%",
                      minHeight: isMobile ? "140px" : "160px",
                      display: "flex",
                      alignItems: "center",
                      background: option.available
                        ? "linear-gradient(145deg, rgba(16,185,129,0.12), rgba(16,185,129,0.03))"
                        : "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                      border: option.available
                        ? "1px solid rgba(16,185,129,0.2)"
                        : "1px solid rgba(255,255,255,0.06)",
                      transition: "all 0.3s ease",
                      opacity: option.available ? 1 : 0.7,
                      "&:hover": option.available
                        ? {
                            boxShadow: "0 4px 12px rgba(16,185,129,0.15)",
                            transform: "translateY(-2px)",
                          }
                        : {},
                    }}
                  >
                    <Box
                      sx={{
                        color: option.available
                          ? "#10b981"
                          : "rgba(255,255,255,0.5)",
                        fontSize: isMobile ? "1.3rem" : "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: isMobile ? "32px" : "36px",
                        flexShrink: 0,
                      }}
                    >
                      <option.icon />
                    </Box>

                    <Box sx={{ ml: 1.5, flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "white",
                            fontWeight: 600,
                            fontSize: isMobile ? "0.85rem" : "0.9rem",
                          }}
                        >
                          {option.text}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{
                            color: option.available
                              ? "rgba(16,185,129,0.9)"
                              : "rgba(255,255,255,0.4)",
                            fontSize: "0.7rem",
                            fontWeight: 500,
                          }}
                        >
                          {option.size}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.7rem",
                          mb: 1.2,
                          lineHeight: 1.3,
                          height: isMobile ? "auto" : "2.6em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: isMobile ? "block" : "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {isMobile
                          ? option.requirements
                              .split(" ")
                              .slice(0, 6)
                              .join(" ") + "..."
                          : option.requirements}
                      </Typography>

                      {option.available ? (
                        <Button
                          variant="contained"
                          component="a"
                          href={option.link}
                          size="small"
                          fullWidth
                          sx={{
                            background:
                              "linear-gradient(to right, #10b981, #059669)",
                            color: "white",
                            textTransform: "none",
                            padding: isMobile ? "6px 14px" : "4px 12px",
                            borderRadius: "4px",
                            fontWeight: 500,
                            fontSize: isMobile ? "0.8rem" : "0.75rem",
                            boxShadow: "0 2px 6px rgba(16,185,129,0.3)",
                            "&:hover": {
                              background:
                                "linear-gradient(to right, #059669, #047857)",
                              boxShadow: "0 4px 8px rgba(16,185,129,0.4)",
                            },
                          }}
                        >
                          Download
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          disabled
                          size="small"
                          fullWidth
                          sx={{
                            borderColor: "rgba(255,255,255,0.2)",
                            color: "rgba(255,255,255,0.5)",
                            textTransform: "none",
                            padding: isMobile ? "6px 14px" : "4px 12px",
                            borderRadius: "4px",
                            fontSize: isMobile ? "0.8rem" : "0.75rem",
                            "&.Mui-disabled": {
                              borderColor: "rgba(255,255,255,0.1)",
                              color: "rgba(255,255,255,0.3)",
                            },
                          }}
                        >
                          Coming Soon
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* System Requirements Section - Right below Download Boxes */}
            <Box
              sx={{
                mb: 2,
                mt: 0,
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  py: 1,
                  px: 2,
                  background:
                    "linear-gradient(90deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))",
                  borderBottom: "1px solid rgba(16,185,129,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  System Requirements
                </Typography>
              </Box>

              {/* Requirements cards in a grid */}
              <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  {systemRequirements.map((req, index) => (
                    <Grid item xs={6} sm={3} key={index}>
                      <Box
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                          p: 1.5,
                          borderRadius: "8px",
                          background:
                            "linear-gradient(145deg, rgba(255,255,255,0.03), transparent)",
                          border: "1px solid rgba(255,255,255,0.04)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background:
                              "linear-gradient(145deg, rgba(16,185,129,0.06), rgba(16,185,129,0.02))",
                            transform: "translateY(-2px)",
                            borderColor: "rgba(16,185,129,0.1)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            mb: 1,
                            width: isMobile ? "40px" : "50px",
                            height: isMobile ? "40px" : "50px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                              "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.1))",
                            color: "#10b981",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                          }}
                        >
                          {req.icon}
                        </Box>

                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "white",
                            fontWeight: 600,
                            fontSize: isMobile ? "0.8rem" : "0.9rem",
                            mb: 0.5,
                          }}
                        >
                          {req.title}
                        </Typography>

                        <Typography
                          variant="h6"
                          sx={{
                            color: "#10b981",
                            fontWeight: 700,
                            fontSize: isMobile ? "1rem" : "1.1rem",
                            mb: 0.5,
                          }}
                        >
                          {req.value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                {/* Note */}
                <Box
                  sx={{
                    mt: 2,
                    p: 1.5,
                    borderRadius: "6px",
                    background:
                      "linear-gradient(145deg, rgba(16,185,129,0.08), rgba(16,185,129,0.02))",
                    border: "1px solid rgba(16,185,129,0.08)",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "0.8rem",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      component="span"
                      sx={{ color: "#10b981", fontWeight: 600 }}
                    >
                      Note:
                    </Box>{" "}
                    These are minimum requirements. For optimal performance, we
                    recommend higher specs for storage and RAM.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}

export default Validators;
