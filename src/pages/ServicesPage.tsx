import { useState } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../data/content'
import { submitInquiry } from '../services/siteApi'

const serviceIcons = ['settings_suggest', 'verified', 'build', 'school', 'support_agent']

export default function ServicesPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitInquiry({ name: form.name, company: form.company, email: form.email, phone: form.phone, message: `Service: ${form.service}\n\n${form.message}`, industry: 'Technical Services', budget: '' })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative py-12 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 relative z-10">
          <div className="max-w-3xl">
            <span className="font-['Geist'] text-[14px] font-medium text-secondary uppercase tracking-widest mb-4 block">Services</span>
            <h1 className="font-['Hanken_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-primary mb-6">Technical services for every operational need</h1>
            <p className="text-[18px] leading-relaxed text-on-surface-variant">Installation, calibration, AMC, training and support built for complex scientific environments.</p>
          </div>
        </div>
      </section>

      {/* Services List + Form */}
      <section className="py-12 max-w-[1280px] mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Services */}
          <div className="lg:col-span-7 space-y-6">
            {services.map((service, i) => (
              <div key={service.id} className="bg-white border border-outline-variant p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="shrink-0 w-14 h-14 bg-primary text-white flex items-center justify-center rounded-lg">
                    <span className="material-symbols-outlined text-[28px]">{serviceIcons[i]}</span>
                  </div>
                  <div className="flex-1">
                    <span className="font-['Geist'] text-[12px] font-bold text-secondary uppercase tracking-widest">{service.highlight}</span>
                    <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mt-2 mb-3">{service.title}</h2>
                    <p className="text-[15px] leading-relaxed text-on-surface-variant">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-outline-variant p-8 sticky top-24">
              <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-2">Request a Service</h2>
              <p className="text-[14px] text-on-surface-variant mb-8">Tell us about your requirements and our team will respond within one business day.</p>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-white mb-4">
                    <span className="material-symbols-outlined text-[32px]">check</span>
                  </div>
                  <h3 className="font-['Hanken_Grotesk'] text-[20px] font-semibold text-primary mb-2">Thank you!</h3>
                  <p className="text-[14px] text-on-surface-variant">Your service request has been received. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="font-['Geist'] text-[12px] font-bold text-on-surface-variant uppercase tracking-widest">Full Name</label>
                    <input className="w-full bg-background border border-outline px-4 py-3 text-[15px] rounded-none focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" placeholder="Your name" value={form.name} onChange={(e) => handleChange('name', e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <label className="font-['Geist'] text-[12px] font-bold text-on-surface-variant uppercase tracking-widest">Organization</label>
                    <input className="w-full bg-background border border-outline px-4 py-3 text-[15px] rounded-none focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" placeholder="Company or institution" value={form.company} onChange={(e) => handleChange('company', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-['Geist'] text-[12px] font-bold text-on-surface-variant uppercase tracking-widest">Email</label>
                      <input className="w-full bg-background border border-outline px-4 py-3 text-[15px] rounded-none focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" placeholder="email@example.com" type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <label className="font-['Geist'] text-[12px] font-bold text-on-surface-variant uppercase tracking-widest">Phone</label>
                      <input className="w-full bg-background border border-outline px-4 py-3 text-[15px] rounded-none focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" placeholder="+971 50 123 4567" type="tel" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-['Geist'] text-[12px] font-bold text-on-surface-variant uppercase tracking-widest">Service Required</label>
                    <select className="w-full bg-background border border-outline px-4 py-3 text-[15px] rounded-none appearance-none focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" value={form.service} onChange={(e) => handleChange('service', e.target.value)} required>
                      <option value="">Select a service...</option>
                      {services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-['Geist'] text-[12px] font-bold text-on-surface-variant uppercase tracking-widest">Details</label>
                    <textarea className="w-full bg-background border border-outline px-4 py-3 text-[15px] rounded-none focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" placeholder="Describe your requirements, equipment models, or specific issues..." rows={4} value={form.message} onChange={(e) => handleChange('message', e.target.value)} />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-primary text-white px-8 py-4 font-['Geist'] text-[14px] font-bold uppercase tracking-wide hover:bg-primary-container transition-colors disabled:opacity-50">{loading ? 'Submitting...' : 'Submit Request'}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SLA / Guarantee */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: 'schedule', title: '24h Response', desc: 'Guaranteed response time for all service inquiries within one business day.' },
              { icon: 'local_shipping', title: 'On-Site UAE', desc: 'Engineers based in Dubai for rapid on-site deployment across the Emirates.' },
              { icon: 'verified', title: 'Certified Team', desc: 'Factory-trained technicians with ISO and OEM certifications.' },
            ].map((item) => (
              <div key={item.title} className="p-6 border border-white/10 rounded-lg">
                <span className="material-symbols-outlined text-secondary-fixed text-[36px] mb-4">{item.icon}</span>
                <h3 className="font-['Hanken_Grotesk'] text-[20px] font-semibold mb-2">{item.title}</h3>
                <p className="text-[14px] opacity-70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center bg-white">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] font-semibold text-primary mb-6">Need technical support now?</h2>
          <p className="text-[16px] leading-relaxed text-on-surface-variant mb-8">Contact <span className="font-bold">PROSCIENTIFIC SOLUTIONS</span> for immediate assistance with your laboratory instruments.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/contact" className="bg-primary text-white px-10 py-4 font-['Geist'] text-[14px] font-bold uppercase tracking-wide hover:bg-primary-container transition-colors text-center">Contact Us</Link>
            <a href="tel:+971527810506" className="border border-primary text-primary px-10 py-4 font-['Geist'] text-[14px] font-bold uppercase tracking-wide hover:bg-surface-container-low transition-colors text-center">Call +971 52 781 0506</a>
          </div>
        </div>
      </section>
    </div>
  )
}
