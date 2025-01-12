"use client";
import { TrxScan } from "@/app/api/types/types";
import { motion, AnimatePresence } from "framer-motion";
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
  Tabs,
  Tab,
  Box,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FiClock, FiHash, FiList } from "react-icons/fi";
import { BiTransfer } from "react-icons/bi";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function TransactionExplorer() {
  const [transactions, setTransactions] = useState<TrxScan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<TrxScan | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/trxscan`, {
        method: "POST",
        body: JSON.stringify({ page }),
      });
      const data = await response.json();
      if (data.status === "success") {
        setTransactions(data.trxs.slice(0, 9));
        setTotalPages(Math.ceil(data.count / 9));
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleTransactionClick = (transaction: TrxScan) => {
    setSelectedTransaction(transaction);
    setDialogOpen(true);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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

  return (
    <Container maxWidth="xl" className="py-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <Typography variant="h3" className="text-gray-100 font-bold">
            Transaction Explorer
          </Typography>
          <Typography variant="subtitle1" className="text-gray-400">
            Explore the latest transactions in the Centichain network
          </Typography>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <CircularProgress />
          </div>
        ) : (
          <Grid container spacing={3}>
            {transactions.map((transaction, index) => (
              <Grid item xs={12} sm={6} md={4} key={transaction.hash}>
                <motion.div
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1
                    }
                  }}
                >
                  <Card 
                    onClick={() => handleTransactionClick(transaction)}
                    className="bg-gray-800 hover:bg-gray-700 transition-all cursor-pointer border border-gray-700"
                  >
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Typography variant="h6" className="text-blue-400">
                          Transaction
                        </Typography>
                        <BiTransfer className="text-gray-400" size={20} />
                      </div>
                      
                      <div className="space-y-2 text-gray-300">
                        <div className="flex items-center gap-2">
                          <FiHash size={16} />
                          <Typography variant="body2" className="truncate">
                            {transaction.hash.substring(0, 20)}...
                          </Typography>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <FiClock size={16} />
                          <Typography variant="body2">
                            {moment(transaction.date).fromNow()}
                          </Typography>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Typography variant="body2" className={getStatusColor(transaction.status)}>
                            Status: {transaction.status}
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        <div className="flex justify-center pt-4">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            className="bg-gray-800 p-2 rounded-lg"
          />
        </div>
      </motion.div>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          className: "bg-gray-900 text-gray-100"
        }}
      >
        {selectedTransaction && (
          <div className="relative">
            <IconButton
              onClick={() => setDialogOpen(false)}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-200"
            >
              <IoClose />
            </IconButton>
            
            <Box className="p-6">
              <Typography variant="h5" className="mb-4 text-center text-blue-400">
                Transaction Details
              </Typography>
              
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered
                className="border-b border-gray-700"
                TabIndicatorProps={{
                  style: { backgroundColor: '#60A5FA' }
                }}
                sx={{
                  '& .MuiTab-root': { color: '#9CA3AF' },
                  '& .Mui-selected': { color: '#60A5FA' }
                }}
              >
                <Tab label="Overview" />
                <Tab label="Details" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
                  <div>
                    <Typography className="text-gray-400">Hash:</Typography>
                    <Typography className="break-all text-gray-200">{selectedTransaction.hash}</Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-400">From:</Typography>
                    <Typography className="break-all text-gray-200">{selectedTransaction.from}</Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-400">To:</Typography>
                    <Typography className="break-all text-gray-200">{selectedTransaction.to}</Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-400">Value:</Typography>
                    <Typography className="text-gray-200">{Number(selectedTransaction.value).toLocaleString()}</Typography>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
                  <div>
                    <Typography className="text-gray-400">Status:</Typography>
                    <Typography className={`text-gray-200 ${getStatusColor(selectedTransaction.status)}`}>
                      {selectedTransaction.status}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-400">Date:</Typography>
                    <Typography className="text-gray-200">{selectedTransaction.date}</Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-400">Age:</Typography>
                    <Typography className="text-gray-200">{moment(selectedTransaction.date).fromNow()}</Typography>
                  </div>
                </div>
              </TabPanel>
            </Box>
          </div>
        )}
      </Dialog>
    </Container>
  );
}
