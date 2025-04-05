"use client";

import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      console.log("Registering user:", { email, password, name });
      const response = await fetch("http://localhost:5000/auth/signup/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name, // Replace with a name input if needed
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("session_token", data.session_token);
        alert("Signup successful!");
        window.location.href = "/"; // Redirect to desired route
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 p-6 dark:from-[#1a1a2e] dark:via-[#1a1a2e] dark:to-[#1a1a2e]">
      <div className="hero min-h-screen">
        <div className="hero-content w-full max-w-md">
          <div className="card bg-white/90 backdrop-blur-md shadow-2xl w-full dark:bg-gray-800/90">
            <div className="card-body">
              <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent dark:from-blue-500 dark:to-purple-500">
                Create Account ✨
              </h2>
              <form className="space-y-4" onSubmit={handleRegister}>
                {[
                  {
                    label: "Name",
                    type: "text",
                    value: name,
                    setter: setName,
                    icon: "👤",
                  },
                  {
                    label: "Email",
                    type: "email",
                    value: email,
                    setter: setEmail,
                    icon: "📧",
                  },
                  {
                    label: "Password",
                    type: "password",
                    value: password,
                    setter: setPassword,
                    icon: "🔑",
                  },
                  {
                    label: "Confirm Password",
                    type: "password",
                    value: confirmPassword,
                    setter: setConfirmPassword,
                    icon: "🔐",
                  },
                ].map((field, index) => (
                  <div
                    key={index}
                    className="form-control"
                    style={{ "--index": index }}
                  >
                    <label className="label">
                      <span className="label-text flex items-center gap-2 dark:text-gray-200">
                        {field.icon} {field.label}
                      </span>
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.label.toLowerCase()}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      className="input input-bordered hover:border-yellow-400 focus:border-yellow-500 text-gray-800 dark:text-gray-200 dark:bg-gray-700"
                      required
                    />
                  </div>
                ))}

                <div className="form-control mt-6">
                  <button className="btn btn-primary text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                    Create Account ✨
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
