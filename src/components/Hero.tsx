"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Github, Linkedin, ArrowRight, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import ParticleText from './ParticleText';

export default function Hero() {
    const { t } = useLanguage();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50 } }
    };

    return (
        <section className="bg-transparent pt-24 pb-12 transition-colors duration-300 relative">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16"
            >
                <motion.h1
                    variants={item}
                    className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
                >
                    <ParticleText>{t.hero.greeting}</ParticleText>
                </motion.h1>
                <motion.p
                    variants={item}
                    className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400"
                >
                    <ParticleText>{t.hero.description}</ParticleText>
                </motion.p>
                <motion.div
                    variants={item}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    {/* Primary Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link
                            href="#projects"
                            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900 transition-all shadow-lg hover:shadow-purple-500/30 w-full sm:w-auto"
                        >
                            {t.hero.ctaProject}
                            <ArrowDown className="w-4 h-4 ml-2" />
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-700 dark:text-gray-200 hover:text-[#6366f1] dark:hover:text-[#818cf8] rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto"
                        >
                            {t.hero.ctaAbout}
                        </Link>
                    </div>

                    {/* Social Icons (Desktop: next to buttons, Mobile: below) */}
                    <div className="flex gap-4 sm:border-l sm:pl-4 sm:border-gray-300 dark:sm:border-gray-700">
                        <Link
                            href="https://github.com/JordanLmb/"
                            target="_blank"
                            className="p-3 text-gray-500 hover:text-[#6366f1] dark:hover:text-[#818cf8] transition-colors border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/jordanlmb/"
                            target="_blank"
                            className="p-3 text-gray-500 hover:text-[#6366f1] dark:hover:text-[#818cf8] transition-colors border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>
            </motion.div>

            {/* Modern Gradient Divider */}
            {/* Modern Gradient Divider */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 dark:via-violet-500/50 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent blur-sm" />
        </section>
    );
}
