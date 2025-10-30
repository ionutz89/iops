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
              IOPS (Intelligent Operations) helps businesses turn complex operations into self-running systems using AI automation.
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
                title: "Founder & AI Automation Consultant",
                description: "10+ years building intelligent systems that scale businesses.",
              },
              {
                name: "Maria",
                title: "DevOps Expert",
                description: "Specializes in cloud infrastructure and automation pipelines.",
              },
              {
                name: "Daniel",
                title: "Workflow Engineer",
                description: "Designs seamless automation workflows for complex operations.",
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
            <p className="text-lg text-muted-foreground leading-relaxed">
              Operations should never slow growth. We design AI systems that handle the work so your team focuses on innovation.
              Every automation we build is designed to make your business run smoother, faster, and more reliably — 24/7.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

