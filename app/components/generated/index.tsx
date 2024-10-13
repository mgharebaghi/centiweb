import { Container, Typography, Paper, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { SiHiveBlockchain } from "react-icons/si";
import { FaExchangeAlt } from "react-icons/fa";
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function Generated() {
  const router = useRouter();
  const [blockLoading, setBlockLoading] = useState<boolean>(false);
  const [blocks, setBlocks] = useState<string>("0");
  const [transactions, setTransactions] = useState(0);
  const [trxLoading, setTrxLoading] = useState(false);

  useEffect(() => {
    generatedBlocks();
    confirmedTrxs();
  }, []);

  const generatedBlocks = async () => {
    router.refresh();
    setBlockLoading(true);
    try {
      const res = await fetch("/api/blocks", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setBlocks(data.number);
      }
    } catch (error) {
      console.error("Error fetching blocks:", error);
    } finally {
      setBlockLoading(false);
    }
  };

  const confirmedTrxs = async () => {
    setTrxLoading(true);
    try {
      const res = await fetch("/api/trxcount");
      if (res.ok) {
        const data = await res.json();
        setTransactions(Number(data.data));
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setTrxLoading(false);
    }
  };

  const iconAnimation = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const StatCard = ({ 
    icon, 
    value, 
    label, 
    loading 
  }: { 
    icon: React.ReactNode; 
    value: string; 
    label: string; 
    loading: boolean; 
  }) => (
    <Paper elevation={3} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <Box className="flex flex-col items-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={iconAnimation}
        >
          {icon}
        </motion.div>
        <Typography variant="h3" className="text-emerald-400 mt-4 mb-2">
          {loading ? <PulseLoader color="#34D399" size={10} /> : value}
        </Typography>
        <Typography variant="h6" className="text-gray-300">
          {label}
        </Typography>
      </Box>
    </Paper>
  );

  return (
    <div className="min-h-[600px] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 text-slate-300 flex items-center relative overflow-hidden font-sans p-5">
      <Container maxWidth="lg">
        <Typography variant="h2" className="text-white text-center mb-12 font-bold">
          Blockchain Statistics
        </Typography>
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StatCard
            icon={<SiHiveBlockchain size={80} className="text-white" />}
            value={Number(blocks).toLocaleString()}
            label="Blocks Generated"
            loading={blockLoading}
          />
          <StatCard
            icon={<FaExchangeAlt size={80} className="text-white" />}
            value={transactions.toLocaleString()}
            label="Transactions Confirmed"
            loading={trxLoading}
          />
        </Box>
      </Container>
    </div>
  );
}

export default Generated;
