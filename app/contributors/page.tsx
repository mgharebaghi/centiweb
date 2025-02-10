"use client";

import { useState, useEffect } from "react";
import { Container, Dialog, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaSearch, FaChevronLeft, FaChevronRight, FaNetworkWired, FaShieldAlt, FaSortAmountDown, FaSortAmountUp, FaFingerprint, FaLink, FaCopy } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface Contributor {
  _id: string;
  relay_id: string;
  peerid: string;
  wallet: string;
  node_type: string;
  join_date: string;
  deactive_date: string | null;
}

type SortType = "date" | "active_days";
type TabValue = "all" | "relay" | "validator" | "active" | "deactive";

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Contributor[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortType, setSortType] = useState<SortType>("active_days");
  const [currentTab, setCurrentTab] = useState<TabValue>("active");
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);
  const [selectedContributor, setSelectedContributor] = useState<Contributor | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch("/api/contributors");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setContributors(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching contributors:", error);
        setContributors([]);
      }
    };
    fetchContributors();
  }, []);

  useEffect(() => {
    if (!contributors) return;
    
    const searchTermLower = searchTerm.toLowerCase();
    let filtered = contributors;

    if (searchTermLower !== '') {
      filtered = filtered.filter(contributor => 
        contributor.wallet.toLowerCase().includes(searchTermLower) ||
        (contributor.relay_id && contributor.relay_id.toLowerCase().includes(searchTermLower)) ||
        (contributor.peerid && contributor.peerid.toLowerCase().includes(searchTermLower))
      );
    }

    if (currentTab === "active") {
      filtered = filtered.filter(contributor => !contributor.deactive_date);
    } else if (currentTab === "deactive") {
      filtered = filtered.filter(contributor => contributor.deactive_date);
    } else if (currentTab === "relay") {
      filtered = filtered.filter(contributor => 
        contributor.node_type.toLowerCase() === "relay" && 
        !contributor.deactive_date
      );
    } else if (currentTab === "validator") {
      filtered = filtered.filter(contributor => 
        contributor.node_type.toLowerCase() === "validator" && 
        !contributor.deactive_date
      );
    }
    
    setSearchResults(filtered);
    setCurrentPage(1);
  }, [searchTerm, contributors, currentTab]);

  const calculateActiveTime = (joinDate: string, deactiveDate: string | null): { days: number, hours: number, minutes: number } => {
    const start = new Date(joinDate);
    const end = deactiveDate ? new Date(deactiveDate) : new Date();
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
  };

  const copyToClipboard = async (wallet: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(wallet);
      setCopiedWallet(wallet);
      setShowCopyAlert(true);
      setTimeout(() => {
        setCopiedWallet(null);
        setShowCopyAlert(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleContributorClick = (contributor: Contributor) => {
    setSelectedContributor(contributor);
    setDialogOpen(true);
  };

  const sortContributors = (contributors: Contributor[] | null): Contributor[] => {
    if (!contributors) return [];
    
    return [...contributors].sort((a, b) => {
      if (sortType === "date") {
        const dateA = new Date(a.join_date).getTime();
        const dateB = new Date(b.join_date).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        const timeA = calculateActiveTime(a.join_date, a.deactive_date);
        const timeB = calculateActiveTime(b.join_date, b.deactive_date);
        const totalMinutesA = timeA.days * 24 * 60 + timeA.hours * 60 + timeA.minutes;
        const totalMinutesB = timeB.days * 24 * 60 + timeB.hours * 60 + timeB.minutes;
        return sortOrder === "asc" ? totalMinutesA - totalMinutesB : totalMinutesB - totalMinutesA;
      }
    });
  };

  const toggleSortOrder = () => setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  const toggleSortType = () => setSortType(prev => prev === "date" ? "active_days" : "date");
  
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allContributors = sortContributors(searchResults || contributors);
  const totalPages = Math.ceil(allContributors.length / itemsPerPage);
  const displayContributors = allContributors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!contributors) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { value: 'all', label: `All (${contributors.length})` },
    { value: 'active', label: `Actives (${contributors.filter(c => !c.deactive_date).length})` },
    { value: 'relay', label: `Relays (${contributors.filter(c => c.node_type.toLowerCase() === 'relay' && !c.deactive_date).length})` },
    { value: 'validator', label: `Validators (${contributors.filter(c => c.node_type.toLowerCase() === 'validator' && !c.deactive_date).length})` },
    { value: 'deactive', label: `Deactives (${contributors.filter(c => c.deactive_date).length})` }
  ] as const;

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <Container maxWidth="lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-white">Network Contributors</h1>
          <div className="flex gap-2">
            <button onClick={toggleSortType} className="px-3 py-2 bg-[#1A1A1A] rounded text-sm text-gray-300 hover:bg-[#222]">
              {sortType === "date" ? "Sort by Date" : "Sort by Active Time"}
            </button>
            <button onClick={toggleSortOrder} className="px-3 py-2 bg-[#1A1A1A] rounded text-gray-300 hover:bg-[#222]">
              {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto mb-4 pb-2">
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setCurrentTab(tab.value as TabValue)}
              className={`px-4 py-2 rounded whitespace-nowrap ${
                currentTab === tab.value 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-[#1A1A1A] text-gray-300 hover:bg-[#222]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by wallet, relay ID, or peer ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-[#1A1A1A] rounded border border-gray-700 text-white"
        />

        {showCopyAlert && (
          <div className="fixed bottom-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded shadow-lg">
            Copied to clipboard!
          </div>
        )}


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayContributors.map((contributor) => (
            <motion.div
              key={contributor._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-[#1A1A1A] rounded border border-gray-700 cursor-pointer hover:border-emerald-500/50 transition-colors"
              onClick={() => handleContributorClick(contributor)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {contributor.node_type.toLowerCase() === 'relay' ? 
                    <FaNetworkWired className="text-blue-400" /> :
                    <FaShieldAlt className="text-emerald-400" />
                  }
                  <div>
                    <div 
                      className="flex items-center gap-2"
                      onClick={(e) => copyToClipboard(contributor.wallet, e)}
                    >
                      <span className="text-white">
                        {contributor.wallet.slice(0, 6)}...{contributor.wallet.slice(-4)}
                      </span>
                      <FaCopy className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-400">{contributor.node_type}</p>
                  </div>
                </div>
                <div>
                  {contributor.deactive_date ? (
                    <span className="text-red-400">DEACTIVE</span>
                  ) : (
                    <span className="text-emerald-400">ACTIVE</span>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                {contributor.peerid && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaFingerprint className="text-emerald-400" />
                    <span className="truncate">{contributor.peerid}</span>
                  </div>
                )}
                
                {contributor.relay_id && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaLink className="text-blue-400" />
                    <span className="truncate">{contributor.relay_id}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <span className="text-gray-300">
                      {new Date(contributor.join_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-gray-400" />
                    {(() => {
                      const { days, hours, minutes } = calculateActiveTime(
                        contributor.join_date, 
                        contributor.deactive_date
                      );
                      if (days > 0) {
                        return <span className="text-orange-400">{days}d {hours}h</span>;
                      } else if (hours > 0 || minutes >= 60) {
                        return <span className="text-orange-400">{hours}h {minutes}m</span>;
                      } else {
                        return <span className="text-orange-400">{minutes}m</span>;
                      }
                    })()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-gray-300 disabled:text-gray-600"
          >
            <FaChevronLeft />
          </button>
          <span className="text-gray-300">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-gray-300 disabled:text-gray-600"
          >
            <FaChevronRight />
          </button>
        </div>

        <Dialog 
          open={dialogOpen} 
          onClose={() => setDialogOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            style: {
              backgroundColor: '#1A1A1A',
              backgroundImage: 'linear-gradient(to right, #1A1A1A, #262626)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          {selectedContributor && (
            <Box p={3}>
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h5" className="text-white font-bold">
                  Contributor Details
                </Typography>
                <button 
                  onClick={() => setDialogOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <IoClose size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-black/20 p-4 rounded-lg">
                  <Typography className="text-gray-400 mb-1">Wallet Address</Typography>
                  <div className="flex items-center gap-2">
                    <Typography className="text-white font-mono break-all">
                      {selectedContributor.wallet}
                    </Typography>
                    <button
                      onClick={(e) => copyToClipboard(selectedContributor.wallet, e)}
                      className="text-gray-400 hover:text-white"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/20 p-4 rounded-lg">
                    <Typography className="text-gray-400 mb-1">Node Type</Typography>
                    <Typography className="text-white">
                      {selectedContributor.node_type}
                    </Typography>
                  </div>
                  <div className="bg-black/20 p-4 rounded-lg">
                    <Typography className="text-gray-400 mb-1">Status</Typography>
                    <Typography className={selectedContributor.deactive_date ? "text-red-400" : "text-emerald-400"}>
                      {selectedContributor.deactive_date ? "DEACTIVE" : "ACTIVE"}
                    </Typography>
                  </div>
                </div>

                {selectedContributor.peerid && (
                  <div className="bg-black/20 p-4 rounded-lg">
                    <Typography className="text-gray-400 mb-1">Peer ID</Typography>
                    <Typography className="text-white font-mono break-all">
                      {selectedContributor.peerid}
                    </Typography>
                  </div>
                )}

                {selectedContributor.relay_id && (
                  <div className="bg-black/20 p-4 rounded-lg">
                    <Typography className="text-gray-400 mb-1">Relay ID</Typography>
                    <Typography className="text-white font-mono break-all">
                      {selectedContributor.relay_id}
                    </Typography>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/20 p-4 rounded-lg">
                    <Typography className="text-gray-400 mb-1">Join Date</Typography>
                    <Typography className="text-white">
                      {new Date(selectedContributor.join_date).toLocaleString()}
                    </Typography>
                  </div>
                  <div className="bg-black/20 p-4 rounded-lg">
                    <Typography className="text-gray-400 mb-1">Active Time</Typography>
                    <Typography className="text-orange-400">
                      {(() => {
                        const { days, hours, minutes } = calculateActiveTime(
                          selectedContributor.join_date,
                          selectedContributor.deactive_date
                        );
                        if (days > 0) {
                          return `${days} days, ${hours} hours, ${minutes} minutes`;
                        } else if (hours > 0 || minutes >= 60) {
                          return `${hours} hours, ${minutes} minutes`;
                        } else {
                          return `${minutes} minutes`;
                        }
                      })()}
                    </Typography>
                  </div>
                </div>
              </div>
            </Box>
          )}
        </Dialog>
      </Container>
    </div>
  );
}
