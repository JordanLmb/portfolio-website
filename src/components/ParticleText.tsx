"use client";

import { ReactNode } from "react";

interface ParticleTextProps {
    children: ReactNode;
    className?: string; // Allow passing standard classNames
}

export default function ParticleText({ children, className = "" }: ParticleTextProps) {
    return (
        <span
            className={`inline-block cursor-default relative z-10 ${className}`}
            data-particle-trigger="true"
        >
            {children}
        </span>
    );
}
