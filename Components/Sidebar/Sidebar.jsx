"use client";

import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  const [ngoDropdownOpen, setNgoDropdownOpen] = useState(false);

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100%-4rem)] w-64 bg-gray-800 text-white p-6 shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Sidebar</h2>
        <button onClick={onClose} className="text-white hover:text-red-400">
          <IoMdClose size={24} />
        </button>
      </div>

      <ul className="space-y-3">
        <li className="hover:text-yellow-400 cursor-pointer">Home</li>
        <li className="hover:text-yellow-400 cursor-pointer">About</li>
        <li className="hover:text-yellow-400 cursor-pointer">Contact</li>

        <li>
          <div
            onClick={() => setNgoDropdownOpen((prev) => !prev)}
            className="flex items-center justify-between cursor-pointer hover:text-yellow-400"
          >
            <span>Your NGOs</span>
            {ngoDropdownOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
          </div>
          {ngoDropdownOpen && (
            <ul className="pl-4 mt-2 space-y-1 text-sm text-gray-300">
              <li className="hover:text-yellow-300">ABC</li>
              <li className="hover:text-yellow-300">DEF</li>
              <li className="hover:text-yellow-300">GHI</li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
