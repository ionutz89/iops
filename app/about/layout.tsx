import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About IOPS | Expert AI Automation & DevOps Team",
  description:
    "Meet the IOPS team of AI automation and DevOps specialists. 10+ years building intelligent systems that automate operations and scale businesses.",
  keywords: [
    "AI automation team",
    "DevOps experts",
    "intelligent operations",
    "automation specialists",
    "AI systems",
    "IOPS team",
    "business automation experts",
  ],
  openGraph: {
    title: "About IOPS | Expert AI Automation & DevOps Team",
    description:
      "Meet the team building intelligent systems that make operations self-optimizing. 10+ years of experience in AI automation and DevOps.",
    type: "website",
    url: "https://iops.pro/about",
    siteName: "IOPS",
    locale: "en_US",
    images: [
      {
        url: "https://iops.pro/og-image.png",
        width: 1200,
        height: 630,
        alt: "IOPS | About Us",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About IOPS | Expert AI Automation & DevOps Team",
    description:
      "Meet the team building intelligent systems that make operations self-optimizing.",
    images: ["https://iops.pro/og-image.png"],
  },
  alternates: {
    canonical: "https://iops.pro/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
