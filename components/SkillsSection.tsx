import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Organize skills by category
const skillsData = [
  {
    category: "AI & Machine Learning",
    accent: true,
    skills: [
      { name: "LLM Integration", level: "Expert" },
      { name: "RAG Architecture", level: "Advanced" },
      { name: "ML Pipelines", level: "Advanced" },
      { name: "AI APIs (OpenAI, Hugging Face)", level: "Expert" },
      { name: "Vector Databases", level: "Advanced" },
    ],
  },
  {
    category: "Backend Development",
    accent: false,
    skills: [
      { name: "Python", level: "Expert" },
      { name: "FastAPI", level: "Expert" },
      { name: "Django", level: "Advanced" },
      { name: "Node.js", level: "Advanced" },
      { name: "Express/NestJS", level: "Intermediate" },
      { name: "RESTful APIs", level: "Expert" },
      { name: "GraphQL", level: "Intermediate" },
    ],
  },
  {
    category: "Frontend Development",
    accent: false,
    skills: [
      { name: "TypeScript", level: "Advanced" },
      { name: "JavaScript", level: "Advanced" },
      { name: "React", level: "Advanced" },
      { name: "Next.js", level: "Advanced" },
      { name: "HTML/CSS", level: "Expert" },
      { name: "TailwindCSS", level: "Advanced" },
    ],
  },
  {
    category: "DevOps & Infrastructure",
    accent: false,
    skills: [
      { name: "Docker", level: "Advanced" },
      { name: "Kubernetes", level: "Intermediate" },
      { name: "CI/CD", level: "Advanced" },
      { name: "AWS", level: "Intermediate" },
      { name: "GCP", level: "Intermediate" },
      { name: "Microservices", level: "Advanced" },
    ],
  },
  {
    category: "Databases",
    accent: false,
    skills: [
      { name: "PostgreSQL", level: "Advanced" },
      { name: "MongoDB", level: "Advanced" },
      { name: "Redis", level: "Intermediate" },
      { name: "Elasticsearch", level: "Intermediate" },
      { name: "Pinecone/Qdrant", level: "Advanced" },
    ],
  },
];

// Function to get the right color class based on level
const getLevelClass = (level: string) => {
  switch (level) {
    case "Expert":
      return "bg-accent text-accent-foreground";
    case "Advanced":
      return "bg-background border border-accent/70 text-accent";
    case "Intermediate":
      return "bg-background border border-border text-muted-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export function SkillsSection() {
  return (
    <Card className="bg-card/90 border border-accent shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-accent-foreground mb-2 font-[var(--font-geist-mono)]">
          Technical Expertise
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Technologies and tools I've mastered through professional experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {skillsData.map((category) => (
            <div key={category.category} className="space-y-3">
              <h3 className={`text-lg font-bold ${category.accent ? 'text-accent-foreground bg-accent/20 inline-block px-3 py-1 rounded-md' : 'text-foreground'}`}>
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {category.skills.map((skill) => (
                  <Badge 
                    key={skill.name}
                    className={`px-3 py-1.5 text-xs md:text-sm ${getLevelClass(skill.level)}`}
                  >
                    {skill.name}
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
