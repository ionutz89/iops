"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar, Bot, ArrowRight, GraduationCap, BookOpen, Zap, DollarSign } from "lucide-react";

export default function RAGVsFinetuningArticle() {
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
              AI Strategy
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F0F0F] dark:text-white mb-4 leading-tight"
          >
            RAG vs. Fine-tuning: Which one does your internal chatbot actually need?
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-xl text-gray-600 dark:text-white/70 mb-6"
          >
            Stop Overthinking Your AI Strategy
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
              4 min read
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
            {/* The Misconception */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F0F0F] dark:text-white mb-6">
                The Expensive Misconception
              </h2>
              <p className="text-xl text-gray-700 dark:text-white/80 leading-relaxed mb-6">
                &ldquo;We need to train our own AI model on our company data.&rdquo;
              </p>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                This is the most common request we hear from executives. And it&apos;s almost always the wrong approach. The assumption is that making an AI &ldquo;know&rdquo; your business requires teaching it from scratch—like sending it to business school with your proprietary curriculum.
              </p>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                Reality check: <strong className="text-[#0F0F0F] dark:text-white">custom AI chatbots</strong> that understand your business don&apos;t need to be trained from the ground up. That approach costs a fortune, takes months, and is usually massive overkill for what you actually need.
              </p>
            </div>

            {/* The Analogy - Visual Cards */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F0F0F] dark:text-white mb-6">
                The Difference: Medical School vs. Open Book Exam
              </h2>

              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                Here&apos;s the simplest way to understand the difference between these two approaches:
              </p>

              {/* Fine-tuning Card */}
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-400 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6" />
                  Fine-tuning = Medical School
                </h3>
                <p className="text-gray-700 dark:text-white/70 mb-4">
                  You spend years (and a fortune) teaching the model <em>how to think and talk</em> like a specialist. It learns patterns, develops instincts, and changes its fundamental behavior.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-white/60 text-sm">
                  <li>→ Expensive: $50K–$500K+ in compute and expertise</li>
                  <li>→ Slow: Weeks to months of training cycles</li>
                  <li>→ Static: Can&apos;t easily update with new information</li>
                  <li>→ Use case: Changing <em>how</em> the AI writes or reasons</li>
                </ul>
              </div>

              {/* RAG Card */}
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  RAG = Open Book Exam
                </h3>
                <p className="text-gray-700 dark:text-white/70 mb-4">
                  The model already knows how to read and reason. You simply hand it <em>your company textbook</em> and let it look up the answers in real-time.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-white/60 text-sm">
                  <li>→ Affordable: A fraction of fine-tuning costs</li>
                  <li>→ Fast: Deploy in days, not months</li>
                  <li>→ Dynamic: Updates instantly when your data changes</li>
                  <li>→ Use case: Giving the AI access to <em>your specific facts</em></li>
                </ul>
              </div>
            </div>

            {/* The Memory Problem */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F0F0F] dark:text-white mb-6">
                The &ldquo;Memory&rdquo; Problem with AI
              </h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                Large language models like GPT-4 or Claude are incredibly capable—but they have a critical limitation. They don&apos;t know your specific client list. They don&apos;t know this week&apos;s pricing. They have no idea what your internal policies say.
              </p>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                The instinct is to think: &ldquo;Let&apos;s train it on our data!&rdquo; But here&apos;s the problem with fine-tuning for <strong className="text-[#0F0F0F] dark:text-white">knowledge base automation</strong>:
              </p>
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl p-6 mb-6">
                <p className="text-red-700 dark:text-red-400 font-semibold mb-2">
                  Fine-tuning is terrible for facts.
                </p>
                <p className="text-gray-700 dark:text-white/70">
                  Facts change. Prices update. Policies evolve. Client lists grow. Every time something changes, you&apos;d need to retrain—which is slow, expensive, and impractical. Fine-tuning bakes information into the model&apos;s weights, making it nearly impossible to update quickly.
                </p>
              </div>
            </div>

            {/* Why RAG is the Business Standard */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F0F0F] dark:text-white mb-6">
                Why RAG is the Enterprise AI Standard
              </h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                <strong className="text-[#0F0F0F] dark:text-white">RAG architecture</strong> (Retrieval-Augmented Generation) solves this elegantly. Here&apos;s how it works in plain English:
              </p>

              <div className="bg-gradient-to-r from-[#7B61FF]/10 to-[#00B8D9]/10 dark:from-[#8B5CF6]/20 dark:to-[#00E5FF]/20 border border-[#7B61FF]/20 dark:border-[#00E5FF]/30 rounded-xl p-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#7B61FF] dark:bg-[#00E5FF] flex items-center justify-center text-white text-sm font-bold shrink-0">1</div>
                    <p className="text-gray-700 dark:text-white/80">
                      <strong>Connect the AI to your live documents</strong>—Google Drive, Notion, SharePoint, PDFs, your CRM. Wherever your knowledge lives.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#7B61FF] dark:bg-[#00E5FF] flex items-center justify-center text-white text-sm font-bold shrink-0">2</div>
                    <p className="text-gray-700 dark:text-white/80">
                      <strong>When someone asks a question</strong>, the AI searches your documents in real-time and retrieves the relevant context.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#7B61FF] dark:bg-[#00E5FF] flex items-center justify-center text-white text-sm font-bold shrink-0">3</div>
                    <p className="text-gray-700 dark:text-white/80">
                      <strong>The AI crafts an answer</strong> using that context—accurate, up-to-date, and grounded in your actual data.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                The magic? <strong className="text-[#0F0F0F] dark:text-white">Update a price list, and the AI knows it immediately.</strong> No retraining. No waiting. No additional cost. This is why <strong className="text-[#0F0F0F] dark:text-white">AI cost optimization</strong> starts with choosing the right architecture—and for 90% of business use cases, that&apos;s RAG.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="mb-12">
              <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-[#1A1C20]">
                      <th className="px-4 py-3 text-left font-semibold text-[#0F0F0F] dark:text-white"></th>
                      <th className="px-4 py-3 text-left font-semibold text-amber-700 dark:text-amber-400">Fine-tuning</th>
                      <th className="px-4 py-3 text-left font-semibold text-emerald-700 dark:text-emerald-400">RAG</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                    <tr className="bg-white dark:bg-[#121417]">
                      <td className="px-4 py-3 font-medium text-[#0F0F0F] dark:text-white">Cost</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-white/70">$50K–$500K+</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-white/70">$2K–$20K</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-[#1A1C20]/50">
                      <td className="px-4 py-3 font-medium text-[#0F0F0F] dark:text-white">Time to Deploy</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-white/70">Weeks to months</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-white/70">Days</td>
                    </tr>
                    <tr className="bg-white dark:bg-[#121417]">
                      <td className="px-4 py-3 font-medium text-[#0F0F0F] dark:text-white">Updating Data</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-white/70">Retrain the model</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-white/70">Update the document</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-[#1A1C20]/50">
                      <td className="px-4 py-3 font-medium text-[#0F0F0F] dark:text-white">Best For</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-white/70">Changing AI behavior</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-white/70">Accessing your data</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Conclusion */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F0F0F] dark:text-white mb-6">
                The Smart Choice for Your Enterprise AI Strategy
              </h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                If you want an AI that knows your <em>business data</em>—your products, your policies, your client information—you want RAG. Full stop.
              </p>

              <div className="bg-gradient-to-r from-[#7B61FF]/10 to-[#00B8D9]/10 dark:from-[#8B5CF6]/20 dark:to-[#00E5FF]/20 border border-[#7B61FF]/20 dark:border-[#00E5FF]/30 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-6 h-6 text-[#7B61FF] dark:text-[#00E5FF]" />
                  <h3 className="text-lg font-semibold text-[#0F0F0F] dark:text-white">The Bottom Line</h3>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-white/80">
                  <li className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span><strong>Cheaper to build:</strong> 10–50x less than fine-tuning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span><strong>Faster to deploy:</strong> Days instead of months</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span><strong>Easier to maintain:</strong> Update documents, not models</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                Choosing RAG over fine-tuning isn&apos;t settling for less—it&apos;s choosing the right tool for the job. And in the world of <strong className="text-[#0F0F0F] dark:text-white">enterprise AI strategy</strong>, the right tool is usually the one that gets results faster without burning through your budget.
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
                Ready to build your AI-powered knowledge base?
              </h3>
              <p className="mb-6 opacity-90 max-w-xl mx-auto">
                Let&apos;s design a custom AI chatbot that actually knows your business—without the six-figure fine-tuning bill. Free strategy session.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#7B61FF] dark:text-[#8B5CF6] font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition"
              >
                Get Free AI Strategy Session
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

