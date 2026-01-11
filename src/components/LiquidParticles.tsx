"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface TrailDrop {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    life: number;
    color: string;
}

export default function LiquidParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const drops = useRef<TrailDrop[]>([]);
    const animationFrameId = useRef<number>(0);
    const lastPos = useRef({ x: 0, y: 0 });

    // Handle hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const spawnDrops = (x: number, y: number) => {
            const count = Math.random() > 0.5 ? 2 : 1;
            for (let i = 0; i < count; i++) {
                // Random color interpolation between Blue (#3b82f6) and Purple (#9333ea)
                const r = 59 + Math.random() * (147 - 59);
                const g = 130 + Math.random() * (51 - 130);
                const b = 246 + Math.random() * (234 - 246);

                drops.current.push({
                    x: x + (Math.random() - 0.5) * 60,
                    y: y + (Math.random() - 0.5) * 60,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    radius: Math.random() * 25 + 10,
                    life: 1.0,
                    color: `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}`
                });
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const dist = Math.hypot(clientX - lastPos.current.x, clientY - lastPos.current.y);

            // Always update mouse ref for physics interaction
            lastPos.current = { x: clientX, y: clientY };

            // Light Mode: Spawn on general movement (Trail)
            if (resolvedTheme !== 'dark') {
                if (dist > 5) spawnDrops(clientX, clientY);
            } else {
                // Dark Mode: Check if we are over a trigger element
                // elementFromPoint returns the top-most element at the coordinates
                const element = document.elementFromPoint(clientX, clientY);
                if (element && element.closest('[data-particle-trigger="true"]')) {
                    // Check distance to avoid over-spawning on slow drift over text
                    if (dist > 2) spawnDrops(clientX, clientY);
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Physics & Draw
            for (let i = drops.current.length - 1; i >= 0; i--) {
                const p = drops.current[i];

                // Chaotic Turbulence
                p.vx += (Math.random() - 0.5) * 0.1;
                p.vy += (Math.random() - 0.5) * 0.1;

                // Slow Viscous Movement
                p.x += p.vx;
                p.y += p.vy;

                // Gravity
                p.vy += 0.005;

                p.vx *= 0.98; // Dampening
                p.vy *= 0.98;

                p.life -= 0.008; // Long life

                if (p.life <= 0) {
                    drops.current.splice(i, 1);
                    continue;
                }

                // Draw Soft "Liquid" Circle
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                // Inner: White Highlight -> Outer: Base Color -> Edge: Transparent
                gradient.addColorStop(0, `rgba(255, 255, 255, ${p.life * 0.5})`);
                gradient.addColorStop(0.6, `${p.color}, ${p.life * 0.3})`);
                gradient.addColorStop(1, `${p.color}, 0)`);

                ctx.fillStyle = gradient;
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, [resolvedTheme, mounted]);

    // Dynamic Z-Index: Behind content in Light Mode (-1), On top of text in Dark Mode (50)

    // Dynamic Z-Index: Behind content in Light Mode (-1), On top of text in Dark Mode (50)

    const isDark = resolvedTheme === 'dark';

    if (!mounted) return null;

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none transition-opacity duration-500 blur-xl contrast-125
                ${isDark ? 'z-50 mix-blend-multiply' : 'z-0 opacity-80 mix-blend-multiply'}
            `}
            style={{
                zIndex: isDark ? 50 : -1
            }}
            aria-hidden="true"
        />
    );
}
