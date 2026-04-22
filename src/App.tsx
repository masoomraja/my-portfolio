import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import ContactScene from "./ContactScene";
import ParticleBackdrop from "./ParticleBackdrop";
import SkillsPlayground from "./SkillsPlayground";
import ThreeScene from "./ThreeScene";
import "./App.css";

const focusAreas = [
  "Java Development",
  "Backend Problem Solving",
  "OOP and DSA",
  "AI / ML Foundations",
];

const education = [
  {
    title: "Master of Computer Applications (MCA)",
    detail: "Dayananda Sagar College of Engineering, Bengaluru / VTU",
    meta: "2024 - 2026 / Pursuing",
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    detail: "IMS Noida, CCSU",
    meta: "65.5%",
  },
  {
    title: "12th Standard",
    detail: "Academic record",
    meta: "72.5%",
  },
  {
    title: "10th Standard",
    detail: "Academic record",
    meta: "72.2%",
  },
];

const skillGroups = [
  {
    title: "Programming",
    items: "Java (Strong), C, C++, Python",
  },
  {
    title: "Web Technologies",
    items: "HTML, JavaScript",
  },
  {
    title: "Tools and Platforms",
    items: "JDBC, MySQL, Git, Basic DevOps knowledge",
  },
  {
    title: "Computer Science",
    items: "OOP, Data Structures, Algorithms",
  },
  {
    title: "AI and Emerging Tech",
    items: "AI/ML basics, NLP, GenAI",
  },
  {
    title: "Career Direction",
    items: "Java Developer, Backend Developer, Software Developer",
  },
];

const projects = [
  {
    title: "Bank Management System",
    description:
      "A Java-based application for account handling, authentication, balance checks, deposits, withdrawals, and core banking operations.",
  },
  {
    title: "Hotel Management System",
    description:
      "Software to manage bookings, customer records, room availability, billing workflows, and staff details in one place.",
  },
  {
    title: "Electricity Billing System",
    description:
      "An automated billing solution that calculates monthly power usage, generates bills, and stores customer information.",
  },
  {
    title: "Chatting Application",
    description:
      "A client-server Java project using networking concepts to enable real-time message transfer between users.",
  },
];

const certifications = [
  "Web Development",
  "JavaScript",
  "AI / ML",
  "NLP",
  "GenAI",
  "DevOps Basics",
];

const strengths = [
  "Strong Java programming",
  "Problem-solving mindset",
  "Good understanding of OOP and DSA",
  "Fast learner and adaptable",
  "Clear communication",
  "Teamwork and collaboration",
];

const socialLinks = [
  {
    label: "GitHub Repo",
    href: "https://github.com/masoomraja/my-portfolio",
    helper: "Portfolio source code",
  },
  {
    label: "Docker Setup",
    href: "https://github.com/masoomraja/my-portfolio/tree/codex/dockerize-my-portfolio",
    helper: "Dockerized deployment branch",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-masoom-raja-3b83a9342",
    helper: "Professional profile",
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
          {wordIndex < words.length - 1 ? (
            <span className="interactive-space"> </span>
          ) : null}
        </span>
      ))}
    </Component>
  );
}

