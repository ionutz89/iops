"use client";

// Force dynamic rendering to avoid prerendering issues
export const dynamic = "force-dynamic";

import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
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
            About <span className="gradient-text">IOPS</span>
          </motion.h1>
        </div>
      </section>

      {/* Personal Note from Founder */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-8 md:p-12 border border-border"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#007AFF] to-[#6366F1] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                I
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">A Note from Ionut</h3>
                <p className="text-sm text-muted-foreground">Founder, IOPS</p>
              </div>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I built IOPS because I was tired of watching talented teams burn out on repetitive operations work.
                Over the past 10+ years, I've specialized in DevOps and AI automation—helping companies scale their infrastructure
                without the chaos that usually comes with growth.
              </p>
              <p>
                Here's what that looks like in practice: we helped one SaaS company cut deployment time from 4 hours to 12 minutes.
                Another client eliminated 90% of their manual incident responses. These aren't flukes—they're the result of
                systematic automation that actually works.
              </p>
              <p className="font-medium text-foreground">
                If your operations feel like they're holding your business back, let's change that.
              </p>
              <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-border/50">
                <a
                  href="https://www.linkedin.com/in/ionutiorgu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#007AFF] hover:text-[#0051D5] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Connect on LinkedIn
                </a>
                <a
                  href="https://ionut.vip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#007AFF] hover:text-[#0051D5] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Visit personal site
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Who We Are
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              We're a specialized team that transforms chaotic operations into self-running systems.
              No more 3 AM alerts. No more manual deployments. No more wondering if your infrastructure
              can handle the next growth spike.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              We build intelligent automation that actually works—the kind that catches problems before
              they become incidents and scales without adding headcount.
            </p>
            <p className="text-xl font-semibold text-[#007AFF]">
              Smarter Systems. Fewer Headaches.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Team */}
      <section className="py-24 bg-muted">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground"
          >
            The Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ionut",
                title: "Founder & DevOps/AI Automation Specialist",
                description: "10+ years building intelligent systems that scale businesses. Specializes in Kubernetes, Azure, and AI-driven automation.",
              },
              {
                name: "Maria",
                title: "DevOps Expert",
                description: "Specializes in cloud infrastructure and CI/CD pipelines. Turns complex deployments into one-click operations.",
              },
              {
                name: "Daniel",
                title: "Workflow Engineer",
                description: "Designs seamless automation workflows for complex operations. Makes the impossible feel inevitable.",
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="rounded-2xl border border-border shadow-sm hover:shadow-md transition-all bg-background">
                  <CardContent className="p-8 text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#007AFF] to-[#6366F1] mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                      {member.name[0]}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{member.name}</h3>
                    <p className="text-sm text-[#007AFF] font-medium mb-3">{member.title}</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Operations should accelerate growth, not slow it down. We build AI-powered systems that handle
              the repetitive work so your team can focus on what actually moves the needle.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every automation we deploy runs 24/7, catches issues before they become fires, and scales
              seamlessly without adding headcount. That's not a promise—it's how we work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 pb-32 bg-gradient-to-br from-blue-50 via-background to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#007AFF] to-[#6366F1] rounded-2xl p-8 md:p-12 text-center text-white shadow-xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Stop Fighting Fires?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Book your free 30-minute automation audit with Ionut. We'll identify your biggest operational
              bottlenecks and show you exactly how to automate them.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-[#007AFF] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Your Free Audit
            </a>
            <p className="text-sm mt-4 opacity-90 font-medium">
              No sales pitch. Just real insights you can use.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

