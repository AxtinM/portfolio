"use client";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RetroGrid } from "@/components/ui/retro-grid";

// Company logo SVG placeholders
const companyLogos: Record<string, React.ReactNode> = {
  "INTO AI": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#1A1A2E" />
      <text x="16" y="21" textAnchor="middle" fontSize="14" fill="#fff" fontFamily="monospace">AI</text>
    </svg>
  ),
  "Dragonfly": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="16" fill="#22223B" />
      <text x="16" y="21" textAnchor="middle" fontSize="14" fill="#fff" fontFamily="monospace">DF</text>
    </svg>
  ),
  "Quicktext": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="16" fill="#2D3142" />
      <text x="16" y="21" textAnchor="middle" fontSize="14" fill="#fff" fontFamily="monospace">QT</text>
    </svg>
  ),
  "UBIAI": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="16" fill="#22223B" />
      <text x="16" y="21" textAnchor="middle" fontSize="14" fill="#fff" fontFamily="monospace">UB</text>
    </svg>
  ),
  "Satoripop": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="16" fill="#1A1A2E" />
      <text x="16" y="21" textAnchor="middle" fontSize="14" fill="#fff" fontFamily="monospace">SP</text>
    </svg>
  ),
  "Sastec Group": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="16" fill="#2D3142" />
      <text x="16" y="21" textAnchor="middle" fontSize="14" fill="#fff" fontFamily="monospace">SG</text>
    </svg>
  ),
};

const experiences = [
  {
    company: "INTO AI",
    title: "Backend Engineer (Python, FastAPI, AI)",
    period: "May 2025 - Present",
    location: "Quebec, Canada",
    summary: "Architecting and scaling AI-driven platforms with Python and FastAPI. Delivering robust backend solutions for international clients.",
    stack: ["Python", "FastAPI", "AI", "Cloud"],
  },
  {
    company: "Dragonfly",
    title: "Full Stack Developer (Python, FastAPI, AI)",
    period: "June 2024 - May 2025",
    location: "Nanterre, France",
    summary: "Empowered teams to innovate with AI, building collaborative multi-LLM platforms and API-first solutions using Python and FastAPI.",
    stack: ["Python", "FastAPI", "React", "AI", "Microservices"],
  },
  {
    company: "Quicktext",
    title: "Full Stack Developer (Python, FastAPI, AI)",
    period: "Sep 2023 - Jun 2024",
    location: "Sousse, Tunisia",
    summary: "Developed and maintained flagship chatbots and microservices, driving innovation in conversational AI and seamless user experiences with Python and FastAPI.",
    stack: ["Python", "FastAPI", "React", "PHP", "Symfony"],
  },
  {
    company: "UBIAI",
    title: "Full Stack Developer (Python, Django, AI)",
    period: "Jan 2023 - Sep 2023",
    location: "Remote",
    summary: "Delivered new features and optimized microservices for an AngularJS-based app, enabling dynamic code execution and robust backend performance with Python and Django.",
    stack: ["Python", "Django", "Prefect", "Microservices"],
  },
  {
    company: "Satoripop",
    title: "Full Stack Developer Intern (Python, FastAPI)",
    period: "Jan 2023 - Jun 2023",
    location: "Sousse, Tunisia",
    summary: "Built a multi-tenancy Notification Center CRM with Python, FastAPI, React, Redis, and Docker, enabling advanced segmentation and dynamic notifications.",
    stack: ["Python", "FastAPI", "React", "Redis", "Docker"],
  },
  {
    company: "Sastec Group",
    title: "Full Stack Developer (Python, Django, IoT)",
    period: "Dec 2021 - Aug 2022",
    location: "Sousse, Tunisia",
    summary: "Engineered scalable web and IoT solutions, integrating MQTT, ROS, and LIDAR for real-time data and autonomous navigation using Python and Django.",
    stack: ["Python", "Django", "React", "MQTT", "IoT"],
  },
];

