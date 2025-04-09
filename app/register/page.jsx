"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

const interestsList = [
  "Education",
  "Health",
  "Environment",
  "Animal Welfare",
  "Women Empowerment",
  "Poverty",
  "Child Welfare",
  "Human Rights",
];

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    interests: [],
    profile_pic: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleInterestClick = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: [...prev.interests, interest],
    }));
  };

  const removeInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match("image.*")) {
      setUploadError("Please select an image file");
      return;
    }

    // Validate file size (limit to 2MB for base64)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image size should be less than 2MB");
      return;
    }

    setUploadError("");
    setUploading(true);

    const reader = new FileReader();

    reader.onload = (event) => {
      const base64String = event.target.result;
      // console.log(base64String);
      setPreviewImage(base64String);
      setFormData((prev) => ({ ...prev, profile_pic: base64String }));
      setUploading(false);
    };

    reader.onerror = () => {
      setUploadError("Error reading file");
      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log(formData.interests);

    try {
      const response = await fetch("http://127.0.0.1:5000/data/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          interests: formData.interests,
          profile_pic_url: formData.profile_pic, // This will be the base64 string
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        localStorage.setItem("session_token", data.session_token);
        alert("Signup successful!");
        window.location.href = "/";
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // ... rest of your JSX remains the same ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 p-6 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a]">
      <div className="hero min-h-screen">
        <div className="hero-content w-full max-w-md">
          <div className="card bg-white/90 backdrop-blur-md shadow-2xl w-full dark:bg-gray-800/90">
            <div className="card-body">
              <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-500 flex items-center justify-center gap-2">
                📝 Register as a Volunteer
              </h2>

              <form className="space-y-4" onSubmit={handleRegister}>
                {/* Profile Picture */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2 dark:text-gray-200">
                      📷 Profile Picture
                    </span>
                  </label>
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      {previewImage || formData.profile_pic ? (
                        <img
                          src={previewImage || formData.profile_pic}
                          alt="Profile preview"
                          className="w-24 h-24 rounded-full object-cover border-2 border-yellow-500"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-500">No image</span>
                        </div>
                      )}
                      {uploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">
                            Uploading...
                          </span>
                        </div>
                      )}
                    </div>
                    <label className="cursor-pointer">
                      <span className="btn btn-sm bg-yellow-600 hover:bg-yellow-700 text-white">
                        Choose Image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>

                {/* Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2 dark:text-gray-200">
                      👤 Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange("name")}
                    className="input input-bordered hover:border-yellow-400 focus:border-yellow-500 text-gray-800 dark:text-white dark:bg-gray-700"
                    required
                  />
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2 dark:text-gray-200">
                      📧 Email
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange("email")}
                    className="input input-bordered hover:border-yellow-400 focus:border-yellow-500 text-gray-800 dark:text-white dark:bg-gray-700"
                    required
                  />
                </div>

                {/* Password */}
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text flex items-center gap-2 dark:text-gray-200">
                      🔑 Password
                    </span>
                  </label>
                  <input
                    type={isClient && showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange("password")}
                    className="input input-bordered pr-10 hover:border-yellow-400 focus:border-yellow-500 text-gray-800 dark:text-white dark:bg-gray-700"
                    required
                  />
                  {isClient && (
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-10 text-gray-500 dark:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text flex items-center gap-2 dark:text-gray-200">
                      🔐 Confirm Password
                    </span>
                  </label>
                  <input
                    type={isClient && showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    className="input input-bordered pr-10 hover:border-yellow-400 focus:border-yellow-500 text-gray-800 dark:text-white dark:bg-gray-700"
                    required
                  />
                  {isClient && (
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-10 text-gray-500 dark:text-gray-300"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  )}
                </div>

                {/* NGO Interests */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-yellow-700 dark:text-purple-300">
                    Select your NGO Interests:
                  </h3>

                  {formData.interests.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-4">
                      {formData.interests.map((interest) => (
                        <div
                          key={interest}
                          className="flex items-center bg-blue-600 text-white px-4 py-1 rounded-full shadow-md"
                        >
                          <span className="mr-2">{interest}</span>
                          <button
                            type="button"
                            onClick={() => removeInterest(interest)}
                            className="text-white font-bold"
                          >
                            ✖
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    {interestsList
                      .filter((i) => !formData.interests.includes(i))
                      .map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => handleInterestClick(interest)}
                          className="px-4 py-2 bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                        >
                          {interest}
                        </button>
                      ))}
                  </div>
                </div>

                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn text-white bg-yellow-600 hover:bg-yellow-700 dark:bg-gradient-to-r dark:from-blue-500 dark:to-indigo-600 dark:hover:from-blue-600 dark:hover:to-indigo-700"
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Register 🌟"}
                  </button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-4 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-yellow-600 hover:text-yellow-700 font-medium dark:text-blue-400 dark:hover:text-blue-500"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
