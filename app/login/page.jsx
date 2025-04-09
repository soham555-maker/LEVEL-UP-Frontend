"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Registering user:", { email, password });
      const response = await fetch("http://127.0.0.1:5000/auth/login/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("session_token", data.session_token);
        alert("Login successful!");
        window.location.href = "/";
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `http://127.0.0.1:5000/auth/login/${provider}`;
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative transition-all duration-300 ${
        isFocused ? "backdrop-blur-sm" : ""
      } bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 dark:from-[#1a1a2e] dark:via-[#1a1a2e] dark:to-[#1a1a2e] p-4`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-800/40 border border-white/30 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent dark:from-blue-500 dark:to-purple-500">
              Welcome Back ✨
            </h2>

            <form
              className="space-y-5"
              onSubmit={handleLogin}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
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
                <div key={index} className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2 dark:text-gray-200">
                      {field.icon} {field.label}
                    </span>
                  </label>
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    placeholder={field.label.toLowerCase()}
                    required
                    className="input input-bordered w-full bg-white/70 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-blue-500 transition-all"
                  />
                </div>
              ))}

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary w-full text-white bg-yellow-500 hover:bg-yellow-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-transform transform hover:scale-105"
                >
                  Login ✨
                </button>
              </div>

              <div className="divider">OR</div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin("google")}
                  className="btn gap-2 bg-white/70 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
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
                  className="btn gap-2 bg-white/70 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0C5.37 0 0 5.373 0 12a12.01 12.01 0 008.21 11.387c.6.112.82-.26.82-.577v-2.17c-3.34.726-4.04-1.416-4.04-1.416-.546-1.388-1.333-1.757-1.333-1.757-1.09-.744.082-.729.082-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.806 1.304 3.49.997.108-.775.42-1.305.764-1.604-2.666-.305-5.47-1.335-5.47-5.931 0-1.31.47-2.38 1.236-3.221-.125-.302-.535-1.524.116-3.176 0 0 1.01-.322 3.303 1.23.956-.266 1.982-.398 3.002-.404 1.02.006 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.243 2.874.119 3.176.77.841 1.235 1.912 1.235 3.222 0 4.61-2.807 5.624-5.48 5.92.43.372.823 1.103.823 2.223v3.293c0 .318.192.693.801.575A12.01 12.01 0 0024 12c0-6.627-5.373-12-12-12z" />
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
      </motion.div>
    </div>
  );
};

export default Page;
