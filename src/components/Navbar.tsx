"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export default function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const { language, setLanguage, t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isMenuOpen]);

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "fr" : "en");
    };

    const navLinks = [
        { href: "/", label: t.nav.home },
        { href: "/about", label: t.nav.about }
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isMenuOpen || scrolled ? 'bg-[#020617]/90 backdrop-blur-md' : 'glass'}`}>
            <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center relative z-50">
                <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                    <Code2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    {t.nav.logo}
                </span>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex gap-4 text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={clsx(
                                    "transition-colors hover:text-purple-600 dark:hover:text-purple-400",
                                    pathname === link.href ? "text-purple-600 dark:text-purple-400" : "text-gray-600 dark:text-gray-400"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {language === "en" ? (
                                <>
                                    <img src="/icons/ca.svg" alt="Canada Flag" className="w-6 h-auto rounded-sm" />
                                    EN
                                </>
                            ) : (
                                <>
                                    <img src="/icons/fr.svg" alt="France Flag" className="w-6 h-auto rounded-sm" />
                                    FR
                                </>
                            )}
                        </button>
                        <ThemeToggle />
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-600 dark:text-gray-300"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-[60px] left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg px-4 py-6 flex flex-col gap-6"
                    >
                        <div className="flex flex-col gap-4 text-lg font-medium text-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={clsx(
                                        "py-2 transition-colors",
                                        pathname === link.href
                                            ? "text-purple-600 dark:text-purple-400"
                                            : "text-gray-900 dark:text-white"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                                {language === "en" ? (
                                    <>
                                        <img src="/icons/ca.svg" alt="Canada Flag" className="w-6 h-auto rounded-sm" />
                                        EN
                                    </>
                                ) : (
                                    <>
                                        <img src="/icons/fr.svg" alt="France Flag" className="w-6 h-auto rounded-sm" />
                                        FR
                                    </>
                                )}
                            </button>
                            <ThemeToggle />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
