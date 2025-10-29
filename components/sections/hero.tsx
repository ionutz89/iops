"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FloatingCodeElements } from "@/components/floating-code-elements";
import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-50" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Floating Code Elements */}
      <FloatingCodeElements />

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 py-24 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              Claude MCP Partner
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              n8n Expert
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              Kubernetes Certified
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Transform Operations with{" "}
            <span className="gradient-text">AI-Powered Automation</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl"
          >
            Save 70% of operational time. Deploy AI agents that handle your
            DevOps while you focus on growth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col gap-4 w-full sm:w-auto sm:flex-row"
          >
            <Button
              size="lg"
              className="rounded-xl bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition text-lg w-full sm:w-auto"
              onClick={() => {
                trackCTAClick('Get Free Assessment', 'hero');
                scrollToSection("contact");
              }}
              aria-label="Get free DevOps assessment"
            >
              Get Free Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 w-full sm:w-auto"
              onClick={() => {
                trackCTAClick('Calculate ROI', 'hero');
                scrollToSection("roi-calculator");
              }}
              aria-label="Calculate your return on investment"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Calculate Your ROI
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 w-full max-w-3xl"
          >
            <div className="space-y-2">
              <div className="text-4xl font-bold gradient-text">70%</div>
              <div className="text-sm text-muted-foreground">
                Time Saved on Operations
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold gradient-text">90%</div>
              <div className="text-sm text-muted-foreground">
                Incident Reduction
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold gradient-text">$200K+</div>
              <div className="text-sm text-muted-foreground">
                Average Annual Savings
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
