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
      {/* Enhanced frosted glass card with dual-theme support */}
      <Card className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-[#00B8D9] dark:hover:border-[#00E5FF]/30">
        <CardContent className="p-8 text-center">
          <Icon className="h-12 w-12 mx-auto mb-4 text-[#7B61FF] dark:text-[#00E5FF]" />
          {/* Solid text for metric value in light mode, gradient in dark */}
          <div className="text-4xl md:text-5xl font-bold mb-2">
            <span ref={ref} className="text-[#0F0F0F] dark:bg-gradient-to-r dark:from-[#00E5FF] dark:to-[#8B5CF6] dark:bg-clip-text dark:text-transparent">{displayValue}</span>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-[#0F0F0F] dark:text-white">
            {title}
          </h3>
          <p className="text-[#333] dark:text-white/70">{description}</p>
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
    <section className="py-24 bg-[#F7F8FA] dark:bg-[#121417] transition-colors duration-300">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0F0F0F] dark:text-white">
            Results Our Clients See
          </h2>
          <p className="text-lg text-[#333] dark:text-white/70">
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
              className="bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 p-8 md:p-12 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-lg relative"
            >
              {/* Quote icon watermark */}
              <div className="absolute top-6 right-6 text-6xl text-[#7B61FF]/10 dark:text-white/5 font-serif">"</div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Company Logo Circle with dual-theme gradient */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00B8D9] to-[#7B61FF] dark:from-[#00E5FF] dark:to-[#8B5CF6] flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {testimonials[currentIndex].initials}
                  </div>
                </div>

                {/* Quote */}
                <div className="flex-1 relative z-10">
                  <blockquote className="text-lg md:text-xl text-[#1E1E1E] dark:text-white mb-4 leading-relaxed font-normal">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <p className="font-semibold text-[#0F0F0F] dark:text-white">
                      {testimonials[currentIndex].author}
                    </p>
                    <span className="hidden sm:inline text-gray-500 dark:text-white/60">
                      —
                    </span>
                    <p className="text-[#333] dark:text-white/70">
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows - Dual theme support */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white dark:bg-[#121417] border border-gray-200 dark:border-white/10 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-[#0F0F0F] dark:text-white" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white dark:bg-[#121417] border border-gray-200 dark:border-white/10 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-[#0F0F0F] dark:text-white" />
          </button>
        </div>

        {/* Dots Indicator - Dual theme support */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#00B8D9] dark:bg-[#00E5FF] w-8"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
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
    <main className="min-h-screen bg-background dark:bg-[#0B0C10] transition-colors duration-300">
      <Navigation />

      {/* Hero Section with Enhanced Dual-Theme Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" style={{ background: "radial-gradient(circle at 50% 30%, #EAF6FF 0%, #F8F9FC 60%)" }}>
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

        {/* Floating Circles - Works for both themes */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingCircles />
        </div>

        <div className="container relative z-10 px-4 md:px-6 py-24 md:py-32 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
            {/* Headline with enhanced glowing backdrop effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* Enhanced blurred gradient glow behind headline */}
              <div className="absolute inset-0 blur-3xl opacity-20 dark:opacity-60">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00B8D9] via-[#7B61FF] to-[#00B8D9] dark:from-[#00E5FF] dark:via-[#8B5CF6] dark:to-[#00E5FF] animate-gradient" />
              </div>

              <h1
                className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white"
                data-motion
              >
                Automate Your Business{" "}
                <motion.span
                  className="gradient-text"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  with AI
                </motion.span>
              </h1>
            </motion.div>

            {/* Sub-headline - Enhanced for both themes */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-white/80 max-w-3xl mx-auto leading-relaxed font-normal"
            >
              We design AI systems that make your operations self-optimizing.
            </motion.p>

            {/* CTAs with enhanced dual-theme styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center"
            >
              {/* Primary CTA - Cyan solid */}
              <Button
                size="lg"
                asChild
                className="rounded-2xl bg-[#00B8D9] hover:bg-[#00A8C5] dark:bg-[#00E5FF] dark:hover:bg-[#00CCE5] text-white dark:text-gray-900 px-8 py-6 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 btn-glow-cyan w-full sm:w-auto"
                aria-label="Get free assessment"
              >
                <Link href="/contact" className="flex items-center justify-center">
                  Get Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {/* Secondary CTA - Violet outline */}
              <Button
                size="lg"
                variant="outline"
                asChild
                className="rounded-2xl border-2 border-[#7B61FF] dark:border-[#8B5CF6] text-[#7B61FF] dark:text-[#8B5CF6] hover:bg-[#F2EEFF] dark:hover:bg-[#8B5CF6] hover:text-[#7B61FF] dark:hover:text-white px-8 py-6 text-base font-semibold shadow-sm transition-all duration-300 hover:scale-105 btn-glow-purple w-full sm:w-auto"
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

            {/* Scroll Indicator - Animated pulse with dual-theme support */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="text-xs text-gray-700 dark:text-white/60 font-medium">Scroll to explore</span>
              <div className="animate-scroll-pulse">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#00B8D9] dark:text-[#00E5FF]"
                >
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Highlights with Count-Up - Enhanced dual-theme background */}
      <section className="py-16 md:py-24 bg-[#F9FAFB] dark:bg-[#121417] transition-colors duration-300">
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
            className="text-center text-[#333] dark:text-muted-foreground mt-8 text-base"
          >
            Trusted by businesses worldwide to automate their operations and
            scale efficiently.
          </motion.p>
        </div>
      </section>

      {/* Why Choose IOPS - Enhanced with dual-theme support */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#0B0C10] transition-colors duration-300">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-base text-[#333] dark:text-white/60 mb-4">
              Proven results across SaaS, logistics, and service companies.
            </p>
            <h2 className="text-4xl font-bold mb-4 text-[#0F0F0F] dark:text-white">
              Why Businesses Choose IOPS
            </h2>
            <p className="text-lg text-[#333] dark:text-white/70 max-w-2xl mx-auto">
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
                whileHover={{ y: -5, scale: 1.03 }}
                className="flex-1 basis-1/5 min-w-[150px] mx-3"
              >
                {/* Enhanced card with dual-theme support */}
                <Card className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-md hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm hover:shadow-md transition-all duration-300 h-full hover:border-[#7B61FF] dark:hover:border-[#00E5FF]/30">
                  <CardContent className="p-6 text-center">
                    <item.icon className="h-10 w-10 mx-auto mb-3 text-[#7B61FF] dark:text-[#00E5FF] transition-transform duration-300" />
                    <h3 className="font-semibold text-[#1E1E1E] dark:text-white">
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

      {/* Use Case Section - Enhanced with dual-theme support */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#0B0C10] transition-colors duration-300">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4 text-[#0F0F0F] dark:text-white">
              Real Example
            </h2>
            <p className="text-lg text-[#333] dark:text-white/70 max-w-2xl mx-auto">
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

      {/* Final CTA Banner - Enhanced with dual-theme gradient divider */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-blue-50 via-gray-50 to-violet-50 dark:from-[#0B0C10] dark:via-[#121417] dark:to-[#0B0C10] transition-colors duration-300">
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

        {/* Gradient divider line at top - Dual theme support */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00B8D9] dark:via-[#00E5FF] to-transparent opacity-40 dark:opacity-50" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0F0F0F] dark:text-white mb-4 md:mb-6">
            Let's Automate Your Operations
          </h2>
          <p className="text-lg md:text-xl text-[#333] dark:text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
            Book your free 30-minute call. We'll analyze your workflows and show you exactly what can be automated.
          </p>
          <Button
            size="lg"
            asChild
            className="rounded-2xl bg-[#00B8D9] hover:bg-[#00A8C5] dark:bg-[#00E5FF] dark:hover:bg-[#00CCE5] text-white dark:text-gray-900 px-8 py-6 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 btn-glow-cyan"
            aria-label="Book free 30-minute call"
          >
            <Link href="https://calendly.com/me-ionut/30min" className="flex items-center justify-center">
              Book Free 30-Minute Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Footer - Enhanced with dual-theme, 2-column layout, gradient divider */}
      <footer className="relative py-12 md:py-16 bg-[#F4F5F7] dark:bg-[#0B0C10] transition-colors duration-300">
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
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#00B8D9]/10 to-[#7B61FF]/10 dark:from-[#00E5FF]/50 dark:to-[#8B5CF6]/50" />

        <div className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto">
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
                <span className="text-sm text-[#333] dark:text-white/60">
                  Intelligent Operations
                </span>
              </div>
              <p className="text-sm text-[#1E1E1E] dark:text-white/70 max-w-md leading-relaxed">
                AI-powered automation systems that cut manual work and keep your operations running 24/7.
              </p>
            </div>

            {/* Right Column - Links & Contact */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4 text-[#0F0F0F] dark:text-white">Services</h4>
                <ul className="space-y-2 text-sm text-[#1E1E1E] dark:text-white/70">
                  <li className="hover:text-[#7B61FF] dark:hover:text-[#00E5FF] transition-colors cursor-pointer">AI Automation Systems</li>
                  <li className="hover:text-[#7B61FF] dark:hover:text-[#00E5FF] transition-colors cursor-pointer">Operations Automation</li>
                  <li className="hover:text-[#7B61FF] dark:hover:text-[#00E5FF] transition-colors cursor-pointer">Process Optimization</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-[#0F0F0F] dark:text-white">Connect</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <EmailReveal
                      email="contact@iops.pro"
                      className="text-[#1E1E1E] dark:text-white/70 hover:text-[#7B61FF] dark:hover:text-[#00E5FF] transition-colors"
                    />
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-[#1E1E1E] dark:text-white/70 hover:text-[#7B61FF] dark:hover:text-[#00E5FF] transition-colors duration-300"
                    >
                      Get in Touch
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-[#1E1E1E] dark:text-white/70 hover:text-[#7B61FF] dark:hover:text-[#00E5FF] transition-colors duration-300"
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
            className="mt-8 md:mt-12 pt-8 border-t border-gray-300 dark:border-white/10 text-center"
          >
            <p className="text-sm text-[#333] dark:text-white/60">
              &copy; {new Date().getFullYear()} IOPS. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}
