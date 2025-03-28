"use client";
import { TrxScan } from "@/app/api/types/types";
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
import { FiClock, FiHash, FiList, FiSearch } from "react-icons/fi";
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

// تغییر رنگ‌های سبز به نسخه تیره‌تر
const darkGreenColors = {
  primary: "#059669", // سبز تیره‌تر برای آیکون‌ها و متن‌های اصلی
  hover: "#047857", // سبز تیره‌تر برای حالت hover
  bg: "rgba(5, 150, 105, 0.1)", // پس‌زمینه با شفافیت
  border: "rgba(5, 150, 105, 0.3)", // رنگ حاشیه
  glow: "rgba(5, 150, 105, 0.15)", // افکت درخشش
};

export default function TransactionExplorer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [transactions, setTransactions] = useState<TrxScan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TrxScan | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchError, setSearchError] = useState("");
  const [lastTrxCount, setLastTrxCount] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const itemsPerPage = isMobile ? 3 : isTablet ? 4 : 5;
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [searchStatus, setSearchStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const fetchTotalTransactions = async () => {
    try {
      const response = await fetch("/api/trxcount");
      const data = await response.json();
      const total = Math.ceil(data.data / itemsPerPage);
      setTotalPages(total);
      setLastTrxCount(data.data);
    } catch (error) {
      console.error("Failed to fetch total transactions:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/trxscan`, {
        method: "POST",
        body: JSON.stringify({ page, limit: itemsPerPage }),
      });
      const data = await response.json();
      if (data.status === "success") {
        setTransactions(data.trxs);
        await fetchTotalTransactions();
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleSearch = async () => {
    if (!debouncedSearchValue.trim()) {
      setSearchStatus("idle");
      return;
    }

    try {
      setSearchStatus("loading");
      setSearchError("");

      const response = await fetch("/api/trx", {
        method: "POST",
        body: JSON.stringify({ hash: debouncedSearchValue.trim() }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setTransactions([data.transaction]);
        setTotalPages(1);
        setPage(1);
        setSearchStatus("success");
      } else {
        setSearchError(data.message || "Transaction not found");
        setSearchStatus("error");
      }
    } catch (error) {
      console.error("Search failed:", error);
      setSearchError("Search failed");
      setSearchStatus("error");
    }
  };

  useEffect(() => {
    if (debouncedSearchValue) {
      handleSearch();
    } else if (debouncedSearchValue === "") {
      fetchTransactions();
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    // Only fetch transactions when not searching
    if (
      searchStatus !== "loading" &&
      searchStatus !== "success" &&
      !debouncedSearchValue
    ) {
      fetchTransactions();
    }
  }, [page]); // Add page as a dependency to trigger fetch when page changes

  const handleTransactionClick = (transaction: TrxScan) => {
    setSelectedTransaction(transaction);
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
      {/* Background Patterns - Same as blocks page */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#131C2F] to-[#162032] opacity-98" />

        {/* Grid Pattern */}
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

        {/* Radial Glow */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full filter blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full filter blur-[120px]" />
        </div>

        {/* Floating Elements */}
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

        {/* Dot Pattern */}
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

      {/* Main Content */}
      <Container maxWidth="xl" className="relative z-10 px-3 sm:px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-4 py-4 sm:py-6"
        >
          {/* Header Layout */}
          <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-4">
            {/* Title Section */}
            <div className="flex items-center justify-between lg:justify-start gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <Typography className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                  Live Transactions
                </Typography>
              </motion.div>
            </div>

            {/* Stats and Search Section */}
            <div className="flex flex-col sm:flex-row gap-4 flex-grow">
              {/* Stats Card */}
              <Paper
                elevation={0}
                className="bg-[#1E293B]/40 backdrop-blur-xl border border-slate-800/50 rounded-xl px-4 h-[52px] flex items-center justify-between sm:justify-start gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <RiNodeTree className="text-emerald-400 text-xl" />
                  </div>
                  <div>
                    <Typography className="text-white text-lg font-bold">
                      #{lastTrxCount?.toLocaleString()}
                    </Typography>
                  </div>
                </div>

                <div className="h-8 w-px bg-slate-800/50" />

                {/* Auto Refresh Toggle */}
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

              {/* Search Box with Fixed Height */}
              <div className="flex-grow">
                <TextField
                  fullWidth
                  placeholder="Search by transaction hash..."
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
                              ? "text-emerald-600"
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
                              fetchTransactions();
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
                      height: "52px", // Fixed height to match other elements
                      backgroundColor: "rgba(30, 41, 59, 0.4)",
                      backdropFilter: "blur(12px)",
                      borderRadius: "1rem",
                      border: "1px solid",
                      borderColor: (theme) =>
                        searchStatus === "error"
                          ? "rgba(239, 68, 68, 0.5)"
                          : searchStatus === "success"
                          ? "rgba(5, 150, 105, 0.3)"
                          : "rgba(51, 65, 85, 0.5)",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        borderColor: (theme) =>
                          searchStatus === "error"
                            ? "rgba(239, 68, 68, 0.7)"
                            : searchStatus === "success"
                            ? "rgba(5, 150, 105, 0.5)"
                            : "rgba(5, 150, 105, 0.3)",
                        backgroundColor: "rgba(30, 41, 59, 0.5)",
                      },
                      "&.Mui-focused": {
                        borderColor: (theme) =>
                          searchStatus === "error"
                            ? "rgb(239, 68, 68)"
                            : "#059669",
                        boxShadow: (theme) =>
                          searchStatus === "error"
                            ? "0 0 0 2px rgba(239, 68, 68, 0.1)"
                            : "0 0 0 2px rgba(5, 150, 105, 0.1)",
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
              </div>
            </div>
          </div>

          {/* Transactions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            <AnimatePresence mode="popLayout">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.hash}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  layout
                >
                  <Card
                    onClick={() => handleTransactionClick(transaction)}
                    className="bg-[#1E293B]/40 backdrop-blur-xl border border-slate-800/50 rounded-xl cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:bg-[#1E293B]/60"
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="space-y-2 sm:space-y-3">
                        {/* Card Header */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-700/10 group-hover:bg-emerald-700/15">
                              <FiHash className="text-emerald-600 text-sm sm:text-base" />
                            </div>
                            <div>
                              <Typography className="text-emerald-600 text-sm sm:text-base font-semibold">
                                Transaction
                              </Typography>
                              <div className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-emerald-600/50" />
                                <Typography className="text-xs font-medium text-slate-200">
                                  {moment(transaction.date).fromNow()}
                                </Typography>
                              </div>
                            </div>
                          </div>
                          <Chip
                            size="small"
                            label={`${transaction.value} CENTI`}
                            className="bg-emerald-700/10 text-emerald-600 text-xs"
                          />
                        </div>

                        {/* Hash */}
                        <div className="space-y-1">
                          <Typography className="text-slate-400 text-xs">
                            Hash
                          </Typography>
                          <Typography className="font-mono text-[11px] sm:text-xs text-slate-300 truncate bg-slate-900/50 p-2 rounded-lg">
                            {transaction.hash}
                          </Typography>
                        </div>

                        {/* Status */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                transaction.block
                                  ? "bg-emerald-600"
                                  : "bg-yellow-500"
                              }`}
                            />
                            <Typography className="text-slate-400 text-xs">
                              {transaction.block ? "Confirmed" : "Pending"}
                            </Typography>
                          </div>
                          <BsArrowRight className="text-emerald-600 text-sm opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
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

          {/* Updated Modal Styling */}
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            maxWidth="lg"
            fullWidth
            fullScreen={isMobile}
            PaperProps={{
              className: "bg-[#0F172A]/95 backdrop-blur-xl",
              sx: {
                background:
                  "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(17, 25, 40, 0.98) 100%)",
                border: "1px solid rgba(16, 185, 129, 0.1)",
                margin: { xs: 0, sm: 2 },
                maxHeight: { xs: "100%", sm: "calc(100% - 64px)" },
                borderRadius: { xs: 0, sm: "16px" },
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
              },
            }}
            BackdropProps={{
              sx: {
                backdropFilter: "blur(4px)",
                backgroundColor: "rgba(15, 23, 42, 0.8)",
              },
            }}
          >
            {selectedTransaction && (
              <Box className="relative">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-700/30">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <FiHash className="text-emerald-400 text-xl" />
                    </div>
                    <div>
                      <Typography className="text-xl sm:text-2xl font-bold text-white">
                        Transaction Details
                      </Typography>
                      <Typography className="text-slate-400 text-sm">
                        {moment(selectedTransaction.date).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </Typography>
                    </div>
                  </div>
                  <IconButton
                    onClick={() => setDialogOpen(false)}
                    className="hover:bg-slate-700/30 transition-colors"
                    sx={{
                      color: "rgba(255, 255, 255, 0.6)",
                      background: "rgba(16, 185, 129, 0.05)",
                      border: "1px solid rgba(16, 185, 129, 0.1)",
                      "&:hover": {
                        background: "rgba(16, 185, 129, 0.1)",
                      },
                    }}
                  >
                    <IoClose className="text-slate-300" />
                  </IconButton>
                </div>

                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  className="border-b border-slate-700/30"
                  textColor="inherit"
                  variant={isMobile ? "fullWidth" : "standard"}
                  TabIndicatorProps={{
                    style: { backgroundColor: "#059669" },
                  }}
                  sx={{
                    "& .MuiTab-root": {
                      color: "#94A3B8",
                      "&.Mui-selected": {
                        color: "#ffffff",
                      },
                      minHeight: isMobile ? "48px" : "64px",
                      fontSize: isMobile ? "0.75rem" : "0.875rem",
                    },
                  }}
                >
                  <Tab
                    label="Overview"
                    icon={<FiList className="text-lg" />}
                    iconPosition="start"
                  />
                  <Tab
                    label="Details"
                    icon={<FiHash className="text-lg" />}
                    iconPosition="start"
                  />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  <div className="space-y-4">
                    <div className="bg-[#1E293B]/40 backdrop-blur-xl p-4 sm:p-6 rounded-xl border border-slate-800/50">
                      <Typography className="text-emerald-400 text-base sm:text-lg font-semibold mb-4">
                        Transaction Information
                      </Typography>
                      <div className="space-y-4">
                        <div>
                          <Typography className="text-slate-400 mb-2 text-sm">
                            Hash
                          </Typography>
                          <Typography className="font-mono break-all text-white bg-slate-900/50 p-3 rounded-lg text-xs sm:text-sm">
                            {selectedTransaction.hash}
                          </Typography>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Typography className="text-slate-400 mb-2 text-sm">
                              From
                            </Typography>
                            <Typography className="font-mono break-all text-white bg-slate-900/50 p-3 rounded-lg text-xs sm:text-sm">
                              {selectedTransaction.from}
                            </Typography>
                          </div>
                          <div>
                            <Typography className="text-slate-400 mb-2 text-sm">
                              To
                            </Typography>
                            <Typography className="font-mono break-all text-white bg-slate-900/50 p-3 rounded-lg text-xs sm:text-sm">
                              {selectedTransaction.to}
                            </Typography>
                          </div>
                        </div>
                        <div>
                          <Typography className="text-slate-400 mb-2 text-sm">
                            Value
                          </Typography>
                          <Typography className="font-mono text-white bg-slate-900/50 p-3 rounded-lg text-xs sm:text-sm">
                            {selectedTransaction.value} CENTI
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <div className="space-y-4">
                    <div className="bg-[#1E293B]/40 backdrop-blur-xl p-4 sm:p-6 rounded-xl border border-slate-800/50">
                      <Typography className="text-emerald-400 text-base sm:text-lg font-semibold mb-4">
                        Additional Details
                      </Typography>
                      <div className="space-y-4">
                        <div>
                          <Typography className="text-slate-400 mb-2 text-sm">
                            Block Number
                          </Typography>
                          <Typography className="font-mono text-white bg-slate-900/50 p-3 rounded-lg text-xs sm:text-sm">
                            {selectedTransaction.block ? (
                              selectedTransaction.block
                            ) : (
                              <span className="text-yellow-400 font-semibold">
                                Pending
                              </span>
                            )}
                          </Typography>
                        </div>
                        <div>
                          <Typography className="text-slate-400 mb-2 text-sm">
                            Timestamp
                          </Typography>
                          <Typography className="font-mono text-white bg-slate-900/50 p-3 rounded-lg text-xs sm:text-sm">
                            {moment(selectedTransaction.date).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </Box>
            )}
          </Dialog>
        </motion.div>
      </Container>
    </div>
  );
}
