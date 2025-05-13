"use client";
import Image from "next/image";
import CanvasEffect from "../components/ui/canvas";
import ProjectGrid from "../components/projects/ProjectGrid";
import { projects } from "../data/projects";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Ensure client-side rendering for images
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Hero Section with Canvas Effect */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Canvas effect confined to hero section */}
        <CanvasEffect heroSectionId="hero" />
        
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "row", alignItems: "center", gap: "2.5rem", padding: "2rem 1rem", maxWidth: 900, width: "100%", justifyContent: "center" }}>
          {/* Profile photo/model */}
          <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {mounted && (
              <Image
                src="/projects/profile-placeholder.png"
                alt="Profile photo"
                width={160}
                height={160}
                style={{ borderRadius: "50%", boxShadow: "0 4px 24px rgba(0,0,0,0.10)", border: "4px solid #fff", background: "#eee" }}
                priority
              />
            )}
          </div>
          {/* Hero text */}
          <div style={{ textAlign: "left", flex: 1 }}>
            <h1 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: "1rem" }}>George Ishaq</h1>
            <p style={{ fontSize: "1.5rem", marginBottom: "2rem", color: "#888" }}>
              Building delightful web experiences
            </p>
            <a
              href="#projects"
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: "999px",
                background: "#111",
                color: "#fff",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                transition: "background 0.2s",
              }}
              onMouseOver={e => (e.currentTarget.style.background = "#333")}
              onMouseOut={e => (e.currentTarget.style.background = "#111")}
            >
              View my work
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl text-center">My Work</h2>
        <p className="mb-12 text-center text-gray-600 max-w-2xl mx-auto">
          Here are some of the projects I've worked on. Each project represents a unique challenge and learning experience.
        </p>
        {mounted && (
          <ProjectGrid
            projects={projects}
            title=""
          />
        )}
      </section>

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
