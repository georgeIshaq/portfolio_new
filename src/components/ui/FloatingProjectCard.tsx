import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Project } from "@/data/projects";
import Link from "next/link";

interface FloatingProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
  isActive: boolean;
  setActiveCard: (index: number | null) => void;
  quadrant: 1 | 2 | 3 | 4; // Not used anymore, but kept for prop compatibility
  onPositionChange?: (index: number, x: number, y: number) => void;
  onClick?: () => void;
}

const FloatingProjectCard = ({ 
  project, 
  index, 
  totalCards, 
  isActive, 
  setActiveCard,
  quadrant, // not used
  onPositionChange,
  onClick
}: FloatingProjectCardProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0, rotation: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragged, setDragged] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Evenly distribute cards in a circle
  useEffect(() => {
    const radius = 220;
    const angle = (2 * Math.PI * index) / totalCards;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    setPosition({ x, y, rotation: 0 });
  }, [index, totalCards]);

  // Notify parent of position change (only in useEffect, not render)
  useEffect(() => {
    if (onPositionChange) {
      onPositionChange(index, position.x, position.y);
    }
    // eslint-disable-next-line
  }, [position.x, position.y]);

  // Subtle float animation
  useEffect(() => {
    if (isDragging || isActive) return;
    const floatInterval = setInterval(() => {
      setPosition(prev => {
        const newY = prev.y + Math.sin(Date.now() / 3000 + index) * 0.05;
        const newX = prev.x + Math.cos(Date.now() / 4000 + index) * 0.05;
        return {
          ...prev,
          y: newY,
          x: newX,
        };
      });
    }, 200);
    return () => clearInterval(floatInterval);
  }, [index, isDragging, isActive]);

  // Drag logic
  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e: MouseEvent | TouchEvent) => {
      let clientX: number, clientY: number;
      if ('touches' in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const heroSection = document.getElementById('hero');
      if (!heroSection || !cardRef.current) return;
      const heroRect = heroSection.getBoundingClientRect();
      const heroCenterX = heroRect.left + heroRect.width / 2;
      const heroCenterY = heroRect.top + heroRect.height / 2;
      const newX = clientX - heroCenterX + dragOffset.x;
      const newY = clientY - heroCenterY + dragOffset.y;
      setPosition(prev => ({ ...prev, x: newX, y: newY }));
      setDragged(true);
    };
    const handleUp = () => {
      setIsDragging(false);
      setTimeout(() => setDragged(false), 100);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, dragOffset, index]);

  // Start drag
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isActive) return;
    let clientX: number, clientY: number;
    if ('touches' in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const cardRect = cardRef.current?.getBoundingClientRect();
    if (cardRect) {
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      setDragOffset({
        x: cardCenterX - clientX,
        y: cardCenterY - clientY
      });
    }
    setIsDragging(true);
    setDragged(false);
  };

  // Click handler (prevent click if just dragged)
  const handleClick = (e: React.MouseEvent) => {
    if (dragged) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (onClick) onClick();
  };

  return (
    <div
      ref={cardRef}
      className={`absolute transition-all ${isDragging ? 'cursor-grabbing z-40' : isActive ? 'z-30 cursor-pointer' : 'z-10 cursor-grab'}`}
      style={{
        transform: isActive
          ? `translate(-50%, -50%) scale(1.5) rotate(0deg)`
          : `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) rotate(${position.rotation}deg) scale(${isDragging ? 1.05 : 1})`,
        transformOrigin: "center center",
        top: "50%",
        left: "50%",
        transition: isDragging ? 'none' : 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        willChange: isDragging ? 'transform' : 'auto',
        touchAction: 'none'
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onClick={handleClick}
    >
      <div 
        className={`bg-white rounded-xl overflow-hidden shadow-lg opacity-90 hover:opacity-100`}
        style={{
          width: "240px",
          height: "120px",
          transition: isDragging ? "transform 0.1s ease, box-shadow 0.1s ease" : "all 0.3s ease",
          boxShadow: isDragging 
            ? "0 15px 25px rgba(0, 0, 0, 0.18)"
            : "0 5px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex h-full">
          {/* Image */}
          <div className="relative w-2/5 h-full min-w-[90px] bg-gray-100">
            <Image
              src={project.image || "/projects/placeholder.png"}
              alt={project.title}
              fill
              style={{ 
                objectFit: "cover",
                transition: "transform 0.5s ease",
                transform: "scale(1)",
                pointerEvents: "none"
              }}
              draggable="false"
            />
          </div>
          {/* Project info */}
          <div className="flex-1 p-3 flex flex-col justify-center">
            <h3 className="text-base font-bold truncate mb-1">{project.title}</h3>
            <div className="flex flex-wrap gap-1 mb-1">
              {project.techStack.slice(0, 3).map((tech, idx) => (
                <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-600 line-clamp-2">{project.shortDescription}</p>
          </div>
        </div>
        {isActive && (
          <div className="mt-3 animate-fadeIn">
            <Link 
              href={`/projects/${project.slug}`}
              className="text-sm font-medium text-blue-600 inline-flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              View Details
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="ml-1">
                <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingProjectCard; 