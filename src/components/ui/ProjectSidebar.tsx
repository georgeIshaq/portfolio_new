import React, { useEffect } from "react";
import Image from "next/image";
import { Project } from "@/data/projects";

interface ProjectSidebarProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

const PLACEHOLDER = "/projects/placeholder.png";

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ project, open, onClose }) => {
  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !project) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-label="Close project sidebar"
      />
      {/* Sidebar */}
      <aside
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-slideIn"
        style={{ transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)", transform: open ? "translateX(0)" : "translateX(100%)" }}
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {/* Project image */}
        <div className="w-full h-48 relative bg-gray-100">
          <Image
            src={project.image || PLACEHOLDER}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = PLACEHOLDER;
            }}
            priority
          />
        </div>
        {/* Project content */}
        <div className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="mb-4">
            <h3 className="font-semibold text-sm mb-1">Tech Stack:</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span key={idx} className="bg-gray-200 text-xs px-2 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4 flex gap-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">GitHub</a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">Live Demo</a>
            )}
          </div>
          {/* Canvas effect explanation */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-semibold mb-1 text-blue-700">What's this effect?</h4>
            <p className="text-xs text-blue-800">
              The animated lines in the background are a custom canvas effect I coded from scratch. It responds to your mouse and project card interactions, demonstrating my skills in creative coding, animation, and interactive UI engineering.
            </p>
          </div>
        </div>
      </aside>
      <style jsx global>{`
        body { overscroll-behavior: contain; }
        .animate-slideIn {
          animation: slideInSidebar 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes slideInSidebar {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
};

export default ProjectSidebar; 