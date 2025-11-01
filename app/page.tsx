"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { AnimatedWorkflow } from "@/components/animated-workflow";
import { TechEcosystemSection } from "@/components/sections/tech-ecosystem-section";
import { ROICalculator } from "@/components/sections/roi-calculator";
import { EmailReveal } from "@/components/email-reveal";
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
  ChevronLeft,
  ChevronRight,
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

// Testimonials Section Component with Carousel
function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Updated testimonials with credible, believable content focused on results
  const testimonials = [
    {
      quote:
        "Automation saved 40+ hours weekly. Our operations team can finally focus on strategic work instead of manual tasks.",
      author: "Operations Director",
      company: "SaaS Firm",
      initials: "OD",
    },
    {
      quote:
        "Reduced reporting errors by 50%. Monthly close process now takes 2 days instead of 5.",
      author: "Finance Lead",
      company: "Logistics Group",
      initials: "FL",
    },
    {
      quote:
        "Faster analytics and fewer outages. System health checks run automatically, preventing issues before they impact customers.",
      author: "Tech Lead",
      company: "E-commerce Brand",
      initials: "TL",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-24 bg-muted">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Results Our Clients See
          </h2>
          <p className="text-lg text-muted-foreground">
            Real impact from teams using AI automation
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-lg"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Company Logo Circle */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {testimonials[currentIndex].initials}
                  </div>
                </div>

                {/* Quote */}
                <div className="flex-1">
                  <blockquote className="text-lg md:text-xl text-foreground mb-4 leading-relaxed">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <p className="font-semibold text-foreground">
                      {testimonials[currentIndex].author}
                    </p>
                    <span className="hidden sm:inline text-muted-foreground">
                      —
                    </span>
                    <p className="text-muted-foreground">
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-card border border-border rounded-full p-2 hover:bg-muted transition-colors shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-card border border-border rounded-full p-2 hover:bg-muted transition-colors shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#00E5FF] w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  // Counter animation script
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>(".counter");
    counters.forEach((counter) => {
      const update = () => {
        const targetAttr = counter.getAttribute("data-target");
        if (targetAttr === null) return;
        const target = +targetAttr;
        const current = +counter.innerText;
        const increment = target / 100;
        if (current < target) {
          counter.innerText = Math.ceil(current + increment).toString();
          setTimeout(update, 20);
        } else {
          counter.innerText = target.toString();
        }
      };
      update();
    });
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Blue-Violet Gradient Background - adapts to light/dark mode */}
        <motion.div
          className="absolute inset-0 dark:opacity-100 opacity-100"
          animate={{
            background: [
              "radial-gradient(ellipse at top, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.08) 0%, transparent 50%)",
              "radial-gradient(ellipse at bottom left, rgba(59, 130, 246, 0.12) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(139, 92, 246, 0.12) 0%, transparent 50%)",
              "radial-gradient(ellipse at top, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.08) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Darker gradient overlay for dark mode only */}
        <motion.div
          className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(ellipse at top, rgba(0, 229, 255, 0.1) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(ellipse at bottom left, rgba(0, 229, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(ellipse at top, rgba(0, 229, 255, 0.1) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingCircles />
        </div>

        <div className="container relative z-10 px-4 md:px-6 py-24 md:py-32 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
            {/* Headline with glowing backdrop effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* Blurred gradient glow behind headline */}
              <div className="absolute inset-0 blur-3xl opacity-30 dark:opacity-50">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#00E5FF] animate-gradient" />
              </div>

              <h1
                className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground"
                data-motion
              >
                Automate Your Business{" "}
                <span className="gradient-text">with AI</span>
              </h1>
            </motion.div>

            {/* Sub-headline - Updated for modern AI consulting agency messaging */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              We design AI systems that make your operations self-optimizing.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center"
            >
              <Button
                size="lg"
                asChild
                className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 hover:from-blue-600 hover:to-purple-700 w-full sm:w-auto"
                aria-label="Get free assessment"
              >
                <Link href="/contact" className="flex items-center justify-center">
                  Get Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="rounded-2xl border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                aria-label="Calculate ROI"
              >
                <Link href="#roi-calculator" className="flex items-center justify-center">
                  Calculate ROI
                </Link>
              </Button>
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
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
          >
            <MetricCard
              icon={Clock}
              value={70}
              suffix="%"
              title="Time Saved"
              description="Less manual work means more time for growth"
              delay={0}
            />
            <MetricCard
              icon={Shield}
              value={90}
              suffix="%"
              title="Fewer Issues"
              description="Prevent problems before they cost you money"
              delay={0.1}
            />
            <MetricCard
              icon={InfinityIcon}
              value={24}
              suffix="/7"
              title="Always Running"
              description="Your operations work around the clock"
              delay={0.2}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-muted-foreground mt-8 text-base"
          >
            Trusted by businesses worldwide to automate their operations and
            scale efficiently.
          </motion.p>
        </div>
      </section>

      {/* Why Choose IOPS */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-lg text-muted-foreground mb-4">
              Proven results across SaaS, logistics, and service companies.
            </p>
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Why Businesses Choose IOPS
            </h2>
            <p className="text-lg text-muted-foreground">
              Businesses choose IOPS because it makes operations faster,
              cheaper, and more reliable.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
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
                whileHover={{ y: -3, scale: 1.02 }}
                className="flex-1 basis-1/5 min-w-[150px] mx-3"
              >
                {/* Frosted glass card with backdrop blur and semi-transparent background */}
                <Card className="rounded-2xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md hover:bg-white/10 dark:hover:bg-white/10 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <item.icon className="h-10 w-10 mx-auto mb-3 text-blue-600 dark:text-[#00E5FF]" />
                    <h3 className="font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - Redesigned with Carousel */}
      <TestimonialsSection />

      {/* Use Case Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Real Example
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A SaaS company saved 80 hours per month by automating reports and
              system checks with IOPS.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <ROICalculator />

      {/* Tech Ecosystem Section */}
      <TechEcosystemSection />

      {/* Final CTA Banner - Enhanced with gradient divider and modern messaging */}
      <section className="py-16 md:py-24 relative overflow-hidden transition-colors duration-300">
        {/* Light mode gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-violet-50 dark:hidden" />
        
        {/* Dark mode solid background */}
        <div className="absolute inset-0 bg-[#0B0C10] hidden dark:block" />
        
        {/* Animated gradient background - only visible in dark mode */}
        <motion.div
          className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(ellipse at top, rgba(0, 229, 255, 0.1) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(ellipse at bottom left, rgba(0, 229, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(ellipse at top, rgba(0, 229, 255, 0.1) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Gradient divider line at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 dark:via-[#00E5FF] to-transparent opacity-30 dark:opacity-50" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4 md:mb-6 transition-colors duration-300">
            Let's Automate Your Operations
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto transition-colors duration-300">
            Book your free 30-minute call. We'll analyze your workflows and show you exactly what can be automated.
          </p>
          <Button
            size="lg"
            asChild
            className="rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-[#00E5FF] dark:hover:bg-[#00CCE5] text-white dark:text-gray-900 px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-[#00E5FF]/30 transition-all duration-300 hover:scale-105"
            aria-label="Book free 30-minute call"
          >
            <Link href="https://calendly.com/me-ionut/30min">
              Book Free 30-Minute Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Footer - Enhanced with 2-column layout and gradient divider */}
      <footer className="relative py-12 md:py-16 bg-slate-50 dark:bg-[#0B0C10] transition-colors duration-300">
        {/* Gradient divider line at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-border to-transparent" />

        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
          >
            {/* Left Column - Brand */}
            <div>
              <div className="flex flex-col items-start mb-4">
                <span className="text-2xl font-bold gradient-text">IOPS</span>
                <span className="text-sm text-muted-foreground">
                  Intelligent Operations
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                AI-powered automation systems that cut manual work and keep your operations running 24/7.
              </p>
            </div>

            {/* Right Column - Links & Contact */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Services</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="hover:text-foreground transition-colors cursor-pointer">AI Automation Systems</li>
                  <li className="hover:text-foreground transition-colors cursor-pointer">Operations Automation</li>
                  <li className="hover:text-foreground transition-colors cursor-pointer">Process Optimization</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <EmailReveal
                      email="contact@iops.pro"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    />
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-muted-foreground hover:text-foreground dark:hover:text-[#00E5FF] transition-colors duration-300"
                    >
                      Get in Touch
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-muted-foreground hover:text-foreground dark:hover:text-[#00E5FF] transition-colors duration-300"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 md:mt-12 pt-8 border-t border-border text-center"
          >
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} IOPS. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}