function ExperienceTabs() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        {experiences.map((exp, idx) => (
          <button
            key={exp.company}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors border border-accent/40 bg-background/80 text-accent-foreground hover:bg-accent/20 focus:outline-none ${activeTab === idx ? "ring-2 ring-accent" : ""}`}
            onClick={() => setActiveTab(idx)}
            type="button"
            aria-selected={activeTab === idx}
            aria-controls={`exp-panel-${idx}`}
            id={`exp-tab-${idx}`}
          >
            <span className="inline-flex items-center gap-2">
              {companyLogos[exp.company]}
              {exp.company}
            </span>
          </button>
        ))}
      </div>
      <div className="w-full mt-4">
        {experiences.map((exp, idx) => (
          <div
            key={exp.company}
            id={`exp-panel-${idx}`}
            role="tabpanel"
            aria-labelledby={`exp-tab-${idx}`}
            className={activeTab === idx ? "block" : "hidden"}
          >
            <div className="flex items-center gap-4 mb-2">
              {companyLogos[exp.company]}
              <div>
                <div className="font-bold text-lg text-accent-foreground">{exp.title}</div>
                <div className="text-sm text-muted-foreground">{exp.period} &mdash; {exp.location}</div>
              </div>
            </div>
            <div className="text-base text-foreground mb-2">{exp.summary}</div>
            <div className="flex flex-wrap gap-2">
              {exp.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function Home() {
  // Ref for the Google Calendar scheduling button
  const calendarBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).calendar && calendarBtnRef.current) {
      (window as any).calendar.schedulingButton.load({
        url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ36Se3ez3h_0pkJH7S8yPuPxkoOc52qqTjIZeMUStmfSj_FLPrtNj9ZQxNWnZ8pRnJXTDqvNkgL?gv=true",
        color: "#039BE5",
        label: "Book an appointment",
        target: calendarBtnRef.current,
      });
    }
  }, []);

  return (
    <>
      <Head>
        <link href="https://calendar.google.com/calendar/scheduling-button-script.css" rel="stylesheet" />
        <script src="https://calendar.google.com/calendar/scheduling-button-script.js" async></script>
      </Head>
      <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-x-hidden">
        {/* RetroGrid Background */}
        <RetroGrid className="z-0" />

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
          {/* Hero Card */}
          <section className="w-full flex flex-col items-center mb-10">
            <Card className="w-full bg-background/90 border border-accent shadow-2xl backdrop-blur-lg">
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-4xl md:text-5xl font-extrabold text-accent-foreground mb-2 font-[var(--font-geist-mono)]">
                  Mohamed Attig
                </CardTitle>
                <CardDescription className="text-xl md:text-2xl font-bold text-muted-foreground my-4 font-[var(--font-geist-mono)] text-center">
                  Full Stack Developer<br />
                  Specializing in Next.js, Django/FastAPI, NodeJs, and AI-driven solutions.
                </CardDescription>
                <CardDescription className="text-base md:text-lg text-muted-foreground mb-4 font-[var(--font-geist-mono)] text-center">
                  I build with passion and a touch of flair,<br />
                  From AI to web, I’m everywhere.<br />
                  With code as my canvas, I create with pride,<br />
                  A digital artist, on this journey I glide.<br />
                  From Tunisia to the world, my skills I’ll share,<br />
                  In the realm of tech, I’m a breath of fresh air.<br />
                </CardDescription>
                <div className="flex flex-col md:flex-row gap-4 items-center mt-2">
                  <a
                    href="mailto:attigmohammed@gmail.com"
                    className="text-foreground bg-accent/20 px-2 py-1 rounded underline underline-offset-2 font-mono hover:text-background hover:bg-accent focus:text-background focus:bg-accent transition-colors"
                  >
                    attigmohammed@gmail.com
                  </a>
                  <span className="hidden md:inline text-muted-foreground">|</span>
                  <a
                    href="https://www.linkedin.com/in/mohamedattig"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground bg-accent/20 px-2 py-1 rounded underline underline-offset-2 font-mono hover:text-background hover:bg-accent focus:text-background focus:bg-accent transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </CardHeader>
            </Card>
          </section>

          {/* Google Calendar Booking Button */}
          <section className="w-full max-w-2xl mb-12 flex justify-center">
            <div ref={calendarBtnRef} className="w-full flex justify-center"></div>
          </section>

          {/* Experience Tabs */}
          <section className="w-full mb-16">
            <Card className="bg-card/90 border border-accent shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-accent-foreground mb-2 font-[var(--font-geist-mono)]">Professional Experience</CardTitle>
                <CardDescription className="text-muted-foreground">A journey through impactful roles and projects.</CardDescription>
              </CardHeader>
              <CardContent>
                <ExperienceTabs />
              </CardContent>
            </Card>
          </section>

          {/* Thoughts Section */}
          <section className="w-full mb-16">
            <Card className="bg-card/90 border border-accent shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-accent-foreground mb-2 font-[var(--font-geist-mono)]">Thoughts</CardTitle>
                <CardDescription className="text-muted-foreground">On tech, history, and philosophy</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base md:text-lg text-foreground mb-4">
                  The tech world moves at a relentless pace—new frameworks, new paradigms, and new opportunities to build. I thrive in this environment, not just for the challenge, but for the chance to create meaningful, lasting impact. Yet, I find balance in my love for history and philosophy, drawing inspiration from the past to inform the future. If you’re curious about my journey, thoughts, and what drives me, I invite you to explore my blog.
                </p>
                <Link
                  href="/blog"
                  className="inline-block px-6 py-3 rounded-lg bg-accent text-accent-foreground font-bold text-lg shadow-lg border border-accent/60 hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                >
                  Visit My Blog
                </Link>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </>
  );
}
