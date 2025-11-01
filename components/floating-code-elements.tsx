"use client";

import { motion } from "framer-motion";

const codeSnippets = [
  { text: "kubectl apply -f deployment.yaml", x: "10%", y: "20%", delay: 0 },
  { text: "$ ai-agent deploy --auto", x: "80%", y: "15%", delay: 0.5 },
  { text: "n8n workflow: ✓ executed", x: "15%", y: "70%", delay: 1 },
  { text: "dify://workflow/ready", x: "75%", y: "75%", delay: 1.5 },
  { text: "incidents: 10 → 1", x: "50%", y: "85%", delay: 2 },
  { text: "savings: +$200k/year", x: "85%", y: "45%", delay: 0.8 },
];

export function FloatingCodeElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codeSnippets.map((snippet, index) => (
        <motion.div
          key={index}
          className="absolute text-xs md:text-sm font-mono text-muted-foreground/30"
          style={{ left: snippet.x, top: snippet.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 0.5, 0.5, 0],
            y: [20, 0, 0, -20],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: snippet.delay,
            ease: "easeInOut",
          }}
        >
          {snippet.text}
        </motion.div>
      ))}
    </div>
  );
}
