"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@formspree/react";
import { CheckCircle2, Send } from "lucide-react";
import { useState } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function ContactForm() {
  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_ID || "placeholder"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

      // Submit the form
      await handleSubmit(e);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (state.succeeded) {
    return (
      <section id="contact" className="py-24 md:py-32 scroll-mt-24 px-6 md:px-12">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <CardContent className="pt-12 pb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="flex justify-center mb-6"
                >
                  <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </div>
                </motion.div>
                <h3 className="text-3xl font-bold mb-4">Thank You!</h3>
                <p className="text-lg text-muted-foreground mb-8">
                  We&apos;ve received your message and will get back to you within 24 hours
                  to schedule your free assessment.
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Submit Another Request
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 md:py-32 scroll-mt-24 px-6 md:px-12">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Start Your Transformation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book a 15-Minute Demo to see how AI automation can transform your operations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle>Get Your Free Assessment</CardTitle>
              <CardDescription>
                Tell us about your challenges and we&apos;ll show you how AI can help
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Acme Inc."
                    required
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us about your DevOps challenges..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="rounded-xl bg-[#007AFF] text-white px-6 py-3 hover:bg-[#0056CC] transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={state.submitting || isSubmitting}
                  aria-label="Book a 15-minute demo"
                >
                  {state.submitting || isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Book 15-Minute Demo
                    </>
                  )}
                </Button>

                {state.errors && (
                  <div className="text-sm text-red-500 text-center">
                    There was an error submitting the form. Please try again.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Privacy-first automation solutions for modern DevOps teams.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
