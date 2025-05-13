import { Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  title?: string;
}

const ProjectGrid = ({ projects, title }: ProjectGridProps) => {
  return (
    <section className="w-full py-16">
      {title && (
        <h2 className="mb-10 text-3xl font-bold text-center">{title}</h2>
      )}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid; 