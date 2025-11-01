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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-background to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-center mb-6 text-foreground"
          >
            Frequently Asked Questions About <span className="gradient-text">Intelligent Operations</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need to know about how we design and implement AI automation for your business.
          </motion.p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-b border-gray-200 dark:border-gray-800"
                >
                  <AccordionTrigger
                    className="text-left text-lg font-semibold text-foreground hover:no-underline py-6"
                    aria-label={faq.question}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-muted-foreground pb-6 leading-relaxed data-[state=open]:animate-fadeIn"
                    role="region"
                    aria-label={`Answer to: ${faq.question}`}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-muted">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
          >
            Didn't find your question?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground mb-8"
          >
            Message us and we'll answer any questions you have.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              asChild
              className="rounded-2xl bg-[#007AFF] text-white px-8 py-6 hover:bg-[#0056CC] hover:shadow-lg hover:shadow-[#007AFF]/30 transition-all text-lg glow-effect"
            >
              <Link href="/contact">
                Message Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

