"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
  parseISO,
} from "date-fns";

const CalendarPage = ({ events: propEvents = [] }) => {
  const router = useRouter();
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([
    ...propEvents,
    {
      id: "event001",
      title: "Tree Plantation Drive",
      description: "Planting trees in the community park.",
      location: "Community Park, City Center",
      start_time: "2025-04-15T10:00:00",
      end_time: "2025-04-15T13:00:00",
      start_photo_url: "https://via.placeholder.com/150",
      end_photo_url: "https://via.placeholder.com/150",
      completed: false,
      organizer_id: "user123",
      participants: ["user456", "user789"],
      attendance: {},
    },
    {
      id: "event002",
      title: "Food Distribution",
      description: "Distributing food to the underprivileged.",
      location: "Downtown Shelter",
      start_time: "2025-04-25T12:00:00",
      end_time: "2025-04-25T15:00:00",
      start_photo_url: "https://via.placeholder.com/150",
      end_photo_url: "https://via.placeholder.com/150",
      completed: true,
      organizer_id: "user124",
      participants: ["user123", "user456"],
      attendance: { user123: 3, user456: 2.5 },
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    start_time: "",
    end_time: "",
  });

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => setCurrentDate(subMonths(currentDate, 1))}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        ⬅
      </button>
      <h2 className="font-bold text-2xl text-blue-700 dark:text-white">
        {format(currentDate, "MMMM yyyy")}
      </h2>
      <button
        onClick={() => setCurrentDate(addMonths(currentDate, 1))}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
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
          className="text-center text-sm font-semibold text-gray-600 dark:text-gray-300"
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
        const isToday = isSameDay(cloneDay, today);
        const isCurrentMonth = isSameMonth(cloneDay, monthStart);
        const dayEvents = events.filter((event) =>
          isSameDay(parseISO(event.start_time), cloneDay)
        );
        const hasEvent = dayEvents.length > 0;

        days.push(
          <div
            key={cloneDay}
            className={`min-h-[120px] p-2 rounded-xl shadow-sm transition-all duration-200 cursor-pointer flex flex-col justify-between border
              ${
                !isCurrentMonth
                  ? "bg-gray-100 text-gray-400 dark:bg-gray-800"
                  : hasEvent
                  ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800"
                  : "bg-white text-gray-800 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              }
              dark:border-gray-700`}
            onClick={() => {
              if (hasEvent && dayEvents.length === 1) {
                router.push(`/event/${dayEvents[0].id}`);
              } else {
                setSelectedDate(cloneDay);
                setIsModalOpen(true);
                setFormData({
                  title: "",
                  location: "",
                  description: "",
                  start_time: format(cloneDay, "yyyy-MM-dd") + "T10:00",
                  end_time: format(cloneDay, "yyyy-MM-dd") + "T12:00",
                });
              }
            }}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{format(cloneDay, "d")}</span>
              {isToday && (
                <span className="text-[10px] px-2 py-0.5 bg-blue-600 text-white rounded-full">
                  Today
                </span>
              )}
            </div>

            {hasEvent && (
              <div className="mt-2 space-y-1 animate-fade-in">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-2 rounded-md shadow-sm text-xs ${
                      event.completed
                        ? "bg-green-50 text-green-800 dark:bg-green-800/30"
                        : "bg-blue-50 text-blue-800 dark:bg-blue-800/30"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/event/${event.id}`);
                    }}
                  >
                    <div className="font-bold truncate">{event.title}</div>
                    {!event.completed && (
                      <button
                        className="mt-2 w-full text-xs font-medium px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/event/${event.id}`);
                        }}
                      >
                        View Details
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="grid grid-cols-7 gap-3 mb-3" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newEvent = {
      id: `event${events.length + 1}`,
      ...formData,
      start_time: formData.start_time,
      end_time: formData.end_time,
      start_photo_url: "https://via.placeholder.com/150",
      end_photo_url: "https://via.placeholder.com/150",
      completed: false,
      organizer_id: "current_user_id", // Replace with actual user ID
      participants: [],
      attendance: {},
    };

    setEvents([...events, newEvent]);
    setIsModalOpen(false);
  };

  const renderModal = () => {
    if (!isModalOpen || !selectedDate) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md relative">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            Add Event for {format(selectedDate, "dd MMM yyyy")}
          </h3>
          <form className="space-y-3" onSubmit={handleSave}>
            <input
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-800"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-800"
              required
            />
            <input
              type="datetime-local"
              value={formData.start_time}
              onChange={(e) =>
                setFormData({ ...formData, start_time: e.target.value })
              }
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-800"
              required
            />
            <input
              type="datetime-local"
              value={formData.end_time}
              onChange={(e) =>
                setFormData({ ...formData, end_time: e.target.value })
              }
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-800"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-800"
              required
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 border rounded-xl shadow-xl p-6 dark:border-gray-700">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      {renderModal()}
    </div>
  );
};

export default CalendarPage;
