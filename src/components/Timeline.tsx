"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Education {
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    description?: string;
    score?: string;
    logo?: string;
}

interface TimelineProps {
    education: Education[];
}

export default function Timeline({ education }: TimelineProps) {
    const { language } = useLanguage();
    return (
        <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-4 space-y-12">
            {education.map((edu, index) => (
                <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="mb-10 ml-8 relative"
                >
                    {/* 
                Calculations for centering:
                - List Item (li) has ml-8 = 32px (space from border).
                - We want the Dot center to be exactly on the border (at -32px relative to li).
                - Dot size is w-10 = 40px. Half is 20px.
                - Left position = TargetCenter - HalfSize = -32px - 20px = -52px.
                - Tailwind -left-[52px].
            */}
                    <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.2 + 0.1 }}
                        viewport={{ once: true }}
                        className="absolute flex items-center justify-center w-10 h-10 bg-white rounded-full -left-[52px] ring-8 ring-white dark:ring-gray-900 dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700 z-10"
                    >
                        {edu.logo ? (
                            <img src={edu.logo} alt={edu.institution} className="w-full h-full object-cover" />
                        ) : (
                            <GraduationCap className="w-5 h-5 text-blue-800 dark:text-blue-300 relative z-10" />
                        )}
                    </motion.span>

                    {/* Restored Pulse Effect (behind the logo) */}
                    <motion.span
                        initial={{ scale: 1, opacity: 0.5 }}
                        whileInView={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.8, repeat: 0, delay: index * 0.2 + 0.1 }} // Single ping
                        viewport={{ once: true }}
                        className="absolute w-10 h-10 rounded-full bg-blue-400 dark:bg-blue-600 -left-[52px] top-0 -z-10"
                    />

                    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {edu.institution}
                            </h3>
                        </div>
                        <p className="mb-1 text-base font-normal text-gray-500 dark:text-gray-400">
                            {edu.studyType} {language === 'en' ? 'in' : 'en'} <span className="font-medium text-gray-900 dark:text-white">{edu.area}</span>
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
