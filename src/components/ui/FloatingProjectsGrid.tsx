import { useState, useEffect, useRef } from "react";
import { Project } from "@/data/projects";
import FloatingProjectCard from "./FloatingProjectCard";

interface FloatingProjectsGridProps {
  projects: Project[];
  onCardClick?: (project: Project) => void;
}

const FloatingProjectsGrid = ({ 
  projects, 
  onCardClick
}: FloatingProjectsGridProps) => {
  const [showCards, setShowCards] = useState(false);
  const [cardPositions, setCardPositions] = useState<Array<{x: number, y: number}>>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Initialize card positions
  useEffect(() => {
    setCardPositions(Array(projects.length).fill({ x: 0, y: 0 }));
  }, [projects.length]);
  
  // Stagger the entrance of cards for a nice effect
  useEffect(() => {
    // Small delay before showing cards
    const timer = setTimeout(() => {
      setShowCards(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle updating positions of cards when they're dragged
  const handleCardPositionChange = (index: number, x: number, y: number) => {
    setCardPositions(prev => {
      const newPositions = [...prev];
      if (newPositions[index]) {
        newPositions[index] = { x, y };
      }
      return newPositions;
    });
  };

  // Assign quadrants to distribute cards evenly (not used in card anymore, but kept for compatibility)
  const getQuadrantForIndex = (index: number): 1 | 2 | 3 | 4 => {
    return ((index % 4) + 1) as 1 | 2 | 3 | 4;
  };

  return (
    <div 
      ref={gridRef}
      className={`relative w-full h-full ${showCards ? 'opacity-100' : 'opacity-0'}`} 
      style={{ transition: 'opacity 0.8s ease' }}
    >
      {/* Floating cards */}
      {projects.map((project, index) => (
        <FloatingProjectCard
          key={project.id}
          project={project}
          index={index}
          totalCards={projects.length}
          isActive={false}
          setActiveCard={() => {}}
          quadrant={getQuadrantForIndex(index)}
          onPositionChange={handleCardPositionChange}
          onClick={() => onCardClick && onCardClick(project)}
        />
      ))}
    </div>
  );
};

export default FloatingProjectsGrid; 