"use client";

import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "../../data/projects.json";
import { useLanguage } from "@/context/LanguageContext";
import { Project } from "@/lib/types";
import { motion } from "framer-motion";

export default function Home() {
  const { t, language } = useLanguage();
  // Cast json data to allow indexing by language key
  const projects: Project[] = (projectsData as any)[language];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5 // Delay until after Hero text starts
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50 } }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <Hero />

      <motion.section
        id="projects"
        className="py-12 px-4 mx-auto max-w-screen-xl"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.h2 variants={item} className="mb-8 text-3xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white">
          {t.projects.title}
        </motion.h2>
        <motion.div variants={item} className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </motion.section>
    </main>
  );
}
