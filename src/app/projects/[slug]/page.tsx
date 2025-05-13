import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }
  
  return {
    title: `${project.title} | George Ishaq Portfolio`,
    description: project.shortDescription,
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    notFound();
  }
  
  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      {/* Back button */}
      <Link
        href="/#projects"
        className="mb-8 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 rotate-180"
        >
          <path
            d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
            fill="currentColor"
          />
        </svg>
        Back to Projects
      </Link>
      
      {/* Project header */}
      <div className="mb-10">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{project.title}</h1>
        <div className="flex flex-wrap gap-3">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Project image */}
      <div className="relative mb-12 h-[300px] w-full overflow-hidden rounded-xl md:h-[500px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      
      {/* Project content */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-6 text-2xl font-bold">About this project</h2>
          <p className="mb-8 text-lg leading-relaxed text-gray-700">
            {project.description}
          </p>
        </div>
        
        <div className="lg:col-span-1">
          <div className="rounded-xl bg-gray-50 p-6">
            <h3 className="mb-4 text-xl font-bold">Project Details</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500">Year</p>
              <p className="font-medium">{project.year}</p>
            </div>
            
            <div className="space-y-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-full bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  View Live Project
                </a>
              )}
              
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium transition hover:bg-gray-50"
                >
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 