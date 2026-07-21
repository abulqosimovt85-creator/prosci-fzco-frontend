import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts, fetchCategories, fetchBrands } from '../services/siteApi'
import type { Product, Category, Brand } from '../types'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [search, setSearch] = useState('')
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set())
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const catParam = activeCategories.size > 0 ? Array.from(activeCategories).join(',') : ''
    Promise.all([
      fetchProducts(search, catParam),
      fetchCategories(),
      fetchBrands(),
    ]).then(([prods, cats, brs]) => {
      setProducts(prods)
      setCategories(cats)
      setBrands(brs)
    }).finally(() => setLoading(false))
  }, [search, activeCategories])

  const toggleCategory = (catId: string) => {
    setActiveCategories(prev => {
      const next = new Set(prev)
      if (next.has(catId)) next.delete(catId)
      else next.add(catId)
      return next
    })
  }

  const parentCategories = categories.filter(c => !c.parentId)
  const resultCount = products.length

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-12">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-['Hanken_Grotesk'] text-[20px] font-semibold text-primary">Filters</h2>
              <button onClick={() => { setSearch(''); setActiveCategories(new Set()) }} className="text-secondary font-['Geist'] text-[14px] font-medium hover:underline">Clear all</button>
            </div>

            {/* Search */}
            <div className="border-t border-outline-variant pt-4">
              <label className="font-['Geist'] text-[12px] font-bold text-primary block mb-3">SEARCH</label>
              <div className="flex items-center bg-surface-container-low border border-outline-variant rounded px-3 py-1.5">
                <span className="material-symbols-outlined text-outline text-[20px] mr-2">search</span>
                <input
                  className="bg-transparent border-none focus:ring-0 text-[14px] w-full p-0 outline-none"
                  placeholder="Search equipment..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Category */}
            <div className="border-t border-outline-variant pt-4">
              <label className="font-['Geist'] text-[12px] font-bold text-primary block mb-3">CATEGORY</label>
              <div className="space-y-1">
                {parentCategories.map((cat) => {
                  const subcats = categories.filter(c => c.parentId === cat.id)
                  const isExpanded = expandedCats.has(cat.id)
                  return (
                    <div key={cat.id}>
                      <div className="flex items-center gap-3 cursor-pointer group py-1" onClick={() => {
                        if (subcats.length > 0) {
                          setExpandedCats(prev => {
                            const next = new Set(prev)
                            if (next.has(cat.id)) next.delete(cat.id)
                            else next.add(cat.id)
                            return next
                          })
                        }
                      }}>
                        <input
                          type="checkbox"
                          checked={activeCategories.has(cat.id)}
                          onChange={() => toggleCategory(cat.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary"
                        />
                        <span className={`font-['Geist'] text-[14px] group-hover:text-primary flex-1 ${activeCategories.has(cat.id) ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>{cat.name}</span>
                        {subcats.length > 0 && (
                          <span className={`material-symbols-outlined text-[16px] text-outline transition-transform ${isExpanded ? 'rotate-180' : ''}`}>expand_more</span>
                        )}
                      </div>
                      {isExpanded && subcats.length > 0 && (
                        <div className="ml-7 space-y-1 pb-1">
                          {subcats.map((sub) => (
                            <label key={sub.id} className="flex items-center gap-3 cursor-pointer group py-0.5">
                              <input
                                type="checkbox"
                                checked={activeCategories.has(sub.id)}
                                onChange={() => toggleCategory(sub.id)}
                                className="w-3.5 h-3.5 rounded border-outline-variant text-secondary focus:ring-secondary"
                              />
                              <span className={`font-['Geist'] text-[13px] group-hover:text-primary ${activeCategories.has(sub.id) ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>{sub.name}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Manufacturer */}
            <div className="border-t border-outline-variant pt-4">
              <label className="font-['Geist'] text-[12px] font-bold text-primary block mb-3">MANUFACTURER</label>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary" />
                    <span className="font-['Geist'] text-[14px] text-on-surface-variant group-hover:text-primary">{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <p className="text-[16px] text-on-surface-variant">
                <span className="font-bold text-primary">{resultCount}</span> results
                {activeCategories.size > 0 && (
                  <> for <span className="italic text-secondary">{Array.from(activeCategories).map(id => categories.find(c => c.id === id)?.name).filter(Boolean).join(', ')}</span></>
                )}
              </p>
              <div className="flex items-center gap-4">
                <span className="font-['Geist'] text-[14px] font-medium text-outline">Sort by:</span>
                <select className="bg-surface border-none text-[14px] font-semibold focus:ring-0 cursor-pointer text-primary outline-none">
                  <option>Relevance</option>
                  <option>Latest Models</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20 text-on-surface-variant">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white border border-outline-variant">
                <p className="text-[20px] font-semibold text-primary">No products found</p>
                <p className="text-[16px] text-on-surface-variant mt-2">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white border border-outline-variant rounded p-4 flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                    <Link to={`/products/${product.id}`} className="relative w-full aspect-square bg-surface-container-low mb-4 overflow-hidden flex items-center justify-center">
                      {product.images?.[0] ? (
                        <img className="w-full h-full object-contain p-6 mix-blend-multiply" alt={product.name} src={product.images[0]} />
                      ) : (
                        <span className="material-symbols-outlined text-[64px] text-outline">science</span>
                      )}
                    </Link>
                    <div className="flex-grow">
                      <span className="block font-['Geist'] text-[12px] font-bold text-secondary mb-1">{product.brand?.toUpperCase()}</span>
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-['Hanken_Grotesk'] text-[20px] font-semibold text-primary mb-2 hover:text-secondary transition-colors cursor-pointer">{product.name}</h3>
                      </Link>
                      <p className="text-on-surface-variant text-[14px] leading-relaxed line-clamp-2 mb-4">{product.description}</p>
                      {product.specs && Object.keys(product.specs).length > 0 && (
                        <div className="space-y-1 mb-6">
                          {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-1 border-b border-surface-container-low">
                              <span className="text-[12px] text-outline font-['Geist'] uppercase">{key}</span>
                              <span className="text-[12px] text-primary font-semibold">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Link
                      to={`/products/${product.id}`}
                      className="w-full bg-primary text-white py-2.5 font-['Geist'] text-[14px] font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
