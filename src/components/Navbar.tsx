import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchCategories } from '../services/siteApi'
import type { Category } from '../types'

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Catalog', path: '/products' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Technical Support', path: '/services' },
  { name: 'About Us', path: '/about' },
]

export default function Navbar() {
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [catLoading, setCatLoading] = useState(false)

  useEffect(() => {
    if (catalogOpen && categories.length === 0) {
      setCatLoading(true)
      fetchCategories().then(cats => {
        setCategories(cats)
      }).finally(() => setCatLoading(false))
    }
  }, [catalogOpen, categories.length])

  const parentCategories = categories.filter(c => !c.parentId)
  const getSubcats = (parentId: string) => categories.filter(c => c.parentId === parentId)

  return (
    <nav className="sticky top-0 w-full z-50 bg-white border-b border-outline-variant shadow-sm">
      <div className="flex items-center justify-between px-5 md:px-16 py-3 max-w-[1280px] mx-auto">
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="/logo.svg"
            alt="PROSCIENTIFIC SOLUTIONS FZCO"
            className="h-14 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => {
            if (item.name === 'Catalog') {
              return (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => setCatalogOpen(true)}
                  onMouseLeave={() => setCatalogOpen(false)}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `font-['Geist'] text-[14px] leading-none tracking-[0.02em] font-medium transition-colors flex items-center gap-1 ${
                        isActive || catalogOpen
                          ? 'text-primary border-b-2 border-primary pb-1 font-semibold'
                          : 'text-on-surface-variant hover:text-primary'
                      }`
                    }
                  >
                    Catalog
                    <span className={`material-symbols-outlined text-[16px] transition-transform ${catalogOpen ? 'rotate-180' : ''}`}>expand_more</span>
                  </NavLink>

                  {catalogOpen && (
                    <div className="absolute top-full left-0 mt-0 pt-2 w-[600px]">
                      <div className="bg-white border border-outline-variant shadow-xl rounded-lg p-6">
                        {catLoading ? (
                          <div className="text-[14px] text-on-surface-variant py-4">Loading categories...</div>
                        ) : (
                          <div className="grid grid-cols-2 gap-6">
                            {parentCategories.map((cat) => {
                              const subcats = getSubcats(cat.id)
                              return (
                                <div key={cat.id}>
                                  <Link
                                    to={`/products?category=${cat.id}`}
                                    className="font-['Geist'] text-[14px] font-bold text-primary hover:text-secondary transition-colors block mb-2"
                                    onClick={() => setCatalogOpen(false)}
                                  >
                                    {cat.name}
                                  </Link>
                                  {subcats.length > 0 && (
                                    <ul className="space-y-1">
                                      {subcats.map((sub) => (
                                        <li key={sub.id}>
                                          <Link
                                            to={`/products?category=${sub.id}`}
                                            className="font-['Geist'] text-[13px] text-on-surface-variant hover:text-primary transition-colors"
                                            onClick={() => setCatalogOpen(false)}
                                          >
                                            {sub.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        )}
                        <div className="mt-4 pt-4 border-t border-outline-variant">
                          <Link
                            to="/products"
                            className="text-secondary font-['Geist'] text-[14px] font-bold hover:underline"
                            onClick={() => setCatalogOpen(false)}
                          >
                            View All Products →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `font-['Geist'] text-[14px] leading-none tracking-[0.02em] font-medium transition-colors ${
                    isActive
                      ? 'text-primary border-b-2 border-primary pb-1 font-semibold'
                      : 'text-on-surface-variant hover:text-primary'
                  }`
                }
              >
                {item.name}
              </NavLink>
            )
          })}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="bg-primary text-white px-6 py-2 font-['Geist'] text-[14px] leading-none tracking-[0.02em] font-semibold rounded-lg hover:bg-primary-container transition-all"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </nav>
  )
}
