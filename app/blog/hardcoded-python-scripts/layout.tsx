import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Hardcoded Python Scripts are Killing Your Ops Scalability | IOPS",
  description:
    "That script your developer wrote 'just for now' is now running critical infrastructure. Learn why visual workflow automation tools like n8n reduce technical debt and business continuity risk.",
  keywords: [
    "business continuity",
    "automating operations",
    "visual workflow automation",
    "reducing technical debt",
    "n8n vs python scripts",
    "operational risk",
    "ghost scripts",
    "workflow automation",
    "operations scalability",
  ],
  openGraph: {
    title: "Why Hardcoded Python Scripts are Killing Your Ops Scalability",
    description:
      "The 'Black Box' Problem in Operations: Why visual workflow tools reduce business risk.",
    type: "article",
    publishedTime: "2025-12-12T00:00:00.000Z",
    authors: ["IOPS"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Hardcoded Python Scripts are Killing Your Ops Scalability",
    description:
      "The 'Black Box' Problem in Operations: Why visual workflow tools reduce business risk.",
  },
};

export default function HardcodedPythonScriptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



