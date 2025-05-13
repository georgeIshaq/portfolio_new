export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  featured: boolean;
  techStack: string[];
  link?: string;
  github?: string;
  year: number;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "HIT.PS",
    slug: "hit-ps",
    description: "A functional e-commerce platform for technology and engineering products. Features include user authentication, product catalog, shopping cart, and checkout process.",
    shortDescription: "Functional E-commerce platform for technology and engineering",
    image: "/projects/hitps-placeholder.jpg",
    featured: true,
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/yourusername/hitps",
    link: "https://hit.ps",
    year: 2023
  },
  {
    id: "2",
    title: "Medibot",
    slug: "medibot",
    description: "Stanford TreeHacks 2023 Winner. An AI-based diagnostic assistance tool for the elderly. Uses natural language processing to understand symptoms and provide preliminary medical advice.",
    shortDescription: "AI based diagnostic assistance for the elderly",
    image: "/projects/medibot-placeholder.jpg",
    featured: true,
    techStack: ["Python", "TensorFlow", "React", "Flask"],
    github: "https://github.com/yourusername/medibot",
    year: 2023
  },
  {
    id: "3",
    title: "Space Efficient Plagiarism Detector",
    slug: "plagiarism-detector",
    description: "A tool that uses abstract data structures (Counting Bloom Filters) to efficiently detect plagiarism in large document sets without requiring excessive memory resources.",
    shortDescription: "Using abstract data structures (Counting Bloom Filters) in plagiarism detection",
    image: "/projects/plagiarism-placeholder.jpg",
    featured: true,
    techStack: ["Java", "Data Structures", "Algorithms"],
    github: "https://github.com/yourusername/plagiarism-detector",
    year: 2022
  },
  {
    id: "4",
    title: "Ilithyia",
    slug: "ilithyia",
    description: "A sexual education application for Israeli & Palestinian teens. Provides culturally appropriate educational content, resources, and anonymous Q&A.",
    shortDescription: "Sexual education application for Israeli & Palestinian teens",
    image: "/projects/ilithyia-placeholder.jpg",
    featured: true,
    techStack: ["React Native", "Firebase", "i18n"],
    link: "https://ilithyia-app.com",
    year: 2022
  },
  {
    id: "5",
    title: "Chatty",
    slug: "chatty",
    description: "An immersion-based language learning voice chatbot. Uses speech recognition and natural language processing to create interactive conversations for language learners.",
    shortDescription: "Immersion based language learning voice chatbot",
    image: "/projects/chatty-placeholder.jpg",
    featured: false,
    techStack: ["Python", "TensorFlow", "React", "Web Speech API"],
    github: "https://github.com/yourusername/chatty",
    year: 2021
  },
  {
    id: "6",
    title: "Teeth Brushing Habits",
    slug: "teeth-brushing-habits",
    description: "A whimsical modeling and investigation into teeth brushing patterns. Collects and analyzes data on brushing habits to provide insights and recommendations.",
    shortDescription: "A whimsical modeling and investigation into my teeth brushing",
    image: "/projects/teeth-placeholder.jpg",
    featured: false,
    techStack: ["R", "Data Visualization", "Statistics"],
    github: "https://github.com/yourusername/teeth-brushing-analysis",
    year: 2021
  },
  {
    id: "7",
    title: "Interactive Portfolio",
    slug: "interactive-portfolio",
    description: "A creative portfolio website with interactive elements and draggable cards. Built with Next.js and custom animations to showcase projects in an engaging way.",
    shortDescription: "Interactive portfolio with draggable project cards and canvas effects",
    image: "/projects/portfolio-placeholder.jpg",
    featured: true,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas API"],
    github: "https://github.com/yourusername/portfolio",
    link: "https://yourportfolio.com",
    year: 2023
  },
  {
    id: "8",
    title: "AI Code Assistant",
    slug: "ai-code-assistant",
    description: "A developer tool that helps programmers write better code through intelligent suggestions, pattern recognition, and automatic bug detection. Built with machine learning and deep code analysis.",
    shortDescription: "Smart developer tool with AI-powered code suggestions and bug detection",
    image: "/projects/ai-code-placeholder.jpg",
    featured: true,
    techStack: ["Python", "Machine Learning", "VS Code Extension", "TypeScript"],
    github: "https://github.com/yourusername/ai-code-assistant",
    year: 2023
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export default projects; 