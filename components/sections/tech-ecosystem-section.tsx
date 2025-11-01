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
    tooltip: "Scalable infrastructure and advanced AI tools.",
    detailedTooltip: "Scalable infrastructure and advanced AI tools.",
  },
  {
    name: "n8n",
    src: "/logos/n8n.svg",
    tooltip: "Connects all your workflows and systems.",
    detailedTooltip: "Connects all your workflows and systems.",
  },
  {
    name: "Dify AI",
    src: "/logos/dify.svg",
    tooltip: "Modern AI app and workflow engine for intelligent automation.",
    detailedTooltip: "Dify AI — modern AI app and workflow engine for intelligent automation.",
  },
];

export function TechEcosystemSection() {
  return (
    <>
      {/* Custom CSS for red hover effect on logos */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .tech-logo-group:hover img {
            filter: brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%) !important;
          }
        `
      }} />
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Subtle gradient strip background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-50" />
      <div className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto">
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
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 lg:gap-12 pb-8"
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
              className={`flex flex-col items-center justify-center group relative tech-logo-group transition-transform duration-300 hover:shadow-lg ${
                index > 0 && index % 2 === 0 ? 'sm:border-l sm:border-slate-200 dark:sm:border-slate-700 sm:pl-6' : ''
              } ${
                index > 0 && index % 4 === 0 ? 'md:border-l md:border-slate-200 dark:md:border-slate-700 md:pl-6' : ''
              }`}
            >
              {/* Logo Container - Consistent height ~40px, grayscale with red hover */}
              <div className="relative mb-3 transition-all duration-300">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={160}
                  height={40}
                  className="h-10 w-auto opacity-60 grayscale transition-all duration-300 dark:opacity-70 dark:invert dark:grayscale"
                  priority={index < 2}
                  style={{ height: '40px', width: 'auto' }}
                />
              </div>

              {/* Tooltip - Hidden until hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 bg-gray-800 dark:bg-gray-900 text-white dark:text-gray-200 text-xs rounded py-1 px-2 whitespace-nowrap pointer-events-none transition-opacity duration-200 shadow-lg z-10">
                {logo.detailedTooltip || logo.tooltip}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    </>
  );
}

