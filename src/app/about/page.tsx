"use client";

import resumeData from "@/data/resume.json";
import Timeline from "@/components/Timeline";
import ExperienceSection from "@/components/Experience";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
    const { language } = useLanguage();
    const data = resumeData[language];

    return (
        <main className="min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
            <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto space-y-20">

                {/* Header / Bio */}
                <section className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative shrink-0"
                    >
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-1 shadow-xl">
                            <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                                <img src="/profile.png" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-4 w-full">

                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
                        >
                            {data.basics.name}
                        </motion.h1>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="text-xl text-blue-600 dark:text-blue-400 font-medium"
                        >
                            {data.basics.label}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto md:mx-0"
                        >
                            {data.basics.summary}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex flex-wrap gap-4 justify-center md:justify-start pt-4"
                        >
                            <a href={`mailto:${data.basics.email}`} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Mail className="w-4 h-4" /> {data.basics.email}
                            </a>
                            <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Phone className="w-4 h-4" /> {data.basics.phone}
                            </span>
                            <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="w-4 h-4" /> {data.basics.location}
                            </span>

                            <a
                                href={language === 'en' ? "/CV_Jordan_LAMBERT_EN.pdf" : "/CV_Jordan_LAMBERT_FR.pdf"}
                                download
                                className="ml-auto md:ml-0 inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-medium text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <Download className="w-4 h-4" />
                                {language === 'en' ? "Download Resume" : "Télécharger CV"}
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* Experience Section */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            {language === 'en' ? "Professional Experience" : "Expérience Professionnelle"}
                            <div className="h-px bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700 flex-grow ml-4"></div>
                        </h3>
                        <ExperienceSection experience={data.experience} />
                    </motion.div>
                </section>

                {/* Education Section */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            {language === 'en' ? "Education Journey" : "Parcours Académique"}
                            <div className="h-px bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700 flex-grow ml-4"></div>
                        </h3>
                        <Timeline education={data.education} />
                    </motion.div>
                </section>

            </div>
        </main>
    );
}
