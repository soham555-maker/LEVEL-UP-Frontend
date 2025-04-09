"use client";

import React, { useState } from "react";

const DonatePage = () => {
  const [donationAmount, setDonationAmount] = useState("500");
  const [customAmount, setCustomAmount] = useState("");
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState("idle"); // idle | processing | success

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount);
    setCustomAmount("");
    setPin("");
    setStatus("idle");
  };

  const handleCustomAmount = (e) => {
    setCustomAmount(e.target.value);
    setDonationAmount("custom");
    setPin("");
    setStatus("idle");
  };

  const handleDonate = () => {
    const amountToDonate =
      donationAmount === "custom" ? customAmount : donationAmount;

    if (!amountToDonate || Number(amountToDonate) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (!pin || pin.length < 4) {
      alert("Please enter a valid 4-digit PIN.");
      return;
    }

    setStatus("processing");

    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Overlay for processing/success */}
      {(status === "processing" || status === "success") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-lg mb-4">
              {status === "processing" ? (
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 dark:border-blue-400 border-t-transparent"></div>
              ) : (
                <svg
                  className="h-12 w-12 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            {status === "success" && (
              <p className="text-green-600 dark:text-green-400 text-lg font-semibold animate-pulse">
                Payment Successful
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`container mx-auto px-4 py-8 transition-opacity duration-300 ${
          status !== "idle" ? "opacity-20 pointer-events-none select-none" : ""
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6 font-serif text-yellow-700 dark:text-blue-400">
          Support Our Cause
        </h1>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-center font-sans text-lg">
            Your donation powers impactful change. Join us in making a
            difference.
          </p>

          <div className="grid gap-6">
            {/* Donation Card */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-center font-sans text-yellow-700 dark:text-blue-300">
                Choose Donation Amount
              </h3>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {["100", "500", "1000", "2000", "5000", "custom"].map(
                  (amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={`py-2 px-4 rounded font-sans ${
                        donationAmount === amount
                          ? "bg-yellow-600 dark:bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500"
                      }`}
                    >
                      {amount === "custom" ? "Custom" : `₹${amount}`}
                    </button>
                  )
                )}
              </div>

              {donationAmount === "custom" && (
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-sans text-gray-700 dark:text-gray-300">
                    Enter amount (₹):
                  </label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={handleCustomAmount}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded font-sans bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    min="1"
                    placeholder="Enter amount"
                  />
                </div>
              )}

              {/* Encrypted PIN input */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-sans text-gray-700 dark:text-gray-300">
                  Enter 4-digit PIN:
                </label>
                <input
                  type="password"
                  maxLength="4"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded font-sans bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder=""
                />
              </div>

              {status === "idle" && (
                <button
                  onClick={handleDonate}
                  className="w-full bg-yellow-600 dark:bg-blue-600 text-white font-sans py-2 px-4 rounded hover:bg-yellow-700 dark:hover:bg-blue-700 transition duration-300"
                >
                  Proceed to Donate
                </button>
              )}
            </div>

            {/* Additional Info Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Monthly Giving",
                  desc: "Help us plan long-term with recurring support.",
                },
                {
                  title: "Corporate Partnerships",
                  desc: "Join hands for impactful CSR initiatives.",
                },
                {
                  title: "In-kind Donations",
                  desc: "Contribute resources and expertise.",
                },
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-4 rounded-lg text-center"
                >
                  <h4 className="font-medium mb-2 font-sans text-gray-800 dark:text-gray-200">
                    {title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-sans">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
