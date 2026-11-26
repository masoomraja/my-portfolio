import { Suspense, lazy, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import ParticleBackdrop from "./ParticleBackdrop";
import "./App.css";

const ThreeScene = lazy(() => import("./ThreeScene"));
const SkillsPlayground = lazy(() => import("./SkillsPlayground"));
const ContactScene = lazy(() => import("./ContactScene"));

const EMAIL = "masoomraja9123@gmail.com";
const PHONE = "+91 9123193908";
const GITHUB_URL = "https://github.com/masoomraja";
const LINKEDIN_URL = "https://www.linkedin.com/in/md-masoom-raja-3b83a9342/";
const RESUME_URL = "/Md-Masoom-Raja-Resume.pdf";

const navItems = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "awards", label: "Awards" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const recruiterHighlights = [
  {
    value: "IEEE CCGE 2026",
    label: "Best Paper Awardee",
  },
  {
    value: "Oracle Certified",
    label: "Agentic AI Foundations",
  },
  {
    value: "PAT Technologies",
    label: "Software Dev Intern (2026)",
  },
  {
    value: "Full-Stack & AI",
    label: "Java · Python · Docker",
  },
];

const focusAreas = [
  "Java & Spring Boot",
  "Python & FastAPI",
  "Docker & Cloud",
  "Agentic AI & OpenCV",
];

const experienceHighlights = [
  "Contributed to Java and web application development, feature implementation, and relational database workflows.",
  "Performed debugging, testing, and issue resolution to keep project deliverables on schedule.",
  "Collaborated with mentors and cross-functional teammates across both frontend and backend tasks.",
];

const education = [
  {
    title: "Master of Computer Applications (MCA)",
    detail: "Dayananda Sagar College of Engineering, Bengaluru (VTU)",
    meta: "2024 – 2026",
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    detail: "IMS Noida, Chaudhary Charan Singh University (CCSU)",
    meta: "2021 – 2024",
  },
  {
    title: "Higher Secondary Certificate (12th)",
    detail: "Bihar School Examination Board (BSEB)",
    meta: "Bihar, India",
  },
  {
    title: "Secondary School Certificate (10th)",
    detail: "St. Teresa's School, Bhagalpur",
    meta: "Bihar, India",
  },
];

const awardsAndResearch = [
  {
    badge: "Award Winner",
    label: "Awards & Recognition",
    title: "Best Paper Award – IEEE International Conference (CCGE 2026)",
    organization: "IEEE International Conference – CCGE 2026",
    description:
      "Recognized with the Best Paper Award for research contribution and technical work presented at the IEEE International Conference (CCGE 2026).",
    highlights: [
      "Recognition for research quality and technical contribution",
      "Presented research work at an international academic conference",
      "Demonstrated analytical thinking, problem-solving, and research skills",
      "Contributed to academic knowledge through technical research",
    ],
  },
  {
    badge: "Research Presenter",
    label: "Research & Publications",
    title: "IEEE CCGE 2026 – Research Paper Presentation",
    organization: "IEEE International Conference (CCGE 2026)",
    description:
      "Presented technical research work at the IEEE International Conference (CCGE 2026), demonstrating academic research capabilities and clear technical communication.",
    highlights: [
      "Research paper presentation at an IEEE international conference",
      "Participation in an international academic research event",
      "Structured technical research, evaluation, and analysis",
      "Honored with the conference Best Paper Award",
    ],
  },
];

type ProjectCategory = "All" | "AI & Cloud" | "Java & Backend" | "DevOps & CV";

type ProjectItem = {
  category: Exclude<ProjectCategory, "All">;
  tag: string;
  title: string;
  description: string;
  pipeline: string[];
  highlights: string[];
  stack: string[];
  href?: string;
  linkLabel?: string;
};

const projectCategories: ProjectCategory[] = [
  "All",
  "AI & Cloud",
  "Java & Backend",
  "DevOps & CV",
];

const projects: ProjectItem[] = [
  {
    category: "AI & Cloud",
    tag: "AI & Cloud Intelligence",
    title:
      "NEXOVRA – AI-Powered Telemetry & Anomaly Detection Platform",
    description:
      "AI-powered telemetry monitoring and unsupervised anomaly detection platform designed to surface unusual system patterns and deployment risks early.",
    pipeline: ["Telemetry Stream", "Python · FastAPI", "Spring Boot API", "React Dashboard"],
    highlights: [
      "Built microservice architecture combining Spring Boot APIs with Python FastAPI Isolation Forest inference.",
      "Paired automated anomaly scoring with a React monitoring interface.",
    ],
    stack: ["Spring Boot", "Python", "FastAPI", "Isolation Forest", "React"],
    href: "https://github.com/masoomraja/NEXOVRA",
    linkLabel: "View on GitHub",
  },
  {
    category: "AI & Cloud",
    tag: "Cloud Operations & RCA",
    title:
      "NEXUS – Cloud Incident & Deployment Intelligence Platform",
    description:
      "Cloud operations platform for real-time incident management, anomaly detection, AI-assisted root-cause analysis, and deployment risk intelligence.",
    pipeline: ["Cloud Events", "Node.js + PostgreSQL", "AWS RCA Engine", "Incident Console"],
    highlights: [
      "Implemented incident workflows and deployment risk observability with React, Node.js, and PostgreSQL.",
      "Integrated AWS-oriented cloud monitoring and root-cause intelligence pipelines.",
    ],
    stack: ["React.js", "Node.js", "PostgreSQL", "AWS", "TypeScript"],
    href: "https://github.com/masoomraja/NEXUS-AI-Powered-Cloud-Incident-Deployment-Intelligence-Platform",
    linkLabel: "View on GitHub",
  },
  {
    category: "AI & Cloud",
    tag: "AI Chatbot & Spring Boot",
    title: "Fee Query AI",
    description:
      "Natural-language fee management chatbot allowing users to query fees, student records, and payments with a live analytics dashboard.",
    pipeline: ["NLP Query", "Spring Boot 3.5", "LM Studio / Fallback", "Chart.js Analytics"],
    highlights: [
      "Built on Spring Boot 3.5.3 with local LLM (LM Studio) integration and smart offline fallback.",
      "Added real-time Chart.js reporting to visualize fee collections and query responses.",
    ],
    stack: ["Spring Boot 3.5", "Java", "Local LLM", "NLP", "Chart.js"],
    href: "https://github.com/masoomraja/fee-query-ai",
    linkLabel: "View on GitHub",
  },
  {
    category: "DevOps & CV",
    tag: "MCA Final-Year Project",
    title: "Face Recognition-Based Attendance Monitoring System",
    description:
      "Automated attendance monitoring application using computer vision to detect and recognize faces in real time and log records cleanly.",
    pipeline: ["Webcam Feed", "Python · OpenCV", "LBPH Classifier", "CSV Attendance Log"],
    highlights: [
      "Implemented Haar Cascade face detection and LBPH recognition pipelines in Python and OpenCV.",
      "Automated timestamped CSV attendance storage to eliminate manual roll-call effort.",
    ],
    stack: ["Python", "OpenCV", "Haar Cascade", "LBPH", "NumPy", "CSV"],
  },
  {
    category: "DevOps & CV",
    tag: "DevOps & Containerization",
    title: "Dockerized Portfolio Deployment",
    description:
      "Containerized personal portfolio web application featuring multi-stage Docker builds, Docker Compose orchestration, Nginx serving, and 3D WebGL scenes.",
    pipeline: ["Vite + React Build", "Docker Multi-Stage", "Nginx Alpine", "Meshopt 3D"],
    highlights: [
      "Configured multi-stage Node + Nginx Alpine Docker images with immutable asset caching.",
      "Optimized initial load with route/chunk splitting and Meshopt 3D mesh compression.",
    ],
    stack: ["Docker", "Docker Compose", "Nginx", "React", "Three.js"],
    href: "https://github.com/masoomraja/my-portfolio/tree/codex/dockerize-my-portfolio",
    linkLabel: "View Docker Setup",
  },
  {
    category: "Java & Backend",
    tag: "Java & JDBC",
    title: "Transactional Bank Management System",
    description:
      "Core Java and MySQL banking application handling customer accounts, authentication, balance checks, deposits, and withdrawals.",
    pipeline: ["Auth & PIN", "Java OOP Service", "JDBC Transactions", "MySQL Ledger"],
    highlights: [
      "Designed relational schemas and transactional JDBC queries for account integrity.",
      "Structured modular OOP layers separating authentication, ledger actions, and persistence.",
    ],
    stack: ["Java", "JDBC", "MySQL", "OOP"],
  },
  {
    category: "Java & Backend",
    tag: "Java Networking",
    title: "Real-Time Chatting Application",
    description:
      "Client-server Java networking application enabling real-time message exchange, connection management, and graceful error handling.",
    pipeline: ["Client UI", "TCP Socket Stream", "Multithreaded Server", "Peer Broadcast"],
    highlights: [
      "Implemented socket-based communication and concurrent client handling using Java threads.",
      "Built reliable message framing and disconnect recovery between connected peers.",
    ],
    stack: ["Java", "Sockets", "Multithreading"],
  },
  {
    category: "Java & Backend",
    tag: "Java & MySQL",
    title: "Hotel Management & Electricity Billing Systems",
    description:
      "Relational desktop applications for hotel room bookings, staff/billing workflows, and automated monthly electricity bill generation.",
    pipeline: ["Booking / Meter Input", "Java Tariff Logic", "JDBC CRUD", "MySQL Records"],
    highlights: [
      "Automated tariff calculations, room allocation states, and customer billing history in MySQL.",
      "Applied clean JDBC CRUD patterns and structured input validation across forms.",
    ],
    stack: ["Java", "MySQL", "JDBC", "Desktop UI"],
  },
];

const featuredCertification = {
  badge: "Certified",
  issuer: "Oracle · Professional Certification",
  title: "Agentic AI Certified Foundations Associate",
  description:
    "Earned the Agentic AI Certified Foundations Associate certification from Oracle, demonstrating foundational knowledge of Agentic AI concepts, intelligent AI systems, autonomous workflows, and agent-based problem-solving.",
  areas: [
    "Agentic AI Fundamentals",
    "AI Agents & Intelligent Systems",
    "Autonomous AI Workflows",
    "AI Agent Capabilities",
    "Agent-Based Problem Solving",
    "Applications of Agentic AI",
  ],
};

const ongoingTraining = {
  badge: "Currently Pursuing · Aug 2026 – Present",
  issuer: "KodNest · Full Stack Development Training",
  title: "Java & Python Full Stack Development – KodNest",
  description:
    "Comprehensive hands-on training in Java and Python full-stack development, focused on building scalable, database-driven web applications and strengthening backend and software engineering fundamentals.",
  areas: [
    "Core Java (OOP, Collections, Multithreading)",
    "Python Programming & Scripting",
    "Advanced Java (JDBC, Servlets, JSP)",
    "Spring Framework & Spring Boot",
    "Hibernate & REST APIs",
    "HTML5, CSS3, JavaScript & React",
    "MySQL & SQL",
    "Git, GitHub, Maven, Postman & IntelliJ / Eclipse",
  ],
};

const professionalCertifications = [
  {
    status: "Completed · 12 Weeks",
    title: "Cloud Computing – NPTEL",
    issuer: "NPTEL / SWAYAM · IIT Kharagpur",
    description:
      "Successfully completed the 12-week NPTEL Cloud Computing course, gaining foundational knowledge of cloud infrastructure, distributed computing, and cloud service models.",
    skills: [
      "Cloud Computing Fundamentals",
      "Cloud Architecture",
      "Virtualization",
      "Distributed Systems",
      "Cloud Service Models",
    ],
  },
  {
    status: "Government-Certified",
    title: "Research Methodologies & Intellectual Property Rights (IPR)",
    issuer: "Academic Research & Intellectual Property",
    description:
      "Developed a solid understanding of research methodologies, academic writing, research ethics, intellectual property protection, and fundamentals of patents and copyrights.",
    skills: [
      "Research Design",
      "Literature Review",
      "Research Analysis",
      "Academic Writing",
      "Intellectual Property Rights",
      "Research Ethics",
    ],
  },
];

const technicalCertifications = [
  {
    title: "Artificial Intelligence & Machine Learning",
    description:
      "Completed training in AI and ML fundamentals covering intelligent systems, model development, and practical applications.",
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Analysis",
      "Predictive Modelling",
    ],
  },
  {
    title: "Natural Language Processing (NLP)",
    description:
      "Gained practical knowledge of NLP concepts and techniques used to process, understand, and analyze human language.",
    skills: [
      "Text Processing",
      "NLP Fundamentals",
      "Language Understanding",
      "Text Analysis",
    ],
  },
  {
    title: "Generative AI",
    description:
      "Explored generative AI technologies and their applications in building intelligent workflows and content systems.",
    skills: [
      "Generative AI",
      "Prompt Engineering",
      "AI Applications",
      "LLM Fundamentals",
    ],
  },
  {
    title: "Web Development",
    description:
      "Developed foundational knowledge of modern web development, responsive interfaces, and frontend application design.",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Web Design"],
  },
  {
    title: "JavaScript Programming",
    description:
      "Built core programming skills in JavaScript including functions, DOM manipulation, and interactive application logic.",
    skills: ["JavaScript", "Programming Logic", "DOM Manipulation"],
  },
  {
    title: "DevOps Basics",
    description:
      "Learned fundamental DevOps concepts, software delivery workflows, deployment practices, and containerization basics.",
    skills: ["DevOps", "Docker Fundamentals", "Deployment", "SDLC"],
  },
];

