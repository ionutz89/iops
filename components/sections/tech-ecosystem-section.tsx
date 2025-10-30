"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  {
    name: "AWS",
    src: "/logos/aws.svg",
    tooltip: "Infrastructure backbone",
    detailedTooltip: "The reliable foundation for global infrastructure",
  },
  {
    name: "Google Cloud",
    src: "/logos/google.svg",
    tooltip: "Reliable cloud and AI services",
    detailedTooltip: "Cloud and AI platform powering scalable automation",
  },
  {
    name: "n8n",
    src: "/logos/n8n.svg",
    tooltip: "Workflow automation engine",
    detailedTooltip: "Flexible automation engine connecting your workflows",
  },
  {
    name: "Claude MCP",
    src: "/logos/claude.svg",
    tooltip: "AI orchestration and reasoning system",
    detailedTooltip: "Connects AI models with tools and data for intelligent operations",
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
          transition={{ duration: 0.6 }}
          className="text-center text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          Powered by Proven AI & Cloud Platforms
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
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 pb-8"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center group relative tech-logo-group transition-transform duration-300"
            >
              {/* Logo Container */}
              <div className="relative mb-2">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={160}
                  height={48}
                  className="h-14 md:h-16 w-auto opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 dark:opacity-70 dark:invert dark:grayscale dark:group-hover:opacity-100 dark:group-hover:invert-0 dark:group-hover:grayscale-0"
                  priority={index < 2}
                />
              </div>

              {/* Tooltip */}
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <div className="relative bg-gray-900 dark:bg-gray-800 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
                  {logo.detailedTooltip || logo.tooltip}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    </>
  );
}

