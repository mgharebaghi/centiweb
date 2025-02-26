"use client";

import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { FaNetworkWired, FaShieldAlt } from "react-icons/fa";

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
  if (currentTab === "relay") {
    displayContributors = displayContributors.filter(
      (contributor) => contributor.node_type.toLowerCase() === "relay"
    );
  } else if (currentTab === "validator") {
    displayContributors = displayContributors.filter(
      (contributor) => contributor.node_type.toLowerCase() === "validator"
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <Container maxWidth="lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-white">
            Network Contributors
          </h1>
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
          {displayContributors.map((contributor) => (
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
                <div className="min-w-0">
                  <span className="text-white block truncate">
                    {contributor.wallet.slice(0, 6)}...
                    {contributor.wallet.slice(-4)}
                  </span>
                  <p className="text-sm text-gray-400 truncate">
                    {contributor.node_type}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-300 truncate">
                  Peer ID: {contributor.peerid}
                </p>
                <p className="text-sm text-gray-300">
                  Joined: {new Date(contributor.join_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
