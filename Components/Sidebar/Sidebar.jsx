"use client";

import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { FaChevronDown, FaChevronUp, FaMapMarkedAlt } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import { AiOutlineShareAlt } from "react-icons/ai";
import { useTheme } from "@/context/ThemeProvider";
import Link from "next/link";

const Sidebar = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [ngoDropdownOpen, setNgoDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Solve hydration mismatch by ensuring client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Early return during server rendering or first client render
  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={`fixed top-17 left-0 h-[calc(100%-4rem)] w-64 p-6 shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } ${
        theme === "dark"
          ? "bg-gray-800 text-gray-100"
          : "bg-white text-gray-800 border-r border-gray-200"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-2xl font-bold font-serif ${
            theme === "dark"
              ? "bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-aliceblue-100"
              : "bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent"
          }`}
        >
          Menu
        </h2>
        <button
          onClick={onClose}
          className={`${
            theme === "dark"
              ? "text-gray-300 hover:text-red-400"
              : "text-gray-600 hover:text-red-600"
          } transition-colors`}
        >
          <IoMdClose size={24} />
        </button>
      </div>

      <div
        className={`h-px w-full ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        } mb-6`}
      ></div>

      <ul className="space-y-4 font-sans">
        <li
          className={`${
            theme === "dark" ? "hover:text-purple-300" : "hover:text-yellow-600"
          } cursor-pointer transition-colors py-2 px-3 rounded-md ${
            theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-100/80"
          }`}
        >
          <Link href="/" className="block w-full">
            Home
          </Link>
        </li>
        <li
          className={`${
            theme === "dark" ? "hover:text-purple-300" : "hover:text-yellow-600"
          } cursor-pointer transition-colors py-2 px-3 rounded-md ${
            theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-100/80"
          }`}
        >
          <Link href="/about" className="block w-full">
            About
          </Link>
        </li>
        <li
          className={`${
            theme === "dark" ? "hover:text-purple-300" : "hover:text-yellow-600"
          } cursor-pointer transition-colors py-2 px-3 rounded-md ${
            theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-100/80"
          }`}
        >
          <Link href="/maps" className="flex items-center w-full">
            <FaMapMarkedAlt className="mr-2" />
            <span>Maps</span>
          </Link>
        </li>
        <li
          className={`${
            theme === "dark" ? "hover:text-purple-300" : "hover:text-yellow-600"
          } cursor-pointer transition-colors py-2 px-3 rounded-md ${
            theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-100/80"
          }`}
        >
          <Link href="/smm" className="flex items-center w-full">
            <AiOutlineShareAlt className="mr-2" />
            <span>SMM</span>
          </Link>
        </li>
        <li
          className={`${
            theme === "dark" ? "hover:text-purple-300" : "hover:text-yellow-600"
          } cursor-pointer transition-colors py-2 px-3 rounded-md ${
            theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-100/80"
          }`}
        >
          <Link href="/graph" className="flex items-center w-full">
            <MdShowChart className="mr-2" />
            <span>Graph</span>
          </Link>
        </li>
        <li className="mt-2">
          {ngoDropdownOpen && (
            <ul
              className={`pl-6 mt-1 space-y-2 text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <li
                className={`py-1 px-2 rounded-md ${
                  theme === "dark"
                    ? "hover:text-purple-300 hover:bg-gray-700/30"
                    : "hover:text-yellow-600 hover:bg-gray-100/60"
                } transition-colors cursor-pointer`}
              >
                <Link href="/ngo/helping-hands" className="block w-full">
                  Helping Hands
                </Link>
              </li>
              <li
                className={`py-1 px-2 rounded-md ${
                  theme === "dark"
                    ? "hover:text-purple-300 hover:bg-gray-700/30"
                    : "hover:text-yellow-600 hover:bg-gray-100/60"
                } transition-colors cursor-pointer`}
              >
                <Link href="/ngo/green-earth" className="block w-full">
                  Green Earth
                </Link>
              </li>
              <li
                className={`py-1 px-2 rounded-md ${
                  theme === "dark"
                    ? "hover:text-purple-300 hover:bg-gray-700/30"
                    : "hover:text-yellow-600 hover:bg-gray-100/60"
                } transition-colors cursor-pointer`}
              >
                <Link href="/ngo/health-for-all" className="block w-full">
                  Health for All
                </Link>
              </li>
            </ul>
          )}
        </li>
        <div
          className={`h-px w-full ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          } my-4`}
        ></div>
        <li
          className={`${
            theme === "dark"
              ? "text-gray-400 hover:text-gray-300"
              : "text-gray-600 hover:text-gray-700"
          } cursor-pointer transition-colors py-2 px-3 rounded-md ${
            theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-100/80"
          } font-medium`}
        >
          <Link href="/ngo/create" className="block w-full">
            Create New NGO
          </Link>
        </li>
        <li
          className={`${
            theme === "dark"
              ? "text-purple-400 hover:text-purple-300"
              : "text-purple-600 hover:text-purple-700"
          } cursor-pointer transition-colors py-2 px-3 rounded-md ${
            theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-100/80"
          } font-medium`}
        >
          <Link href="/ngo" className="block w-full">
            Find NGOs
          </Link>
        </li>

        <li
          className={`${
            theme === "dark"
              ? "text-pink-400 hover:text-pink-300"
              : "text-pink-600 hover:text-pink-700"
          } cursor-pointer transition-colors py-2 px-3 rounded-md ${
            theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-100/80"
          } font-medium`}
        >
          <Link href="/chat" className="block w-full">
            Forum
          </Link>
        </li>

        <li
          className={`${
            theme === "dark"
              ? "text-green-400 hover:text-green-300"
              : "text-green-600 hover:text-green-700"
          } cursor-pointer transition-colors py-2 px-3 rounded-md ${
            theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-100/80"
          } font-medium`}
        >
          <Link href="/dashboard" className="block w-full">
            Profile
          </Link>
        </li>

        <li
          className={`${
            theme === "dark"
              ? "text-blue-400 hover:text-blue-300"
              : "text-yellow-600 hover:text-yellow-700"
          } cursor-pointer transition-colors py-2 px-3 rounded-md ${
            theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-100/80"
          } font-medium`}
        ></li>
      </ul>

      <div className="absolute bottom-6 left-6 right-6">
        <div
          className={`p-4 rounded-lg ${
            theme === "dark"
              ? "bg-gray-700/50 text-gray-300"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          <p className="text-sm font-medium">Need help?</p>
          <p className="text-xs mt-1">
            Check our documentation or contact support
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
