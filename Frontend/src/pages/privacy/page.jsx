"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
const tableOfContents = [
    { id: "introduction", title: "Introduction" },
    { id: "data-collection", title: "What Data We Collect" },
    { id: "data-usage", title: "Why We Collect Data" },
    { id: "ai-systems", title: "AI Systems & Predictions" },
    { id: "cookies-tracking", title: "Cookies & Tracking" },
    { id: "third-party-services", title: "Third-Party Services" },
    { id: "payment-security", title: "Payment & Security" },
    { id: "data-sharing", title: "Data Sharing & Retention" },
    { id: "user-rights", title: "Your Rights" },
    { id: "account-deletion", title: "Account Deletion & Opt-Out" },
    { id: "children-privacy", title: "Children's Privacy" },
    { id: "changes", title: "Changes to This Policy" },
    { id: "contact", title: "Contact Us" },
];
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};
export default function PrivacyPolicyPage() {
    const [activeSection, setActiveSection] = useState("");
    useEffect(() => {
        const handleScroll = () => {
            const sections = tableOfContents.map((item) => item.id);
            const scrollPosition = window.scrollY + 150;
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };
    return (<main className="min-h-screen bg-white text-gray-900 antialiased">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Your privacy is sacred to us. This policy explains how we collect,
              use, and protect your personal information when you use our
              astrology software, spiritual e-commerce store, and educational
              content.
            </p>
            <p className="text-sm text-gray-500 mt-6">
              Last updated: November 18, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-6 sm:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          {/* Table of Contents */}
          <aside className="hidden lg:block">
            <motion.nav initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="sticky top-24 space-y-2">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Contents
              </h2>
              {tableOfContents.map((item) => (<button key={item.id} onClick={() => scrollToSection(item.id)} className={`block w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200 ${activeSection === item.id
                ? "text-gray-900 bg-gray-100 font-medium"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}>
                  {item.title}
                </button>))}
            </motion.nav>
          </aside>

          {/* Content */}
          <article className="prose prose-lg max-w-none">
            {/* Introduction */}
            <motion.section id="introduction" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Introduction
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Welcome to Kalyan, an astrology ecosystem that combines
                  ancient Vedic wisdom with modern technology. We are committed
                  to protecting your privacy and ensuring the security of your
                  personal information. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your data when you
                  interact with our services.
                </p>
                <p>
                  Our services include AI-powered astrology software, Kundli
                  report generation, spiritual e-commerce (yantras, gemstones,
                  malas, religious kits), educational content (blogs, courses,
                  workshops), user accounts, dashboards, and payment processing.
                </p>
                <p>
                  By using our services, you agree to the collection and use of
                  information in accordance with this policy. We comply with the
                  General Data Protection Regulation (GDPR), the Information
                  Technology Act, 2000 (India), and the Consumer Protection Act,
                  2019 (India).
                </p>
              </div>
            </motion.section>

            {/* What Data We Collect */}
            <motion.section id="data-collection" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                What Data We Collect
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Account Information
                  </h3>
                  <p>
                    When you create an account, we collect your name, email
                    address, phone number (optional), and password (encrypted).
                    You may also provide additional profile information such as
                    your location and preferences.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Birth Details & Astrological Data
                  </h3>
                  <p>
                    To generate accurate Kundli reports and astrological
                    predictions, we collect birth information including date,
                    time, and place of birth. This data is essential for
                    calculating planetary positions, dasha periods, and
                    astrological charts. You may choose to store multiple birth
                    charts in your account.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Payment Information
                  </h3>
                  <p>
                    When you make purchases for spiritual products, courses, or
                    premium reports, we collect payment details through secure
                    third-party payment gateways (Razorpay, Stripe, UPI, Card
                    payments). We do not store your complete card numbers or
                    CVV codes. Payment processors handle transaction data
                    according to PCI DSS standards.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Usage & Interaction Data
                  </h3>
                  <p>
                    We collect information about how you interact with our
                    services, including pages visited, features used, report
                    downloads, product views, search queries, and time spent on
                    the platform. This helps us improve your experience and
                    personalize content.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Device & Technical Information
                  </h3>
                  <p>
                    We automatically collect device information such as IP
                    address, browser type, operating system, device identifiers,
                    and screen resolution. This data is used for security,
                    analytics, and ensuring compatibility across devices.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Communications
                  </h3>
                  <p>
                    When you contact our support team, participate in surveys,
                    subscribe to newsletters, or engage with our educational
                    content, we collect the information you provide, including
                    messages, feedback, and preferences.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Why We Collect Data */}
            <motion.section id="data-usage" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Why We Collect Data
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We use your data for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-3 ml-4">
                  <li>
                    <strong>Astrology Calculations:</strong> Birth details are
                    used to generate accurate Kundli charts, planetary
                    positions, dasha calculations, and astrological predictions
                    using traditional Vedic algorithms.
                  </li>
                  <li>
                    <strong>Service Delivery:</strong> To process orders,
                    deliver spiritual products (yantras, gemstones, malas),
                    provide access to courses and workshops, and generate
                    downloadable reports.
                  </li>
                  <li>
                    <strong>Personalization:</strong> To customize your
                    dashboard, recommend relevant content, suggest compatible
                    gemstones based on your chart, and tailor educational
                    materials to your interests.
                  </li>
                  <li>
                    <strong>Account Management:</strong> To maintain your
                    account, store your birth charts, save report history, and
                    enable seamless access across devices.
                  </li>
                  <li>
                    <strong>Payment Processing:</strong> To process
                    transactions, manage subscriptions, handle refunds, and
                    comply with financial regulations.
                  </li>
                  <li>
                    <strong>Communication:</strong> To send order
                    confirmations, shipping updates, important service
                    notifications, and respond to your inquiries.
                  </li>
                  <li>
                    <strong>Security & Fraud Prevention:</strong> To detect and
                    prevent unauthorized access, fraud, abuse, and ensure
                    platform security.
                  </li>
                  <li>
                    <strong>Analytics & Improvement:</strong> To analyze usage
                    patterns, identify technical issues, improve our algorithms,
                    and enhance user experience.
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> To comply with applicable
                    laws, regulations, and legal processes.
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* AI Systems */}
            <motion.section id="ai-systems" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                AI Systems & Predictions
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Our platform uses artificial intelligence and machine learning
                  to enhance astrological calculations, generate personalized
                  insights, and improve prediction accuracy. Here's how we
                  handle data in our AI systems:
                </p>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    AI Processing Principles
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      • Birth details are processed using non-personally
                      identifiable methods where possible. Your name and contact
                      information are not used in AI model training.
                    </li>
                    <li>
                      • Astrological calculations combine traditional Vedic
                      algorithms with AI-powered pattern recognition to provide
                      more nuanced insights.
                    </li>
                    <li>
                      • AI models are trained on anonymized astrological data
                      sets and do not retain personally identifiable information
                      in their training data.
                    </li>
                    <li>
                      • Predictions and insights are generated in real-time
                      based on your birth chart data, not stored predictions.
                    </li>
                    <li>
                      • You can opt out of AI-enhanced features and use
                      traditional calculation methods only.
                    </li>
                  </ul>
                </div>
                <p>
                  <strong>Important:</strong> AI-generated predictions are
                  guidance tools based on astrological principles and should not
                  be considered absolute guarantees. They are meant to provide
                  insights and perspectives, not definitive outcomes.
                </p>
              </div>
            </motion.section>

            {/* Cookies & Tracking */}
            <motion.section id="cookies-tracking" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Cookies & Tracking Technologies
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We use cookies, web beacons, and similar tracking technologies
                  to enhance your experience, analyze usage, and provide
                  personalized content.
                </p>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Types of Cookies We Use
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <strong>Essential Cookies:</strong> Required for the
                      platform to function properly. These include session
                      management, authentication, and security cookies. You
                      cannot opt out of these.
                    </li>
                    <li>
                      <strong>Analytics Cookies:</strong> Help us understand
                      how visitors interact with our platform. We use services
                      like Google Analytics (with IP anonymization) to track
                      page views, user flows, and engagement metrics.
                    </li>
                    <li>
                      <strong>Functional Cookies:</strong> Remember your
                      preferences, language settings, and customization choices
                      to provide a personalized experience.
                    </li>
                    <li>
                      <strong>Marketing Cookies:</strong> Used to deliver
                      relevant advertisements and track campaign effectiveness.
                      These are optional and can be disabled.
                    </li>
                  </ul>
                </div>
                <p>
                  You can control cookies through your browser settings. However,
                  disabling certain cookies may limit functionality. We also
                  provide a cookie consent banner where you can manage your
                  preferences.
                </p>
              </div>
            </motion.section>

            {/* Third-Party Services */}
            <motion.section id="third-party-services" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Third-Party Services
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We integrate with trusted third-party services to provide
                  essential functionality. These services have their own privacy
                  policies:
                </p>
                <ul className="space-y-3">
                  <li>
                    <strong>Payment Processors:</strong> Razorpay, Stripe, and
                    UPI gateways handle payment transactions. They collect
                    payment information according to PCI DSS standards.
                  </li>
                  <li>
                    <strong>Analytics:</strong> Google Analytics (with IP
                    anonymization) helps us understand usage patterns and
                    improve our services.
                  </li>
                  <li>
                    <strong>Cloud Hosting:</strong> Our infrastructure is hosted
                    on secure cloud platforms that comply with international
                    data protection standards.
                  </li>
                  <li>
                    <strong>Email Services:</strong> We use email service
                    providers to send transactional and marketing emails.
                  </li>
                  <li>
                    <strong>Shipping Partners:</strong> For physical product
                    delivery, we share necessary shipping information with
                    courier services.
                  </li>
                </ul>
                <p>
                  We only share data necessary for these services to function.
                  Third parties are contractually obligated to protect your data
                  and use it solely for the purposes we specify.
                </p>
              </div>
            </motion.section>

            {/* Payment & Security */}
            <motion.section id="payment-security" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Payment & Security
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We take the security of your payment information seriously. All
                  payment transactions are processed through PCI DSS compliant
                  payment gateways. We do not store your complete credit card
                  numbers, CVV codes, or sensitive payment credentials on our
                  servers.
                </p>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Security Measures
                  </h3>
                  <ul className="space-y-2">
                    <li>• End-to-end encryption (SSL/TLS) for all data transmission</li>
                    <li>• Encrypted storage of sensitive data</li>
                    <li>• Regular security audits and vulnerability assessments</li>
                    <li>• Multi-factor authentication for account access</li>
                    <li>• Secure password hashing (bcrypt/argon2)</li>
                    <li>• Rate limiting and DDoS protection</li>
                    <li>• Regular backups with encrypted storage</li>
                  </ul>
                </div>
                <p>
                  Despite our security measures, no method of transmission over
                  the internet is 100% secure. While we strive to protect your
                  data, we cannot guarantee absolute security.
                </p>
              </div>
            </motion.section>

            {/* Data Sharing & Retention */}
            <motion.section id="data-sharing" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Data Sharing & Retention
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    We Do Not Sell Your Data
                  </h3>
                  <p>
                    We do not sell, rent, or trade your personal information to
                    third parties for marketing purposes. Your birth details,
                    astrological data, and personal information remain private
                    and are used solely to provide our services.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    When We May Share Data
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      • With your explicit consent for specific purposes
                    </li>
                    <li>
                      • With service providers who assist in operations (under
                      strict confidentiality agreements)
                    </li>
                    <li>
                      • To comply with legal obligations, court orders, or
                      government requests
                    </li>
                    <li>
                      • To protect our rights, property, or safety, or that of
                      our users
                    </li>
                    <li>
                      • In connection with a business transfer (merger,
                      acquisition, etc.), with notice to users
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Data Retention
                  </h3>
                  <p>
                    We retain your data for as long as necessary to provide our
                    services and fulfill legal obligations:
                  </p>
                  <ul className="space-y-2">
                    <li>
                      • Account data: Retained while your account is active and
                      for 3 years after deletion for legal compliance
                    </li>
                    <li>
                      • Birth charts & reports: Stored until you delete them or
                      close your account
                    </li>
                    <li>
                      • Transaction records: Retained for 7 years as required by
                      financial regulations
                    </li>
                    <li>
                      • Analytics data: Aggregated and anonymized data may be
                      retained indefinitely
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* User Rights */}
            <motion.section id="user-rights" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Your Rights
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Under GDPR, Indian IT Act, and Consumer Protection Act, you
                  have the following rights:
                </p>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Right to Access
                    </h3>
                    <p>
                      You can request a copy of all personal data we hold about
                      you, including birth charts, account information, and usage
                      data.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Right to Rectification
                    </h3>
                    <p>
                      You can update or correct inaccurate personal information
                      through your account settings or by contacting us.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Right to Erasure
                    </h3>
                    <p>
                      You can request deletion of your personal data, subject to
                      legal retention requirements.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Right to Restrict Processing
                    </h3>
                    <p>
                      You can request that we limit how we use your data in
                      certain circumstances.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Right to Data Portability
                    </h3>
                    <p>
                      You can request your data in a structured, machine-readable
                      format to transfer to another service.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Right to Object
                    </h3>
                    <p>
                      You can object to processing of your data for marketing
                      purposes or legitimate interests.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Right to Withdraw Consent
                    </h3>
                    <p>
                      Where processing is based on consent, you can withdraw it
                      at any time.
                    </p>
                  </div>
                </div>
                <p>
                  To exercise these rights, contact us at{" "}
                  <a href="mailto:privacy@kalyan.example" className="text-blue-600 hover:underline">
                    privacy@kalyan.example
                  </a>
                  . We will respond within 30 days.
                </p>
              </div>
            </motion.section>

            {/* Account Deletion */}
            <motion.section id="account-deletion" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Account Deletion & Opt-Out
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  You can delete your account at any time through your account
                  settings or by contacting support. Upon deletion:
                </p>
                <ul className="space-y-2">
                  <li>
                    • Your account, profile information, and stored birth charts
                    will be permanently deleted
                  </li>
                  <li>
                    • You will lose access to purchased reports and course
                    materials (download them before deletion)
                  </li>
                  <li>
                    • Transaction records will be retained for legal compliance
                    but anonymized
                  </li>
                  <li>
                    • You will be unsubscribed from marketing communications
                  </li>
                </ul>
                <p>
                  To opt out of marketing emails, click the unsubscribe link in
                  any email or update your preferences in account settings. You
                  cannot opt out of essential service communications (order
                  confirmations, security alerts).
                </p>
              </div>
            </motion.section>

            {/* Children's Privacy */}
            <motion.section id="children-privacy" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Children's Privacy
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Our services are not intended for children under 13 years of
                  age (or 16 in the EU). We do not knowingly collect personal
                  information from children. If you believe we have collected
                  data from a child, please contact us immediately, and we will
                  delete it promptly.
                </p>
                <p>
                  Parents or guardians may create accounts for minors with
                  appropriate supervision and consent.
                </p>
              </div>
            </motion.section>

            {/* Changes to Policy */}
            <motion.section id="changes" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Changes to This Policy
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We may update this Privacy Policy periodically to reflect
                  changes in our practices, technology, legal requirements, or
                  services. We will notify you of material changes by:
                </p>
                <ul className="space-y-2">
                  <li>• Posting the updated policy on this page</li>
                  <li>• Updating the "Last updated" date</li>
                  <li>
                    • Sending an email notification for significant changes
                  </li>
                  <li>
                    • Displaying a prominent notice on our platform
                  </li>
                </ul>
                <p>
                  Continued use of our services after changes constitutes
                  acceptance of the updated policy. We encourage you to review
                  this policy periodically.
                </p>
              </div>
            </motion.section>

            {/* Contact */}
            <motion.section id="contact" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Contact Us
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  If you have questions, concerns, or requests regarding this
                  Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <p className="mb-2">
                    <strong>Email:</strong>{" "}
                    <a href="mailto:privacy@kalyan.example" className="text-blue-600 hover:underline">
                      privacy@kalyan.example
                    </a>
                  </p>
                  <p className="mb-2">
                    <strong>Data Protection Officer:</strong>{" "}
                    <a href="mailto:dpo@kalyan.example" className="text-blue-600 hover:underline">
                      dpo@kalyan.example
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong> Kalyan Privacy Team, [Your
                    Company Address], India
                  </p>
                </div>
                <p>
                  For EU residents, you also have the right to lodge a complaint
                  with your local data protection authority if you believe we
                  have violated your privacy rights.
                </p>
              </div>
            </motion.section>
          </article>
        </div>
      </div>
    </main>);
}
