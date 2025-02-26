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

type TabValue = "all" | "relay" | "validator";

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[] | null>(null);
  const [currentTab, setCurrentTab] = useState<TabValue>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const itemsPerPage = 9;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const joinDate = new Date(date);
    const diffInMs = now.getTime() - joinDate.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return `${diffInMins} minute${diffInMins > 1 ? 's' : ''} ago`;
    }
  };

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch("/api/contributors");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const activeContributors = Array.isArray(data)
          ? data.filter((c) => !c.deactive_date)
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
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { value: "all", label: "All" },
    { value: "relay", label: "Relays" },
    { value: "validator", label: "Validators" }
  ] as const;

  let displayContributors = [...contributors];

  // Filter by tab
  if (currentTab === "relay") {
    displayContributors = displayContributors.filter(
      (contributor) => contributor.node_type.toLowerCase() === "relay"
    );
  } else if (currentTab === "validator") {
    displayContributors = displayContributors.filter(
      (contributor) => contributor.node_type.toLowerCase() === "validator"
    );
  }

  // Filter by search
  if (searchTerm) {
    displayContributors = displayContributors.filter(
      (contributor) =>
        contributor.peerid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contributor.wallet.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sort by date
  displayContributors.sort((a, b) => {
    const dateA = new Date(a.join_date).getTime();
    const dateB = new Date(b.join_date).getTime();
    return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
  });

  // Pagination
  const totalPages = Math.ceil(displayContributors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContributors = displayContributors.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <Container maxWidth="lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-white">
            Network Contributors
          </h1>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by PeerID or Wallet"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 bg-[#1A1A1A] text-white rounded border border-gray-700 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <button
              onClick={() => setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc')}
              className="p-2 bg-[#1A1A1A] rounded border border-gray-700 hover:bg-[#222]"
            >
              {sortDirection === 'desc' ? <FaSortAmountDown className="text-gray-300" /> : <FaSortAmountUp className="text-gray-300" />}
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto mb-4 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setCurrentTab(tab.value as TabValue)}
              className={`px-4 py-2 rounded whitespace-nowrap ${
                currentTab === tab.value
                  ? "bg-emerald-500 text-white"
                  : "bg-[#1A1A1A] text-gray-300 hover:bg-[#222]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedContributors.map((contributor) => (
            <div
              key={contributor.peerid}
              className="p-4 bg-[#1A1A1A] rounded border border-gray-700"
            >
              <div className="flex items-center gap-2">
                {contributor.node_type.toLowerCase() === "relay" ? (
                  <FaNetworkWired className="text-blue-400" />
                ) : (
                  <FaShieldAlt className="text-emerald-400" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white block truncate">
                      {contributor.wallet.slice(0, 6)}...{contributor.wallet.slice(-4)}
                    </span>
                    <button 
                      onClick={() => copyToClipboard(contributor.wallet)}
                      className="text-gray-400 hover:text-white"
                    >
                      <FaCopy />
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 truncate">
                    {contributor.node_type}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-300 truncate">
                    Peer ID: {contributor.peerid}
                  </p>
                  <button 
                    onClick={() => copyToClipboard(contributor.peerid)}
                    className="text-gray-400 hover:text-white"
                  >
                    <FaCopy />
                  </button>
                </div>
                <p className="text-sm text-gray-300">
                  Joined: {getTimeAgo(contributor.join_date)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#1A1A1A] text-gray-300 rounded border border-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#1A1A1A] text-gray-300 rounded border border-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
