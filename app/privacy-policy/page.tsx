"use client";

import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmailReveal } from "@/components/email-reveal";
import Script from "next/script";

export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://iops.pro/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Privacy Policy",
        item: "https://iops.pro/privacy-policy",
      },
    ],
  };

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
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
              Last updated: November 2, 2025
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
                IOPS ("we," "our," or "us") is committed to protecting your
                privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our
                website{" "}
                <Link
                  href="https://iops.pro"
                  className="text-primary hover:underline"
                >
                  iops.pro
                </Link>
                . This policy complies with the General Data Protection
                Regulation (GDPR) and other applicable data protection laws.
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
                We operate globally and process limited personal data only for
                communication, analytics, and security purposes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">
                  Personally Identifiable Information (PII):
                </strong>{" "}
                Personally Identifiable Information (PII) refers to any
                information that can identify an individual, including name,
                email address, IP address, and device identifiers.
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
                  <strong className="text-foreground">
                    Contact Information:
                  </strong>{" "}
                  Name and email address when you submit forms or contact us
                </li>
                <li>
                  <strong className="text-foreground">Technical Data:</strong>{" "}
                  IP address, browser type, device information, and usage data
                </li>
                <li>
                  <strong className="text-foreground">Analytics Data:</strong>{" "}
                  Aggregated website usage statistics without personal
                  identifiers
                </li>
                <li>
                  <strong className="text-foreground">
                    Communication Data:
                  </strong>{" "}
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
                  <strong className="text-foreground">
                    Service Improvement:
                  </strong>{" "}
                  To analyze website usage and improve our services
                </li>
                <li>
                  <strong className="text-foreground">Security:</strong> To
                  protect our website from spam, fraud, and security threats
                </li>
                <li>
                  <strong className="text-foreground">Legal Compliance:</strong>{" "}
                  To comply with applicable laws and regulations
                </li>
              </ul>
            </section>

            {/* Analytics */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                5. Analytics
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We use Cloudflare Web Analytics for performance and traffic
                statistics. It uses no tracking cookies and stores no personal
                identifiers. We receive only aggregated data.
              </p>
            </section>

            {/* Legal Basis */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                6. Legal Bases for Processing
              </h2>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border px-4 py-2 text-left text-foreground font-semibold">
                        Processing activity
                      </th>
                      <th className="border border-border px-4 py-2 text-left text-foreground font-semibold">
                        Legal basis
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border px-4 py-2 text-muted-foreground">
                        Contact form submissions
                      </td>
                      <td className="border border-border px-4 py-2 text-muted-foreground">
                        Contract or legitimate interest
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2 text-muted-foreground">
                        Meeting scheduling via Calendly
                      </td>
                      <td className="border border-border px-4 py-2 text-muted-foreground">
                        Consent or contract
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2 text-muted-foreground">
                        Security and service improvement
                      </td>
                      <td className="border border-border px-4 py-2 text-muted-foreground">
                        Legitimate interest
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2 text-muted-foreground">
                        Marketing emails
                      </td>
                      <td className="border border-border px-4 py-2 text-muted-foreground">
                        Consent
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-4">
                When we rely on legitimate interest, we assess necessity and
                balance it with your rights. You can opt out at any time.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                7. Data Retention Period
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  Contact form submissions: up to 3 years, for follow-ups or
                  dispute handling.
                </li>
                <li>
                  Server logs and IP data: up to 12 months, for security and
                  debugging.
                </li>
                <li>
                  Marketing contacts: until you unsubscribe or request deletion.
                </li>
              </ul>
            </section>

            {/* Processors and third-party services */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                8. Processors and Third-Party Services
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    Cloudflare
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    <strong className="text-foreground">Purpose:</strong> web
                    hosting, DNS, CDN, security, and Web Analytics.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    <strong className="text-foreground">Data:</strong> IP
                    address, country, URLs, device, browser, and performance
                    data.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    <strong className="text-foreground">Retention:</strong>{" "}
                    short-term logs for security, aggregated analytics without
                    personal identifiers.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    <strong className="text-foreground">Location:</strong>{" "}
                    global network.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    <strong className="text-foreground">
                      Transfer safeguard:
                    </strong>{" "}
                    Standard Contractual Clauses where required.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    <strong className="text-foreground">Privacy:</strong>{" "}
                    <Link
                      href="https://www.cloudflare.com/privacypolicy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      https://www.cloudflare.com/privacypolicy/
                    </Link>
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    <strong className="text-foreground">Web Analytics:</strong>{" "}
                    <Link
                      href="https://developers.cloudflare.com/analytics/web-analytics/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      https://developers.cloudflare.com/analytics/web-analytics/
                    </Link>
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Note:</strong> The
                    entire website, including hosting and caching, runs on
                    Cloudflare's infrastructure. All requests and data
                    transmissions are processed through their edge network.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    Formspree
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    <strong className="text-foreground">Purpose:</strong>{" "}
                    contact form delivery and spam filtering.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    <strong className="text-foreground">Data:</strong> name,
                    email, message content, IP, user agent.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    <strong className="text-foreground">Retention:</strong>{" "}
                    temporary storage for delivery and spam checks, then
                    deletion.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    <strong className="text-foreground">Location:</strong>{" "}
                    United States.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    <strong className="text-foreground">
                      Transfer safeguard:
                    </strong>{" "}
                    Standard Contractual Clauses.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Privacy:</strong>{" "}
                    <Link
                      href="https://formspree.io/legal/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      https://formspree.io/legal/privacy-policy
                    </Link>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    Calendly
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    <strong className="text-foreground">Purpose:</strong>{" "}
                    meeting scheduling and reminders.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    <strong className="text-foreground">Data:</strong> name,
                    email, booking details, time zone.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    <strong className="text-foreground">Retention:</strong>{" "}
                    stored for scheduling, deleted on request.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    <strong className="text-foreground">Location:</strong>{" "}
                    United States.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    <strong className="text-foreground">
                      Transfer safeguard:
                    </strong>{" "}
                    Standard Contractual Clauses.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Privacy:</strong>{" "}
                    <Link
                      href="https://calendly.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      https://calendly.com/privacy
                    </Link>
                  </p>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                9. Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Essential cookies operate without consent. We do not set
                analytics or marketing tracking cookies. Cloudflare Web
                Analytics uses no cookies. If we add non-essential cookies
                later, we will request consent.
              </p>
            </section>

            {/* User Rights */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                10. Your Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Under the General Data Protection Regulation (GDPR), you have
                the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  <strong className="text-foreground">Right of Access:</strong>{" "}
                  You can request copies of your personal data
                </li>
                <li>
                  <strong className="text-foreground">
                    Right to Rectification:
                  </strong>{" "}
                  You can request correction of inaccurate or incomplete data
                </li>
                <li>
                  <strong className="text-foreground">Right to Erasure:</strong>{" "}
                  You can request deletion of your personal data under certain
                  circumstances
                </li>
                <li>
                  <strong className="text-foreground">
                    Right to Restrict Processing:
                  </strong>{" "}
                  You can request restriction of processing your personal data
                </li>
                <li>
                  <strong className="text-foreground">
                    Right to Data Portability:
                  </strong>{" "}
                  You can request transfer of your data to another service
                  provider
                </li>
                <li>
                  <strong className="text-foreground">Right to Object:</strong>{" "}
                  You can object to processing of your personal data
                </li>
                <li>
                  <strong className="text-foreground">
                    Right to Withdraw Consent:
                  </strong>{" "}
                  You can withdraw consent at any time where processing is based
                  on consent
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To access, correct, delete, or restrict processing of your data,
                email privacy@iops.pro. We respond within 30 days and may verify
                your identity before acting.
              </p>
            </section>

            {/* Security */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                11. Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                All hosting, DNS, and web operations are managed by Cloudflare.
                HTTPS is enforced. Cloudflare provides DDoS protection, WAF, and
                bot mitigation. We restrict and log admin access.
              </p>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                12. International Transfers
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Because Cloudflare, Formspree, and Calendly process data in
                global locations, your data may leave your country. These
                providers use Standard Contractual Clauses to protect personal
                data during transfer.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                13. Children's Data
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not target or collect data from anyone under 16. If a
                child submits data, contact privacy@iops.pro and we will delete
                it.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                14. Policy Updates
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We post updates here and adjust the date. For major changes, we
                will show a notice banner or send email before they apply.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                15. Contact
              </h2>
              <div className="bg-muted rounded-lg p-6 space-y-2">
                <p className="text-foreground font-semibold">
                  Data Controller: IOPS
                </p>
                <p className="text-muted-foreground">
                  Email:{" "}
                  <EmailReveal
                    email="privacy@iops.pro"
                    className="font-medium"
                  />
                </p>
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
    </>
  );
}
