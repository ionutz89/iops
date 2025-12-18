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
import { executeTurnstile } from "@/lib/turnstile-loader";

// Animation variants - Hero only (form stays static for hydration)
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export default function Contact() {
  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://iops.pro/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: "https://iops.pro/contact",
      },
    ],
  };

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
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

      // Check if Formspree ID is configured
      if (!formspreeId || formspreeId === "your_form_id") {
        console.error(
          "Formspree ID is not configured. Please set NEXT_PUBLIC_FORMSPREE_ID in your environment variables."
        );
        alert("Form configuration error. Please contact support.");
        setIsSubmitting(false);
        return;
      }

      // Execute Turnstile (invisible mode) - REQUIRED for spam protection
      const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
      let turnstileToken: string | null = null;

      if (turnstileSiteKey) {
        try {
          turnstileToken = await executeTurnstile();

          if (!turnstileToken) {
            console.error("Turnstile execution returned no token");
            alert(
              "Security verification failed. Please check the browser console for details."
            );
            setIsSubmitting(false);
            return;
          }

          // Verify token server-side - REQUIRED
          const verifyResponse = await fetch("/api/verify-turnstile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: turnstileToken }),
          });

          const verifyData = await verifyResponse.json();

          if (!verifyData.success) {
            console.error(
              "Turnstile server-side verification failed:",
              verifyData
            );
            alert(
              `Security verification failed: ${
                verifyData.error || "Unknown error"
              }. Please check the browser console.`
            );
            setIsSubmitting(false);
            return;
          }
        } catch (error) {
          console.error("Turnstile error:", error);
          alert(
            `Security verification error: ${
              error instanceof Error ? error.message : "Unknown error"
            }. Please check the browser console.`
          );
          setIsSubmitting(false);
          return;
        }
      } else {
        console.warn(
          "Turnstile site key not configured. Skipping Turnstile verification. For production, set NEXT_PUBLIC_TURNSTILE_SITE_KEY."
        );
        // Continue without Turnstile for local development
      }

      // Submit the form to Formspree (with Turnstile token if available)
      const formspreeBody: any = { ...formData };
      if (turnstileToken) {
        formspreeBody._turnstile = turnstileToken;
      }

      const formspreeResponse = await fetch(
        `https://formspree.io/f/${formspreeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formspreeBody),
        }
      );

      // Parse the response body to check for errors
      const responseData = await formspreeResponse.json();

      if (formspreeResponse.ok && !responseData.error) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        // Log the error for debugging
        console.error("Formspree submission error:", {
          status: formspreeResponse.status,
          statusText: formspreeResponse.statusText,
          response: responseData,
        });

        // Show a more helpful error message
        const errorMessage =
          responseData.error ||
          responseData.message ||
          "Failed to submit form. Please try again.";
        alert(`Failed to submit form: ${errorMessage}`);
      }
    } catch (error) {
      // Log the error for debugging
      console.error("Form submission error:", error);
      alert("An error occurred. Please check your connection and try again.");
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
      {/* SEO Structured Data - Organization with ContactPoint */}
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
      {/* BreadcrumbList schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/*
        Mobile Safari Performance Fixes:
        - min-h-[100dvh] instead of min-h-screen (Safari address bar fix)
        - Hardware acceleration via transform: translateZ(0)
        - -webkit-font-smoothing: antialiased
        - -webkit-overflow-scrolling: touch
      */}
      <main
        className="min-h-[100dvh] bg-background relative overflow-hidden"
        style={{
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <Navigation />

        {/* Animated Gradient Background - matching homepage */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-background to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20" />

        {/* Floating gradient orbs - CSS only animation for better mobile performance */}
        <div
          className="fixed inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          {/* Static orbs with CSS animation - GPU accelerated, no JS blocking */}
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow hidden md:block"
            style={{
              transform: "translateZ(0)",
              willChange: "opacity",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse-slow hidden md:block"
            style={{
              transform: "translateZ(0)",
              willChange: "opacity",
              animationDelay: "2s",
            }}
          />
        </div>

        {/* Subtle gradient overlay - static on mobile for performance */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(0, 122, 255, 0.1) 0%, transparent 50%)",
            transform: "translateZ(0)",
          }}
        />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              transition={{ duration: 0.6, ease: "easeOut" }}
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
                We help growing teams automate workflows, cut costs, and deliver
                results faster.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg text-blue-600 dark:text-blue-400 font-medium max-w-xl mx-auto transition-colors duration-300"
              >
                Example: A logistics firm cut manual reporting by 45% using IOPS
                automation.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Form Section - Static for Mobile Safari (no whileInView on form fields) */}
        <section
          id="contact-form"
          className="py-16 md:py-24 relative z-10"
          style={{
            transform: "translateZ(0)", // Force GPU layer
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            {/* Form intro - only animate on desktop after hydration */}
            <div className="mb-12 text-center md:text-left">
              <p className="text-muted-foreground text-xl md:text-2xl">
                Tell us what slows your business down. We&apos;ll show you how
                automation pays for itself.
              </p>
            </div>

            {/* Extra padding between intro and form */}
            <div className="mb-8 md:mb-12" />

            {submitSuccess ? (
              <Card className="rounded-2xl border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                      <CheckCircle2 className="h-10 w-10 text-white" />
                    </div>
                  </div>
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
            ) : (
              /*
                Form Card - Mobile Safari Fixes:
                - NO backdrop-blur (causes text disappearing on rubber-band scroll)
                - Hardware acceleration via transform: translateZ(0)
                - Form fields are STATIC (no initial="hidden") for instant visibility
              */
              <Card
                className="rounded-2xl border shadow-2xl bg-card/95"
                style={{
                  transform: "translateZ(0)",
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                }}
              >
                <CardContent className="p-6 md:p-8 lg:p-10">
                  <form
                    onSubmit={handleSubmit}
                    action={`https://formspree.io/f/${
                      process.env.NEXT_PUBLIC_FORMSPREE_ID || "your_form_id"
                    }`}
                    method="POST"
                    className="space-y-6"
                  >
                    {/* Form fields are STATIC - no animations that could hide them */}
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-foreground font-medium"
                      >
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-2 rounded-xl bg-background/50 border-input text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-colors duration-200"
                        placeholder="John Doe"
                        autoComplete="name"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="email"
                        className="text-foreground font-medium"
                      >
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-2 rounded-xl bg-background/50 border-input text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-colors duration-200"
                        placeholder="john@company.com"
                        autoComplete="email"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="company"
                        className="text-foreground font-medium"
                      >
                        Company{" "}
                        <span className="text-muted-foreground text-sm font-normal">
                          (optional)
                        </span>
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        className="mt-2 rounded-xl bg-background/50 border-input text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-colors duration-200"
                        placeholder="Acme Inc."
                        autoComplete="organization"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="message"
                        className="text-foreground font-medium"
                      >
                        Message *
                      </Label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="mt-2 w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors duration-200"
                        placeholder="What challenges are slowing your business down?"
                      />
                    </div>

                    <div className="flex flex-col items-center space-y-1">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        disabled={isSubmitting}
                        style={{ transform: "translateZ(0)" }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="h-5 w-5" />
                            </>
                          )}
                        </span>
                      </Button>

                      <span className="text-muted-foreground text-sm">or</span>

                      <a
                        href="https://calendly.com/me-ionut/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full px-8 py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] text-center"
                        style={{ transform: "translateZ(0)" }}
                      >
                        Book a free strategy call
                      </a>

                      <p className="text-center text-muted-foreground text-sm pt-2">
                        We&apos;ll respond within 24 hours.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Footer - Static for performance */}
        <footer className="py-12 md:py-16 relative z-10 border-t border-border/50">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-foreground text-sm md:text-base">
                Privacy-first automation for modern businesses •
                Enterprise-grade security.
              </p>
              <p className="text-muted-foreground text-sm md:text-base">
                Trusted by business owners in finance, logistics, and SaaS to
                streamline operations with AI.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
