import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact IOPS | Automate Your Business Operations",
  description:
    "Book a free strategy call with IOPS. We help growing teams automate workflows, cut costs, and deliver results faster.",
  openGraph: {
    title: "Contact IOPS | Automate Your Business Operations",
    description:
      "Book a free strategy call with IOPS. We help growing teams automate workflows, cut costs, and deliver results faster.",
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
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact IOPS | Automate Your Business Operations",
    description:
      "Book a free strategy call with IOPS. We help growing teams automate workflows, cut costs, and deliver results faster.",
    images: ["https://iops.pro/og-image.png"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
