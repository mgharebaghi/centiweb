"use client";
import { Block, BaseTransaction } from "@/app/api/types/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import moment from "moment";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Dialog,
  IconButton,
  Box,
  CircularProgress,
  Tooltip,
  Chip,
  FormControlLabel,
  Switch,
  Pagination,
  TextField,
  Tabs,
  Tab,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FiClock, FiHash, FiBox, FiList, FiSearch } from "react-icons/fi";
import { RiNodeTree } from "react-icons/ri";
import { BsArrowRight } from "react-icons/bs";
import { FaServer, FaUserShield } from "react-icons/fa";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
      className="mt-4"
    >
      {value === index && children}
    </div>
  );
}

export default function BlockExplorer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchError, setSearchError] = useState("");
  const [lastBlockNumber, setLastBlockNumber] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const itemsPerPage = 12;
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [searchStatus, setSearchStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const fetchTotalBlocks = async () => {
    try {
      const response = await fetch("/api/blocks");
      const data = await response.json();
      const total = Math.ceil(data.number / itemsPerPage);
      setTotalPages(total);
      setLastBlockNumber(data.number);
    } catch (error) {
      console.error("Failed to fetch total blocks:", error);
    }
  };

  const fetchBlocks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blockscan`, {
        method: "POST",
        body: JSON.stringify({
          page: page,
          limit: itemsPerPage,
          sort: "desc",
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
        setBlocks(data.blocks);
        await fetchTotalBlocks();
      }
    } catch (error) {
      console.error("Failed to fetch blocks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!debouncedSearchValue.trim()) {
      setSearchStatus("idle");
      return;
    }

    try {
      setSearchStatus("loading");
      setSearchError("");

      const response = await fetch("/api/block", {
        method: "POST",
        body: JSON.stringify({ searchValue: debouncedSearchValue.trim() }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setBlocks([data.block]);
        setTotalPages(1);
        setPage(1);
        setSearchStatus("success");
      } else {
        setSearchError(data.message || "Block not found");
        setSearchStatus("error");
      }
    } catch (error) {
      console.error("Search failed:", error);
      setSearchError("Search failed");
      setSearchStatus("error");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    if (debouncedSearchValue) {
      handleSearch();
    } else if (debouncedSearchValue === "") {
      fetchBlocks();
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (!searchValue) {
      fetchBlocks();
    }
  }, [page]);

  const handleBlockClick = (block: Block) => {
    setSelectedBlock(block);
    setDialogOpen(true);
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setSearchValue("");
  };

  return (
    <div className="min-h-screen w-full bg-[#0F172A] relative overflow-hidden mt-16">
      {/* Background Patterns */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Overlay - Darker but with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#131C2F] to-[#162032] opacity-98" />

        {/* Grid Pattern - More subtle */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(148, 163, 184, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148, 163, 184, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Radial Glow - More subtle and darker */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full filter blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full filter blur-[120px]" />
        </div>

        {/* Floating Elements - Reduced opacity */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: Math.random() > 0.5 ? "#10B981" : "#3B82F6",
              animation: `float ${Math.random() * 10 + 15}s linear infinite`,
              animationDelay: `-${Math.random() * 10}s`,
            }}
          />
        ))}

        {/* Dot Pattern - More subtle */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
          <pattern
            id="pattern-circles"
            x="0"
            y="0"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle
              cx="24"
              cy="24"
              r="1"
              fill="currentColor"
              className="text-slate-400"
            />
          </pattern>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#pattern-circles)"
          />
        </svg>
      </div>

      {/* Add animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-10px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>

      {/* Main Content */}
      <Container maxWidth="xl" className="relative z-10 px-3 sm:px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-4 py-4 sm:py-6"
        >
          {/* Improved Header Layout */}
          <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-4">
            {/* Title Section - More Compact */}
            <div className="flex items-center justify-between lg:justify-start gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <Typography className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                  Live Blocks
                </Typography>
              </motion.div>
            </div>

            {/* Stats and Search Section - Better Layout */}
            <div className="flex flex-col sm:flex-row gap-4 flex-grow">
              {/* Stats Card - More Compact */}
              <Paper
                elevation={0}
                className="bg-[#1E293B]/40 backdrop-blur-xl border border-slate-800/50 rounded-xl px-4 h-[52px] flex items-center justify-between sm:justify-start gap-6"
              >
                {/* Block Stats */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <RiNodeTree className="text-emerald-400 text-xl" />
                  </div>
                  <div>
                    <Typography className="text-white text-lg font-bold">
                      #{lastBlockNumber?.toLocaleString()}
                    </Typography>
                  </div>
                </div>

                <div className="h-8 w-px bg-slate-800/50" />

                {/* Auto Refresh Toggle - Simplified */}
                <div
                  onClick={toggleAutoRefresh}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      autoRefresh ? "bg-emerald-500/10" : "bg-slate-800/30"
                    }`}
                  >
                    <FiClock
                      className={`text-xl transition-colors duration-300 ${
                        autoRefresh ? "text-emerald-400" : "text-slate-400"
                      }`}
                    />
                  </div>
                  <Typography
                    className={`font-medium transition-colors duration-300 ${
                      autoRefresh ? "text-emerald-400" : "text-white"
                    }`}
                  >
                    {autoRefresh ? "Auto" : "Manual"}
                  </Typography>
                </div>
              </Paper>

              {/* Search Box - Cleaner Design */}
              <div className="flex-grow">
                <TextField
                  fullWidth
                  placeholder="Search by block number or hash..."
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    if (searchStatus === "error") {
                      setSearchStatus("idle");
                      setSearchError("");
                    }
                  }}
                  className="w-full"
                  error={searchStatus === "error"}
                  InputProps={{
                    startAdornment: (
                      <div
                        className={`flex items-center gap-2 pr-3 border-r transition-colors duration-200 ${
                          searchStatus === "error"
                            ? "border-red-500/30"
                            : "border-slate-700"
                        }`}
                      >
                        <FiSearch
                          className={`text-lg ${
                            searchStatus === "error"
                              ? "text-red-400"
                              : searchStatus === "success"
                              ? "text-emerald-400"
                              : "text-slate-400"
                          }`}
                        />
                      </div>
                    ),
                    endAdornment: (
                      <div className="flex items-center gap-2">
                        {searchStatus === "loading" && (
                          <CircularProgress
                            size={20}
                            thickness={4}
                            sx={{ color: "#10B981" }}
                          />
                        )}
                        {searchValue && (
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSearchValue("");
                              setSearchError("");
                              setSearchStatus("idle");
                              fetchBlocks();
                            }}
                            className="hover:bg-slate-700/30"
                          >
                            <IoClose className="text-slate-400 hover:text-slate-300" />
                          </IconButton>
                        )}
                      </div>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "52px",
                      backgroundColor: "rgba(30, 41, 59, 0.4)",
                      backdropFilter: "blur(12px)",
                      borderRadius: "1rem",
                      border: "1px solid",
                      borderColor: (theme) =>
                        searchStatus === "error"
                          ? "rgba(239, 68, 68, 0.5)"
                          : searchStatus === "success"
                          ? "rgba(16, 185, 129, 0.3)"
                          : "rgba(51, 65, 85, 0.5)",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        borderColor: (theme) =>
                          searchStatus === "error"
                            ? "rgba(239, 68, 68, 0.7)"
                            : searchStatus === "success"
                            ? "rgba(16, 185, 129, 0.5)"
                            : "rgba(16, 185, 129, 0.3)",
                        backgroundColor: "rgba(30, 41, 59, 0.5)",
                      },
                      "&.Mui-focused": {
                        borderColor: (theme) =>
                          searchStatus === "error"
                            ? "rgb(239, 68, 68)"
                            : "#10B981",
                        boxShadow: (theme) =>
                          searchStatus === "error"
                            ? "0 0 0 2px rgba(239, 68, 68, 0.1)"
                            : "0 0 0 2px rgba(16, 185, 129, 0.1)",
                      },
                      "& fieldset": {
                        border: "none",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "#E2E8F0",
                      fontFamily: "monospace",
                      fontSize: "0.95rem",
                      "&::placeholder": {
                        color: "#64748B",
                        opacity: 1,
                      },
                    },
                  }}
                />

                {/* Only show error message if there's an error */}
                {searchStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2"
                  >
                    <Typography className="text-red-400 text-xs flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {searchError}
                    </Typography>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Blocks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            <AnimatePresence mode="popLayout">
              {blocks.map((block, index) => (
                <motion.div
                  key={block.header.hash}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  layout
                >
                  <Card
                    onClick={() => handleBlockClick(block)}
                    className="bg-[#1E293B]/40 backdrop-blur-xl border border-slate-800/50 rounded-xl cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:bg-[#1E293B]/60"
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="space-y-2 sm:space-y-3">
                        {/* Card Header */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/15">
                              <FiBox className="text-emerald-400 text-sm sm:text-base" />
                            </div>
                            <div>
                              <Typography className="text-emerald-400 text-sm sm:text-base font-semibold">
                                #{block.header.number.toLocaleString()}
                              </Typography>
                              <div className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-emerald-500/50" />
                                <Typography
                                  className="text-xs font-medium text-slate-200"
                                  sx={{
                                    background:
                                      "linear-gradient(90deg, #E2E8F0 0%, #CBD5E1 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    textShadow:
                                      "0 0 20px rgba(226, 232, 240, 0.1)",
                                  }}
                                >
                                  {moment(block.header.date).fromNow()}
                                </Typography>
                              </div>
                            </div>
                          </div>
                          <Chip
                            size="small"
                            label={`${block.body.transactions.length} TXs`}
                            className="bg-emerald-500/10 text-emerald-400 text-xs"
                          />
                        </div>

                        {/* Hash */}
                        <div className="space-y-1">
                          <Typography className="text-slate-400 text-xs">
                            Hash
                          </Typography>
                          <Typography className="font-mono text-[11px] sm:text-xs text-slate-300 truncate bg-slate-900/50 p-2 rounded-lg">
                            {block.header.hash}
                          </Typography>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <Typography className="text-slate-400 text-xs">
                              {block.body.transactions.length} Transactions
                            </Typography>
                          </div>
                          <BsArrowRight className="text-emerald-400 text-sm opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Responsive Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-4 sm:mt-6"
            >
              <Paper
                elevation={0}
                className="bg-[#1E293B]/40 backdrop-blur-xl border border-slate-800/50 rounded-lg p-1 sm:p-2"
              >
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  size={isMobile ? "small" : "medium"}
                  siblingCount={isMobile ? 0 : 1}
                  boundaryCount={isMobile ? 1 : 2}
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#E2E8F0",
                      borderColor: "rgba(51, 65, 85, 0.5)",
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      minWidth: { xs: "28px", sm: "32px" },
                      height: { xs: "28px", sm: "32px" },
                    },
                  }}
                />
              </Paper>
            </motion.div>
          )}

          {/* Block Details Modal */}
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            maxWidth="lg"
            fullWidth
            fullScreen={isMobile}
            PaperProps={{
              className: "bg-[#1E293B]/95 backdrop-blur-xl",
              sx: {
                background:
                  "linear-gradient(180deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)",
                border: "1px solid rgba(51, 65, 85, 0.5)",
                margin: { xs: 0, sm: 2 },
                maxHeight: { xs: "100%", sm: "calc(100% - 64px)" },
                borderRadius: { xs: 0, sm: "16px" },
              },
            }}
          >
            {selectedBlock && (
              <Box className="relative">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10">
                      <FiBox className="text-emerald-400 text-xl" />
                    </div>
                    <div>
                      <Typography className="text-xl sm:text-2xl font-bold text-white">
                        Block #{selectedBlock.header.number.toLocaleString()}
                      </Typography>
                      <Typography className="text-slate-400 text-sm">
                        {moment(selectedBlock.header.date).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </Typography>
                    </div>
                  </div>
                  <IconButton
                    onClick={() => setDialogOpen(false)}
                    className="hover:bg-slate-700/50 transition-colors"
                  >
                    <IoClose className="text-slate-400 hover:text-slate-300" />
                  </IconButton>
                </div>

                {/* Enhanced Tabs */}
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  className="border-b border-slate-700/50"
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#10B981",
                    },
                  }}
                  sx={{
                    "& .MuiTabs-flexContainer": {
                      px: 3,
                    },
                    "& .MuiTab-root": {
                      color: "#94A3B8",
                      fontSize: "0.875rem",
                      textTransform: "none",
                      fontWeight: 500,
                      minHeight: "48px",
                      "&.Mui-selected": {
                        color: "#10B981",
                      },
                    },
                  }}
                >
                  <Tab label="Overview" />
                  <Tab label="Transactions" />
                  <Tab label="Coinbase" />
                </Tabs>

                {/* Tab Panels with consistent styling */}
                <Box className="p-4 sm:p-6">
                  <TabPanel value={tabValue} index={0}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {/* Block Details */}
                      <div className="space-y-4">
                        <Paper className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
                          <Typography className="text-slate-300 text-sm font-medium mb-2">
                            Block Hash
                          </Typography>
                          <Typography className="font-mono text-sm text-white/90 break-all bg-slate-900/30 p-3 rounded-lg">
                            {selectedBlock.header.hash}
                          </Typography>
                        </Paper>

                        <Paper className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
                          <Typography className="text-slate-300 text-sm font-medium mb-2">
                            Previous Hash
                          </Typography>
                          <Typography className="font-mono text-sm text-white/90 break-all bg-slate-900/30 p-3 rounded-lg">
                            {selectedBlock.header.previous}
                          </Typography>
                        </Paper>

                        <Paper className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
                          <Typography className="text-slate-300 text-sm font-medium mb-2">
                            Merkle Root
                          </Typography>
                          <Typography className="font-mono text-sm text-white/90 break-all bg-slate-900/30 p-3 rounded-lg">
                            {selectedBlock.header.merkel}
                          </Typography>
                        </Paper>
                      </div>

                      {/* Additional Info */}
                      <div className="space-y-4">
                        <Paper className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <FaUserShield className="text-emerald-400 text-lg" />
                            <Typography className="text-white font-medium">
                              Validator
                            </Typography>
                          </div>
                          <Typography className="font-mono text-sm text-white/90 break-all bg-slate-900/30 p-3 rounded-lg">
                            {selectedBlock.header.validator}
                          </Typography>
                        </Paper>

                        <Paper className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <FaServer className="text-emerald-400 text-lg" />
                            <Typography className="text-white font-medium">
                              Relay
                            </Typography>
                          </div>
                          <Typography className="font-mono text-sm text-white/90 break-all bg-slate-900/30 p-3 rounded-lg">
                            {selectedBlock.header.relay}
                          </Typography>
                        </Paper>
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel value={tabValue} index={1}>
                    <div className="space-y-3">
                      {selectedBlock.body.transactions.map(
                        (tx: BaseTransaction, index: number) => (
                          <Paper
                            key={index}
                            className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/30 transition-colors"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <FiHash className="text-emerald-400 text-lg" />
                              <Typography className="text-emerald-400 font-medium">
                                Transaction #{index + 1}
                              </Typography>
                            </div>
                            <Typography className="font-mono text-sm text-white/90 break-all bg-slate-900/30 p-3 rounded-lg">
                              {tx.hash}
                            </Typography>
                          </Paper>
                        )
                      )}
                    </div>
                  </TabPanel>

                  <TabPanel value={tabValue} index={2}>
                    <div className="space-y-4">
                      {/* Coinbase Transactions */}
                      {(["reward", "relay_fee", "validator_fee"] as const).map(
                        (type) => (
                          <Paper
                            key={type}
                            className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4"
                          >
                            <Typography className="text-emerald-400 text-lg font-medium mb-4">
                              {type
                                .split("_")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}{" "}
                              Transaction
                            </Typography>
                            <div className="space-y-4">
                              <div>
                                <Typography className="text-slate-300 text-sm font-medium mb-2">
                                  Hash
                                </Typography>
                                <Typography className="font-mono text-sm text-white/90 break-all bg-slate-900/30 p-3 rounded-lg">
                                  {selectedBlock.body.coinbase.data[type].hash}
                                </Typography>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Typography className="text-slate-300 text-sm font-medium mb-2">
                                    From
                                  </Typography>
                                  <Typography className="font-mono text-sm text-white/90 break-all bg-slate-900/30 p-3 rounded-lg">
                                    {
                                      selectedBlock.body.coinbase.data[type]
                                        .data.from
                                    }
                                  </Typography>
                                </div>
                                <div>
                                  <Typography className="text-slate-300 text-sm font-medium mb-2">
                                    To
                                  </Typography>
                                  <Typography className="font-mono text-sm text-white/90 break-all bg-slate-900/30 p-3 rounded-lg">
                                    {
                                      selectedBlock.body.coinbase.data[type]
                                        .data.to
                                    }
                                  </Typography>
                                </div>
                              </div>
                              <div>
                                <Typography className="text-slate-300 text-sm font-medium mb-2">
                                  Value
                                </Typography>
                                <Typography className="font-mono text-sm text-white/90 bg-slate-900/30 p-3 rounded-lg">
                                  {
                                    selectedBlock.body.coinbase.data[type].data
                                      .value
                                  }{" "}
                                  CENTI
                                </Typography>
                              </div>
                            </div>
                          </Paper>
                        )
                      )}
                    </div>
                  </TabPanel>
                </Box>
              </Box>
            )}
          </Dialog>
        </motion.div>
      </Container>

      {/* Add CSS to handle menu overlap */}
      <style jsx global>{`
        body {
          padding-top: env(safe-area-inset-top);
        }
      `}</style>
    </div>
  );
}
