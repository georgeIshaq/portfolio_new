"use client";
import Image from "next/image";
import CanvasEffect from "../components/ui/canvas";
import ProjectGrid from "../components/projects/ProjectGrid";
import FloatingProjectsGrid from "../components/ui/FloatingProjectsGrid";
import { projects, getFeaturedProjects, Project } from "../data/projects";
import { useEffect, useState } from "react";
import ProjectSidebar from "../components/ui/ProjectSidebar";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showProjectInfo, setShowProjectInfo] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const featuredProjects = getFeaturedProjects();

  // Ensure client-side rendering for images
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handler for opening sidebar
  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setSidebarOpen(true);
    setShowProjectInfo(true);
  };

  // Handler for closing sidebar
  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setShowProjectInfo(false);
    setSelectedProject(null);
  };

  return (
    <>
      {/* Hero Section with Canvas Effect and Floating Cards */}
      <section 
        id="hero" 
        style={{ 
          position: "relative", 
          minHeight: "100vh", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          overflow: "hidden" 
        }}
      >
        {/* Canvas effect confined to hero section */}
        <CanvasEffect heroSectionId="hero" />
        
        <div 
          style={{ 
            position: "relative", 
            zIndex: 1, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: "2.5rem", 
            padding: "2rem 1rem", 
            maxWidth: 1200, 
            width: "100%", 
            justifyContent: "center",
            height: "100vh"
          }}
        >
          {/* Header Section (Name and Title) */}
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">George Ishaq</h1>
            <p className="text-xl text-gray-600">Building delightful web experiences</p>
            {/* Tech stack bar */}
            <div className="flex flex-wrap justify-center gap-3 mt-4 mb-2">
              {/* Replace with real icons as desired */}
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">React</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">Node.js</span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">TypeScript</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">Python</span>
              <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">MongoDB</span>
              <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs font-semibold">TensorFlow</span>
            </div>
            {/* About Me */}
            <p className="text-base text-gray-700 max-w-xl mx-auto mt-2 mb-3">
              I'm a full-stack engineer specializing in interactive web apps, creative coding, and AI tools. I love building delightful, performant user experiences and tackling challenging problems.
            </p>
            {/* Social/contact links */}
            <div className="flex justify-center gap-4 mt-2">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-500 hover:text-black text-2xl">
                {/* Placeholder GitHub icon */}
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/></svg>
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-blue-700 text-2xl">
                {/* Placeholder LinkedIn icon */}
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
              </a>
              <a href="mailto:your-email@example.com" aria-label="Email" className="text-gray-500 hover:text-red-600 text-2xl">
                {/* Placeholder Email icon */}
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 13.065l-8-6.065v12h16v-12l-8 6.065zm8-8.065h-16l8 6.065 8-6.065z"/></svg>
              </a>
            </div>
          </div>
          
          {/* Profile Section with floating project cards */}
          <div className="relative flex-grow flex items-center justify-center w-full" style={{ minHeight: "60vh" }}>
            {/* Profile photo */}
            <div 
              className="z-10"
              style={{ 
                transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: `scale(${showProjectInfo ? 0.8 : 1})`,
                opacity: showProjectInfo ? 0.5 : 1
              }}
            >
              {mounted && (
                <Image
                  src="/george_photo.jpg"
                  alt="Profile photo"
                  width={180}
                  height={180}
                  className="rounded-full"
                  style={{ 
                    boxShadow: "0 4px 24px rgba(0,0,0,0.10)", 
                    border: "4px solid #fff", 
                    background: "#eee",
                    objectFit: "cover",
                    aspectRatio: "1/1"
                  }}
                  priority
                />
              )}
            </div>
            
            {/* Floating projects */}
            {mounted && (
              <div className="absolute inset-0 z-0">
                <FloatingProjectsGrid 
                  projects={featuredProjects}
                  onCardClick={handleCardClick}
                />
              </div>
            )}
          </div>
          
          {/* Call to action */}
          <div>
            <a
              href="#projects"
              className="rounded-full bg-black px-8 py-4 text-white transition hover:bg-gray-800 font-medium text-lg"
            >
              View my work
            </a>
          </div>
        </div>
      </section>

      {/* Sidebar for project details */}
      <ProjectSidebar 
        project={selectedProject} 
        open={sidebarOpen} 
        onClose={handleSidebarClose} 
      />

      {/* Contact Section (Placeholder) */}
      <section id="contact" className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-3xl font-bold md:text-4xl text-center">Get In Touch</h2>
          <div className="flex justify-center">
            <a
              href="mailto:your-email@example.com"
              className="rounded-full bg-black px-6 py-3 text-white transition hover:bg-gray-800"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} George Ishaq. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
