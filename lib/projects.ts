export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  aiRelated: boolean;
  date: string; // ISO format date
}

// Projects data - replace with your actual projects
export const projects: Project[] = [
  {
    id: "ai-research-assistant",
    title: "AI Research Assistant",
    description: "A tool that helps researchers parse and analyze academic papers using AI.",
    detailedDescription: 
      "Built a system that leverages LLMs to extract key information from academic papers, " +
      "generate summaries, and provide insights on methodologies used. " +
      "The tool significantly reduced research time and improved comprehension for complex topics.",
    technologies: ["Python", "FastAPI", "LangChain", "OpenAI API", "React", "TypeScript"],
    githubUrl: "https://github.com/AxtinM",
    featured: true,
    aiRelated: true,
    date: "2024-12-01"
  },
  {
    id: "multi-tenant-notification",
    title: "Multi-Tenant Notification System",
    description: "A scalable notification service supporting multiple tenants with advanced segmentation.",
    detailedDescription: 
      "Designed and built a multi-tenant Notification Center CRM with Python, FastAPI, React, Redis, and Docker. " +
      "The system enabled advanced user segmentation and dynamic notification delivery across various channels. " +
      "Implemented a performance-optimized architecture capable of handling high message throughput.",
    technologies: ["Python", "FastAPI", "React", "Redis", "Docker", "Microservices"],
    githubUrl: "https://github.com/AxtinM",
    featured: true,
    aiRelated: false,
    date: "2023-05-15"
  },
  {
    id: "ai-chatbot-platform",
    title: "AI Chatbot Platform",
    description: "A flexible platform for deploying customized AI chatbots with domain-specific knowledge.",
    detailedDescription: 
      "Created a platform that allows businesses to easily deploy and customize AI chatbots " +
      "trained on their specific domain knowledge. The system includes a RAG pipeline, " +
      "conversation management, and analytics dashboard. Reduced implementation time " +
      "for new chatbots by 80%.",
    technologies: ["Python", "FastAPI", "Vector Databases", "LLM APIs", "Next.js", "TailwindCSS"],
    githubUrl: "https://github.com/AxtinM",
    featured: true,
    aiRelated: true,
    date: "2024-03-10"
  },
  {
    id: "iot-monitoring-system",
    title: "IoT Monitoring System",
    description: "Real-time monitoring system for industrial IoT devices with predictive maintenance.",
    detailedDescription: 
      "Engineered a scalable web and IoT solution for real-time monitoring of industrial equipment. " +
      "The system integrated MQTT for data collection, implemented real-time dashboards, " +
      "and provided predictive maintenance alerts using basic ML models. " +
      "Successfully deployed in a manufacturing environment.",
    technologies: ["Python", "Django", "React", "MQTT", "IoT", "Docker", "Time-series DB"],
    githubUrl: "https://github.com/AxtinM",
    featured: true,
    aiRelated: false,
    date: "2022-06-15"
  },
  {
    id: "document-processing-pipeline",
    title: "Intelligent Document Processing",
    description: "An AI-powered system for extracting structured data from unstructured documents.",
    detailedDescription: 
      "Built a document processing pipeline that uses computer vision and NLP to extract " +
      "structured information from various document types including invoices, receipts, and forms. " +
      "The system achieves over 95% accuracy and integrates with existing business workflows.",
    technologies: ["Python", "FastAPI", "Computer Vision", "NLP", "OCR", "ML"],
    githubUrl: "https://github.com/AxtinM",
    featured: false,
    aiRelated: true,
    date: "2023-11-20"
  }
];

// Helper function to get featured projects
export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

// Helper function to get AI-related projects
export function getAIProjects(): Project[] {
  return projects.filter(project => project.aiRelated);
}

// Helper function to get all projects
export function getAllProjects(): Project[] {
  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Helper function to get a specific project by ID
export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}