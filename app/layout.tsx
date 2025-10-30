import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import { AnalyticsProvider } from "@/components/analytics-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IOPS",
  alternateName: "Intelligent Operations",
  url: "https://iops.pro",
  logo: "https://iops.pro/og-image.svg",
  sameAs: ["https://linkedin.com/company/iopspro"],
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
    "IOPS builds intelligent AI systems that automate, monitor, and scale business operations 24/7. Calculate your ROI and start automating today.",
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
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "IOPS | Intelligent Operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IOPS | Intelligent Operations with AI",
    description:
      "We build intelligent AI systems that automate, monitor, and scale business operations.",
    images: ["/og-image.svg"],
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
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
        {/* Google Analytics - Replace G-XXXXXXXXXX with your actual GA4 ID */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <AnalyticsProvider>{children}</AnalyticsProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
