"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
}

const nodeLabels = [
  "Website",
  "Database",
  "AI Assistant for Operations",
  "Automatic System Monitoring",
  "Smart Resource Scaling",
  "Instant Team Alerts",
  "ChatBot",
];

// Calculate bubble size based on text length and screen width
const getBubbleRadius = (label: string, isMobile: boolean) => {
  // Estimate width based on character count
  // Longer text = bigger bubble, but smaller on mobile
  const charCount = label.length;
  const mobileScale = isMobile ? 0.65 : 1; // 35% smaller on mobile
  
  if (charCount > 25) return 90 * mobileScale; // Large bubble
  if (charCount > 15) return 70 * mobileScale; // Medium bubble
  return 50 * mobileScale; // Small bubble
};

// Function to check if two circles overlap with proper spacing
const checkOverlap = (
  x1: number,
  y1: number,
  radius1: number,
  x2: number,
  y2: number,
  radius2: number,
  extraPadding: number = 40
) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const minDistance = radius1 + radius2 + extraPadding;
  return distance < minDistance;
};

export function AnimatedWorkflow() {
  const [containerSize, setContainerSize] = useState({ width: 800, height: 500 });
  const [isMobile, setIsMobile] = useState(false);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<[number, number][]>([]);
  const [nodePositions, setNodePositions] = useState<{ [key: string]: { x: number; y: number } }>({});

  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(900, window.innerWidth - 40);
      const height = window.innerWidth < 768 
        ? Math.min(600, window.innerHeight * 0.7) // Taller on mobile
        : Math.min(500, window.innerHeight * 0.6);
      const mobile = window.innerWidth < 768;
      setContainerSize({ width, height });
      setIsMobile(mobile);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    // Generate non-overlapping random positions for nodes with size-aware spacing
    const generatedNodes: Node[] = [];
    // More padding on mobile to prevent overlap
    const extraPadding = isMobile ? 30 : 50;

    nodeLabels.forEach((label, i) => {
      let x: number, y: number;
      let attempts = 0;
      const maxAttempts = 300; // More attempts for better positioning
      const currentBubbleRadius = getBubbleRadius(label, isMobile);

      do {
        // Use wider range but with margin from edges based on bubble size
        const margin = (currentBubbleRadius / containerSize.width) * 100 + (isMobile ? 8 : 5);
        x = Math.random() * (100 - 2 * margin) + margin;
        y = Math.random() * (100 - 2 * margin) + margin;
        attempts++;
      } while (
        attempts < maxAttempts &&
        generatedNodes.some((node) => {
          const nodeBubbleRadius = getBubbleRadius(node.label, isMobile);
          return checkOverlap(
            (x / 100) * containerSize.width,
            (y / 100) * containerSize.height,
            currentBubbleRadius,
            (node.x / 100) * containerSize.width,
            (node.y / 100) * containerSize.height,
            nodeBubbleRadius,
            extraPadding
          );
        })
      );

      generatedNodes.push({
        id: `node-${i}`,
        label,
        x,
        y,
      });
    });

    setNodes(generatedNodes);

    // Initialize node positions
    const initialPositions: { [key: string]: { x: number; y: number } } = {};
    generatedNodes.forEach((node) => {
      initialPositions[node.id] = {
        x: (node.x / 100) * containerSize.width,
        y: (node.y / 100) * containerSize.height,
      };
    });
    setNodePositions(initialPositions);

    // Generate random connections (each node connects to 1-2 random other nodes)
    const generatedConnections: [number, number][] = [];
    generatedNodes.forEach((_, i) => {
      const numConnections = Math.floor(Math.random() * 2) + 1; // 1-2 connections per node
      for (let j = 0; j < numConnections; j++) {
        let targetIndex = Math.floor(Math.random() * generatedNodes.length);
        // Avoid self-connection
        while (targetIndex === i) {
          targetIndex = Math.floor(Math.random() * generatedNodes.length);
        }
        // Avoid duplicate connections
        if (!generatedConnections.some(([a, b]) => (a === i && b === targetIndex) || (a === targetIndex && b === i))) {
          generatedConnections.push([i, targetIndex]);
        }
      }
    });
    setConnections(generatedConnections);
  }, [containerSize.width, containerSize.height, isMobile]);

  const updateNodePosition = useCallback((nodeId: string, x: number, y: number) => {
    setNodePositions((prev) => ({
      ...prev,
      [nodeId]: { x, y },
    }));
  }, []);

  return (
    <div className="w-full flex justify-center py-12 overflow-hidden px-4">
      {/* Enhanced container with overflow handling */}
      <div
        className="relative mx-auto overflow-hidden rounded-2xl"
        style={{
          width: containerSize.width,
          height: containerSize.height,
        }}
      >
        {/* Connections */}
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {connections.map(([fromIndex, toIndex], i) => {
            const fromNode = nodes[fromIndex];
            const toNode = nodes[toIndex];
            if (!fromNode || !toNode) return null;

            const fromPos = nodePositions[fromNode.id] || {
              x: (fromNode.x / 100) * containerSize.width,
              y: (fromNode.y / 100) * containerSize.height,
            };
            const toPos = nodePositions[toNode.id] || {
              x: (toNode.x / 100) * containerSize.width,
              y: (toNode.y / 100) * containerSize.height,
            };

            return (
              <motion.line
                key={`connection-${i}`}
                animate={{
                  x1: fromPos.x,
                  y1: fromPos.y,
                  x2: toPos.x,
                  y2: toPos.y,
                  opacity: 0.6,
                }}
                initial={{
                  x1: fromPos.x,
                  y1: fromPos.y,
                  x2: toPos.x,
                  y2: toPos.y,
                  opacity: 0,
                }}
                stroke="rgba(0, 184, 217, 0.4)"
                strokeWidth="2"
                strokeLinecap="round"
                className="dark:stroke-[rgba(0,229,255,0.4)]"
                transition={{
                  opacity: { duration: 1.5, delay: i * 0.2 + 0.5 },
                  x1: { type: "spring", stiffness: 100, damping: 20 },
                  y1: { type: "spring", stiffness: 100, damping: 20 },
                  x2: { type: "spring", stiffness: 100, damping: 20 },
                  y2: { type: "spring", stiffness: 100, damping: 20 },
                }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node, index) => {
          const baseX = (node.x / 100) * containerSize.width;
          const baseY = (node.y / 100) * containerSize.height;

          // Very small, gentler floating animation to prevent overlap during motion
          // Even smaller on mobile to prevent any overlap
          const floatRadius = isMobile ? 4 : 8;
          const duration = 6 + Math.random() * 2;
          const delay = index * 0.5;

          return (
            <motion.div
              key={node.id}
              className="absolute z-10"
              style={{
                left: baseX,
                top: baseY,
              }}
              initial={{ opacity: 0, scale: 0, x: -50, y: -50 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: [
                  -50,
                  -50 + Math.sin(0) * floatRadius,
                  -50 + Math.sin(Math.PI / 2) * floatRadius,
                  -50 + Math.sin(Math.PI) * floatRadius,
                  -50 + Math.sin((3 * Math.PI) / 2) * floatRadius,
                  -50,
                ],
                y: [
                  -50,
                  -50 + Math.cos(0) * floatRadius,
                  -50 + Math.cos(Math.PI / 2) * floatRadius,
                  -50 + Math.cos(Math.PI) * floatRadius,
                  -50 + Math.cos((3 * Math.PI) / 2) * floatRadius,
                  -50,
                ],
              }}
              transition={{
                opacity: { duration: 0.6, delay: index * 0.15 },
                scale: { duration: 0.6, delay: index * 0.15 },
                x: {
                  duration,
                  delay,
                  repeat: Infinity,
                  ease: "linear",
                },
                y: {
                  duration,
                  delay,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              onUpdate={(latest) => {
                // Track actual position for connection lines
                if (typeof latest.x === "number" && typeof latest.y === "number") {
                  updateNodePosition(node.id, baseX + latest.x + 50, baseY + latest.y + 50);
                }
              }}
            >
              {/* Enhanced bubble with dual-theme frosted glass effect and proper overflow handling */}
              <motion.div
                className="relative bg-white/90 dark:bg-[#1C1E22] text-gray-800 dark:text-gray-200 text-xs md:text-sm font-semibold shadow-lg dark:shadow-xl rounded-full px-4 py-3 flex items-center justify-center text-center backdrop-blur-md border border-gray-200 dark:border-white/10"
                style={{
                  maxWidth: "160px",
                  minWidth: "80px",
                  wordWrap: "break-word",
                  overflow: "hidden",
                }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 30px rgba(0, 184, 217, 0.4)",
                  borderColor: "rgba(0, 184, 217, 0.3)"
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Improved text wrapping with responsive sizing and proper line breaks */}
                <p className="break-words whitespace-normal leading-tight text-xs md:text-sm p-1">
                  {node.label}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
