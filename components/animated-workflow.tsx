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
      // Set both together to ensure they're synchronized
      setContainerSize({ width, height });
      setIsMobile(mobile);
    };

    // Call immediately
    updateSize();

    // Multiple delayed checks for Safari/iOS which has timing issues with viewport
    const timeout1 = setTimeout(updateSize, 100);
    const timeout2 = setTimeout(updateSize, 300);
    const timeout3 = setTimeout(updateSize, 500);

    // Also check when container ref is available
    const checkContainerSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const mobile = window.innerWidth < 768;
          setContainerSize({ width: rect.width, height: rect.height });
          setIsMobile(mobile);
        }
      }
    };

    const intervalId = setInterval(checkContainerSize, 50);
    const stopInterval = setTimeout(() => clearInterval(intervalId), 1000);

    window.addEventListener("resize", updateSize);
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(stopInterval);
      clearInterval(intervalId);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    // Only generate nodes once on initial page load - not on resize or touch
    if (nodesInitializedRef.current) return;

    // Wait for container size to be properly calculated (not default values)
    if (containerSize.width === 800 && containerSize.height === 500) {
      // Still using default values, wait for actual size
      return;
    }

    // CRITICAL: Verify container ref has actual dimensions (Safari fix)
    if (!containerRef.current) {
      // Container ref not ready yet, wait
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      // Container not yet rendered, wait
      return;
    }

    // Use actual measured size - update state if there's a significant difference
    if (Math.abs(rect.width - containerSize.width) > 10 ||
        Math.abs(rect.height - containerSize.height) > 10) {
      // Size mismatch detected - update to actual measured size
      const mobile = window.innerWidth < 768;
      setContainerSize({ width: rect.width, height: rect.height });
      setIsMobile(mobile);
      return; // Wait for state update
    }

    // CRITICAL: Double-check mobile state matches actual window size before generating
    // This prevents generating with wrong mobile state on initial load
    const actualIsMobile = window.innerWidth < 768;
    if (actualIsMobile !== isMobile) {
      // Mobile state mismatch, wait for it to sync
      return;
    }

    // CRITICAL: On mobile, ensure we have reasonable dimensions before proceeding
    if (isMobile && (containerSize.width < 300 || containerSize.height < 400)) {
      // Mobile container too small, wait for proper size
      return;
    }

    // Mark as initialized BEFORE generating to prevent re-generation
    nodesInitializedRef.current = true;

    // Generate non-overlapping positions for nodes with size-aware spacing
    const generatedNodes: Node[] = [];
    const extraPadding = isMobile ? 200 : 120; // Increased padding on desktop to prevent overlaps

    if (isMobile) {
      // MOBILE: Use deterministic grid-based layout to GUARANTEE no overlaps
      const bubbles = nodeLabels.map((label) => ({
        label,
        size: getBubbleSize(label, true),
      }));

      // Calculate total area needed
      const maxBubbleSize = Math.max(...bubbles.map(b => b.size.width));
      const minSpacing = maxBubbleSize + extraPadding;

      // Use a grid: 2 columns, multiple rows
      const cols = 2;
      const rows = Math.ceil(nodeLabels.length / cols);

      // Calculate cell size based on container
      const cellWidth = containerSize.width / cols;
      const cellHeight = containerSize.height / rows;

      // Ensure cells are large enough
      const minCellSize = minSpacing * 1.2;
      if (cellWidth < minCellSize || cellHeight < minCellSize) {
        // Container too small, use more conservative spacing
        const adjustedPadding = Math.min(extraPadding, Math.min(cellWidth, cellHeight) * 0.4);

        nodeLabels.forEach((label, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const currentBubbleSize = getBubbleSize(label, isMobile);

          // Center within cell with padding
          const cellCenterX = (col + 0.5) * cellWidth;
          const cellCenterY = (row + 0.5) * cellHeight;

          // Add small random offset to avoid perfect grid, but keep within safe bounds
          const maxOffset = Math.min(cellWidth, cellHeight) * 0.15;
          const offsetX = (Math.random() - 0.5) * maxOffset;
          const offsetY = (Math.random() - 0.5) * maxOffset;

          const x = ((cellCenterX + offsetX) / containerSize.width) * 100;
          const y = ((cellCenterY + offsetY) / containerSize.height) * 100;

          // Clamp to safe bounds
          const margin = (currentBubbleSize.radius / containerSize.width) * 100 + 15;
          const clampedX = Math.max(margin, Math.min(100 - margin, x));
          const clampedY = Math.max(margin, Math.min(100 - margin, y));

          generatedNodes.push({
            id: `node-${i}`,
            label,
            x: clampedX,
            y: clampedY,
          });
        });
      } else {
        // Enough space, use grid layout
        nodeLabels.forEach((label, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);

          // Center within cell
          const x = ((col + 0.5) / cols) * 100;
          const y = ((row + 0.5) / rows) * 100;

          generatedNodes.push({
            id: `node-${i}`,
            label,
            x,
            y,
          });
        });
      }
    } else {
      // DESKTOP: Use deterministic grid-based layout to GUARANTEE no overlaps
      // Account for float animation radius (3px) in spacing calculation
      const floatRadius = 3;
      const maxAnimationMovement = floatRadius * 2; // Both bubbles can move max floatRadius towards each other
      const effectivePadding = extraPadding + maxAnimationMovement; // Account for animation movement

      const bubbles = nodeLabels.map((label) => ({
        label,
        size: getBubbleSize(label, isMobile),
      }));

      // Calculate total area needed
      const maxBubbleSize = Math.max(...bubbles.map(b => b.size.width));
      const minSpacing = maxBubbleSize + effectivePadding;

      // Use a grid: 3 columns for desktop (more horizontal space)
      const cols = 3;
      const rows = Math.ceil(nodeLabels.length / cols);

      // Calculate cell size based on container
      const cellWidth = containerSize.width / cols;
      const cellHeight = containerSize.height / rows;

      // Ensure cells are large enough to accommodate bubbles with padding
      const minCellSize = minSpacing * 1.3; // Extra 30% margin for safety

      if (cellWidth < minCellSize || cellHeight < minCellSize) {
        // Container too small, use more conservative spacing
        const adjustedPadding = Math.min(effectivePadding, Math.min(cellWidth, cellHeight) * 0.5);

        nodeLabels.forEach((label, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const currentBubbleSize = getBubbleSize(label, isMobile);

          // Center within cell with padding
          const cellCenterX = (col + 0.5) * cellWidth;
          const cellCenterY = (row + 0.5) * cellHeight;

          // Add small random offset to avoid perfect grid, but keep within safe bounds
          const maxOffset = Math.min(cellWidth, cellHeight) * 0.1; // Smaller offset on desktop
          const offsetX = (Math.random() - 0.5) * maxOffset;
          const offsetY = (Math.random() - 0.5) * maxOffset;

          const x = ((cellCenterX + offsetX) / containerSize.width) * 100;
          const y = ((cellCenterY + offsetY) / containerSize.height) * 100;

          // Clamp to safe bounds
          const margin = (currentBubbleSize.radius / containerSize.width) * 100 + 10;
          const clampedX = Math.max(margin, Math.min(100 - margin, x));
          const clampedY = Math.max(margin, Math.min(100 - margin, y));

          generatedNodes.push({
            id: `node-${i}`,
            label,
            x: clampedX,
            y: clampedY,
          });
        });
      } else {
        // Enough space, use grid layout with guaranteed spacing
        nodeLabels.forEach((label, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);

          // Center within cell - guaranteed no overlap due to cell size
          const x = ((col + 0.5) / cols) * 100;
          const y = ((row + 0.5) / rows) * 100;

          generatedNodes.push({
            id: `node-${i}`,
            label,
            x,
            y,
          });
        });
      }
    }

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
          pointerEvents: "auto",
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
          // Minimal float radius to prevent any overlap risk
          const floatRadius = isMobile || isUserControlled ? 0 : 3;
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
                  <p
                    className="leading-tight text-center w-full px-1"
                    style={{
                      wordBreak: "normal",
                      overflowWrap: "anywhere",
                      whiteSpace: "normal",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {node.label.split(" ").map((word, idx) => (
                      <span key={idx} style={{ whiteSpace: "nowrap", display: "inline-block" }}>
                        {word}
                        {idx < node.label.split(" ").length - 1 && " "}
                      </span>
                    ))}
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
                cursor: isUserControlled ? "grabbing" : "grab",
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
                  ? { duration: 0, type: "tween" }
                  : {
                      duration,
                      delay,
                      repeat: Infinity,
                      ease: "linear",
                    },
                y: isUserControlled
                  ? { duration: 0, type: "tween" }
                  : {
                      duration,
                      delay,
                      repeat: Infinity,
                      ease: "linear",
                    },
              }}
              drag={!isMobile}
              dragMomentum={false}
              dragElastic={0}
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

                // Update state immediately for responsive drag
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
              onUpdate={(latest) => {
                // Track actual position for connection lines - only for animated bubbles
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
                } else if (isUserControlled) {
                  // Update position for dragged bubbles too
                  const dragState = desktopDragPositions[node.id];
                  if (dragState) {
                    updateNodePosition(
                      node.id,
                      baseX + offsetX + dragState.x + bubbleRadius,
                      baseY + offsetY + dragState.y + bubbleRadius
                    );
                  }
                }
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
            >
              {/* Enhanced bubble with dual-theme frosted glass effect and playful interaction */}
              <div
                className="relative bg-white/90 dark:bg-[#1C1E22] text-gray-800 dark:text-gray-200 font-semibold shadow-lg dark:shadow-xl rounded-full flex items-center justify-center text-center backdrop-blur-md border border-gray-200 dark:border-white/10"
                style={{
                  width: `${bubbleWidth}px`,
                  height: `${bubbleWidth}px`,
                  padding: "12px",
                  fontSize: "12px",
                  lineHeight: "1.3",
                  pointerEvents: "none",
                }}
              >
                {/* Improved text wrapping with responsive sizing and proper line breaks */}
                <p
                  className="leading-tight text-center w-full px-1"
                  style={{
                    wordBreak: "normal",
                    overflowWrap: "anywhere",
                    whiteSpace: "normal",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {node.label.split(" ").map((word, idx) => (
                    <span key={idx} style={{ whiteSpace: "nowrap", display: "inline-block" }}>
                      {word}
                      {idx < node.label.split(" ").length - 1 && " "}
                    </span>
                  ))}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
