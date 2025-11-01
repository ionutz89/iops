import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience & Expertise | IOPS Automation That Delivers Results",
  description:
    "10+ years designing AI, DevOps, and automation systems connecting models, data, and infrastructure for measurable business results. Expertise in AI automation, RAG pipelines, Kubernetes, and cloud infrastructure.",
  keywords: [
    "AI automation experience",
    "DevOps expertise",
    "automation case studies",
    "Kubernetes expert",
    "cloud cost optimization",
    "Dify AI automation",
    "n8n workflow orchestration",
    "AWS infrastructure automation",
    "Terraform cloud automation",
    "ArgoCD GitOps",
    "Grafana monitoring",
    "zero downtime deployment",
    "automation ROI",
    "RAG pipelines",
    "Neo4j",
    "Qdrant",
    "Claude AI",
    "GPT-4",
    "context-aware AI agents",
  ],
  openGraph: {
    title: "Experience & Expertise | Automation That Delivers Results | IOPS",
    description:
      "10+ years designing AI, DevOps, and automation systems connecting models, data, and infrastructure for measurable business results. Case studies: AI workflow orchestration, RAG pipelines, cloud cost optimization.",
    type: "website",
    url: "https://iops.pro/experience",
    siteName: "IOPS",
    locale: "en_US",
    images: [
      {
        url: "https://iops.pro/og-image.png",
        width: 1200,
        height: 630,
        alt: "IOPS Experience | Automation That Delivers Results",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience & Expertise | Automation That Delivers Results | IOPS",
    description:
      "10+ years designing AI, DevOps, and automation systems connecting models, data, and infrastructure for measurable business results.",
    images: ["https://iops.pro/og-image.png"],
  },
  alternates: {
    canonical: "https://iops.pro/experience",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
