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
  const itemsPerPage = 5;

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
        body: JSON.stringify({ page, limit: itemsPerPage }),
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
    if (!searchValue.trim()) return;

    try {
      setLoading(true);
      setSearchError("");

      const response = await fetch("/api/block", {
        method: "POST",
        body: JSON.stringify({ searchValue: searchValue.trim() }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setBlocks([data.block]);
        setTotalPages(1);
        setPage(1);
      } else {
        setSearchError(data.message || "Block not found");
        fetchBlocks();
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
      fetchBlocks();
    }
    let interval: NodeJS.Timeout;

    if (autoRefresh && !searchValue.trim()) {
      interval = setInterval(fetchBlocks, 10000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoRefresh, page, searchValue]);

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
    <div className="min-h-screen w-full bg-zinc-950 pt-14">
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col h-full gap-4 max-w-[1920px] mx-auto pt-12"
        >
          <Paper
            elevation={3}
            className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-4 rounded-xl border border-zinc-700 shadow-2xl"
          >
            <div className="space-y-4">
              {/* Title Section */}
              <div className="text-center">
                <Typography
                  variant="h4"
                  className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 tracking-tight"
                >
                  Live Block Explorer
                </Typography>
                <Typography className="text-zinc-400 text-xs">
                  Real-time monitoring of network blocks
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
                      <Typography className="text-xs text-zinc-400">Block Height</Typography>
                      <Typography className="text-base font-semibold text-white">
                        {lastBlockNumber?.toLocaleString()}
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
                  placeholder="Search by block number or hash..."
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

          {/* Blocks List */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <CircularProgress size={40} sx={{ color: "#10B981" }} />
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {blocks.map((block, index) => (
                  <motion.div
                    key={block.header.hash}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card
                      onClick={() => handleBlockClick(block)}
                      className="bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 transition-all duration-300 cursor-pointer border-l-4 border-l-emerald-500 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
                        <div className="flex items-center gap-3">
                          <FiBox className="text-emerald-400 text-xl" />
                          <div>
                            <Typography className="text-emerald-400 text-lg font-semibold">
                              #{block.header.number.toLocaleString()}
                            </Typography>
                            <Typography className="text-gray-400">
                              {moment(block.header.date).fromNow()}
                            </Typography>
                          </div>
                        </div>

                        <div className="sm:col-span-2 hidden sm:block">
                          <Tooltip title="Block Hash" placement="top" arrow>
                            <Typography className="text-white font-mono text-sm truncate bg-zinc-800/50 p-2 rounded-lg">
                              {block.header.hash}
                            </Typography>
                          </Tooltip>
                        </div>

                        <div className="flex items-center justify-end gap-3">
                          <Chip
                            size="medium"
                            icon={<FiList className="text-white" />}
                            label={`${block.body.transactions.length} Transactions`}
                            className="bg-emerald-500/20 text-white hover:bg-emerald-500/30 transition-colors"
                          />
                          <BsArrowRight className="text-emerald-400 text-xl" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                size="large"
                variant="outlined"
                shape="rounded"
                className="bg-zinc-900/50 p-3 rounded-xl"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "white",
                    borderColor: "#4B5563",
                    fontSize: "1rem",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#10B981 !important",
                    color: "white",
                    borderColor: "#10B981",
                  },
                  "& .MuiPaginationItem-root:hover": {
                    backgroundColor: "#4B5563",
                  },
                }}
              />
            </div>
          )}

          {/* Block Details Dialog */}
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            maxWidth="lg"
            fullWidth
            PaperProps={{
              className:
                "bg-gradient-to-b from-gray-900 to-black text-white rounded-xl",
            }}
          >
            {selectedBlock && (
              <Box className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <Typography className="text-xl font-bold text-emerald-400">
                    Block #{selectedBlock.header.number.toLocaleString()}
                  </Typography>
                  <IconButton
                    onClick={() => setDialogOpen(false)}
                    className="hover:bg-zinc-800 transition-colors"
                  >
                    <IoClose className="text-gray-400 text-xl" />
                  </IconButton>
                </div>

                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  className="border-b border-zinc-800 mb-6"
                  textColor="inherit"
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#10B981",
                      height: "3px",
                    },
                  }}
                  sx={{
                    "& .MuiTab-root": {
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textTransform: "none",
                      minWidth: "120px",
                    },
                    "& .Mui-selected": {
                      color: "#10B981",
                    },
                  }}
                >
                  <Tab label="Overview" />
                  <Tab label="Coinbase" />
                  <Tab label="Transactions" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 rounded-xl border border-zinc-700">
                      <Typography className="text-emerald-400 text-lg font-semibold mb-4">
                        Block Information
                      </Typography>
                      <div className="space-y-4">
                        <div>
                          <Typography className="text-gray-400 mb-2">
                            Block Hash
                          </Typography>
                          <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                            {selectedBlock.header.hash}
                          </Typography>
                        </div>
                        <div>
                          <Typography className="text-gray-400 mb-2">
                            Previous Hash
                          </Typography>
                          <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                            {selectedBlock.header.previous}
                          </Typography>
                        </div>
                        <div>
                          <Typography className="text-gray-400 mb-2">
                            Merkle Root
                          </Typography>
                          <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                            {selectedBlock.header.merkel}
                          </Typography>
                        </div>
                        <div>
                          <Typography className="text-gray-400 mb-2">
                            Timestamp
                          </Typography>
                          <Typography className="font-mono text-white bg-zinc-800/50 p-3 rounded-lg">
                            {moment(selectedBlock.header.date).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </Typography>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 rounded-xl border border-zinc-700">
                        <div className="flex items-center gap-3 mb-4">
                          <FaUserShield className="text-emerald-400 text-xl" />
                          <Typography className="text-emerald-400 text-lg font-semibold">
                            Validator
                          </Typography>
                        </div>
                        <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                          {selectedBlock.header.validator}
                        </Typography>
                      </div>

                      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 rounded-xl border border-zinc-700">
                        <div className="flex items-center gap-3 mb-4">
                          <FaServer className="text-emerald-400 text-xl" />
                          <Typography className="text-emerald-400 text-lg font-semibold">
                            Relay
                          </Typography>
                        </div>
                        <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                          {selectedBlock.header.relay}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <div className="space-y-6">
                    {/* Reward Transaction */}
                    <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 rounded-xl border border-zinc-700">
                      <Typography className="text-emerald-400 text-lg font-semibold mb-4">
                        Reward Transaction
                      </Typography>
                      <div className="space-y-4">
                        <div>
                          <Typography className="text-gray-400 mb-2">
                            Hash
                          </Typography>
                          <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                            {selectedBlock.body.coinbase.data.reward.hash}
                          </Typography>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Typography className="text-gray-400 mb-2">
                              From
                            </Typography>
                            <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                              {
                                selectedBlock.body.coinbase.data.reward.data
                                  .from
                              }
                            </Typography>
                          </div>
                          <div>
                            <Typography className="text-gray-400 mb-2">
                              To
                            </Typography>
                            <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                              {selectedBlock.body.coinbase.data.reward.data.to}
                            </Typography>
                          </div>
                        </div>
                        <div>
                          <Typography className="text-gray-400 mb-2">
                            Value
                          </Typography>
                          <Typography className="font-mono text-white bg-zinc-800/50 p-3 rounded-lg">
                            {selectedBlock.body.coinbase.data.reward.data.value}{" "}
                            CENTI
                          </Typography>
                        </div>
                      </div>
                    </div>

                    {/* Relay Fee Transaction */}
                    <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 rounded-xl border border-zinc-700">
                      <Typography className="text-emerald-400 text-lg font-semibold mb-4">
                        Relay Fee Transaction
                      </Typography>
                      <div className="space-y-4">
                        <div>
                          <Typography className="text-gray-400 mb-2">
                            Hash
                          </Typography>
                          <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                            {selectedBlock.body.coinbase.data.relay_fee.hash}
                          </Typography>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Typography className="text-gray-400 mb-2">
                              From
                            </Typography>
                            <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                              {
                                selectedBlock.body.coinbase.data.relay_fee.data
                                  .from
                              }
                            </Typography>
                          </div>
                          <div>
                            <Typography className="text-gray-400 mb-2">
                              To
                            </Typography>
                            <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                              {
                                selectedBlock.body.coinbase.data.relay_fee.data
                                  .to
                              }
                            </Typography>
                          </div>
                        </div>
                        <div>
                          <Typography className="text-gray-400 mb-2">
                            Value
                          </Typography>
                          <Typography className="font-mono text-white bg-zinc-800/50 p-3 rounded-lg">
                            {
                              selectedBlock.body.coinbase.data.relay_fee.data
                                .value
                            }{" "}
                            CENTI
                          </Typography>
                        </div>
                      </div>
                    </div>

                    {/* Validator Fee Transaction */}
                    <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 rounded-xl border border-zinc-700">
                      <Typography className="text-emerald-400 text-lg font-semibold mb-4">
                        Validator Fee Transaction
                      </Typography>
                      <div className="space-y-4">
                        <div>
                          <Typography className="text-gray-400 mb-2">
                            Hash
                          </Typography>
                          <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                            {
                              selectedBlock.body.coinbase.data.validator_fee
                                .hash
                            }
                          </Typography>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Typography className="text-gray-400 mb-2">
                              From
                            </Typography>
                            <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                              {
                                selectedBlock.body.coinbase.data.validator_fee
                                  .data.from
                              }
                            </Typography>
                          </div>
                          <div>
                            <Typography className="text-gray-400 mb-2">
                              To
                            </Typography>
                            <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                              {
                                selectedBlock.body.coinbase.data.validator_fee
                                  .data.to
                              }
                            </Typography>
                          </div>
                        </div>
                        <div>
                          <Typography className="text-gray-400 mb-2">
                            Value
                          </Typography>
                          <Typography className="font-mono text-white bg-zinc-800/50 p-3 rounded-lg">
                            {
                              selectedBlock.body.coinbase.data.validator_fee
                                .data.value
                            }{" "}
                            CENTI
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <div className="space-y-3">
                    {selectedBlock.body.transactions.map(
                      (tx: BaseTransaction, index: number) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-4 rounded-xl hover:from-zinc-800 hover:to-zinc-700 transition-colors border border-zinc-700"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <FiHash className="text-emerald-400 text-lg" />
                            <Typography className="text-emerald-400 font-semibold">
                              Transaction #{index + 1}
                            </Typography>
                          </div>
                          <Typography className="font-mono break-all text-white bg-zinc-800/50 p-3 rounded-lg">
                            {tx.hash}
                          </Typography>
                        </div>
                      )
                    )}
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
