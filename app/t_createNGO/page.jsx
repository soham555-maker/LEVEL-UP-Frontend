"use client";

import React, { useState } from "react";

const CreateNGOPage = () => {
    const [step, setStep] = useState(1);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [website, setWebsite] = useState("");
    const [logoUrl, setLogoUrl] = useState("");
    const [contact, setContact] = useState("");
    const [location, setLocation] = useState("");
    const [socialLinks, setSocialLinks] = useState("");

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);

    const handleCreateNGO = async (e) => {
        e.preventDefault();
        try {
            const sessionToken = localStorage.getItem("session_token");

            const response = await fetch("http://localhost:5000/ngo/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionToken}`,
                },
                body: JSON.stringify({
                    name,
                    description,
                    website,
                    logo_url: logoUrl,
                    contact_information: contact,
                    location,
                    social_media_links: socialLinks.split(",").map((link) => link.trim()),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("NGO created successfully!");
                window.location.href = "/dashboard";
            } else {
                alert(data.error || "Failed to create NGO.");
            }
        } catch (error) {
            console.error("Error creating NGO:", error);
            alert("Something went wrong. Try again.");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Blurred Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/login_back"
                    alt="Background"
                    className="object-cover w-full h-full filter blur-md scale-110"
                />
                <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-sm"></div>
            </div>

            {/* Sparkle animation */}
            <div className="absolute inset-0 z-10 pointer-events-none sparkle-bg" />

            <div className="relative z-20 w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-md">
                <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent dark:from-blue-500 dark:to-purple-500 animate-pulse">
                    Create Your NGO ✨
                </h2>

                <form onSubmit={handleCreateNGO} className="space-y-6">
                    {step === 1 && (
                        <>
                            <InputField icon="🏷️" label="NGO Name" value={name} onChange={setName} />
                            <InputField icon="📝" label="Description" value={description} onChange={setDescription} />
                            <InputField icon="🌐" label="Website" value={website} onChange={setWebsite} />
                            <InputField icon="🖼️" label="Logo URL" value={logoUrl} onChange={setLogoUrl} />
                            <button
                                type="button"
                                onClick={handleNext}
                                className="w-full py-2 font-semibold rounded-lg transition bg-yellow-600 hover:bg-yellow-700 text-white dark:bg-gradient-to-r dark:from-blue-500 dark:to-indigo-600 dark:hover:from-blue-600 dark:hover:to-indigo-700"
                            >
                                Next ➡️
                            </button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <InputField icon="📞" label="Contact Information" value={contact} onChange={setContact} />
                            <InputField icon="📍" label="Location" value={location} onChange={setLocation} />
                            <InputField
                                icon="🔗"
                                label="Social Media Links (comma separated)"
                                value={socialLinks}
                                onChange={setSocialLinks}
                            />

                            <div className="flex justify-between gap-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="w-full py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium transition dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                                >
                                    ⬅️ Back
                                </button>
                                <button
                                    type="submit"
                                    className="w-full py-2 font-semibold rounded-lg transition bg-blue-600 hover:bg-blue-700 text-white dark:bg-gradient-to-r dark:from-green-500 dark:to-emerald-600 dark:hover:from-green-600 dark:hover:to-emerald-700"
                                >
                                    Create NGO 🚀
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

            <style jsx>{`
        .sparkle-bg::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.3) 1px,
            transparent 1px
          );
          background-size: 20px 20px;
          animation: sparkle 3s linear infinite;
          z-index: -1;
        }

        @keyframes sparkle {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 20px 20px;
          }
        }
      `}</style>
        </div>
    );
};

const InputField = ({ label, icon, value, onChange }) => (
    <div className="space-y-1">
        <label className="block text-base font-semibold text-gray-800 dark:text-gray-200">
            {icon} {label}
        </label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={label}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
        />
    </div>
);

export default CreateNGOPage;
