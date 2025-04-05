"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeProvider";
import { FaBars } from "react-icons/fa";
import Sidebar from "@/Components/Sidebar/Sidebar"; // ✅ Import Sidebar

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-yellow-600 to-yellow-800 p-4 dark:from-blue-500 dark:to-purple-500 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle Icon */}
            <button
              onClick={toggleSidebar}
              className="text-white text-2xl focus:outline-none"
            >
              <FaBars />
            </button>
            <a href="/" className="text-2xl font-bold text-white">
              Our Platform ✨
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="/register"
              className="text-white hover:text-yellow-300 dark:hover:text-blue-300"
            >
              Register
            </a>
            <a
              href="/login"
              className="text-white hover:text-yellow-300 dark:hover:text-blue-300"
            >
              Login
            </a>
            <div
              onClick={toggleTheme}
              className="relative w-16 h-8 bg-gray-300 rounded-full cursor-pointer dark:bg-gray-700"
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transform transition-transform duration-500 ${
                  theme === "dark" ? "translate-x-8" : ""
                }`}
              >
                {theme === "dark" ? "🌙" : "☀️"}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar rendered BELOW the Navbar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
