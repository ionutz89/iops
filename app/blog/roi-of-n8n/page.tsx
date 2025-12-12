"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar, TrendingUp, ArrowRight } from "lucide-react";

export default function ROIOfN8nArticle() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] dark:bg-[#0B0C10] transition-colors duration-300">
      <Navigation />

      {/* Article Header */}
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
        {/* Light mode gradient */}
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

        {/* Dark mode glow */}
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

        <div className="container relative z-10 px-4 md:px-6 max-w-3xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-white/60 hover:text-[#7B61FF] dark:hover:text-[#00E5FF] transition-colors duration-300 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to articles
            </Link>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Badge className="mb-4 bg-[#00B8D9]/10 dark:bg-[#00E5FF]/10 text-[#00B8D9] dark:text-[#00E5FF] border-[#00B8D9]/20 dark:border-[#00E5FF]/20 px-4 py-1.5 text-sm font-medium">
              Case Study
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F0F0F] dark:text-white mb-6 leading-tight"
          >
            The Hidden Cost of &apos;Just Hiring More People&apos;: Why Smart Ops Teams Choose n8n
          </motion.h1>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-6 text-sm text-gray-500 dark:text-white/50"
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              December 2025
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              5 min read
            </span>
          </motion.div>
        </div>
      </motion.section>

      {/* Article Content */}
      <section className="py-16 md:py-20 bg-[#F7F8FA] dark:bg-[#0B0C10]">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            {/* The Trap */}
            <div className="mb-12">
              <p className="text-xl text-gray-700 dark:text-white/80 leading-relaxed mb-6">
                Every growing business hits the same wall. Sales are up. Orders are up. And suddenly, your back office is drowning in spreadsheets, emails, and manual data entry that never seems to end.
              </p>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                The instinct is natural: <strong className="text-[#0F0F0F] dark:text-white">hire another admin</strong>. Maybe two. Add headcount, solve the problem. Except it doesn&apos;t quite work that way.
              </p>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                New hires mean salaries, benefits, and training time. They make mistakes—especially in the first six months. And in a tight labor market, turnover means you&apos;re constantly starting from scratch. The cost of &quot;just hiring more people&quot; is rarely just the salary. It&apos;s the operational overhead that compounds month after month.
              </p>
            </div>

            {/* The Better Way */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F0F0F] dark:text-white mb-6">
                The Virtual Workforce You&apos;re Not Using
              </h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                Here&apos;s what forward-thinking operations teams have figured out: you can build a <strong className="text-[#0F0F0F] dark:text-white">digital employee</strong> that handles repetitive tasks 24/7. No sick days. No training period. No errors from rushing before lunch.
              </p>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                This is where n8n workflow automation comes in. Think of it as the glue between your email, your CRM, your accounting software, and your spreadsheets. It moves information from one place to another—automatically.
              </p>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                Your team stops doing data entry. They start doing strategic work that actually grows the business.
              </p>
            </div>

            {/* Real World ROI */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F0F0F] dark:text-white mb-6">
                The Numbers: Invoice Processing at Scale
              </h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                Let&apos;s make this concrete with a real example: invoice processing.
              </p>

              {/* Before Card */}
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-200 dark:bg-red-800 flex items-center justify-center text-sm">✕</span>
                  The Manual Way
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-white/70">
                  <li>→ Download PDF invoice from email</li>
                  <li>→ Open spreadsheet</li>
                  <li>→ Manually type in vendor, amount, date</li>
                  <li>→ Upload to Xero or QuickBooks</li>
                  <li>→ File the original somewhere</li>
                </ul>
                <p className="mt-4 text-red-700 dark:text-red-400 font-semibold">
                  Time per invoice: ~15 minutes
                </p>
              </div>

              {/* After Card */}
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-200 dark:bg-emerald-800 flex items-center justify-center text-sm">✓</span>
                  The Automated Way
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-white/70">
                  <li>→ Invoice arrives in email</li>
                  <li>→ AI reads the PDF and extracts the data</li>
                  <li>→ Information flows directly into your accounting system</li>
                  <li>→ Team gets notified only if something needs review</li>
                </ul>
                <p className="mt-4 text-emerald-700 dark:text-emerald-400 font-semibold">
                  Time per invoice: 3 seconds
                </p>
              </div>

              {/* Result Highlight */}
              <div className="bg-gradient-to-r from-[#7B61FF]/10 to-[#00B8D9]/10 dark:from-[#8B5CF6]/20 dark:to-[#00E5FF]/20 border border-[#7B61FF]/20 dark:border-[#00E5FF]/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-[#7B61FF] dark:text-[#00E5FF]" />
                  <h3 className="text-lg font-semibold text-[#0F0F0F] dark:text-white">The Result</h3>
                </div>
                <p className="text-gray-700 dark:text-white/80 text-lg">
                  We reduced invoice processing costs by <strong className="text-[#7B61FF] dark:text-[#00E5FF]">60%</strong>. The team stopped doing data entry entirely. That&apos;s not just operational efficiency—it&apos;s scalable operations without scaling payroll.
                </p>
              </div>
            </div>

            {/* Conclusion */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F0F0F] dark:text-white mb-6">
                Stop Hiring for Repetitive Tasks
              </h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                Business process automation isn&apos;t about replacing your team. It&apos;s about freeing them from the work that machines do better: the repetitive, rule-based tasks that eat up hours every week.
              </p>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                Your next hire shouldn&apos;t be someone to copy-paste data between systems. It should be someone who can think, strategize, and grow your business. Let automation handle the rest.
              </p>
            </div>
          </motion.article>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 pt-12 border-t border-gray-200 dark:border-white/10"
          >
            <div className="bg-gradient-to-r from-[#7B61FF] to-[#00B8D9] dark:from-[#8B5CF6] dark:to-[#00E5FF] text-white text-center py-12 px-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-3">
                Ready to reduce your operational overhead?
              </h3>
              <p className="mb-6 opacity-90 max-w-xl mx-auto">
                Let&apos;s map out which processes are eating your team&apos;s time—and how automation can give it back. Free assessment, no obligations.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#7B61FF] dark:text-[#8B5CF6] font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition"
              >
                Get Free Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 md:py-16 bg-[#F4F5F7] dark:bg-[#0B0C10] text-[#1E1E1E] dark:text-gray-300 border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
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
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-500/10 to-violet-500/10 dark:from-[#00E5FF]/50 dark:to-[#8B5CF6]/50" />

        <div className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div>
              <h4 className="font-semibold mb-2 text-[#1E1E1E] dark:text-gray-300">
                IOPS
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                AI-powered automation systems that cut manual work and keep your
                operations running 24/7.
              </p>
            </div>
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

