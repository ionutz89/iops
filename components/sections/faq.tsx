"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Will AI replace our engineers?",
    answer:
      "No. AI agents augment your team by handling repetitive operations tasks, allowing engineers to focus on strategic work and innovation. Our solutions are designed to amplify your team's capabilities, not replace them.",
  },
  {
    question: "How do you integrate with our stack?",
    answer:
      "We integrate seamlessly with your existing infrastructure. Our solutions work with Kubernetes, cloud providers (AWS, GCP, Azure), CI/CD tools, monitoring systems, and more. We assess your current stack during the free assessment and design solutions that fit your environment.",
  },
  {
    question: "Is our data safe?",
    answer:
      "Yes. We follow privacy-first by design principles. Your data stays within your infrastructure, and we use secure integrations with minimal data access. All implementations follow security best practices and can be audited.",
  },
  {
    question: "How long does deployment take?",
    answer:
      "Deployment timelines vary by scope. Starter packages typically take 2 weeks, while full AI DevOps deployments take 5 weeks. Enterprise solutions are custom-scoped. We provide detailed timelines during the assessment phase.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We work with FinTech, SaaS, E-Commerce, healthcare tech, and other technology companies. Our solutions are tailored for teams dealing with complex operations, frequent deployments, and the need for reliable, scalable infrastructure.",
  },
  {
    question: "What support do we get after delivery?",
    answer:
      "Each package includes support periods ranging from 1 month (Starter) to ongoing (Enterprise). We provide documentation, training for your team, and maintenance support. Many clients also choose quarterly optimization reviews to ensure continuous improvement.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-32 scroll-mt-24 px-6 md:px-12">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            FAQ
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Common questions about our AI-powered DevOps automation solutions
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => toggleFAQ(index)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold pr-8">
                      {faq.question}
                    </CardTitle>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </CardHeader>
                {openIndex === index && (
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}




