import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import { fetchProducts } from '../services/siteApi'
import type { Product } from '../types'

const manufacturerLogos = [
  { name: 'JASCO', logo: '/partners/jasco-logo@2x (1).png' },
  { name: 'Normalab', logo: '/partners/logo-normalab.svg' },
  { name: 'Nexcope', logo: '/partners/nexcope.png' },
  { name: 'JEOL', logo: '/partners/JEOL_company_logo.svg.webp' },
  { name: 'Young In Chromass', logo: '/partners/youngin.png' },
  { name: 'Elvatech', logo: '/partners/Elvatech-Logo.webp' },
]

const sectors = [
  {
    icon: 'medication',
    title: 'Pharmaceutical',
    description: 'GMP-compliant instrumentation for drug discovery, development, and mass production workflows.',
    items: ['HPLC Systems', 'Stability Chambers'],
  },
  {
    icon: 'science',
    title: 'Biotechnology',
    description: 'Cutting-edge genomic and proteomic tools for advanced cellular research and diagnostics.',
    items: ['NGS Platforms', 'Bio-Reactors'],
  },
  {
    icon: 'school',
    title: 'Academic Research',
    description: 'Scalable equipment packages for universities and government-funded research institutions.',
    items: ['Core Lab Equipment', 'Grants Consulting'],
  },
]

