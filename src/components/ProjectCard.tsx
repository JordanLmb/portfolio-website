"use client";

import Link from "next/link";
import { Project } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useRef, useEffect } from "react";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const { t } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Reset hover state on touch devices/unmount
    useEffect(() => {
        return () => setIsHovered(false);
    }, []);

    // Only enable hover logic on non-touch (fine pointer) devices
    const handleMouseEnter = () => {
        if (window.matchMedia("(hover: hover)").matches) {
            setIsHovered(true);
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            if (isHovered) {
                // Reset to 0 relative to itself to ensure it replays on re-hover
                videoRef.current.currentTime = 0;
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Video play prevented:", error);
                        setIsHovered(false); // Fallback if autoplay fails
                    });
                }
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [isHovered]);

    const isVideo = project.video && (project.video.endsWith('.mp4') || project.video.endsWith('.webm'));

    return (
        <div
            className="group block w-full max-w-sm glass rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(false)}
        >
            {/* Visual Header (Image/Video) */}
            <div className="h-48 w-full bg-gray-900/50 relative overflow-hidden">
                {project.image && !project.image.endsWith('placeholder.jpg') ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full object-cover transition-opacity duration-300 absolute inset-0 z-10 ${isHovered && project.video ? 'opacity-0' : 'opacity-100'}`}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium tracking-wider">
                        {project.title}
                    </div>
                )}

                {project.video && isVideo && (
                    <video
                        ref={videoRef}
                        src={project.video}
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                )}

                {/* Overlay Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
            </div>

            <div className="p-6 relative">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                </h5>
                <p className="mb-4 text-gray-300 text-sm leading-relaxed h-12 line-clamp-2">
                    {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                        <span key={tech} className="bg-blue-500/10 border border-blue-500/20 text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-auto">
                    {/* Demo Button */}
                    {project.demoUrl && (
                        <Link
                            href={project.demoUrl}
                            target="_blank"
                            className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            Demo
                        </Link>
                    )}

                    {/* Code Button */}
                    {project.isPrivate ? (
                        <button disabled className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-800/50 rounded-lg cursor-not-allowed border border-gray-700">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            Private
                        </button>
                    ) : (
                        <Link
                            href={project.repoUrl || "#"}
                            target="_blank"
                            className={`flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors border border-gray-700 hover:bg-white/10 ${!project.demoUrl ? 'bg-gray-800 text-white' : 'text-gray-300'}`}
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                            Code
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
