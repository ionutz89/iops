"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "@formspree/react";
import { CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import { trackCTAClick, trackFormSubmit } from "@/lib/analytics";

export function ContactForm() {
  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_ID || "placeholder"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    challenge: "",
    budget: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
            Book a 15-Minute AI Ops Demo to see how AI automation can transform your operations
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
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
                  <Label htmlFor="challenge">Current Challenge *</Label>
                  <Select
                    name="challenge"
                    required
                    value={formData.challenge}
                    onValueChange={(value) => handleInputChange("challenge", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your main challenge" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="too-many-incidents">
                        Too many production incidents
                      </SelectItem>
                      <SelectItem value="slow-deployments">
                        Slow deployment process
                      </SelectItem>
                      <SelectItem value="manual-tasks">
                        Too many manual tasks
                      </SelectItem>
                      <SelectItem value="scaling-issues">
                        Scaling and infrastructure issues
                      </SelectItem>
                      <SelectItem value="team-burnout">
                        Team burnout from operations
                      </SelectItem>
                      <SelectItem value="other">
                        Other / Multiple challenges
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="challenge" value={formData.challenge} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select
                    name="budget"
                    value={formData.budget}
                    onValueChange={(value) => handleInputChange("budget", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-25k">Under $25K</SelectItem>
                      <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                      <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                      <SelectItem value="100k-plus">$100K+</SelectItem>
                      <SelectItem value="not-sure">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="budget" value={formData.budget} />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="rounded-xl bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition w-full"
                  disabled={state.submitting}
                  onClick={() => {
                    trackCTAClick('Book a 15-Minute AI Ops Demo', 'contact_form');
                    trackFormSubmit('contact', true);
                  }}
                  aria-label="Book a 15-minute AI Ops demo"
                >
                  {state.submitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Book a 15-Minute AI Ops Demo
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
      </div>
    </section>
  );
}
