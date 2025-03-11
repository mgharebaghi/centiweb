import React from "react";
import {
  Typography,
  Box,
  Button,
  Snackbar,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FaCopy, FaServer, FaNetworkWired, FaCoins } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

function Relay() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const relayCmd =
    "wget -N https://centichain.org/downloads/relay-service && chmod 777 relay-service && ./relay-service";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(relayCmd);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const benefits = [
    {
      icon: <FaNetworkWired size={isMobile ? 16 : 18} />,
      title: "Network Support",
      description:
        "Help maintain network stability and transaction relay efficiency",
    },
    {
      icon: <FaServer size={isMobile ? 16 : 18} />,
      title: "Easy Setup",
      description: "Single command installation for Ubuntu servers",
    },
    {
      icon: <FaCoins size={isMobile ? 16 : 18} />,
      title: "Earn Rewards",
      description: "Get compensated for supporting the network",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Two-column layout for command and benefits */}
      <Grid container spacing={isMobile ? 2 : 2.5}>
        {/* Command card - first column */}
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              background:
                "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))",
              p: isMobile ? 1.5 : 2.5,
              borderRadius: "10px",
              border: "1px solid rgba(16,185,129,0.2)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "white",
                mb: isMobile ? 1.5 : 2,
                fontSize: isMobile ? "1rem" : "1.1rem",
                fontWeight: 600,
                textAlign: isMobile ? "center" : "left",
              }}
            >
              Quick Setup with One Command
            </Typography>

            <Box
              sx={{
                mb: isMobile ? 2 : 2.5,
                p: isMobile ? 1.5 : 2.5,
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.05)",
                position: "relative",
                border: "1px solid rgba(255,255,255,0.1)",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "4px",
                  backgroundColor: "#10b981",
                  boxShadow: "0 0 8px rgba(16,185,129,0.6)",
                }}
              />

              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: "monospace",
                  color: "rgba(255,255,255,0.95)",
                  fontSize: isMobile ? "0.8rem" : "0.9rem",
                  pl: 2,
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  mb: isMobile ? 2 : 0, // Add margin bottom on mobile for the copy button
                }}
              >
                {relayCmd}
              </Typography>

              <Button
                onClick={copyToClipboard}
                startIcon={<FaCopy size={isMobile ? 12 : 14} />}
                variant="contained"
                size="small"
                sx={{
                  position: isMobile ? "relative" : "absolute",
                  top: isMobile ? "auto" : "50%",
                  right: isMobile ? "auto" : 10,
                  transform: isMobile ? "none" : "translateY(-50%)",
                  background: "linear-gradient(to right, #10b981, #059669)",
                  "&:hover": {
                    background: "linear-gradient(to right, #059669, #047857)",
                  },
                  color: "white",
                  textTransform: "none",
                  borderRadius: "6px",
                  py: 0.7,
                  px: 2,
                  fontSize: isMobile ? "0.8rem" : "0.85rem",
                  fontWeight: 500,
                  minWidth: "auto",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                Copy
              </Button>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
                mb: isMobile ? 1.5 : 2,
                fontSize: isMobile ? "0.8rem" : "0.85rem",
                px: isMobile ? 1 : 0,
              }}
            >
              This command downloads and installs the relay node software on
              your Ubuntu server.
            </Typography>

            {/* System requirements - now in first column */}
            <Box sx={{ mt: "auto" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#10b981",
                  fontSize: isMobile ? "0.85rem" : "0.9rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  mb: isMobile ? 1 : 1.5,
                  textAlign: "center",
                }}
              >
                System Requirements
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Box
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        bgcolor: "#10b981",
                        mr: 1.2,
                        boxShadow: "0 0 4px rgba(16,185,129,0.8)",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: isMobile ? "0.8rem" : "0.85rem",
                      }}
                    >
                      CPU:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.85)",
                        ml: 0.8,
                        fontSize: isMobile ? "0.8rem" : "0.85rem",
                      }}
                    >
                      Dual-core 2.0 GHz+
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        bgcolor: "#10b981",
                        mr: 1.2,
                        boxShadow: "0 0 4px rgba(16,185,129,0.8)",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: isMobile ? "0.8rem" : "0.85rem",
                      }}
                    >
                      RAM:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.85)",
                        ml: 0.8,
                        fontSize: isMobile ? "0.8rem" : "0.85rem",
                      }}
                    >
                      4GB min, 8GB rec.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Box
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        bgcolor: "#10b981",
                        mr: 1.2,
                        boxShadow: "0 0 4px rgba(16,185,129,0.8)",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: isMobile ? "0.8rem" : "0.85rem",
                      }}
                    >
                      Storage:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.85)",
                        ml: 0.8,
                        fontSize: isMobile ? "0.8rem" : "0.85rem",
                      }}
                    >
                      256GB SSD
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        bgcolor: "#10b981",
                        mr: 1.2,
                        boxShadow: "0 0 4px rgba(16,185,129,0.8)",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: isMobile ? "0.8rem" : "0.85rem",
                      }}
                    >
                      Network:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.85)",
                        ml: 0.8,
                        fontSize: isMobile ? "0.8rem" : "0.85rem",
                      }}
                    >
                      +100Mbps
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        {/* Benefits cards - second column */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
              borderRadius: "10px",
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
                p: isMobile ? 1 : 1.2,
                borderBottom: "1px solid rgba(16,185,129,0.1)",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: isMobile ? "0.85rem" : "0.9rem",
                  textAlign: "center",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Benefits
              </Typography>
            </Box>

            <Box sx={{ p: isMobile ? 1.5 : 2, flexGrow: 1 }}>
              {benefits.map((benefit, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    mb: index < benefits.length - 1 ? (isMobile ? 1.5 : 2) : 0,
                    gap: isMobile ? 1.5 : 2,
                  }}
                >
                  <Box
                    sx={{
                      color: "#10b981",
                      background:
                        "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.1))",
                      width: isMobile ? "28px" : "32px",
                      height: isMobile ? "28px" : "32px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      mt: 0.5,
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: isMobile ? "0.85rem" : "0.9rem",
                        mb: 0.5,
                      }}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.75)",
                        fontSize: isMobile ? "0.8rem" : "0.85rem",
                        lineHeight: 1.4,
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
        </Grid>
      </Grid>

      <Snackbar
        anchorOrigin={{ 
          vertical: isMobile ? "top" : "bottom", 
          horizontal: "center" 
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Command copied to clipboard!"
        ContentProps={{
          sx: {
            backgroundColor: "rgba(16,185,129,0.9)",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid rgba(16,185,129,0.4)",
            py: isMobile ? 1 : 1.2,
            px: isMobile ? 2 : 2.5,
            fontSize: isMobile ? "0.85rem" : "0.9rem",
          },
        }}
      />
    </motion.div>
  );
}

export default Relay;
