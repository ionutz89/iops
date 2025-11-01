import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | IOPS Data Protection & GDPR Compliance",
  description:
    "IOPS Privacy Policy: Learn how we collect, use, and protect your personal data in compliance with GDPR and data protection regulations.",
  keywords: [
    "privacy policy",
    "data protection",
    "GDPR compliance",
    "personal data",
    "cookie policy",
    "IOPS privacy",
  ],
  openGraph: {
    title: "Privacy Policy | IOPS Data Protection & GDPR Compliance",
    description:
      "IOPS Privacy Policy: How we protect your data and comply with GDPR regulations.",
    type: "website",
    url: "https://iops.pro/privacy-policy",
    siteName: "IOPS",
    locale: "en_US",
    images: [
      {
        url: "https://iops.pro/og-image.png",
        width: 1200,
        height: 630,
        alt: "IOPS | Privacy Policy",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | IOPS Data Protection & GDPR Compliance",
    description:
      "IOPS Privacy Policy: How we protect your data and comply with GDPR.",
    images: ["https://iops.pro/og-image.png"],
  },
  alternates: {
    canonical: "https://iops.pro/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