const skillGroups = [
  {
    title: "Languages",
    items: "Java (Strong), Python, JavaScript, C, C++",
  },
  {
    title: "Backend & Databases",
    items:
      "Spring Boot, Hibernate, JDBC, Servlets/JSP, Node.js, Express.js, REST APIs, MySQL, MongoDB",
  },
  {
    title: "Frontend & UI",
    items: "React.js, HTML5, CSS3, Responsive Web Design, Three.js",
  },
  {
    title: "DevOps & Tools",
    items:
      "Docker, Docker Compose, Git, GitHub, Maven, Postman, IntelliJ IDEA, CI/CD, AWS, Nginx",
  },
  {
    title: "AI / ML & Research",
    items: "Agentic AI, Generative AI, NLP, Machine Learning, OpenCV",
  },
  {
    title: "Core CS & Design",
    items: "OOP, Data Structures & Algorithms, DBMS, OS, Computer Networks",
  },
];

const strengths = [
  "Strong Java & backend logic",
  "Problem-solving & DSA mindset",
  "IEEE conference presenter",
  "Fast learner and adaptable",
  "Clear communication",
  "Cross-functional teamwork",
];

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ui-icon">
      <path
        fill="currentColor"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ui-icon">
      <path
        fill="currentColor"
        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ui-icon">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 9h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2Zm6-4H5a2 2 0 0 0-2 2v10"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ui-icon">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m5 13 4 4L19 7"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ui-icon">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ui-icon">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 3h7v7m0-7L10 14M5 7v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ui-icon">
      {open ? (
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          d="M6 6l12 12M18 6 6 18"
        />
      ) : (
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          d="M4 7h16M4 12h16M4 17h16"
        />
      )}
    </svg>
  );
}

