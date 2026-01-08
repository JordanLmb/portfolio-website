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
                    className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                {exp.position}
                            </h3>
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                {exp.name}
                            </p>
                        </div>
                        <div className="text-right">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 block mb-1 w-fit md:ml-auto">
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
