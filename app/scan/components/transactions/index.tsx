"use client";
import { Transaction, TrxScan } from "@/app/api/types/types";
import { Pagination, Typography, Card, CardContent, Grid, Modal, Box, Divider, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import { SyncLoader } from "react-spinners";
import { GrClose } from "react-icons/gr";

export default function ScanedTrx() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<TrxScan[]>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [selectedTransaction, setSelectedTransaction] = useState<TrxScan | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const fillDataSource = async () => {
    setLoading(true);
    setDataSource([]);
    await fetch("/api/trxscan", {
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
              setCount(Math.ceil(data.count / 9));
            }
            setDataSource(data.trxs.slice(0, 9));
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

  const handleTransactionClick = (transaction: TrxScan) => {
    setSelectedTransaction(transaction);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTransaction(null);
  };

  const getAge = (date: string) => {
    return moment(date).fromNow();
  };

  return (
    <div className="w-full flex flex-col bg-gray-900 p-4">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg mb-6">
        <Typography variant="h4" className="text-white font-bold text-center">
          Transaction Explorer
        </Typography>
        <Typography variant="subtitle1" className="text-gray-200 text-center mt-2">
          Discover the latest transactions
        </Typography>
      </div>
      <div className="flex-grow flex flex-col">
        <div className="w-full min-h-[650px] mb-4">
          {!loading ? (
            <Grid container spacing={4} justifyContent="center" alignItems="stretch">
              {dataSource.map((transaction, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    className="bg-gray-900 text-gray-300 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 h-[190px] flex flex-col justify-between"
                    onClick={() => handleTransactionClick(transaction)}
                  >
                    <CardContent className="p-4 flex flex-col h-full">
                      <div className="flex-grow flex flex-col justify-center">
                        <Typography variant="body2" className="mb-3 text-gray-400 text-left">
                          <div className="flex">
                            <span className="mr-2">📤 From:</span>
                            <span>{transaction.from.substring(0, 10)}...</span>
                          </div>
                        </Typography>
                        <Typography variant="body2" className="mb-3 text-gray-400 text-left">
                          <div className="flex">
                            <span className="mr-2">📥 To:</span>
                            <span>{transaction.to.substring(0, 10)}...</span>
                          </div>
                        </Typography>
                        <Typography variant="body2" className="mb-3 text-gray-400 text-left">
                          <span className="mr-2">💰</span>
                          Value: {Number(transaction.value).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" className="mb-3 text-left">
                          <span className="mr-2">🚦</span>
                          Status: <span className={`
                            ${transaction.status.toLowerCase() === 'confirmed' ? 'text-green-400' : ''}
                            ${transaction.status.toLowerCase() === 'pending' ? 'text-gray-400' : ''}
                            ${!['confirmed', 'pending'].includes(transaction.status.toLowerCase()) ? 'text-red-400' : ''}
                          `}>
                            {transaction.status}
                          </span>
                        </Typography>
                        <Typography variant="body2" className="text-gray-400 text-left">
                          <span className="mr-2">⏳</span>
                          Age: {getAge(transaction.date)}
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
        aria-labelledby="transaction-details-modal"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 600,
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          border: '2px solid #4B5563',
          boxShadow: 24,
          p: 4,
          backgroundColor: '#1F2937',
          color: '#E5E7EB',
          borderRadius: '12px',
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
            Transaction Details
          </Typography>
          {selectedTransaction && (
            <div className="space-y-4">
              <div>
                <Typography className="text-gray-400">From:</Typography>
                <Typography className="font-semibold break-all">{selectedTransaction.from}</Typography>
              </div>
              <div>
                <Typography className="text-gray-400">To:</Typography>
                <Typography className="font-semibold break-all">{selectedTransaction.to}</Typography>
              </div>
              <div>
                <Typography className="text-gray-400">Value:</Typography>
                <Typography className="font-semibold">{Number(selectedTransaction.value)}</Typography>
              </div>
              <div>
                <Typography className="text-gray-400">Status:</Typography>
                <Typography className="font-semibold">{selectedTransaction.status}</Typography>
              </div>
              <div>
                <Typography className="text-gray-400">Date:</Typography>
                <Typography className="font-semibold">{selectedTransaction.date}</Typography>
              </div>
              <div>
                <Typography className="text-gray-400">Age:</Typography>
                <Typography className="font-semibold">{getAge(selectedTransaction.date)}</Typography>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
