"use client";

// Force dynamic rendering to avoid prerendering issues
export const dynamic = "force-dynamic";

import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import Script from "next/script";

const faqs = [
  {
    question: "What are Intelligent Operations?",
    answer:
      "Intelligent Operations means using AI agents and automation to make your business run smoother. We don't sell software. We analyze your processes, design automations, and implement them using tools like n8n, Dify AI, and Claude MCP. You end up with working workflows, AI assistants, and integrations that run inside your own tools — no new system to log into.",
  },
  {
    question: "How can AI automation help my business?",
    answer:
      "AI automation replaces repetitive manual work with intelligent workflows. For example, we can connect your CRM, billing, and analytics tools so reports and updates happen automatically — no coding required from your team.",
  },
  {
    question: "Do I need technical knowledge to use it?",
    answer:
      "No. We handle setup, integration, and automation logic. You'll receive a simple dashboard or reports that show performance improvements, not a new platform to learn.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most implementations take 2–4 weeks, depending on your system complexity and integration needs. We manage everything end-to-end.",
  },
  {
    question: "Will AI replace our team?",
    answer:
      "No. Our goal is to make your existing team more efficient, not replace them. AI handles repetitive work so your people can focus on strategy and growth.",
  },
  {
    question: "What frameworks or tools do you use?",
    answer:
      "We build automations using n8n (workflow orchestration), Dify AI (chatbots and AI reasoning), and Claude MCP, an open-source framework from Anthropic for managing AI agents securely. These tools let us create AI assistants, automated reports, and integrated workflows directly in your systems — all fully owned and controlled by you.",
  },
  {
    question: "Can you build AI chatbots that use our company's data or documents?",
    answer:
      "Yes. We create chatbots and AI assistants that understand and respond using your own documentation, reports, or internal files. This is done using RAG (Retrieval-Augmented Generation), which allows the AI to reference your data instead of relying only on public models. We build these assistants using tools like n8n, Dify AI, or Flowise, depending on your setup. They can connect to your website, CRM, or internal systems, giving your team or customers instant answers from your verified content. All chatbot data stays within your environment for full privacy control.",
  },
  {
    question: "What results should I expect?",
    answer:
      "Most clients reduce manual workloads by 40–60% within the first 60 days. You'll see faster operations, fewer human errors, and clearer visibility into your processes.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. All automations and AI workflows are deployed inside your own infrastructure or a private cloud you control. We follow industry-standard security and privacy principles inspired by frameworks like GDPR, SOC 2, and ISO 27001 (without formal certification). Client data is never shared with external services without explicit consent.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing depends on your current setup and workflow complexity. We start with a free assessment, then provide a transparent, fixed quote before implementation.",
  },
  {
    question: "What support do we get after delivery?",
    answer:
      "We handle ongoing technical maintenance and monitoring to keep your automations running smoothly. We ensure your automations continue to run reliably and scale as your business grows.",
  },
  {
    question: "Can I start small and expand later?",
    answer:
      "Yes. Many clients begin with a single workflow or chatbot, then scale up once they see measurable ROI.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We work across e-commerce, logistics, finance, healthcare, and tech — any business with repetitive workflows or operational bottlenecks.",
  },
  {
    question: "How do you measure ROI from automation?",
    answer:
      "We track time saved, cost reduction, and process efficiency. Reports show before-and-after performance in clear, business terms.",
  },
  {
    question: "Do you offer training for my staff?",
    answer:
      "We provide human onboarding and training so your team knows how to manage and expand automations confidently. We provide onboarding sessions and documentation so your team understands how to manage and expand the automations safely.",
  },
  {
    question: "What's the first step to get started?",
    answer:
      "Book a free assessment. We'll review your current operations, identify high-impact automation opportunities, and build a roadmap for implementation. You can schedule a free 30-minute call to review your processes and identify automation opportunities.",
  },
];

export default function FAQ() {
  // Generate FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

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
        name: "FAQ",
        item: "https://iops.pro/faq",
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data for FAQPage */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      {/* BreadcrumbList schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <main className="min-h-screen bg-[#F7F8FA] dark:bg-[#0B0C10] transition-colors duration-300">
        <Navigation />

      {/* Hero Section - Matching About page gradient background */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative py-16 px-6 overflow-hidden text-center"
        style={{ background: "radial-gradient(circle at 50% 30%, #F2F6FF 0%, #FFFFFF 80%)" }}
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

        <div className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about how we design and implement AI automation for your company.
          </p>
        </div>
      </motion.section>

      {/* FAQ Accordion - Card-based design */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-12 bg-[#F7F8FA] dark:bg-[#0B0C10]"
      >
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-0 mb-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white dark:bg-[#121417] border border-gray-200 dark:border-white/10 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all duration-300"
                    >
                      <AccordionTrigger
                        id={`faq-question-${index}`}
                        aria-controls={`faq-${index}`}
                        className="text-left text-lg font-medium text-[#111827] dark:text-white hover:text-red-500 dark:hover:text-red-500 hover:no-underline py-5 px-5 transition-colors duration-300"
                        aria-label={faq.question}
                      >
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent
                        id={`faq-${index}`}
                        role="region"
                        aria-labelledby={`faq-question-${index}`}
                        className="text-gray-700 dark:text-gray-300 pb-6 px-5 leading-relaxed data-[state=open]:animate-fadeIn"
                      >
                        <p>{faq.answer}</p>
                      </AccordionContent>
                    </motion.div>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </motion.section>

      {/* CTA Section - Enhanced gradient with depth */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-16 bg-[#F7F8FA] dark:bg-[#0B0C10]"
      >
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-gradient-to-r from-[#7B61FF] to-[#00B8D9] dark:from-[#8B5CF6] dark:to-[#00E5FF] text-white text-center py-16 px-8 rounded-2xl shadow-lg my-12"
          >
            <h3 className="text-3xl font-bold mb-4">Didn't find your question?</h3>
            <p className="mb-6 opacity-90">
              Message us and we'll answer any questions you have.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-[#7B61FF] dark:text-[#8B5CF6] font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition"
            >
              Message Us
            </Link>
          </motion.div>
        </div>
      </motion.section>

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

