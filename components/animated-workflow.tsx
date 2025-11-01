"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

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
const getBubbleSize = (label: string, isMobile: boolean) => {
  // Estimate width based on character count
  const charCount = label.length;
  const mobileScale = isMobile ? 0.6 : 1; // Even smaller on mobile for better spacing

  // Return both width and approximate radius for collision detection
  let width: number;
  if (charCount > 25) {
    width = 180 * mobileScale; // Large bubble
  } else if (charCount > 15) {
    width = 140 * mobileScale; // Medium bubble
  } else {
    width = 100 * mobileScale; // Small bubble
  }

  return {
    width,
    radius: width / 2, // Use half the width as radius for collision detection
  };
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
  const [containerSize, setContainerSize] = useState({
    width: 800,
    height: 500,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<[number, number][]>([]);
  const [nodePositions, setNodePositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});
  const [userControlledNodes, setUserControlledNodes] = useState<Set<string>>(
    new Set()
  );
  const [dragStates, setDragStates] = useState<{
    [key: string]: {
      x: number;
      y: number;
      touchStart: { x: number; y: number } | null;
      isDragging: boolean;
    };
  }>({});
  const [desktopDragPositions, setDesktopDragPositions] = useState<{
    [key: string]: { x: number; y: number; startX: number; startY: number };
  }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesInitializedRef = useRef(false);

  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(900, window.innerWidth - 40);
      const height =
        window.innerWidth < 768
          ? Math.min(800, window.innerHeight * 0.8) // Much taller on mobile for spacing
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
    // Only generate nodes once on initial page load - not on resize or touch
    if (nodesInitializedRef.current) return;

    // Wait for container size to be properly calculated (not default values)
    if (containerSize.width === 800 && containerSize.height === 500) {
      // Still using default values, wait for actual size
      return;
    }

    // Mark as initialized BEFORE generating to prevent re-generation
    nodesInitializedRef.current = true;

    // Generate non-overlapping random positions for nodes with size-aware spacing
    const generatedNodes: Node[] = [];
    // Strong padding on mobile, good padding on desktop
    const extraPadding = isMobile ? 80 : 50;

    nodeLabels.forEach((label, i) => {
      let x: number, y: number;
      let attempts = 0;
      const maxAttempts = 500;
      const currentBubbleSize = getBubbleSize(label, isMobile);

      do {
        // Use wider range but with margin from edges based on bubble size
        const margin =
          (currentBubbleSize.radius / containerSize.width) * 100 +
          (isMobile ? 15 : 8);
        x = Math.random() * (100 - 2 * margin) + margin;
        y = Math.random() * (100 - 2 * margin) + margin;
        attempts++;
      } while (
        attempts < maxAttempts &&
        generatedNodes.some((node) => {
          const nodeBubbleSize = getBubbleSize(node.label, isMobile);
          return checkOverlap(
            (x / 100) * containerSize.width,
            (y / 100) * containerSize.height,
            currentBubbleSize.radius,
            (node.x / 100) * containerSize.width,
            (node.y / 100) * containerSize.height,
            nodeBubbleSize.radius,
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
      const bubbleSize = getBubbleSize(node.label, isMobile);
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
        if (
          !generatedConnections.some(
            ([a, b]) =>
              (a === i && b === targetIndex) || (a === targetIndex && b === i)
          )
        ) {
          generatedConnections.push([i, targetIndex]);
        }
      }
    });
    setConnections(generatedConnections);
  }, [containerSize.width, containerSize.height, isMobile]);

  const updateNodePosition = useCallback(
    (nodeId: string, x: number, y: number) => {
      setNodePositions((prev) => ({
        ...prev,
        [nodeId]: { x, y },
      }));
    },
    []
  );

  return (
    <div className="w-full flex justify-center py-12 overflow-hidden px-4">
      {/* Enhanced container with overflow handling */}
      <div
        ref={containerRef}
        className="relative mx-auto overflow-hidden rounded-2xl"
        style={{
          width: containerSize.width,
          height: containerSize.height,
          touchAction: "auto",
        }}
      >
        {/* Connections */}
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <linearGradient
              id="connectionGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
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
          const bubbleSize = getBubbleSize(node.label, isMobile);
          const bubbleWidth = bubbleSize.width;
          const bubbleRadius = bubbleSize.radius;

          // Check if this node is user-controlled (touched/dragged)
          const isUserControlled = userControlledNodes.has(node.id);

          // Gentle floating on desktop for untouched bubbles, disabled on mobile and for user-controlled bubbles
          const floatRadius = isMobile || isUserControlled ? 0 : 6;
          const duration = 6 + Math.random() * 2;
          const delay = index * 0.5;

          // Center the bubble by offsetting by its radius
          const offsetX = -bubbleRadius;
          const offsetY = -bubbleRadius;

          // Mobile: Static bubbles until touched, then draggable
          if (isMobile) {
            const dragState = dragStates[node.id] || {
              x: 0,
              y: 0,
              touchStart: null,
              isDragging: false,
            };

            const handleTouchStart = (e: React.TouchEvent) => {
              if (!containerRef.current) return;

              // Mark this node as user-controlled
              if (!isUserControlled) {
                setUserControlledNodes((prev) => new Set(prev).add(node.id));
              }

              const touch = e.touches[0];
              const containerRect =
                containerRef.current.getBoundingClientRect();

              const touchX = touch.clientX - containerRect.left;
              const touchY = touch.clientY - containerRect.top;

              const currentBubbleX = baseX + offsetX + dragState.x;
              const currentBubbleY = baseY + offsetY + dragState.y;

              setDragStates((prev) => ({
                ...prev,
                [node.id]: {
                  x: dragState.x,
                  y: dragState.y,
                  touchStart: {
                    x: touchX - currentBubbleX,
                    y: touchY - currentBubbleY,
                  },
                  isDragging: true,
                },
              }));
              e.preventDefault();
            };

            const handleTouchMove = (e: React.TouchEvent) => {
              if (!containerRef.current) return;

              const currentDragState = dragStates[node.id];
              if (!currentDragState?.touchStart || !currentDragState.isDragging)
                return;

              const touch = e.touches[0];
              const containerRect =
                containerRef.current.getBoundingClientRect();

              const touchX = touch.clientX - containerRect.left;
              const touchY = touch.clientY - containerRect.top;

              const newX =
                touchX - baseX - offsetX - currentDragState.touchStart.x;
              const newY =
                touchY - baseY - offsetY - currentDragState.touchStart.y;

              setDragStates((prev) => ({
                ...prev,
                [node.id]: {
                  ...prev[node.id],
                  x: newX,
                  y: newY,
                },
              }));

              updateNodePosition(
                node.id,
                baseX + offsetX + newX + bubbleRadius,
                baseY + offsetY + newY + bubbleRadius
              );
              e.preventDefault();
            };

            const handleTouchEnd = () => {
              setDragStates((prev) => ({
                ...prev,
                [node.id]: {
                  ...prev[node.id],
                  touchStart: null,
                  isDragging: false,
                },
              }));
            };

            return (
              <div
                key={node.id}
                className="absolute z-10"
                style={{
                  left: baseX,
                  top: baseY,
                  transform: `translate(${offsetX + dragState.x}px, ${
                    offsetY + dragState.y
                  }px)`,
                  touchAction: "none",
                  userSelect: "none",
                  transition: isUserControlled
                    ? "none"
                    : "transform 0.3s ease-out",
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Draggable bubble on mobile - playful interaction */}
                <div
                  className="relative bg-white/90 dark:bg-[#1C1E22] text-gray-800 dark:text-gray-200 font-semibold shadow-lg dark:shadow-xl rounded-full flex items-center justify-center text-center backdrop-blur-md border border-gray-200 dark:border-white/10"
                  style={{
                    width: `${bubbleWidth}px`,
                    height: `${bubbleWidth}px`,
                    padding: "8px",
                    fontSize: "10px",
                    lineHeight: "1.2",
                    touchAction: "none",
                    userSelect: "none",
                    WebkitTouchCallout: "none",
                    WebkitUserSelect: "none",
                    cursor: dragState.isDragging ? "grabbing" : "grab",
                    transform: dragState.isDragging ? "scale(1.1)" : "scale(1)",
                    transition: "transform 0.15s ease-out",
                  }}
                >
                  <p className="break-words whitespace-normal leading-tight text-center w-full px-1">
                    {node.label}
                  </p>
                </div>
              </div>
            );
          }

          // Desktop: Animated bubbles until touched, then draggable
          return (
            <motion.div
              key={node.id}
              className="absolute z-10"
              style={{
                left: baseX,
                top: baseY,
              }}
              initial={{ opacity: 0, scale: 0, x: offsetX, y: offsetY }}
              animate={{
                opacity: 1,
                scale: 1,
                // Only animate if NOT user-controlled, otherwise use drag position
                x: isUserControlled
                  ? offsetX + (desktopDragPositions[node.id]?.x || 0)
                  : [
                      offsetX,
                      offsetX + Math.sin(0) * floatRadius,
                      offsetX + Math.sin(Math.PI / 2) * floatRadius,
                      offsetX + Math.sin(Math.PI) * floatRadius,
                      offsetX + Math.sin((3 * Math.PI) / 2) * floatRadius,
                      offsetX,
                    ],
                y: isUserControlled
                  ? offsetY + (desktopDragPositions[node.id]?.y || 0)
                  : [
                      offsetY,
                      offsetY + Math.cos(0) * floatRadius,
                      offsetY + Math.cos(Math.PI / 2) * floatRadius,
                      offsetY + Math.cos(Math.PI) * floatRadius,
                      offsetY + Math.cos((3 * Math.PI) / 2) * floatRadius,
                      offsetY,
                    ],
              }}
              transition={{
                opacity: { duration: 0.6, delay: index * 0.15 },
                scale: { duration: 0.6, delay: index * 0.15 },
                x: isUserControlled
                  ? { duration: 0 }
                  : {
                      duration,
                      delay,
                      repeat: Infinity,
                      ease: "linear",
                    },
                y: isUserControlled
                  ? { duration: 0 }
                  : {
                      duration,
                      delay,
                      repeat: Infinity,
                      ease: "linear",
                    },
              }}
              // Don't put drag here - it conflicts with animation
              onUpdate={(latest) => {
                // Track actual position for connection lines (centered) - only for animated bubbles
                if (
                  !isUserControlled &&
                  typeof latest.x === "number" &&
                  typeof latest.y === "number"
                ) {
                  updateNodePosition(
                    node.id,
                    baseX + latest.x + bubbleRadius,
                    baseY + latest.y + bubbleRadius
                  );
                }
              }}
            >
              {/* Enhanced bubble with dual-theme frosted glass effect and playful interaction */}
              <motion.div
                className="relative bg-white/90 dark:bg-[#1C1E22] text-gray-800 dark:text-gray-200 font-semibold shadow-lg dark:shadow-xl rounded-full flex items-center justify-center text-center backdrop-blur-md border border-gray-200 dark:border-white/10"
                style={{
                  width: `${bubbleWidth}px`,
                  height: `${bubbleWidth}px`,
                  padding: "12px",
                  fontSize: "12px",
                  lineHeight: "1.3",
                  cursor: "grab",
                }}
                drag
                dragMomentum={false}
                dragElastic={0.2}
                dragConstraints={false}
                dragPropagation={false}
                onDragStart={(event, info) => {
                  // Mark as user-controlled when drag starts - stops random animation immediately
                  setUserControlledNodes((prev) => new Set(prev).add(node.id));

                  // Capture the starting position when drag begins
                  const currentPos = desktopDragPositions[node.id];
                  setDesktopDragPositions((prev) => ({
                    ...prev,
                    [node.id]: {
                      x: currentPos?.x || 0,
                      y: currentPos?.y || 0,
                      startX: currentPos?.x || 0,
                      startY: currentPos?.y || 0,
                    },
                  }));
                }}
                onDrag={(event, info) => {
                  // Calculate new position: start position + drag delta
                  const dragState = desktopDragPositions[node.id] || {
                    x: 0,
                    y: 0,
                    startX: 0,
                    startY: 0,
                  };
                  const newX = dragState.startX + info.delta.x;
                  const newY = dragState.startY + info.delta.y;

                  setDesktopDragPositions((prev) => ({
                    ...prev,
                    [node.id]: {
                      x: newX,
                      y: newY,
                      startX: dragState.startX,
                      startY: dragState.startY,
                    },
                  }));

                  // Update node position for connections
                  updateNodePosition(
                    node.id,
                    baseX + offsetX + newX + bubbleRadius,
                    baseY + offsetY + newY + bubbleRadius
                  );
                }}
                onDragEnd={(event, info) => {
                  // Final position is already set in onDrag
                  const dragState = desktopDragPositions[node.id] || {
                    x: 0,
                    y: 0,
                    startX: 0,
                    startY: 0,
                  };
                  updateNodePosition(
                    node.id,
                    baseX + offsetX + dragState.x + bubbleRadius,
                    baseY + offsetY + dragState.y + bubbleRadius
                  );
                }}
                whileHover={
                  isUserControlled
                    ? {
                        scale: 1.08,
                        boxShadow: "0 0 30px rgba(0, 184, 217, 0.5)",
                        borderColor: "rgba(0, 184, 217, 0.4)",
                      }
                    : {
                        scale: 1.05,
                        boxShadow: "0 0 30px rgba(0, 184, 217, 0.4)",
                        borderColor: "rgba(0, 184, 217, 0.3)",
                      }
                }
                whileDrag={{
                  scale: 1.15,
                  rotate: [0, -5, 5, -5, 0],
                  boxShadow: "0 0 40px rgba(0, 184, 217, 0.6)",
                  cursor: "grabbing",
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Improved text wrapping with responsive sizing and proper line breaks */}
                <p className="break-words whitespace-normal leading-tight text-center w-full px-1">
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
