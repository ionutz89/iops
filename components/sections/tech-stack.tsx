"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const techStack = {
  "AI & ML": [
    { name: "Claude AI", proficiency: 95 },
    { name: "OpenAI GPT-4", proficiency: 90 },
    { name: "Ollama", proficiency: 85 },
    { name: "LangChain", proficiency: 88 },
  ],
  "Workflow Automation": [
    { name: "n8n", proficiency: 98 },
    { name: "Dify", proficiency: 92 },
    { name: "Temporal", proficiency: 85 },
    { name: "Apache Airflow", proficiency: 80 },
  ],
  "DevOps & Infrastructure": [
    { name: "Kubernetes", proficiency: 95 },
    { name: "Docker", proficiency: 98 },
    { name: "ArgoCD", proficiency: 90 },
    { name: "Terraform", proficiency: 92 },
    { name: "Ansible", proficiency: 88 },
  ],
  "Monitoring & Observability": [
    { name: "Grafana", proficiency: 90 },
    { name: "Prometheus", proficiency: 92 },
    { name: "OpenTelemetry", proficiency: 85 },
    { name: "Loki", proficiency: 82 },
  ],
  "Cloud Platforms": [
    { name: "AWS", proficiency: 92 },
    { name: "Google Cloud", proficiency: 88 },
    { name: "Azure", proficiency: 85 },
    { name: "Cloudflare", proficiency: 90 },
  ],
};

export function TechStack() {
  return (
    <section id="tech-stack" className="py-24 md:py-32 scroll-mt-24 px-6 md:px-12">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our Technology Stack
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Deep expertise across the entire AI and DevOps ecosystem
          </p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(techStack).map(([category, technologies], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <ArrowRight className="text-primary h-6 w-6" />
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {technologies.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{tech.name}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {tech.proficiency}%
                            </Badge>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${tech.proficiency}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
