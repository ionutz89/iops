"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Script from "next/script";
import { Navigation } from "@/components/navigation";

export default function ExperiencePage() {
  const skills = [
    {
      category: "AI Automation",
      tools: [
        { name: "n8n", level: 95 },
        { name: "Dify AI", level: 88 },
        { name: "Flowise", level: 85 },
      ],
    },
    {
      category: "AI Ecosystem & Data Layer",
      tools: [
        { name: "Anthropic", level: 88 },
        { name: "OpenAI", level: 87 },
        { name: "Google", level: 85 },
        { name: "X", level: 82 },
        { name: "Perplexity", level: 80 },
        { name: "MCP", level: 85 },
        { name: "AI Skills", level: 83 },
        { name: "Neo4j", level: 90 },
        { name: "Qdrant", level: 88 },
        { name: "PostgreSQL", level: 86 },
        { name: "Supabase", level: 84 },
        { name: "Redis", level: 82 },
      ],
    },
    {
      category: "Infrastructure & Cloud",
      tools: [
        { name: "Kubernetes", level: 90 },
        { name: "ArgoCD", level: 88 },
        { name: "Terraform", level: 87 },
        { name: "Ansible", level: 85 },
        { name: "AWS", level: 80 },
        { name: "GCP", level: 78 },
        { name: "Cloudflare", level: 82 },
      ],
    },
    {
      category: "Monitoring & Observability",
      tools: [
        { name: "Grafana", level: 90 },
        { name: "Loki", level: 88 },
        { name: "Prometheus", level: 87 },
        { name: "Pyroscope", level: 86 },
        { name: "Tempo", level: 84 },
        { name: "OpenTelemetry", level: 82 },
      ],
    },
    {
      category: "Scripting & CI/CD",
      tools: [
        { name: "Python", level: 88 },
        { name: "Bash", level: 80 },
        { name: "Node.js", level: 85 },
        { name: "GitOps", level: 83 },
      ],
    },
  ];

  const cases = [
    {
      title: "AI Workflow Orchestration",
      desc: "Built dynamic multi-agent automation pipelines using n8n and Redis. Reduced manual workload by 90%.",
      tags: ["AI Automation", "Workflow Design", "n8n"],
    },
    {
      title: "Cloud Cost Optimization",
      desc: "Optimized AWS architecture using Terraform + Cloudflare caching, cutting costs by 35%.",
      tags: ["Cloud", "Cost Optimization", "Terraform"],
    },
    {
      title: "Zero-Downtime Deployment",
      desc: "Delivered 99.99% uptime migrations using ArgoCD and Kubernetes with zero production disruption.",
      tags: ["DevOps", "Kubernetes", "CI/CD"],
    },
    {
      title: "Context-Aware AI Agents",
      desc: "Designed multi-source RAG pipelines with Qdrant and Neo4j to power chatbots and decision-support systems using Claude and GPT-4.",
      tags: ["RAG", "AI Automation", "Neo4j", "Claude", "OpenAI"],
    },
  ];

  // JSON-LD Schemas
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "IOPS",
    alternateName: "Intelligent Operations",
    url: "https://iops.pro",
    logo: "https://iops.pro/og-image.png",
    description:
      "IOPS builds intelligent AI systems that automate, monitor and scale business operations for modern companies.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@iops.pro",
      contactType: "Customer Service",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI Automation Consulting",
    provider: {
      "@type": "Organization",
      name: "IOPS",
      url: "https://iops.pro",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    description:
      "One-time AI automation implementations with optional optimization audits. Delivering measurable business results through AI, DevOps, and automation systems.",
    offers: {
      "@type": "Offer",
      description: "Consulting-first automation delivery",
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="experience-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="experience-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <main className="min-h-screen bg-background dark:bg-[#0B0C10] transition-colors duration-300">
        <Navigation />

        {/* Hero Section with Enhanced Dual-Theme Background */}
        <section className="relative text-center py-16 pt-32 overflow-hidden" style={{ background: "radial-gradient(circle at 50% 30%, #EAF6FF 0%, #F8F9FC 60%)" }}>
          {/* Light mode - Subtle animated gradient overlay */}
          <motion.div
            className="absolute inset-0 dark:hidden opacity-100 pointer-events-none"
            animate={{
              background: [
                "radial-gradient(ellipse 800px 600px at 30% 40%, rgba(0, 184, 217, 0.08) 0%, transparent 60%), radial-gradient(ellipse 600px 800px at 70% 60%, rgba(123, 97, 255, 0.06) 0%, transparent 60%)",
                "radial-gradient(ellipse 600px 800px at 70% 60%, rgba(0, 184, 217, 0.10) 0%, transparent 60%), radial-gradient(ellipse 800px 600px at 30% 40%, rgba(123, 97, 255, 0.08) 0%, transparent 60%)",
                "radial-gradient(ellipse 800px 600px at 30% 40%, rgba(0, 184, 217, 0.08) 0%, transparent 60%), radial-gradient(ellipse 600px 800px at 70% 60%, rgba(123, 97, 255, 0.06) 0%, transparent 60%)",
              ],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Dark mode background */}
          <div className="absolute inset-0 hidden dark:block bg-gradient-to-br from-[#0B0C10] via-[#121417] to-[#0B0C10]" />

          {/* Dark mode - Animated gradient background */}
          <motion.div
            className="absolute inset-0 opacity-0 dark:opacity-100"
            animate={{
              background: [
                "linear-gradient(135deg, #0B0C10 0%, #121417 50%, #1A1C20 100%)",
                "linear-gradient(225deg, #0B0C10 0%, #121417 50%, #1A1C20 100%)",
                "linear-gradient(315deg, #0B0C10 0%, #121417 50%, #1A1C20 100%)",
                "linear-gradient(135deg, #0B0C10 0%, #121417 50%, #1A1C20 100%)",
              ],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Dark mode - Cyan and Purple Glow Overlays */}
          <motion.div
            className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none"
            animate={{
              background: [
                "radial-gradient(ellipse 800px 600px at 20% 30%, rgba(0, 229, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(139, 92, 246, 0.12) 0%, transparent 50%)",
                "radial-gradient(ellipse 600px 800px at 80% 70%, rgba(0, 229, 255, 0.18) 0%, transparent 50%), radial-gradient(ellipse 800px 600px at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
                "radial-gradient(ellipse 800px 600px at 20% 30%, rgba(0, 229, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(139, 92, 246, 0.12) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="container relative z-10 px-6 md:px-16 max-w-6xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
            >
              Automation Experience That{" "}
              <span className="gradient-text">Delivers Results</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-700 dark:text-white/80 mt-3 max-w-3xl mx-auto"
            >
              10+ years designing AI, DevOps, and automation systems connecting models, data, and infrastructure for measurable business results.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 flex justify-center gap-4"
            >
              <Link href="#case-studies" className="px-5 py-3 bg-[#00B8D9] dark:bg-[#00E5FF] text-white dark:text-gray-900 rounded-lg hover:bg-[#00A8C5] dark:hover:bg-[#00CCE5] transition">
                View Case Studies
              </Link>
              <Link href="/contact" className="px-5 py-3 border-2 border-[#7B61FF] dark:border-[#8B5CF6] text-[#7B61FF] dark:text-[#8B5CF6] rounded-lg hover:bg-[#F2EEFF] dark:hover:bg-[#8B5CF6] hover:text-[#7B61FF] dark:hover:text-white transition">
                Book Consultation
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-[#0B0C10] transition-colors duration-300">
          <div className="max-w-5xl mx-auto px-6 md:px-16">
            {skills.map((group, groupIndex) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                className="mb-10"
              >
                <h2 className="text-2xl font-semibold mb-4 text-[#0F0F0F] dark:text-white">
                  {group.category}
                </h2>
                <div className="space-y-3">
                  {group.tools.map((tool, toolIndex) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: toolIndex * 0.05 }}
                    >
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#0F0F0F] dark:text-white">{tool.name}</span>
                        <span className="text-[#333] dark:text-white/70">{tool.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-white/10 rounded-lg h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tool.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: toolIndex * 0.05 }}
                          className="h-full bg-[#00B8D9] dark:bg-[#00E5FF] rounded-lg"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="case-studies" className="py-16 bg-[#F7F8FA] dark:bg-[#121417] transition-colors duration-300">
          <div className="max-w-5xl mx-auto px-6 md:px-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0F0F0F] dark:text-white"
            >
              Case Studies
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cases.map((c, index) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-white/10 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-[#0F0F0F] dark:text-white mb-2">{c.title}</h3>
                  <p className="text-[#333] dark:text-white/70 mb-3">{c.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-[#00B8D9]/10 dark:bg-[#00E5FF]/10 text-[#00B8D9] dark:text-[#00E5FF] px-2 py-1 rounded-md border border-[#00B8D9]/20 dark:border-[#00E5FF]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 relative overflow-hidden bg-gradient-to-br from-blue-50 via-gray-50 to-violet-50 dark:from-[#0B0C10] dark:via-[#121417] dark:to-[#0B0C10] transition-colors duration-300">
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none"
            animate={{
              background: [
                "radial-gradient(ellipse at top, rgba(0, 229, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
                "radial-gradient(ellipse at bottom left, rgba(0, 229, 255, 0.2) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(139, 92, 246, 0.2) 0%, transparent 50%)",
                "radial-gradient(ellipse at top, rgba(0, 229, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="container relative z-10 px-6 md:px-16 max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-[#0F0F0F] dark:text-white"
            >
              Consulting-First Automation Delivery
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[#333] dark:text-white/80 max-w-2xl mx-auto mb-6"
            >
              Projects are delivered as one-time AI automation implementations with optional optimization audits.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/contact" className="px-6 py-3 bg-[#00B8D9] dark:bg-[#00E5FF] text-white dark:text-gray-900 rounded-lg hover:bg-[#00A8C5] dark:hover:bg-[#00CCE5] transition shadow-md hover:shadow-lg">
                Schedule Audit
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
