"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  TrendingUp,
  Bot,
  ArrowRight,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface InsightCard {
  id: string;
  title: string;
  excerpt: string;
  icon: LucideIcon;
  category: string;
  readTime: string;
  href: string;
}

const insights: InsightCard[] = [
  {
    id: "hardcoded-python-scripts",
    title: "Why Hardcoded Python Scripts are Killing Your Ops Scalability",
    excerpt:
      "That quick script you wrote 'just for now' is now running critical infrastructure. Here's why visual workflow tools are the escape hatch.",
    icon: Code,
    category: "Engineering",
    readTime: "7 min",
    href: "/contact",
  },
  {
    id: "roi-of-n8n",
    title: "The ROI of n8n: How we cut invoice processing costs by 60%",
    excerpt:
      "A real case study breaking down the before-and-after of automating a manual invoice pipeline.",
    icon: TrendingUp,
    category: "Case Study",
    readTime: "5 min",
    href: "/contact",
  },
  {
    id: "rag-vs-finetuning",
    title: "RAG vs. Fine-tuning: Which one does your internal chatbot need?",
    excerpt:
      "Stop overthinking your AI strategy. This decision tree will help you pick the right approach.",
    icon: Bot,
    category: "AI Strategy",
    readTime: "8 min",
    href: "/contact",
  },
];

function InsightCardComponent({
  insight,
  index,
}: {
  insight: InsightCard;
  index: number;
}) {
  const IconComponent = insight.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={insight.href} className="block h-full group">
        <Card className="h-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121417] hover:border-[#00B8D9] dark:hover:border-[#00E5FF]/40 shadow-[0_4px_16px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] transition-all duration-300">
          <CardContent className="p-6">
            {/* Header with Icon and Category */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] dark:from-[#1A1C20] dark:to-[#0B0C10] border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:border-[#00B8D9] dark:group-hover:border-[#00E5FF]/40 transition-colors duration-300">
                <IconComponent className="w-6 h-6 text-[#7B61FF] dark:text-[#00E5FF]" />
              </div>
              <Badge className="bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 border-0 text-xs font-medium">
                {insight.category}
              </Badge>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-[#0F0F0F] dark:text-white mb-2 group-hover:text-[#7B61FF] dark:group-hover:text-[#00E5FF] transition-colors duration-300 line-clamp-2 leading-tight">
              {insight.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed line-clamp-2 mb-4">
              {insight.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/40">
                <Clock className="w-3.5 h-3.5" />
                {insight.readTime}
              </span>
              <span className="flex items-center text-[#7B61FF] dark:text-[#00E5FF] font-medium text-sm group-hover:gap-2 transition-all duration-300">
                Read
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export function LatestInsights() {
  return (
    <section className="py-16 md:py-24 bg-[#F9FAFB] dark:bg-[#121417] transition-colors duration-300">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-[#7B61FF]/10 dark:bg-[#8B5CF6]/10 text-[#7B61FF] dark:text-[#8B5CF6] border-[#7B61FF]/20 dark:border-[#8B5CF6]/20 px-4 py-1.5 text-sm font-medium">
            Knowledge Hub
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] dark:text-white mb-4">
            Latest Insights
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
            Practical guides on AI automation, workflow optimization, and
            scaling operations efficiently.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {insights.map((insight, index) => (
            <InsightCardComponent
              key={insight.id}
              insight={insight}
              index={index}
            />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-2xl border-2 border-[#7B61FF] dark:border-[#8B5CF6] text-[#7B61FF] dark:text-[#8B5CF6] hover:bg-[#F2EEFF] dark:hover:bg-[#8B5CF6]/10 px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105"
          >
            <Link href="/blog" className="flex items-center gap-2">
              Read all articles
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

