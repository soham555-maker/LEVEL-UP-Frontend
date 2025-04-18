"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeProvider";
import Sidebar from "../Sidebar/Sidebar";
import { FaBars } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <>
      <nav className="bg-gradient-to-r from-yellow-600 to-yellow-800 dark:from-blue-500 dark:to-purple-500 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle Icon */}
            <button
              onClick={toggleSidebar}
              className="text-white text-2xl focus:outline-none"
            >
              <FaBars />
            </button>
            <Link href="/" className="text-2xl font-bold text-white font-serif">
              मिलकर
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Main Navigation Links */}
            <div className="hidden md:flex space-x-6">
              <Link
                href="/ngo"
                className="text-white hover:text-yellow-300 dark:hover:text-blue-300 transition font-sans"
              >
                NGOs
              </Link>
              <Link
                href="/events"
                className="text-white hover:text-yellow-300 dark:hover:text-blue-300 transition font-sans"
              >
                Events
              </Link>
            </div>

            {/* Plus Button with Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="w-9 h-9 text-white text-2xl font-bold bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition"
                aria-label="Open menu"
              >
                +
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 font-sans"
                  onMouseLeave={closeDropdown}
                >
                  <Link
                    href="/ngo/create"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    Create NGO
                  </Link>
                  {/* Other dropdown items can be added here */}
                </div>
              )}
            </div>

            <Link
              href="/register"
              className="text-white hover:text-yellow-300 dark:hover:text-blue-300 transition font-sans"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="text-white hover:text-yellow-300 dark:hover:text-blue-300 transition font-sans"
            >
              Login
            </Link>

            <div
              onClick={toggleTheme}
              className="relative w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-full cursor-pointer"
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transform transition-transform duration-500 ${
                  theme === "dark" ? "translate-x-8" : ""
                }`}
              >
                {theme === "dark" ? "🌙" : "☀"}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
