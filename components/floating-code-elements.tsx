"use client";

// Static code snippets - no JavaScript animations to prevent Safari freezing
const codeSnippets = [
  { text: "kubectl apply -f deployment.yaml", x: "10%", y: "20%" },
  { text: "$ ai-agent deploy --auto", x: "80%", y: "15%" },
  { text: "n8n workflow: ✓ executed", x: "15%", y: "70%" },
  { text: "dify://workflow/ready", x: "75%", y: "75%" },
  { text: "incidents: 10 → 1", x: "50%", y: "85%" },
  { text: "savings: +$200k/year", x: "85%", y: "45%" },
];

export function FloatingCodeElements() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ pointerEvents: "none" }}
    >
      {codeSnippets.map((snippet, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="absolute text-xs md:text-sm font-mono text-muted-foreground/30 pointer-events-none opacity-40"
          style={{
            left: snippet.x,
            top: snippet.y,
            pointerEvents: "none",
          }}
        >
          {snippet.text}
        </div>
      ))}
    </div>
  );
}
