"use client";

import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle2, ShieldCheck, FileKey, Scale, type LucideIcon } from "lucide-react";

interface TrustSignal {
  icon: LucideIcon;
  title: string;
  description: string;
}

const trustSignals: TrustSignal[] = [
  {
    icon: ShieldCheck,
    title: "SSL Secured & Encrypted",
    description: "All data transfer is encrypted via TLS 1.3 standards.",
  },
  {
    icon: FileKey,
    title: "100% Client Ownership",
    description: "You own the code, data, and IP from day one.",
  },
  {
    icon: Scale,
    title: "Strict NDA Protection",
    description: "Binding Non-Disclosure Agreements for all projects.",
  },
];

const securityHighlights = [
  "End-to-end encryption",
  "GDPR compliant processes",
  "Secure code delivery",
  "Transparent documentation",
];

export function TrustBadges() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-[#0B0C10] dark:to-[#121417] transition-colors duration-300">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium mb-4">
            <Shield className="h-4 w-4" />
            <span>Your Trust, Our Priority</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0F0F0F] dark:text-white">
            Built on Security & Transparency
          </h2>
          <p className="text-lg text-[#333] dark:text-white/70 max-w-2xl mx-auto">
            We protect your data, respect your ownership, and guarantee confidentiality
            at every step of our partnership.
          </p>
        </motion.div>

        {/* Trust Signal Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12"
        >
          {trustSignals.map((signal, index) => {
            const IconComponent = signal.icon;
            return (
              <motion.div
                key={signal.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 border border-green-200 dark:border-green-800/50">
                  <IconComponent className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-[#0F0F0F] dark:text-white text-base mb-1">
                    {signal.title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {signal.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Security Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {securityHighlights.map((highlight, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 text-sm text-[#333] dark:text-white/80"
            >
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{highlight}</span>
            </div>
          ))}
        </motion.div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>All client data is encrypted at rest and in transit</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

