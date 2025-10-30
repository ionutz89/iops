"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, Brain, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";

const services = [
  {
    icon: Layers,
    title: "DevOps Automation",
    description: "Cut deployment time from hours to minutes",
    details: [
      "Automated CI/CD pipelines",
      "Infrastructure as Code",
      "Self-healing deployments",
      "Zero-downtime updates",
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "AI Agents for Operations",
    description: "Prevent incidents before they happen",
    details: [
      "Predictive monitoring",
      "Automated incident response",
      "Intelligent scaling decisions",
      "Proactive health checks",
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "SRE Consulting",
    description: "Gain observability and predictive insights",
    details: [
      "Comprehensive monitoring setup",
      "Performance optimization",
      "Reliability engineering",
      "SLI/SLO definitions",
    ],
    gradient: "from-green-500 to-emerald-500",
  },
];

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      className="py-24 md:py-32 relative scroll-mt-24 px-6 md:px-12"
    >
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            DevOps Automation, AI Agents, SRE Consulting
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
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
                className={`h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
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
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 mb-6 flex-1">
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
                        <CheckCircle2 className="text-[#007AFF] mt-0.5 h-4 w-4 shrink-0" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      scrollToContact();
                    }}
                  >
                    Book Free Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
