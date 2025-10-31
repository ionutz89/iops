"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Code, Zap } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 scroll-mt-24 px-6 md:px-12">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Built by DevOps and AI Experts
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our team of senior engineers has over 10 years experience in
            Kubernetes, n8n Workflows, and Claude MCP automation. We help tech
            teams shift from manual ops to self-healing systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 mx-auto mb-4 text-[#007AFF]" />
                <h3 className="text-xl font-semibold mb-2">
                  10+ Years Experience
                </h3>
                <p className="text-muted-foreground">
                  Senior engineers with deep expertise in infrastructure
                  automation
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full text-center">
              <CardContent className="pt-6">
                <Code className="h-12 w-12 mx-auto mb-4 text-[#007AFF]" />
                <h3 className="text-xl font-semibold mb-2">
                  AI-Powered Solutions
                </h3>
                <p className="text-muted-foreground">
                  Specialized in Claude MCP, n8n, and Kubernetes automation
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full text-center">
              <CardContent className="pt-6">
                <Zap className="h-12 w-12 mx-auto mb-4 text-[#007AFF]" />
                <h3 className="text-xl font-semibold mb-2">
                  Self-Healing Systems
                </h3>
                <p className="text-muted-foreground">
                  Transform manual operations into autonomous, intelligent
                  workflows
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Optional Founder Section - can be uncommented when founder photo/bio is available */}
        {/*
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                  [Founder Initials]
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-2">[Founder Name]</h3>
                  <p className="text-muted-foreground">
                    [Founder bio - e.g., "10+ years building production systems at scale. Former SRE at [Company]."]
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        */}
      </div>
    </section>
  );
}


