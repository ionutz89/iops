"use client";

import { motion } from "framer-motion";
import {
  Truck,
  MessageSquareHeart,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CaseStudy {
  id: string;
  icon: typeof Truck;
  iconColor: string;
  iconBg: string;
  industry: string;
  industryBadge: string;
  challenge: string;
  solution: string;
  result: string;
  metric: string;
  metricLabel: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "logistics",
    icon: Truck,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
    industry: "Regional Last-Mile Carrier",
    industryBadge: "Logistics",
    challenge: "Dispatchers spent 20+ hours/week manually routing drivers via Excel.",
    solution: "Automated n8n workflow connected to GPS API.",
    result: "Routing reduced to ~45 mins daily. Drivers receive routes via WhatsApp.",
    metric: "18h/week",
    metricLabel: "Saved Per Head",
  },
  {
    id: "saas-support",
    icon: MessageSquareHeart,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10 dark:bg-violet-500/20",
    industry: "Fintech SaaS Platform",
    industryBadge: "B2B SaaS",
    challenge: "Support team drowning in repetitive 'How-to' tickets.",
    solution: "RAG Chatbot trained on technical documentation.",
    result: "Tier 1 tickets handled instantly. Agents only touch complex issues.",
    metric: "68%",
    metricLabel: "Auto-Resolution",
  },
];

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative h-full bg-white dark:bg-[#121417] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:border-[#00E5FF]/20 transition-all duration-300">
        {/* Top accent line */}
        <div className="h-1 bg-gradient-to-r from-[#00B8D9] to-[#7B61FF] dark:from-[#00E5FF] dark:to-[#8B5CF6]" />

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl ${study.iconBg} flex items-center justify-center`}>
                <study.icon className={`w-6 h-6 ${study.iconColor}`} />
              </div>
              <div className="space-y-1">
                <Badge
                  variant="secondary"
                  className="text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 border-0"
                >
                  {study.industryBadge}
                </Badge>
                <h3 className="font-bold text-lg text-[#111827] dark:text-white">
                  {study.industry}
                </h3>
              </div>
            </div>
            {/* Metric Badge */}
            <div className="flex-shrink-0 text-right">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-lg">
                <TrendingUp className="w-4 h-4" />
                <span className="font-bold text-lg">{study.metric}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {study.metricLabel}
              </p>
            </div>
          </div>

          {/* Problem → Solution → Result Flow */}
          <div className="space-y-4">
            {/* Challenge */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/10 dark:bg-red-500/20 flex items-center justify-center mt-0.5">
                <span className="text-red-500 text-xs font-bold">!</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-red-500 dark:text-red-400 font-semibold mb-1">
                  Problem
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {study.challenge}
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-px h-4 bg-gray-200 dark:bg-white/10" />
            </div>

            {/* Solution */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00B8D9]/10 dark:bg-[#00E5FF]/20 flex items-center justify-center mt-0.5">
                <span className="text-[#00B8D9] dark:text-[#00E5FF] text-xs font-bold">→</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#00B8D9] dark:text-[#00E5FF] font-semibold mb-1">
                  Solution
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {study.solution}
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-px h-4 bg-gray-200 dark:bg-white/10" />
            </div>

            {/* Result - Green with up arrow */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center mt-0.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-emerald-500 dark:text-emerald-400 font-semibold mb-1">
                  Result
                </p>
                <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                  {study.result}
                </p>
              </div>
            </div>
          </div>

          {/* Read full story link */}
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00B8D9] dark:text-[#00E5FF] hover:text-[#0090A8] dark:hover:text-[#00CCE5] transition-colors group/link"
            >
              Get similar results
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="py-16 md:py-24 bg-[#F9FAFB] dark:bg-[#0B0C10] transition-colors duration-300 scroll-mt-24"
    >
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#00B8D9]/10 dark:bg-[#00E5FF]/20 px-4 py-1.5 rounded-full mb-4">
            <Clock className="w-4 h-4 text-[#00B8D9] dark:text-[#00E5FF]" />
            <span className="text-sm font-medium text-[#00B8D9] dark:text-[#00E5FF]">
              Real Results
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] dark:text-white mb-4">
            Case Studies
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See how businesses like yours transformed their operations with AI automation
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Want results like these for your business?
          </p>
          <Button
            size="lg"
            asChild
            className="rounded-2xl bg-[#00B8D9] hover:bg-[#00A8C5] dark:bg-[#00E5FF] dark:hover:bg-[#00CCE5] text-white dark:text-gray-900 px-8 py-6 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Link href="/contact" className="flex items-center gap-2">
              Get Your Free Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
