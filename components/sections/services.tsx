"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Layers, Network, Shield, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const services = [
  {
    icon: Brain,
    title: "AI Workflow Architecture",
    description: "Custom n8n and Dify pipelines tailored to your operations",
    details: [
      "Multi-agent orchestration with Claude MCP",
      "Memory-optimized AI systems",
      "Event-driven automation pipelines",
      "Intelligent decision workflows",
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Layers,
    title: "Intelligent DevOps",
    description: "Next-generation infrastructure automation and management",
    details: [
      "Claude MCP integration for autonomous ops",
      "Kubernetes automation & self-healing",
      "ArgoCD GitOps workflows",
      "Infrastructure as Code with AI insights",
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Network,
    title: "Multi-Agent Systems",
    description: "Deploy autonomous agents that work together seamlessly",
    details: [
      "Autonomous infrastructure management",
      "Self-healing deployment systems",
      "Predictive scaling with ML",
      "Coordinated incident response",
    ],
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Shield,
    title: "SRE Consultancy",
    description: "Transform from reactive firefighting to proactive operations",
    details: [
      "AI-powered observability & insights",
      "Incident prevention systems",
      "Automated remediation workflows",
      "Reliability engineering best practices",
    ],
    gradient: "from-green-500 to-emerald-500",
  },
];

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 md:py-32 relative scroll-mt-24 px-6 md:px-12">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            AI-Powered DevOps Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            End-to-end automation solutions that scale with your infrastructure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card
                className={`h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  hoveredIndex === index ? "glow-effect" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${service.gradient} text-white`}
                    >
                      <service.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.details.map((detail, detailIndex) => (
                      <motion.li
                        key={detailIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: hoveredIndex === index ? 1 : 0.7,
                          x: 0,
                        }}
                        transition={{ delay: detailIndex * 0.05 }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
