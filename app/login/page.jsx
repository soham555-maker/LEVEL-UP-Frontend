"use client";

import React from "react";
import { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Registering user:", { email, password });
      const response = await fetch("http://localhost:5000/auth/login/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
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

  const handleSocialLogin = (provider) => {
    // Replace with your actual social login endpoint
    window.location.href = `http://localhost:5000/auth/login/${provider}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 p-6 dark:from-[#1a1a2e] dark:via-[#1a1a2e] dark:to-[#1a1a2e]">
      <div className="hero min-h-screen">
        <div className="hero-content w-full max-w-md">
          <div className="card bg-white/90 backdrop-blur-md shadow-2xl w-full dark:bg-gray-800/90">
            <div className="card-body">
              <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent dark:from-blue-500 dark:to-purple-500">
                Welcome Back ✨
              </h2>
              <form className="space-y-4" onSubmit={handleLogin}>
                {[
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
                    Login ✨
                  </button>
                </div>

                <div className="divider">OR</div>

                <div className="flex flex-col space-y-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("google")}
                    className="btn  gap-2 bg-aliceblue-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("github")}
                    className="btn  gap-2 bg-aliceblue-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 "
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                        fill="currentColor"
                      />
                    </svg>
                    Continue with GitHub
                  </button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-4 dark:text-gray-400">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="text-yellow-600 hover:text-yellow-700 font-medium dark:text-blue-400 dark:hover:text-blue-500"
                  >
                    Register here
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
