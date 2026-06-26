import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts, fetchCategories } from '../services/siteApi'
import SectionHeading from '../components/SectionHeading'
import type { Category } from '../types'

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [activeSubCategory, setActiveSubCategory] = useState('')
  const [items, setItems] = useState<any[]>([])
  const [allCategories, setAllCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories().then(setAllCategories)
  }, [])

  useEffect(() => {
    fetchProducts(search, '').then(setItems)
  }, [search])

  const parentCategories = useMemo(
    () => allCategories.filter(c => !c.parentId),
    [allCategories],
  )

  const subCategories = useMemo(
    () => allCategories.filter(c => c.parentId && allCategories.find(p => p.id === c.parentId)?.name === activeCategory),
    [allCategories, activeCategory],
  )

  const filteredItems = useMemo(() => {
    return items.filter(product => {
      const matchesCategory = activeCategory
        ? product.category.startsWith(activeCategory)
        : true
      const matchesSubCategory = activeSubCategory
        ? product.category.includes(activeSubCategory)
        : true
      return matchesCategory && matchesSubCategory
    })
  }, [items, activeCategory, activeSubCategory])

  const activeLabel = useMemo(() => {
    if (activeCategory && activeSubCategory) return `${activeCategory} > ${activeSubCategory}`
    if (activeCategory) return activeCategory
    return 'All categories'
  }, [activeCategory, activeSubCategory])

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
      <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr]">
        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <SectionHeading
            eyebrow="Products"
            title="Elevate your lab capabilities"
            description="Search equipment, consumables and chemicals backed by premium service and technical support."
          />
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Search products</label>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-100"
              placeholder="Brand, category or application"
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Category</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => { setActiveCategory(''); setActiveSubCategory(''); }}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeCategory === '' ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {parentCategories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => { setActiveCategory(category.name); setActiveSubCategory(''); }}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    activeCategory === category.name
                      ? 'bg-brand-700 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {subCategories.length > 0 && (
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Subcategory</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSubCategory('')}
                  className={`rounded-full px-3 py-1.5 text-xs transition ${
                    activeSubCategory === '' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All {activeCategory}
                </button>
                {subCategories.map(sub => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setActiveSubCategory(sub.name)}
                    className={`rounded-full px-3 py-1.5 text-xs transition ${
                      activeSubCategory === sub.name
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-3xl bg-slate-50 p-6 text-sm text-slate-700">
            Viewing <span className="font-semibold text-slate-900">{filteredItems.length}</span> products in <span className="font-semibold text-slate-900">{activeLabel}</span>
          </div>
        </div>
        <div className="space-y-6">
          {filteredItems.length === 0 ? (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <p className="text-xl font-semibold text-slate-900">No products match your search.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredItems.map(product => (
                <article key={product.id} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] flex flex-col md:flex-row gap-6">
                  {product.images && product.images.length > 0 && (
                    <Link to={`/products/${product.id}`} className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-slate-100 hover:opacity-80 transition">
                      <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                    </Link>
                  )}
                  <div className="flex-1">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-slate-500">{product.category}</p>
                        <Link to={`/products/${product.id}`}>
                          <h3 className="mt-3 text-2xl font-semibold text-slate-950 hover:text-brand-700 transition cursor-pointer">{product.name}</h3>
                        </Link>
                        <p className="mt-3 text-sm leading-7 text-slate-600 line-clamp-2">{product.description}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 shrink-0 self-start sm:self-center">{product.brand}</span>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2">{product.application}</span>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <Link to="/contact" className="rounded-full bg-brand-700 px-4 py-2 text-sm text-white font-semibold hover:bg-brand-800 transition">
                        Request quote
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
