"use client";

import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { FaNetworkWired, FaShieldAlt, FaSearch, FaSortAmountDown, FaSortAmountUp, FaCopy } from "react-icons/fa";

interface Contributor {
  peerid: string;
  wallet: string;
  node_type: string;
  join_date: string;
}

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [itemsPerPage, setItemsPerPage] = useState(getInitialItemsPerPage());

  function getInitialItemsPerPage() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 12;
      if (window.innerWidth >= 1024) return 9;
      if (window.innerWidth >= 768) return 6;
      return 4;
    }
    return 12;
  }

  useEffect(() => {
    const handleResize = () => setItemsPerPage(getInitialItemsPerPage());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch("/api/contributors");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const activeContributors = Array.isArray(data)
          ? data.sort((a, b) => new Date(b.join_date).getTime() - new Date(a.join_date).getTime())
          : [];
        setContributors(activeContributors);
      } catch (error) {
        console.error("Error fetching contributors:", error);
        setContributors([]);
      }
    };
    fetchContributors();
  }, []);

  if (!contributors) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  let displayContributors = [...contributors];

  if (searchTerm) {
    displayContributors = displayContributors.filter(
      (contributor) =>
        contributor.peerid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contributor.wallet.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  displayContributors.sort((a, b) => {
    const dateA = new Date(a.join_date).getTime();
    const dateB = new Date(b.join_date).getTime();
    return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const totalPages = Math.ceil(displayContributors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContributors = displayContributors.slice(startIndex, startIndex + itemsPerPage);

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const joinDate = new Date(date);
    const diffInMs = now.getTime() - joinDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return `${diffInDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-[#111827] pt-20 px-4 sm:px-6 lg:px-8">
      <Container maxWidth="xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            Active Network Participants
          </h1>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by PeerID or Wallet"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-3 bg-[#1F2937] text-white rounded-lg border border-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
            <button
              onClick={() => setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc')}
              className="p-3 bg-[#1F2937] rounded-lg border border-gray-600 hover:bg-[#374151] transition-all"
            >
              {sortDirection === 'desc' ? <FaSortAmountDown className="text-emerald-400" /> : <FaSortAmountUp className="text-emerald-400" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedContributors.map((contributor) => (
            <div
              key={contributor.peerid}
              className="p-6 bg-[#1F2937] rounded-xl border border-gray-600 hover:border-emerald-500 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                {contributor.node_type.toLowerCase() === "relay" ? (
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <FaNetworkWired className="text-blue-400 text-xl" />
                  </div>
                ) : (
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <FaShieldAlt className="text-emerald-400 text-xl" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-white block truncate">
                      {contributor.wallet.slice(0, 6)}...{contributor.wallet.slice(-4)}
                    </span>
                    <button 
                      onClick={() => navigator.clipboard.writeText(contributor.wallet)}
                      className="text-gray-400 hover:text-emerald-400 transition-colors"
                    >
                      <FaCopy />
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    {contributor.node_type}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-600">
                <div className="text-sm text-gray-300">
                  <span className="text-gray-400">Peer ID:</span>
                  <div className="mt-1 break-all font-mono bg-[#374151] p-2 rounded-lg">
                    {contributor.peerid}
                    <button 
                      onClick={() => navigator.clipboard.writeText(contributor.peerid)}
                      className="ml-2 text-gray-400 hover:text-emerald-400 transition-colors"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-3">
                  Joined: <span className="text-emerald-400">{getTimeAgo(contributor.join_date)}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-6 py-2 bg-[#1F2937] text-white rounded-lg border border-gray-600 hover:bg-[#374151] disabled:opacity-50 disabled:hover:bg-[#1F2937] transition-all"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-white bg-[#374151] rounded-lg">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-6 py-2 bg-[#1F2937] text-white rounded-lg border border-gray-600 hover:bg-[#374151] disabled:opacity-50 disabled:hover:bg-[#1F2937] transition-all"
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
