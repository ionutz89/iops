"use client";

import { useState } from "react";

// Force dynamic rendering to avoid prerendering issues with event handlers
export const dynamic = "force-dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  industry: string;
  problem: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  testimonial: {
    text: string;
    author: string;
    role: string;
    photo: string;
  };
  category: "all" | "ai-agents" | "devops" | "monitoring";
}

const projects: Project[] = [
  {
    id: "1",
    title: "FinTech Platform",
    industry: "Financial Services",
    problem:
      "Manual deployment processes caused delays and errors in production releases.",
    outcome:
      "Implemented automated CI/CD pipelines with AI-powered testing and deployment.",
    metrics: [
      { label: "Faster Deployments", value: "80%" },
      { label: "Error Reduction", value: "95%" },
    ],
    testimonial: {
      text: "IOPS transformed our deployment process. What used to take hours now happens automatically.",
      author: "Sarah Chen",
      role: "CTO",
      photo: "SC",
    },
    category: "devops",
  },
  {
    id: "2",
    title: "SaaS Company",
    industry: "Software as a Service",
    problem: "Frequent system incidents required constant manual intervention.",
    outcome: "Built AI-powered monitoring and auto-remediation systems.",
    metrics: [
      { label: "Fewer Incidents", value: "89%" },
      { label: "Uptime Improvement", value: "99.9%" },
    ],
    testimonial: {
      text: "Our systems now run themselves. We've eliminated 90% of manual operations work.",
      author: "Michael Rodriguez",
      role: "Operations Director",
      photo: "MR",
    },
    category: "monitoring",
  },
  {
    id: "3",
    title: "E-Commerce Platform",
    industry: "Retail",
    problem: "Scaling operations required expensive manual processes.",
    outcome:
      "Created intelligent automation systems for inventory and order management.",
    metrics: [
      { label: "Annual Savings", value: "$200K" },
      { label: "Process Automation", value: "75%" },
    ],
    testimonial: {
      text: "The automation systems IOPS built save us over $200K annually and scale effortlessly.",
      author: "Emma Thompson",
      role: "VP of Operations",
      photo: "ET",
    },
    category: "ai-agents",
  },
  {
    id: "4",
    title: "Healthcare Provider",
    industry: "Healthcare",
    problem: "Patient data processing was slow and error-prone.",
    outcome: "Automated data workflows with AI validation and processing.",
    metrics: [
      { label: "Processing Speed", value: "5x" },
      { label: "Accuracy", value: "99.8%" },
    ],
    testimonial: {
      text: "IOPS's automation solutions improved our data processing accuracy dramatically.",
      author: "Dr. James Wilson",
      role: "Chief Medical Officer",
      photo: "JW",
    },
    category: "ai-agents",
  },
];

const categories = [
  { id: "all", label: "All" },
  { id: "ai-agents", label: "AI Agents" },
  { id: "devops", label: "DevOps" },
  { id: "monitoring", label: "Monitoring" },
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

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
            Our <span className="gradient-text">Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Transformations Delivered by IOPS
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center text-base text-muted-foreground max-w-2xl mx-auto mt-2"
          >
            Real examples of how intelligent operations improved efficiency and
            reliability.
          </motion.p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-background border-b">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "rounded-2xl",
                  selectedCategory === category.id &&
                    "bg-[#007AFF] text-white hover:bg-[#0056CC]"
                )}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="rounded-2xl border border-border shadow-sm hover:shadow-md transition-all bg-background h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground">
                        {project.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {project.industry}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-muted-foreground mb-4">
                        {project.outcome}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {project.metrics.map((metric) => (
                          <div key={metric.label} className="text-center">
                            <div className="text-2xl font-bold text-[#007AFF]">
                              {metric.value}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-auto pt-4 border-t">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#007AFF] to-[#6366F1] flex items-center justify-center text-white text-sm font-bold">
                            {project.testimonial.photo}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground italic">
                              "{project.testimonial.text}"
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {project.testimonial.author},{" "}
                              {project.testimonial.role}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => setSelectedProject(project)}
                          className="w-full rounded-2xl bg-[#007AFF] text-white hover:bg-[#0056CC]"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">
                  {selectedProject.title}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">
                    The Challenge
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedProject.problem}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">
                    The Solution
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedProject.outcome}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-foreground">
                    Results
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedProject.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="text-center p-4 bg-muted rounded-xl"
                      >
                        <div className="text-3xl font-bold text-[#007AFF] mb-1">
                          {metric.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#007AFF] to-[#6366F1] flex items-center justify-center text-white font-bold">
                      {selectedProject.testimonial.photo}
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground italic mb-2">
                        "{selectedProject.testimonial.text}"
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {selectedProject.testimonial.author}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedProject.testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
