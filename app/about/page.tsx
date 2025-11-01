"use client";

// Force dynamic rendering to avoid prerendering issues
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { EmailReveal } from "@/components/email-reveal";
import Link from "next/link";
import Script from "next/script";
import { Linkedin, Globe } from "lucide-react";

// Floating circles component for hero background
function FloatingCircles() {
  const [circles, setCircles] = useState<
    Array<{
      id: number;
      size: number;
      left: number;
      top: number;
      xOffset: number;
      yOffset: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    // Generate random values only on client to avoid hydration mismatch
    setCircles(
      Array.from({ length: 6 }, (_, idx) => ({
        id: idx,
        size: Math.random() * 200 + 100,
        left: Math.random() * 100,
        top: Math.random() * 100,
        xOffset: Math.random() * 100 - 50,
        yOffset: Math.random() * 100 - 50,
        duration: 10 + Math.random() * 10,
      }))
    );
  }, []);

  // Don't render until circles are generated (client-side only)
  if (circles.length === 0) {
    return null;
  }

  return (
    <>
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          className="absolute rounded-full bg-gradient-to-br from-blue-400/15 to-purple-400/15 dark:from-blue-400/20 dark:to-purple-400/20 blur-xl"
          style={{
            width: circle.size,
            height: circle.size,
            left: `${circle.left}%`,
            top: `${circle.top}%`,
          }}
          animate={{
            x: [0, circle.xOffset, 0],
            y: [0, circle.yOffset, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: circle.id * 0.5,
          }}
        />
      ))}
    </>
  );
}

