"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Info } from "lucide-react";

const pricingTiers = [
  {
    name: "Starter",
    headline: "Workflow Automation",
    price: "€2,500",
    priceSuffix: "one-time",
    description: "Perfect for automating a single critical manual process.",
    popular: false,
    features: [
      "1 Custom AI Agent (e.g., Lead Qual, Email Triage)",
      "n8n Workflow Implementation",
      "Integration with CRM/Slack/Email",
      "Standard Error Handling Setup",
      "3 Days Post-Launch Support",
    ],
    cta: "Get Started",
    ctaSubtext: "Free assessment included",
  },
  {
    name: "Scale",
    headline: "Multi-Agent System",
    price: "€7,500",
    priceSuffix: "one-time",
    description: "End-to-end autonomous systems for complex operations.",
    popular: true,
    features: [
      "Orchestrated Multi-Agent Team (3-5 Agents)",
      "Advanced RAG (Chat with your company data)",
      "Complex Decision-Making Logic",
      "Dify / LangChain Integration",
      "Comprehensive Testing & Prompt Engineering",
      "7 Days Dedicated Support & Handover",
    ],
    cta: "Get Custom Quote",
    ctaSubtext: "Most popular choice",
  },
  {
    name: "Enterprise",
    headline: "Custom Architecture",
    price: "Custom Pricing",
    priceSuffix: "",
    description: "Secure, private AI infrastructure for large organizations.",
    popular: false,
    features: [
      "Private LLM Deployment (Local/VPC)",
      "Unlimited Workflow Volume",
      "Enterprise Security & SSO",
      "Custom SLA & Priority Support",
      "Dedicated Account Manager",
      "Full Staff Training & Handover",
    ],
    cta: "Contact Sales",
    ctaSubtext: "Discuss your requirements",
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="py-24 md:py-32 bg-muted/50 scroll-mt-24 px-6 md:px-12"
    >
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fixed-price engagements with clear deliverables and guaranteed
            results. No hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={tier.popular ? "md:-mt-4" : ""}
            >
              <Card
                className={`h-full flex flex-col relative transition-shadow duration-300 ${
                  tier.popular
                    ? "border-[#007AFF] shadow-xl scale-105"
                    : "hover:shadow-lg"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-1">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className={tier.popular ? "pt-8" : ""}>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {tier.name}
                    </p>
                    <CardTitle className="text-2xl">{tier.headline}</CardTitle>
                  </div>
                  <div className="mt-4">
                    <span className="text-3xl md:text-4xl font-bold">{tier.price}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {tier.priceSuffix}
                    </span>
                  </div>
                  <CardDescription className="mt-4">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-2">
                    <Button
                      className={`w-full ${
                        tier.popular
                          ? "rounded-xl bg-[#007AFF] text-white px-6 py-3 hover:bg-[#0056CC] transition"
                          : ""
                      }`}
                      variant={tier.popular ? "default" : "outline"}
                      size="lg"
                      asChild
                    >
                      <Link
                        href="/contact"
                        aria-label={`Select ${tier.name} pricing plan`}
                      >
                        {tier.cta}
                      </Link>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      {tier.ctaSubtext}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pricing Transparency Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium">
            <Check className="h-4 w-4" />
            <span>Average ROI achieved in under 4 months</span>
          </div>

          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <Info className="h-4 w-4" />
            Need ongoing optimization? Monthly maintenance retainers are available upon request.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Card className="max-w-3xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3">
                Not sure which plan fits your needs?
              </h3>
              <p className="text-muted-foreground mb-6">
                Book a free 30-minute assessment. We'll analyze your workflows and
                provide a detailed scope with exact pricing—no obligation.
              </p>
              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <Link
                  href="/contact"
                  aria-label="Schedule a free consultation"
                >
                  Book Free Assessment
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