function App() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [scrollProgress, setScrollProgress] = useState(0);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadFrameId = window.requestAnimationFrame(() => {
      setPageLoaded(true);
    });

    const sections = document.querySelectorAll<HTMLElement>("[data-scroll-section]");
    const visibleRatios = new Map<string, number>();
    let scrollFrameId = 0;

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
        threshold: [0.16, 0.32, 0.48, 0.64],
        rootMargin: "-10% 0px -18% 0px",
      }
    );

    sections.forEach((section, index) => {
      section.style.setProperty(
        "--reveal-delay",
        `${Math.min(index * 80, 240)}ms`
      );
      observer.observe(section);
    });

    updateScrollProgress();
    window.addEventListener("scroll", queueScrollProgress, { passive: true });
    window.addEventListener("resize", queueScrollProgress);

    return () => {
      window.cancelAnimationFrame(loadFrameId);
      window.cancelAnimationFrame(scrollFrameId);
      window.removeEventListener("scroll", queueScrollProgress);
      window.removeEventListener("resize", queueScrollProgress);
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
      className={`page ${pageLoaded ? "page-loaded" : ""}`}
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
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <header className="hero section-shell" id="top">
        <div className="hero-copy">
          <InteractiveText
            as="p"
            className="eyebrow"
            text="MCA Student / Java Developer / Software Development"
            tone="label"
          />
          <InteractiveText
            as="h1"
            text="Building reliable Java applications with a backend-focused mindset."
            tone="heading"
          />
          <InteractiveText
            as="p"
            className="hero-summary"
            text="Motivated MCA student with strong Java development skills and hands-on experience building software applications. I am looking for opportunities where I can contribute with clean logic, problem-solving, and a strong learning attitude."
          />

          <div className="hero-meta">
            <span>Bengaluru, India</span>
            <span>Open to Java and backend roles</span>
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
          <ThreeScene />
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
                text="About"
                tone="label"
              />
              <InteractiveText
                as="h2"
                text="Career objective and professional direction"
                tone="heading"
              />
            </div>
            <InteractiveText
              as="p"
              className="section-intro"
              text="I enjoy solving programming problems, understanding software logic, and building practical Java-based systems that can grow into real-world applications."
            />
          </div>

          <div className="feature-panel">
            <div className="feature-copy">
              <InteractiveText
                as="h3"
                text="What I am aiming for"
                tone="heading"
              />
              <InteractiveText
                as="p"
                text="I am seeking a Java Developer or Backend Developer role where I can use my programming knowledge, project experience, and problem-solving ability to contribute to meaningful software products."
              />
            </div>
            <div className="feature-stats">
              <div className="stat-card">
                <InteractiveText
                  as="strong"
                  text="Primary stack"
                  tone="heading"
                />
                <span>Java, JDBC, MySQL</span>
              </div>
              <div className="stat-card">
                <InteractiveText
                  as="strong"
                  text="Core strengths"
                  tone="heading"
                />
                <span>OOP, DSA, communication, adaptability</span>
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
              text="My academic background combines current postgraduate study with a practical software-development focus."
            />
          </div>

          <div className="card-grid">
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
          className={getSectionClassName("skills")}
          data-scroll-section="skills"
          id="skills"
        >
          <div className="section-header">
            <div>
              <InteractiveText
                as="p"
                className="section-label"
                text="Skills"
                tone="label"
              />
              <InteractiveText
                as="h2"
                text="Technical strengths"
                tone="heading"
              />
            </div>
            <InteractiveText
              as="p"
              className="section-intro"
              text="I am strongest in Java and always working to deepen my backend and software-engineering knowledge."
            />
          </div>

          <SkillsPlayground />

          <div className="skills-support-grid">
            {skillGroups.map((item) => (
              <article className="card skill-support-card" key={item.title}>
                <InteractiveText as="h3" text={item.title} tone="heading" />
                <InteractiveText as="p" text={item.items} />
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
                text="Projects"
                tone="label"
              />
              <InteractiveText
                as="h2"
                text="Java-based project work"
                tone="heading"
              />
            </div>
            <InteractiveText
              as="p"
              className="section-intro"
              text="These projects helped me practice application flow, business logic, and user-focused software features."
            />
          </div>

          <div className="card-grid">
            {projects.map((project, index) => (
              <article className="card project-card" key={project.title}>
                <p className="project-index">0{index + 1}</p>
                <InteractiveText as="h3" text={project.title} tone="heading" />
                <InteractiveText as="p" text={project.description} />
              </article>
            ))}
          </div>
        </section>

        <section
          className={getSectionClassName("learning")}
          data-scroll-section="learning"
        >
          <div className="split-grid">
            <article className="card tall-card">
              <InteractiveText
                as="p"
                className="section-label"
                text="Courses"
                tone="label"
              />
              <InteractiveText
                as="h2"
                text="Certifications and learning"
                tone="heading"
              />
              <div className="list-grid">
                {certifications.map((item) => (
                  <span className="mini-pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>

            <article className="card tall-card">
              <InteractiveText
                as="p"
                className="section-label"
                text="Strengths"
                tone="label"
              />
              <InteractiveText
                as="h2"
                text="How I work"
                tone="heading"
              />
              <ul className="clean-list">
                {strengths.map((item) => (
                  <li key={item}>
                    <InteractiveText as="span" text={item} />
                  </li>
                ))}
              </ul>
            </article>
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
                text="I am interested in Java Developer, Backend Developer, Software Developer, and API / Spring Boot opportunities."
              />
            </div>

            <div className="contact-visual">
              <ContactScene />
            </div>

            <div className="contact-details">
              <a href="mailto:masoomraja9123@gmail.com">
                masoomraja9123@gmail.com
              </a>
              <a href="tel:+919123193908">+91 9123193908</a>
              <a
                href="https://www.linkedin.com/in/md-masoom-raja-3b83a9342"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/md-masoom-raja-3b83a9342
              </a>
              <a
                href="https://github.com/masoomraja/my-portfolio"
                target="_blank"
                rel="noreferrer"
              >
                github.com/masoomraja/my-portfolio
              </a>
              <a
                href="https://github.com/masoomraja/my-portfolio/tree/codex/dockerize-my-portfolio"
                target="_blank"
                rel="noreferrer"
              >
                Docker branch: codex/dockerize-my-portfolio
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
    </div>
  );
}

export default App;
