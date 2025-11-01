"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FloatingCodeElements } from "@/components/floating-code-elements";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-50" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Floating Code Elements */}
      <FloatingCodeElements />

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 py-24 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Automate Your DevOps in{" "}
            <span className="gradient-text">5 Weeks</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl"
          >
            Save 70% of operations time and cut incidents by 90% with AI-powered
            automation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col gap-4 w-full sm:w-auto sm:flex-row"
          >
            <Button
              size="lg"
              className="rounded-xl bg-[#007AFF] text-white px-6 py-3 hover:bg-[#0056CC] transition text-lg w-full sm:w-auto"
              onClick={() => {
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
                // Add demo video link here
              }}
              aria-label="Watch 2-minute demo"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch 2-Minute Demo
            </Button>
          </motion.div>

          {/* Partner Logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-8 pt-8 opacity-60"
          >
            <Image
              src="/logos/aws.svg"
              alt="AWS"
              width={80}
              height={32}
              className="h-8 w-auto"
            />
            <Image
              src="/logos/google.svg"
              alt="Google Cloud"
              width={100}
              height={32}
              className="h-8 w-auto"
            />
            <Image
              src="/logos/n8n.svg"
              alt="n8n"
              width={80}
              height={32}
              className="h-8 w-auto"
            />
            <Image
              src="/logos/dify.svg"
              alt="Dify AI"
              width={100}
              height={32}
              className="h-8 w-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