const socialLinks = [
  {
    label: "GitHub",
    href: GITHUB_URL,
    helper: "github.com/masoomraja",
    icon: "github" as const,
  },
  {
    label: "LinkedIn",
    href: LINKEDIN_URL,
    helper: "Professional profile",
    icon: "linkedin" as const,
  },
  {
    label: "DSA & Daily Code",
    href: "https://github.com/masoomraja/daily-code",
    helper: "Java, Spring Boot & DSA",
    icon: "github" as const,
  },
  {
    label: "Docker Setup",
    href: "https://github.com/masoomraja/my-portfolio/tree/codex/dockerize-my-portfolio",
    helper: "Containerized portfolio",
    icon: "github" as const,
  },
];

type InteractiveTextProps = {
  as?: "p" | "h1" | "h2" | "h3" | "span" | "strong";
  className?: string;
  text: string;
  tone?: "body" | "heading" | "label";
};

function InteractiveText({
  as: Component = "p",
  className = "",
  text,
  tone = "body",
}: InteractiveTextProps) {
  if (tone !== "heading" || (Component !== "h1" && Component !== "h2")) {
    return (
      <Component
        className={`interactive-text interactive-text-${tone} ${className}`.trim()}
      >
        {text}
      </Component>
    );
  }

  const words = text.split(" ");

  return (
    <Component
      className={`interactive-text interactive-text-${tone} ${className}`.trim()}
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
        <span
          className="interactive-word-wrap"
          key={`${word}-${wordIndex}`}
          aria-hidden="true"
        >
          <span className="interactive-word">
            {Array.from(word).map((letter, letterIndex) => (
              <span
                className="interactive-letter"
                key={`${word}-${wordIndex}-${letter}-${letterIndex}`}
                style={
                  {
                    "--letter-index": letterIndex,
                  } as CSSProperties
                }
              >
                {letter}
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 ? " " : null}
        </span>
      ))}
    </Component>
  );
}

