# CLAUDE.md - Portfolio Website Project Guide

## Project Purpose
Build a professional, high-performance portfolio website to showcase my AI, automation, and software development projects to potential employers. The site must be fast, SEO-optimized, and demonstrate modern web development practices.

## Core Principles
- **Performance is a Feature:** Lighthouse scores (Performance, Accessibility, SEO, Best Practices) must all be >90.
- **Clean Architecture:** The code should be modular, well-documented, and easy to extend.
- **Content First:** The presentation of my project case studies is the most important content.

## Tech Stack
- **Framework:** Next.js 15 (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (with CI/CD from main branch)
- **Content:** Project data sourced from a local `data/projects.json` file for simplicity.
- **Optional (Phase 2):** A lightweight CMS (like Sanity.io or Contentlayer) for blog posts.

## Repository Structure
portfolio-website/
├── app/ # Next.js App Router
│ ├── (pages)/ # All routes (home, about, projects, contact)
│ ├── projects/[slug]/ # Dynamic route for individual project case studies
│ └── layout.tsx
├── components/ # Reusable React components (Header, ProjectCard, etc.)
├── data/ # Static data files (projects.json)
├── public/ # Static assets (images, icons)
└── lib/ # Utility functions (formatting dates, fetching data)

## Coding Conventions
- **Components:** Use server components by default. Switch to client components only when interactivity is needed (`'use client'`).
- **Types:** Define TypeScript interfaces in `/lib/types.ts`.
- **Styling:** Use Tailwind CSS utility classes. Extract repeated patterns into `@apply` directives in `app/globals.css` only if used 3+ times.
- **Images:** Always use the Next.js `<Image>` component for optimization.

## Development Commands
- `npm run dev` - Start local development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `vercel --prod` - Deploy to Vercel (requires Vercel CLI)

## Project Workflow & Priorities
1.  **Phase 1 (MVP):** Basic site with Home, About, Projects listing, and Contact page. Deploy to Vercel.
2.  **Phase 2 (Enhance):** Add individual project case study pages with detailed write-ups, technical deep dives, and challenges/learnings.
3.  **Phase 3 (Polish):** Add dark mode, performance optimizations, and an RSS feed for a blog section.

## Notes for AI Assistant (Claude Code)
- When generating code, prioritize performance and accessibility (semantic HTML, alt text).
- Suggest optimizations for Core Web Vitals (LCP, FID, CLS).
- Help structure project case study content to highlight **Problem, Solution, Tech Stack, Challenges, and Results**.
