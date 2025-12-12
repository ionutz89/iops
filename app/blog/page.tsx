"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  TrendingUp,
  Bot,
  ArrowRight,
  Clock,
  Calendar,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ArticleCard {
  id: string;
  title: string;
  excerpt: string;
  icon: LucideIcon;
  category: string;
  readTime: string;
  date: string;
  href: string;
}

const articles: ArticleCard[] = [
  {
    id: "hardcoded-python-scripts",
    title: "Why Hardcoded Python Scripts are Killing Your Ops Scalability",
    excerpt:
      "That quick script you wrote 'just for now' is now running critical infrastructure. Here's why visual workflow tools like n8n are the escape hatch your ops team needs.",
    icon: Code,
    category: "Engineering",
    readTime: "7 min read",
    date: "Dec 2025",
    href: "/blog/hardcoded-python-scripts",
  },
  {
    id: "roi-of-n8n",
    title: "The ROI of n8n: How we cut invoice processing costs by 60%",
    excerpt:
      "A real case study breaking down the before-and-after of automating a manual invoice pipeline. Numbers, timelines, and lessons learned.",
    icon: TrendingUp,
    category: "Case Study",
    readTime: "5 min read",
    date: "Dec 2025",
    href: "/blog/roi-of-n8n",
  },
  {
    id: "rag-vs-finetuning",
    title: "RAG vs. Fine-tuning: Which one does your internal chatbot actually need?",
    excerpt:
      "Stop overthinking your AI strategy. This decision tree will help you pick the right approach based on your data, budget, and use case.",
    icon: Bot,
    category: "AI Strategy",
    readTime: "4 min read",
    date: "Dec 2025",
    href: "/blog/rag-vs-finetuning",
  },
];

function ArticleCardComponent({ article, index }: { article: ArticleCard; index: number }) {
  const IconComponent = article.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={article.href} className="block h-full group">
        <Card className="h-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121417] hover:border-[#00B8D9] dark:hover:border-[#00E5FF]/40 shadow-[0_4px_16px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] transition-all duration-300 overflow-hidden">
          {/* Icon Header */}
          <div className="relative h-48 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] dark:from-[#1A1C20] dark:to-[#0B0C10] flex items-center justify-center overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-30 dark:opacity-20">
              <div className="absolute top-4 left-4 w-32 h-32 rounded-full bg-[#00B8D9]/10 dark:bg-[#00E5FF]/10 blur-2xl" />
              <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-[#7B61FF]/10 dark:bg-[#8B5CF6]/10 blur-2xl" />
            </div>

            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-20 h-20 rounded-2xl bg-white dark:bg-[#121417] border border-gray-200 dark:border-white/10 shadow-lg flex items-center justify-center group-hover:border-[#00B8D9] dark:group-hover:border-[#00E5FF]/40 transition-colors duration-300"
            >
              <IconComponent className="w-10 h-10 text-[#7B61FF] dark:text-[#00E5FF]" />
            </motion.div>

            {/* Category Badge */}
            <Badge className="absolute top-4 left-4 bg-white/90 dark:bg-[#121417]/90 text-[#7B61FF] dark:text-[#00E5FF] border border-gray-200 dark:border-white/10 backdrop-blur-sm font-medium">
              {article.category}
            </Badge>
          </div>

          <CardContent className="p-6">
            {/* Meta info */}
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-white/50 mb-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[#0F0F0F] dark:text-white mb-3 group-hover:text-[#7B61FF] dark:group-hover:text-[#00E5FF] transition-colors duration-300 line-clamp-2">
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed line-clamp-3 mb-4">
              {article.excerpt}
            </p>

            {/* Read more link */}
            <div className="flex items-center text-[#7B61FF] dark:text-[#00E5FF] font-medium text-sm group-hover:gap-2 transition-all duration-300">
              <span>Read article</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] dark:bg-[#0B0C10] transition-colors duration-300">
      <Navigation />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative py-24 md:py-32 px-6 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, #F2F6FF 0%, #FFFFFF 80%)",
        }}
      >
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

        <div className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Badge className="mb-6 bg-[#00B8D9]/10 dark:bg-[#00E5FF]/10 text-[#00B8D9] dark:text-[#00E5FF] border-[#00B8D9]/20 dark:border-[#00E5FF]/20 px-4 py-1.5 text-sm font-medium">
              Knowledge Hub
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F0F0F] dark:text-white mb-6"
          >
            Operational{" "}
            <span className="gradient-text">Intelligence</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 dark:text-white/70 max-w-2xl mx-auto"
          >
            Insights on scaling operations with AI agents and n8n workflows.
            Real strategies, real results.
          </motion.p>
        </div>
      </motion.section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24 bg-[#F7F8FA] dark:bg-[#0B0C10]">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F0F0F] dark:text-white mb-2">
              Latest Articles
            </h2>
            <p className="text-gray-600 dark:text-white/60">
              Deep dives into automation, AI, and operational excellence.
            </p>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <ArticleCardComponent
                key={article.id}
                article={article}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-16 bg-[#F7F8FA] dark:bg-[#0B0C10]"
      >
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-[#7B61FF] to-[#00B8D9] dark:from-[#8B5CF6] dark:to-[#00E5FF] text-white text-center py-16 px-8 rounded-2xl shadow-lg">
            <h3 className="text-3xl font-bold mb-4">
              Ready to automate your operations?
            </h3>
            <p className="mb-6 opacity-90 max-w-xl mx-auto">
              Let&apos;s discuss how AI and automation can transform your business
              workflows. Free assessment, no obligations.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#7B61FF] dark:text-[#8B5CF6] font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition"
            >
              Get Free Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative py-12 md:py-16 bg-[#F4F5F7] dark:bg-[#0B0C10] text-[#1E1E1E] dark:text-gray-300 border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
        {/* Grid pattern background */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-100"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Gradient divider line at top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-500/10 to-violet-500/10 dark:from-[#00E5FF]/50 dark:to-[#8B5CF6]/50" />

        <div className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            {/* Column 1 - IOPS */}
            <div>
              <h4 className="font-semibold mb-2 text-[#1E1E1E] dark:text-gray-300">
                IOPS
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                AI-powered automation systems that cut manual work and keep your
                operations running 24/7.
              </p>
            </div>

            {/* Column 2 - Services */}
            <div>
              <h4 className="font-semibold mb-2 text-[#1E1E1E] dark:text-gray-300">
                Services
              </h4>
              <ul className="space-y-1 text-sm text-[#1E1E1E] dark:text-gray-300">
                <li>AI Automation Systems</li>
                <li>Operations Automation</li>
                <li>Process Optimization</li>
              </ul>
            </div>

            {/* Column 3 - Connect */}
            <div>
              <h4 className="font-semibold mb-2 text-[#1E1E1E] dark:text-gray-300">
                Connect
              </h4>
              <Link
                href="/contact"
                className="text-[#7B61FF] dark:text-[#8B5CF6] hover:text-[#5A47CC] dark:hover:text-[#7B4CF6] text-sm transition-colors duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          <div className="mt-8 md:mt-12 pt-8 border-t border-gray-200 dark:border-white/10 text-center">
            <p className="text-xs text-[#1E1E1E] dark:text-gray-300 opacity-70">
              &copy; {new Date().getFullYear()} IOPS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

