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
  const [attendanceData, setAttendanceData] = useState([]);

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

    // Prepare attendance data when event is completed
    if (currentEvent?.completed) {
      const attendanceList = [];
      users.forEach((user) => {
        if (user.attendance_summary && user.attendance_summary[id]) {
          attendanceList.push({
            userId: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profile_pic_url,
            hours: user.attendance_summary[id],
          });
        }
      });
      setAttendanceData(attendanceList);
    }
  }, [id, events, me, users]);

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

    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }

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
        "http://127.0.0.1:5000/attendance/process_event",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_id: id,
            start_photo: photos.start,
            end_photo: photos.end,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

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

  const handleRegister = async () => {
    try {
      const sessionToken = localStorage.getItem("session_token");

      if (!sessionToken) {
        alert("You need to be logged in to register for events");
        router.push("/login");
        return;
      }

      const response = await fetch("http://127.0.0.1:5000/register/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          event_id: id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setEvent((prev) => ({
        ...prev,
        participants: [...prev.participants, me.id],
      }));

      alert("Successfully registered for the event!");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message || "Failed to register for the event");
    }
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
                    Attendance Summary
                  </h2>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                    {attendanceData.length > 0 ? (
                      <div className="space-y-4">
                        {attendanceData.map((user) => (
                          <div
                            key={`attendance-${user.userId}`}
                            className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-600/50 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={
                                  user.profilePic ||
                                  "https://via.placeholder.com/40"
                                }
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://via.placeholder.com/40";
                                }}
                              />
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                            <div className="bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full text-yellow-800 dark:text-yellow-200">
                              {user.hours} hrs
                            </div>
                          </div>
                        ))}
                      </div>
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
                event.participants.map((participantId) => {
                  const participant = users.find(
                    (u) => u._id === participantId
                  );
                  return (
                    <div
                      key={`participant-${participantId}`}
                      className="flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-400 rounded-full text-sm space-x-2"
                    >
                      {participant?.profile_pic_url ? (
                        <img
                          src={participant.profile_pic_url}
                          alt={participant?.name}
                          className="w-5 h-5 rounded-full"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/20";
                          }}
                        />
                      ) : null}
                      <span>
                        {participant?.name || `User ${participantId.slice(-3)}`}
                      </span>
                    </div>
                  );
                })
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
