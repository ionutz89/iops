"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  connections: string[];
}

const nodes: Node[] = [
  { id: "website", label: "Website", x: 20, y: 30, connections: ["ai-agent"] },
  { id: "database", label: "Database", x: 20, y: 70, connections: ["ai-agent"] },
  { id: "ai-agent", label: "AI Agent", x: 50, y: 50, connections: ["monitoring", "scaling"] },
  { id: "monitoring", label: "Monitoring", x: 80, y: 30, connections: ["notification"] },
  { id: "scaling", label: "Scaling", x: 80, y: 70, connections: ["notification"] },
  { id: "notification", label: "Notification", x: 65, y: 15, connections: [] },
];

const getNodePosition = (node: Node, containerWidth: number, containerHeight: number) => {
  return {
    x: (node.x / 100) * containerWidth,
    y: (node.y / 100) * containerHeight,
  };
};

export function AnimatedWorkflow() {
  const [containerSize, setContainerSize] = useState({ width: 600, height: 400 });

  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(600, window.innerWidth - 80);
      setContainerSize({ width, height: 400 });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const getConnectionPath = (
    from: Node,
    to: Node,
    width: number,
    height: number
  ): string => {
    const fromPos = getNodePosition(from, width, height);
    const toPos = getNodePosition(to, width, height);
    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const controlX = fromPos.x + dx * 0.5;
    return `M ${fromPos.x} ${fromPos.y} Q ${controlX} ${fromPos.y} ${controlX} ${(fromPos.y + toPos.y) / 2} T ${toPos.x} ${toPos.y}`;
  };

  return (
    <div className="w-full flex justify-center py-12">
      <div
        className="relative"
        style={{ width: containerSize.width, height: containerSize.height }}
      >
        {/* Connections */}
        <svg
          className="absolute inset-0"
          style={{ width: containerSize.width, height: containerSize.height }}
        >
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#007AFF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {nodes.map((node) =>
            node.connections.map((targetId) => {
              const targetNode = nodes.find((n) => n.id === targetId);
              if (!targetNode) return null;
              return (
                <motion.path
                  key={`${node.id}-${targetId}`}
                  d={getConnectionPath(
                    node,
                    targetNode,
                    containerSize.width,
                    containerSize.height
                  )}
                  fill="none"
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5,
                    ease: "easeInOut",
                  }}
                />
              );
            })
          )}
        </svg>

        {/* Nodes */}
        {nodes.map((node, index) => {
          const pos = getNodePosition(
            node,
            containerSize.width,
            containerSize.height
          );
          return (
            <motion.div
              key={node.id}
              className="absolute"
              style={{
                left: pos.x - 40,
                top: pos.y - 40,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <motion.div
                className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#007AFF] to-[#6366F1] flex items-center justify-center text-white text-xs font-semibold shadow-lg transition-shadow duration-300 hover:shadow-blue-400"
                whileHover={{ scale: 1.1 }}
                animate={{
                  y: [0, -5, 0, 5, 0],
                }}
                transition={{
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.15,
                  },
                }}
              >
                <span className="text-center px-2">{node.label}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

