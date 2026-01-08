"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { translations, Language } from "@/data/translations";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // 1. Check Local Storage first
        const savedLang = localStorage.getItem("language") as Language | null;
        if (savedLang && (savedLang === "en" || savedLang === "fr")) {
            setLanguageState(savedLang);
        } else {
            // 2. Fallback to Browser Language
            const browserLang = navigator.language.split('-')[0];
            if (browserLang === 'fr') {
                setLanguageState('fr');
            } else {
                setLanguageState('en');
            }
        }
        setIsLoaded(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    };

    const t = translations[language];

    // Optional: Avoid rendering children until language is determined to prevent flash
    // But for SRR/SEO, better to render specific default. We render default "en" initially.

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
