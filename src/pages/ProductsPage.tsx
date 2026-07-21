import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts, fetchCategories, fetchBrands } from '../services/siteApi'
import type { Product, Category, Brand } from '../types'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetchProducts(search, activeCategory),
      fetchCategories(),
      fetchBrands(),
    ]).then(([prods, cats, brs]) => {
      setProducts(prods)
      setCategories(cats)
      setBrands(brs)
    }).finally(() => setLoading(false))
  }, [search, activeCategory])

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
              <button onClick={() => { setSearch(''); setActiveCategory('') }} className="text-secondary font-['Geist'] text-[14px] font-medium hover:underline">Clear all</button>
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
              <div className="space-y-2">
                {parentCategories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={activeCategory === cat.id}
                      onChange={() => setActiveCategory(activeCategory === cat.id ? '' : cat.id)}
                      className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary"
                    />
                    <span className={`font-['Geist'] text-[14px] group-hover:text-primary ${activeCategory === cat.id ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>{cat.name}</span>
                  </label>
                ))}
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
                {activeCategory && <> for <span className="italic text-secondary">{categories.find(c => c.id === activeCategory)?.name}</span></>}
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
                    <div className="relative w-full aspect-square bg-surface-container-low mb-4 overflow-hidden flex items-center justify-center">
                      {product.images?.[0] ? (
                        <img className="w-full h-full object-contain p-6 mix-blend-multiply" alt={product.name} src={product.images[0]} />
                      ) : (
                        <span className="material-symbols-outlined text-[64px] text-outline">science</span>
                      )}
                    </div>
                    <div className="flex-grow">
                      <span className="block font-['Geist'] text-[12px] font-bold text-secondary mb-1">{product.brand?.toUpperCase()}</span>
                      <h3 className="font-['Hanken_Grotesk'] text-[20px] font-semibold text-primary mb-2">{product.name}</h3>
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
