"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CalendarPage from "../../../Components/CalendarPage/CalendarPage";
import { useData } from "@/context/DataContext";
import { useParams } from "next/navigation";

const NgoProfilePage = () => {
  const router = useRouter();
  const { events, loading, error } = useData();
  const { id: ngoId } = useParams();
  const filteredEvents = events.filter((event) => event.ngo_id == ngoId);

  const formatDateTime = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  const handleEventClick = (eventId) => {
    router.push(`/events/${eventId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 dark:from-[#1a1a2e] dark:via-[#1a1a2e] dark:to-[#1a1a2e] text-gray-800 dark:text-gray-100 py-10 px-4">
      <div className="w-full mx-auto flex flex-col lg:flex-row gap-8">
        {/* Calendar Section */}
        <div className="w-full lg:w-[70%] bg-gray-50 dark:bg-gray-800/90 shadow-xl backdrop-blur-md rounded-xl p-6">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-500">
            NGO Events Calendar
          </h1>
          <CalendarPage events={events} />
        </div>

        {/* Events List Section */}
        <div className="w-full lg:w-[30%] bg-white/90 dark:bg-gray-800/90 shadow-xl backdrop-blur-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6 text-yellow-700 dark:text-purple-300">
            Scheduled Events
          </h2>
          <div className="space-y-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event._id)}
                className="p-5 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md space-y-3 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      event.completed
                        ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-400"
                    }`}
                  >
                    {event.completed ? "Completed" : "Upcoming"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {event.description}
                </p>
                <p className="text-sm">
                  📍 <span>{event.location}</span>
                </p>
                <p className="text-sm">
                  🕒{" "}
                  <span>
                    {formatDateTime(event.start_time)} -{" "}
                    {formatDateTime(event.end_time)}
                  </span>
                </p>
                <div className="flex gap-3 pt-2">
                  {event.start_photo_url && (
                    <div>
                      <p className="text-xs mb-1 text-gray-500 dark:text-gray-400">
                        Start
                      </p>
                      <img
                        src={event.start_photo_url}
                        alt="Start"
                        className="w-20 h-20 rounded-md object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                    </div>
                  )}
                  {event.end_photo_url && (
                    <div>
                      <p className="text-xs mb-1 text-gray-500 dark:text-gray-400">
                        End
                      </p>
                      <img
                        src={event.end_photo_url}
                        alt="End"
                        className="w-20 h-20 rounded-md object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <div className="flex -space-x-2">
                    {event.participants.slice(0, 3).map((participant) => (
                      <div
                        key={participant} // Using participant ID as key
                        className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden text-xs"
                        title={participant}
                      >
                        {participant.substring(4, 5).toUpperCase()}
                      </div>
                    ))}
                    {event.participants.length > 3 && (
                      <div className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-500 flex items-center justify-center text-xs">
                        +{event.participants.length - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {event.participants.length} participants
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NgoProfilePage;
