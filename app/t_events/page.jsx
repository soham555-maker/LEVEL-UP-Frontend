"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const CreateEventPage = () => {
  const [step, setStep] = useState(1);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ngoId, setNgoId] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [googleEventId, setGoogleEventId] = useState("");
  const [startPhotoUrl, setStartPhotoUrl] = useState("");
  const [endPhotoUrl, setEndPhotoUrl] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const sessionToken = localStorage.getItem("session_token");

      const response = await fetch("http://127.0.0.1:5000/event/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          title,
          description,
          ngo_id: ngoId,
          location,
          start_time: startTime,
          end_time: endTime,
          google_calendar_event_id: googleEventId,
          start_photo_url: startPhotoUrl,
          end_photo_url: endPhotoUrl,
          completed,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Event created successfully!");
        window.location.href = "/dashboard";
      } else {
        alert(data.error || "Failed to create event.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fdf6e3] dark:bg-[#0f172a]">
      {/* Fancy animated gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-yellow-100 via-pink-100 to-blue-100 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 opacity-40 animate-gradient bg-[length:400%_400%]" />

      {/* Glowing radial overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/30 via-white/0 to-transparent dark:from-blue-500/10" />

      {/* Optional bokeh sparkle layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-pink-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-2/3 left-2/3 w-32 h-32 bg-yellow-200/20 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-44 h-44 bg-blue-300/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      {/* Main Form Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-500 animate-fade-in">
          Create New Event 📣
        </h2>

        <form onSubmit={handleCreateEvent} className="space-y-6">
          {step === 1 && (
            <>
              <InputField
                icon="🏷️"
                label="Title"
                value={title}
                onChange={setTitle}
              />
              <InputField
                icon="🆔"
                label="NGO ID"
                value={ngoId}
                onChange={setNgoId}
              />
              <InputField
                icon="📝"
                label="Description"
                value={description}
                onChange={setDescription}
              />
              <InputField
                icon="📍"
                label="Location"
                value={location}
                onChange={setLocation}
              />

              <button
                type="button"
                onClick={handleNext}
                className="w-full py-2 font-semibold rounded-lg transition bg-yellow-600 hover:bg-yellow-700 text-white dark:bg-gradient-to-r dark:from-blue-500 dark:to-indigo-600 dark:hover:from-blue-600 dark:hover:to-indigo-700"
              >
                Next ➡️
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <InputField
                icon="⏰"
                label="Start Time"
                value={startTime}
                onChange={setStartTime}
                type="datetime-local"
              />
              <InputField
                icon="🔚"
                label="End Time"
                value={endTime}
                onChange={setEndTime}
                type="datetime-local"
              />
              <InputField
                icon="📅"
                label="Google Calendar Event ID"
                value={googleEventId}
                onChange={setGoogleEventId}
              />
              <InputField
                icon="🖼️"
                label="Start Photo URL"
                value={startPhotoUrl}
                onChange={setStartPhotoUrl}
              />
              <InputField
                icon="🖼️"
                label="End Photo URL"
                value={endPhotoUrl}
                onChange={setEndPhotoUrl}
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                  className="accent-yellow-600 dark:accent-blue-600"
                />
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mark as Completed
                </label>
              </div>

              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium transition dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                >
                  ⬅️ Back
                </button>
                <button
                  type="submit"
                  className="w-full py-2 font-semibold rounded-lg transition bg-yellow-600 hover:bg-yellow-700 text-white dark:bg-gradient-to-r dark:from-green-500 dark:to-emerald-600 dark:hover:from-green-600 dark:hover:to-emerald-700"
                >
                  Create Event 🚀
                </button>
              </div>
            </>
          )}
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Want to go back?{" "}
          <a
            href="/"
            className="text-yellow-600 hover:text-yellow-700 font-medium dark:text-blue-400 dark:hover:text-blue-500"
          >
            Go to Dashboard
          </a>
        </p>
      </motion.div>

      {/* Add animation keyframes */}
      <style jsx>{`
        .animate-gradient {
          animation: gradientShift 15s ease infinite;
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-pulse-slow {
          animation: pulseSlow 10s infinite ease-in-out;
        }
        @keyframes pulseSlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

const InputField = ({ label, icon, value, onChange, type = "text" }) => (
  <div className="space-y-1">
    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
      {icon} {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={label}
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
      required={type !== "checkbox"}
    />
  </div>
);

export default CreateEventPage;
