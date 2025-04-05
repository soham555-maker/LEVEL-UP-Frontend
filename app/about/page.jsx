"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTheme } from "@/context/ThemeProvider";

const AmazingUI = () => {
  const { theme } = useTheme();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: false, amount: 0.2 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const featureCardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        delay: i * 0.1,
      },
    }),
    hover: {
      y: -10,
      boxShadow:
        "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.98 },
  };

  const decorationVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  const features = [
    {
      id: 1,
      icon: "🔍",
      title: "Smart Search",
      description:
        "AI-powered search to find the perfect volunteering opportunities that match your interests and skills.",
      color: "from-purple-400 to-blue-500",
      darkColor: "from-purple-800 to-blue-900",
      illustration: "/api/placeholder/300/200",
    },
    {
      id: 2,
      icon: "📊",
      title: "Real-time Analytics",
      description:
        "Track volunteer hours, impact metrics, and community engagement with beautiful data visualizations.",
      color: "from-green-400 to-emerald-500",
      darkColor: "from-green-800 to-emerald-900",
      illustration: "/api/placeholder/300/200",
    },
    {
      id: 3,
      icon: "🤖",
      title: "AI Attendance",
      description:
        "Facial recognition and geolocation technology for seamless check-in and verification.",
      color: "from-red-400 to-orange-500",
      darkColor: "from-red-800 to-orange-900",
      illustration: "/api/placeholder/300/200",
    },
    {
      id: 4,
      icon: "🌐",
      title: "Social Hub",
      description:
        "Connect with like-minded volunteers, share experiences, and build your volunteering portfolio.",
      color: "from-yellow-400 to-amber-500",
      darkColor: "from-yellow-700 to-amber-800",
      illustration: "/api/placeholder/300/200",
    },
  ];

  // Team members data
  const teamMembers = [
    {
      name: "Rajat Sharma",
      semester: "6th Semester",
      regNo: "21BCE1001",
      img: "/api/placeholder/400/400",
    },
    {
      name: "Priya Patel",
      semester: "6th Semester",
      regNo: "21BCE1002",
      img: "/api/placeholder/400/400",
    },
    {
      name: "Amit Kumar",
      semester: "6th Semester",
      regNo: "21BCE1003",
      img: "/api/placeholder/400/400",
    },
    {
      name: "Sneha Gupta",
      semester: "6th Semester",
      regNo: "21BCE1004",
      img: "/api/placeholder/400/400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white px-6 py-12 overflow-x-hidden">
      {/* Hero Section with Parallax Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative h-96 mb-24 rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/80 to-blue-600/80 dark:from-blue-900/80 dark:to-yellow-900/80 z-10"></div>
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-[url('/api/placeholder/1000/600')] bg-cover bg-center"
        />
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-white px-4">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-center mb-6 text-shadow"
          >
            NGO-Volunteer Platform
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-center max-w-3xl"
          >
            Seamless automation, interactive social ecosystem, and AI-driven
            attendance tracking
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 flex flex-wrap gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-full shadow-lg transform transition-all duration-300"
            >
              Find Opportunities
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-yellow-600 dark:text-blue-400 font-medium rounded-full shadow-lg transform transition-all duration-300"
            >
              For NGOs
            </motion.button>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 hidden md:block"
        >
          <div className="w-16 h-16 rounded-lg bg-yellow-400/80 dark:bg-blue-400/80 shadow-lg"></div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-20 right-32 hidden md:block"
        >
          <div className="w-20 h-20 rounded-full bg-blue-500/80 dark:bg-yellow-500/80 shadow-lg"></div>
        </motion.div>
      </motion.div>

      {/* Vision and Mission Section - All Features Together */}
      <div className="relative max-w-7xl mx-auto mb-32" ref={featuresRef}>
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 1000 800"
            fill="none"
          >
            <motion.path
              d="M-100,400 Q150,200 400,500 T900,300"
              stroke={theme === "dark" ? "#3b82f6" : "#f59e0b"}
              strokeWidth="2"
              strokeDasharray="12 8"
              fill="none"
              variants={decorationVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />
            <motion.circle
              cx="200"
              cy="150"
              r="50"
              fill={theme === "dark" ? "#3b82f680" : "#f59e0b40"}
              variants={decorationVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />
            <motion.rect
              x="800"
              y="400"
              width="80"
              height="80"
              rx="10"
              fill={theme === "dark" ? "#3b82f640" : "#f59e0b30"}
              variants={decorationVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />
            <motion.circle
              cx="700"
              cy="100"
              r="30"
              fill={theme === "dark" ? "#60a5fa30" : "#fcd34d30"}
              variants={decorationVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />
          </svg>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-10"
        >
          {/* Section header with animated elements */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="relative inline-block">
              <span className="inline-block text-6xl mb-4">✨</span>
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 dark:bg-blue-500 rounded-full opacity-70"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-blue-400 dark:to-indigo-500">
              Vision and Mission
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-blue-500 dark:to-indigo-500 mx-auto mt-4"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
            <p className="mt-6 max-w-2xl mx-auto text-gray-700 dark:text-gray-300 text-lg">
              Our platform aims to revolutionize how volunteers connect with
              NGOs through cutting-edge technology and meaningful impact
              tracking.
            </p>
          </motion.div>

          {/* Hexagon background pattern */}
          <div className="absolute inset-0 overflow-hidden -z-10 opacity-30 pointer-events-none">
            <div className="absolute w-full h-full">
              {Array.from({ length: 15 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute w-32 h-32 bg-yellow-400/20 dark:bg-blue-500/20"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: `scale(${0.5 + Math.random()})`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: index * 0.1, duration: 1 }}
                />
              ))}
            </div>
          </div>

          {/* All features display panel */}
          <motion.div
            variants={itemVariants}
            className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-yellow-200 dark:border-blue-900 mb-16"
          >
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 dark:from-blue-500 dark:to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg">
                🌟
              </div>
            </div>

            <h3 className="text-center text-2xl font-bold mt-8 mb-12 text-yellow-800 dark:text-blue-300">
              Empowering Communities Through Technology
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  custom={index}
                  variants={featureCardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex items-start p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md border-l-4 hover:shadow-xl transition-all duration-300"
                  style={{
                    borderLeftColor:
                      theme === "dark"
                        ? `rgb(${
                            index === 0
                              ? "147, 51, 234"
                              : index === 1
                              ? "16, 185, 129"
                              : index === 2
                              ? "239, 68, 68"
                              : "245, 158, 11"
                          })`
                        : `rgb(${
                            index === 0
                              ? "79, 70, 229"
                              : index === 1
                              ? "16, 185, 129"
                              : index === 2
                              ? "239, 68, 68"
                              : "245, 158, 11"
                          })`,
                  }}
                  onClick={() => setSelectedFeature(feature)}
                >
                  <div
                    className={`shrink-0 w-16 h-16 rounded-xl mr-5 flex items-center justify-center text-3xl bg-gradient-to-br ${
                      theme === "dark" ? feature.darkColor : feature.color
                    } text-white shadow-md`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-yellow-700 dark:text-blue-400">
                      {feature.title}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {feature.description}
                    </p>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 mt-4 text-yellow-600 dark:text-blue-400 font-medium"
                    >
                      Learn more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Central mission statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl text-center max-w-3xl mx-auto"
            >
              <div className="flex justify-center mb-4">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 -ml-2 first:ml-0 flex items-center justify-center rounded-full bg-gradient-to-br ${
                      theme === "dark" ? feature.darkColor : feature.color
                    } text-white text-sm border-2 border-white dark:border-gray-900`}
                  >
                    {feature.icon}
                  </div>
                ))}
              </div>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                "Our mission is to bridge the gap between willing volunteers and
                deserving NGOs through a seamless, technology-driven platform
                that makes volunteering more accessible, trackable, and
                impactful for all stakeholders."
              </p>
              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 dark:from-blue-500 dark:to-indigo-500 mx-auto mt-4"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              ></motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Feature Details Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold flex items-center gap-3 text-yellow-700 dark:text-blue-400">
                  <span>{selectedFeature.icon}</span>
                  {selectedFeature.title}
                </h3>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedFeature(null)}
                  className="text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ×
                </motion.button>
              </div>
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                {selectedFeature.description}
              </p>
              <div className="bg-yellow-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2 text-yellow-800 dark:text-blue-300">
                  Key Benefits:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Enhanced user engagement</li>
                  <li>Improved operational efficiency</li>
                  <li>Better tracking and reporting</li>
                  <li>Seamless integration with existing systems</li>
                </ul>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-blue-600 dark:to-blue-700 text-white font-medium rounded-lg shadow-md"
              >
                Explore {selectedFeature.title}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Our Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-20"
      >
        <h2 className="text-3xl font-semibold mb-12 text-center text-yellow-800 dark:text-blue-300">
          👨‍💻 Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg border border-yellow-300 dark:border-blue-600 transition-all duration-500"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-yellow-400 dark:border-blue-400"
              />
              <h4 className="text-xl font-semibold text-center mb-2 text-yellow-700 dark:text-blue-400">
                {member.name}
              </h4>
              <p className="text-center text-sm">XYZ Institute of Technology</p>
              <p className="text-center text-sm">Reg No: {member.regNo}</p>
              <p className="text-center text-sm">{member.semester}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default AmazingUI;
