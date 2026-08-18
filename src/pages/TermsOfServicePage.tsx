import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function TermsOfServicePage() {
  return (
    <div className="bg-background">
      <Helmet>
        <title>Terms of Service — ProScientific Solutions</title>
        <meta name="description" content="Terms of Service for ProScientific Solutions. Read the terms governing use of our website and services." />
      </Helmet>

      <section className="py-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <nav className="flex mb-8 text-xs font-medium text-slate-400 uppercase tracking-widest">
            <Link to="/" className="hover:text-secondary">Home</Link>
            <span className="mx-3">/</span>
            <span className="text-slate-600">Terms of Service</span>
          </nav>
          <h1 className="font-['Hanken_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-primary mb-4">Terms of Service</h1>
          <p className="text-[14px] text-on-surface-variant mb-2">Last updated: August 2026</p>
        </div>
      </section>

      <section className="py-12 max-w-[1280px] mx-auto px-5 md:px-16">
        <div className="bg-white border border-outline-variant p-8 md:p-12 space-y-8">
          <div>
            <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-4">1. Acceptance of Terms</h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">By accessing or using the ProScientific Solutions website (psci-sol.com) and our services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.</p>
          </div>

          <div>
            <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-4">2. Products & Services</h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">All product specifications, descriptions, and images on this website are for informational purposes only. ProScientific Solutions reserves the right to modify product specifications, pricing, and availability without prior notice. Quotations provided are valid for 30 days unless otherwise stated.</p>
          </div>

          <div>
            <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-4">3. Orders & Quotations</h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">Submitting an inquiry or quote request does not constitute a binding order. An order becomes binding only upon written confirmation from ProScientific Solutions and receipt of agreed payment terms. We reserve the right to decline any order at our discretion.</p>
          </div>

          <div>
            <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-4">4. Pricing & Payment</h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">All prices are quoted in USD unless otherwise specified. Prices do not include shipping, installation, or applicable taxes unless explicitly stated. Payment terms will be specified in individual quotations and invoices.</p>
          </div>

          <div>
            <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-4">5. Warranty & Liability</h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">Products are covered by the original manufacturer's warranty. ProScientific Solutions provides additional support for installation, calibration, and technical assistance as separately agreed. We are not liable for indirect, incidental, or consequential damages arising from the use of our products or services.</p>
          </div>

          <div>
            <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-4">6. Intellectual Property</h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">All content on this website — including text, images, logos, graphics, and software — is the property of ProScientific Solutions or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without written permission.</p>
          </div>

          <div>
            <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-4">7. Governing Law</h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">These Terms of Service are governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dubai.</p>
          </div>

          <div>
            <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-4">8. Contact</h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">For questions about these Terms, please contact us:</p>
            <div className="mt-3 text-[15px] text-on-surface-variant">
              <p><strong>Email:</strong> info@psci-sol.com</p>
              <p><strong>Phone:</strong> +971 52 781 0506</p>
              <p><strong>Address:</strong> IFZA Business Park, Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, UAE</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
