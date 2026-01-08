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

    useEffect(() => {
        if (videoRef.current) {
            if (isHovered) {
                // Reset to 0 relative to itself to ensure it replays on re-hover
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(error => {
                    console.log("Video play prevented:", error);
                });
            } else {
                videoRef.current.pause();
                // We do NOT reset here to avoid flickering logic, but we could. 
                // Resetting on hover start is safer for "Replay".
                videoRef.current.currentTime = 0;
            }
        }
    }, [isHovered]);

    const isVideo = project.video && (project.video.endsWith('.mp4') || project.video.endsWith('.webm'));

    return (
        <Link
            href={project.link}
            target="_blank"
            className="block max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 transition-transform hover:scale-105 duration-300 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="h-48 w-full bg-gray-200 rounded-t-lg flex items-center justify-center text-gray-400 relative overflow-hidden">
                {/* Static Image / Placeholder */}
                {project.image && !project.image.endsWith('placeholder.jpg') ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full object-cover transition-opacity duration-300 absolute inset-0 z-10 ${isHovered && project.video ? 'opacity-0' : 'opacity-100'}`}
                    />
                ) : (
                    <span>{project.title} Image</span>
                )}

                {/* Hover Video (MP4/WebM) */}
                {project.video && isVideo && (
                    <video
                        ref={videoRef}
                        src={project.video}
                        muted
                        playsInline
                        // Removed loop to play only once
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    // Video is always there (z-0), image fades out (z-10) revealing video.
                    // When mouse leaves, image fades back in (opacity-100).
                    />
                )}
            </div>
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                        <span key={tech} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                            {tech}
                        </span>
                    ))}
                </div>
                <span
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg group-hover:bg-blue-800 dark:bg-blue-600 dark:group-hover:bg-blue-700 transition-colors"
                >
                    {t.projects.viewBtn}
                </span>
            </div>
        </Link>
    );
}
