'use client';

import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { useTheme } from "next-themes";

const interestGrowthData = [
    { month: "January", animal_welfare: 30, education: 50, environment: 20, women_empowerment: 40, poverty: 10, child_welfare: 25, human_rights: 15 },
    { month: "February", animal_welfare: 45, education: 65, environment: 30, women_empowerment: 50, poverty: 20, child_welfare: 28, human_rights: 20 },
    { month: "March", animal_welfare: 60, education: 80, environment: 48, women_empowerment: 70, poverty: 30, child_welfare: 38, human_rights: 35 },
    { month: "April", animal_welfare: 75, education: 95, environment: 65, women_empowerment: 90, poverty: 40, child_welfare: 50, human_rights: 45 },
    { month: "May", animal_welfare: null, education: null, environment: null, women_empowerment: null, poverty: null, child_welfare: null, human_rights: null },
    { month: "June", animal_welfare: null, education: null, environment: null, women_empowerment: null, poverty: null, child_welfare: null, human_rights: null },
    { month: "July", animal_welfare: null, education: null, environment: null, women_empowerment: null, poverty: null, child_welfare: null, human_rights: null },
    { month: "August", animal_welfare: null, education: null, environment: null, women_empowerment: null, poverty: null, child_welfare: null, human_rights: null },
    { month: "September", animal_welfare: null, education: null, environment: null, women_empowerment: null, poverty: null, child_welfare: null, human_rights: null },
    { month: "October", animal_welfare: null, education: null, environment: null, women_empowerment: null, poverty: null, child_welfare: null, human_rights: null },
    { month: "November", animal_welfare: null, education: null, environment: null, women_empowerment: null, poverty: null, child_welfare: null, human_rights: null },
    { month: "December", animal_welfare: null, education: null, environment: null, women_empowerment: null, poverty: null, child_welfare: null, human_rights: null },
];

const TGraphPage = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="w-full p-4">
            <h2 className="text-center text-2xl font-bold mb-4 text-orange-700 dark:text-orange-400">
                User Interest Growth Over Time
            </h2>
            <div className="overflow-x-auto">
                <div style={{ width: 1100, height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={interestGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#444" : "#ccc"} />
                            <XAxis
                                dataKey="month"
                                interval={0}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                                tick={{ fill: isDark ? "#fff" : "#000", fontSize: 12 }}
                            />
                            <YAxis tick={{ fill: isDark ? "#fff" : "#000" }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: isDark ? "#333" : "#fff", color: isDark ? "#fff" : "#000" }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="animal_welfare" stroke="#ff7f0e" dot />
                            <Line type="monotone" dataKey="education" stroke="#1f77b4" dot />
                            <Line type="monotone" dataKey="environment" stroke="#2ca02c" dot />
                            <Line type="monotone" dataKey="women_empowerment" stroke="#e377c2" dot />
                            <Line type="monotone" dataKey="poverty" stroke="#8c564b" dot />
                            <Line type="monotone" dataKey="child_welfare" stroke="#ff0" dot />
                            <Line type="monotone" dataKey="human_rights" stroke="#9b59b6" dot />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default TGraphPage;
