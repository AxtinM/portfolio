import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Data structure for AI expertise
const aiExpertise = [
  {
    title: "Large Language Models",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"></path>
        <circle cx="12" cy="10" r="3"></circle>
        <path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
        <line x1="15" y1="15" x2="18" y2="18"></line>
      </svg>
    ),
    description: 
      "Implementing conversational AI systems, content generation tools, and advanced prompt engineering techniques for business applications.",
    technologies: ["GPT Models", "LangChain", "Hugging Face"],
  },
  {
    title: "Retrieval Augmented Generation",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        <path d="M8 11h6"></path>
        <path d="M11 8v6"></path>
      </svg>
    ),
    description: 
      "Creating domain-specific knowledge bases with semantic search and building systems for extracting insights from organizational documents.",
    technologies: ["Vector DBs", "Semantic Search", "Document Processing"],
  },
  {
    title: "AI Infrastructure & Deployment",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
      </svg>
    ),
    description: 
      "Designing high-throughput API services for AI model inference with efficient caching, optimization, and model monitoring systems.",
    technologies: ["API Development", "Microservices", "ML Ops"],
  },
  {
    title: "Multimodal AI Applications",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
    ),
    description: 
      "Integration of text, image processing, and OCR in document processing systems and multimodal search for digital asset management.",
    technologies: ["Computer Vision", "OCR", "NLP"],
  }
];

export function AIExpertiseSection() {
  return (
    <Card className="bg-card/90 border border-accent shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-accent-foreground mb-2 font-[var(--font-geist-mono)]">
          AI Expertise
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Specialized experience in artificial intelligence and machine learning
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiExpertise.map((item) => (
            <div 
              key={item.title} 
              className="group relative p-5 border border-accent/40 rounded-lg hover:border-accent/70 transition-all duration-300 bg-background/80 backdrop-blur-sm shadow-sm"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="text-accent-foreground bg-accent/20 p-1.5 rounded-md mt-1 group-hover:bg-accent/30 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
              </div>
              
              <p className="text-sm text-foreground mb-4 pl-9">
                {item.description}
              </p>
              
              <div className="flex flex-wrap gap-2 pl-9">
                {item.technologies.map((tech) => (
                  <Badge 
                    key={tech}
                    className="bg-accent/10 border border-accent/50 text-foreground hover:bg-accent/20 transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}