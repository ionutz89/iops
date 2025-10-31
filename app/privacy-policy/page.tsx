"use client";

import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmailReveal } from "@/components/email-reveal";

export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 md:px-6 max-w-4xl mx-auto py-16 md:py-24">
        {/* Back Button */}
        <Button
          variant="ghost"
          asChild
          className="mb-8 text-muted-foreground hover:text-foreground"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg">
            Last updated: {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              1. Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              IOPS ("we," "our," or "us") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website{" "}
              <Link
                href="https://iops.pro"
                className="text-primary hover:underline"
              >
                iops.pro
              </Link>
              . This policy complies with the General Data Protection Regulation
              (GDPR) and other applicable data protection laws.
            </p>
          </section>

          {/* Data Controller */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              2. Data Controller
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Data Controller is IOPS. Contact:{" "}
              <EmailReveal email="privacy@iops.pro" />
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We operate globally and process limited personal data only for communication, analytics, and security purposes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Personally Identifiable Information (PII):</strong>{" "}
              Personally Identifiable Information (PII) refers to any information that can identify an individual, including name, email address, IP address, and device identifiers.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              3. Data We Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect the following types of personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong className="text-foreground">Contact Information:</strong>{" "}
                Name and email address when you submit forms or contact us
              </li>
              <li>
                <strong className="text-foreground">Technical Data:</strong> IP
                address, browser type, device information, and usage data
              </li>
              <li>
                <strong className="text-foreground">Analytics Data:</strong>{" "}
                Website usage statistics, page views, and interaction data
              </li>
              <li>
                <strong className="text-foreground">Communication Data:</strong>{" "}
                Messages sent through our contact forms
              </li>
            </ul>
          </section>

          {/* Purpose */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              4. Purpose of Data Processing
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We process your personal data for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong className="text-foreground">Communication:</strong> To
                respond to your inquiries and provide customer support
              </li>
              <li>
                <strong className="text-foreground">Service Improvement:</strong>{" "}
                To analyze website usage and improve our services
              </li>
              <li>
                <strong className="text-foreground">Security:</strong> To protect
                our website from spam, fraud, and security threats
              </li>
              <li>
                <strong className="text-foreground">Legal Compliance:</strong> To
                comply with applicable laws and regulations
              </li>
            </ul>
          </section>

          {/* Legal Basis */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              5. Legal Basis for Processing
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We process your personal data based on the following legal grounds:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong className="text-foreground">Consent:</strong> When you
                provide explicit consent for specific processing activities (e.g.,
                marketing communications)
              </li>
              <li>
                <strong className="text-foreground">Legitimate Interest:</strong>{" "}
                For website analytics, security, and service improvement (we ensure
                our interests do not override your rights and freedoms)
              </li>
              <li>
                <strong className="text-foreground">Contract Performance:</strong>{" "}
                To fulfill our obligations when you engage our services
              </li>
              <li>
                <strong className="text-foreground">Legal Obligation:</strong> To
                comply with applicable laws and regulations
              </li>
            </ul>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              6. Data Retention Period
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal data only for as long as necessary to fulfill
              the purposes outlined in this Privacy Policy, unless a longer
              retention period is required or permitted by law. Specifically:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-4">
              <li>
                Contact form submissions: 3 years from the date of submission
              </li>
              <li>Analytics data: 26 months (in line with GDPR guidelines)</li>
              <li>
                IP addresses and technical data: 12 months for security purposes
              </li>
              <li>
                Marketing communications: Until you withdraw consent or unsubscribe
              </li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              7. Data Sharing and Third Parties
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may share your personal data with the following third-party
              service providers:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong className="text-foreground">Cloudflare:</strong> For
                hosting, content delivery, and infrastructure services.{" "}
                <Link
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <strong className="text-foreground">Formspree:</strong> For contact
                form submission handling.{" "}
                <Link
                  href="https://formspree.io/legal/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <strong className="text-foreground">Cloudflare Turnstile:</strong> For
                spam protection and security. Turnstile is privacy-friendly and does not require cookies.{" "}
                <Link
                  href="https://developers.cloudflare.com/turnstile/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <strong className="text-foreground">Calendly:</strong> We use Calendly to schedule consultations. Calendly processes your name, email, and booking details. Data may be transferred to the United States under Standard Contractual Clauses (SCCs).{" "}
                <Link
                  href="https://calendly.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              All third-party service providers are contractually obligated to
              protect your data and use it only for the purposes we specify. We do
              not sell your personal data to third parties.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              8. Types of Cookies We Use
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies to provide essential security and enable optional features.
              We do not use analytics or marketing tracking.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Cookie Categories:
                </h3>
                <ul className="list-disc list-inside space-y-3 text-muted-foreground ml-4">
                  <li>
                    <strong className="text-foreground">Essential Cookies</strong> (always enabled)
                    <br />
                    <span className="text-sm">
                      Required for security and basic functionality. Includes Cloudflare Turnstile
                      for spam protection and session management. These cookies do not require consent
                      as they are strictly necessary for the website to operate.
                    </span>
                  </li>
                  <li>
                    <strong className="text-foreground">Functional Cookies</strong> (requires consent)
                    <br />
                    <span className="text-sm">
                      Enable optional features like Calendly for scheduling consultations. These cookies
                      only load after you explicitly accept them and are necessary for booking functionality.
                    </span>
                  </li>
                  <li>
                    <strong className="text-foreground">Preference Cookies</strong> (requires consent)
                    <br />
                    <span className="text-sm">
                      Remember your settings such as theme selection (light/dark mode) and cookie consent
                      choices. These are stored locally and only set after you interact with preference controls.
                    </span>
                  </li>
                </ul>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Important:</strong> Only essential cookies are enabled by default.
                Functional and preference cookies load only after you provide consent through our cookie banner.
              </p>
            </div>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              9. Your Rights Under GDPR
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Under the General Data Protection Regulation (GDPR), you have the
              following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong className="text-foreground">Right of Access:</strong> You
                can request copies of your personal data
              </li>
              <li>
                <strong className="text-foreground">Right to Rectification:</strong>{" "}
                You can request correction of inaccurate or incomplete data
              </li>
              <li>
                <strong className="text-foreground">Right to Erasure:</strong> You
                can request deletion of your personal data under certain
                circumstances
              </li>
              <li>
                <strong className="text-foreground">Right to Restrict Processing:</strong>{" "}
                You can request restriction of processing your personal data
              </li>
              <li>
                <strong className="text-foreground">Right to Data Portability:</strong>{" "}
                You can request transfer of your data to another service provider
              </li>
              <li>
                <strong className="text-foreground">Right to Object:</strong> You can
                object to processing of your personal data
              </li>
              <li>
                <strong className="text-foreground">Right to Withdraw Consent:</strong>{" "}
                You can withdraw consent at any time where processing is based on
                consent
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise any of these rights, please contact us using the
              information provided in the "Contact Us" section below.
            </p>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              10. Data Security
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access, alteration,
              disclosure, or destruction. These measures include encryption,
              secure servers, and regular security assessments. However, no method of
              transmission over the Internet is 100% secure, and we cannot guarantee
              absolute security.
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              11. International Data Transfers
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may process personal data on servers located outside the European Economic Area (EEA).
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use trusted third-party providers that maintain strong privacy and security protections.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We only transfer data where appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs) approved by the European Commission.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              12. Children's Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website is not intended for children under 16 years of age. We do
              not knowingly collect personal data from children. If you are a
              parent or guardian and believe your child has provided us with
              personal data, please contact us immediately.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              13. Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify
              you of any material changes by posting the new Privacy Policy on this
              page and updating the "Last updated" date. You are advised to review
              this Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              14. Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or wish to
              exercise your rights under GDPR, please contact us:
            </p>
            <div className="bg-muted rounded-lg p-6 space-y-2">
              <p className="text-foreground font-semibold">IOPS</p>
              <p className="text-muted-foreground">Intelligent Operations</p>
              <div className="flex items-center gap-2 mt-4">
                <EmailReveal email="contact@iops.pro" className="font-medium" />
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border space-y-4">
            <div className="text-center">
              <button
                onClick={() => {
                  window.dispatchEvent(new Event("openCookiePreferences"));
                }}
                className="text-sm text-primary hover:underline transition-colors"
              >
                Manage Cookie Preferences
              </button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              &copy; {currentYear} IOPS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

