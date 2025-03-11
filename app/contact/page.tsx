"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
  Divider,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material";
import {
  FiSend,
  FiMapPin,
  FiMail,
  FiGlobe,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiCopy,
  FiPhone,
  FiMessageCircle,
  FiCode,
  FiAlertCircle,
} from "react-icons/fi";
import { FaDiscord, FaTelegram } from "react-icons/fa";
import Image from "next/image";

export default function ContactForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [mounted, setMounted] = useState(false);
  const { ref: formRef, inView: formInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: mapRef, inView: mapInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "suggestion", // default type
  });

  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Copy to clipboard functionality
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // ادغام نوع پیام در موضوع
      const apiData = {
        name: formData.name,
        email: formData.email,
        subject: `[${formData.type.toUpperCase()}] ${formData.subject}`,
        message: formData.message,
      };

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          type: "suggestion",
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleTypeChange = (type: string) => {
    setFormData({ ...formData, type });
  };

  if (!mounted) return null;

  return (
    <Box
      className="min-h-screen bg-[#0a1f00] pt-24 pb-16 px-4"
      sx={{
        background: "linear-gradient(to bottom, #030800, #0a1f00)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Header */}
          <Grid item xs={12} className="text-center mb-2">
            <Typography
              variant="h1"
              className="text-3xl md:text-4xl font-bold mb-3 text-white"
            >
              Connect With Centichain
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-400 max-w-2xl mx-auto"
            >
              As a decentralized blockchain network, we welcome your feedback,
              suggestions, and bug reports to help improve the ecosystem.
            </Typography>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={7} lg={8}>
            <Paper
              elevation={0}
              className="p-6 md:p-8 rounded-xl"
              sx={{
                backgroundColor: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(16, 185, 129, 0.15)",
              }}
            >
              <Typography
                variant="h6"
                className="text-white mb-4 font-semibold"
              >
                Send Feedback
              </Typography>

              {/* Message Type Selection */}
              <Box className="mb-6 flex flex-wrap gap-2">
                {[
                  {
                    type: "suggestion",
                    label: "Suggestion",
                    icon: <FiMessageCircle />,
                  },
                  {
                    type: "information",
                    label: "Information Request",
                    icon: <FiCode />,
                  },
                  { type: "bug", label: "Bug Report", icon: <FiAlertCircle /> },
                ].map((item) => (
                  <Chip
                    key={item.type}
                    label={item.label}
                    icon={item.icon}
                    onClick={() => handleTypeChange(item.type)}
                    sx={{
                      backgroundColor:
                        formData.type === item.type
                          ? "rgba(16, 185, 129, 0.2)"
                          : "rgba(15, 23, 42, 0.8)",
                      color: formData.type === item.type ? "#10b981" : "white",
                      border: "1px solid",
                      borderColor:
                        formData.type === item.type
                          ? "rgba(16, 185, 129, 0.5)"
                          : "rgba(255, 255, 255, 0.2)",
                      "&:hover": {
                        backgroundColor:
                          formData.type === item.type
                            ? "rgba(16, 185, 129, 0.3)"
                            : "rgba(15, 23, 42, 0.9)",
                      },
                      transition: "all 0.2s ease",
                      padding: "6px 12px",
                      height: "36px",
                      "& .MuiChip-icon": {
                        color:
                          formData.type === item.type
                            ? "#10b981"
                            : "rgba(255, 255, 255, 0.7)",
                      },
                    }}
                  />
                ))}
              </Box>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgba(16, 185, 129, 0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(16, 185, 129, 0.4)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#10b981",
                          },
                          background: "rgba(15, 23, 42, 0.4)",
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.7)",
                        },
                        "& .MuiInputBase-input": {
                          color: "#ffffff",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgba(16, 185, 129, 0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(16, 185, 129, 0.4)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#10b981",
                          },
                          background: "rgba(15, 23, 42, 0.4)",
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.7)",
                        },
                        "& .MuiInputBase-input": {
                          color: "#ffffff",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgba(16, 185, 129, 0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(16, 185, 129, 0.4)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#10b981",
                          },
                          background: "rgba(15, 23, 42, 0.4)",
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.7)",
                        },
                        "& .MuiInputBase-input": {
                          color: "#ffffff",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      multiline
                      rows={6}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgba(16, 185, 129, 0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(16, 185, 129, 0.4)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#10b981",
                          },
                          background: "rgba(15, 23, 42, 0.4)",
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.7)",
                        },
                        "& .MuiInputBase-input": {
                          color: "#ffffff",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={status === "sending"}
                      sx={{
                        background: "rgba(16, 185, 129, 0.15)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(16, 185, 129, 0.3)",
                        color: "#fff",
                        py: 1.5,
                        px: 4,
                        borderRadius: "8px",
                        fontSize: "0.95rem",
                        textTransform: "none",
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                        "&:hover": {
                          background: "rgba(16, 185, 129, 0.25)",
                          transform: "translateY(-2px)",
                        },
                        "&:active": {
                          transform: "translateY(0)",
                        },
                        "&:disabled": {
                          opacity: 0.7,
                          color: "rgba(255, 255, 255, 0.7)",
                        },
                        transition: "all 0.2s ease",
                      }}
                      startIcon={
                        status === "sending" ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <FiSend />
                        )
                      }
                    >
                      {status === "sending" ? "Sending..." : "Send Feedback"}
                    </Button>
                  </Grid>
                </Grid>

                {status === "success" && (
                  <Alert
                    severity="success"
                    className="mt-4"
                    sx={{
                      background: "rgba(16, 185, 129, 0.15)",
                      color: "#10b981",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                    }}
                  >
                    Your message has been received. Thank you for your feedback!
                  </Alert>
                )}

                {status === "error" && (
                  <Alert
                    severity="error"
                    className="mt-4"
                    sx={{
                      background: "rgba(239, 68, 68, 0.15)",
                      color: "#ef4444",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                    }}
                  >
                    There was an error sending your message. Please try again
                    later.
                  </Alert>
                )}
              </form>
            </Paper>
          </Grid>

          {/* Community Information */}
          <Grid item xs={12} md={5} lg={4}>
            <Paper
              elevation={0}
              className="p-6 md:p-8 rounded-xl mb-6"
              sx={{
                backgroundColor: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(16, 185, 129, 0.15)",
                height: "calc(100% - 24px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                className="text-white mb-6 font-semibold"
              >
                Join Our Community
              </Typography>

              <Box className="space-y-6 flex-grow">
                <Typography className="text-gray-400 mb-4">
                  Connect with our decentralized community through these
                  channels:
                </Typography>

                <Box className="flex items-center gap-4 p-3 rounded-lg bg-[#0a1f00]/50 border border-[#10b981]/10 hover:border-[#10b981]/30 transition-all duration-300">
                  <Box
                    className="p-2.5 rounded-lg"
                    sx={{ backgroundColor: "rgba(16, 185, 129, 0.15)" }}
                  >
                    <FiGithub className="text-[#10b981] text-xl" />
                  </Box>
                  <Box>
                    <Typography className="text-white font-medium">
                      GitHub Repository
                    </Typography>
                    <Typography className="text-gray-400 text-sm">
                      View our code, submit issues and pull requests
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex items-center gap-4 p-3 rounded-lg bg-[#0a1f00]/50 border border-[#10b981]/10 hover:border-[#10b981]/30 transition-all duration-300">
                  <Box
                    className="p-2.5 rounded-lg"
                    sx={{ backgroundColor: "rgba(16, 185, 129, 0.15)" }}
                  >
                    <FaDiscord className="text-[#10b981] text-xl" />
                  </Box>
                  <Box>
                    <Typography className="text-white font-medium">
                      Discord Community
                    </Typography>
                    <Typography className="text-gray-400 text-sm">
                      Join discussions, get support, and meet the team
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex items-center gap-4 p-3 rounded-lg bg-[#0a1f00]/50 border border-[#10b981]/10 hover:border-[#10b981]/30 transition-all duration-300">
                  <Box
                    className="p-2.5 rounded-lg"
                    sx={{ backgroundColor: "rgba(16, 185, 129, 0.15)" }}
                  >
                    <FaTelegram className="text-[#10b981] text-xl" />
                  </Box>
                  <Box>
                    <Typography className="text-white font-medium">
                      Telegram Channel
                    </Typography>
                    <Typography className="text-gray-400 text-sm">
                      Get the latest updates and announcements
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
