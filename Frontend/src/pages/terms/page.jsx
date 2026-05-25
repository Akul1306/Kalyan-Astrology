"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
const tableOfContents = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "about-services", title: "About Our Services" },
    { id: "spiritual-disclaimer", title: "Spiritual Disclaimer" },
    { id: "user-accounts", title: "User Accounts" },
    { id: "payment-refund", title: "Payment & Refund Policy" },
    { id: "shipping-delivery", title: "Shipping & Delivery" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "restrictions", title: "Restrictions on Use" },
    { id: "liability", title: "Liability Limitations" },
    { id: "termination", title: "Account Termination" },
    { id: "governing-law", title: "Governing Law" },
    { id: "contact", title: "Contact Us" },
];
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};
export default function TermsAndConditionsPage() {
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
              Terms & Conditions
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
              These terms govern your use of Kalyan's astrology software,
              spiritual e-commerce store, and educational content. Please read
              them carefully.
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
            {/* Acceptance */}
            <motion.section id="acceptance" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Acceptance of Terms
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  By accessing or using Kalyan's services, including our
                  astrology software, spiritual e-commerce store, educational
                  content, and related features, you agree to be bound by these
                  Terms & Conditions ("Terms"). If you do not agree to these
                  Terms, please do not use our services.
                </p>
                <p>
                  These Terms constitute a legally binding agreement between you
                  and Kalyan. We reserve the right to modify these Terms at any
                  time. Material changes will be notified through our platform
                  or via email. Continued use after changes constitutes
                  acceptance of the updated Terms.
                </p>
                <p>
                  You must be at least 18 years old (or the age of majority in
                  your jurisdiction) to use our services. If you are under 18,
                  you may use our services only with the supervision and consent
                  of a parent or guardian.
                </p>
              </div>
            </motion.section>

            {/* About Services */}
            <motion.section id="about-services" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                About Our Services
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Astrology Software
                  </h3>
                  <p>
                    Our AI-powered astrology platform provides Kundli report
                    generation, birth chart calculations, planetary position
                    analysis, dasha predictions, compatibility matching, and
                    personalized astrological insights. Reports are generated
                    using traditional Vedic astrology principles enhanced with
                    modern computational methods.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Spiritual E-Commerce Store
                  </h3>
                  <p>
                    We offer authentic spiritual products including yantras,
                    gemstones (ratnas), malas (prayer beads), religious kits,
                    puja items, and other spiritual accessories. Products are
                    sourced from verified suppliers and are described as
                    accurately as possible. We do not guarantee specific
                    spiritual outcomes from product usage.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Educational Content
                  </h3>
                  <p>
                    Our platform includes blogs, articles, courses, workshops,
                    and educational materials about Vedic astrology, spiritual
                    practices, and related topics. Content is provided for
                    educational and informational purposes only.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    User Accounts & Dashboard
                  </h3>
                  <p>
                    Registered users can create accounts, store multiple birth
                    charts, access report history, download reports, manage
                    orders, and customize preferences. Account features may vary
                    based on subscription tier or purchase history.
                  </p>
                </div>
                <p>
                  We reserve the right to modify, suspend, or discontinue any
                  aspect of our services at any time, with or without notice.
                  We do not guarantee uninterrupted or error-free service.
                </p>
              </div>
            </motion.section>

            {/* Spiritual Disclaimer */}
            <motion.section id="spiritual-disclaimer" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Spiritual Disclaimer
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-amber-900 mb-3">
                    Important Notice
                  </h3>
                  <p className="text-amber-900">
                    Astrological predictions, insights, and guidance provided
                    through our platform are based on traditional Vedic
                    principles and computational calculations. They are intended
                    for guidance, reflection, and personal growth purposes only.
                  </p>
                </div>
                <ul className="space-y-3 ml-4">
                  <li>
                    • <strong>Not Guarantees:</strong> Predictions and insights
                    are not guarantees of future events. Astrology is a tool for
                    self-reflection and guidance, not a definitive science.
                  </li>
                  <li>
                    • <strong>Personal Responsibility:</strong> You are solely
                    responsible for decisions made based on astrological
                    information. We do not provide financial, medical, legal, or
                    professional advice.
                  </li>
                  <li>
                    • <strong>Spiritual Products:</strong> Gemstones, yantras,
                    malas, and other spiritual products are sold for their
                    traditional and cultural significance. We do not guarantee
                    specific spiritual, material, or health outcomes.
                  </li>
                  <li>
                    • <strong>Individual Results:</strong> Astrological
                    interpretations may vary, and individual experiences with
                    spiritual practices differ. Results are not guaranteed.
                  </li>
                  <li>
                    • <strong>No Medical Advice:</strong> Our services do not
                    constitute medical, psychological, or professional advice.
                    Consult qualified professionals for health, legal, or
                    financial matters.
                  </li>
                </ul>
                <p>
                  By using our services, you acknowledge that you understand and
                  accept these limitations and will not hold Kalyan liable for
                  decisions made based on astrological or spiritual guidance.
                </p>
              </div>
            </motion.section>

            {/* User Accounts */}
            <motion.section id="user-accounts" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                User Accounts
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  To access certain features, you must create an account. You
                  agree to:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>
                    • Provide accurate, current, and complete information during
                    registration
                  </li>
                  <li>
                    • Maintain and update your account information promptly
                  </li>
                  <li>
                    • Keep your password secure and confidential
                  </li>
                  <li>
                    • Not share your account credentials with others
                  </li>
                  <li>
                    • Notify us immediately of unauthorized access
                  </li>
                  <li>
                    • Be responsible for all activities under your account
                  </li>
                </ul>
                <p>
                  You are responsible for maintaining the confidentiality of
                  your account. We are not liable for losses resulting from
                  unauthorized use of your account. You may be held liable for
                  losses incurred by us or others due to unauthorized use.
                </p>
                <p>
                  We reserve the right to suspend or terminate accounts that
                  violate these Terms or engage in fraudulent, abusive, or
                  illegal activities.
                </p>
              </div>
            </motion.section>

            {/* Payment & Refund */}
            <motion.section id="payment-refund" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Payment & Refund Policy
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Payment Terms
                  </h3>
                  <ul className="space-y-2 ml-4">
                    <li>
                      • All prices are displayed in Indian Rupees (INR) or as
                      specified. Prices are subject to change without notice.
                    </li>
                    <li>
                      • Payment must be made through our secure payment gateways
                      (Razorpay, Stripe, UPI, Cards). We do not store complete
                      payment card information.
                    </li>
                    <li>
                      • You agree to provide valid payment information and
                      authorize us to charge the specified amount.
                    </li>
                    <li>
                      • For subscription services, you authorize recurring
                      charges until cancellation.
                    </li>
                    <li>
                      • All payments are processed securely and are
                      non-refundable except as specified below.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Refund Policy
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Digital Products (Reports, Courses)
                      </h4>
                      <p>
                        Due to the immediate nature of digital delivery, refunds
                        are generally not available once a report is generated
                        or course access is granted. However, we may consider
                        refunds in exceptional circumstances:
                      </p>
                      <ul className="ml-4 mt-2 space-y-1">
                        <li>• Technical errors preventing access</li>
                        <li>• Duplicate purchases (within 24 hours)</li>
                        <li>• Unauthorized transactions</li>
                      </ul>
                      <p className="mt-2">
                        Refund requests must be submitted within 7 days of
                        purchase.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Physical Products (Gemstones, Yantras, etc.)
                      </h4>
                      <p>
                        Returns and refunds are available under the following
                        conditions:
                      </p>
                      <ul className="ml-4 mt-2 space-y-1">
                        <li>
                          • Return requests must be made within 7 days of
                          delivery
                        </li>
                        <li>
                          • Products must be unused, in original packaging, with
                          tags attached
                        </li>
                        <li>
                          • Custom or personalized items are non-refundable
                        </li>
                        <li>
                          • Return shipping costs are borne by the customer
                          unless the product is defective or incorrect
                        </li>
                        <li>
                          • Refunds will be processed within 14 business days
                          after receiving returned items
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Subscriptions
                      </h4>
                      <p>
                        You may cancel subscriptions at any time. Cancellation
                        takes effect at the end of the current billing period.
                        No partial refunds for unused subscription time.
                      </p>
                    </div>
                  </div>
                  <p className="mt-4">
                    To request a refund, contact{" "}
                    <a href="mailto:support@kalyan.example" className="text-blue-600 hover:underline">
                      support@kalyan.example
                    </a>{" "}
                    with your order number and reason for refund. Refunds are
                    processed to the original payment method.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Shipping & Delivery */}
            <motion.section id="shipping-delivery" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Shipping & Delivery
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  For physical products, we ship to addresses within India and
                  select international locations. Shipping terms:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>
                    • <strong>Processing Time:</strong> Orders are processed
                    within 2-3 business days (excluding weekends and holidays)
                  </li>
                  <li>
                    • <strong>Shipping Methods:</strong> Standard shipping (5-7
                    business days) and Express shipping (2-3 business days)
                    available
                  </li>
                  <li>
                    • <strong>Shipping Costs:</strong> Calculated at checkout
                    based on weight, destination, and selected method
                  </li>
                  <li>
                    • <strong>Tracking:</strong> Tracking information is provided
                    via email once the order ships
                  </li>
                  <li>
                    • <strong>Delivery:</strong> We are not responsible for
                    delays caused by courier services, customs, or incorrect
                    addresses
                  </li>
                  <li>
                    • <strong>International Orders:</strong> May be subject to
                    customs duties and taxes (customer's responsibility)
                  </li>
                  <li>
                    • <strong>Damaged Items:</strong> Report damage within 48
                    hours of delivery with photos for replacement or refund
                  </li>
                  <li>
                    • <strong>Lost Packages:</strong> Contact us if your package
                    doesn't arrive within the estimated timeframe. We'll
                    investigate and provide a resolution
                  </li>
                </ul>
                <p>
                  Digital products (reports, courses) are delivered immediately
                  upon purchase completion via email or dashboard access.
                </p>
              </div>
            </motion.section>

            {/* Intellectual Property */}
            <motion.section id="intellectual-property" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Intellectual Property
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  All content, software, algorithms, designs, logos, trademarks,
                  and materials on our platform are owned by Kalyan or our
                  licensors and are protected by copyright, trademark, and other
                  intellectual property laws.
                </p>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Your Rights
                  </h3>
                  <ul className="space-y-2 ml-4">
                    <li>
                      • You may access and use our services for personal,
                      non-commercial purposes
                    </li>
                    <li>
                      • You may download reports for personal use
                    </li>
                    <li>
                      • You retain ownership of your birth data and personal
                      information
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Restrictions
                  </h3>
                  <ul className="space-y-2 ml-4">
                    <li>
                      • You may not copy, reproduce, distribute, or create
                      derivative works from our content without permission
                    </li>
                    <li>
                      • You may not use our algorithms, software, or reports for
                      commercial purposes without a license
                    </li>
                    <li>
                      • You may not remove copyright notices or proprietary
                      markings
                    </li>
                    <li>
                      • You may not reverse engineer, decompile, or disassemble
                      our software
                    </li>
                    <li>
                      • You may not use our trademarks or logos without written
                      consent
                    </li>
                  </ul>
                </div>
                <p>
                  Violation of intellectual property rights may result in legal
                  action and termination of your account.
                </p>
              </div>
            </motion.section>

            {/* Restrictions */}
            <motion.section id="restrictions" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Restrictions on Use
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>You agree not to:</p>
                <ul className="space-y-2 ml-4">
                  <li>
                    • Use our services for any illegal, fraudulent, or harmful
                    purposes
                  </li>
                  <li>
                    • Attempt to gain unauthorized access to our systems or
                    other users' accounts
                  </li>
                  <li>
                    • Interfere with or disrupt the operation of our services
                  </li>
                  <li>
                    • Transmit viruses, malware, or malicious code
                  </li>
                  <li>
                    • Scrape, crawl, or use automated tools to access our
                    platform without permission
                  </li>
                  <li>
                    • Impersonate others or provide false information
                  </li>
                  <li>
                    • Harass, abuse, or harm other users
                  </li>
                  <li>
                    • Use our services to provide competing astrology or
                    spiritual services
                  </li>
                  <li>
                    • Violate any applicable laws or regulations
                  </li>
                  <li>
                    • Attempt to circumvent security measures or payment systems
                  </li>
                </ul>
                <p>
                  Violation of these restrictions may result in immediate
                  account termination and legal action.
                </p>
              </div>
            </motion.section>

            {/* Liability */}
            <motion.section id="liability" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Liability Limitations
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Important Legal Notice
                  </h3>
                  <p className="mb-4">
                    To the maximum extent permitted by law:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>
                      • Our services are provided "as is" and "as available"
                      without warranties of any kind, express or implied
                    </li>
                    <li>
                      • We do not guarantee accuracy, completeness, or
                      reliability of astrological predictions or insights
                    </li>
                    <li>
                      • We are not liable for decisions made based on
                      astrological information
                    </li>
                    <li>
                      • We are not liable for delays, errors, or interruptions
                      in service
                    </li>
                    <li>
                      • We are not liable for loss of data, profits, or
                      business opportunities
                    </li>
                    <li>
                      • Our total liability shall not exceed the amount you paid
                      us in the 12 months preceding the claim
                    </li>
                    <li>
                      • We are not liable for third-party actions, products, or
                      services
                    </li>
                    <li>
                      • We are not liable for force majeure events (natural
                      disasters, wars, pandemics, etc.)
                    </li>
                  </ul>
                </div>
                <p>
                  Some jurisdictions do not allow exclusion of implied
                  warranties or limitation of liability. In such cases, our
                  liability is limited to the fullest extent permitted by law.
                </p>
                <p>
                  You agree to indemnify and hold Kalyan harmless from any
                  claims, damages, losses, or expenses arising from your use of
                  our services or violation of these Terms.
                </p>
              </div>
            </motion.section>

            {/* Termination */}
            <motion.section id="termination" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Account Termination
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We may suspend or terminate your account at any time, with or
                  without notice, for:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Violation of these Terms</li>
                  <li>• Fraudulent or illegal activity</li>
                  <li>• Abuse of our services or other users</li>
                  <li>• Non-payment of fees (for paid services)</li>
                  <li>• Extended account inactivity</li>
                  <li>• At our sole discretion for any reason</li>
                </ul>
                <p>
                  You may terminate your account at any time by contacting
                  support or using account deletion features. Upon termination:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Your access to services will be revoked</li>
                  <li>• Your account data will be deleted per our Privacy
                    Policy</li>
                  <li>• You will lose access to purchased reports and courses
                    (download before deletion)</li>
                  <li>• Outstanding payments remain due</li>
                  <li>• Provisions that should survive termination will
                    continue</li>
                </ul>
              </div>
            </motion.section>

            {/* Governing Law */}
            <motion.section id="governing-law" {...fadeInUp} className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Governing Law & Dispute Resolution
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  These Terms are governed by the laws of India, without regard
                  to conflict of law principles.
                </p>
                <p>
                  Any disputes arising from these Terms or our services shall be
                  resolved through:
                </p>
                <ol className="space-y-2 ml-4 list-decimal">
                  <li>
                    <strong>Negotiation:</strong> Parties will attempt to
                    resolve disputes amicably through good faith negotiation
                  </li>
                  <li>
                    <strong>Mediation:</strong> If negotiation fails, disputes
                    will be referred to mediation under the Arbitration and
                    Conciliation Act, 2015 (India)
                  </li>
                  <li>
                    <strong>Arbitration:</strong> If mediation fails, disputes
                    will be resolved through binding arbitration in [City,
                    State], India, under Indian arbitration laws
                  </li>
                  <li>
                    <strong>Courts:</strong> For matters not subject to
                    arbitration, exclusive jurisdiction lies with courts in
                    [City, State], India
                  </li>
                </ol>
                <p>
                  You waive any right to participate in class-action lawsuits or
                  class-wide arbitration.
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
                  If you have questions about these Terms & Conditions, please
                  contact us:
                </p>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <p className="mb-2">
                    <strong>Email:</strong>{" "}
                    <a href="mailto:legal@kalyan.example" className="text-blue-600 hover:underline">
                      legal@kalyan.example
                    </a>
                  </p>
                  <p className="mb-2">
                    <strong>Support:</strong>{" "}
                    <a href="mailto:support@kalyan.example" className="text-blue-600 hover:underline">
                      support@kalyan.example
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong> Kalyan Legal Team, [Your Company
                    Address], India
                  </p>
                </div>
                <p>
                  We aim to respond to all inquiries within 5-7 business days.
                </p>
              </div>
            </motion.section>

            {/* Final Notice */}
            <motion.div {...fadeInUp} className="mt-16 p-6 bg-gray-50 border border-gray-200 rounded-xl">
              <p className="text-sm text-gray-600 italic">
                By using Kalyan's services, you acknowledge that you have read,
                understood, and agree to be bound by these Terms & Conditions.
                If you do not agree, please discontinue use of our services
                immediately.
              </p>
            </motion.div>
          </article>
        </div>
      </div>
    </main>);
}
