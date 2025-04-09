"use client";

import React, { useState, useRef } from "react";
import { Loader2, Share2, Instagram, Linkedin, Facebook } from "lucide-react";

export default function SocialMediaManager() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [eventType, setEventType] = useState("Donation Drive");
  const [generatedPrompts, setGeneratedPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [customText, setCustomText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const eventTypes = [
    "Donation Drive",
    "Awareness Rally",
    "Fundraiser",
    "Community Cleanup",
    "Education Camp",
    "Health Camp",
    "Clothes Distribution",
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
      setGeneratedPrompts([]);
      setSelectedPrompt("");
      setCustomText("");
      setError("");
    } else {
      setError("Please upload a valid image file.");
    }
  };

  const handleGeneratePrompt = async () => {
    if (!selectedImage) {
      setError("Please upload an image.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate image analysis (mock data)
      const imageDescription = "volunteers distributing food and clothes";
      const setting = "a local community center";
      const impact = {
        metric: "200+ meals served",
        beneficiaries: 150,
        impact: "lives touched",
      };

      const prompts = generateDynamicPrompts(
        eventType,
        imageDescription,
        setting,
        impact
      );
      setGeneratedPrompts(prompts);
    } catch (err) {
      setError("Failed to generate prompt.");
    } finally {
      setLoading(false);
    }
  };

  const generateDynamicPrompts = (
    eventType,
    imageDescription,
    setting,
    impact
  ) => {
    const emojiSets = {
      "Donation Drive": [
        "👐",
        "🎁",
        "💖",
        "📦",
        "🙏",
        "🌟",
        "🤝",
        "🎉",
        "❤",
        "🌍",
        "👨‍👩‍👧‍👦",
        "✨",
      ],
      "Awareness Rally": [
        "📣",
        "🚶‍♀",
        "🧠",
        "🌈",
        "✊",
        "🕊",
        "💬",
        "📢",
        "⚖",
        "🌍",
        "🫂",
        "❤",
      ],
      Fundraiser: [
        "💸",
        "🎯",
        "🎤",
        "🏆",
        "💰",
        "🎉",
        "🌈",
        "🎊",
        "💞",
        "🙌",
        "📈",
        "🥳",
      ],
      "Community Cleanup": [
        "🧹",
        "🌿",
        "🌎",
        "🧼",
        "♻",
        "🚮",
        "💧",
        "🚯",
        "🪣",
        "🛢",
        "🧤",
        "🙏",
      ],
      "Education Camp": [
        "📚",
        "🎓",
        "🧠",
        "📝",
        "👨‍🏫",
        "👩‍🏫",
        "✏",
        "📖",
        "💡",
        "🏫",
        "🌟",
        "🤓",
      ],
      "Health Camp": [
        "💉",
        "🩺",
        "🏥",
        "👩‍⚕",
        "👨‍⚕",
        "❤",
        "📋",
        "🧬",
        "😷",
        "💊",
        "🧑‍⚕",
        "🩻",
      ],
      "Clothes Distribution": [
        "👕",
        "🧥",
        "🧦",
        "👖",
        "💖",
        "📦",
        "🤝",
        "🙏",
        "🎁",
        "🧣",
        "🧤",
        "🌈",
      ],
    };

    const hashtagSets = {
      "Donation Drive": [
        "#GiveBack",
        "#DonateToday",
        "#SpreadKindness",
        "#NGOIndia",
        "#ActOfKindness",
        "#SupportCommunities",
        "#HelpOthers",
        "#HumanityFirst",
      ],
      "Awareness Rally": [
        "#RaiseAwareness",
        "#SpeakUp",
        "#BeTheChange",
        "#AdvocacyInAction",
        "#MarchForChange",
        "#VoicesUnite",
        "#JusticeNow",
        "#PowerInUnity",
      ],
      Fundraiser: [
        "#Fundraiser",
        "#SupportTheCause",
        "#TogetherWeCan",
        "#MakeADifference",
        "#NGOFundraiser",
        "#ChangeLives",
        "#CharityEvent",
        "#HopeMatters",
      ],
      "Community Cleanup": [
        "#CleanCommunity",
        "#GreenMission",
        "#EnvironmentFirst",
        "#TrashTag",
        "#CommunityHeroes",
        "#CleanAndGreen",
        "#ActForEarth",
        "#EcoWarriors",
      ],
      "Education Camp": [
        "#EducationMatters",
        "#LiteracyForAll",
        "#KnowledgeIsPower",
        "#LearningTogether",
        "#TeachTheFuture",
        "#BooksNotBullets",
        "#EduCamp",
        "#SmartIndia",
      ],
      "Health Camp": [
        "#HealthyIndia",
        "#HealthForAll",
        "#MedicalCamp",
        "#CareAndCure",
        "#WellnessDrive",
        "#NGOHealth",
        "#PreventAndProtect",
        "#HealthMatters",
      ],
      "Clothes Distribution": [
        "#WinterRelief",
        "#ClotheTheNeedy",
        "#WarmHearts",
        "#ShareTheWarmth",
        "#NGOCares",
        "#HumanityInAction",
        "#DressWithLove",
        "#WardrobeForAll",
      ],
    };

    const emojis = emojiSets[eventType] || ["🌟", "✨"];
    const hashtags = hashtagSets[eventType] || [
      "#CommunityImpact",
      "#NGOEvent",
    ];

    // Fixed the template strings by using proper syntax
    const samplePrompts = [
      `📢 ${eventType} in action! With ${impact.metric} and ${
        impact.beneficiaries
      } ${impact.impact}, our event was a huge success! ${emojis
        .slice(0, 4)
        .join(" ")} ${hashtags.slice(0, 3).join(" ")}`,
      `From ${setting} to hearts 💕 – this ${eventType} brought together ${
        impact.beneficiaries
      }+ people. ${emojis.slice(4, 8).join(" ")} ${hashtags
        .slice(3, 6)
        .join(" ")}`,
      `Together, we made an impact: ${impact.metric}, ${
        impact.beneficiaries
      } lives, and infinite memories. ${emojis
        .slice(8, 12)
        .join(" ")} ${hashtags.slice(0, 4).join(" ")}`,
    ];

    return samplePrompts;
  };

  const shareToInstagram = () => {
    if (!selectedPrompt && !customText) {
      setError("Please select or create a caption first.");
      return;
    }

    // For mobile devices - try to deep link to Instagram
    const finalCaption = selectedPrompt + " " + customText;

    // On mobile, we can try to use Instagram's sharing intent
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // Try to use Instagram's sharing intent where possible
      // This will only work on mobile devices with Instagram installed

      // For Instagram stories on mobile
      window.location.href = `instagram://story?text=${encodeURIComponent(
        finalCaption
      )}`;

      // Set a timeout to check if the deep link worked - if not, fallback to web
      setTimeout(() => {
        // If we're still here after 1 second, the deep link probably failed
        window.open("https://www.instagram.com", "_blank");
      }, 1000);
    } else {
      // On desktop, just open Instagram web
      window.open("https://www.instagram.com", "_blank");

      // Show confirmation that text is ready to paste
      alert(
        "Instagram opened in a new tab. Your caption has been prepared:\n\n" +
          finalCaption
      );
    }

    // Copy the text to clipboard for easier pasting
    navigator.clipboard
      .writeText(finalCaption)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  // Functions for other social platforms
  const shareToLinkedIn = () => {
    if (!selectedPrompt && !customText) {
      setError("Please select or create a caption first.");
      return;
    }

    const finalCaption = selectedPrompt + " " + customText;
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(shareUrl, "_blank");

    // Copy to clipboard
    navigator.clipboard.writeText(finalCaption);
    alert(
      "LinkedIn opened in a new tab. Your caption has been copied to clipboard."
    );
  };

  const shareToFacebook = () => {
    if (!selectedPrompt && !customText) {
      setError("Please select or create a caption first.");
      return;
    }

    const finalCaption = selectedPrompt + " " + customText;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}&quote=${encodeURIComponent(finalCaption)}`;
    window.open(shareUrl, "_blank");
  };

  const handleShareButton = () => {
    if (!selectedPrompt && !customText) {
      setError("Please select or create a caption first.");
      return;
    }

    const finalCaption = selectedPrompt + " " + customText;

    // Use Web Share API if available
    if (navigator.share) {
      navigator
        .share({
          title: "Social Media Caption",
          text: finalCaption,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(finalCaption);
      alert("Caption copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-blue-600 text-white p-6">
            <h1 className="text-3xl font-bold text-center">
              📸 Social Media Prompt Generator
            </h1>
            <p className="text-center mt-2 text-blue-100">
              Create engaging captions for your NGO events
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">
                    Upload Event Image
                  </h2>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col w-full h-32 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 cursor-pointer">
                      <div className="flex flex-col items-center justify-center pt-7">
                        <svg
                          className="w-10 h-10 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <p className="pt-1 text-sm text-blue-400">
                          Select an image
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="opacity-0"
                        ref={fileInputRef}
                      />
                    </label>
                  </div>

                  {selectedImage && (
                    <div className="mt-4">
                      <div className="relative rounded-lg overflow-hidden">
                        <img
                          src={selectedImage}
                          alt="Uploaded"
                          className="w-full h-auto rounded-lg"
                        />
                        <button
                          onClick={() => setSelectedImage(null)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Event Details</h2>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {eventTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>

                  <button
                    onClick={handleGeneratePrompt}
                    disabled={loading}
                    className="w-full mt-4 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-200 flex items-center justify-center"
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                    {loading ? "Generating..." : "Generate AI Prompts"}
                  </button>

                  {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {generatedPrompts.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      🧠 Choose a Prompt
                    </h2>
                    <div className="space-y-2 max-h-52 overflow-y-auto pr-2">
                      {generatedPrompts.map((prompt, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedPrompt(prompt)}
                          className={`p-3 border rounded-lg cursor-pointer transition duration-200 ${
                            selectedPrompt === prompt
                              ? "bg-blue-100 border-blue-300"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          {prompt}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Customize Your Message
                  </h2>
                  <textarea
                    placeholder="Add a custom message or modify the selected prompt..."
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="w-full p-3 min-h-32 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                  />
                </div>

                {(selectedPrompt || customText) && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h2 className="text-xl font-semibold mb-2">
                      📝 Final Caption
                    </h2>
                    <p className="p-3 bg-white rounded-lg border border-blue-100">
                      {selectedPrompt} {customText}
                    </p>
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Share Your Post
                  </h2>
                  <div className="flex items-center justify-center space-x-6 p-4 bg-gray-50 rounded-lg">
                    <button
                      onClick={handleShareButton}
                      className="flex flex-col items-center group"
                    >
                      <div className="p-3 bg-gray-100 rounded-full group-hover:bg-blue-100 transition duration-200">
                        <Share2
                          size={24}
                          className="text-gray-600 group-hover:text-blue-600"
                        />
                      </div>
                      <span className="mt-2 text-xs font-medium text-gray-600 group-hover:text-blue-600">
                        Share
                      </span>
                    </button>

                    <button
                      onClick={shareToInstagram}
                      className="flex flex-col items-center group"
                    >
                      <div className="p-3 bg-gray-100 rounded-full group-hover:bg-pink-100 transition duration-200">
                        <Instagram
                          size={24}
                          className="text-gray-600 group-hover:text-pink-600"
                        />
                      </div>
                      <span className="mt-2 text-xs font-medium text-gray-600 group-hover:text-pink-600">
                        Instagram
                      </span>
                    </button>

                    <button
                      onClick={shareToLinkedIn}
                      className="flex flex-col items-center group"
                    >
                      <div className="p-3 bg-gray-100 rounded-full group-hover:bg-blue-100 transition duration-200">
                        <Linkedin
                          size={24}
                          className="text-gray-600 group-hover:text-blue-600"
                        />
                      </div>
                      <span className="mt-2 text-xs font-medium text-gray-600 group-hover:text-blue-600">
                        LinkedIn
                      </span>
                    </button>

                    <button
                      onClick={shareToFacebook}
                      className="flex flex-col items-center group"
                    >
                      <div className="p-3 bg-gray-100 rounded-full group-hover:bg-blue-100 transition duration-200">
                        <Facebook
                          size={24}
                          className="text-gray-600 group-hover:text-blue-600"
                        />
                      </div>
                      <span className="mt-2 text-xs font-medium text-gray-600 group-hover:text-blue-600">
                        Facebook
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Click on a social media icon to share your caption. Instagram
            integration will attempt to open the Instagram app or website.
          </p>
        </div>
      </div>
    </div>
  );
}
