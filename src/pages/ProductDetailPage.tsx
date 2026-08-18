import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { fetchProductById, fetchProducts, submitInquiry } from '../services/siteApi'
import type { Product } from '../types'

import { AnimatePresence, motion } from 'framer-motion'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [inquiryForm, setInquiryForm] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [inquiryLoading, setInquiryLoading] = useState(false)
  const [inquirySubmitted, setInquirySubmitted] = useState(false)
  const [inquiryError, setInquiryError] = useState(false)
  const [recommended, setRecommended] = useState<Product[]>([])

  useEffect(() => {
    if (!id) return
    fetchProductById(id).then(res => {
      if (res) {
        setProduct(res)
        if (res.images && res.images.length > 0) {
          setActiveImage(res.images[0])
        }
        fetchProducts('', '', '').then(all => {
          const others = all.filter(p => p.id !== res.id)
          const shuffled = others.sort(() => Math.random() - 0.5)
          setRecommended(shuffled.slice(0, 4))
        })
      }
    })
  }, [id])

  if (!product) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 lg:px-12">
        <p className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary">Instrument not found in database</p>
        <Link to="/products" className="mt-6 inline-block bg-primary text-white px-8 py-3 font-['Geist'] text-[14px] font-bold uppercase tracking-wide hover:bg-primary-container transition-colors">
          Return to Catalog
        </Link>
      </section>
    )
  }

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>{product.name} — ProScientific Solutions</title>
        <meta name="description" content={product.description?.slice(0, 160) || `${product.name} from ${product.brand} — available at ProScientific Solutions.`} />
      </Helmet>

      {/* Product Header / Hero Area */}
      <section className="bg-white border-b border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-12">
          <nav className="flex mb-8 text-[12px] font-medium text-outline uppercase tracking-widest">
            <Link to="/products" className="hover:text-secondary">Catalog</Link>
            <span className="mx-3">/</span>
            <span className="text-on-surface-variant">{product.category}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Gallery */}
            <div className="space-y-4">
              <div
                className="aspect-[4/3] overflow-hidden border border-outline-variant bg-surface-container-low flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => activeImage && setLightboxOpen(true)}
              >
                {activeImage ? (
                  <img src={activeImage} alt={product.name} className="h-full w-full object-contain p-6" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-outline">
                    <span className="material-symbols-outlined text-[80px]">image</span>
                  </div>
                )}
              </div>

              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`h-20 w-20 shrink-0 overflow-hidden border-2 transition-all ${activeImage === img ? 'border-secondary scale-95' : 'border-outline-variant opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Quick Info */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold uppercase tracking-widest mb-4">
                  Professional Grade
                </span>
                <h1 className="font-['Hanken_Grotesk'] text-[40px] leading-[1.1] tracking-[-0.02em] font-bold text-primary">
                  {product.name}
                </h1>
                <div className="mt-4 flex items-center gap-4">
                  <div className="h-8 w-px bg-outline-variant" />
                  <p className="text-[16px] text-on-surface-variant font-medium">Manufacturer: <span className="text-primary font-semibold">{product.brand}</span></p>
                </div>
              </div>

              <div className="bg-surface-container-low p-6 border border-outline-variant">
                <h3 className="font-['Geist'] text-[12px] font-bold text-outline uppercase tracking-widest mb-3">Primary Application</h3>
                <p className="text-[15px] text-on-surface-variant font-medium leading-relaxed italic">
                  "{product.application}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => { setInquiryOpen(true); setInquirySubmitted(false); setInquiryForm({ name: '', company: '', email: '', phone: '', message: '' }) }} className="flex-1 inline-flex items-center justify-center gap-2 bg-primary px-8 py-4 font-['Geist'] text-[14px] font-bold text-white hover:bg-primary-container transition-all active:scale-[0.98] cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                  Request Technical Quote
                </button>
                {product.pdf && product.pdf !== '#' ? (
                  <a href={product.pdf} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 border border-outline bg-white px-8 py-4 font-['Geist'] text-[14px] font-bold text-primary hover:bg-surface-container-low transition-all">
                    <span className="material-symbols-outlined text-[20px] text-outline">download</span>
                    Documentation (PDF)
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center gap-2 border border-outline bg-white px-8 py-4 font-['Geist'] text-[14px] font-bold text-outline opacity-50">
                    <span className="material-symbols-outlined text-[20px]">download</span>
                    Documentation (PDF)
                  </span>
                )}
              </div>

              <p className="text-[10px] text-outline text-center sm:text-left">
                * ProScient provides full installation, calibration, and dedicated technical support for this instrument.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Content: Overview & Description */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <span className="font-['Geist'] text-[12px] font-bold text-secondary uppercase tracking-widest mb-2 block">Overview</span>
              <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] font-semibold text-primary mb-4">Technical Excellence</h2>
              <p className="text-[16px] leading-relaxed text-on-surface-variant">{product.description}</p>
            </div>

            {/* Service & Quality Standards */}
            <div className="border-t border-outline-variant pt-8 mt-12">
              <h4 className="font-['Geist'] text-[12px] font-bold uppercase tracking-[0.25em] text-secondary mb-6">
                Standard Support & Assurances
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-secondary text-white flex items-center justify-center rounded-lg">
                    <span className="material-symbols-outlined">verified</span>
                  </div>
                  <div>
                    <h5 className="font-['Hanken_Grotesk'] text-[16px] font-semibold text-primary">Quality Certified</h5>
                    <p className="text-[14px] text-on-surface-variant mt-1 leading-relaxed">
                      Tested and verified for mission-critical scientific and laboratory environments.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-secondary text-white flex items-center justify-center rounded-lg">
                    <span className="material-symbols-outlined">speed</span>
                  </div>
                  <div>
                    <h5 className="font-['Hanken_Grotesk'] text-[16px] font-semibold text-primary">Rapid Response SLA</h5>
                    <p className="text-[14px] text-on-surface-variant mt-1 leading-relaxed">
                      Priority technical support and spare parts availability guaranteed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Full Specs Table */}
          <aside className="space-y-6">
            <div className="bg-white border border-outline-variant p-8">
              <h3 className="font-['Hanken_Grotesk'] text-[20px] font-semibold text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">bar_chart</span>
                Technical Specifications
              </h3>
              <div className="space-y-4" style={{ maxHeight: '28rem', overflowY: 'auto' }}>
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="pb-4 border-b border-outline-variant last:border-0">
                    <p className="font-['Geist'] text-[10px] font-bold text-outline uppercase tracking-widest">{key}</p>
                    <p className="mt-1 text-[14px] font-semibold text-primary">{value}</p>
                  </div>
                ))}
              </div>
              {Object.keys(product.specs).length > 6 && (
                <div className="mt-4 pt-3 border-t border-outline-variant text-center">
                  <p className="font-['Geist'] text-[10px] text-outline font-medium uppercase tracking-widest">Scroll for more specs</p>
                </div>
              )}
            </div>

            <div className="bg-primary p-8 text-white">
              <h4 className="font-['Hanken_Grotesk'] text-[20px] font-semibold mb-2">Need Customization?</h4>
              <p className="text-[14px] opacity-80 mb-6">Our engineers can tailor this instrument to your specific research protocols.</p>
              <Link to="/contact" className="block text-center py-3 bg-white text-primary font-['Geist'] text-[14px] font-bold hover:bg-surface-container-low transition-all">
                Speak to an Expert
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Recommended Products */}
      {recommended.length > 0 && (
        <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
          <span className="font-['Geist'] text-[12px] font-bold text-secondary uppercase tracking-widest mb-2 block">Related</span>
          <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] font-semibold text-primary mb-8">Recommended Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommended.map((p) => (
              <Link key={p.id} to={`/products/${p.id}`} className="bg-white border border-outline-variant p-4 flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                <div className="aspect-square bg-surface-container-low overflow-hidden flex items-center justify-center mb-4">
                  {p.images?.[0] ? (
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain p-4" loading="lazy" />
                  ) : (
                    <span className="material-symbols-outlined text-[48px] text-outline">science</span>
                  )}
                </div>
                <span className="font-['Geist'] text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">{p.brand}</span>
                <h3 className="font-['Hanken_Grotesk'] text-[16px] font-semibold text-primary line-clamp-2 mb-2">{p.name}</h3>
                <p className="text-[13px] text-on-surface-variant line-clamp-2 mt-auto">{p.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/80 hover:text-white transition z-10"
            >
              <span className="material-symbols-outlined text-[32px]">close</span>
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              src={activeImage}
              alt={product.name}
              className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {inquiryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setInquiryOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white shadow-2xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {inquirySubmitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-white mb-4">
                    <span className="material-symbols-outlined text-[32px]">check</span>
                  </div>
                  <h3 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mb-2">Thank you!</h3>
                  <p className="text-[16px] text-on-surface-variant mb-6">Your inquiry has been submitted. We'll respond within 2-4 business hours.</p>
                  <button onClick={() => setInquiryOpen(false)} className="bg-primary text-white px-6 py-3 font-['Geist'] text-[14px] font-bold hover:bg-primary-container transition-all">Close</button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary">Inquire About</h3>
                      <p className="text-[16px] text-secondary font-semibold">{product.name}</p>
                    </div>
                    <button onClick={() => setInquiryOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[24px]">close</span>
                    </button>
                  </div>

                  <form className="space-y-4" onSubmit={async (e) => {
                    e.preventDefault()
                    setInquiryLoading(true)
                    setInquiryError(false)
                    try {
                      await submitInquiry({
                        name: inquiryForm.name,
                        company: inquiryForm.company,
                        email: inquiryForm.email,
                        phone: inquiryForm.phone,
                        message: inquiryForm.message,
                        industry: product.category,
                        budget: '',
                        productId: product.id,
                      })
                      setInquirySubmitted(true)
                    } catch {
                      setInquiryError(true)
                    } finally {
                      setInquiryLoading(false)
                    }
                  }}>
                    <div className="space-y-2">
                      <label className="font-['Geist'] text-[14px] font-medium text-on-surface-variant block">FULL NAME</label>
                      <input className="w-full bg-background border border-outline px-4 py-3 text-[16px] focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" placeholder="Your name" value={inquiryForm.name} onChange={(e) => setInquiryForm(prev => ({ ...prev, name: e.target.value }))} required />
                    </div>
                    <div className="space-y-2">
                      <label className="font-['Geist'] text-[14px] font-medium text-on-surface-variant block">COMPANY</label>
                      <input className="w-full bg-background border border-outline px-4 py-3 text-[16px] focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" placeholder="Company name" value={inquiryForm.company} onChange={(e) => setInquiryForm(prev => ({ ...prev, company: e.target.value }))} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="font-['Geist'] text-[14px] font-medium text-on-surface-variant block">EMAIL</label>
                        <input className="w-full bg-background border border-outline px-4 py-3 text-[16px] focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" placeholder="email@example.com" type="email" value={inquiryForm.email} onChange={(e) => setInquiryForm(prev => ({ ...prev, email: e.target.value }))} required />
                      </div>
                      <div className="space-y-2">
                        <label className="font-['Geist'] text-[14px] font-medium text-on-surface-variant block">PHONE</label>
                        <input className="w-full bg-background border border-outline px-4 py-3 text-[16px] focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" placeholder="+971 50 123 4567" type="tel" value={inquiryForm.phone} onChange={(e) => setInquiryForm(prev => ({ ...prev, phone: e.target.value }))} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="font-['Geist'] text-[14px] font-medium text-on-surface-variant block">MESSAGE</label>
                      <textarea className="w-full bg-background border border-outline px-4 py-3 text-[16px] focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" placeholder="Your inquiry details..." rows={4} value={inquiryForm.message} onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))} required />
                    </div>
                    <button type="submit" disabled={inquiryLoading} className="w-full bg-primary text-white py-3 font-['Geist'] text-[14px] font-bold uppercase tracking-wider hover:bg-primary-container transition-all disabled:opacity-50 cursor-pointer">
                      {inquiryLoading ? 'Submitting...' : 'Send Inquiry'}
                    </button>
                    {inquiryError && <p className="text-[13px] font-semibold text-red-600 mt-2">Submission failed. Please try again or contact us directly.</p>}
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
