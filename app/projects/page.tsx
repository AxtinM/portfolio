import Link from "next/link";
import { getAllProjects, getAIProjects } from "../../lib/projects";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RetroGrid } from "@/components/ui/retro-grid";

export default function ProjectsPage() {
  const allProjects = getAllProjects();
  const aiProjects = getAIProjects();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-x-hidden">
      {/* RetroGrid Background */}
      <RetroGrid className="z-0" />

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Home Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-accent text-accent-foreground font-semibold shadow-lg border border-accent/60 hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M10 3L3 10H6V17H14V10H17L10 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Home
          </Link>
        </div>
        
        {/* Page Header */}
        <section className="mb-12">
          <Card className="bg-background/90 border border-accent shadow-2xl backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-4xl font-bold mb-2 text-accent-foreground">Projects</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                A showcase of my technical work, including AI applications, web development, and system architecture.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* AI Projects Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-accent-foreground">AI & Machine Learning Projects</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {aiProjects.map((project) => (
              <Card key={project.id} className="transition-all hover:scale-[1.02] hover:shadow-lg bg-card border border-border h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl group-hover:text-primary group-focus-within:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground mb-4">{project.detailedDescription}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        className={tech.toLowerCase().includes('ai') || tech.toLowerCase().includes('ml') || tech.toLowerCase().includes('llm')
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-secondary-foreground"}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardContent className="pt-2 flex justify-between">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent/20 hover:bg-accent/30 text-accent-foreground transition-colors"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      Code
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary/20 hover:bg-primary/30 text-primary-foreground transition-colors"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      Demo
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Other Projects Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-accent-foreground">Web & System Development</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {allProjects.filter(p => !p.aiRelated).map((project) => (
              <Card key={project.id} className="transition-all hover:scale-[1.02] hover:shadow-lg bg-card border border-border h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl group-hover:text-primary group-focus-within:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground mb-4">{project.detailedDescription}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardContent className="pt-2 flex justify-between">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent/20 hover:bg-accent/30 text-accent-foreground transition-colors"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      Code
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary/20 hover:bg-primary/30 text-primary-foreground transition-colors"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      Demo
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}