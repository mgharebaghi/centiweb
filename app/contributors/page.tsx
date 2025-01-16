"use client";

import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FaServer, FaCalendarAlt, FaClock, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Contributor {
  _id: string;
  wallet: string;
  node_type: string;
  join_date: string;
  deactive_date: string | null;
}

interface GroupedContributor {
  wallet: string;
  node_type: string;
  total_active_days: number;
  join_dates: string[];
  deactive_dates: (string | null)[];
}

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Contributor[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchContributors();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm) {
        searchContributor();
      } else {
        setSearchResults(null);
      }
      setCurrentPage(1); // Reset to first page on new search
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const searchContributor = async () => {
    try {
      const response = await fetch("/api/contributors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet: searchTerm }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        setSearchResults(contributors);
      } else {
        setSearchResults(data); // Data is already an array from the API
      }
    } catch (error) {
      console.error("Error searching contributor:", error);
      setSearchResults(contributors);
    }
  };

  const fetchContributors = async () => {
    try {
      const response = await fetch("/api/contributors", {
        method: "GET",
        cache: "no-store",
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        console.error("Received non-array data:", data);
        setContributors([]);
        return;
      }
      
      setContributors(data);
    } catch (error) {
      console.error("Error fetching contributors:", error);
      setContributors([]);
    }
  };

  const calculateActiveDays = (
    joinDate: string,
    deactiveDate: string | null
  ) => {
    const start = new Date(joinDate);
    const end = deactiveDate ? new Date(deactiveDate) : new Date();
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffHours = diffTime / (1000 * 60 * 60);
    
    // Only count a day if at least 24 hours have passed
    const completeDays = Math.floor(diffHours / 24);
    return completeDays;
  };

  const groupContributors = (contributors: Contributor[] | null): GroupedContributor[] => {
    if (!contributors) return [];
    
    const grouped: { [key: string]: { [key: string]: GroupedContributor } } = {};
    
    contributors.forEach(contributor => {
      if (!grouped[contributor.wallet]) {
        grouped[contributor.wallet] = {};
      }
      
      if (!grouped[contributor.wallet][contributor.node_type]) {
        grouped[contributor.wallet][contributor.node_type] = {
          wallet: contributor.wallet,
          node_type: contributor.node_type,
          total_active_days: 0,
          join_dates: [],
          deactive_dates: []
        };
      }
      
      const activeDays = calculateActiveDays(contributor.join_date, contributor.deactive_date);
      grouped[contributor.wallet][contributor.node_type].total_active_days += activeDays;
      grouped[contributor.wallet][contributor.node_type].join_dates.push(contributor.join_date);
      grouped[contributor.wallet][contributor.node_type].deactive_dates.push(contributor.deactive_date);
    });
    
    // Filter out contributors with less than 1 day active and have a deactive date
    const filteredGrouped = Object.values(grouped).flatMap(nodeTypes => 
      Object.values(nodeTypes).filter(contributor => {
        const hasDeactiveDate = contributor.deactive_dates.some(date => date !== null && date !== '');
        return !(contributor.total_active_days === 0 && hasDeactiveDate);
      })
    );
    
    return filteredGrouped;
  };

  const allContributors = groupContributors(searchResults || contributors);
  const totalPages = Math.ceil(allContributors.length / itemsPerPage);
  const displayContributors = allContributors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!contributors) {
    return (
      <div className="min-h-screen w-full bg-[#0A0A0A]">
        <Container maxWidth="lg" className="py-12 sm:py-24 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400 text-base sm:text-lg">Loading contributors...</p>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] pt-12">
      <Container maxWidth="lg" className="py-12 sm:py-24 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-8 sm:mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Network Contributors
            </motion.h1>
            <p className="text-gray-400 text-base sm:text-lg">
              Discover the nodes powering our network
            </p>
          </div>

          <div className="mb-6 sm:mb-8">
            <div className="relative max-w-xl mx-auto px-4">
              <input
                type="text"
                placeholder="Search by wallet address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-[#1A1A1A] rounded-xl border border-emerald-500/20 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 transition-all duration-300 text-sm sm:text-base"
              />
              <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {displayContributors.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-6 sm:p-12 rounded-2xl bg-[#111111] border border-emerald-500/10 shadow-2xl mx-4"
            >
              <div className="w-12 h-12 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 text-emerald-500 opacity-50">
                <FaServer className="w-full h-full" />
              </div>
              <p className="text-gray-400 text-lg sm:text-xl">
                No contributors found at the moment.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="grid gap-4 sm:gap-6 px-4">
                <AnimatePresence>
                  {displayContributors.map((contributor, index) => (
                    <motion.div
                      key={`${contributor.wallet}-${contributor.node_type}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-4 sm:p-8 rounded-2xl bg-[#111111] border border-emerald-500/10 shadow-2xl hover:shadow-emerald-500/5 hover:border-emerald-500/20 transition-all duration-300 backdrop-blur-xl"
                    >
                      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg">
                            <FaServer className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg sm:text-xl text-white mb-1">
                              {contributor.wallet.slice(0, 6)}...
                              {contributor.wallet.slice(-4)}
                            </h3>
                            <p className="text-emerald-400 font-medium text-sm sm:text-base">
                              {contributor.node_type.toUpperCase()} NODE
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-4 sm:mt-0">
                          <div className="flex items-center gap-3">
                            <FaCalendarAlt className="text-emerald-400 w-4 h-4 sm:w-5 sm:h-5" />
                            <div>
                              <span className="block text-xs sm:text-sm text-gray-400">
                                First Joined
                              </span>
                              <span className="text-white text-sm sm:text-base">
                                {new Date(
                                  contributor.join_dates[0]
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <FaClock className="text-emerald-400 w-4 h-4 sm:w-5 sm:h-5" />
                            <div>
                              <span className="block text-xs sm:text-sm text-gray-400">
                                Total Active Days
                              </span>
                              <span className="text-white text-sm sm:text-base">
                                {contributor.total_active_days === 0 ? (
                                  <span className="text-gray-400">Less than 24h</span>
                                ) : (
                                  `${contributor.total_active_days} days`
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination Controls */}
              <div className="mt-6 sm:mt-8 flex justify-center items-center gap-3 sm:gap-4 px-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg ${currentPage === 1 ? 'text-gray-500' : 'text-emerald-400 hover:bg-emerald-500/10'}`}
                >
                  <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                
                <span className="text-gray-400 text-sm sm:text-base">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-gray-500' : 'text-emerald-400 hover:bg-emerald-500/10'}`}
                >
                  <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
