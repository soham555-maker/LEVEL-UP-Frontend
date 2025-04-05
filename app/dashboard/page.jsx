"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeProvider";
import { useData } from "@/context/DataContext";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";

const UserDashboard = () => {
  const { theme } = useTheme();
  // Assuming you have a context for user data
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { me, events, loading, error } = useData();

  // User data and stats
  const [userStats, setUserStats] = useState({
    totalEvents: 24,
    attendedEvents: 18,
    upcomingEvents: 3,
    volunteerHours: 56,
  });

  // User activity logs
  const [activityLogs, setActivityLogs] = useState([
    {
      id: 1,
      eventName: "Community Cleanup",
      date: new Date("2025-03-15"),
      status: "attended",
      hours: 4,
    },
    {
      id: 2,
      eventName: "Food Distribution",
      date: new Date("2025-03-22"),
      status: "attended",
      hours: 5,
    },
    {
      id: 3,
      eventName: "Tree Plantation",
      date: new Date("2025-04-05"),
      status: "attended",
      hours: 6,
    },
    {
      id: 4,
      eventName: "Blood Donation Camp",
      date: new Date("2025-04-18"),
      status: "registered",
      hours: 0,
    },
  ]);

  // Calendar events
  // const [events, setEvents] = useState([
  //   {
  //     id: 1,
  //     title: "Tree Plantation Drive",
  //     description: "Planting trees in the community park.",
  //     location: "Community Park, City Center",
  //     date: new Date("2025-04-15"),
  //     start_time: "10:00",
  //     end_time: "13:00",
  //     status: "attended",
  //   },
  //   {
  //     id: 2,
  //     title: "Food Distribution",
  //     description: "Distributing food to the underprivileged.",
  //     location: "Downtown Shelter",
  //     date: new Date("2025-04-25"),
  //     start_time: "12:00",
  //     end_time: "15:00",
  //     status: "registered",
  //   },
  // ]);

  // Calendar rendering functions
  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => setCurrentDate(subMonths(currentDate, 1))}
        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        ⬅
      </button>
      <h2 className="font-bold text-xl md:text-2xl text-yellow-700 dark:text-blue-400">
        {format(currentDate, "MMMM yyyy")}
      </h2>
      <button
        onClick={() => setCurrentDate(addMonths(currentDate, 1))}
        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        ➡
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const start = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="text-center text-sm font-semibold text-yellow-800 dark:text-blue-300"
        >
          {format(addDays(start, i), "EEE")}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];

    let day = startDate;
    let days = [];

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        const isToday = isSameDay(cloneDay, new Date());
        const isCurrentMonth = isSameMonth(cloneDay, monthStart);
        const dayEvents = events.filter((event) =>
          isSameDay(new Date(event.date), cloneDay)
        );
        const hasEvent = dayEvents.length > 0;

        days.push(
          <div
            key={cloneDay.toString()}
            className={`min-h-[100px] p-2 rounded-lg shadow-sm transition-all duration-200 cursor-pointer flex flex-col justify-between border
              ${
                !isCurrentMonth
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400"
                  : hasEvent
                  ? "bg-green-100 dark:bg-green-900 text-gray-800 dark:text-white hover:brightness-105"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700"
              }
              border-gray-200 dark:border-gray-700`}
            onClick={() => {
              setSelectedDate(cloneDay);
              const dayEvents = events.filter((event) =>
                isSameDay(new Date(event.date), cloneDay)
              );
              if (dayEvents.length > 0) {
                setIsModalOpen(true);
              }
            }}
          >
            <div className="flex justify-between items-center">
              <span
                className={`font-semibold ${
                  isToday ? "text-yellow-600 dark:text-blue-400" : ""
                }`}
              >
                {format(cloneDay, "d")}
              </span>
              {isToday && (
                <span className="text-[10px] px-2 py-0.5 bg-yellow-500 dark:bg-blue-600 text-white rounded-full">
                  Today
                </span>
              )}
            </div>

            {hasEvent && (
              <div className="mt-1 space-y-1">
                {dayEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className={`text-xs p-1 rounded truncate ${
                      event.status === "attended"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 dark:bg-blue-600 text-white"
                    }`}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="grid grid-cols-7 gap-2 mb-2" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  const renderModal = () => {
    if (!isModalOpen || !selectedDate) return null;

    const dayEvents = events.filter((event) =>
      isSameDay(new Date(event.date), selectedDate)
    );

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md relative max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4 text-yellow-700 dark:text-blue-400">
              Events on {format(selectedDate, "MMMM d, yyyy")}
            </h3>

            {dayEvents.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">
                No events scheduled for this day.
              </p>
            ) : (
              <div className="space-y-4">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg text-yellow-800 dark:text-blue-300">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {event.location}
                        </p>
                        <p className="text-sm mt-1">
                          <span className="font-medium">Time:</span>{" "}
                          {event.start_time} - {event.end_time}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          event.status === "attended"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 dark:bg-blue-600 text-white"
                        }`}
                      >
                        {event.status === "attended"
                          ? "Attended"
                          : "Registered"}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      {event.description}
                    </p>
                    <div className="mt-4 flex justify-end">
                      <button
                        className="px-3 py-1 bg-yellow-500 dark:bg-blue-600 text-white rounded hover:bg-yellow-600 dark:hover:bg-blue-700 text-sm"
                        onClick={() => {
                          alert(`Details for ${event.title}`);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white px-4 py-8 md:px-8 overflow-x-hidden">
      {/* Dashboard Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-800 dark:text-blue-300 mb-2">
          Welcome Back, Volunteer!
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Here's your volunteering dashboard and activity summary.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {[
          {
            title: "Total Events",
            value: userStats.totalEvents,
            icon: "📅",
            color: "bg-yellow-100 dark:bg-yellow-900",
            text: "text-yellow-800 dark:text-yellow-200",
          },
          {
            title: "Attended",
            value: userStats.attendedEvents,
            icon: "✅",
            color: "bg-green-100 dark:bg-green-900",
            text: "text-green-800 dark:text-green-200",
          },
          {
            title: "Upcoming",
            value: userStats.upcomingEvents,
            icon: "🔜",
            color: "bg-blue-100 dark:bg-blue-900",
            text: "text-blue-800 dark:text-blue-200",
          },
          {
            title: "Volunteer Hours",
            value: userStats.volunteerHours,
            icon: "⏱️",
            color: "bg-purple-100 dark:bg-purple-900",
            text: "text-purple-800 dark:text-purple-200",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className={`${stat.color} ${stat.text} p-6 rounded-xl shadow-md flex items-center justify-between`}
          >
            <div>
              <p className="text-sm font-medium">{stat.title}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
            <span className="text-4xl">{stat.icon}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Activity Calendar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-yellow-800 dark:text-blue-300">
              Your Volunteer Calendar
            </h2>
            <button
              className="px-4 py-2 bg-yellow-500 dark:bg-blue-600 text-white rounded hover:bg-yellow-600 dark:hover:bg-blue-700 text-sm"
              onClick={() => alert("View full calendar")}
            >
              View All
            </button>
          </div>
          {renderHeader()}
          {renderDays()}
          {renderCells()}
          {renderModal()}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-6 text-yellow-800 dark:text-blue-300">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {activityLogs.map((log) => (
              <motion.div
                key={log.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border ${
                  log.status === "attended"
                    ? "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800"
                    : "bg-yellow-50 dark:bg-blue-900/30 border-yellow-200 dark:border-blue-800"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-yellow-800 dark:text-blue-300">
                      {log.eventName}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {format(log.date, "MMMM d, yyyy")}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      log.status === "attended"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 dark:bg-blue-600 text-white"
                    }`}
                  >
                    {log.status === "attended" ? "Attended" : "Registered"}
                  </span>
                </div>
                {log.status === "attended" && (
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    Volunteered for {log.hours} hours
                  </p>
                )}
              </motion.div>
            ))}
          </div>
          <button
            className="mt-6 w-full py-2 border border-yellow-500 dark:border-blue-600 text-yellow-700 dark:text-blue-400 rounded hover:bg-yellow-50 dark:hover:bg-blue-900/20 transition-colors"
            onClick={() => alert("View all activities")}
          >
            View All Activities
          </button>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-yellow-800 dark:text-blue-300">
            Your Upcoming Events
          </h2>
          <button
            className="px-4 py-2 bg-yellow-500 dark:bg-blue-600 text-white rounded hover:bg-yellow-600 dark:hover:bg-blue-700 text-sm"
            onClick={() => alert("Browse more events")}
          >
            Browse Events
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events
            .filter((event) => event.status === "registered")
            .map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ y: -5 }}
                className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-yellow-100 dark:bg-blue-900 p-4">
                  <h3 className="font-semibold text-yellow-800 dark:text-blue-300">
                    {event.title}
                  </h3>
                  <p className="text-sm text-yellow-700 dark:text-blue-200 mt-1">
                    {format(event.date, "MMMM d, yyyy")} • {event.start_time} -{" "}
                    {event.end_time}
                  </p>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    {event.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-yellow-500 dark:bg-blue-600 text-white px-2 py-1 rounded-full">
                      Registered
                    </span>
                    <button
                      className="text-sm text-yellow-700 dark:text-blue-400 hover:underline"
                      onClick={() => alert(`Details for ${event.title}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
