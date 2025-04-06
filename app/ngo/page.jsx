"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeProvider";
import { useRouter } from "next/navigation";
import { useData } from "@/context/DataContext";

const NgoPage = () => {
  const router = useRouter();
  const { ngos, loading, error } = useData();
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleViewDetails = (ngoId) => {
    router.push(`/ngo/${ngoId}`);
  };

  // const filteredNgos = ngos.filter(
  //   (ngo) =>
  //     ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     ngo.description.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 dark:from-[#1a1a2e] dark:via-[#1a1a2e] dark:to-[#1a1a2e]">
        <div className="max-w-4xl mx-auto py-10 px-4">
          <div className="bg-white/90 dark:bg-gray-800/90 shadow-xl backdrop-blur-md rounded-xl p-6">
            Loading NGOs...
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 dark:from-[#1a1a2e] dark:via-[#1a1a2e] dark:to-[#1a1a2e]">
        <div className="max-w-4xl mx-auto py-10 px-4">
          <div className="bg-white/90 dark:bg-gray-800/90 shadow-xl backdrop-blur-md rounded-xl p-6">
            Loading NGOs...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 dark:from-[#1a1a2e] dark:via-[#1a1a2e] dark:to-[#1a1a2e]">
        <div className="max-w-4xl mx-auto py-10 px-4">
          <div className="bg-white/90 dark:bg-gray-800/90 shadow-xl backdrop-blur-md rounded-xl p-6">
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

          {ngos.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">
                No NGOs found matching your search
              </p>
            </div>
          ) : (
            <ul className="space-y-6">
              {ngos.map((ngo) => (
                <li
                  key={ngo._id}
                  className="bg-white/80 dark:bg-gray-700/80 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-6 mb-4">
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
                      <div>
                        <h2 className="text-xl font-semibold">{ngo.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ID: {ngo._id}
                        </p>
                        <p className="text-sm mt-1">{ngo.description}</p>
                        <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                          <strong>Location:</strong>{" "}
                          {ngo.location || "Not specified"}
                        </p>
                      </div>
                    </div>

                    {ngo.tags && ngo.tags.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-md font-semibold text-yellow-700 dark:text-purple-300 mb-2">
                          Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {ngo.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4">
                      <h3 className="text-md font-semibold text-yellow-700 dark:text-purple-300 mb-2">
                        Members
                      </h3>
                      <div className="flex -space-x-2 overflow-hidden">
                        {ngo.members.slice(0, 5).map((memberId, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden text-xs"
                            title={`Member ${idx + 1}`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </div>
                        ))}
                        {ngo.members.length > 5 && (
                          <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs">
                            +{ngo.members.length - 5}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        onClick={() => handleViewDetails(ngo._id)}
                        className="px-4 py-2 bg-transparent border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-md hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition"
                      >
                        View Details
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition">
                        Join NGO
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NgoPage;
