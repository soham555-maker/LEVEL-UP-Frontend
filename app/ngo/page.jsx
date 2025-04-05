"use client";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeProvider";
import { useRouter } from "next/navigation";

const NgoPage = () => {
  const router = useRouter();
  // Default NGO state for testing with added IDs
  const [ngos, setNgos] = useState([
    {
      id: "ngo001",
      name: "Helping Hands",
      description:
        "An NGO focused on providing education to underprivileged children.",
      logo_url: "https://example.com/logo1.png",
      owner_id: "user123",
      members: ["user456", "user789"],
      categories: ["Education", "Child Welfare"],
    },
    {
      id: "ngo002",
      name: "Green Earth",
      description: "Dedicated to environmental conservation and awareness.",
      logo_url: "https://example.com/logo2.png",
      owner_id: "user124",
      members: ["user457", "user790"],
      categories: ["Environmental Protection"],
    },
    {
      id: "ngo003",
      name: "Health for All",
      description: "Providing healthcare services to rural areas.",
      logo_url: "https://example.com/logo3.png",
      owner_id: "user125",
      members: ["user458", "user791"],
      categories: ["Healthcare", "Rural Development"],
    },
  ]);
  const { theme } = useTheme();

  // Function to navigate to NGO details page
  const handleViewDetails = (ngoId) => {
    router.push(`/ngo/${ngoId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 dark:from-[#1a1a2e] dark:via-[#1a1a2e] dark:to-[#1a1a2e] text-gray-800 dark:text-gray-100">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white/90 dark:bg-gray-800/90 shadow-xl backdrop-blur-md rounded-xl p-6">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-500">
            List of NGOs
          </h1>

          {/* Search or filter options could go here */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search NGOs..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <ul className="space-y-6">
            {ngos.map((ngo) => (
              <li
                key={ngo.id}
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
                        ID: {ngo.id}
                      </p>
                      <p className="text-sm mt-1">{ngo.description}</p>
                      <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                        <strong>Owner:</strong> {ngo.owner_id}
                      </p>
                    </div>
                  </div>

                  {/* Categories/Interests */}
                  {ngo.categories && ngo.categories.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-md font-semibold text-yellow-700 dark:text-purple-300 mb-2">
                        Categories
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {ngo.categories.map((category) => (
                          <span
                            key={category}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Members */}
                  <div className="mt-4">
                    <h3 className="text-md font-semibold text-yellow-700 dark:text-purple-300 mb-2">
                      Members
                    </h3>
                    <div className="flex -space-x-2 overflow-hidden">
                      {ngo.members.map((member, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden text-xs"
                          title={member}
                        >
                          {member.substring(4, 5).toUpperCase()}
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-blue-500 flex items-center justify-center text-white text-xs">
                        +
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => handleViewDetails(ngo.id)}
                      className="px-4 py-2 bg-transparent border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-md hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition"
                    >
                      View Details
                    </button>
                    {/* Alternative approach using Next.js Link */}
                    {/* 
                    <Link href={`/ngo/${ngo.id}`}>
                      <span className="px-4 py-2 bg-transparent border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-md hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition cursor-pointer">
                        View Details
                      </span>
                    </Link>
                    */}
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition">
                      Join NGO
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NgoPage;