const categories = [
  {
    title: 'Centrifugation Systems',
    description: 'High-speed, refrigerated, and analytical centrifugation for molecular research by PROSCIENTIFIC SOLUTIONS.',
    linkText: 'BROWSE SYSTEMS',
    large: true,
  },
  {
    title: 'Spectrometers',
    description: 'Precision analytical instruments for material identification and quality control.',
    linkText: 'LEARN MORE',
    icon: 'biotech',
  },
  {
    title: 'Lab Furniture',
    description: 'Modular, chemical-resistant workstations designed for modern research environments.',
    linkText: 'VIEW CATALOG',
    icon: 'desk',
  },
  {
    title: 'Cold Storage & Incubation',
    description: 'Maintaining sample integrity with precise temperature-controlled environments from -80\u00B0C to +70\u00B0C.',
    tags: ['REFRIGERATORS', 'ULT FREEZERS', 'INCUBATORS'],
    dark: true,
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.trim().length < 2) {
      setSuggestions([])
      return
    }
    setLoadingSuggestions(true)
    try {
      const results = await fetchProducts(query.trim())
      setSuggestions(results.slice(0, 8))
      setShowSuggestions(true)
    } catch {
      setSuggestions([])
    } finally {
      setLoadingSuggestions(false)
    }
  }, [])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuggestions(false)
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const selectSuggestion = (product: Product) => {
    setShowSuggestions(false)
    setSearchQuery('')
    navigate(`/products/${product.id}`)
  }

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-12 lg:py-32 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 bg-secondary-fixed px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-[18px] text-on-secondary-fixed-variant">verified</span>
              <span className="font-['Geist'] text-[12px] font-semibold text-on-secondary-fixed-variant">ISO 9001:2015 CERTIFIED</span>
            </div>
            <h1 className="font-['Hanken_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-primary max-w-2xl">
              Precision Equipment for Scientific Discovery
            </h1>
            <p className="text-[18px] leading-relaxed text-on-surface-variant max-w-xl font-['Hanken_Grotesk']">
              Empowering scientific discovery with technical accuracy, reliable procurement workflows, and high-performance instrumentation across global markets.
            </p>
            <div className="flex gap-4 pt-4">
              <Link
                to="/products"
                className="bg-primary text-white px-8 py-4 font-['Geist'] text-[14px] font-bold flex items-center gap-2 hover:shadow-lg transition-all"
              >
                EXPLORE CATALOG <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link
                to="/solutions"
                className="border border-outline px-8 py-4 font-['Geist'] text-[14px] font-bold text-primary hover:bg-surface-container-low transition-all"
              >
                VIEW SOLUTIONS
              </Link>
            </div>
            <div ref={searchRef} className="pt-6 relative">
              <form onSubmit={handleSearch}>
                <div className="flex items-center border border-outline-variant bg-surface-container-low rounded-lg overflow-hidden max-w-xl shadow-sm">
                  <span className="material-symbols-outlined text-on-surface-variant px-4">search</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    placeholder="Search instruments, equipment, brands..."
                    className="flex-1 py-4 pr-4 text-[16px] bg-transparent outline-none text-primary placeholder-on-surface-variant"
                    autoComplete="off"
                  />
                  <button type="submit" className="bg-primary text-white px-6 py-4 font-['Geist'] text-[14px] font-bold uppercase tracking-wide hover:bg-primary-container transition-colors">
                    Search
                  </button>
                </div>
              </form>
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-outline-variant shadow-xl rounded-lg overflow-hidden z-50 max-h-[50vh] overflow-y-auto max-w-xl">
                  {loadingSuggestions ? (
                    <div className="px-4 py-6 text-center text-on-surface-variant text-[14px]">Searching...</div>
                  ) : suggestions.length > 0 ? (
                    <>
                      {suggestions.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => selectSuggestion(product)}
                          className="w-full flex items-center gap-4 px-4 py-3 hover:bg-surface-container-low transition-colors text-left border-b border-outline-variant last:border-0"
                        >
                          <div className="shrink-0 w-12 h-12 bg-surface-container-low flex items-center justify-center rounded overflow-hidden">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt="" className="w-full h-full object-contain p-1" />
                            ) : (
                              <span className="material-symbols-outlined text-outline text-[20px]">science</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-semibold text-primary truncate">{product.name}</p>
                            <p className="text-[12px] text-on-surface-variant truncate">{product.brand} · {product.category}</p>
                          </div>
                          <span className="material-symbols-outlined text-outline text-[16px]">arrow_forward</span>
                        </button>
                      ))}
                      <button
                        onClick={handleSearch}
                        className="w-full px-4 py-3 text-center text-secondary font-['Geist'] text-[14px] font-bold hover:bg-surface-container-low transition-colors border-t border-outline-variant"
                      >
                        View all results for "{searchQuery}"
                      </button>
                    </>
                  ) : (
                    <div className="px-4 py-6 text-center text-on-surface-variant text-[14px]">No products found. Try a different search.</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 relative w-full aspect-square lg:aspect-auto h-[500px]">
            <div className="absolute inset-0 bg-primary-fixed opacity-10 rounded-[120px] rotate-6 scale-110"></div>
            <img
              className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl"
              alt="Professional scientific microscope"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvbaTAWhArAr4hz9I7BT6gmxnxfg-mFgLPUHJT5EpPlc_--8zjMUPw-MWJxPz0zAfYCv6vzGEMbB9kHhOzoCQVykfKiryjf6PtA720o88jv8hWQRJhcAhSbWuH2QOBejzNk4tjkoCw0qf-_mMzUHnzgRL7OtIWx5Gy7medW1aE84PveQ8Ytb6odqgYBLEY04GyA3cC0ptMp7FKeIiavmsLnz-UWvp3RO6aSATG3kNkzYSSGiv13EUK"
            />
            <div className="absolute bottom-8 -left-8 glass-panel p-6 shadow-xl rounded-lg border border-outline-variant hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-['Geist'] text-[12px] font-semibold text-on-surface-variant">REAL-TIME MONITORING</span>
              </div>
              <div className="font-['Hanken_Grotesk'] text-[20px] font-semibold text-primary">99.98%</div>
              <div className="font-['Geist'] text-[14px] font-medium text-on-surface-variant">Optical Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories (Bento Grid) */}
      <section className="py-12 bg-background">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="mb-12">
            <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] tracking-[-0.01em] font-semibold text-primary">Featured Product Categories</h2>
            <div className="h-1 w-24 bg-secondary mt-2"></div>
          </div>
          <div className="bento-grid">
            {/* Large Card */}
            <div className="col-span-12 md:col-span-8 bg-white border border-outline-variant p-8 group cursor-pointer overflow-hidden relative">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-['Hanken_Grotesk'] text-[20px] font-semibold text-primary mb-2">{categories[0].title}</h3>
                  <p className="text-on-surface-variant text-[16px] leading-relaxed max-w-sm">{categories[0].description}</p>
                </div>
                <Link to="/products" className="mt-4 text-secondary font-bold font-['Geist'] text-[14px] flex items-center gap-1 group-hover:gap-3 transition-all">
                  {categories[0].linkText} <span className="material-symbols-outlined">east</span>
                </Link>
              </div>
              <img className="absolute right-0 bottom-0 w-1/2 h-full object-contain opacity-20 group-hover:opacity-100 transition-opacity translate-x-12 translate-y-12" alt="Centrifuge" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcPwz7MVlLmIr2mjbO0YGI_1XOPhvAQD95qBAxV0KVR5_3jjRu5tBCaTXwHWp6d-8fRH5lKtTNsd4Ek_29qnsgvI8kEp4b5gb1yMDOZEwBOjL6dGvMcQOSNh0dvrz8-6qhHh0BEM8bGDr4GqN2kR5xki3WGXNJuKwbmmhNcTyLWbL8fcSUuXgDNsXO0gNXxCPvv-j5iEN741-9khLLZr-osABncDIwy-dnOPVFeg9al5gmXTcGBWH3" />
            </div>

            {/* Small Card 1 */}
            <div className="col-span-12 md:col-span-4 bg-white border border-outline-variant p-8 group cursor-pointer">
              <div className="mb-6 bg-primary-fixed w-12 h-12 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">{categories[1].icon}</span>
              </div>
              <h3 className="font-['Hanken_Grotesk'] text-[20px] font-semibold text-primary mb-2">{categories[1].title}</h3>
              <p className="text-on-surface-variant text-[16px] leading-relaxed mb-4">{categories[1].description}</p>
              <Link to="/products" className="text-primary font-bold font-['Geist'] text-[14px] underline decoration-secondary">{categories[1].linkText}</Link>
            </div>

            {/* Small Card 2 */}
            <div className="col-span-12 md:col-span-4 bg-white border border-outline-variant p-8 group cursor-pointer">
              <div className="mb-6 bg-primary-fixed w-12 h-12 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">{categories[2].icon}</span>
              </div>
              <h3 className="font-['Hanken_Grotesk'] text-[20px] font-semibold text-primary mb-2">{categories[2].title}</h3>
              <p className="text-on-surface-variant text-[16px] leading-relaxed mb-4">{categories[2].description}</p>
              <Link to="/products" className="text-primary font-bold font-['Geist'] text-[14px] underline decoration-secondary">{categories[2].linkText}</Link>
            </div>

            {/* Medium Card (Dark) */}
            <div className="col-span-12 md:col-span-8 bg-primary text-white p-8 relative overflow-hidden group cursor-pointer">
              <div className="relative z-10">
                <h3 className="font-['Hanken_Grotesk'] text-[20px] font-semibold mb-2">{categories[3].title}</h3>
                <p className="opacity-80 text-[16px] leading-relaxed max-w-md">{categories[3].description}</p>
              </div>
              <div className="mt-8 flex gap-2 relative z-10">
                {categories[3].tags?.map((tag) => (
                  <span key={tag} className="bg-white/10 px-3 py-1 font-['Geist'] text-[12px] font-semibold">{tag}</span>
                ))}
              </div>
              <span className="material-symbols-outlined absolute -bottom-8 -right-8 text-[180px] opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">ac_unit</span>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturer Partnerships */}
      <section className="py-12 bg-surface-container-low border-y border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 mb-8 text-center">
          <span className="font-['Geist'] text-[14px] font-medium text-on-surface-variant tracking-widest uppercase">Global Manufacturer Partnerships</span>
        </div>
        <div className="relative overflow-hidden whitespace-nowrap">
          <div className="scrolling-wrapper">
            {[...manufacturerLogos, ...manufacturerLogos].map((logo, i) => (
              <div key={i} className="w-[300px] flex items-center justify-center px-8 opacity-70 hover:opacity-100 transition-all">
                <img src={logo.logo} alt={logo.name} className="h-20 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] tracking-[-0.01em] font-semibold text-primary mb-6">
                Why Choose <span className="font-bold">PROSCIENTIFIC SOLUTIONS</span>?
              </h2>
              <div className="space-y-8">
                {[
                  { icon: 'factory', title: 'Direct from Manufacturer', desc: 'We bypass unnecessary intermediaries to provide authentic equipment with full warranty coverage at optimized procurement costs.' },
                  { icon: 'verified_user', title: 'ISO Certified Operations', desc: 'Our logistical processes and quality management systems are ISO 9001:2015 certified for global reliability.' },
                  { icon: 'support_agent', title: 'Lifetime Technical Support', desc: 'On-site installation, calibration services, and dedicated technical assistance for every piece of hardware we sell.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-6">
                    <div className="shrink-0 w-12 h-12 bg-secondary text-white flex items-center justify-center rounded-lg">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-['Hanken_Grotesk'] text-[20px] font-semibold text-primary mb-1">{item.title}</h4>
                      <p className="text-on-surface-variant text-[16px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container p-8 text-center flex flex-col items-center justify-center aspect-square border border-outline-variant">
                <div className="text-[48px] leading-[1.1] font-bold text-primary mb-2">1k+</div>
                <div className="font-['Geist'] text-[14px] font-medium text-on-surface-variant uppercase tracking-widest">Active Products</div>
              </div>
              <div className="bg-primary text-white p-8 text-center flex flex-col items-center justify-center aspect-square">
                <div className="text-[48px] leading-[1.1] font-bold mb-2">10+</div>
                <div className="font-['Geist'] text-[14px] font-medium opacity-70 uppercase tracking-widest">Countries Served</div>
              </div>
              <div className="bg-secondary text-white p-8 text-center flex flex-col items-center justify-center aspect-square">
                <div className="text-[48px] leading-[1.1] font-bold mb-2">12h</div>
                <div className="font-['Geist'] text-[14px] font-medium opacity-70 uppercase tracking-widest">Average Quote Time</div>
              </div>
              <div className="bg-surface-container-high p-8 text-center flex flex-col items-center justify-center aspect-square border border-outline-variant">
                <div className="text-[48px] leading-[1.1] font-bold text-primary mb-2">98%</div>
                <div className="font-['Geist'] text-[14px] font-medium text-on-surface-variant uppercase tracking-widest">Retention Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] tracking-[-0.01em] font-semibold mb-4">Sectors We Empower</h2>
            <p className="text-[18px] leading-relaxed opacity-70 max-w-2xl mx-auto font-['Hanken_Grotesk']">
              Providing specialized procurement and technical solutions across diverse scientific verticals by <span className="font-bold">PROSCIENTIFIC SOLUTIONS</span>.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sectors.map((sector) => (
              <div key={sector.title} className="border border-white/20 p-8 hover:bg-white/5 transition-all">
                <span className="material-symbols-outlined text-[48px] text-secondary-fixed mb-6">{sector.icon}</span>
                <h3 className="font-['Hanken_Grotesk'] text-[20px] font-semibold mb-4">{sector.title}</h3>
                <p className="opacity-70 text-[16px] leading-relaxed mb-6">{sector.description}</p>
                <ul className="space-y-2 font-['Geist'] text-[14px] font-medium opacity-90">
                  {sector.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-secondary rounded-full"></span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="bg-primary p-12 lg:p-24 relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 left-0 w-64 h-64 border-t border-l border-white/10 -translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 border-b border-r border-white/10 translate-x-12 translate-y-12"></div>
            <h2 className="font-['Hanken_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-white mb-6 relative z-10">
              Streamline Your Procurement
            </h2>
            <p className="text-[18px] leading-relaxed text-white/70 max-w-2xl mb-12 relative z-10 font-['Hanken_Grotesk']">
              Get personalized pricing, technical specifications, and delivery timelines within 12 hours from <span className="font-bold">PROSCIENTIFIC SOLUTIONS</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 relative z-10">
              <Link to="/contact" className="bg-secondary text-white px-12 py-5 font-['Hanken_Grotesk'] text-[20px] font-semibold hover:shadow-2xl hover:scale-105 transition-all text-center">
                REQUEST A QUOTE
              </Link>
              <Link to="/contact" className="border border-white/30 text-white px-12 py-5 font-['Hanken_Grotesk'] text-[20px] font-semibold hover:bg-white/5 transition-all text-center">
                CONTACT TECHNICAL SALES
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
