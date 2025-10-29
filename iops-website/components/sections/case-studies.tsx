"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, DollarSign } from "lucide-react";

const caseStudies = [
  {
    industry: "FinTech Platform",
    title: "80% Deployment Time Reduction",
    icon: TrendingUp,
    gradient: "from-blue-500 to-cyan-500",
    challenge:
      "Manual deployments taking 4+ hours with frequent rollbacks and configuration drift across environments.",
    solution:
      "Implemented ArgoCD GitOps with Claude MCP-powered validation, automated rollback strategies, and n8n workflow orchestration for pre-deployment checks.",
    results: [
      { metric: "Deployment Time", before: "4 hours", after: "45 minutes", improvement: "80%" },
      { metric: "Failed Deployments", before: "25%", after: "3%", improvement: "88%" },
      { metric: "MTTR", before: "2.5 hours", after: "20 minutes", improvement: "87%" },
    ],
    testimonial:
      "IOPS transformed our deployment process. We went from dreading releases to deploying multiple times per day with confidence.",
  },
  {
    industry: "SaaS Company",
    title: "10 Incidents/Week → 1/Week",
    icon: TrendingDown,
    gradient: "from-purple-500 to-pink-500",
    challenge:
      "Constant firefighting with 10+ production incidents weekly. Team burnout and customer satisfaction declining.",
    solution:
      "Deployed multi-agent monitoring system with Prometheus, Grafana, and AI-powered anomaly detection. Implemented self-healing workflows for common incidents.",
    results: [
      { metric: "Weekly Incidents", before: "10.2", after: "1.1", improvement: "89%" },
      { metric: "On-Call Pages", before: "45/week", after: "6/week", improvement: "87%" },
      { metric: "Customer Impact", before: "8 hrs/mo", after: "30 min/mo", improvement: "94%" },
    ],
    testimonial:
      "The AI agents handle issues before they become incidents. Our team finally has time for innovation instead of firefighting.",
  },
  {
    industry: "E-Commerce Platform",
    title: "$200K Annual Operations Savings",
    icon: DollarSign,
    gradient: "from-orange-500 to-red-500",
    challenge:
      "Large DevOps team manually managing infrastructure scaling, deployments, and routine maintenance tasks.",
    solution:
      "Integrated Claude MCP for intelligent infrastructure management, predictive scaling with ML, and automated routine operations using n8n workflows.",
    results: [
      { metric: "Ops Team Size", before: "12 engineers", after: "5 engineers", improvement: "58%" },
      { metric: "Infrastructure Costs", before: "$420K/yr", after: "$280K/yr", improvement: "33%" },
      { metric: "Automation Coverage", before: "25%", after: "85%", improvement: "240%" },
    ],
    testimonial:
      "ROI was achieved in 4 months. The automation handles everything from scaling to deployments, and it's more reliable than manual processes.",
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 md:py-32 bg-muted/50 scroll-mt-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Proven Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real transformations from companies that embraced AI-powered operations
          </p>
        </motion.div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${study.gradient}`} />
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-3">
                        {study.industry}
                      </Badge>
                      <CardTitle className="text-2xl md:text-3xl mb-2 flex items-center gap-3">
                        <study.icon className="h-6 w-6 text-primary" />
                        {study.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-red-500">Challenge</h4>
                      <p className="text-sm text-muted-foreground">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-green-500">Solution</h4>
                      <p className="text-sm text-muted-foreground">{study.solution}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Results</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {study.results.map((result, resultIndex) => (
                        <Card key={resultIndex} className="bg-muted/50">
                          <CardContent className="pt-6">
                            <div className="space-y-2">
                              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                                {result.metric}
                              </div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-sm line-through text-muted-foreground">
                                  {result.before}
                                </span>
                                <span className="text-lg font-bold text-primary">
                                  {result.after}
                                </span>
                              </div>
                              <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                                ↓ {result.improvement}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                    &ldquo;{study.testimonial}&rdquo;
                  </blockquote>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
