"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { SendHorizonal, MessagesSquare } from "lucide-react";

export default function ForumPage() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "organizer", text: "Hello! How can we help you today?" },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const { theme } = useTheme();

    const isDark = theme === "dark";

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        setMessages([...messages, { sender: "user", text: newMessage }]);
        setNewMessage("");
    };

    return (
        <div
            className={`min-h-screen px-4 py-8 flex flex-col items-center ${isDark
                ? "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white"
                : "bg-gradient-to-br from-white via-slate-100 to-slate-200 text-black"
                }`}
        >
            {!isChatOpen ? (
                <button
                    className={`text-xl px-8 py-4 rounded-2xl shadow-xl flex items-center gap-2 transition-colors ${isDark
                        ? "bg-blue-700 hover:bg-blue-600 text-white"
                        : "bg-orange-400 hover:bg-orange-300 text-black"
                        }`}
                    onClick={() => setIsChatOpen(true)}
                >
                    <MessagesSquare className="w-5 h-5" />
                    Connect with Organizer
                </button>
            ) : (
                <div
                    className={`w-full max-w-2xl rounded-2xl shadow-lg flex flex-col h-[80vh] p-6 border ${isDark
                        ? "bg-[#1e293b] border-[#334155]"
                        : "bg-white border-gray-300"
                        }`}
                >
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${msg.sender === "user"
                                    ? isDark
                                        ? "ml-auto bg-blue-600 text-white"
                                        : "ml-auto bg-orange-400 text-black"
                                    : isDark
                                        ? "bg-blue-800 text-blue-100"
                                        : "bg-gray-200 text-black"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <div className="mt-4 flex items-center gap-2">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            rows={2}
                            placeholder="Type your message..."
                            className={`w-full rounded-xl px-4 py-2 resize-none border focus:outline-none focus:ring-2 ${isDark
                                ? "bg-[#334155] text-white border-[#475569] focus:ring-blue-500"
                                : "bg-white text-black border-gray-300 focus:ring-orange-400"
                                }`}
                        />
                        <button
                            onClick={handleSendMessage}
                            className={`rounded-xl p-3 transition-colors ${isDark
                                ? "bg-blue-700 hover:bg-blue-600 text-white"
                                : "bg-orange-400 hover:bg-orange-300 text-black"
                                }`}
                        >
                            <SendHorizonal className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
