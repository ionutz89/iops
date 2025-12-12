import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Operational Intelligence | IOPS Blog",
  description:
    "Insights on scaling operations with AI agents and n8n workflows. Learn how to automate business processes, build AI chatbots, and optimize operational efficiency.",
  keywords: [
    "AI automation blog",
    "n8n workflows",
    "business automation insights",
    "AI agents",
    "operational intelligence",
    "RAG vs fine-tuning",
    "automation ROI",
    "Python scripting",
  ],
  openGraph: {
    title: "Operational Intelligence | IOPS Blog",
    description:
      "Insights on scaling operations with AI agents and n8n workflows.",
    type: "website",
    url: "https://iops.pro/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Operational Intelligence | IOPS Blog",
    description:
      "Insights on scaling operations with AI agents and n8n workflows.",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

