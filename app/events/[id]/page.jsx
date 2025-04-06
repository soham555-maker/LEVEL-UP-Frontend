"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { useData } from "@/context/DataContext";

const EventDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [photos, setPhotos] = useState({
    start: null,
    end: null,
    startPreview: null,
    endPreview: null,
  });
  const { events, me, users } = useData();
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [uploading, setUploading] = useState({ start: false, end: false });

  useEffect(() => {
    const currentEvent = events.find((e) => e._id === id);
    const currentUser = users.find((u) => u._id === me?.id);
    if (currentUser?.ngos_owned) {
      currentUser.ngos_owned.forEach((ngo) => {
        if (currentEvent?.ngo_id === ngo) {
          setIsOrganizer(true);
        }
      });
    }
    setEvent(currentEvent);
  }, [id, events, me]);

  const formatDateTime = (isoString) => {
    try {
      return format(parseISO(isoString), "MMM dd, yyyy h:mm a");
    } catch {
      return isoString;
    }
  };

  const handleImageUpload = (type) => async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB");
      return;
    }

    setUploading({ ...uploading, [type]: true });

    const reader = new FileReader();

    reader.onload = (event) => {
      const base64String = event.target.result;
      setPhotos((prev) => ({
        ...prev,
        [type]: base64String,
        [`${type}Preview`]: URL.createObjectURL(file),
      }));
      setUploading({ ...uploading, [type]: false });
    };

    reader.onerror = () => {
      alert("Error reading file");
      setUploading({ ...uploading, [type]: false });
    };

    reader.readAsDataURL(file);
  };
  const handleCompleteEvent = async () => {
    if (!photos.start || !photos.end) {
      alert("Please provide both start and end photos");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1/attendance/process_event",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add authorization header if needed
            // "Authorization": `Bearer ${yourAuthToken}`
          },
          body: JSON.stringify({
            event_id: id, // using the event id from URL params
            start_photo: photos.start,
            end_photo: photos.end,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Update local state only after successful backend response
      setEvent((prev) => ({
        ...prev,
        start_photo_url: photos.start,
        end_photo_url: photos.end,
        completed: true,
      }));

      alert("Event completed successfully!");
    } catch (error) {
      console.error("Error completing event:", error);
      alert("Failed to complete event. Please try again.");
    }
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
                    {event.start_photo_url && (
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
                    )}
                    {event.end_photo_url && (
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
                    )}
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
                                key={`attendance-${userId}`}
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
                      <label className="block text-sm mb-2">Start Photo</label>
                      <div className="flex flex-col items-center gap-2">
                        {photos.startPreview ? (
                          <img
                            src={photos.startPreview}
                            className="w-full h-48 object-cover rounded-lg mb-2"
                            alt="Start preview"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-2">
                            <span className="text-gray-500">
                              No image selected
                            </span>
                          </div>
                        )}
                        <label className="cursor-pointer w-full">
                          <div className="w-full py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition text-center">
                            {uploading.start
                              ? "Uploading..."
                              : "Upload Start Photo"}
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload("start")}
                            className="hidden"
                            disabled={uploading.start}
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-2">End Photo</label>
                      <div className="flex flex-col items-center gap-2">
                        {photos.endPreview ? (
                          <img
                            src={photos.endPreview}
                            className="w-full h-48 object-cover rounded-lg mb-2"
                            alt="End preview"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-2">
                            <span className="text-gray-500">
                              No image selected
                            </span>
                          </div>
                        )}
                        <label className="cursor-pointer w-full">
                          <div className="w-full py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition text-center">
                            {uploading.end
                              ? "Uploading..."
                              : "Upload End Photo"}
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload("end")}
                            className="hidden"
                            disabled={uploading.end}
                          />
                        </label>
                      </div>
                    </div>
                    <button
                      onClick={handleCompleteEvent}
                      className="w-full py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                      disabled={uploading.start || uploading.end}
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
                event.participants.map((participant) => (
                  <div
                    key={`participant-${participant}`}
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
