import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { Services } from "@/components/sections/services";
import { ROICalculator } from "@/components/sections/roi-calculator";
import { TechStack } from "@/components/sections/tech-stack";
import { CaseStudies } from "@/components/sections/case-studies";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { Pricing } from "@/components/sections/pricing";
import { ContactForm } from "@/components/sections/contact-form";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold gradient-text">IOPS</span>
            <span className="text-sm text-muted-foreground">.pro</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-16">
        <Hero />
        <SocialProof />
        <Services />
        <ROICalculator />
        <TechStack />
        <CaseStudies />
        <ProcessTimeline />
        <Pricing />
        <ContactForm />
      </div>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold gradient-text">IOPS</span>
                <span className="text-sm text-muted-foreground">.pro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-Powered DevOps Automation. Transform your operations and save 70% on
                operational time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>AI Workflow Architecture</li>
                <li>Intelligent DevOps</li>
                <li>Multi-Agent Systems</li>
                <li>SRE Consultancy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Technologies</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Claude MCP</li>
                <li>n8n Workflows</li>
                <li>Kubernetes</li>
                <li>ArgoCD GitOps</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-4">
              <Link
                href="mailto:contact@iops.pro"
                className="hover:text-primary transition-colors"
                aria-label="Email us at contact@iops.pro"
              >
                contact@iops.pro
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <Link
                href="https://linkedin.com/company/iopspro"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Visit our LinkedIn page"
              >
                LinkedIn
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} IOPS Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
