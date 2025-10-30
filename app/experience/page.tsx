"use client";

// Force dynamic rendering to avoid prerendering issues
export const dynamic = "force-dynamic";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Progress } from "@/components/ui/progress";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "AI & Automation Tools",
    skills: [
      { name: "Claude MCP", level: 95 },
      { name: "n8n", level: 90 },
      { name: "Dify", level: 85 },
      { name: "LangChain", level: 88 },
    ],
  },
  {
    title: "DevOps & Cloud",
    skills: [
      { name: "Kubernetes", level: 92 },
      { name: "Docker", level: 95 },
      { name: "ArgoCD", level: 88 },
      { name: "Terraform", level: 90 },
      { name: "AWS", level: 93 },
      { name: "GCP", level: 87 },
      { name: "Cloudflare", level: 89 },
    ],
  },
  {
    title: "Monitoring & Observability",
    skills: [
      { name: "Grafana", level: 91 },
      { name: "Prometheus", level: 90 },
      { name: "OpenTelemetry", level: 85 },
      { name: "Loki", level: 88 },
    ],
  },
  {
    title: "Programming & Infrastructure",
    skills: [
      { name: "Python", level: 93 },
      { name: "TypeScript", level: 90 },
      { name: "Node.js", level: 88 },
      { name: "Bash", level: 92 },
      { name: "GitOps", level: 89 },
    ],
  },
];

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setProgress(skill.level);
          }, delay * 100);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [skill.level, delay]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}

export default function Experience() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-background to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-center mb-6 text-foreground"
          >
            Our <span className="gradient-text">Experience</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Our Expertise in Intelligent Operations
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center text-base text-muted-foreground max-w-2xl mx-auto mt-2"
          >
            Over 10 years of experience automating systems across AI, cloud, and DevOps platforms.
          </motion.p>
        </div>
      </section>

      {/* Skills Categories */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="space-y-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    {category.title}
                  </h2>
                </div>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      delay={skillIndex * 0.05}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Stats */}
      <section className="py-16 bg-muted">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-lg text-muted-foreground">
              <span className="font-bold text-foreground">10+ Years Experience</span> •{" "}
              <span className="font-bold text-foreground">100+ Automations Delivered</span> •{" "}
              <span className="font-bold text-foreground">Privacy-First Design</span>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

