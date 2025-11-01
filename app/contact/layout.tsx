import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact IOPS | Automate Your Business Operations with AI",
  description:
    "Book a free strategy call with IOPS to learn how intelligent automation reduces costs and improves efficiency across your business.",
  keywords: [
    "business automation",
    "workflow automation",
    "AI operations",
    "efficiency",
    "cost reduction",
    "IOPS",
    "automation consulting",
  ],
  openGraph: {
    title: "Contact IOPS | Automate Your Business Operations with AI",
    description:
      "See how intelligent automation can streamline your workflows and boost performance. Book your free strategy call today.",
    type: "website",
    url: "https://iops.pro/contact",
    siteName: "IOPS",
    locale: "en_US",
    images: [
      {
        url: "https://iops.pro/og-image.png",
        width: 1200,
        height: 630,
        alt: "IOPS | Contact Us",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact IOPS | Automate Your Business Operations with AI",
    description:
      "Book your free strategy call with IOPS and learn how automation helps your business run smarter.",
    images: ["https://iops.pro/og-image.png"],
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
