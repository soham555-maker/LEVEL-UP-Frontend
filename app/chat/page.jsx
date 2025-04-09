"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeProvider";
import Link from "next/link";
import {
  FaUser,
  FaPaperPlane,
  FaPlus,
  FaImage,
  FaSmile,
  FaPaperclip,
  FaTimes,
  FaUsers,
  FaSearch,
  FaBell,
  FaHeart,
  FaRegHeart,
  FaEllipsisV,
  FaCircle,
} from "react-icons/fa";

// Sample data - in a real app this would come from your database
const SAMPLE_CHANNELS = [
  {
    id: 1,
    name: "Environment",
    unread: 3,
    description:
      "Discuss environmental initiatives, tree planting, and climate action",
    members: 245,
    active: true,
  },
  {
    id: 2,
    name: "Education",
    unread: 0,
    description:
      "Connect about educational programs, tutoring, and learning resources",
    members: 178,
    active: false,
  },
  {
    id: 3,
    name: "Tree Plantation Drive",
    unread: 12,
    description:
      "Coordination for the upcoming tree plantation event on May 15th",
    members: 89,
    active: true,
  },
  {
    id: 4,
    name: "Food Distribution",
    unread: 5,
    description: "Organizing food donation drives and distribution logistics",
    members: 132,
    active: true,
  },
  {
    id: 5,
    name: "Volunteer Coordination",
    unread: 0,
    description: "Central hub for volunteer management across all events",
    members: 210,
    active: false,
  },
  {
    id: 6,
    name: "Women Empowerment",
    unread: 8,
    description:
      "Initiatives focused on women's skills development and support",
    members: 165,
    active: true,
  },
];

const SAMPLE_MESSAGES = [
  {
    id: 1,
    channelId: 3,
    userId: 101,
    username: "PriyaGreen",
    avatar: null,
    content:
      "Hi everyone! Just wanted to confirm our tree plantation drive this Saturday at City Park. We're meeting at 8 AM at the east entrance. Who's coming?",
    timestamp: "10:24 AM",
    reactions: [
      { emoji: "👍", count: 12, reacted: true },
      { emoji: "🌳", count: 8, reacted: false },
    ],
    isPinned: true,
  },
  {
    id: 2,
    channelId: 3,
    userId: 102,
    username: "Rahul",
    avatar: null,
    content:
      "I'll be there with 3 friends! We're bringing some extra shovels too.",
    timestamp: "10:30 AM",
    reactions: [{ emoji: "🙌", count: 5, reacted: false }],
    isPinned: false,
  },
  {
    id: 3,
    channelId: 3,
    userId: 103,
    username: "TreeLover",
    avatar: null,
    content:
      "Question - are saplings already arranged or should we bring some?",
    timestamp: "10:45 AM",
    reactions: [{ emoji: "❓", count: 2, reacted: false }],
    isPinned: false,
  },
  {
    id: 4,
    channelId: 3,
    userId: 101,
    username: "PriyaGreen",
    avatar: null,
    content:
      "We've arranged 200 saplings already with the help of the Forestry Department! Just bring your enthusiasm and perhaps some water.",
    timestamp: "10:47 AM",
    reactions: [
      { emoji: "👏", count: 7, reacted: false },
      { emoji: "💯", count: 3, reacted: true },
    ],
    isPinned: false,
  },
  {
    id: 5,
    channelId: 3,
    userId: 104,
    username: "EcoWarrior",
    avatar: null,
    content:
      "I'm coordinating transportation. If anyone needs a ride from the central metro station, we'll have two vans leaving at 7:30 AM. Comment here if you need transport!",
    timestamp: "11:05 AM",
    reactions: [
      { emoji: "🚐", count: 4, reacted: false },
      { emoji: "🙏", count: 6, reacted: false },
    ],
    isPinned: false,
  },
  {
    id: 6,
    channelId: 3,
    userId: 105,
    username: "GreenThumb",
    avatar: null,
    content:
      "This is my first volunteer event with मिलकर! Really excited to join you all. Any tips for a first-timer?",
    timestamp: "11:23 AM",
    reactions: [
      { emoji: "🎉", count: 10, reacted: false },
      { emoji: "👋", count: 8, reacted: true },
    ],
    isPinned: false,
  },
  {
    id: 7,
    channelId: 3,
    userId: 101,
    username: "PriyaGreen",
    avatar: null,
    content:
      "Welcome to the team, @GreenThumb! Wear comfortable clothes, bring a hat and sunscreen. We'll have a brief orientation for newcomers at 8:15 AM. Looking forward to meeting you!",
    timestamp: "11:30 AM",
    reactions: [
      { emoji: "☀", count: 4, reacted: false },
      { emoji: "💚", count: 5, reacted: false },
    ],
    isPinned: false,
  },
];

