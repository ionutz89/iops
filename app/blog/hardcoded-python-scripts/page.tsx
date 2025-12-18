"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar, Code, AlertTriangle, Eye, ArrowRight } from "lucide-react";

export default function HardcodedPythonScriptsArticle() {
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
        <div className="absolute inset-0 hidden dark:block bg-gradient-to-br from-[#0B0C10] via-[#121417] to-[#0B0C10] pointer-events-none" />

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
              Engineering
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F0F0F] dark:text-white mb-4 leading-tight"
          >
            Why Hardcoded Python Scripts are Killing Your Ops Scalability
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-xl text-gray-600 dark:text-white/60 mb-6"
          >
            The &quot;Black Box&quot; Problem in Operations
          </motion.p>

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
              7 min read
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
            {/* The Scenario */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F0F0F] dark:text-white mb-6 flex items-center gap-3">
                <AlertTriangle className="w-7 h-7 text-amber-500" />
                The Script That Ran Everything—Until It Didn&apos;t
              </h2>
              <p className="text-xl text-gray-700 dark:text-white/80 leading-relaxed mb-6">
                Eighteen months ago, you hired a contractor to automate your weekly sales report. It pulled data from your CRM, cleaned it up, and emailed it to leadership every Monday at 7 AM. It was perfect.
              </p>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                Then yesterday, the report didn&apos;t arrive. Your CRM provider updated something on their end. The script broke. And the developer who wrote it? <strong className="text-[#0F0F0F] dark:text-white">They left the company six months ago.</strong>
              </p>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                Now you&apos;re staring at a file full of code that looks like a foreign language. No documentation. No comments explaining what it does. Just hundreds of lines that somehow powered a critical part of your operations—and now they&apos;re a <strong className="text-[#0F0F0F] dark:text-white">&quot;black box&quot;</strong> that nobody can open.
              </p>
            </div>

            {/* The Hidden Cost */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F0F0F] dark:text-white mb-6 flex items-center gap-3">
                <Code className="w-7 h-7 text-[#7B61FF] dark:text-[#00E5FF]" />
                The Hidden Cost of &quot;It Works&quot;
              </h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                This scenario isn&apos;t rare—it&apos;s the norm. Across industries, businesses are running on what we call <strong className="text-[#0F0F0F] dark:text-white">&quot;ghost scripts&quot;</strong>: automations written by someone who&apos;s long gone, doing something critical that nobody fully understands.
              </p>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                The problem isn&apos;t that the code is bad. It&apos;s that <strong className="text-[#0F0F0F] dark:text-white">&quot;hardcoded&quot; means rigid</strong>. Every business rule, every API connection, every data transformation is buried inside the script. If your process changes—new vendor, new software, new report format—the code has to be rewritten from scratch.
              </p>

              {/* Problem Card */}
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-4">
                  This creates two business risks:
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-white/70">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-red-200 dark:bg-red-800 flex items-center justify-center text-xs font-bold text-red-700 dark:text-red-300">1</span>
                    <span><strong className="text-red-700 dark:text-red-400">Key Person Dependency.</strong> Only the original author truly understands the logic. When they leave, the knowledge walks out the door with them.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-red-200 dark:bg-red-800 flex items-center justify-center text-xs font-bold text-red-700 dark:text-red-300">2</span>
                    <span><strong className="text-red-700 dark:text-red-400">Business Continuity Risk.</strong> When the script fails, operations stop. You&apos;re suddenly scrambling to find (and pay) someone to decipher code written months or years ago.</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                In other words: that &quot;free&quot; automation your contractor built? It&apos;s now a liability sitting in the heart of your operations, quietly accumulating what engineers call <strong className="text-[#0F0F0F] dark:text-white">technical debt</strong>—and you&apos;ll pay that debt with interest when something breaks.
              </p>
            </div>

            {/* The Solution */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F0F0F] dark:text-white mb-6 flex items-center gap-3">
                <Eye className="w-7 h-7 text-emerald-500 dark:text-emerald-400" />
                The Solution: Visual Workflow Automation
              </h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                There&apos;s a better way to automate operations—one that doesn&apos;t require a computer science degree to maintain.
              </p>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                Tools like <strong className="text-[#0F0F0F] dark:text-white">n8n</strong> and other visual workflow platforms take the logic that would normally be buried in code and turn it into something anyone can read: a flowchart. Each step in your process becomes a visible block. Data flows from one block to the next. And when something fails, you can see <em>exactly</em> where it stopped.
              </p>

              {/* Solution Card */}
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-200 dark:bg-emerald-800 flex items-center justify-center text-sm">✓</span>
                  Why This Changes Everything
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-white/70">
                  <li>→ <strong className="text-emerald-700 dark:text-emerald-400">It&apos;s visual.</strong> A non-technical operations manager can look at the screen and understand the entire process.</li>
                  <li>→ <strong className="text-emerald-700 dark:text-emerald-400">It&apos;s transparent.</strong> When something breaks, you see a red block where the flow stopped—not a cryptic error message.</li>
                  <li>→ <strong className="text-emerald-700 dark:text-emerald-400">It&apos;s maintainable.</strong> Changing a step means dragging and dropping, not rewriting code.</li>
                </ul>
              </div>

              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                Think of it as turning &quot;code&quot; into &quot;process maps.&quot; Instead of a black box that only one person could understand, you get a living document of how your operations actually work—one that anyone on your team can read, update, and troubleshoot.
              </p>
            </div>

            {/* Comparison */}
            <div className="mb-12">
              <div className="bg-gradient-to-r from-[#7B61FF]/10 to-[#00B8D9]/10 dark:from-[#8B5CF6]/20 dark:to-[#00E5FF]/20 border border-[#7B61FF]/20 dark:border-[#00E5FF]/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#0F0F0F] dark:text-white mb-4">n8n vs Python Scripts: The Bottom Line</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/50 dark:bg-white/5 rounded-lg p-4">
                    <p className="font-medium text-red-600 dark:text-red-400 mb-2">Python Scripts</p>
                    <ul className="text-sm text-gray-600 dark:text-white/60 space-y-1">
                      <li>• Requires developer to modify</li>
                      <li>• Knowledge leaves with the author</li>
                      <li>• Failures are cryptic</li>
                      <li>• Changes require code rewrites</li>
                    </ul>
                  </div>
                  <div className="bg-white/50 dark:bg-white/5 rounded-lg p-4">
                    <p className="font-medium text-emerald-600 dark:text-emerald-400 mb-2">Visual Workflows (n8n)</p>
                    <ul className="text-sm text-gray-600 dark:text-white/60 space-y-1">
                      <li>• Ops team can make changes</li>
                      <li>• Logic is self-documenting</li>
                      <li>• Failures show exactly where</li>
                      <li>• Changes are drag-and-drop</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F0F0F] dark:text-white mb-6">
                Code Builds Products. Visibility Runs Operations.
              </h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                Custom Python scripts have their place—they&apos;re powerful tools for building software products. But for automating operations, you need something different. You need <strong className="text-[#0F0F0F] dark:text-white">visibility</strong>. You need processes that don&apos;t depend on a single person&apos;s memory. You need systems that your whole team can understand, maintain, and improve.
              </p>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                Reducing technical debt isn&apos;t just about cleaner code—it&apos;s about reducing business risk. Every ghost script in your operations is a ticking clock. The question isn&apos;t <em>if</em> it will break, but <em>when</em>.
              </p>
              <p className="text-xl text-gray-700 dark:text-white/80 leading-relaxed font-medium">
                Switch to visual workflow tools. De-risk your operations. And make sure the next time something breaks, anyone on your team can see exactly what went wrong—and fix it.
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
                Running on ghost scripts?
              </h3>
              <p className="mb-6 opacity-90 max-w-xl mx-auto">
                Let&apos;s audit your operations and identify which automations are putting your business at risk. Free assessment—we&apos;ll map your exposure and show you a path forward.
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