function DeferredVisual({
  children,
  fallback,
  minHeight,
}: {
  children: ReactNode;
  fallback: ReactNode;
  minHeight: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = hostRef.current;
    if (!node || shouldRender) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "550px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={hostRef} style={{ minHeight }}>
      {shouldRender ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("top");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("All");
  const [showTechCertDetails, setShowTechCertDetails] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("Job / Internship Inquiry");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [copiedInquiry, setCopiedInquiry] = useState(false);
  const [heroSceneReady, setHeroSceneReady] = useState(false);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  const formattedInquirySubject = `[Portfolio] ${inquiryType} from ${
    inquiryName.trim() || "Visitor"
  }`;
  const formattedInquiryBody = [
    `Name: ${inquiryName.trim() || "Not specified"}`,
    `Email: ${inquiryEmail.trim() || "Not specified"}`,
    `Topic: ${inquiryType}`,
    "",
    inquiryMessage.trim(),
  ].join("\n");

  const inquiryMailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    formattedInquirySubject
  )}&body=${encodeURIComponent(formattedInquiryBody)}`;

  const inquiryGmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    EMAIL
  )}&su=${encodeURIComponent(formattedInquirySubject)}&body=${encodeURIComponent(
    formattedInquiryBody
  )}`;

  const handleInquirySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inquiryName.trim() || !inquiryMessage.trim()) return;
    setInquirySubmitted(true);
    window.location.href = inquiryMailtoHref;
  };

  const handleCopyInquiry = async () => {
    const text = `To: ${EMAIL}\nSubject: ${formattedInquirySubject}\n\n${formattedInquiryBody}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedInquiry(true);
      window.setTimeout(() => setCopiedInquiry(false), 2200);
    } catch {
      setCopiedInquiry(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const frameId = window.requestAnimationFrame(() => {
      if (!cancelled) {
        setHeroSceneReady(true);
      }
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, []);
  const projectsSectionRef = useRef<HTMLElement>(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const handleCopyEmail = async () => {
    let copied = false;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(EMAIL);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied) {
      try {
        const helper = document.createElement("textarea");
        helper.value = EMAIL;
        helper.setAttribute("readonly", "");
        helper.style.position = "fixed";
        helper.style.opacity = "0";
        document.body.appendChild(helper);
        helper.select();
        copied = document.execCommand("copy");
        document.body.removeChild(helper);
      } catch {
        copied = false;
      }
    }

    if (copied) {
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
      return;
    }

    window.location.href = `mailto:${EMAIL}`;
  };

  const handleCategorySelect = (category: ProjectCategory) => {
    setSelectedCategory(category);
    const section = projectsSectionRef.current;
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top < 80) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleNavSelect = (id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    const target = document.getElementById(id);
    if (target) {
      target.classList.add("is-visible");
    }
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-section]")
    );
    const visibleRatios = new Map<string, number>();
    let scrollFrameId = 0;

    const revealInViewOrPassed = () => {
      const viewportBottom = window.innerHeight + 160;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportBottom) {
          section.classList.add("is-visible");
        }
      });
    };

    const syncActiveSection = () => {
      if (window.scrollY < 140) {
        setActiveSection("top");
        return;
      }

      let nextSection = "top";
      let highestRatio = 0;

      visibleRatios.forEach((ratio, id) => {
        if (ratio >= highestRatio) {
          nextSection = id;
          highestRatio = ratio;
        }
      });

      if (highestRatio > 0) {
        setActiveSection(nextSection);
      }
    };

    const updateScrollProgress = () => {
      scrollFrameId = 0;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
      setShowBackToTop(window.scrollY > 520);
      revealInViewOrPassed();
      syncActiveSection();
    };

    const queueScrollProgress = () => {
      if (scrollFrameId) return;
      scrollFrameId = window.requestAnimationFrame(updateScrollProgress);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-scroll-section");
          if (!id) return;

          if (entry.isIntersecting) {
            visibleRatios.set(id, entry.intersectionRatio);
            entry.target.classList.add("is-visible");
            return;
          }

          visibleRatios.delete(id);
        });

        syncActiveSection();
      },
      {
        threshold: [0.01, 0.12, 0.28, 0.48],
        rootMargin: "140px 0px 140px 0px",
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    updateScrollProgress();
    window.addEventListener("scroll", queueScrollProgress, { passive: true });
    window.addEventListener("resize", queueScrollProgress);
    window.addEventListener("hashchange", queueScrollProgress);

    return () => {
      window.cancelAnimationFrame(scrollFrameId);
      window.removeEventListener("scroll", queueScrollProgress);
      window.removeEventListener("resize", queueScrollProgress);
      window.removeEventListener("hashchange", queueScrollProgress);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const cursorGlow = cursorGlowRef.current;
    if (!cursorGlow) return;

    if (!window.matchMedia("(pointer: fine)").matches) {
      cursorGlow.style.display = "none";
      return;
    }

    let frameId = 0;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;
    let isVisible = false;

    const render = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;

      cursorGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      if (
        Math.abs(targetX - currentX) > 0.1 ||
        Math.abs(targetY - currentY) > 0.1 ||
        isVisible
      ) {
        frameId = window.requestAnimationFrame(render);
      } else {
        frameId = 0;
      }
    };

    const queueRender = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      isVisible = true;
      cursorGlow.classList.add("is-visible");
      queueRender();
    };

    const handlePointerLeave = () => {
      isVisible = false;
      cursorGlow.classList.remove("is-visible");
    };

    const handlePointerDown = () => {
      cursorGlow.classList.add("is-pressed");
    };

    const handlePointerUp = () => {
      cursorGlow.classList.remove("is-pressed");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const getSectionClassName = (id: string) =>
    `section-shell reveal-on-scroll scroll-panel${
      activeSection === id ? " section-active" : ""
    }`;

  return (
    <div
      className="page page-loaded"
      data-active={activeSection}
      style={
        {
          "--scroll-progress": scrollProgress,
        } as CSSProperties
      }
    >
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="page-orb page-orb-one" />
      <div className="page-orb page-orb-two" />
      <div className="page-orb page-orb-three" />
      <div className="page-grid" />
      <ParticleBackdrop />
      <div className="cursor-glow" ref={cursorGlowRef} aria-hidden="true" />
      <div className="scroll-trajectory" aria-hidden="true">
        <span className="scroll-trajectory-fill" />
        <span className="scroll-trajectory-dot" />
      </div>

      <nav className="navbar" aria-label="Primary navigation">
        <div className="navbar-shell">
          <a
            className="brand"
            href="#top"
            onClick={() => handleNavSelect("top")}
          >
            <span className="brand-text">Md Masoom Raja</span>
          </a>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-nav-links"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <MenuIcon open={mobileMenuOpen} />
          </button>

          <div
            className={`nav-links${mobileMenuOpen ? " is-open" : ""}`}
            id="primary-nav-links"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? "is-active" : undefined}
                aria-current={activeSection === item.id ? "page" : undefined}
                onClick={() => handleNavSelect(item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <header className="hero section-shell" id="top">
        <div className="hero-copy">
          <div className="availability-pill">
            <span className="status-dot" aria-hidden="true" />
            <span>Open to Java, Python, Backend &amp; Software Engineer Roles · All Over India</span>
          </div>

          <InteractiveText
            as="h1"
            text="Building reliable Java backends, Python AI services, and cloud apps."
            tone="heading"
          />
          <InteractiveText
            as="p"
            className="hero-summary"
            text="MCA student and Software Development Intern with hands-on experience in Java, Python, Spring Boot, FastAPI, web technologies, Docker, and AI/ML. Honored with the Best Paper Award at IEEE CCGE 2026 and Oracle Agentic AI Certified."
          />

          <div className="hero-buttons">
            <a className="btn btn-primary" href={RESUME_URL} download>
              <DownloadIcon />
              <span>Download Resume</span>
            </a>
            <a
              className="btn btn-secondary"
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLinkIcon />
              <span>Preview Resume</span>
            </a>
            <button
              className={`btn btn-secondary${copiedEmail ? " btn-copied" : ""}`}
              type="button"
              onClick={handleCopyEmail}
            >
              {copiedEmail ? <CheckIcon /> : <CopyIcon />}
              <span>{copiedEmail ? "Email Copied!" : "Copy Email"}</span>
            </button>
          </div>

          <div className="proof-strip" aria-label="Key achievements">
            {recruiterHighlights.map((item) => (
              <div className="proof-card" key={item.value}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="social-links">
            {socialLinks.map((item) => (
              <a
                className="social-link"
                href={item.href}
                key={item.label}
                target="_blank"
                rel="noreferrer"
                title={item.helper}
              >
                <span className="social-link-title">
                  {item.icon === "linkedin" ? <LinkedInIcon /> : <GitHubIcon />}
                  {item.label}
                </span>
                <small>{item.helper}</small>
              </a>
            ))}
          </div>

          <div className="chip-row">
            {focusAreas.map((item) => (
              <span className="chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          {heroSceneReady ? (
            <Suspense
              fallback={
                <div className="scene-fallback" aria-label="Loading 3D scene">
                  <span className="scene-loader">Loading 3D Avatar...</span>
                </div>
              }
            >
              <ThreeScene />
            </Suspense>
          ) : (
            <div className="scene-fallback" aria-label="Loading 3D scene">
              <span className="scene-loader">Loading 3D Avatar...</span>
            </div>
          )}
        </div>
      </header>

      <main className="content" id="main-content">
        <section
          className={getSectionClassName("about")}
          data-scroll-section="about"
          id="about"
        >
          <div className="section-header">
            <div>
              <InteractiveText
                as="p"
                className="section-label"
                text="About & Experience"
                tone="label"
              />
              <InteractiveText
                as="h2"
                text="Industry internship, backend engineering, and delivery"
                tone="heading"
              />
            </div>
            <InteractiveText
              as="p"
              className="section-intro"
              text="I combine a strong foundation in Java, OOP, and DSA with full-stack, Docker, and AI/ML experience to ship clean, dependable software."
            />
          </div>

          <div className="feature-panel">
            <div className="feature-copy">
              <span className="badge-pill">Internship · Feb 2026 – May 2026</span>
              <InteractiveText
                as="h3"
                text="Junior Software Development Intern — PAT Technologies Pvt. Ltd. (Edutainer)"
                tone="heading"
              />
              <ul className="clean-list experience-list">
                {experienceHighlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="feature-stats">
              <div className="stat-card">
                <InteractiveText
                  as="strong"
                  text="Primary Stack"
                  tone="heading"
                />
                <span>Java, Python, Spring Boot, FastAPI, MySQL, React, Docker</span>
              </div>
              <div className="stat-card">
                <InteractiveText
                  as="strong"
                  text="Engineering Focus"
                  tone="heading"
                />
                <span>REST APIs, Anomaly Detection, Cloud &amp; Agentic AI</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className={getSectionClassName("education")}
          data-scroll-section="education"
          id="education"
        >
          <div className="section-header">
            <div>
              <InteractiveText
                as="p"
                className="section-label"
                text="Education"
                tone="label"
              />
              <InteractiveText
                as="h2"
                text="Academic foundation"
                tone="heading"
              />
            </div>
            <InteractiveText
              as="p"
              className="section-intro"
              text="Postgraduate and undergraduate computer applications training grounded in software engineering and research."
            />
          </div>

          <div className="card-grid education-grid">
            {education.map((item) => (
              <article className="card" key={item.title}>
                <InteractiveText as="h3" text={item.title} tone="heading" />
                <InteractiveText as="p" text={item.detail} />
                <p className="card-meta">{item.meta}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className={getSectionClassName("awards")}
          data-scroll-section="awards"
          id="awards"
        >
          <div className="section-header" id="research">
            <div>
              <InteractiveText
                as="p"
                className="section-label"
                text="Awards & Research"
                tone="label"
              />
              <InteractiveText
                as="h2"
                text="IEEE recognition and research presentation"
                tone="heading"
              />
            </div>
            <InteractiveText
              as="p"
              className="section-intro"
              text="Recognized at an international IEEE conference for technical research contribution and presentation."
            />
          </div>

          <div className="split-grid">
            {awardsAndResearch.map((item) => (
              <article className="card tall-card achievement-card" key={item.title}>
                <div className="card-top-row">
                  <span className="section-label">{item.label}</span>
                  <span className="badge-pill badge-gold">{item.badge}</span>
                </div>
                <InteractiveText as="h3" text={item.title} tone="heading" />
                <p className="card-meta">{item.organization}</p>
                <InteractiveText as="p" text={item.description} />
                <ul className="clean-list">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          ref={projectsSectionRef}
          className={getSectionClassName("projects")}
          data-scroll-section="projects"
          id="projects"
        >
          <div className="section-header">
            <div>
              <InteractiveText
                as="p"
                className="section-label"
                text="Projects & Technical Achievements"
                tone="label"
              />
              <InteractiveText
                as="h2"
                text="AI, cloud, DevOps, and Java systems"
                tone="heading"
              />
            </div>
            <InteractiveText
              as="p"
              className="section-intro"
              text="Filter by domain to explore AI-powered cloud intelligence platforms, NLP assistants, computer vision, containerized deployments, and core Java applications."
            />
          </div>

          <div
            className="filter-bar"
            role="group"
            aria-label="Filter projects by category"
          >
            {projectCategories.map((category) => {
              const count =
                category === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === category).length;

              return (
                <button
                  key={category}
                  type="button"
                  className={`filter-pill${
                    selectedCategory === category ? " is-active" : ""
                  }`}
                  aria-pressed={selectedCategory === category}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <article className="card project-card" key={project.title}>
                <div className="card-top-row">
                  <p className="project-index">0{index + 1}</p>
                  <span className="badge-pill">{project.tag}</span>
                </div>
                <InteractiveText as="h3" text={project.title} tone="heading" />
                <div
                  className="project-preview"
                  aria-label={`${project.title} architecture flow`}
                >
                  <div className="project-preview-bar">
                    <span className="preview-dots" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="preview-caption">Architecture Flow</span>
                  </div>
                  <div className="project-pipeline">
                    {project.pipeline.map((node, nodeIdx) => (
                      <span className="pipeline-step" key={node}>
                        <span className="pipeline-node">{node}</span>
                        {nodeIdx < project.pipeline.length - 1 ? (
                          <span className="pipeline-arrow" aria-hidden="true">
                            →
                          </span>
                        ) : null}
                      </span>
                    ))}
                  </div>
                </div>
                <InteractiveText as="p" text={project.description} />
                <ul className="project-highlights">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="tag-row">
                  {project.stack.map((tech) => (
                    <span className="tech-tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                {project.href ? (
                  <a
                    className="project-link"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon />
                    <span>{project.linkLabel ?? "View Repository"}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section
          className={getSectionClassName("certifications")}
          data-scroll-section="certifications"
          id="certifications"
        >
          <div className="section-header">
            <div>
              <InteractiveText
                as="p"
                className="section-label"
                text="Certifications & Learning"
                tone="label"
              />
              <InteractiveText
                as="h2"
                text="Oracle, NPTEL, and technical credentials"
                tone="heading"
              />
            </div>
            <InteractiveText
              as="p"
              className="section-intro"
              text="Industry, academic, and technical certifications across Agentic AI, Cloud Computing, Research & IPR, and software engineering."
            />
          </div>

          <article className="card featured-cert-card">
            <div className="card-top-row">
              <span className="section-label">{featuredCertification.issuer}</span>
              <span className="badge-pill badge-gold">
                {featuredCertification.badge}
              </span>
            </div>
            <InteractiveText
              as="h3"
              text={featuredCertification.title}
              tone="heading"
            />
            <InteractiveText as="p" text={featuredCertification.description} />
            <div className="tag-row">
              {featuredCertification.areas.map((area) => (
                <span className="tech-tag" key={area}>
                  {area}
                </span>
              ))}
            </div>
          </article>

          <div className="split-grid cert-split-grid">
            {professionalCertifications.map((cert) => (
              <article className="card tall-card" key={cert.title}>
                <div className="card-top-row">
                  <span className="section-label">{cert.issuer}</span>
                  <span className="badge-pill">{cert.status}</span>
                </div>
                <InteractiveText as="h3" text={cert.title} tone="heading" />
                <InteractiveText as="p" text={cert.description} />
                <div className="tag-row">
                  {cert.skills.map((skill) => (
                    <span className="tech-tag" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <article className="card ongoing-training-card">
            <div className="card-top-row">
              <span className="section-label">{ongoingTraining.issuer}</span>
              <span className="badge-pill badge-live">
                {ongoingTraining.badge}
              </span>
            </div>
            <InteractiveText
              as="h3"
              text={ongoingTraining.title}
              tone="heading"
            />
            <InteractiveText as="p" text={ongoingTraining.description} />
            <div className="tag-row">
              {ongoingTraining.areas.map((area) => (
                <span className="tech-tag" key={area}>
                  {area}
                </span>
              ))}
            </div>
          </article>

          <div className="tech-cert-compact">
            <div className="tech-cert-compact-header">
              <div>
                <span className="section-label">
                  Technical Certifications ({technicalCertifications.length})
                </span>
                <p className="compact-subtitle">
                  AI/ML, NLP, Generative AI, Web Development, JavaScript &amp; DevOps Basics
                </p>
              </div>
              <button
                type="button"
                className="filter-pill"
                aria-expanded={showTechCertDetails}
                onClick={() => setShowTechCertDetails((prev) => !prev)}
              >
                {showTechCertDetails
                  ? "Hide details"
                  : "Show all technical certificates"}
              </button>
            </div>

            {!showTechCertDetails ? (
              <div className="chip-row">
                {technicalCertifications.map((cert) => (
                  <span className="mini-pill" key={cert.title}>
                    {cert.title}
                  </span>
                ))}
              </div>
            ) : (
              <div className="tech-cert-grid">
                {technicalCertifications.map((cert) => (
                  <article className="card" key={cert.title}>
                    <InteractiveText as="h3" text={cert.title} tone="heading" />
                    <InteractiveText as="p" text={cert.description} />
                    <div className="tag-row">
                      {cert.skills.map((skill) => (
                        <span className="tech-tag" key={skill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section
          className={getSectionClassName("skills")}
          data-scroll-section="skills"
          id="skills"
        >
          <div className="section-header">
            <div>
              <InteractiveText
                as="p"
                className="section-label"
                text="Technical Skills"
                tone="label"
              />
              <InteractiveText
                as="h2"
                text="Core stack and engineering strengths"
                tone="heading"
              />
            </div>
            <InteractiveText
              as="p"
              className="section-intro"
              text="Strong foundation in Java, Python, SQL, Docker, and AI/ML, paired with modern web and cloud engineering skills."
            />
          </div>

          <DeferredVisual
            minHeight="500px"
            fallback={
              <div className="scene-fallback scene-fallback-panel">
                <span className="scene-loader">Loading Interactive 3D Skills...</span>
              </div>
            }
          >
            <SkillsPlayground />
          </DeferredVisual>

          <div className="skills-support-grid">
            {skillGroups.map((item) => (
              <article className="card skill-support-card" key={item.title}>
                <InteractiveText as="h3" text={item.title} tone="heading" />
                <InteractiveText as="p" text={item.items} />
              </article>
            ))}
          </div>

          <div className="strengths-bar">
            <div className="strengths-header">
              <span className="section-label">How I Work</span>
              <a
                className="project-link"
                href="https://github.com/masoomraja/daily-code"
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon />
                <span>Explore Daily Java &amp; DSA Practice</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="chip-row">
              {strengths.map((item) => (
                <span className="mini-pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section
          className={getSectionClassName("contact")}
          data-scroll-section="contact"
          id="contact"
        >
          <div className="contact-panel">
            <div className="contact-copy">
              <InteractiveText
                as="p"
                className="section-label"
                text="Contact"
                tone="label"
              />
              <InteractiveText
                as="h2"
                text="Let's connect for internships and developer roles"
                tone="heading"
              />
              <InteractiveText
                as="p"
                text="Open to Java Developer, Backend Developer, Software Engineer, Cloud/DevOps, and AI engineering opportunities."
              />
            </div>

            <div className="contact-visual">
              <DeferredVisual
                minHeight="330px"
                fallback={
                  <div className="scene-fallback" aria-label="Loading 3D contact model">
                    <span className="scene-loader">Loading 3D Model...</span>
                  </div>
                }
              >
                <ContactScene />
              </DeferredVisual>
            </div>

            <div className="contact-details">
              <div className="contact-email-row">
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <button
                  type="button"
                  className="copy-inline-btn"
                  aria-label="Copy email address"
                  onClick={handleCopyEmail}
                >
                  {copiedEmail ? <CheckIcon /> : <CopyIcon />}
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <a href="tel:+919123193908">{PHONE}</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                linkedin.com/in/md-masoom-raja-3b83a9342
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                github.com/masoomraja
              </a>
              <span>Bengaluru, India</span>
            </div>

            <div className="hero-buttons contact-actions">
              <a className="btn btn-primary" href={`mailto:${EMAIL}`}>
                Send Email
              </a>
              <a
                className="btn btn-secondary"
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLinkIcon />
                <span>Preview Resume</span>
              </a>
              <a className="btn btn-secondary" href={RESUME_URL} download>
                <DownloadIcon />
                <span>Download Resume</span>
              </a>
            </div>

            <form
              className="contact-form"
              onSubmit={handleInquirySubmit}
              aria-label="Quick message and feedback form"
            >
              <div className="contact-form-header">
                <div>
                  <span className="section-label">Quick Inquiry / Feedback</span>
                  <h3>Send a direct message</h3>
                </div>
                <span className="badge-pill">Replies to {EMAIL}</span>
              </div>

              <div className="contact-form-grid">
                <label className="form-field">
                  <span>Your Name</span>
                  <input
                    type="text"
                    required
                    placeholder="Recruiter / Visitor name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                  />
                </label>

                <label className="form-field">
                  <span>Your Email</span>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                  />
                </label>

                <label className="form-field">
                  <span>Topic</span>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                  >
                    <option value="Job / Internship Inquiry">
                      Job / Internship Inquiry
                    </option>
                    <option value="Project Collaboration">
                      Project Collaboration
                    </option>
                    <option value="Portfolio Feedback">
                      Portfolio Feedback
                    </option>
                  </select>
                </label>

                <label className="form-field form-field-full">
                  <span>Message</span>
                  <textarea
                    rows={3}
                    required
                    placeholder="Share role details, interview availability, or feedback..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                  />
                </label>
              </div>

              <div className="contact-form-actions">
                <button type="submit" className="btn btn-primary">
                  Open in Email App
                </button>
                <a
                  className="btn btn-secondary"
                  href={inquiryGmailHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLinkIcon />
                  <span>Send via Gmail</span>
                </a>
                <button
                  type="button"
                  className={`btn btn-secondary${
                    copiedInquiry ? " btn-copied" : ""
                  }`}
                  onClick={handleCopyInquiry}
                >
                  {copiedInquiry ? <CheckIcon /> : <CopyIcon />}
                  <span>
                    {copiedInquiry ? "Message Copied!" : "Copy Message"}
                  </span>
                </button>
              </div>

              {inquirySubmitted ? (
                <p className="form-status-note">
                  Prepared your email draft for {EMAIL}. If your mail client
                  didn&apos;t open automatically, click{" "}
                  <strong>Send via Gmail</strong> or{" "}
                  <strong>Copy Message</strong> above.
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <p>
          © {new Date().getFullYear()} Md Masoom Raja · Built with React,
          TypeScript &amp; Three.js
        </p>
        <div className="footer-links">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={RESUME_URL} download>
            Resume
          </a>
          <a href="#top" onClick={() => handleNavSelect("top")}>
            Back to top ↑
          </a>
        </div>
      </footer>

      {showBackToTop ? (
        <a
          className="back-to-top-fab"
          href="#top"
          aria-label="Back to top"
          onClick={() => handleNavSelect("top")}
        >
          ↑
        </a>
      ) : null}
    </div>
  );
}

export default App;
