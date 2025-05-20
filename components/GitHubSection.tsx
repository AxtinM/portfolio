import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function GitHubSection() {
  return (
    <Card className="bg-card/90 border border-accent shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-accent-foreground mb-2 font-[var(--font-geist-mono)]">
          GitHub
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Code samples and open source contributions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 mb-6 bg-background/80 rounded-lg border border-accent/30">
          <div className="flex items-center gap-4">
            <div className="text-accent p-2 rounded-full bg-accent/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.475 2 2 6.475 2 12C2 16.425 4.8625 20.1625 8.8375 21.4875C9.3375 21.575 9.525 21.275 9.525 21.0125C9.525 20.775 9.5125 19.9875 9.5125 19.15C7 19.6125 6.35 18.5375 6.15 17.975C6.0375 17.6875 5.55 16.8 5.125 16.5625C4.775 16.375 4.275 15.9125 5.1125 15.9C5.9 15.8875 6.4625 16.625 6.65 16.925C7.55 18.4375 8.9875 18.0125 9.5625 17.75C9.65 17.1 9.9125 16.6625 10.2 16.4125C7.975 16.1625 5.65 15.3 5.65 11.475C5.65 10.3875 6.0375 9.4875 6.675 8.7875C6.575 8.5375 6.225 7.5125 6.775 6.1375C6.775 6.1375 7.6125 5.875 9.525 7.1625C10.325 6.9375 11.175 6.825 12.025 6.825C12.875 6.825 13.725 6.9375 14.525 7.1625C16.4375 5.8625 17.275 6.1375 17.275 6.1375C17.825 7.5125 17.475 8.5375 17.375 8.7875C18.0125 9.4875 18.4 10.375 18.4 11.475C18.4 15.3125 16.0625 16.1625 13.8375 16.4125C14.2 16.725 14.5125 17.325 14.5125 18.2625C14.5125 19.6 14.5 20.675 14.5 21.0125C14.5 21.275 14.6875 21.5875 15.1875 21.4875C19.1375 20.1625 22 16.4125 22 12C22 6.475 17.525 2 12 2Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-foreground">AxtinM</h3>
              <p className="text-sm text-muted-foreground">github.com/AxtinM</p>
            </div>
          </div>
          <a 
            href="https://github.com/AxtinM" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md bg-accent text-accent-foreground hover:bg-accent/80 transition-colors font-semibold text-sm"
          >
            View Profile
          </a>
        </div>

        <p className="text-foreground mb-6">
          My GitHub repositories showcase practical implementations of AI systems, web development projects, and backend architecture. 
          I regularly contribute to open-source and publish code samples demonstrating my technical approach.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="https://github.com/AxtinM" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 rounded-lg border border-border bg-background/50 hover:border-accent/50 hover:bg-background/80 transition-all"
          >
            <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              RAG Implementation
            </h4>
            <p className="text-sm text-muted-foreground">
              A template for building Retrieval Augmented Generation systems with various embedding models and vector stores.
            </p>
          </a>
          
          <a 
            href="https://github.com/AxtinM" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 rounded-lg border border-border bg-background/50 hover:border-accent/50 hover:bg-background/80 transition-all"
          >
            <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              FastAPI Microservices
            </h4>
            <p className="text-sm text-muted-foreground">
              A robust architecture for building scalable microservices with FastAPI, including authentication, logging, and testing.
            </p>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}