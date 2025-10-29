"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function SocialProof() {
  const logos = [
    { name: "AWS", src: "/logos/aws.svg" },
    { name: "Google Cloud", src: "/logos/google.svg" },
    { name: "n8n", src: "/logos/n8n.svg" },
    { name: "Claude MCP", src: "/logos/claude.svg" },
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900/50">
      <div className="container px-4 md:px-6">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6"
        >
          Trusted by leading tech teams
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={64}
                height={32}
                className="object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

