"use client";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useScrollTrigger,
  Stack,
  useMediaQuery,
  useTheme,
  Collapse,
  ListItemIcon,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { FaQrcode, FaFileAlt, FaDownload, FaCode, FaServer, FaEnvelope, FaChevronDown } from "react-icons/fa";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    label: "Explorer",
    path: "/scan",
    icon: <FaQrcode />,
    submenu: [
      { label: "Blocks", path: "/scan/blocks" },
      { label: "Transactions", path: "/scan/transactions" },
    ],
  },
  {
    label: "Whitepaper",
    path: "/articles/671fcec5d136b9550a238077",
    icon: <FaFileAlt />,
  },
  {
    label: "Download",
    path: "/download",
    icon: <FaDownload />,
  },
  { label: "DEV", path: "/dev", icon: <FaCode /> },
  {
    label: "Become a Node",
    path: "/node",
    icon: <FaServer />,
    submenu: [
      { label: "Relay", path: "/relay" },
      { label: "Validator", path: "/validator" },
      { label: "Contributors", path: "/contributors" },
    ],
  },
  {
    label: "Contact",
    path: "/contact",
    icon: <FaEnvelope />,
  },
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    setIsOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #030800 0%, #020400 100%)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(16, 185, 129, 0.1)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              height: { xs: 70, md: 80 },
              transition: "height 0.3s ease",
            }}
          >
            {/* Logo Section */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link href="/" passHref>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    cursor: "pointer",
                    "&:hover": {
                      "& .logo-image": {
                        transform: "scale(1.05)",
                      },
                      "& .logo-text": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Box
                    className="logo-image"
                    sx={{
                      position: "relative",
                      width: { xs: 35, md: 40 },
                      height: { xs: 35, md: 40 },
                      transition: "transform 0.3s ease",
                      filter: "drop-shadow(0 0 10px rgba(16, 185, 129, 0.3))",
                    }}
                  >
                    <Image src="/images/Logo.png" alt="Centichain Logo" layout="fill" objectFit="contain" priority />
                  </Box>
                  <Box
                    className="logo-text"
                    component={motion.div}
                    sx={{
                      fontSize: { xs: "1.3rem", md: "1.5rem" },
                      fontWeight: 600,
                      opacity: 0.9,
                      transition: "opacity 0.3s ease",
                      background: "linear-gradient(90deg, #fff, rgba(255,255,255,0.8))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Centichain
                  </Box>
                </Box>
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            {!isMobile && (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  ml: "auto",
                  background: "rgba(16, 185, 129, 0.03)",
                  backdropFilter: "blur(8px)",
                  padding: "4px",
                  borderRadius: "12px",
                  border: "1px solid rgba(16, 185, 129, 0.1)",
                }}
              >
                {menuItems.map((item, index) => (
                  <Box
                    key={index}
                    sx={{ position: "relative" }}
                    onMouseEnter={() => item.submenu && setOpenSubmenu(item.path)}
                    onMouseLeave={() => item.submenu && setOpenSubmenu(null)}
                  >
                    <Button
                      component={item.submenu ? Box : Link}
                      href={!item.submenu ? item.path : undefined}
                      onClick={() => item.submenu && setOpenSubmenu(openSubmenu === item.path ? null : item.path)}
                      sx={{
                        px: 2,
                        py: 1,
                        color: "white",
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "rgba(16, 185, 129, 0.1)",
                          borderRadius: "8px",
                          opacity: !isHomePage && (pathname === item.path || pathname.startsWith(item.path)) ? 1 : 0,
                          transition: "opacity 0.3s ease",
                        },
                        "&:hover": {
                          "&::before": {
                            opacity: 1,
                          },
                          "& .menu-icon": {
                            transform: "translateY(-2px)",
                            color: "#10b981",
                          },
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        <Box
                          className="menu-icon"
                          sx={{
                            color:
                              !isHomePage && (pathname === item.path || pathname.startsWith(item.path))
                                ? "#10b981"
                                : "rgba(255,255,255,0.7)",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {item.icon}
                        </Box>
                        <span>{item.label}</span>
                        {item.submenu && (
                          <FaChevronDown
                            style={{
                              fontSize: "0.8rem",
                              transition: "transform 0.3s ease",
                              transform: openSubmenu === item.path ? "rotate(180deg)" : "rotate(0)",
                            }}
                          />
                        )}
                      </Box>
                    </Button>

                    {/* Submenu Dropdown */}
                    {item.submenu && (
                      <AnimatePresence>
                        {openSubmenu === item.path && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              zIndex: 100,
                              minWidth: "200px",
                              marginTop: "0.5rem",
                            }}
                          >
                            <Box
                              sx={{
                                background: "#030800",
                                backdropFilter: "blur(12px)",
                                borderRadius: "12px",
                                border: "1px solid rgba(16, 185, 129, 0.15)",
                                overflow: "hidden",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              {item.submenu.map((subItem, subIndex) => (
                                <motion.div key={subIndex} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                                  <Button
                                    component={Link}
                                    href={subItem.path}
                                    fullWidth
                                    sx={{
                                      py: 1.5,
                                      px: 3,
                                      justifyContent: "flex-start",
                                      color:
                                        !isHomePage && pathname === subItem.path ? "#10b981" : "rgba(255,255,255,0.8)",
                                      background:
                                        !isHomePage && pathname === subItem.path
                                          ? "rgba(16, 185, 129, 0.15)"
                                          : "transparent",
                                      borderLeft: "2px solid",
                                      borderColor: !isHomePage && pathname === subItem.path ? "#10b981" : "transparent",
                                      "&:hover": {
                                        background: "rgba(16, 185, 129, 0.15)",
                                        borderColor: "#10b981",
                                        color: "#fff",
                                      },
                                    }}
                                  >
                                    {subItem.label}
                                  </Button>
                                </motion.div>
                              ))}
                            </Box>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </Box>
                ))}

                {/* CTA Button */}
                <Button
                  component={Link}
                  href="/download"
                  sx={{
                    ml: 2,
                    background: "rgba(29, 71, 0, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(29, 71, 0, 0.2)",
                    color: "#fff",
                    px: 3,
                    py: 1,
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    textTransform: "none",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    "&:hover": {
                      background: "rgba(29, 71, 0, 0.2)",
                      transform: "translateY(-2px)",
                      "& .arrow": {
                        transform: "translateX(4px)",
                      },
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    Start as a Node
                    <span className="arrow" style={{ transition: "transform 0.3s ease" }}>
                      →
                    </span>
                  </Box>
                </Button>
              </Stack>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                onClick={() => setIsOpen(true)}
                sx={{
                  ml: "auto",
                  color: "white",
                  background: "rgba(16, 185, 129, 0.1)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  "&:hover": {
                    background: "rgba(16, 185, 129, 0.2)",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "360px",
            background: "#000000",
            borderLeft: "1px solid rgba(16, 185, 129, 0.15)",
          },
        }}
      >
        <Box
          sx={{
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Mobile Menu Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  position: "relative",
                  width: 35,
                  height: 35,
                  filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.3))",
                }}
              >
                <Image src="/images/Logo.png" alt="Centichain Logo" layout="fill" objectFit="contain" />
              </Box>
              <span
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  background: "linear-gradient(90deg, #fff, rgba(255,255,255,0.8))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Centichain
              </span>
            </Box>
            <IconButton
              onClick={() => setIsOpen(false)}
              sx={{
                color: "white",
                background: "rgba(16, 185, 129, 0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(16, 185, 129, 0.2)",
                "&:hover": {
                  background: "rgba(16, 185, 129, 0.25)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Mobile Menu Items */}
          <List sx={{ mb: 4 }}>
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ListItem
                  {...(item.submenu
                    ? {
                        onClick: () => setOpenSubmenu(openSubmenu === item.path ? null : item.path),
                      }
                    : {
                        component: Link,
                        href: item.path,
                        onClick: () => setIsOpen(false),
                      })}
                  sx={{
                    mb: 1,
                    borderRadius: "12px",
                    background:
                      !isHomePage && (pathname === item.path || pathname.startsWith(item.path))
                        ? "rgba(16, 185, 129, 0.15)"
                        : "rgba(0, 0, 0, 0.3)",
                    border: "1px solid",
                    borderColor:
                      !isHomePage && (pathname === item.path || pathname.startsWith(item.path))
                        ? "rgba(16, 185, 129, 0.3)"
                        : "rgba(16, 185, 129, 0.1)",
                    "&:hover": {
                      background: "rgba(16, 185, 129, 0.15)",
                      borderColor: "rgba(16, 185, 129, 0.3)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color:
                        !isHomePage && (pathname === item.path || pathname.startsWith(item.path))
                          ? "#10b981"
                          : "rgba(255,255,255,0.8)",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "1rem",
                        fontWeight: 500,
                        color:
                          !isHomePage && (pathname === item.path || pathname.startsWith(item.path))
                            ? "#10b981"
                            : "rgba(255,255,255,0.9)",
                      },
                    }}
                  />
                  {item.submenu && (
                    <FaChevronDown
                      style={{
                        fontSize: "0.8rem",
                        transition: "transform 0.3s ease",
                        transform: openSubmenu === item.path ? "rotate(180deg)" : "rotate(0)",
                      }}
                    />
                  )}
                </ListItem>

                {/* Mobile Submenu */}
                {item.submenu && (
                  <Collapse in={openSubmenu === item.path} timeout="auto">
                    <List
                      component="div"
                      disablePadding
                      sx={{
                        ml: 4,
                        mt: 1,
                        mb: 2,
                        borderLeft: "1px solid rgba(16, 185, 129, 0.2)",
                        background: "rgba(0, 0, 0, 0.4)",
                        borderRadius: "0 0 12px 12px",
                        overflow: "hidden",
                      }}
                    >
                      {item.submenu.map((subItem, subIndex) => (
                        <ListItem
                          key={subIndex}
                          component={Link}
                          href={subItem.path}
                          onClick={() => {
                            setIsOpen(false);
                            setOpenSubmenu(null);
                          }}
                          sx={{
                            pl: 4,
                            py: 1.5,
                            borderRadius: "8px",
                            "&:hover": {
                              background: "rgba(16, 185, 129, 0.15)",
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          <ListItemText
                            primary={subItem.label}
                            sx={{
                              "& .MuiListItemText-primary": {
                                fontSize: "0.9rem",
                                color: !isHomePage && pathname === subItem.path ? "#10b981" : "rgba(255,255,255,0.8)",
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </motion.div>
            ))}
          </List>

          {/* Mobile CTA Button */}
          <Box sx={{ mt: "auto", p: 2 }}>
            <Button
              component={Link}
              href="/download"
              fullWidth
              sx={{
                background: "rgba(16, 185, 129, 0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                color: "#fff",
                py: 2,
                borderRadius: "12px",
                fontSize: "1rem",
                textTransform: "none",
                fontWeight: 500,
                letterSpacing: "0.02em",
                "&:hover": {
                  background: "rgba(16, 185, 129, 0.25)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                Start as a Node
                <span style={{ transition: "transform 0.3s ease" }}>→</span>
              </Box>
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Menu;
