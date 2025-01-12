"use client";
import { Block, BaseTransaction } from "@/app/api/types/types";
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
import { FiClock, FiHash, FiBox, FiList } from "react-icons/fi";

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

export default function BlockExplorer() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBlocks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blockscan`, {
        method: "POST",
        body: JSON.stringify({ page }),
      });
      const data = await response.json();
      if (data.status === "success") {
        setBlocks(data.blocks.slice(0, 9));
        setTotalPages(Math.ceil(data.count / 9));
      }
    } catch (error) {
      console.error("Failed to fetch blocks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleBlockClick = (block: Block) => {
    setSelectedBlock(block);
    setDialogOpen(true);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
              staggerChildren: 0.1,
            },
          },
        }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <Typography variant="h3" className="text-gray-100 font-bold">
            Block Explorer
          </Typography>
          <Typography variant="subtitle1" className="text-gray-400">
            Explore the latest blocks in the Centichain network
          </Typography>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <CircularProgress />
          </div>
        ) : (
          <Grid container spacing={3}>
            {blocks.map((block, index) => (
              <Grid item xs={12} sm={6} md={4} key={block.header.hash}>
                <motion.div
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                    },
                  }}
                >
                  <Card
                    onClick={() => handleBlockClick(block)}
                    className="bg-gray-800 hover:bg-gray-700 transition-all cursor-pointer border border-gray-700"
                  >
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Typography variant="h6" className="text-blue-400">
                          Block #{block.header.number}
                        </Typography>
                        <FiBox className="text-gray-400" size={20} />
                      </div>

                      <div className="space-y-2 text-gray-300">
                        <div className="flex items-center gap-2">
                          <FiHash size={16} />
                          <Typography variant="body2" className="truncate">
                            {block.header.hash.substring(0, 20)}...
                          </Typography>
                        </div>

                        <div className="flex items-center gap-2">
                          <FiClock size={16} />
                          <Typography variant="body2">
                            {moment(block.header.date).fromNow()}
                          </Typography>
                        </div>

                        <div className="flex items-center gap-2">
                          <FiList size={16} />
                          <Typography variant="body2">
                            {block.body.transactions.length} transactions
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
          className: "bg-gray-900 text-gray-100",
        }}
      >
        {selectedBlock && (
          <div className="relative">
            <IconButton
              onClick={() => setDialogOpen(false)}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-200"
            >
              <IoClose />
            </IconButton>

            <Box className="p-6">
              <Typography
                variant="h5"
                className="mb-4 text-center text-blue-400"
              >
                Block #{selectedBlock.header.number}
              </Typography>

              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered
                className="border-b border-gray-700"
                TabIndicatorProps={{
                  style: { backgroundColor: "#60A5FA" },
                }}
                sx={{
                  "& .MuiTab-root": { color: "#9CA3AF" },
                  "& .Mui-selected": { color: "#60A5FA" },
                }}
              >
                <Tab label="Overview" />
                <Tab label="Transactions" />
                <Tab label="Coinbase" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
                  <div>
                    <Typography className="text-gray-400">Hash:</Typography>
                    <Typography className="break-all text-gray-200">
                      {selectedBlock.header.hash}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-400">
                      Previous Block:
                    </Typography>
                    <Typography className="break-all text-gray-200">
                      {selectedBlock.header.previous}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-400">
                      Merkle Root:
                    </Typography>
                    <Typography className="break-all text-gray-200">
                      {selectedBlock.header.merkel}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-400">
                      Validator:
                    </Typography>
                    <Typography className="break-all text-gray-200">
                      {selectedBlock.header.validator}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-400">Relay:</Typography>
                    <Typography className="break-all text-gray-200">
                      {selectedBlock.header.relay}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-400">
                      Signature:
                    </Typography>
                    <Typography className="break-all text-gray-200">
                      {selectedBlock.header.signature.signatgure}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-400">
                      Public Key:
                    </Typography>
                    <Typography className="break-all text-gray-200">
                      {selectedBlock.header.signature.key}
                    </Typography>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <div className="space-y-4">
                  {selectedBlock.body.transactions.map(
                    (tx: BaseTransaction, index: number) => (
                      <Card
                        key={index}
                        className="bg-gray-800 border border-gray-700"
                      >
                        <CardContent>
                          <Typography className="break-all text-gray-200">
                            {tx.hash}
                          </Typography>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
                  <div>
                    <Typography className="text-gray-400">Hash:</Typography>
                    <Typography className="break-all text-gray-200">
                      {selectedBlock.body.coinbase.hash}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-400">Size:</Typography>
                    <Typography className="text-gray-200">
                      {selectedBlock.body.coinbase.size}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-400">
                      Merkle Root:
                    </Typography>
                    <Typography className="break-all text-gray-200">
                      {selectedBlock.body.coinbase.merkel}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-400">Reward:</Typography>
                    <Typography className="text-gray-200">
                      {selectedBlock.body.coinbase.data.reward.data.value}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-400">Fees:</Typography>
                    <Typography className="text-gray-200">
                      {selectedBlock.body.coinbase.data.fees}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-400">
                      Relay Fee:
                    </Typography>
                    <Typography className="text-gray-200">
                      {selectedBlock.body.coinbase.data.relay_fee.data.value}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-400">
                      Validator Fee:
                    </Typography>
                    <Typography className="text-gray-200">
                      {
                        selectedBlock.body.coinbase.data.validator_fee.data
                          .value
                      }
                    </Typography>
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
