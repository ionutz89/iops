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
    question: "How does AI automation help my business?",
    answer:
      "AI automation eliminates repetitive manual tasks, reduces errors, and allows your team to focus on strategic work. Our systems handle routine operations 24/7, from data processing to system monitoring, saving you time and reducing costs.",
  },
  {
    question: "Will AI replace our team?",
    answer:
      "No. Our automation systems are designed to augment your team, not replace them. They handle repetitive tasks so your employees can focus on creative problem-solving, strategy, and customer relationships. Most clients report their teams become more productive and engaged.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most automation projects are completed in 4-8 weeks, depending on complexity. We start with a free assessment to understand your needs, then provide a detailed timeline. Simple automations can be live in as little as 2 weeks.",
  },
  {
    question: "Is data privacy guaranteed?",
    answer:
      "Absolutely. We follow privacy-first design principles and comply with GDPR, SOC 2, and ISO 27001 standards. Your data never leaves your infrastructure unless you explicitly approve it. We build systems that respect your security and compliance requirements.",
  },
  {
    question: "What tools do you integrate with?",
    answer:
      "We integrate with hundreds of popular business tools including AWS, Google Cloud, Slack, Microsoft 365, Salesforce, databases, APIs, and more. If you use a specific tool, we can likely integrate with it. Our automation platforms (n8n, Claude MCP) are highly flexible.",
  },
  {
    question: "What support do we get after delivery?",
    answer:
      "Every project includes 30 days of free support. After that, we offer maintenance plans starting at $500/month. We also provide documentation, training for your team, and are available for questions. You can always reach us via email or schedule a call.",
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
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Frequently Asked Questions About Intelligent Operations
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
                <AccordionItem value={`item-${index}`} className="border-b border-gray-200">
                  <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
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
            We're here to help. Get in touch and we'll answer any questions you have.
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

