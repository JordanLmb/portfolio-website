"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";

interface Experience {
    name: string;
    position: string;
    startDate: string;
    endDate: string;
    summary: string;
    highlights?: string[];
    location?: string;
    logo?: string;
}

interface ExperienceProps {
    experience: Experience[];
}

export default function ExperienceSection({ experience }: ExperienceProps) {
    return (
        <div className="grid gap-6 md:grid-cols-1">
            {experience.map((exp, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 border border-gray-200 rounded-lg shadow-sm backdrop-blur-md bg-white/75 dark:bg-white/5 dark:border-white/10 dark:glass hover:shadow-md transition-shadow"
                >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex gap-4 items-start">
                            {/* Logo if available */}
                            {exp.logo && (
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 p-[3px] shadow-sm">
                                    <div className="w-full h-full bg-white rounded-[6px] overflow-hidden flex items-center justify-center">
                                        <img src={exp.logo} alt={`${exp.name} logo`} className="w-full h-full object-contain" />
                                    </div>
                                </div>
                            )}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    {!exp.logo && <Briefcase className="w-5 h-5 text-[#6366f1] dark:text-[#818cf8]" />}
                                    {exp.position}
                                </h3>
                                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                    {exp.name}
                                </p>
                            </div>
                        </div>
                        <div className="text-right ml-auto">
                            <span className="bg-[#e0e7ff] text-[#3730a3] text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-[#312e81]/50 dark:text-[#c7d2fe] block mb-1 w-fit md:ml-auto">
                                {exp.startDate} - {exp.endDate}
                            </span>
                            {exp.location && (
                                <span className="text-xs text-gray-500 flex items-center justify-end gap-1">
                                    <MapPin className="w-3 h-3" /> {exp.location}
                                </span>
                            )}
                        </div>
                    </div>

                    <p className="mt-4 mb-4 text-gray-600 dark:text-gray-400">
                        {exp.summary}
                    </p>

                    {exp.highlights && (
                        <ul className="list-disc list-inside text-gray-500 dark:text-gray-400 text-sm space-y-1">
                            {exp.highlights.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    )}
                </motion.div>
            ))}
        </div>
    );
}
