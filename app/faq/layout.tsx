import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Intelligent Operations & AI Automation Questions",
  description:
    "Frequently asked questions about AI automation, intelligent operations, n8n workflows, and how IOPS helps businesses automate processes.",
  keywords: [
    "AI automation FAQ",
    "intelligent operations questions",
    "business automation FAQ",
    "n8n workflows",
    "Dify AI chatbots",
    "automation questions",
    "IOPS FAQ",
  ],
  openGraph: {
    title: "FAQ | Intelligent Operations & AI Automation Questions",
    description:
      "Everything you need to know about AI automation, intelligent operations, and how IOPS implements automation workflows.",
    type: "website",
    url: "https://iops.pro/faq",
    siteName: "IOPS",
    locale: "en_US",
    images: [
      {
        url: "https://iops.pro/og-image.png",
        width: 1200,
        height: 630,
        alt: "IOPS | FAQ",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Intelligent Operations & AI Automation Questions",
    description:
      "Frequently asked questions about AI automation and intelligent operations.",
    images: ["https://iops.pro/og-image.png"],
  },
  alternates: {
    canonical: "https://iops.pro/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
