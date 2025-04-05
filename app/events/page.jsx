// app/events/page.jsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const EventsPage = () => {
  const router = useRouter();

  const [events] = useState([
    {
      id: "event001",
      title: "Beach Cleanup Drive",
      description: "Join us to clean up the city's main beach area",
      ngo: "Green Earth",
      location: "Marine Drive Beach",
      start_time: "2023-12-05T09:00:00",
      end_time: "2023-12-05T12:00:00",
      start_photo_url: "https://via.placeholder.com/150",
      end_photo_url: "https://via.placeholder.com/150",
      participants: ["user456", "user789"],
      attendance: {},
      completed: false, // New field
    },
    {
      id: "event002",
      title: "Winter Clothes Distribution",
      description: "Distributing warm clothes to homeless people",
      ngo: "Helping Hands",
      location: "City Shelter",
      start_time: "2023-12-10T14:00:00",
      end_time: "2023-12-10T17:00:00",
      start_photo_url: "https://via.placeholder.com/150",
      end_photo_url: "https://via.placeholder.com/150",
      participants: ["user123", "user456"],
      attendance: { user123: 3, user456: 2.5 },
      completed: true, // New field
    },
  ]);

  const formatEventDate = (isoString) => {
    try {
      return format(new Date(isoString), "MM/dd/yyyy");
    } catch {
      return isoString.split("T")[0];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 dark:from-[#1a1a2e] dark:via-[#1a1a2e] dark:to-[#1a1a2e] text-gray-800 dark:text-gray-100">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white/90 dark:bg-gray-800/90 shadow-xl backdrop-blur-md rounded-xl p-6">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-500">
            Upcoming Events
          </h1>

          <ul className="space-y-6">
            {events.map((event) => (
              <li
                key={event.id}
                className="bg-white/80 dark:bg-gray-700/80 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold">{event.title}</h2>
                      <p className="text-sm mt-1">{event.description}</p>
                      <div className="mt-2">
                        <p className="text-sm">📍 {event.location}</p>
                        <p className="text-sm">
                          🕒 {formatEventDate(event.start_time)} -{" "}
                          {formatEventDate(event.end_time)}
                        </p>
                        <p className="text-sm">🏢 Organized by: {event.ngo}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push(`/events/${event.id}`)}
                      className="px-4 py-2 bg-transparent border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-md hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition"
                    >
                      View Details
                    </button>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {event.participants.map((participant, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden text-xs"
                          title={participant}
                        >
                          {participant.substring(4, 5).toUpperCase()}
                        </div>
                      ))}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        event.completed
                          ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-400"
                      }`}
                    >
                      {event.completed ? "Completed" : "Upcoming"}
                    </span>
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

export default EventsPage;
