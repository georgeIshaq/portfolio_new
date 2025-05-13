"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/projects/${project.slug}`}>
      <div
        className="group relative cursor-pointer overflow-hidden rounded-xl bg-white transition-all duration-300 hover:shadow-lg"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transform: isHovered ? "translateY(-5px)" : "translateY(0)",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          boxShadow: isHovered ? "0 10px 30px rgba(0, 0, 0, 0.1)" : "0 2px 10px rgba(0, 0, 0, 0.05)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container with aspect ratio */}
        <div className="relative h-0 w-full overflow-hidden" style={{ paddingBottom: "66.67%" }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{
              objectFit: "cover",
              transition: "transform 0.5s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        </div>

        {/* Project info */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
          <p className="mb-4 text-sm text-gray-600">{project.shortDescription}</p>
          
          {/* Tech stack */}
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 3).map((tech, index) => (
                <span 
                  key={index}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
            
            {/* View Project link */}
            <div 
              className="mt-4 text-sm font-medium"
              style={{
                color: "#111",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              View Project
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: isHovered ? "translateX(4px)" : "translateX(0)",
                  transition: "transform 0.2s ease-in-out",
                }}
              >
                <path
                  d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard; 