import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background">
      <Helmet>
        <title>Privacy Policy — ProScientific Solutions</title>
        <meta name="description" content="Privacy Policy for ProScientific Solutions. Learn how we collect, use, and protect your personal information." />
      </Helmet>

      <section className="py-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <nav className="flex mb-8 text-xs font-medium text-slate-400 uppercase tracking-widest">
            <Link to="/" className="hover:text-secondary">Home</Link>
            <span className="mx-3">/</span>
            <span className="text-slate-600">Privacy Policy</span>
          </nav>
          <h1 className="font-['Hanken_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-primary mb-4">Privacy Policy</h1>
          <p className="text-[14px] text-on-surface-variant mb-2">Last updated: August 2026</p>
        </div>
      </section>

      <section className="py-12 max-w-[1280px] mx-auto px-5 md:px-16">
        <div className="bg-white border border-outline-variant p-8 md:p-12 space-y-8">
          <div>
            <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-4">1. Information We Collect</h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">When you submit an inquiry, request a quote, or contact us through our website, we may collect the following personal information:</p>
            <ul className="mt-3 space-y-2 text-[15px] text-on-surface-variant list-disc list-inside">
              <li>Full name</li>
              <li>Company or organization name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Details of your product or service inquiry</li>
            </ul>
          </div>

          <div>
            <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-4">2. How We Use Your Information</h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">We use the information we collect to:</p>
            <ul className="mt-3 space-y-2 text-[15px] text-on-surface-variant list-disc list-inside">
              <li>Respond to your inquiries and provide quotations</li>
              <li>Deliver requested products and technical services</li>
              <li>Communicate about orders, installations, and support</li>
              <li>Improve our website and customer experience</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-4">3. Data Protection</h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and is only accessible to authorized personnel who need it to perform their duties.</p>
          </div>

          <div>
            <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-4">4. Data Sharing</h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">We do not sell, trade, or rent your personal information to third parties. We may share your data with:</p>
            <ul className="mt-3 space-y-2 text-[15px] text-on-surface-variant list-disc list-inside">
              <li>Manufacturing partners — only when required to fulfill product orders or warranty services</li>
              <li>Service providers — who assist in our operations under strict confidentiality agreements</li>
              <li>Legal authorities — when required by law or regulation</li>
            </ul>
          </div>

          <div>
            <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-4">5. Cookies & Analytics</h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">Our website may use cookies and analytics tools to improve your browsing experience and understand site usage patterns. You can control cookie settings through your browser preferences.</p>
          </div>

          <div>
            <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-4">6. Your Rights</h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">You have the right to:</p>
            <ul className="mt-3 space-y-2 text-[15px] text-on-surface-variant list-disc list-inside">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </div>

          <div>
            <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-4">7. Contact Us</h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">If you have questions about this Privacy Policy or how we handle your data, please contact us:</p>
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
