import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle llms.txt request - must match exactly
  if (pathname === "/llms.txt") {
    const llmsContent = `# LLM & AI Discovery Metadata for IOPS

# Overview
IOPS builds intelligent AI systems that automate, monitor, and scale business operations.

# Key Pages
https://iops.pro/
https://iops.pro/about
https://iops.pro/experience
https://iops.pro/projects
https://iops.pro/faq
https://iops.pro/contact

# About IOPS
IOPS (Intelligent Operations) helps companies automate workflows and reduce operational overhead using AI-driven agents, observability, and orchestration.

# Content Highlights
- AI Automation Architecture
- ROI Calculator for Operational Savings
- Case Studies and Projects
- Consulting and Assessment Services

# Contact
contact@iops.pro

# Purpose
This llms.txt file provides reference URLs and key topics to help LLMs (Large Language Models) understand and index this content contextually. It does not control crawling permissions like robots.txt.
`;

    return new NextResponse(llmsContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/llms.txt"],
};

