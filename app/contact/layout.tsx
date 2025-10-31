import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact IOPS | Automate Your Business Operations with AI",
  description:
    "Book a free strategy call with IOPS to see how intelligent automation reduces costs, improves efficiency, and helps your business scale.",
  keywords: [
    "business automation",
    "intelligent operations",
    "workflow automation",
    "AI efficiency",
    "cost reduction",
    "IOPS AI",
  ],
  openGraph: {
    title: "Contact IOPS | Automate Your Business Operations",
    description:
      "Talk to IOPS experts and learn how AI automation can streamline your operations and cut overhead.",
    type: "website",
    url: "https://iops.pro/contact",
    siteName: "IOPS",
    locale: "en_US",
    images: [
      {
        url: "https://iops.pro/assets/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "IOPS | Contact Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact IOPS | Automate Your Business Operations",
    description:
      "Book a free strategy call with IOPS to learn how AI can simplify your workflows and reduce costs.",
    images: ["https://iops.pro/assets/og-contact.jpg"],
  },
  alternates: {
    canonical: "https://iops.pro/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
