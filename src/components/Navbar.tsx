"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const { language, setLanguage, t } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "fr" : "en");
    };

    return (
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link
                    href="/"
                    className="font-bold text-xl tracking-tight text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    {t.nav.logo}
                </Link>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex gap-4 text-sm font-medium">
                        <Link
                            href="/"
                            className={clsx(
                                "transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                                isHome ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
                            )}
                        >
                            {t.nav.home}
                        </Link>
                        <Link
                            href="/about"
                            className={clsx(
                                "transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                                pathname === "/about" ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
                            )}
                        >
                            {t.nav.about}
                        </Link>
                    </div>

                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                        <button
                            onClick={toggleLanguage}
                            className="px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {language === "en" ? "🇺🇸 EN" : "🇫🇷 FR"}
                        </button>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}
