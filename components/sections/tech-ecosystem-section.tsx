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
            opacity: 1 !important;
          }
        `
      }} />
    <section className="py-20 bg-[#F9FAFB] dark:bg-[#0B0C10] relative overflow-hidden transition-colors duration-300">
      {/* Enhanced gradient strip background with cyan accent - Dual theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00B8D9]/3 dark:via-[#00E5FF]/10 to-transparent opacity-60" />
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
          className="text-center text-3xl md:text-4xl font-bold text-[#0F0F0F] dark:text-white mb-4"
        >
          Trusted Platforms We Build On
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-lg text-[#333] dark:text-white/70 mb-12 max-w-2xl mx-auto"
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
              {/* Logo Container - grayscale filter with color on hover */}
              <div className="relative mb-3 transition-all duration-300">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={160}
                  height={45}
                  className="h-11 w-auto grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 dark:opacity-50 dark:invert dark:grayscale dark:group-hover:opacity-100 dark:group-hover:grayscale-0 filter"
                  priority={index < 2}
                  style={{ width: 'auto', objectFit: 'contain' }}
                />
              </div>

              {/* Tooltip - Enhanced with dual-theme support */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 bg-[#0F0F0F] dark:bg-[#121417] text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap pointer-events-none transition-opacity duration-200 shadow-md border border-gray-300 dark:border-white/10 z-10">
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

