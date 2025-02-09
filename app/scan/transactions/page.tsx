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

export default function TransactionExplorer() {
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
  const itemsPerPage = 5;

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

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    try {
      setLoading(true);
      setSearchError("");

      const response = await fetch("/api/trx", {
        method: "POST",
        body: JSON.stringify({ hash: searchValue.trim() }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setTransactions([data.transaction]);
        setTotalPages(1);
        setPage(1);
      } else {
        setSearchError(data.message || "Transaction not found");
        fetchTransactions();
      }
    } catch (error) {
      console.error("Search failed:", error);
      setSearchError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchValue.trim()) {
      fetchTransactions();
    }
    let interval: NodeJS.Timeout;

    if (autoRefresh && !searchValue.trim()) {
      interval = setInterval(fetchTransactions, 10000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoRefresh, page, searchValue]);

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
    <div className="min-h-screen w-full bg-zinc-950 pt-[80px]">
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={3}
            className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-4 rounded-xl border border-zinc-700 shadow-2xl mb-5"
          >
            <div className="space-y-4">
              {/* Title Section */}
              <div className="text-center">
                <Typography
                  variant="h4"
                  className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 tracking-tight"
                >
                  Live Transaction Explorer
                </Typography>
                <Typography className="text-zinc-400 text-xs">
                  Real-time monitoring of network transactions
                </Typography>
              </div>

              {/* Stats Section */}
              <div className="flex flex-wrap justify-center items-center gap-3">
                <div className="flex items-center gap-3 bg-zinc-800/50 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-zinc-700/50">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-emerald-400/10 rounded-lg">
                      <RiNodeTree className="text-emerald-400 text-base" />
                    </div>
                    <div>
                      <Typography className="text-xs text-zinc-400">Total Transactions</Typography>
                      <Typography className="text-base font-semibold text-white">
                        {lastTrxCount?.toLocaleString()}
                      </Typography>
                    </div>
                  </div>
                  
                  <div className="h-6 w-px bg-zinc-700/50" />
                  
                  <div
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={toggleAutoRefresh}
                  >
                    <div className={`p-1 rounded-lg transition-colors ${
                      autoRefresh ? 'bg-emerald-400/10' : 'bg-zinc-700/30'
                    }`}>
                      <FiClock className={`text-base transition-colors ${
                        autoRefresh ? 'text-emerald-400' : 'text-zinc-400'
                      }`} />
                    </div>
                    <div>
                      <Typography className="text-xs text-zinc-400">Auto Refresh</Typography>
                      <Typography className={`text-xs font-medium transition-colors ${
                        autoRefresh ? 'text-emerald-400' : 'text-white'
                      }`}>
                        {autoRefresh ? 'Active' : 'Inactive'}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Section */}
              <div className="max-w-xl mx-auto relative">
                <TextField
                  fullWidth
                  placeholder="Search by transaction hash..."
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setSearchError("");
                  }}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="bg-zinc-800/30 rounded-xl shadow-lg transition-all duration-200 hover:shadow-emerald-900/20"
                  InputProps={{
                    startAdornment: (
                      <IconButton
                        onClick={handleSearch}
                        size="small"
                        className="hover:bg-emerald-500/10 transition-colors duration-200"
                      >
                        <FiSearch className="text-emerald-400 text-base" />
                      </IconButton>
                    ),
                    endAdornment: searchValue && (
                      <IconButton
                        onClick={() => {
                          setSearchValue("");
                          setSearchError("");
                        }}
                        size="small"
                        className="hover:bg-red-500/10 transition-colors duration-200 mr-1"
                      >
                        <IoClose className="text-red-400 hover:text-red-300" />
                      </IconButton>
                    ),
                    className: "rounded-xl",
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(16, 185, 129, 0.1)",
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(16, 185, 129, 0.2)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#10B981",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                      padding: "8px 10px",
                      fontSize: "0.875rem",
                      "&::placeholder": {
                        color: "rgb(156 163 175)",
                        opacity: 0.7,
                      },
                    },
                  }}
                />
                {searchError && (
                  <Typography className="text-red-400 mt-1 text-xs flex items-center gap-1 justify-center animate-pulse">
                    <IoClose className="text-sm" />
                    {searchError}
                  </Typography>
                )}
              </div>
            </div>
          </Paper>

          {loading ? (
            <div className="flex justify-center my-8">
              <CircularProgress />
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {transactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.hash}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card
                      onClick={() => handleTransactionClick(transaction)}
                      className="bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 transition-colors cursor-pointer border border-zinc-700"
                    >
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FiHash className="text-emerald-400 text-lg" />
                            <div>
                              <Typography className="text-white font-mono">
                                {transaction.hash}
                              </Typography>
                              <div className="flex items-center gap-2">
                                <Typography
                                  variant="body2"
                                  className="text-gray-400"
                                >
                                  {moment(transaction.date).fromNow()}
                                </Typography>
                                <Chip
                                  label={transaction.block ? "Confirmed" : "Pending"}
                                  size="small"
                                  className={`${
                                    transaction.block 
                                      ? "bg-emerald-400/10 text-emerald-400" 
                                      : "bg-yellow-400/10 text-yellow-400"
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                          <Chip
                            label={`${transaction.value} CENTI`}
                            className="bg-zinc-800 text-emerald-400"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && transactions.length > 0 && (
            <div className="flex justify-center mt-6">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                className="bg-zinc-900 p-2 rounded-lg"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#9CA3AF",
                    borderColor: "#4B5563",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#059669 !important",
                    color: "white",
                  },
                }}
              />
            </div>
          )}

          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            maxWidth="md"
            fullWidth
            PaperProps={{
              className: "bg-zinc-900",
            }}
          >
            {selectedTransaction && (
              <Box className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <Typography variant="h6" className="text-emerald-400">
                    Transaction Details
                  </Typography>
                  <IconButton
                    onClick={() => setDialogOpen(false)}
                    className="text-gray-400"
                  >
                    <IoClose />
                  </IconButton>
                </div>

                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  className="border-b border-zinc-700"
                  textColor="inherit"
                  TabIndicatorProps={{
                    style: { backgroundColor: "#059669" },
                  }}
                  sx={{
                    "& .MuiTab-root": {
                      color: "#9CA3AF",
                      "&.Mui-selected": {
                        color: "#ffffff"
                      }
                    }
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
                    <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 rounded-xl border border-zinc-700">
                      <Typography className="text-emerald-400 text-lg font-semibold mb-4">
                        Transaction Information
                      </Typography>
                      <div className="space-y-4">
                        <div>
                          <Typography className="text-gray-400 mb-2">
                            Hash
                          </Typography>
                          <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                            {selectedTransaction.hash}
                          </Typography>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Typography className="text-gray-400 mb-2">
                              From
                            </Typography>
                            <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                              {selectedTransaction.from}
                            </Typography>
                          </div>
                          <div>
                            <Typography className="text-gray-400 mb-2">
                              To
                            </Typography>
                            <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                              {selectedTransaction.to}
                            </Typography>
                          </div>
                        </div>
                        <div>
                          <Typography className="text-gray-400 mb-2">
                            Value
                          </Typography>
                          <Typography className="font-mono text-white bg-zinc-800/50 p-3 rounded-lg">
                            {selectedTransaction.value} CENTI
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 rounded-xl border border-zinc-700">
                      <Typography className="text-emerald-400 text-lg font-semibold mb-4">
                        Additional Details
                      </Typography>
                      <div className="space-y-4">
                        <div>
                          <Typography className="text-gray-400 mb-2">
                            Block Number
                          </Typography>
                          <Typography className="font-mono text-white bg-zinc-800/50 p-3 rounded-lg">
                            {selectedTransaction.block ? (
                              selectedTransaction.block
                            ) : (
                              <span className="text-yellow-400 font-semibold">Pending</span>
                            )}
                          </Typography>
                        </div>
                        <div>
                          <Typography className="text-gray-400 mb-2">
                            Timestamp
                          </Typography>
                          <Typography className="font-mono text-white bg-zinc-800/50 p-3 rounded-lg">
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
