"use client";

import { motion } from "framer-motion";

export function BrandIdentity() {
  return (
    <section className="py-12 md:py-16 bg-background border-b">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <p className="text-lg font-medium text-muted-foreground">
            Intelligent Operations. Automated.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            IOPS means Intelligent Operations. We build autonomous DevOps
            systems for teams that want to scale without chaos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