const SAMPLE_ONLINE_USERS = [
  { id: 101, username: "PriyaGreen", avatar: null, status: "online" },
  { id: 103, username: "TreeLover", avatar: null, status: "online" },
  { id: 105, username: "GreenThumb", avatar: null, status: "online" },
  { id: 106, username: "EduHelp", avatar: null, status: "online" },
  { id: 107, username: "FoodBankCoord", avatar: null, status: "online" },
  { id: 108, username: "WomenLift", avatar: null, status: "idle" },
  { id: 109, username: "ChildHope", avatar: null, status: "online" },
  { id: 110, username: "HealthVolunteer", avatar: null, status: "online" },
];

const ChatForum = () => {
  const { theme } = useTheme();
  const [activeChannel, setActiveChannel] = useState(SAMPLE_CHANNELS[2]); // Default to Tree Plantation
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMembersList, setShowMembersList] = useState(true);
  const [currentReaction, setCurrentReaction] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);

  // Check if screen size is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setShowSidebar(false);
        setShowMembersList(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on channel change
  useEffect(() => {
    messageInputRef.current?.focus();
  }, [activeChannel]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // In a real app, you would send to your backend
    const newMessage = {
      id: messages.length + 1,
      channelId: activeChannel.id,
      userId: 999, // Current user ID
      username: "You", // Current username
      avatar: null,
      content: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      reactions: [],
      isPinned: false,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleChannelClick = (channel) => {
    setActiveChannel(channel);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const toggleReaction = (messageId, emoji) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions.find((r) => r.emoji === emoji);
          if (existingReaction) {
            // Toggle reaction
            const updatedReaction = {
              ...existingReaction,
              count: existingReaction.reacted
                ? existingReaction.count - 1
                : existingReaction.count + 1,
              reacted: !existingReaction.reacted,
            };

            return {
              ...msg,
              reactions: msg.reactions.map((r) =>
                r.emoji === emoji ? updatedReaction : r
              ),
            };
          } else {
            // Add new reaction
            return {
              ...msg,
              reactions: [...msg.reactions, { emoji, count: 1, reacted: true }],
            };
          }
        }
        return msg;
      })
    );
    setCurrentReaction(null);
  };

  const filteredMessages = messages.filter(
    (msg) => msg.channelId === activeChannel.id
  );

  const filteredChannels = SAMPLE_CHANNELS.filter((channel) =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simple emoji picker for demonstration
  const emojis = ["👍", "👏", "❤", "🎉", "🙌", "💯", "🌳", "🌱", "♻"];

  return (
    <div className="flex h-[calc(100vh-72px)] bg-gray-50 dark:bg-gray-900">
      {/* Channels Sidebar */}
      <div
        className={`${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transform transition-transform duration-300 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col z-20 absolute md:relative h-full`}
      >
        {isMobile && (
          <button
            onClick={() => setShowSidebar(false)}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <FaTimes size={18} />
          </button>
        )}

        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-yellow-700 dark:text-blue-300 font-serif mb-2">
            मिलकर Chat
          </h2>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search channels"
              className="w-full pl-8 pr-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-blue-500"
            />
            <FaSearch className="absolute left-2.5 top-3 text-gray-500 dark:text-gray-400" />
          </div>
        </div>

        <div className="overflow-y-auto flex-grow">
          <div className="p-2">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2 my-2">
              Channels
            </p>
            {filteredChannels.map((channel) => (
              <div
                key={channel.id}
                onClick={() => handleChannelClick(channel)}
                className={`flex items-center justify-between px-2 py-2 rounded-lg mb-1 cursor-pointer ${
                  activeChannel.id === channel.id
                    ? "bg-yellow-100 dark:bg-blue-900 text-yellow-900 dark:text-blue-100"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full mr-2 bg-gray-400">
                    {channel.active && (
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    )}
                  </div>
                  <span className="truncate"># {channel.name}</span>
                </div>
                {channel.unread > 0 && (
                  <span className="inline-flex items-center justify-center bg-yellow-500 dark:bg-blue-600 text-white text-xs font-medium rounded-full h-5 min-w-[20px] px-1">
                    {channel.unread}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="px-4 py-2">
            <button className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-yellow-700 dark:hover:text-blue-400">
              <FaPlus className="mr-1.5" />
              Create Channel
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-600 dark:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
              U
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Username
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Channel Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center">
            {isMobile && (
              <button
                onClick={() => setShowSidebar(true)}
                className="mr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FaBars size={16} />
              </button>
            )}
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white flex items-center">
                # {activeChannel.name}
                {activeChannel.active && (
                  <span className="ml-2 flex items-center text-xs text-green-600 dark:text-green-400">
                    <FaCircle className="mr-1" size={8} />
                    Active
                  </span>
                )}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {activeChannel.members} members
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 relative">
              <FaBell />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <FaSearch />
            </button>
            <button
              onClick={() => setShowMembersList(!showMembersList)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 md:hidden"
            >
              <FaUsers />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            {activeChannel.description && (
              <div className="bg-yellow-50 dark:bg-blue-900/30 border border-yellow-100 dark:border-blue-800 rounded-lg p-3 mb-6">
                <p className="text-sm text-yellow-800 dark:text-blue-200">
                  <strong>About this channel:</strong>{" "}
                  {activeChannel.description}
                </p>
              </div>
            )}

            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 ${
                  msg.isPinned
                    ? "border-l-4 border-yellow-500 dark:border-blue-500 pl-3"
                    : ""
                }`}
              >
                <div className="flex items-start group">
                  <div className="flex-shrink-0 mr-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                        msg.username === "You"
                          ? "bg-yellow-600 dark:bg-blue-600"
                          : "bg-gray-500 dark:bg-gray-600"
                      }`}
                    >
                      {msg.username.charAt(0)}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-baseline">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {msg.username}
                      </h4>
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        {msg.timestamp}
                      </span>
                      {msg.isPinned && (
                        <span className="ml-2 text-xs text-yellow-600 dark:text-blue-400 flex items-center">
                          📌 Pinned
                        </span>
                      )}
                      <div className="ml-2 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() =>
                            setCurrentReaction(
                              currentReaction === msg.id ? null : msg.id
                            )
                          }
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm"
                        >
                          <FaSmile />
                        </button>
                      </div>
                    </div>

                    <div className="mt-1 text-gray-700 dark:text-gray-300">
                      {msg.content}
                    </div>

                    {/* Reactions */}
                    {msg.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {msg.reactions.map((reaction, idx) => (
                          <button
                            key={idx}
                            onClick={() =>
                              toggleReaction(msg.id, reaction.emoji)
                            }
                            className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${
                              reaction.reacted
                                ? "bg-yellow-100 dark:bg-blue-900 text-yellow-800 dark:text-blue-300"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                          >
                            <span>{reaction.emoji}</span>
                            <span>{reaction.count}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Emoji Picker */}
                    {currentReaction === msg.id && (
                      <div className="absolute z-10 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2">
                        <div className="flex gap-2">
                          {emojis.map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => toggleReaction(msg.id, emoji)}
                              className="hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 rounded"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
            <div className="relative flex items-center">
              <button
                type="button"
                className="absolute left-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FaPaperclip />
              </button>
              <input
                ref={messageInputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message #${activeChannel.name}`}
                className="w-full pl-10 pr-16 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-blue-500"
              />
              <div className="absolute right-3 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FaSmile />
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FaImage />
                </button>
                <button
                  type="submit"
                  className="text-yellow-600 dark:text-blue-400 hover:text-yellow-700 dark:hover:text-blue-300 focus:outline-none"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => {
                        setMessage(message + emoji);
                        setShowEmojiPicker(false);
                      }}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Members Sidebar */}
      <div
        className={`${
          showMembersList ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 transform transition-transform duration-300 w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col z-20 absolute md:relative right-0 h-full`}
      >
        {isMobile && (
          <button
            onClick={() => setShowMembersList(false)}
            className="absolute top-4 left-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <FaTimes size={18} />
          </button>
        )}

        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-gray-700 dark:text-gray-200">
            Channel Members
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {SAMPLE_ONLINE_USERS.length} members online
          </p>
        </div>

        <div className="overflow-y-auto flex-grow p-2">
          {SAMPLE_ONLINE_USERS.map((user) => (
            <div
              key={user.id}
              className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-white">
                  {user.username.charAt(0)}
                </div>
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                    user.status === "online" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user.username}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            About This Channel
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {activeChannel.description}
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <FaHeart className="mr-1 text-yellow-600 dark:text-blue-400" />
            <span className="mr-2">{activeChannel.members}</span>
            <span>members</span>
          </div>
        </div>
      </div>

      {/* Mobile Toggle Buttons (only visible on mobile) */}
      {isMobile && !showSidebar && !showMembersList && (
        <div className="absolute bottom-20 left-4 z-30">
          <button
            onClick={() => setShowSidebar(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-800 dark:from-blue-500 dark:to-purple-500 text-white flex items-center justify-center shadow-lg"
          >
            <FaBars size={18} />
          </button>
        </div>
      )}

      {isMobile && !showMembersList && !showSidebar && (
        <div className="absolute bottom-20 right-4 z-30">
          <button
            onClick={() => setShowMembersList(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-800 dark:from-blue-500 dark:to-purple-500 text-white flex items-center justify-center shadow-lg"
          >
            <FaUsers size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatForum;
