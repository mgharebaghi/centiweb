"use client";
import { TrxScan } from "@/app/api/types/types";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FiClock, FiHash, FiList, FiSearch } from "react-icons/fi";
import { RiNodeTree } from "react-icons/ri";
import { BsArrowRight, BsCheckCircleFill, BsXCircleFill, BsClockFill } from "react-icons/bs";

export default function TransactionExplorer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [transactions, setTransactions] = useState<TrxScan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<TrxScan | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchError, setSearchError] = useState("");
  const [lastTrxCount, setLastTrxCount] = useState(0);
  const itemsPerPage = isMobile ? 3 : isTablet ? 4 : 5;

  const fetchTotalTransactions = async () => {
    try {
      const response = await fetch('/api/trxcount');
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
        body: JSON.stringify({ page }),
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
      
      const response = await fetch('/api/trx', {
        method: 'POST',
        body: JSON.stringify({ hash: searchValue.trim() })
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
      setSearchError("");
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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setSearchValue("");
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'confirmed':
      case 'success':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'confirmed':
      case 'success':
        return <BsCheckCircleFill className="text-green-500 text-2xl" />;
      case 'pending':
        return <BsClockFill className="text-yellow-500 text-2xl" />;
      case 'failed':
        return <BsXCircleFill className="text-red-500 text-2xl" />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth={isMobile ? "sm" : "xl"} className="h-full flex flex-col p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-full"
      >
        <div className="mb-4 sm:mb-6 text-center">
          <Typography variant={isMobile ? "h4" : "h3"} className="text-gray-100 font-bold mb-4 text-2xl sm:text-3xl md:text-4xl">
            Live Transaction Explorer
          </Typography>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <RiNodeTree className="text-green-400" />
              <span className="text-sm sm:text-base">Total Transactions: {lastTrxCount || 0}</span>
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
                  <span className="text-sm sm:text-base">{autoRefresh ? "Auto-refreshing" : "Auto-refresh disabled"}</span>
                </div>
              }
              className="ml-0 sm:ml-4"
            />
          </div>
          
          <div className="mt-4 flex justify-center items-center gap-2">
            <TextField
              placeholder="Search by transaction hash"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setSearchError("");
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-gray-800 rounded-lg w-full sm:w-96"
              size={isMobile ? "small" : "medium"}
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
            <Typography className="text-red-500 mt-2 text-sm sm:text-base">
              {searchError}
            </Typography>
          )}
        </div>

        {loading ? (
          <div className="flex-grow flex justify-center items-center">
            <CircularProgress size={isMobile ? 30 : 40} />
          </div>
        ) : (
          <div className="flex flex-col flex-grow">
            <div className="flex-grow overflow-y-auto space-y-2 sm:space-y-4 mb-4">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.hash}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    onClick={() => handleTransactionClick(transaction)}
                    className="bg-gray-800 hover:bg-gray-700 transition-all cursor-pointer border-l-4 border-l-blue-500 border-gray-700"
                  >
                    <CardContent className={`grid grid-cols-1 ${isMobile ? 'gap-2' : 'md:grid-cols-12 gap-4'} items-center p-3 sm:p-4`}>
                      <div className={`flex items-center ${!isMobile && 'md:col-span-2'}`}>
                        <div className="flex flex-col">
                          <Typography variant={isMobile ? "subtitle1" : "h6"} className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Typography>
                          <Typography variant="caption" className="text-gray-400">
                            {moment(transaction.date).fromNow()}
                          </Typography>
                        </div>
                      </div>

                      <div className={`${!isMobile && 'md:col-span-7'} flex items-center`}>
                        <Tooltip title="Transaction Hash" placement="top">
                          <Typography className="text-gray-300 font-mono truncate text-sm sm:text-base">
                            {isMobile ? transaction.hash.slice(0, 20) + '...' : transaction.hash}
                          </Typography>
                        </Tooltip>
                      </div>

                      <div className={`flex items-center justify-end gap-2 ${!isMobile && 'md:col-span-3'}`}>
                        <Chip 
                          icon={<FiList className="text-gray-300" />}
                          label={`${transaction.value} CENTI`}
                          className="bg-gray-700 text-gray-300"
                          size={isMobile ? "small" : "medium"}
                        />
                        <BsArrowRight className="text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-auto py-2 sm:py-4">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                siblingCount={isMobile ? 0 : 1}
                boundaryCount={isMobile ? 0 : 1}
                size={isMobile ? "small" : "medium"}
                className="bg-gray-800 p-2 rounded-lg"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#9CA3AF',
                    borderColor: '#4B5563',
                    margin: isMobile ? '0 1px' : '0 4px',
                    minWidth: isMobile ? '28px' : '32px',
                    height: isMobile ? '28px' : '32px',
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                  },
                  '& .Mui-selected': {
                    backgroundColor: '#3B82F6 !important',
                    color: 'white',
                  }
                }}
              />
            </div>
          </div>
        )}

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          maxWidth="md"
          fullWidth
          fullScreen={isMobile}
          PaperProps={{
            className: "bg-gray-900 text-gray-100",
          }}
        >
          {selectedTransaction && (
            <Box className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-4">
                  {getStatusIcon(selectedTransaction.status)}
                  <Typography variant={isMobile ? "h6" : "h5"} className="text-blue-400">
                    Transaction Details
                  </Typography>
                </div>
                <IconButton
                  onClick={() => setDialogOpen(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <IoClose />
                </IconButton>
              </div>

              <Paper elevation={3} className="bg-gray-800 p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
                  <div className={`text-base sm:text-lg font-semibold ${getStatusColor(selectedTransaction.status)}`}>
                    {selectedTransaction.status}
                  </div>
                  <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem className="bg-gray-600" />
                  <Typography className="text-gray-400 text-sm sm:text-base">
                    {moment(selectedTransaction.date).format('MMMM Do YYYY, h:mm:ss a')}
                  </Typography>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                    <Typography className="text-gray-400 text-xs sm:text-sm mb-1">Transaction Hash</Typography>
                    <Typography className="text-gray-200 font-mono break-all text-sm sm:text-base">
                      {selectedTransaction.hash}
                    </Typography>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                      <Typography className="text-gray-400 text-xs sm:text-sm mb-1">From</Typography>
                      <Typography className="text-gray-200 font-mono break-all text-sm sm:text-base">
                        {selectedTransaction.from}
                      </Typography>
                    </div>

                    <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                      <Typography className="text-gray-400 text-xs sm:text-sm mb-1">To</Typography>
                      <Typography className="text-gray-200 font-mono break-all text-sm sm:text-base">
                        {selectedTransaction.to}
                      </Typography>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                      <Typography className="text-gray-400 text-xs sm:text-sm mb-1">Value</Typography>
                      <div className="flex items-center gap-2">
                        <Chip 
                          icon={<FiList className="text-blue-400" />}
                          label={`${selectedTransaction.value} CENTI`}
                          className="bg-blue-500/10 text-blue-400 border border-blue-400"
                          size={isMobile ? "small" : "medium"}
                        />
                      </div>
                    </div>

                    <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                      <Typography className="text-gray-400 text-xs sm:text-sm mb-1">Block Number</Typography>
                      <Typography className="text-gray-200 font-mono text-sm sm:text-base">
                        {selectedTransaction.block || 'Pending'}
                      </Typography>
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
