// app/event/[id]/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";

const EventDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [photos, setPhotos] = useState({ start: null, end: null });
  const [isOrganizer, setIsOrganizer] = useState(false); // Add organizer check

  useEffect(() => {
    const dummyEvents = [
      {
        id: "event001",
        title: "Beach Cleanup Drive",
        description: "Join us to clean up the city's main beach area",
        ngo: "Green Earth",
        location: "Marine Drive Beach",
        start_time: "2023-12-05T09:00:00",
        end_time: "2023-12-05T12:00:00",
        start_photo_url: null, // Initially null
        end_photo_url: null, // Initially null
        participants: ["user456", "user789"],
        attendance: {},
        completed: false,
        organizer_id: "user123", // Add organizer ID
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
        completed: true,
        organizer_id: "user124",
      },
    ];

    const foundEvent = dummyEvents.find((e) => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
      // In a real app, you would check against the logged-in user's ID
      setIsOrganizer(foundEvent.organizer_id === "user123"); // Example check
    }
  }, [id]);

  const formatDateTime = (isoString) => {
    try {
      return format(parseISO(isoString), "MMM dd, yyyy h:mm a");
    } catch {
      return isoString;
    }
  };

  const handleCompleteEvent = () => {
    if (!photos.start || !photos.end) {
      alert("Please provide both start and end photos");
      return;
    }
    // In a real app, you would send this to your backend
    alert("Event completion submitted to backend");
    setEvent((prev) => ({
      ...prev,
      start_photo_url: photos.start,
      end_photo_url: photos.end,
      completed: true,
    }));
  };

  const handleRegister = () => {
    alert("Registration functionality to be implemented");
  };

  if (!event) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 dark:from-[#1a1a2e] dark:via-[#1a1a2e] dark:to-[#1a1a2e] text-gray-800 dark:text-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 dark:bg-gray-800/90 shadow-xl backdrop-blur-md rounded-xl p-6">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-500">
            {event.title}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="space-y-4">
                <p className="text-lg">{event.description}</p>

                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-semibold">📍 Location</p>
                  <p>{event.location}</p>
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-semibold">🕒 Timing</p>
                  <p>
                    {formatDateTime(event.start_time)} -{" "}
                    {formatDateTime(event.end_time)}
                  </p>
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-semibold">🏢 Organized by</p>
                  <p>{event.ngo}</p>
                </div>
              </div>

              {!event.completed && (
                <div className="mt-6">
                  <button
                    onClick={handleRegister}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Register for Event
                  </button>
                </div>
              )}
            </div>

            <div>
              {event.completed ? (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-yellow-700 dark:text-purple-300">
                    Event Photos
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {event.start_photo_url ? (
                      <div>
                        <p className="text-sm mb-2">Start Photo</p>
                        <img
                          src={event.start_photo_url}
                          className="w-full h-48 object-cover rounded-lg"
                          alt="Start"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150";
                          }}
                        />
                      </div>
                    ) : null}
                    {event.end_photo_url ? (
                      <div>
                        <p className="text-sm mb-2">End Photo</p>
                        <img
                          src={event.end_photo_url}
                          className="w-full h-48 object-cover rounded-lg"
                          alt="End"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150";
                          }}
                        />
                      </div>
                    ) : null}
                  </div>

                  <h2 className="text-xl font-semibold mb-4 text-yellow-700 dark:text-purple-300">
                    Attendance Hours
                  </h2>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                    {Object.keys(event.attendance).length > 0 ? (
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="text-left">Volunteer</th>
                            <th className="text-right">Hours</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(event.attendance).map(
                            ([userId, hours]) => (
                              <tr
                                key={userId}
                                className="border-t border-gray-200 dark:border-gray-600"
                              >
                                <td className="py-2">
                                  User {userId.slice(-3)}
                                </td>
                                <td className="py-2 text-right">{hours} hrs</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-center text-gray-500">
                        No attendance records yet
                      </p>
                    )}
                  </div>
                </>
              ) : isOrganizer ? (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-yellow-700 dark:text-purple-300">
                    Organizer Controls
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">
                        Start Photo URL
                      </label>
                      <input
                        type="url"
                        value={photos.start || ""}
                        onChange={(e) =>
                          setPhotos({
                            ...photos,
                            start: e.target.value || null,
                          })
                        }
                        className="w-full p-2 rounded border dark:bg-gray-700"
                        placeholder="Enter image URL"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">
                        End Photo URL
                      </label>
                      <input
                        type="url"
                        value={photos.end || ""}
                        onChange={(e) =>
                          setPhotos({ ...photos, end: e.target.value || null })
                        }
                        className="w-full p-2 rounded border dark:bg-gray-700"
                        placeholder="Enter image URL"
                      />
                    </div>
                    <button
                      onClick={handleCompleteEvent}
                      className="w-full py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                    >
                      Mark Event as Complete
                    </button>
                  </div>
                </>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <h2 className="text-xl font-semibold mb-4 text-yellow-700 dark:text-purple-300">
                    Event Status
                  </h2>
                  <p>
                    This event is currently ongoing. Check back later for photos
                    and attendance records.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-yellow-700 dark:text-purple-300">
              Participants ({event.participants.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {event.participants.length > 0 ? (
                event.participants.map((participant, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-400 rounded-full text-sm"
                  >
                    User {participant.slice(-3)}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No participants yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
