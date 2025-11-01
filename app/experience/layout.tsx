import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Expertise | IOPS AI Automation & DevOps Experience",
  description:
    "10+ years expertise in AI automation, Kubernetes, DevOps, and cloud infrastructure. Specialized in Dify AI, n8n, AWS, GCP, and intelligent operations.",
  keywords: [
    "AI automation expertise",
    "DevOps experience",
    "Kubernetes expert",
    "cloud infrastructure",
    "Dify AI",
    "n8n automation",
    "AWS specialist",
    "automation experience",
  ],
  openGraph: {
    title: "Our Expertise | IOPS AI Automation & DevOps Experience",
    description:
      "Expertise in intelligent operations: AI automation, Kubernetes, cloud infrastructure, and DevOps. 100+ automations delivered.",
    type: "website",
    url: "https://iops.pro/experience",
    siteName: "IOPS",
    locale: "en_US",
    images: [
      {
        url: "https://iops.pro/og-image.png",
        width: 1200,
        height: 630,
        alt: "IOPS | Our Experience",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Expertise | IOPS AI Automation & DevOps Experience",
    description:
      "10+ years expertise in AI automation, Kubernetes, DevOps, and cloud infrastructure.",
    images: ["https://iops.pro/og-image.png"],
  },
  alternates: {
    canonical: "https://iops.pro/experience",
  },
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
