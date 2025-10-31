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
import { CheckCircle2, Send, Shield } from "lucide-react";
import Script from "next/script";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formspreeResponse = await fetch(
        `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID || "your_form_id"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (formspreeResponse.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
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
    <>
      {/* SEO Structured Data */}
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "IOPS",
            url: "https://iops.pro",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "sales",
              url: "https://iops.pro/contact",
            },
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-white dark:from-slate-900 dark:via-indigo-900 dark:to-black animate-gradient relative overflow-hidden">
        <Navigation />

        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Breathing light gradient orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-6 text-center"
            >
              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
              >
                Make Your Operations Run Themselves.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
              >
                We help growing teams automate workflows, cut costs, and deliver results faster.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg text-indigo-600 dark:text-indigo-300 font-medium max-w-xl mx-auto"
              >
                Example: A logistics firm cut manual reporting by 45% using IOPS automation.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section id="contact-form" className="py-16 md:py-24 relative z-10">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div
                variants={fadeUp}
                className="mb-12 text-center md:text-left"
              >
                <p className="text-muted-foreground text-xl md:text-2xl">
                  Tell us what slows your business down. We&apos;ll show you how automation pays for itself.
                </p>
              </motion.div>

              {/* Extra padding between intro and form */}
              <div className="mb-8 md:mb-12" />

              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="rounded-2xl border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
                        className="flex justify-center mb-6"
                      >
                        <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                          <CheckCircle2 className="h-10 w-10 text-white" />
                        </div>
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-4 text-foreground">
                        Thank You!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        We&apos;ve received your message and will get back to you
                        within 24 hours.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setSubmitSuccess(false)}
                        className="rounded-xl border-green-500/30 text-green-400 hover:bg-green-500/10 transition-all duration-300"
                      >
                        Submit Another Request
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <Card className="rounded-2xl border shadow-2xl bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6 md:p-8 lg:p-10">
                    <form
                      onSubmit={handleSubmit}
                      action={`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID || "your_form_id"}`}
                      method="POST"
                      className="space-y-6"
                    >
                      <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <Label htmlFor="name" className="text-foreground font-medium">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-2 rounded-xl bg-background/50 border-input text-foreground placeholder:text-muted-foreground focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </motion.div>

                      <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <Label htmlFor="email" className="text-foreground font-medium">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-2 rounded-xl bg-background/50 border-input text-foreground placeholder:text-muted-foreground focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300"
                          placeholder="john@company.com"
                        />
                      </motion.div>

                      <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <Label htmlFor="company" className="text-foreground font-medium">
                          Company <span className="text-muted-foreground text-sm font-normal">(optional)</span>
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          className="mt-2 rounded-xl bg-background/50 border-input text-foreground placeholder:text-muted-foreground focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300"
                          placeholder="Acme Inc."
                        />
                      </motion.div>

                      <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <Label htmlFor="message" className="text-foreground font-medium">
                          Message *
                        </Label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="mt-2 w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-300"
                          placeholder="What challenges are slowing your business down?"
                        />
                      </motion.div>

                      <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-4"
                      >
                        <Button
                          type="submit"
                          size="lg"
                          className="group w-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-all duration-300 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden shadow-lg shadow-indigo-500/50"
                          disabled={isSubmitting}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {isSubmitting ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                />
                                Sending...
                              </>
                            ) : (
                              <>
                                Send Message
                                <Send className="h-5 w-5" />
                              </>
                            )}
                          </span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={false}
                          />
                        </Button>
                        <p className="text-center text-muted-foreground text-sm">
                          We&apos;ll respond within 24 hours.
                        </p>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </section>

        {/* Calendly CTA Section */}
        <section className="py-12 md:py-16 relative z-10">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.a
                href="https://calendly.com/iops-ai/assessment"
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-all duration-300 shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/70 relative overflow-hidden text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">
                  Book a free strategy call
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 md:py-16 relative z-10 border-t border-border/50">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
              </div>
              <p className="text-foreground text-sm md:text-base">
                Privacy-first automation for modern businesses • Enterprise-grade security.
              </p>
              <p className="text-muted-foreground text-sm md:text-base">
                Trusted by business owners in finance, logistics, and SaaS to streamline operations with AI.
              </p>
            </motion.div>
          </div>
        </footer>
      </main>
    </>
  );
}
