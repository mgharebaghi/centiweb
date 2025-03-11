"use client";
import { useState, useEffect } from "react";
import Validators from "./components/validators";
import Relay from "./components/relay";

function Download() {
  const [activeTab, setActiveTab] = useState("validator");

  const renderContent = () => {
    if (activeTab === "validator") {
      return <Validators />;
    }
    return <Relay />;
  };

  useEffect(() => {
    document.title = "Download | Centichain";
  }, []);

  return (
    <main className="min-h-screen bg-[#111827] text-white overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1a1f35] to-[#0c0e16] -z-10"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.03] -z-5"></div>

      {/* Subtle glow effects */}
      <div className="absolute top-40 right-1/4 w-[200px] h-[200px] rounded-full bg-[#10b981] opacity-[0.03] blur-[120px] animate-pulse-slow -z-5"></div>
      <div className="absolute bottom-40 left-1/4 w-[200px] h-[200px] rounded-full bg-[#10b981] opacity-[0.03] blur-[120px] animate-pulse-slow animation-delay-1000 -z-5"></div>

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        {/* Minimal header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            Download Centichain
          </h1>
          <p className="text-gray-400 text-lg">
            Choose your node type to get started
          </p>
        </div>

        {/* Modern card-based layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div
            className={`relative overflow-hidden group ${
              activeTab === "validator"
                ? "ring-2 ring-[#10b981]"
                : "ring-1 ring-gray-800"
            } rounded-xl transition-all duration-300 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70`}
            onClick={() => setActiveTab("validator")}
          >
            {/* Highlight glow effect when active */}
            {activeTab === "validator" && (
              <div className="absolute inset-0 bg-[#10b981] opacity-5 blur-md"></div>
            )}

            <div className="relative z-10 p-6">
              <div className="flex items-start">
                <div
                  className={`flex-shrink-0 ${
                    activeTab === "validator"
                      ? "text-[#10b981]"
                      : "text-gray-400"
                  } mr-5`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 00.674 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Validator Node
                  </h3>
                  <p className="text-gray-400 text-base mb-4">
                    Secure the network and earn rewards by validating
                    transactions
                  </p>

                  {/* Active badge */}
                  {activeTab === "validator" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900/30 text-green-400 border border-green-700/50">
                      <span className="w-2 h-2 rounded-full bg-[#10b981] mr-1.5 animate-pulse"></span>
                      Active
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom highlight bar */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-1 ${
                activeTab === "validator"
                  ? "bg-gradient-to-r from-[#10b981] to-[rgba(16,185,129,0.3)]"
                  : "bg-transparent group-hover:bg-gray-800"
              } transition-all duration-300`}
            ></div>
          </div>

          <div
            className={`relative overflow-hidden group ${
              activeTab === "relay"
                ? "ring-2 ring-[#10b981]"
                : "ring-1 ring-gray-800"
            } rounded-xl transition-all duration-300 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70`}
            onClick={() => setActiveTab("relay")}
          >
            {/* Highlight glow effect when active */}
            {activeTab === "relay" && (
              <div className="absolute inset-0 bg-[#10b981] opacity-5 blur-md"></div>
            )}

            <div className="relative z-10 p-6">
              <div className="flex items-start">
                <div
                  className={`flex-shrink-0 ${
                    activeTab === "relay" ? "text-[#10b981]" : "text-gray-400"
                  } mr-5`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-12 h-12"
                  >
                    <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Relay Node
                  </h3>
                  <p className="text-gray-400 text-base mb-4">
                    Help relay transactions across the network
                  </p>

                  {/* Active badge */}
                  {activeTab === "relay" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900/30 text-green-400 border border-green-700/50">
                      <span className="w-2 h-2 rounded-full bg-[#10b981] mr-1.5 animate-pulse"></span>
                      Active
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom highlight bar */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-1 ${
                activeTab === "relay"
                  ? "bg-gradient-to-r from-[#10b981] to-[rgba(16,185,129,0.3)]"
                  : "bg-transparent group-hover:bg-gray-800"
              } transition-all duration-300`}
            ></div>
          </div>
        </div>

        {/* Content area */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-2xl relative">
          {/* Glass effect */}
          <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none"></div>

          {/* Content */}
          <div className="relative z-10 p-6">{renderContent()}</div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#10b981] to-[rgba(16,185,129,0.01)]"></div>
        </div>
      </div>

      {/* Add animation classes for the gradient orbs */}
      <style jsx global>{`
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.1;
          }
        }
      `}</style>
    </main>
  );
}

export default Download;
