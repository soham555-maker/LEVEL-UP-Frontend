"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeProvider";
import { useRouter } from "next/navigation";
import { useData } from "@/context/DataContext";

const NgoPage = () => {
  const router = useRouter();
  const { ngos, loading, error, users, me, fetchData } = useData();
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // fetchData(); // Refresh NGO data on mount
  }, []);

  const handleViewDetails = (ngoId) => {
    router.push(`/ngo/${ngoId}`);
  };

  const handleJoinNGO = async (ngoId) => {
    try {
      setProcessing(true);
      const sessionToken = localStorage.getItem("session_token");

      if (!sessionToken) {
        alert("You need to be logged in to join an NGO");
        router.push("/login");
        return;
      }

      const response = await fetch("http://127.0.0.1:5000/register/ngo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({ ngo_id: ngoId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Registration failed");
      }

      // Refresh NGO data after successful join
      await fetchData();
      alert("Successfully joined the NGO!");
    } catch (error) {
      console.error("NGO join error:", error);
      alert(error.message || "Failed to join NGO");
    } finally {
      setProcessing(false);
    }
  };

  const filteredNgos = ngos.filter(
    (ngo) =>
      ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isClient || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 dark:from-[#1a1a2e] dark:via-[#1a1a2e] dark:to-[#1a1a2e]">
        <div className="max-w-4xl mx-auto py-10 px-4">
          <div className="bg-white/90 dark:bg-gray-800/90 shadow-xl backdrop-blur-md rounded-xl p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 dark:from-[#1a1a2e] dark:via-[#1a1a2e] dark:to-[#1a1a2e]">
        <div className="max-w-4xl mx-auto py-10 px-4">
          <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-6 rounded-xl">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 dark:from-[#1a1a2e] dark:via-[#1a1a2e] dark:to-[#1a1a2e] text-gray-800 dark:text-gray-100">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white/90 dark:bg-gray-800/90 shadow-xl backdrop-blur-md rounded-xl p-6">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-500">
            List of NGOs
          </h1>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search NGOs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {filteredNgos.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">
                {ngos.length === 0 ? "No NGOs found" : "No matching NGOs found"}
              </p>
            </div>
          ) : (
            <ul className="space-y-6">
              {filteredNgos.map((ngo) => {
                const isMember = me?.ngos_joined?.includes(ngo._id);
                const isOwner = me?.ngos_owned?.includes(ngo._id);
                console.log(isMember);

                return (
                  <li
                    key={ngo._id}
                    className="bg-white/80 dark:bg-gray-700/80 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg"
                  >
                    <div className="p-6">
                      <div className="flex items-center space-x-6 mb-4">
                        {/* NGO Logo */}
                        <div className="shrink-0">
                          {ngo.logo_url ? (
                            <img
                              src={ngo.logo_url}
                              alt={`${ngo.name} logo`}
                              className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-gray-600 object-cover"
                            />
                          ) : (
                            <div className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-sm">
                              No Logo
                            </div>
                          )}
                        </div>

                        {/* NGO Details */}
                        <div className="flex-grow">
                          <h2 className="text-xl font-semibold">{ngo.name}</h2>
                          <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
                            {ngo.description || "No description available"}
                          </p>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm">
                              <span className="font-medium">Location:</span>{" "}
                              {ngo.location || "Not specified"}
                            </p>
                            {ngo.website && (
                              <p className="text-sm">
                                <span className="font-medium">Website:</span>{" "}
                                <a
                                  href={ngo.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                  {ngo.website}
                                </a>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      {ngo.tags?.length > 0 && (
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2">
                            {ngo.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-400 text-sm rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Members */}
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                          Members ({ngo.members?.length || 0})
                        </h3>
                        <div className="flex -space-x-2 overflow-hidden">
                          {ngo.members?.slice(0, 5).map((memberId, idx) => {
                            const member = users.find(
                              (u) => u._id === memberId
                            );
                            return (
                              <div
                                key={idx}
                                className="relative w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-300 dark:bg-gray-600 overflow-hidden"
                                title={member?.name || `Member ${idx + 1}`}
                              >
                                {member?.profile_pic_url ? (
                                  <img
                                    src={member.profile_pic_url}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-xs">
                                    {String.fromCharCode(65 + idx)}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                          {ngo.members?.length > 5 && (
                            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs">
                              +{ngo.members.length - 5}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex justify-end space-x-3">
                        <button
                          onClick={() => handleViewDetails(ngo._id)}
                          className="px-4 py-2 bg-transparent border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-md hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition"
                        >
                          View Details
                        </button>

                        {!isOwner && (
                          <button
                            onClick={() => handleJoinNGO(ngo._id)}
                            disabled={processing || isMember}
                            className={`px-4 py-2 flex items-center justify-center ${
                              isMember
                                ? "bg-green-600 hover:bg-green-600 cursor-default"
                                : "bg-blue-600 hover:bg-blue-700"
                            } text-white rounded-md transition space-x-2`}
                          >
                            {processing ? (
                              <>
                                <svg
                                  className="animate-spin h-5 w-5 mr-3"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  />
                                </svg>
                                <span>Processing...</span>
                              </>
                            ) : isMember ? (
                              <>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>Joined</span>
                              </>
                            ) : (
                              "Join NGO"
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NgoPage;
