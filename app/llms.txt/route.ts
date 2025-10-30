import { NextRequest, NextResponse } from "next/server";

// llms.txt content - inline for Cloudflare Workers compatibility
const LLMS_TXT_CONTENT = `# LLM & AI Discovery Metadata for IOPS

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

export async function GET(request: NextRequest) {
  return new NextResponse(LLMS_TXT_CONTENT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