export default function About() {
  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://iops.pro/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://iops.pro/about",
      },
    ],
  };

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <main className="min-h-screen bg-[#F7F8FA] dark:bg-[#0B0C10] transition-colors duration-300">
        <Navigation />

      {/* Hero Section - Matching homepage cloud background */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative py-16 px-6 overflow-hidden"
        style={{ background: "radial-gradient(circle at 50% 30%, #EAF6FF 0%, #F8F9FC 60%)" }}
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

        {/* Floating Circles - Works for both themes */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingCircles />
        </div>

        <div className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#111827] dark:text-white">
            About <span className="gradient-text">IOPS</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Building intelligent systems that make operations self-optimizing
          </p>
        </div>
      </motion.section>

      {/* A Note from Ionut - Enhanced card with depth and glow */}
      <section className="py-16 bg-[#F7F8FA] dark:bg-[#0B0C10]">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white dark:bg-[#121417] border border-gray-200 dark:border-white/10 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.05)] dark:shadow-none p-8 md:p-12 my-8"
          >
            <h2 className="text-2xl font-semibold text-[#111827] dark:text-white mb-4">
              A Note from Ionut
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I built IOPS because I was tired of watching talented teams burn
              out on repetitive operations work. Over the past 10+ years, I've
              specialized in DevOps and AI automation—helping companies scale
              their infrastructure without the chaos that usually comes with
              growth.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              Here's what that looks like in practice: we helped one SaaS
              company cut deployment time from 4 hours to 12 minutes. Another
              client eliminated 90% of their manual incident responses. These
              aren't flukes—they're the result of systematic automation that
              actually works.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 font-medium">
              If your operations feel like they're holding your business back,
              let's change that.
            </p>
            <div className="mt-4 flex flex-col md:flex-row gap-4">
              <a
                href="https://www.linkedin.com/in/ionutiorgu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00B8D9] hover:text-[#0089A8] underline font-medium inline-flex items-center gap-2"
                aria-label="Connect with Ionut on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </a>
              <a
                href="https://ionut.vip"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00B8D9] hover:text-[#0089A8] underline font-medium inline-flex items-center gap-2"
                aria-label="Visit Ionut's personal website"
              >
                <Globe className="w-4 h-4" />
                Visit personal site
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are - Enhanced contrast and section separation */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-12 bg-[#F9FAFB] dark:bg-[#121417] text-center"
      >
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111827] dark:text-white mb-6">
            Who We Are
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed">
            We're a specialized team that transforms chaotic operations into
            self-running systems. No more 3 AM alerts. No more manual
            deployments. No more wondering if your infrastructure can handle
            the next growth spike.
          </p>
          <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            We build intelligent automation that actually works—the kind that
            catches problems before they become incidents and scales without
            adding headcount.
          </p>
          <p className="max-w-3xl mx-auto text-xl font-semibold text-[#7B61FF] dark:text-[#8B5CF6] mt-6">
            Smarter Systems. Fewer Headaches.
          </p>
        </div>
      </motion.section>

      {/* The Team - Enhanced cards with depth and glow */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-12 bg-white dark:bg-[#0B0C10]"
      >
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#111827] dark:text-white mb-8">
            The Team
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Ionut",
                title: "Founder & DevOps/AI Automation Specialist",
                description:
                  "10+ years building intelligent systems that scale businesses. Specializes in Kubernetes, AWS, and AI-driven automation.",
                link: null,
              },
              {
                name: "Tudor",
                title: "Automation Engineer",
                description:
                  "Focuses on cloud infrastructure and workflow reliability.",
                link: {
                  text: "See his work",
                  url: "https://imiddle.online/experiences",
                },
              },
              {
                name: "Daniel",
                title: "Workflow & AI Integration Engineer",
                description:
                  "Builds n8n automation workflows for complex operations. Specializes in RAG and intelligent chatbot integrations.",
                link: null,
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                className="bg-white dark:bg-[#121417] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00B8D9] to-[#7B61FF] dark:from-[#00E5FF] dark:to-[#8B5CF6] flex items-center justify-center text-white font-bold text-3xl shadow-md">
                    {member.name[0]}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#111827] dark:text-white text-center">
                  {member.name}
                </h3>
                <p className="text-sm text-[#7B61FF] dark:text-[#8B5CF6] font-medium mb-3 text-center">
                  {member.title}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                  {member.description}
                  {member.link && (
                    <>
                      {" "}
                      <a
                        href={member.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00B8D9] dark:text-[#00E5FF] hover:opacity-80 font-medium underline transition-opacity duration-300 inline-flex items-center gap-1.5"
                        aria-label={`See ${member.name}'s work`}
                      >
                        <Globe className="w-3.5 h-3.5" />
                        {member.link.text}
                      </a>
                      .
                    </>
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Mission - Enhanced card with depth and glow */}
      <section className="py-12 bg-[#F7F8FA] dark:bg-[#0B0C10]">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#F7F8FA] dark:bg-[#1A1C20] border border-gray-200 dark:border-white/10 rounded-2xl p-8 text-center shadow-[0_4px_16px_rgba(0,0,0,0.05)] dark:shadow-none"
          >
            <h3 className="text-2xl font-bold text-[#111827] dark:text-white mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Operations should accelerate growth, not slow it down. We build
              AI-powered systems that handle the repetitive work so your team
              can focus on what actually moves the needle.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto mt-4">
              Our automations run 24/7, catch issues early, and scale without
              extra headcount. That's not a promise—it's how we work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Enhanced gradient with depth and glow */}
      <section className="py-16 bg-[#F7F8FA] dark:bg-[#0B0C10]">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-gradient-to-r from-[#7B61FF] to-[#00B8D9] dark:from-[#8B5CF6] dark:to-[#00E5FF] text-white text-center py-16 px-8 rounded-2xl shadow-lg my-12"
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Stop Fighting Fires?</h3>
            <p className="mb-6 opacity-90">
              Book your free 30-minute automation audit with Ionut. We'll
              identify your biggest operational bottlenecks and show you exactly
              how to automate them.
            </p>
            <a
              href="https://calendly.com/me-ionut/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#7B61FF] font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition"
              aria-label="Book your free automation audit"
            >
              Book Your Free Audit
            </a>
            <p className="text-sm mt-4 opacity-90 font-medium">
              No sales pitch. Just real insights you can use.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer - Enhanced with consistent styling */}
      <footer className="relative py-12 md:py-16 bg-[#F4F5F7] dark:bg-[#0B0C10] text-[#1E1E1E] dark:text-gray-300 border-t border-gray-200 dark:border-white/10 transition-colors duration-300 mt-12">
        {/* Grid pattern background for footer - Dual theme */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-100"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Gradient divider line at top - Dual theme support */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-500/10 to-violet-500/10 dark:from-[#00E5FF]/50 dark:to-[#8B5CF6]/50" />

        <div className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8"
          >
            {/* Column 1 - IOPS */}
            <div>
              <h4 className="font-semibold mb-2 text-[#1E1E1E] dark:text-gray-300">IOPS</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                AI-powered automation systems that cut manual work and keep your operations running 24/7.
              </p>
            </div>

            {/* Column 2 - Services */}
            <div>
              <h4 className="font-semibold mb-2 text-[#1E1E1E] dark:text-gray-300">Services</h4>
              <ul className="space-y-1 text-sm text-[#1E1E1E] dark:text-gray-300">
                <li>AI Automation Systems</li>
                <li>Operations Automation</li>
                <li>Process Optimization</li>
              </ul>
            </div>

            {/* Column 3 - Connect */}
            <div>
              <h4 className="font-semibold mb-2 text-[#1E1E1E] dark:text-gray-300">Connect</h4>
              <Link
                href="/contact"
                className="text-[#7B61FF] dark:text-[#8B5CF6] hover:text-[#5A47CC] dark:hover:text-[#7B4CF6] text-sm transition-colors duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 md:mt-12 pt-8 border-t border-gray-200 dark:border-white/10 text-center"
          >
            <p className="text-xs text-[#1E1E1E] dark:text-gray-300 opacity-70">
              © {new Date().getFullYear()} IOPS. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
      </main>
    </>
  );
}
