// app/(ngo)/create/page.jsx
"use client";

import React, { useState } from "react";

const CreateNGO = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    website: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/ngo/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("session_token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("NGO created successfully!");
        window.location.href = `/ngo/${data.id}`;
      } else {
        alert(data.error || "Failed to create NGO");
      }
    } catch (error) {
      console.error("Error creating NGO:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 p-6 dark:from-[#1a1a2e] dark:via-[#1a1a2e] dark:to-[#1a1a2e]">
      <div className="hero min-h-screen">
        <div className="hero-content w-full max-w-2xl">
          <div className="card bg-white/90 backdrop-blur-md shadow-2xl w-full dark:bg-gray-800/90">
            <div className="card-body">
              <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent dark:from-blue-500 dark:to-purple-500">
                Create New NGO 🌍
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {[
                  { label: "Name", key: "name", icon: "🏛️", type: "text" },
                  {
                    label: "Description",
                    key: "description",
                    icon: "📝",
                    type: "textarea",
                  },
                  {
                    label: "Location",
                    key: "location",
                    icon: "📍",
                    type: "text",
                  },
                  { label: "Website", key: "website", icon: "🌐", type: "url" },
                ].map((field, index) => (
                  <div key={index} className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 dark:text-gray-200">
                        {field.icon} {field.label}
                      </span>
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        value={formData[field.key]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.key]: e.target.value,
                          })
                        }
                        className="textarea textarea-bordered h-32 hover:border-yellow-400 focus:border-yellow-500 text-gray-800 dark:text-gray-200 dark:bg-gray-700"
                        required
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.key]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.key]: e.target.value,
                          })
                        }
                        className="input input-bordered hover:border-yellow-400 focus:border-yellow-500 text-gray-800 dark:text-gray-200 dark:bg-gray-700"
                        required
                      />
                    )}
                  </div>
                ))}

                <div className="form-control mt-6">
                  <button className="btn btn-primary text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                    Create NGO 🌟
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNGO;
