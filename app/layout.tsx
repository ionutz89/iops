import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IOPS Pro - AI-Powered DevOps Automation",
  description:
    "AI-powered DevOps automation using Claude MCP, n8n, and Kubernetes to cut incidents by 90% and save 70% of operational time. Transform your operations with intelligent AI agents.",
  keywords: [
    "AI DevOps",
    "Claude MCP",
    "n8n workflows",
    "Kubernetes automation",
    "DevOps automation",
    "AI agents",
    "SRE consultancy",
  ],
  authors: [{ name: "IOPS Pro" }],
  themeColor: "#0A66C2",
  openGraph: {
    title: "IOPS Pro - AI-Powered DevOps Automation",
    description:
      "Transform your operations with AI agents. Save 70% on DevOps time.",
    type: "website",
    url: "https://iops.pro",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "IOPS Pro - AI-Powered DevOps Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IOPS Pro - AI-Powered DevOps Automation",
    description:
      "Transform your operations with AI agents. Save 70% on DevOps time.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
