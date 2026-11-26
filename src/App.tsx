import { Suspense, lazy, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import ParticleBackdrop from "./ParticleBackdrop";
import "./App.css";

const ThreeScene = lazy(() => import("./ThreeScene"));
const SkillsPlayground = lazy(() => import("./SkillsPlayground"));
const ContactScene = lazy(() => import("./ContactScene"));

const focusAreas = [
  "Java & Spring Boot",
  "Backend & REST APIs",
  "Docker & Cloud",
  "Agentic AI & ML",
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

const projects = [
  {
    tag: "AI & Cloud Intelligence",
    title:
      "NEXOVRA – AI-Powered Cloud Incident & Deployment Intelligence Platform",
    description:
      "AI-powered telemetry monitoring, cloud incident intelligence, and unsupervised anomaly detection platform for identifying unusual patterns and deployment risks.",
    stack: ["Spring Boot", "FastAPI", "Isolation Forest", "React", "Cloud"],
    href: "https://github.com/masoomraja/NEXOVRA",
    linkLabel: "View on GitHub",
  },
  {
    tag: "AI Chatbot & Backend",
    title: "Fee Query AI",
    description:
      "AI-powered fee management assistant that answers student and fee-related queries in natural language, backed by Spring Boot, local LLM integration, and analytics.",
    stack: ["Spring Boot", "Java", "Local LLM", "NLP", "Chart.js"],
    href: "https://github.com/masoomraja/fee-query-ai",
    linkLabel: "View on GitHub",
  },
  {
    tag: "MCA Final-Year Project",
    title: "Face Recognition-Based Attendance Monitoring System",
    description:
      "Automated attendance monitoring system built with Python and OpenCV to detect and recognize faces in real time and log records cleanly to CSV.",
    stack: ["Python", "OpenCV", "Haar Cascade", "LBPH", "NumPy", "CSV"],
  },
  {
    tag: "DevOps & Containerization",
    title: "Dockerized Portfolio Deployment",
    description:
      "Containerized personal portfolio web application featuring multi-stage Docker builds, Docker Compose orchestration, Nginx static serving, and interactive 3D scenes.",
    stack: ["Docker", "Docker Compose", "Nginx", "React", "Three.js"],
    href: "https://github.com/masoomraja/my-portfolio/tree/codex/dockerize-my-portfolio",
    linkLabel: "View Docker Setup",
  },
  {
    tag: "Java & JDBC",
    title: "Transactional Bank Management System",
    description:
      "Java and MySQL banking application supporting customer account handling, secure authentication, balance checks, deposits, withdrawals, and relational data storage.",
    stack: ["Java", "JDBC", "MySQL", "OOP"],
  },
  {
    tag: "Java Networking",
    title: "Real-Time Chatting Application",
    description:
      "Client-server Java networking application enabling real-time message transfer, connection management, and error handling between users.",
    stack: ["Java", "Sockets", "Multithreading"],
  },
  {
    tag: "Java & MySQL",
    title: "Hotel Management System",
    description:
      "Application to manage room bookings, customer records, room availability, billing workflows, and staff details in one unified interface.",
    stack: ["Java", "MySQL", "Desktop UI"],
  },
  {
    tag: "Automation & Billing",
    title: "Electricity Billing System",
    description:
      "Automated billing application that calculates monthly power consumption, generates itemized bills, and persists customer records in MySQL.",
    stack: ["Java", "MySQL", "JDBC"],
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
    skills: ["Artificial Intelligence", "Machine Learning", "Data Analysis", "Predictive Modelling"],
  },
  {
    title: "Natural Language Processing (NLP)",
    description:
      "Gained practical knowledge of NLP concepts and techniques used to process, understand, and analyze human language.",
    skills: ["Text Processing", "NLP Fundamentals", "Language Understanding", "Text Analysis"],
  },
  {
    title: "Generative AI",
    description:
      "Explored generative AI technologies and their applications in building intelligent workflows and content systems.",
    skills: ["Generative AI", "Prompt Engineering", "AI Applications", "LLM Fundamentals"],
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
    items: "Spring Boot, JDBC, Node.js, Express.js, REST APIs, MySQL, MongoDB",
  },
  {
    title: "Frontend & UI",
    items: "React.js, HTML5, CSS3, Responsive Web Design, Three.js",
  },
  {
    title: "DevOps & Cloud",
    items: "Docker, Docker Compose, Git, GitHub, CI/CD, AWS, Nginx",
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

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/masoomraja",
    helper: "github.com/masoomraja",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-masoom-raja-3b83a9342/",
    helper: "Professional profile",
  },
  {
    label: "Dockerized Portfolio",
    href: "https://github.com/masoomraja/my-portfolio/tree/codex/dockerize-my-portfolio",
    helper: "Containerized repo branch",
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
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-section]")
    );
    const visibleRatios = new Map<string, number>();
    let scrollFrameId = 0;

    const revealInViewOrPassed = () => {
      const viewportBottom = window.innerHeight * 0.96;
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
        rootMargin: "0px 0px -40px 0px",
      }
    );

    sections.forEach((section, index) => {
      section.style.setProperty(
        "--reveal-delay",
        `${Math.min(index * 45, 160)}ms`
      );
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

      <nav className="navbar">
        <div className="navbar-shell">
          <a className="brand" href="#top">
            <span className="brand-text">Md Masoom Raja</span>
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#education">Education</a>
            <a href="#awards">Awards</a>
            <a href="#projects">Projects</a>
            <a href="#certifications">Certifications</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <header className="hero section-shell" id="top">
        <div className="hero-copy">
          <InteractiveText
            as="p"
            className="eyebrow"
            text="MCA Student · Java & Backend Developer · IEEE Best Paper Awardee"
            tone="label"
          />
          <InteractiveText
            as="h1"
            text="Building reliable Java backends, cloud systems, and AI-powered apps."
            tone="heading"
          />
          <InteractiveText
            as="p"
            className="hero-summary"
            text="Results-driven MCA student and Software Development Intern with hands-on experience in Java, Spring Boot, web technologies, Docker, and AI/ML. Recognized with the Best Paper Award at IEEE CCGE 2026 and Oracle Agentic AI Certified."
          />

          <div className="hero-meta">
            <span>Bengaluru, India</span>
            <span>Open to Java, Backend &amp; Software roles</span>
          </div>

          <div className="hero-buttons">
            <a
              className="btn btn-primary"
              href="/Md-Masoom-Raja-Resume.pdf"
              download
            >
              Download Resume
            </a>
            <a className="btn btn-secondary" href="mailto:masoomraja9123@gmail.com">
              Email Me
            </a>
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
                <span>{item.label}</span>
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
          <Suspense
            fallback={
              <div className="scene-fallback" aria-label="Loading 3D scene">
                <span className="scene-loader">Loading 3D Avatar...</span>
              </div>
            }
          >
            <ThreeScene />
          </Suspense>
        </div>
      </header>

      <main className="content">
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
                text="Engineering logic, backend systems, and practical delivery"
                tone="heading"
              />
            </div>
            <InteractiveText
              as="p"
              className="section-intro"
              text="I enjoy solving software engineering problems, designing clean backend workflows, and containerizing full-stack and AI-powered applications for real-world deployment."
            />
          </div>

          <div className="feature-panel">
            <div className="feature-copy">
              <span className="badge-pill">Experience · Feb 2026 – May 2026</span>
              <InteractiveText
                as="h3"
                text="Junior Software Development Intern — PAT Technologies Pvt. Ltd. (Edutainer)"
                tone="heading"
              />
              <InteractiveText
                as="p"
                text="Contributed to frontend and backend application development involving Java, web technologies, and relational database management. Performed debugging, testing, and feature implementation while collaborating with mentors and engineering teammates to deliver milestones on schedule."
              />
            </div>
            <div className="feature-stats">
              <div className="stat-card">
                <InteractiveText
                  as="strong"
                  text="Primary stack"
                  tone="heading"
                />
                <span>Java, Spring Boot, JDBC, MySQL, React, Docker</span>
              </div>
              <div className="stat-card">
                <InteractiveText
                  as="strong"
                  text="Core strengths"
                  tone="heading"
                />
                <span>OOP, DSA, AI/ML, Cloud, Team Collaboration</span>
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
              text="Postgraduate and undergraduate computer applications training grounded in software development and research."
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
              text="Selected engineering builds spanning AI-powered cloud intelligence, NLP assistants, computer vision, containerized deployments, and core Java applications."
            />
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="card project-card" key={project.title}>
                <div className="card-top-row">
                  <p className="project-index">0{index + 1}</p>
                  <span className="badge-pill">{project.tag}</span>
                </div>
                <InteractiveText as="h3" text={project.title} tone="heading" />
                <InteractiveText as="p" text={project.description} />
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
                    {project.linkLabel ?? "View Repository"} →
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
              text="Verified industry, academic, and technical certifications across Agentic AI, Cloud Computing, Research & IPR, and full-stack engineering."
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
            <span className="section-label">How I Work</span>
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
              <a href="mailto:masoomraja9123@gmail.com">
                masoomraja9123@gmail.com
              </a>
              <a href="tel:+919123193908">+91 9123193908</a>
              <a
                href="https://www.linkedin.com/in/md-masoom-raja-3b83a9342/"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/md-masoom-raja-3b83a9342
              </a>
              <a
                href="https://github.com/masoomraja"
                target="_blank"
                rel="noreferrer"
              >
                github.com/masoomraja
              </a>
              <span>Bengaluru, India</span>
            </div>

            <div className="hero-buttons contact-actions">
              <a className="btn btn-primary" href="mailto:masoomraja9123@gmail.com">
                Send Email
              </a>
              <a
                className="btn btn-secondary"
                href="/Md-Masoom-Raja-Resume.pdf"
                download
              >
                Save Resume
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <p>© {new Date().getFullYear()} Md Masoom Raja · Built with React, TypeScript &amp; Three.js</p>
        <div className="footer-links">
          <a
            href="https://github.com/masoomraja"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/md-masoom-raja-3b83a9342/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="/Md-Masoom-Raja-Resume.pdf" download>
            Resume
          </a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
