"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateNGOPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    logo_url: "",
    contact_information: "",
    location: "",
    social_media_links: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    // Basic validation for step 1 fields
    if (!formData.name || !formData.description) {
      setError("Name and Description are required");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleBack = () => {
    setError("");
    setStep(1);
  };

  const handleCreateNGO = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const sessionToken = localStorage.getItem("session_token");
      if (!sessionToken) {
        throw new Error("No session token found. Please log in.");
      }

      // Prepare the data for submission
      const submissionData = {
        ...formData,
        social_media_links: formData.social_media_links
          .split(",")
          .map((link) => link.trim())
          .filter((link) => link !== ""),
      };

      const response = await fetch("http://127.0.0.1:5000/data/create_ngo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create NGO");
      }

      // Success - redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("NGO creation error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent dark:from-blue-500 dark:to-purple-500">
          Create Your NGO 📁
        </h2>

        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg dark:bg-red-900 dark:text-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleCreateNGO} className="space-y-6">
          {step === 1 && (
            <>
              <InputField
                name="name"
                icon="🏷️"
                label="NGO Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <InputField
                name="description"
                icon="📝"
                label="Description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <InputField
                name="website"
                icon="🌐"
                label="Website"
                value={formData.website}
                onChange={handleChange}
              />
              <InputField
                name="logo_url"
                icon="🖼️"
                label="Logo URL"
                value={formData.logo_url}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-2 font-semibold rounded-lg transition
                           bg-yellow-600 hover:bg-yellow-700 text-white
                           dark:bg-gradient-to-r dark:from-blue-500 dark:to-indigo-600
                           dark:hover:from-blue-600 dark:hover:to-indigo-700"
                disabled={isLoading}
              >
                Next ➡️
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <InputField
                name="contact_information"
                icon="📞"
                label="Contact Information"
                value={formData.contact_information}
                onChange={handleChange}
              />
              <InputField
                name="location"
                icon="📍"
                label="Location"
                value={formData.location}
                onChange={handleChange}
              />
              <InputField
                name="social_media_links"
                icon="🔗"
                label="Social Media Links (comma separated)"
                value={formData.social_media_links}
                onChange={handleChange}
              />

              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium transition dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  disabled={isLoading}
                >
                  ⬅️ Back
                </button>
                <button
                  type="submit"
                  className="w-full py-2 font-semibold rounded-lg transition
                                   bg-blue-600 hover:bg-blue-700 text-white
                                   dark:bg-gradient-to-r dark:from-green-500 dark:to-emerald-600
                                   dark:hover:from-green-600 dark:hover:to-emerald-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create NGO 🚀"}
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
      </div>
    </div>
  );
};

const InputField = ({
  name,
  label,
  icon,
  value,
  onChange,
  required = false,
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {icon} {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
      required={required}
    />
  </div>
);

export default CreateNGOPage;
