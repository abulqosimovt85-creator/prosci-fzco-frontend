import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProductById } from '../services/siteApi'
import type { Product } from '../types'
import SectionHeading from '../components/SectionHeading'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [activeImage, setActiveImage] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    fetchProductById(id).then(res => {
      if (res) {
        setProduct(res)
        if (res.images && res.images.length > 0) {
          setActiveImage(res.images[0])
        }
      }
    })
  }, [id])

  if (!product) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 lg:px-12">
        <p className="text-2xl font-semibold text-slate-900">Instrument not found in database</p>
        <Link to="/products" className="mt-6 inline-flex rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800">
          Return to Catalog
        </Link>
      </section>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Product Header / Hero Area */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
          <nav className="flex mb-8 text-xs font-medium text-slate-400 uppercase tracking-widest">
            <Link to="/products" className="hover:text-brand-700">Catalog</Link>
            <span className="mx-3">/</span>
            <span className="text-slate-600">{product.category}</span>
          </nav>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Gallery */}
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-slate-200 bg-white shadow-sm flex items-center justify-center">
                {activeImage ? (
                  <img src={activeImage} alt={product.name} className="h-full w-full object-contain p-6" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-slate-300">
                    <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {product.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`h-20 w-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-brand-700 scale-95' : 'border-slate-100 opacity-60 hover:opacity-100'}`}
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
                <span className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-[10px] font-bold uppercase tracking-widest mb-4">
                  Professional Grade
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {product.name}
                </h1>
                <div className="mt-4 flex items-center gap-4">
                  <div className="h-8 w-px bg-slate-200" />
                  <p className="text-lg text-slate-500 font-medium">Manufacturer: <span className="text-slate-900">{product.brand}</span></p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Primary Application</h3>
                <p className="text-slate-700 font-medium leading-relaxed italic">
                  "{product.application}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-700 px-8 py-4 text-sm font-bold text-white hover:bg-brand-800 shadow-lg shadow-brand-200 transition-all active:scale-[0.98]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Request Technical Quote
                </Link>
                <a href={product.pdf} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Documentation (PDF)
                </a>
              </div>
              
              <p className="text-[10px] text-slate-400 text-center sm:text-left">
                * ProScient provides full installation, calibration, and 24/7 technical support for this instrument.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content: Overview & Description */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <SectionHeading eyebrow="Overview" title="Technical Excellence" />
              <div className="mt-6 prose prose-slate max-w-none">
                <p className="text-lg leading-8 text-slate-600">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Service & Quality Standards */}
            <div className="border-t border-slate-200 pt-8 mt-12">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-700 mb-6">
                Standard Support & Assurances
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 text-sm">Quality Certified</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Tested and verified for mission-critical scientific and laboratory environments.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 text-sm">Rapid Response SLA</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Priority technical support and spare parts availability guaranteed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Full Specs Table */}
          <aside className="space-y-6">
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Technical Specifications
              </h3>
              <div className="space-y-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="pb-4 border-b border-slate-50 last:border-0">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{key}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rounded-3xl bg-brand-900 p-8 text-white">
              <h4 className="font-bold text-lg mb-2">Need Customization?</h4>
              <p className="text-sm text-brand-200 mb-6">Our engineers can tailor this instrument to your specific research protocols.</p>
              <Link to="/contact" className="block text-center py-3 bg-white text-brand-900 rounded-xl font-bold text-sm hover:bg-brand-50 transition-all">
                Speak to an Expert
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
