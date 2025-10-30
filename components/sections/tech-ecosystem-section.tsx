"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  {
    name: "AWS",
    src: "/logos/aws.svg",
    tooltip: "Reliable cloud foundation for enterprise-grade performance.",
    detailedTooltip: "Reliable cloud foundation for enterprise-grade performance.",
  },
  {
    name: "Google Cloud",
    src: "/logos/google.svg",
    tooltip: "Scalable infrastructure and AI tools.",
    detailedTooltip: "Scalable infrastructure and AI tools.",
  },
  {
    name: "n8n",
    src: "/logos/n8n.svg",
    tooltip: "Connects all your workflows and systems.",
    detailedTooltip: "Connects all your workflows and systems.",
  },
  {
    name: "Claude MCP",
    src: "/logos/claude.svg",
    tooltip: "Brings intelligent decision-making to your automation.",
    detailedTooltip: "Brings intelligent decision-making to your automation.",
  },
];

export function TechEcosystemSection() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .tech-logo-group:hover img {
            filter: brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%) !important;
          }
        `
      }} />
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="text-center text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          Trusted Platforms We Build On
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Our intelligent automation systems leverage trusted technologies for reliability, scalability, and performance.
        </motion.p>

        {/* Logo Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.2,
          }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 pb-8"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.3 + index * 0.1,
              }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center group relative tech-logo-group transition-transform duration-300"
            >
              {/* Logo Container */}
              <div className="relative mb-3">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={160}
                  height={48}
                  className="h-14 md:h-16 w-auto opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 dark:opacity-70 dark:invert dark:grayscale dark:group-hover:opacity-100 dark:group-hover:invert-0 dark:group-hover:grayscale-0"
                  priority={index < 2}
                />
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground text-center max-w-[160px]">
                {logo.detailedTooltip || logo.tooltip}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    </>
  );
}

