"use client";
import { Block, BlocksScan } from "@/app/api/types/types";
import { Pagination, Typography, Card, CardContent, Grid, Modal, Box, Divider, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import { SyncLoader } from "react-spinners";
import { BiCloset } from "react-icons/bi";
import { GrClose } from "react-icons/gr";

export default function ScanedBlocks() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<BlocksScan[]>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [selectedBlock, setSelectedBlock] = useState<BlocksScan | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const fillDataSource = async () => {
    setLoading(true);
    setDataSource([]);
    await fetch("/api/blockscan", {
      method: "POST",
      body: JSON.stringify({ page: page }),
      cache: "no-store"
    }).then((res) => {
      if (!res.ok) {
        setLoading(false);
        console.log("err from server");
      } else {
        res.json().then(async (data) => {
          if (data.status === "success") {
            setLoading(false);
            if (page === 1) {
              setCount(Math.ceil(data.blocks[0].header.number / 9));
            }
            setDataSource(data.blocks.slice(0, 9));
          } else {
            setLoading(false);
            console.log(data.status);
          }
        });
      }
    });
  };

  useEffect(() => {
    fillDataSource();
  }, [page]);

  const handlePagination = (event: any, pageNum: number) => {
    setPage(pageNum);
  };

  const handleBlockClick = (block: BlocksScan) => {
    setSelectedBlock(block);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getAge = (date: string) => {
    let blockDate = moment.utc(date);
    let now = moment.now();
    let age = moment.duration(blockDate.diff(now));
    return age.humanize() + " ago";
  };

  return (
    <div className="w-full flex flex-col bg-gray-900 p-4">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg mb-6">
        <Typography variant="h4" className="text-white font-bold text-center">
          Blockchain Explorer
        </Typography>
        <Typography variant="subtitle1" className="text-gray-200 text-center mt-2">
          Discover the latest blocks
        </Typography>
      </div>
      <div className="flex-grow flex flex-col">
        <div className="w-full min-h-[650px] mb-4">
          {!loading ? (
            <Grid container spacing={4} justifyContent="center" alignItems="stretch">
              {dataSource.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    className="bg-gray-900 text-gray-300 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 h-full flex flex-col justify-between"
                    onClick={() => handleBlockClick(item)}
                  >
                    <CardContent className="p-4 flex flex-col h-full">
                      <Typography variant="h6" className="text-blue-400 mb-4 font-bold text-center">
                        <span className="mr-2">📦</span>
                        Block #{item.header.number.toLocaleString()}
                      </Typography>
                      <div className="flex-grow flex flex-col justify-center">
                        <Typography variant="body2" className="mb-3 text-gray-400 text-center">
                          <span className="mr-2">🔗</span>
                          Hash: {item.header.hash.substring(0, 20)}...
                        </Typography>
                        <Typography variant="body2" className="mb-3 text-gray-400 text-center">
                          <span className="mr-2">⏳</span>
                          Age: {getAge(item.header.date)}
                        </Typography>
                        <Typography variant="body2" className="text-gray-400 text-center">
                          <span className="mr-2">💼</span>
                          Transactions: {item.body.transactions.length.toLocaleString()}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <div className="h-full flex items-center justify-center">
              <SyncLoader size={5} color="#9CA3AF" />
            </div>
          )}
        </div>
        <div className="w-full flex justify-center">
          <Pagination
            page={page}
            count={count}
            onChange={handlePagination}
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#9CA3AF',
              },
              '& .Mui-selected': {
                backgroundColor: '#4B5563',
              },
            }}
          />
        </div>
      </div>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="block-details-modal"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 900,
          maxHeight: '90vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          bgcolor: 'background.paper',
          border: '2px solid #4B5563',
          boxShadow: 24,
          p: 4,
          backgroundColor: '#1F2937',
          color: '#E5E7EB',
          borderRadius: '12px',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#374151',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#4B5563',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#6B7280',
          },
        }}>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#9CA3AF',
            }}
          >
            <GrClose />
          </IconButton>
          <Typography id="modal-modal-title" variant="h5" component="h2" className="text-blue-400 mb-4 font-bold text-center">
            Block Details
          </Typography>
          {selectedBlock && (
            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <Typography variant="h6" className="text-green-400 mb-4 text-center">Header Information</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography className="text-gray-400">Block Number:</Typography>
                    <Typography className="font-semibold">{selectedBlock.header.number}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="text-gray-400">Hash:</Typography>
                    <Typography className="font-semibold break-all">{selectedBlock.header.hash}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="text-gray-400">Previous Block:</Typography>
                    <Typography className="font-semibold break-all">{selectedBlock.header.previous}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="text-gray-400">Validator:</Typography>
                    <Typography className="font-semibold break-words">{selectedBlock.header.validator}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="text-gray-400">Relay:</Typography>
                    <Typography className="font-semibold break-all">{selectedBlock.header.relay}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="text-gray-400">Merkle Root:</Typography>
                    <Typography className="font-semibold break-all">{selectedBlock.header.merkel}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="text-gray-400">Signature:</Typography>
                    <Typography className="font-semibold break-all">{selectedBlock.header.signature.signatgure}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="text-gray-400">Key:</Typography>
                    <Typography className="font-semibold break-all">{selectedBlock.header.signature.key}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="text-gray-400">Date:</Typography>
                    <Typography className="font-semibold">{selectedBlock.header.date}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="text-gray-400">Age:</Typography>
                    <Typography className="font-semibold">{getAge(selectedBlock.header.date)}</Typography>
                  </Grid>
                </Grid>
              </div>

              <Divider className="bg-gray-600" />

              <div className="bg-gray-800 p-6 rounded-lg">
                <Typography variant="h6" className="text-yellow-400 mb-4 text-center">Coinbase Information</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography className="text-gray-400">Hash:</Typography>
                    <Typography className="font-semibold break-all">{selectedBlock.body.coinbase.hash}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="text-gray-400">Size:</Typography>
                    <Typography className="font-semibold">{selectedBlock.body.coinbase.size}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="text-gray-400">Merkle Root:</Typography>
                    <Typography className="font-semibold break-all">{selectedBlock.body.coinbase.merkel}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="text-gray-400">Reward:</Typography>
                    <Typography className="font-semibold break-words">{selectedBlock.body.coinbase.reward}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="text-gray-400">Fees:</Typography>
                    <Typography className="font-semibold break-words">{selectedBlock.body.coinbase.fees}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="text-gray-400">Relay Fee:</Typography>
                    <Typography className="font-semibold break-words">{selectedBlock.body.coinbase.relay_fee}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="text-gray-400">Validator Fee:</Typography>
                    <Typography className="font-semibold break-words">{selectedBlock.body.coinbase.validator_fee}</Typography>
                  </Grid>
                </Grid>
              </div>

              <Divider className="bg-gray-600" />

              <div className="bg-gray-800 p-6 rounded-lg">
                <Typography variant="h6" className="text-purple-400 mb-4 text-center">Transactions</Typography>
                <Typography className="mb-4 text-center">Total Transactions: {selectedBlock.body.transactions.length}</Typography>
                <div className="max-h-60 overflow-y-auto pr-2" style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#4B5563 #374151'
                }}>
                  {selectedBlock.body.transactions.map((tx, index) => (
                    <div key={index} className="mb-3 bg-gray-700 p-3 rounded">
                      <Typography className="text-sm">
                        <span className="text-gray-400">Transaction {index + 1} Hash: </span>
                        <span className="font-semibold break-all">{tx.hash}</span>
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
