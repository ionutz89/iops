"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

const pricingTiers = [
  {
    name: "Starter",
    price: "From $XX,XXX+",
    description: "Automate first critical workflow",
    popular: false,
    features: [
      "Single workflow automation",
      "n8n or Dify implementation",
      "Basic Claude MCP integration",
      "2 weeks implementation",
      "Documentation & training",
      "1 month support",
    ],
    cta: "Get Custom Quote",
  },
  {
    name: "Scale",
    price: "From $XX,XXX+",
    description: "Full AI DevOps deployment",
    popular: true,
    features: [
      "Full multi-agent system",
      "Claude MCP + n8n orchestration",
      "Kubernetes automation",
      "ArgoCD GitOps workflows",
      "Monitoring & observability",
      "5 weeks implementation",
      "Comprehensive documentation",
      "3 months premium support",
      "Quarterly optimization reviews",
    ],
    cta: "Get Custom Quote",
  },
  {
    name: "Enterprise",
    price: "Custom quote after assessment",
    description: "Custom solutions for large teams",
    popular: false,
    features: [
      "Everything in Scale, plus:",
      "Custom AI model integration",
      "Multi-cloud orchestration",
      "Advanced security & compliance",
      "Dedicated success manager",
      "Priority 24/7 support",
      "Ongoing optimization",
      "Custom SLAs",
      "Executive reporting",
    ],
    cta: "Contact Sales",
  },
];

export function Pricing() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fixed-price engagements with clear deliverables and guaranteed
            results
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
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
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
                  <Button
                    className={`w-full ${
                      tier.popular
                        ? "rounded-xl bg-[#007AFF] text-white px-6 py-3 hover:bg-[#0056CC] transition"
                        : ""
                    }`}
                    variant={tier.popular ? "default" : "outline"}
                    size="lg"
                    onClick={() => {
                      trackCTAClick(
                        tier.cta,
                        `pricing_${tier.name.toLowerCase()}`
                      );
                      scrollToContact();
                    }}
                    aria-label={`Select ${tier.name} pricing plan`}
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-lg font-semibold text-[#007AFF]">
            ROI achieved in under 4 months
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
                Not sure which plan is right for you?
              </h3>
              <p className="text-muted-foreground mb-6">
                Book a free assessment to discuss your specific needs and get a
                custom recommendation.
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  trackCTAClick("Schedule Free Consultation", "pricing_footer");
                  scrollToContact();
                }}
                aria-label="Schedule a free consultation"
              >
                Book Free Assessment
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
