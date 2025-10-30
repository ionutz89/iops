"use client";

// Force dynamic rendering to avoid prerendering issues
export const dynamic = "force-dynamic";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Send } from "lucide-react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const executeRecaptcha = async (): Promise<string | null> => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      console.error("reCAPTCHA site key not configured");
      return null;
    }

    try {
      // Wait for grecaptcha to be available
      await new Promise<void>((resolve) => {
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => resolve());
        } else {
          const checkInterval = setInterval(() => {
            if (window.grecaptcha) {
              window.grecaptcha.ready(() => {
                clearInterval(checkInterval);
                resolve();
              });
            }
          }, 100);

          setTimeout(() => {
            clearInterval(checkInterval);
            resolve();
          }, 5000);
        }
      });

      // Execute reCAPTCHA v3
      const token = await window.grecaptcha.execute(siteKey, {
        action: "submit_contact_form",
      });

      return token;
    } catch (error) {
      console.error("Error executing reCAPTCHA:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA v3
      const token = await executeRecaptcha();

      if (!token) {
        alert("Security verification failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Verify token server-side
      const verifyResponse = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        alert(
          verifyData.error || "Security verification failed. Please try again."
        );
        setIsSubmitting(false);
        return;
      }

      // Handle form submission here
      console.log("Form submitted:", formData);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            Start Your <span className="gradient-text">Transformation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Tell us about your challenges and we'll show you how intelligent automation can help.
          </motion.p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full bg-[#007AFF] blur-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, 30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left: AI Assistant Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden md:block"
            >
              <div className="relative h-full min-h-[500px] flex items-center justify-center">
                {/* Animated AI Nodes */}
                {[
                  { x: 20, y: 20, delay: 0 },
                  { x: 80, y: 30, delay: 0.2 },
                  { x: 50, y: 60, delay: 0.4 },
                  { x: 30, y: 80, delay: 0.6 },
                  { x: 70, y: 70, delay: 0.8 },
                ].map((node, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#007AFF] to-[#6366F1] flex items-center justify-center text-white text-xs font-bold shadow-lg"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: node.delay,
                      ease: "easeInOut",
                    }}
                  >
                    AI
                  </motion.div>
                ))}
                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  <motion.line
                    x1="20%"
                    y1="20%"
                    x2="50%"
                    y2="60%"
                    stroke="#007AFF"
                    strokeWidth="2"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <motion.line
                    x1="50%"
                    y1="60%"
                    x2="80%"
                    y2="30%"
                    stroke="#6366F1"
                    strokeWidth="2"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  />
                </svg>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-2xl border border-border shadow-lg bg-background">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-foreground font-medium">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-2 rounded-xl border-gray-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-foreground font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-2 rounded-xl border-gray-300"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-foreground font-medium">
                        Company
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        className="mt-2 rounded-xl border-gray-300"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-foreground font-medium">
                        Message
                      </Label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent"
                        placeholder="Tell us about your automation needs..."
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-2xl bg-[#007AFF] text-white hover:bg-[#0056CC] hover:shadow-lg hover:shadow-[#007AFF]/30 transition-all text-lg glow-effect disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : (
                        <>
                          Book 15-Minute Demo
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Privacy-first automation for modern businesses. We reply within 24 hours.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

