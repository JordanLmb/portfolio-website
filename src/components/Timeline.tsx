"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

interface Education {
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    description?: string;
    score?: string;
}

interface TimelineProps {
    education: Education[];
}

export default function Timeline({ education }: TimelineProps) {
    return (
        <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-4 space-y-12">
            {education.map((edu, index) => (
                <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="mb-10 ml-6 relative"
                >
                    <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.2 + 0.1 }}
                        viewport={{ once: true }}
                        className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-10 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
                    >
                        <GraduationCap className="w-4 h-4 text-blue-800 dark:text-blue-300 relative z-10" />
                        <motion.span
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 1.5, repeat: 0, delay: index * 0.2 + 0.5 }}
                            className="absolute w-full h-full rounded-full bg-blue-400 dark:bg-blue-600"
                        />
                    </motion.span>
                    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {edu.institution}
                            </h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 sm:mb-0">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {edu.startDate.split("-")[0]} - {edu.endDate.split("-")[0]}
                                </span>
                            </time>
                        </div>
                        <p className="mb-1 text-base font-normal text-gray-500 dark:text-gray-400">
                            {edu.studyType} in <span className="font-medium text-gray-900 dark:text-white">{edu.area}</span>
                        </p>
                        {edu.score && (
                            <p className="text-sm text-green-600 dark:text-green-400 mb-2">GPA: {edu.score}</p>
                        )}
                        {edu.description && (
                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400 text-pretty">
                                {edu.description}
                            </p>
                        )}
                    </div>
                </motion.li>
            ))}
        </ol>
    );
}
