"use client";

import { useState } from "react";

export default function LanguageToggle() {
    const [lang, setLang] = useState<"EN" | "FR">("EN");

    const toggleLang = () => {
        setLang(lang === "EN" ? "FR" : "EN");
        // TODO: Connect to global language context
    };

    return (
        <button
            onClick={toggleLang}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
        >
            {lang}
        </button>
    );
}
