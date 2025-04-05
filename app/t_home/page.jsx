"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CountUp from "react-countup";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../t_plus/page";
import Link from "next/link";

// Enhanced stats with more impactful descriptions
const stats = [
    { label: "Partner NGOs Worldwide", count: 100, icon: "🤝" },
    { label: "Community Events Organized", count: 250, icon: "🎉" },
    { label: "Lives Positively Impacted", count: 1200, icon: "💫" },
];

// Compressed success stories data - removed redundant structure, combined properties
const successStories = [
    {
        title: "Spreading Smiles in Rural Schools",
        image: "/smile1.jpg",
        desc: "Helped 300+ students access better education in remote areas through innovative learning programs.",
        impact: "95% improvement in literacy rates",
        loc: "Karnataka, India"
    },
    {
        title: "Women Empowerment Drives",
        image: "/women2.jpeg",
        desc: "Workshops enabled 150+ women to start ventures for financial independence and leadership.",
        impact: "85% sustainable businesses",
        loc: "Nairobi, Kenya"
    },
    {
        title: "Clean Water Initiative",
        image: "/water.webp",
        desc: "Installed water purification systems in 12 villages for thousands of residents.",
        impact: "70% reduction in waterborne diseases",
        loc: "Rural Tanzania"
    },
    {
        title: "Youth Skills Development",
        image: "/youth2.jpg",
        desc: "Trained 200+ youth in digital literacy and entrepreneurship skills.",
        impact: "60% employment within 3 months",
        loc: "Manila, Philippines"
    },
    {
        title: "Community Garden Project",
        image: "/farm.jpg",
        desc: "Transformed vacant lots into thriving community gardens with fresh produce.",
        impact: "15 self-sustaining gardens",
        loc: "Detroit, USA"
    }
];

// Upcoming events section
const upcomingEvents = [
    {
        title: "Annual Charity Gala",
        date: "June 15, 2025",
        location: "Central Community Hall",
        description: "Join us for an evening of celebration and fundraising for our education initiatives.",
    },
    {
        title: "Volunteer Training Workshop",
        date: "April 20, 2025",
        location: "Online (Zoom)",
        description: "Learn essential skills to make a difference in your community.",
    },
];

// Testimonials from beneficiaries and volunteers
const testimonials = [
    {
        quote: "Working with this organization changed my perspective on what community service can achieve.",
        author: "Maya P., Volunteer since 2023",
        image: "/images/testimonial1.jpg",
    },
    {
        quote: "The support we received helped our village overcome challenges we've faced for generations.",
        author: "Rajesh K., Community Leader",
        image: "/images/testimonial2.jpg",
    },
];

const HomePage = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [activeStory, setActiveStory] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    // Handle story navigation
    const nextStory = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setActiveStory((prev) => (prev + 1) % successStories.length);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const prevStory = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setActiveStory((prev) => (prev - 1 + successStories.length) % successStories.length);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    // Set the active story directly
    const goToStory = (index) => {
        if (!isAnimating && index !== activeStory) {
            setIsAnimating(true);
            setActiveStory(index);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 dark:from-[#1a1a2e] dark:via-[#1a1a2e] dark:to-[#1a1a2e] text-gray-800 dark:text-gray-100">
            <Navbar />

            {/* Hero Section - Enhanced with CTA and dynamic taglines */}
            <div className="flex flex-col md:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto gap-10">
                <div className="flex-1">
                    <motion.h1
                        className="text-4xl md:text-5xl font-extrabold mb-6 text-yellow-800 dark:text-purple-300 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Empowering Change, Together.
                    </motion.h1>
                    <motion.p
                        className="text-xl mb-8 text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Join our community of changemakers dedicated to creating lasting positive impact around the world.
                    </motion.p>
                    <motion.div
                        className="flex flex-wrap gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Link href="/volunteer" className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Volunteer Now
                        </Link>
                        <Link href="/donate" className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Donate
                        </Link>
                    </motion.div>
                </div>
                <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="relative">
                        <Image
                            src="/home_img.webp"
                            alt="Teaching children outdoors"
                            className="rounded-xl shadow-2xl"
                            width={600}
                            height={400}
                            priority
                        />
                        <div className="absolute -bottom-4 -right-4 bg-yellow-500 dark:bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg font-bold">
                            Since 2018
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Mission Statement Banner */}
            <div className="py-12 bg-yellow-600 dark:bg-purple-900 text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-xl">To create sustainable solutions that empower communities to thrive independently while preserving their cultural heritage and natural resources.</p>
                </div>
            </div>

            {/* Stats Section - Enhanced with icons and animations */}
            <div className="flex flex-wrap justify-center gap-8 py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-6">
                {stats.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center bg-yellow-100 dark:bg-gray-700 p-8 rounded-2xl shadow-xl w-80"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                    >
                        <div className="text-5xl mb-3">{item.icon}</div>
                        <h2 className="text-5xl font-bold text-blue-700 dark:text-purple-300">
                            <CountUp end={item.count} duration={2.5} enableScrollSpy scrollSpyDelay={200} />+
                        </h2>
                        <p className="mt-3 text-center text-gray-700 dark:text-gray-300 font-medium text-lg">
                            {item.label}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Enhanced Interactive Success Stories Section */}
            <div className="py-20 px-6 bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-4 text-yellow-800 dark:text-purple-300">
                        Our Success Stories
                    </h2>
                    <p className="text-center mb-12 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
                        Real stories of transformation and hope from communities we've worked with around the world.
                    </p>

                    {/* Interactive Stories Carousel */}
                    <div className="relative max-w-4xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStory}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="md:flex">
                                    <div className="md:w-2/5 relative h-64 md:h-auto">
                                        <Image
                                            src={successStories[activeStory].image}
                                            alt={successStories[activeStory].title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-4 text-white">
                                            <div className="inline-block bg-yellow-500 dark:bg-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                                                {successStories[activeStory].loc}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 md:p-8 md:w-3/5">
                                        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                                            {successStories[activeStory].title}
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                                            {successStories[activeStory].desc}
                                        </p>
                                        <div className="bg-green-100 dark:bg-green-900 inline-block px-4 py-2 rounded-full text-green-800 dark:text-green-200 text-sm font-medium">
                                            Impact: {successStories[activeStory].impact}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Controls */}
                        <div className="flex justify-between items-center mt-8">
                            <button
                                onClick={prevStory}
                                className="bg-yellow-500 dark:bg-purple-600 hover:bg-yellow-600 dark:hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-105"
                                disabled={isAnimating}
                                aria-label="Previous story"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Pagination Dots */}
                            <div className="flex space-x-2">
                                {successStories.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToStory(index)}
                                        className={`w-3 h-3 rounded-full transition-all ${activeStory === index
                                            ? "bg-yellow-600 dark:bg-purple-600 w-6"
                                            : "bg-gray-300 dark:bg-gray-600 hover:bg-yellow-400 dark:hover:bg-purple-400"
                                            }`}
                                        aria-label={`Go to story ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextStory}
                                className="bg-yellow-500 dark:bg-purple-600 hover:bg-yellow-600 dark:hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-105"
                                disabled={isAnimating}
                                aria-label="Next story"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;