import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { submitInquiry } from '../services/siteApi'

export default function ContactPage() {
  const [searchParams] = useSearchParams()
  const productId = searchParams.get('product') || ''
  const productName = searchParams.get('productName') || ''

  const [form, setForm] = useState({ name: '', organization: '', email: '', phone: '', interest: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      await submitInquiry({ name: form.name, company: form.organization, email: form.email, phone: form.phone, message: form.message, industry: form.interest, budget: '', productId })
      setSubmitted(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background">
      <main className="max-w-[1280px] mx-auto px-5 md:px-16 py-12">
        {/* Hero */}
        <section className="mb-12">
          <h1 className="font-['Hanken_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-primary mb-4">Contact Our Specialists</h1>
          <p className="text-[18px] leading-relaxed text-on-surface-variant max-w-2xl">
            Whether you're looking for precision instrumentation or require technical support for existing inventory, our team at <span className="font-bold">PROSCIENTIFIC SOLUTIONS</span> is ready to assist your laboratory's needs.
          </p>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form */}
          <div className="lg:col-span-7 bg-white border border-outline-variant p-6 shadow-sm">
            <h2 className="font-['Hanken_Grotesk'] text-[20px] font-semibold text-primary mb-6">Inquiry Form</h2>
            {submitted ? (
              <div className="text-center py-12">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-white mb-4">
                  <span className="material-symbols-outlined text-[32px]">check</span>
                </div>
                <h3 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-2">Thank you!</h3>
                <p className="text-[16px] text-on-surface-variant">Your inquiry has been submitted. We'll respond within 2-4 business hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', organization: '', email: '', phone: '', interest: '', message: '' }) }} className="mt-6 text-secondary font-['Geist'] text-[14px] font-bold hover:underline">Submit another inquiry</button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {productName && (
                  <div className="bg-surface-container-low border border-outline-variant p-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">inventory_2</span>
                    <div>
                      <span className="text-[12px] font-['Geist'] font-bold text-on-surface-variant uppercase">Inquiry about</span>
                      <p className="text-[16px] font-semibold text-primary">{productName}</p>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-['Geist'] text-[14px] font-medium text-on-surface-variant block">FULL NAME</label>
                    <input className="w-full bg-background border border-outline px-4 py-3 text-[16px] rounded-none focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" placeholder="Enter your full name" value={form.name} onChange={(e) => handleChange('name', e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <label className="font-['Geist'] text-[14px] font-medium text-on-surface-variant block">ORGANIZATION</label>
                    <input className="w-full bg-background border border-outline px-4 py-3 text-[16px] rounded-none focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" placeholder="Company or Institution" value={form.organization} onChange={(e) => handleChange('organization', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-['Geist'] text-[14px] font-medium text-on-surface-variant block">EMAIL ADDRESS</label>
                    <input className="w-full bg-background border border-outline px-4 py-3 text-[16px] rounded-none focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" placeholder="email@example.com" type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <label className="font-['Geist'] text-[14px] font-medium text-on-surface-variant block">PRODUCT INTEREST</label>
                    <select className="w-full bg-background border border-outline px-4 py-3 text-[16px] rounded-none appearance-none focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" value={form.interest} onChange={(e) => handleChange('interest', e.target.value)}>
                      <option value="">Select a category...</option>
                      <option>Analytical Instruments</option>
                      <option>Laboratory Consumables</option>
                      <option>Life Science Research</option>
                      <option>Technical Services</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-['Geist'] text-[14px] font-medium text-on-surface-variant block">PHONE NUMBER</label>
                  <input className="w-full bg-background border border-outline px-4 py-3 text-[16px] rounded-none focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" placeholder="+971 50 123 4567" type="tel" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <label className="font-['Geist'] text-[14px] font-medium text-on-surface-variant block">INQUIRY DETAILS</label>
                  <textarea className="w-full bg-background border border-outline px-4 py-3 text-[16px] rounded-none focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" placeholder="Please describe your specific requirements or technical questions..." rows={5} value={form.message} onChange={(e) => handleChange('message', e.target.value)} required />
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <button type="submit" disabled={loading} className="bg-primary text-white px-8 py-3 font-['Geist'] text-[14px] font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all disabled:opacity-50">
                    {loading ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                  <p className="text-[12px] font-['Geist'] text-on-surface-variant italic">Typical response time: 2-4 business hours.</p>
                </div>
                {error && <p className="text-[13px] font-semibold text-red-600 mt-2">Submission failed. Please try again or contact us directly at info@psci-sol.com</p>}
              </form>
            )}
          </div>

          {/* Side Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-primary-container p-6 text-white border border-primary">
              <h2 className="font-['Hanken_Grotesk'] text-[20px] font-semibold mb-6">Contact Details</h2>
              <div className="space-y-6">
                {[
                  { icon: 'phone_in_talk', label: 'Main Line', value: '+971 52 781 0506' },
                  { icon: 'mail', label: 'Email Inquiry', value: 'info@psci-sol.com' },
                  { icon: 'location_on', label: 'Headquarters', value: 'IFZA Business Park, Building A1\nDubai Digital Park, Dubai Silicon Oasis\nDubai, United Arab Emirates', link: 'https://www.google.com/maps?q=25.1084,55.3784&z=17' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary-fixed">{item.icon}</span>
                    <div>
                      <p className="font-['Geist'] text-[12px] font-semibold text-white/60 uppercase tracking-widest">{item.label}</p>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[16px] whitespace-pre-line hover:underline inline-flex items-start gap-1">
                          {item.value}
                          <span className="material-symbols-outlined text-[14px] mt-1">open_in_new</span>
                        </a>
                      ) : (
                        <p className="text-[16px] whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-surface-container-high border border-outline-variant overflow-hidden flex-grow min-h-[300px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.0!2d55.3784!3d25.1084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6f9f1fbfb607%3A0x4db0a2f5f59532d9!2sIFZA%20Business%20Park%2C%20Building%20A1!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ProScientific Solutions Location"
              />
              <a
                href="https://www.google.com/maps?q=25.1084,55.3784&z=17&t=m"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 left-3 bg-white px-3 py-2 text-[13px] font-semibold text-primary shadow-md rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
