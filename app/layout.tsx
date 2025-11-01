import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { GdprConsent } from "@/components/GdprConsent";
import { AnalyticsLoader } from "@/components/analytics-loader";
import "./globals.css";

// Body text font - Inter
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Heading font - Space Grotesk
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700"],
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IOPS",
  alternateName: "Intelligent Operations",
  url: "https://iops.pro",
  logo: "https://iops.pro/og-image.png",
  sameAs: [
    "https://linkedin.com/company/iopspro",
    // Add Twitter handle when available: "https://twitter.com/iopspro"
  ],
  description:
    "IOPS builds intelligent AI systems that automate, monitor and scale business operations for modern companies.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@iops.pro",
    contactType: "Customer Service",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://iops.pro",
  name: "IOPS | Intelligent Operations",
  description:
    "AI systems that automate, monitor, and scale business operations",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://iops.pro/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  title: "IOPS | Intelligent Operations with AI",
  description:
    "IOPS builds intelligent AI systems with Dify AI and AI automation workflows that automate, monitor, and scale business operations 24/7. Calculate your ROI and start automating today.",
  keywords: [
    "AI automation",
    "business automation",
    "operations automation",
    "AI systems",
    "automation consultancy",
    "intelligent operations",
    "AI agents",
    "workflow automation",
    "operational efficiency",
    "Dify AI",
    "AI automation workflows",
  ],
  authors: [{ name: "IOPS" }],
  creator: "IOPS",
  publisher: "IOPS",
  metadataBase: new URL("https://iops.pro"),
  alternates: {
    canonical: "/",
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
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "IOPS | Intelligent Operations with AI",
    description:
      "Automate your operations with AI. Intelligent systems that handle operations 24/7.",
    type: "website",
    url: "https://iops.pro",
    siteName: "IOPS",
    locale: "en_US",
    images: [
      {
        url: "https://iops.pro/og-image.png",
        width: 1200,
        height: 630,
        alt: "IOPS | Intelligent Operations",
        type: "image/png",
      },
      {
        url: "https://iops.pro/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IOPS | Intelligent Operations",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IOPS | Intelligent Operations with AI",
    description:
      "We build intelligent AI systems that automate, monitor, and scale business operations.",
    images: ["https://iops.pro/og-image.png"],
    creator: "@iopspro", // Update with your actual Twitter handle
    site: "@iopspro", // Update with your actual Twitter handle
  },
  verification: {
    // Add verification codes when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: "#007AFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="transition-colors duration-300">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {/* JSON-LD Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {/* Cloudflare Turnstile is loaded dynamically only when needed (contact forms) */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          enableColorScheme
        >
          {children}
          <GdprConsent />
          <AnalyticsLoader />
        </ThemeProvider>
      </body>
    </html>
  );
}
