"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { AnimatedWorkflow } from "@/components/animated-workflow";
import { TechEcosystemSection } from "@/components/sections/tech-ecosystem-section";
import { ROICalculator } from "@/components/sections/roi-calculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Clock,
  TrendingDown,
  Shield,
  Zap,
  Brain,
  Infinity as InfinityIcon,
  type LucideIcon,
} from "lucide-react";
import { useCountUp } from "@/lib/count-up";

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
          className="absolute rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-xl"
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

// Metric card with count-up animation
function MetricCard({
  icon: Icon,
  value,
  suffix,
  title,
  description,
  delay = 0,
}: {
  icon: LucideIcon;
  value: number;
  suffix: string;
  title: string;
  description: string;
  delay?: number;
}) {
  const { ref, displayValue } = useCountUp({
    end: value,
    duration: 1.5,
    suffix,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <Card className="rounded-2xl border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-8 text-center">
          <Icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <div className="text-4xl md:text-5xl font-bold mb-2 text-foreground">
            <span ref={ref}>{displayValue}</span>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            {title}
          </h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-background to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20" />

        {/* Floating Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingCircles />
        </div>

        {/* Subtle gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(0, 122, 255, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(0, 122, 255, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container relative z-10 px-4 md:px-6 py-24 md:py-32 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground"
              data-motion
            >
              Automate Your Business{" "}
              <span className="gradient-text">with AI</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              We build intelligent systems that handle operations, save time,
              and prevent downtime — so your business runs 24/7.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center justify-center"
            >
              <Button
                size="lg"
                asChild
                className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 font-medium shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 hover:from-blue-600 hover:to-purple-700"
              >
                <Link href="/contact">
                  Get Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Link
                href="#roi-calculator"
                className="inline-block px-6 py-3 text-sm font-medium text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 ml-4"
              >
                Calculate ROI
              </Link>
            </motion.div>

            {/* Animated Workflow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="w-full mt-12"
            >
              <AnimatedWorkflow />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Highlights with Count-Up */}
      <section className="py-16 bg-muted">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <MetricCard
              icon={Clock}
              value={70}
              suffix="%"
              title="Less Manual Work"
              description="Automation handles repetitive tasks"
              delay={0}
            />
            <MetricCard
              icon={Shield}
              value={90}
              suffix="%"
              title="Fewer Incidents"
              description="AI prevents issues before they happen"
              delay={0.1}
            />
            <MetricCard
              icon={InfinityIcon}
              value={24}
              suffix="/7"
              title="Self-Running Systems"
              description="Your operations never sleep"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Why Choose IOPS */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Why Businesses Choose IOPS
            </h2>
            <p className="text-lg text-muted-foreground">
              Smarter operations. Fewer incidents. More time for growth.
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: Clock, title: "Time Savings" },
              { icon: TrendingDown, title: "Cost Reduction" },
              { icon: Shield, title: "Reliability" },
              { icon: Zap, title: "Scalability" },
              { icon: Brain, title: "AI Expertise" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex-1 basis-1/5 min-w-[150px] mx-3"
              >
                <Card className="rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <item.icon className="h-10 w-10 mx-auto mb-3 text-blue-600" />
                    <h3 className="font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <ROICalculator />

      {/* Tech Ecosystem Section */}
      <TechEcosystemSection />

      {/* Final CTA Banner */}
      <section className="py-24 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-4xl font-semibold text-white mb-6">
            Start Automating Today
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your operations with intelligent automation systems
          </p>
          <Button
            size="lg"
            asChild
            className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-6 font-medium shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700"
          >
            <Link href="https://calendly.com/me-ionut/30min">
              Book 30-Minute Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex flex-col items-start mb-4">
                <span className="text-2xl font-bold gradient-text">IOPS</span>
                <span className="text-sm text-muted-foreground">
                  Intelligent Operations
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Privacy-first automation for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>AI Automation Systems</li>
                <li>Operations Automation</li>
                <li>Business Process Automation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="mailto:contact@iops.pro"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    contact@iops.pro
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    Get in Touch
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} IOPS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
