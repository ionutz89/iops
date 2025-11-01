"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function SocialProof() {
  const logos = [
    { name: "AWS", src: "/logos/aws.svg" },
    { name: "Google Cloud", src: "/logos/google.svg" },
    { name: "n8n", src: "/logos/n8n.svg" },
    { name: "Dify AI", src: "/logos/dify.svg" },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="container px-6 md:px-12">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xl font-semibold text-gray-700 dark:text-gray-100 mb-8 transition-colors duration-300"
        >
          Trusted by leading tech teams
        </motion.h3>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-10 opacity-80"
        >
          {logos.map((logo) => (
            <Image
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              width={100}
              height={32}
              className="h-8 w-auto hover:opacity-100 transition-opacity"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
