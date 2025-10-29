"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Pencil, Code, GraduationCap, TrendingUp } from "lucide-react";

const timeline = [
  {
    week: "Week 1",
    phase: "Assessment",
    icon: Search,
    description: "Deep dive into your current operations and infrastructure",
    deliverables: [
      "Infrastructure audit report",
      "Automation opportunity analysis",
      "Current bottleneck identification",
      "AI readiness assessment",
    ],
  },
  {
    week: "Week 2",
    phase: "Architecture Design",
    icon: Pencil,
    description: "Design custom AI-powered automation architecture",
    deliverables: [
      "System architecture diagram",
      "Technology stack selection",
      "Workflow automation blueprints",
      "Integration plan with existing tools",
    ],
  },
  {
    week: "Weeks 3-4",
    phase: "Implementation",
    icon: Code,
    description: "Build and deploy your AI agent infrastructure",
    deliverables: [
      "AI workflow implementation",
      "Claude MCP integration",
      "Kubernetes automation setup",
      "Monitoring & observability",
    ],
  },
  {
    week: "Week 5",
    phase: "Knowledge Transfer",
    icon: GraduationCap,
    description: "Empower your team to manage and extend the system",
    deliverables: [
      "Team training sessions",
      "Documentation & runbooks",
      "Best practices guide",
      "Maintenance procedures",
    ],
  },
  {
    week: "Ongoing",
    phase: "Optimization",
    icon: TrendingUp,
    description: "Continuous improvement and scaling support",
    deliverables: [
      "Performance monitoring",
      "Regular optimization reviews",
      "New automation opportunities",
      "On-demand support",
    ],
  },
];

export function ProcessTimeline() {
  return (
    <section id="process" className="py-24 md:py-32 scroll-mt-24 px-6 md:px-12">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our Implementation Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From assessment to optimization in 5 weeks
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            {/* Timeline Items */}
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex gap-8">
                    {/* Icon */}
                    <div className="hidden md:flex items-start">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                        <item.icon className="h-8 w-8" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                              <Badge className="mb-2">{item.week}</Badge>
                              <h3 className="text-2xl font-bold flex items-center gap-2">
                                <item.icon className="h-6 w-6 md:hidden" />
                                {item.phase}
                              </h3>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            {item.description}
                          </p>
                          <div>
                            <h4 className="font-semibold mb-2 text-sm">Deliverables:</h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {item.deliverables.map((deliverable, deliverableIndex) => (
                                <motion.li
                                  key={deliverableIndex}
                                  initial={{ opacity: 0 }}
                                  whileInView={{ opacity: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: deliverableIndex * 0.05 }}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <span className="text-primary mt-0.5">✓</span>
                                  <span>{deliverable}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
