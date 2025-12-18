"use client";

import { useEffect, useState, useRef } from "react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
}

const nodeLabels = [
  "Website",
  "Database",
  "AI Assistant",
  "System Monitoring",
  "Auto Scaling",
  "Team Alerts",
  "ChatBot",
];

// Calculate bubble size based on text length
const getBubbleSize = (label: string, isMobile: boolean) => {
  const charCount = label.length;
  const mobileScale = isMobile ? 0.7 : 1;

  let width: number;
  if (charCount > 20) {
    width = 160 * mobileScale;
  } else if (charCount > 12) {
    width = 130 * mobileScale;
  } else {
    width = 100 * mobileScale;
  }

  return { width, radius: width / 2 };
};

export function AnimatedWorkflow() {
  const [containerSize, setContainerSize] = useState({
    width: 800,
    height: 400,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<[number, number][]>([]);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Client-side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle resize
  useEffect(() => {
    if (!isClient) return;

    const updateSize = () => {
      const width = Math.min(800, window.innerWidth - 40);
      const height = window.innerWidth < 768 ? 500 : 400;
      const mobile = window.innerWidth < 768;
      setContainerSize({ width, height });
      setIsMobile(mobile);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [isClient]);

  // Generate nodes once
  useEffect(() => {
    if (!isClient || nodes.length > 0) return;

    const cols = isMobile ? 2 : 3;
    const rows = Math.ceil(nodeLabels.length / cols);

    const generatedNodes: Node[] = nodeLabels.map((label, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = ((col + 0.5) / cols) * 100;
      const y = ((row + 0.5) / rows) * 100;

      return { id: `node-${i}`, label, x, y };
    });

    setNodes(generatedNodes);

    // Generate connections
    const generatedConnections: [number, number][] = [];
    generatedNodes.forEach((_, i) => {
      const target = (i + 1) % generatedNodes.length;
      if (target !== i) {
        generatedConnections.push([i, target]);
      }
    });
    setConnections(generatedConnections);
  }, [isClient, isMobile, nodes.length]);

  if (!isClient) {
    return <div className="w-full h-[400px]" />;
  }

  return (
    <div className="w-full flex justify-center py-8 px-4">
      <div
        ref={containerRef}
        className="relative mx-auto"
        style={{ width: containerSize.width, height: containerSize.height }}
      >
        {/* Connections - SVG lines */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ width: "100%", height: "100%", zIndex: 0 }}
        >
          {connections.map(([fromIndex, toIndex], i) => {
            const fromNode = nodes[fromIndex];
            const toNode = nodes[toIndex];
            if (!fromNode || !toNode) return null;

            const x1 = (fromNode.x / 100) * containerSize.width;
            const y1 = (fromNode.y / 100) * containerSize.height;
            const x2 = (toNode.x / 100) * containerSize.width;
            const y2 = (toNode.y / 100) * containerSize.height;

            return (
              <line
                key={`connection-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(0, 184, 217, 0.3)"
                strokeWidth="2"
                strokeLinecap="round"
                className="dark:stroke-[rgba(0,229,255,0.3)]"
              />
            );
          })}
        </svg>

        {/* Nodes - Static bubbles */}
        {nodes.map((node) => {
          const bubbleSize = getBubbleSize(node.label, isMobile);
          const x = (node.x / 100) * containerSize.width - bubbleSize.radius;
          const y = (node.y / 100) * containerSize.height - bubbleSize.radius;

          return (
            <div
              key={node.id}
              className="absolute z-10 bg-white/90 dark:bg-[#1C1E22] text-gray-800 dark:text-gray-200 font-semibold shadow-lg rounded-full flex items-center justify-center text-center border border-gray-200 dark:border-white/10 transition-transform duration-300 hover:scale-105"
              style={{
                left: x,
                top: y,
                width: bubbleSize.width,
                height: bubbleSize.width,
                fontSize: isMobile ? "10px" : "12px",
                padding: "8px",
              }}
            >
              <span className="leading-tight">{node.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
