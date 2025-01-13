import { Container, Typography, Paper, Box, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { SiHiveBlockchain } from "react-icons/si";
import { FaExchangeAlt } from "react-icons/fa";
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function Generated() {
  const router = useRouter();
  const [stats, setStats] = useState({
    blocks: "0",
    transactions: 0
  });
  const [loading, setLoading] = useState({
    blocks: false,
    transactions: false
  });

  useEffect(() => {
    fetchAllStats();
    const interval = setInterval(fetchAllStats, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchAllStats = async () => {
    router.refresh();
    await Promise.all([
      fetchStat('blocks'),
      fetchStat('transactions')
    ]);
  };

  const fetchStat = async (type: string) => {
    setLoading(prev => ({ ...prev, [type]: true }));
    try {
      const endpoint = type === 'blocks' ? '/api/blocks' : '/api/trxcount';
      const res = await fetch(endpoint, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setStats(prev => ({ 
          ...prev, 
          [type]: type === 'blocks' ? data.number : Number(data.data)
        }));
      }
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    } finally {
      setLoading(prev => ({ ...prev, [type]: false }));
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const StatCard = ({ 
    icon, 
    value, 
    label, 
    loading,
    tooltip
  }: { 
    icon: React.ReactNode; 
    value: string | number; 
    label: string; 
    loading: boolean;
    tooltip: string;
  }) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Tooltip title={tooltip} arrow placement="top">
        <Paper 
          elevation={3} 
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-xl border border-gray-700 hover:border-emerald-500 transition-all duration-300"
        >
          <Box className="flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-emerald-400"
            >
              {icon}
            </motion.div>
            <Typography variant="h3" className="text-emerald-400 mt-6 mb-3 font-bold">
              {loading ? <PulseLoader color="#34D399" size={10} /> : value}
            </Typography>
            <Typography variant="h6" className="text-gray-300 text-center">
              {label}
            </Typography>
          </Box>
        </Paper>
      </Tooltip>
    </motion.div>
  );

  return (
    <div className="min-h-[600px] bg-gradient-to-b from-gray-900 via-slate-900 to-emerald-900 py-20">
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" className="text-white text-center mb-16 font-bold">
            Network Statistics
          </Typography>
        </motion.div>
        
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <StatCard
            icon={<SiHiveBlockchain size={60} />}
            value={Number(stats.blocks).toLocaleString()}
            label="Blocks Generated"
            loading={loading.blocks}
            tooltip="Total blocks created in the blockchain"
          />
          <StatCard
            icon={<FaExchangeAlt size={60} />}
            value={stats.transactions.toLocaleString()}
            label="Transactions"
            loading={loading.transactions}
            tooltip="Total confirmed transactions"
          />
        </Box>
      </Container>
    </div>
  );
}

export default Generated;
