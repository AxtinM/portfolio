export type AuraHeroData = {
  name: string;
  roleLine: string;
  intro: string;
  summary: string;
  quickFacts: { label: string; value: string }[];
};

export type SignatureSystem = {
  id: string;
  title: string;
  summary: string;
  proof: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  context: string;
  highlights: string[];
};

export type ContactCTA = {
  bookingUrl: string;
  bookingLabel: string;
  email: string;
  emailLabel: string;
};

export const auraHeroData: AuraHeroData = {
  name: "Mohamed Attig",
  roleLine: "Founder of Cortex Kernel. Creator of Craftsignal.",
  intro: "Backend engineer focused on AI product systems.",
  summary:
    "I build reliable AI applications by combining high-concurrency Node.js orchestration with Python agent workflows and clean architecture.",
  quickFacts: [
    { label: "Experience", value: "6 years" },
    { label: "AI interactions", value: "50k+ daily" },
  ],
};

export const signatureSystems: SignatureSystem[] = [
  {
    id: "into-ai-guest-system",
    title: "AI Guest Service System",
    summary:
      "Led the core system architecture for INTO AI guest services, including realtime voice handling and stateful agent orchestration.",
    proof: [
      "Engineered a low-latency Node.js WebSocket gateway bridging concurrent voice streams to Python AI agents.",
      "Architected LangGraph reasoning flows with strict separation between agent logic and IO layers.",
      "Optimized Azure ingestion pipelines for unstructured document processing and RAG retrieval readiness.",
    ],
  },
  {
    id: "craftsignal",
    title: "Craftsignal.io",
    summary:
      "Built and shipped Craftsignal as a product artifact that reflects my founder-operator approach to AI-first software.",
    proof: [
      "Product direction, architecture, and execution handled end to end.",
      "Emphasis on robust abstractions, pragmatic delivery, and maintainable systems.",
    ],
  },
  {
    id: "orchestration-pattern",
    title: "Orchestration Pattern",
    summary:
      "Specialized in pairing Node.js orchestration with Python intelligence layers to keep complex AI workflows stable under load.",
    proof: [
      "Designed event-driven microservices supporting 50k+ daily AI interactions.",
      "Implemented Redis pooling and caching strategies to absorb inference usage spikes.",
      "Built unified internal APIs aggregating service metrics for product visibility.",
    ],
  },
];

export const coreStack = [
  "TypeScript",
  "Node.js",
  "Python",
  "FastAPI",
  "NestJS",
  "LangChain",
  "LangGraph",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "Azure",
  "Google Cloud",
];

export const experiences: ExperienceItem[] = [
  {
    company: "INTO AI",
    role: "Senior Backend Engineer",
    period: "2024 - Present",
    context: "Realtime voice and agent systems",
    highlights: [
      "Built a high-concurrency WebSocket gateway in Node.js for realtime voice streams.",
      "Architected the agent reasoning core with LangGraph for stateful multi-turn planning.",
    ],
  },
  {
    company: "Dragonfly",
    role: "Backend Engineer",
    period: "2022 - 2024",
    context: "Large-scale AI interaction platform",
    highlights: [
      "Developed event-driven orchestration services handling 50k+ AI interactions daily.",
      "Implemented Redis pooling and caching to eliminate bottlenecks under inference spikes.",
    ],
  },
  {
    company: "Quicktext",
    role: "Full Stack Engineer",
    period: "2020 - 2022",
    context: "Hospitality conversational systems",
    highlights: [
      "Designed booking abstractions normalizing data from 30+ property systems.",
      "Migrated legacy PHP/Symfony components into modern Node-based services for 1,500+ clients.",
    ],
  },
];

export const contactCTA: ContactCTA = {
  bookingUrl:
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ36Se3ez3h_0pkJH7S8yPuPxkoOc52qqTjIZeMUStmfSj_FLPrtNj9ZQxNWnZ8pRnJXTDqvNkgL?gv=true",
  bookingLabel: "Book Appointment",
  email: "mat@cortexkernel.com",
  emailLabel: "Email Mat",
};
