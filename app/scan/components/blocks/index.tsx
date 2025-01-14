"use client";
import { Block, BaseTransaction } from "@/app/api/types/types";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import moment from "moment";
import {
  Container,
  Typography,
  Grid,
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
  Divider,
  Paper,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FiClock, FiHash, FiBox, FiList, FiSearch } from "react-icons/fi";
import { RiNodeTree } from "react-icons/ri";
import { BsArrowRight } from "react-icons/bs";

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
  const itemsPerPage = 5;

  const fetchTotalBlocks = async () => {
    try {
      const response = await fetch('/api/blocks');
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
      
      const response = await fetch('/api/block', {
        method: 'POST',
        body: JSON.stringify({ searchValue: searchValue.trim() })
      });
      
      const data = await response.json();
      
      if (data.status === "success") {
        setBlocks([data.block]);
        setTotalPages(1);
        setPage(1);
      } else {
        setSearchError(data.message || "Block not found");
        fetchBlocks(); // Revert to normal view
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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setSearchValue("");
  };

  return (
    <Container maxWidth="xl" className="h-full flex flex-col p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-full"
      >
        <div className="mb-6 text-center">
          <Typography variant="h3" className="text-gray-100 font-bold mb-4 text-2xl sm:text-3xl md:text-4xl">
            Live Blockchain Explorer
          </Typography>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-400 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <RiNodeTree className="text-green-400" />
              <span>Latest Height: {lastBlockNumber || 0}</span>
            </div>
            <FormControlLabel
              control={
                <Switch
                  checked={autoRefresh}
                  onChange={toggleAutoRefresh}
                  className="text-blue-400"
                />
              }
              label={
                <div className="flex items-center gap-2">
                  <FiClock className={autoRefresh ? "text-blue-400" : "text-gray-400"} />
                  <span>{autoRefresh ? "Auto-refreshing" : "Auto-refresh disabled"}</span>
                </div>
              }
              className="ml-0 sm:ml-4"
            />
          </div>
          
          <div className="mt-4 flex justify-center items-center gap-2 px-4 sm:px-0">
            <TextField
              placeholder="Search by block number or hash"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setSearchError("");
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-gray-800 rounded-lg w-full sm:w-96"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSearch}>
                    <FiSearch className="text-gray-400" />
                  </IconButton>
                ),
              }}
            />
          </div>
          {searchError && (
            <Typography className="text-red-500 mt-2 text-sm">
              {searchError}
            </Typography>
          )}
        </div>

        {loading ? (
          <div className="flex-grow flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex flex-col flex-grow">
            <div className="flex-grow overflow-y-auto space-y-4 mb-4">
              {blocks.map((block, index) => (
                <motion.div
                  key={block.header.hash}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    onClick={() => handleBlockClick(block)}
                    className="bg-gray-800 hover:bg-gray-700 transition-all cursor-pointer border-l-4 border-l-blue-500 border-gray-700"
                  >
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center gap-3">
                        <FiBox className="text-blue-400 text-xl sm:text-2xl" />
                        <div>
                          <Typography variant="h6" className="text-blue-400 text-base sm:text-lg">
                            #{block.header.number}
                          </Typography>
                          <Typography variant="caption" className="text-gray-400 text-xs sm:text-sm">
                            {moment(block.header.date).fromNow()}
                          </Typography>
                        </div>
                      </div>

                      <div className="sm:col-span-2 hidden sm:block">
                        <Tooltip title="Block Hash" placement="top">
                          <Typography className="text-gray-300 font-mono text-sm truncate">
                            {block.header.hash}
                          </Typography>
                        </Tooltip>
                      </div>

                      <div className="flex items-center justify-end gap-4">
                        <Chip 
                          icon={<FiList className="text-gray-300" />}
                          label={`${block.body.transactions.length} TXs`}
                          className="bg-gray-700 text-gray-300 text-xs sm:text-sm"
                        />
                        <BsArrowRight className="text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-auto py-4">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                siblingCount={0}
                boundaryCount={1}
                size="small"
                className="bg-gray-800 p-2 rounded-lg"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#9CA3AF',
                    borderColor: '#4B5563',
                    margin: '0 2px',
                    minWidth: '28px',
                    height: '28px',
                    '@media (min-width: 640px)': {
                      margin: '0 4px',
                      minWidth: '32px',
                      height: '32px',
                    },
                  },
                  '& .Mui-selected': {
                    backgroundColor: '#3B82F6 !important',
                    color: 'white',
                  },
                }}
              />
            </div>
          </div>
        )}

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            className: "bg-gray-900 text-gray-100 m-4",
          }}
        >
          {selectedBlock && (
            <Box className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <Typography variant="h5" className="text-blue-400 text-lg sm:text-xl">
                  Block Details #{selectedBlock.header.number}
                </Typography>
                <IconButton
                  onClick={() => setDialogOpen(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <IoClose />
                </IconButton>
              </div>

              <Paper elevation={3} className="bg-gray-800 p-4 sm:p-6 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                  <div className="text-base sm:text-lg font-semibold text-blue-400">
                    Block #{selectedBlock.header.number}
                  </div>
                  <Divider orientation="vertical" flexItem className="hidden sm:block bg-gray-600" />
                  <Typography className="text-gray-400 text-sm">
                    {moment(selectedBlock.header.date).format('MMMM Do YYYY, h:mm:ss a')}
                  </Typography>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <Typography className="text-gray-400 text-xs sm:text-sm mb-1">Block Hash</Typography>
                    <Typography className="text-gray-200 font-mono text-sm break-all">
                      {selectedBlock.header.hash}
                    </Typography>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <Typography className="text-gray-400 text-xs sm:text-sm mb-1">Previous Block Hash</Typography>
                      <Typography className="text-gray-200 font-mono text-sm break-all">
                        {selectedBlock.header.previous}
                      </Typography>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-lg">
                      <Typography className="text-gray-400 text-xs sm:text-sm mb-1">Merkle Root</Typography>
                      <Typography className="text-gray-200 font-mono text-sm break-all">
                        {selectedBlock.header.merkel}
                      </Typography>
                    </div>
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                      <Typography className="text-gray-400 text-xs sm:text-sm">Transactions</Typography>
                      <Chip 
                        icon={<FiList className="text-blue-400" />}
                        label={`${selectedBlock.body.transactions.length} Transactions`}
                        className="bg-blue-500/10 text-blue-400 border border-blue-400 text-xs sm:text-sm"
                      />
                    </div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {selectedBlock.body.transactions.map((tx: BaseTransaction, index: number) => (
                        <div key={index} className="p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-400 transition-colors">
                          <div className="flex items-center gap-2 mb-1">
                            <FiHash className="text-blue-400" />
                            <Typography className="text-gray-400 text-xs sm:text-sm">Transaction #{index + 1}</Typography>
                          </div>
                          <Typography className="text-gray-200 font-mono text-xs sm:text-sm break-all">
                            {tx.hash}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Paper>
            </Box>
          )}
        </Dialog>
      </motion.div>
    </Container>
  );
}
