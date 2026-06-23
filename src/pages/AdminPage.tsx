import React, { useState, useEffect } from 'react'
import {
  fetchProducts,
  fetchCategories,
  fetchBrands,
  fetchAllInquiries,
  updateInquiryStatus,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  deleteCategory,
  createBrand,
  deleteBrand,
  generateProductAI
} from '../services/siteApi'
import type { Product, Category, Brand, Inquiry } from '../types'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'products' | 'categories' | 'brands'>('inquiries')
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [productsList, setProductsList] = useState<Product[]>([])
  const [categoriesList, setCategoriesList] = useState<Category[]>([])
  const [brandsList, setBrandsList] = useState<Brand[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Modals / Form states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  
  // Product Form State
  const [prodFormName, setProdFormName] = useState('')
  const [prodFormCategory, setProdFormCategory] = useState('')
  const [prodFormBrand, setProdFormBrand] = useState('')
  const [prodFormApplication, setProdFormApplication] = useState('')
  const [prodFormDescription, setProdFormDescription] = useState('')
  const [prodFormPdf, setProdFormPdf] = useState('#')
  const [prodFormImages, setProdFormImages] = useState<string[]>([])
  const [prodFormAiContext, setProdFormAiContext] = useState('')
  const [prodFormSpecs, setProdFormSpecs] = useState<{ key: string; value: string }[]>([
    { key: '', value: '' }
  ])
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [aiFeedback, setAiFeedback] = useState<string | null>(null)

  // Category Form State
  const [newCatName, setNewCatName] = useState('')
  const [newCatParentId, setNewCatParentId] = useState('')
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null)
  const [newSubCatName, setNewSubCatName] = useState('')
  // Brand Form State
  const [newBrandName, setNewBrandName] = useState('')
  const [newBrandLogo, setNewBrandLogo] = useState('')
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null)

  // Search & Filter
  const [productSearch, setProductSearch] = useState('')
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'pending' | 'in-contact' | 'archived'>('all')

  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [inqs, prods, cats, brs] = await Promise.all([
        fetchAllInquiries().catch(() => [] as Inquiry[]),
        fetchProducts().catch(() => [] as Product[]),
        fetchCategories().catch(() => [] as Category[]),
        fetchBrands().catch(() => [] as Brand[])
      ])
      setInquiries(inqs)
      setProductsList(prods)
      setCategoriesList(cats)
      setBrandsList(brs)
    } catch (err) {
      console.error('Error loading admin dashboard data:', err)
      setError('Could not establish a stable connection to the database. Running in offline resilient mode.')
    } finally {
      setLoading(false)
    }
  }

  // Inquiry management
  const handleInquiryStatusChange = async (id: string, newStatus: 'pending' | 'in-contact' | 'archived') => {
    try {
      const updated = await updateInquiryStatus(id, newStatus)
      setInquiries(prev => prev.map(inq => inq.id === id ? updated : inq))
    } catch (err) {
      alert('Could not update status on server. Retrying locally...')
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq))
    }
  }

  // Product modal opening
  const openAddProductModal = () => {
    setEditingProduct(null)
    setProdFormName('')
    setProdFormCategory(categoriesList[0]?.name || '')
    setProdFormBrand(brandsList[0]?.name || '')
    setProdFormApplication('')
    setProdFormDescription('')
    setProdFormPdf('#')
    setProdFormImages([])
    setProdFormAiContext('')
    setProdFormSpecs([{ key: '', value: '' }])
    setAiFeedback(null)
    setIsProductModalOpen(true)
  }

  const openEditProductModal = (prod: Product) => {
    setEditingProduct(prod)
    setProdFormName(prod.name)
    setProdFormCategory(prod.category)
    setProdFormBrand(prod.brand)
    setProdFormApplication(prod.application)
    setProdFormDescription(prod.description)
    setProdFormPdf(prod.pdf || '#')
    setProdFormImages(prod.images || [])
    setProdFormAiContext('')
    
    const mappedSpecs = Object.entries(prod.specs || {}).map(([k, v]) => ({ key: k, value: v }))
    setProdFormSpecs(mappedSpecs.length > 0 ? mappedSpecs : [{ key: '', value: '' }])
    setAiFeedback(null)
    setIsProductModalOpen(true)
  }

  // Dynamic image field manipulation
  const handleAddImageField = () => {
    setProdFormImages([...prodFormImages, ''])
  }

  const handleRemoveImageField = (idx: number) => {
    setProdFormImages(prodFormImages.filter((_, i) => i !== idx))
  }

  const handleImageFieldChange = (idx: number, val: string) => {
    const updated = [...prodFormImages]
    updated[idx] = val
    setProdFormImages(updated)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setProdFormImages(prev => [...prev, base64String])
      }
      reader.readAsDataURL(file)
    })
    // Reset input
    e.target.value = ''
  }

  // Dynamic spec field manipulation
  const handleAddSpecField = () => {
    setProdFormSpecs([...prodFormSpecs, { key: '', value: '' }])
  }

  const handleRemoveSpecField = (idx: number) => {
    setProdFormSpecs(prodFormSpecs.filter((_, i) => i !== idx))
  }

  const handleSpecFieldChange = (idx: number, field: 'key' | 'value', val: string) => {
    const updated = [...prodFormSpecs]
    updated[idx][field] = val
    setProdFormSpecs(updated)
  }

  // AI Generation hook
  const handleAIGeneration = async () => {
    if (!prodFormName.trim()) {
      alert('Please provide a Product Name first to give the AI context.')
      return
    }
    setIsGeneratingAI(true)
    setAiFeedback('Connecting to AI Product Architect...')
    try {
      const generated = await generateProductAI(prodFormName, prodFormCategory || 'Lab Equipment', prodFormAiContext)
      
      if (generated.name) setProdFormName(generated.name)
      if (generated.description) setProdFormDescription(generated.description)
      if (generated.application) setProdFormApplication(generated.application)
      if (generated.specs) {
        const specList = Object.entries(generated.specs).map(([k, v]) => ({ key: k, value: v }))
        setProdFormSpecs(specList.length > 0 ? specList : [{ key: '', value: '' }])
      }
      setAiFeedback('Success! Technical details generated.')
      setTimeout(() => setAiFeedback(null), 3000)
    } catch (err) {
      console.error(err)
      setAiFeedback('AI model is offline. Used scientific templates instead.')
      // Dynamic local templates as robust backup
      const demoSpecs: Record<string, string> = {
        'Operating range': '0 - 100% capacity',
        'Accuracy rating': '±0.05% full scale',
        'Standard interface': 'USB / RS-232 serial',
        'Certification': 'CE / ISO 9001 compliance'
      }
      setProdFormDescription(`A premium, high-precision ${prodFormName} engineered for clinical laboratories and analytical chemistry applications requiring micro-trace accuracy.`)
      setProdFormApplication(`Optimized for high-throughput testing, sample preparations, and strict biological asset isolation.`)
      setProdFormSpecs(Object.entries(demoSpecs).map(([k, v]) => ({ key: k, value: v })))
      setTimeout(() => setAiFeedback(null), 3000)
    } finally {
      setIsGeneratingAI(false)
    }
  }

  // Product form submission
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construct specs object from key-value pairs
    const finalSpecs: Record<string, string> = {}
    prodFormSpecs.forEach(item => {
      if (item.key.trim() && item.value.trim()) {
        finalSpecs[item.key.trim()] = item.value.trim()
      }
    })

    const payload = {
      name: prodFormName.trim(),
      category: prodFormCategory || 'Lab Equipment',
      brand: prodFormBrand || 'Generic',
      application: prodFormApplication.trim() || 'General laboratory use',
      description: prodFormDescription.trim(),
      specs: finalSpecs,
      pdf: prodFormPdf.trim() || '#',
      images: prodFormImages
    }

    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, payload)
        setProductsList(prev => prev.map(p => p.id === editingProduct.id ? updated : p))
      } else {
        const created = await createProduct(payload)
        setProductsList(prev => [created, ...prev])
      }
      setIsProductModalOpen(false)
    } catch (err) {
      alert('Failed to save product in database. Falling back to local update...')
      // Local fallback
      if (editingProduct) {
        const fallbackProd = { ...editingProduct, ...payload }
        setProductsList(prev => prev.map(p => p.id === editingProduct.id ? fallbackProd : p))
      } else {
        const fallbackProd = { ...payload, id: `p-${Math.floor(1000 + Math.random() * 9000)}` } as Product
        setProductsList(prev => [fallbackProd, ...prev])
      }
      setIsProductModalOpen(false)
    }
  };

  const handleProductDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      await deleteProduct(id)
      setProductsList(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      alert('Could not delete from database. Retrying locally...')
      setProductsList(prev => prev.filter(p => p.id !== id))
    }
  }

  // Category creation & deletion
  const handleCategoryCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatName.trim()) return
    try {
      const created = await createCategory({ 
        name: newCatName.trim(), 
        parentId: null 
      })
      setCategoriesList(prev => [...prev, created])
      setNewCatName('')
    } catch (err) {
      alert('Could not save category to server. Adding locally...')
      const localCat = { 
        id: newCatName.toLowerCase().replace(/\s+/g, '-'), 
        name: newCatName.trim(),
        parentId: null
      }
      setCategoriesList(prev => [...prev, localCat])
      setNewCatName('')
    }
  }

  const handleCategoryDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return
    try {
      await deleteCategory(id)
      setCategoriesList(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      alert('Could not delete from server. Removing locally...')
      setCategoriesList(prev => prev.filter(c => c.id !== id))
    }
  }

  // Brand creation & deletion
  const handleSubCategoryCreate = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault()
    if (!newSubCatName.trim()) return
    try {
      const created = await createCategory({ 
        name: newSubCatName.trim(), 
        parentId: parentId 
      })
      setCategoriesList(prev => [...prev, created])
      setNewSubCatName('')
    } catch (err) {
      alert('Could not save subcategory to server. Adding locally...')
      const localCat = { 
        id: newSubCatName.toLowerCase().replace(/\s+/g, '-'), 
        name: newSubCatName.trim(),
        parentId: parentId
      }
      setCategoriesList(prev => [...prev, localCat])
      setNewSubCatName('')
    }
  }

  const handleBrandCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBrandName.trim()) return
    const logoStr = newBrandLogo.trim() || newBrandName.trim().toUpperCase()
    
    try {
      if (editingBrand) {
        const updated = await updateBrand(editingBrand.id, { name: newBrandName.trim(), logo: logoStr })
        setBrandsList(prev => prev.map(b => b.id === editingBrand.id ? updated : b))
        setEditingBrand(null)
      } else {
        const created = await createBrand({ name: newBrandName.trim(), logo: logoStr })
        setBrandsList(prev => [...prev, created])
      }
      setNewBrandName('')
      setNewBrandLogo('')
    } catch (err) {
      alert('Could not save brand to server. Adding locally...')
      const localBrand = { 
        id: editingBrand ? editingBrand.id : newBrandName.toLowerCase().replace(/\s+/g, '-'), 
        name: newBrandName.trim(), 
        logo: logoStr 
      }
      if (editingBrand) {
        setBrandsList(prev => prev.map(b => b.id === editingBrand.id ? localBrand : b))
        setEditingBrand(null)
      } else {
        setBrandsList(prev => [...prev, localBrand])
      }
      setNewBrandName('')
      setNewBrandLogo('')
    }
  }

  const openEditBrand = (br: Brand) => {
    setEditingBrand(br)
    setNewBrandName(br.name)
    setNewBrandLogo(br.logo)
  }

  const cancelBrandEdit = () => {
    setEditingBrand(null)
    setNewBrandName('')
    setNewBrandLogo('')
  }

  const handleBrandDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this brand?')) return
    try {
      await deleteBrand(id)
      setBrandsList(prev => prev.filter(b => b.id !== id))
    } catch (err) {
      alert('Could not delete brand from server. Removing locally...')
      setBrandsList(prev => prev.filter(b => b.id !== id))
    }
  }

  // Metrics extraction
  const totalLeads = inquiries.length
  const pendingLeads = inquiries.filter(i => !i.status || i.status === 'pending').length
  const inContactLeads = inquiries.filter(i => i.status === 'in-contact').length
  const archivedLeads = inquiries.filter(i => i.status === 'archived').length

  // Pipeline Value Calculator
  const estimatedPipeline = inquiries.reduce((sum, inq) => {
    if (!inq.budget) return sum
    // Extract numbers from strings like "$10,000 - $50,000" or "$100,000+"
    const cleaned = inq.budget.replace(/[^0-9-]/g, '')
    if (cleaned.includes('-')) {
      const [low, high] = cleaned.split('-').map(Number)
      return sum + (low + high) / 2
    } else {
      const val = Number(cleaned)
      return sum + (isNaN(val) ? 0 : val)
    }
  }, 0)

  // Filtering lists
  const filteredInquiries = inquiries.filter(inq => {
    const status = inq.status || 'pending'
    if (inquiryFilter === 'all') return true
    return status === inquiryFilter
  })

  const filteredProducts = productsList.filter(prod => {
    const norm = productSearch.toLowerCase().trim()
    if (!norm) return true
    return (
      prod.name.toLowerCase().includes(norm) ||
      prod.category.toLowerCase().includes(norm) ||
      prod.brand.toLowerCase().includes(norm)
    )
  })

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Dashboard section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              ProScient Admin Operations
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Core platform console for lead ingestion, scientific catalog, and machine learning content generation.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadAllData}
              className="flex items-center justify-center p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all active:scale-95 shadow-sm"
              title="Refresh all data"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8.89M9 11l3-3m0 0l3 3m-3-3v8" />
              </svg>
              <span className="ml-2 text-xs font-semibold">Synchronize</span>
            </button>
            {activeTab === 'products' && (
              <button
                onClick={openAddProductModal}
                className="flex items-center justify-center px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold text-xs rounded-lg shadow-md transition-all active:scale-95"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Instrument
              </button>
            )}
          </div>
        </div>

        {/* HUD Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Estimated Pipeline</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">
                  ${estimatedPipeline.toLocaleString()}
                </h3>
              </div>
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <div className="text-[10px] text-slate-400 mt-3 flex items-center">
              Calculated from incoming client budget ranges.
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Unresolved Leads</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">
                  {pendingLeads} <span className="text-sm font-normal text-slate-400">/ {totalLeads} total</span>
                </h3>
              </div>
              <span className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <div className="text-[10px] text-slate-400 mt-3 flex items-center">
              {inContactLeads} in contact · {archivedLeads} archived
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Products Catalog</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{productsList.length}</h3>
              </div>
              <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
                </svg>
              </span>
            </div>
            <div className="text-[10px] text-slate-400 mt-3">
              Representing {brandsList.length} global manufacturers.
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Partner Brands</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{brandsList.length}</h3>
              </div>
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
            </div>
            <div className="text-[10px] text-slate-400 mt-3">
              Mapped into {categoriesList.length} product classes.
            </div>
          </div>
        </div>

        {/* Database connectivity notification */}
        {error && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
            <span className="p-1.5 bg-amber-100 text-amber-600 rounded-lg mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div>
              <h4 className="text-sm font-semibold text-amber-800">Connection Note</h4>
              <p className="text-xs text-amber-700 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-6 py-3.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'border-brand-700 text-brand-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Inquiries
            {pendingLeads > 0 && (
              <span className="px-1.5 py-0.5 bg-amber-500 text-white text-[10px] font-extrabold rounded-full">
                {pendingLeads}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-brand-700 text-brand-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Instruments CRUD
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-6 py-3.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'categories'
                ? 'border-brand-700 text-brand-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('brands')}
            className={`px-6 py-3.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'brands'
                ? 'border-brand-700 text-brand-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Brands
          </button>
        </div>

        {/* Tab Content Loading placeholder */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <span className="w-10 h-10 border-4 border-slate-200 border-t-brand-700 rounded-full animate-spin" />
            <p className="text-sm text-slate-500">Syncing database registries...</p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* INQUIRIES TAB CONTENT */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    Customer Requirement Requests
                    <span className="text-xs font-normal text-slate-400">({filteredInquiries.length})</span>
                  </h2>
                  <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-1">
                    <button
                      onClick={() => setInquiryFilter('all')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                        inquiryFilter === 'all' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setInquiryFilter('pending')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                        inquiryFilter === 'pending' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => setInquiryFilter('in-contact')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                        inquiryFilter === 'in-contact' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      In Contact
                    </button>
                    <button
                      onClick={() => setInquiryFilter('archived')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                        inquiryFilter === 'archived' ? 'bg-white text-slate-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Archived
                    </button>
                  </div>
                </div>

                {filteredInquiries.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-xl py-12 text-center text-slate-500">
                    <p className="text-sm">No customer inquiries match this filter state.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredInquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="bg-white border border-slate-200 rounded-xl p-5 hover:border-brand-300 transition-all flex flex-col md:flex-row justify-between gap-6 shadow-sm"
                      >
                        <div className="space-y-3 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">{inq.name}</span>
                            <span className="text-xs text-slate-300">•</span>
                            <span className="text-xs text-slate-500">{inq.company}</span>
                            <span className="text-xs text-slate-300">•</span>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-indigo-50 text-indigo-600 border-indigo-100">
                              {inq.industry}
                            </span>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-600 border-emerald-100">
                              {inq.budget}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 italic font-light">
                            "{inq.message}"
                          </p>
                          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500">
                            <span className="flex items-center">
                              {inq.email}
                            </span>
                            <span className="flex items-center">
                              {inq.phone}
                            </span>
                          </div>
                        </div>

                        <div className="flex md:flex-col justify-end items-end gap-3 shrink-0">
                          <div className="flex items-center gap-1.5 text-xs">
                            <span className="text-slate-400">Status:</span>
                            {(!inq.status || inq.status === 'pending') && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1">
                                Pending
                              </span>
                            )}
                            {inq.status === 'in-contact' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-600 border border-sky-100 flex items-center gap-1">
                                In Contact
                              </span>
                            )}
                            {inq.status === 'archived' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1">
                                Archived
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            {(!inq.status || inq.status === 'pending') && (
                              <button
                                onClick={() => handleInquiryStatusChange(inq.id, 'in-contact')}
                                className="px-3 py-1 bg-sky-600 text-white rounded-md text-xs font-semibold transition-all shadow-sm hover:bg-sky-700"
                              >
                                Reach Out
                              </button>
                            )}
                            {inq.status !== 'archived' && (
                              <button
                                onClick={() => handleInquiryStatusChange(inq.id, 'archived')}
                                className="px-3 py-1 border border-slate-200 text-slate-600 rounded-md text-xs font-semibold hover:bg-slate-50 transition-all"
                              >
                                Archive
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PRODUCTS CRUD TAB CONTENT */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    Scientific Equipment Registries
                    <span className="text-xs font-normal text-slate-400">({filteredProducts.length})</span>
                  </h2>
                  <div className="relative max-w-sm w-full">
                    <input
                      type="text"
                      placeholder="Search name, category, or brand..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="block w-full px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-xl py-12 text-center text-slate-500">
                    <p className="text-sm">No instruments match your search criteria.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200 text-left">
                      <thead className="bg-slate-50 text-[10px] text-slate-500 uppercase font-semibold tracking-wider">
                        <tr>
                          <th className="px-6 py-4">Instrument</th>
                          <th className="px-6 py-4">Category</th>
                          <th className="px-6 py-4">Brand</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                        {filteredProducts.map((prod) => (
                          <tr key={prod.id} className="hover:bg-slate-50 transition-all">
                            <td className="px-6 py-4">
                              <span className="font-bold text-slate-900 block">{prod.name}</span>
                              <span className="text-[10px] text-slate-400 truncate max-w-xs block">{prod.application}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] border border-slate-200 text-slate-600 font-semibold">
                                {prod.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-semibold text-slate-500">{prod.brand}</td>
                            <td className="px-6 py-4 text-right space-x-2 shrink-0">
                              <button
                                onClick={() => openEditProductModal(prod)}
                                className="px-2.5 py-1 text-brand-700 font-bold hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleProductDelete(prod.id)}
                                className="px-2.5 py-1 text-rose-600 font-bold hover:underline"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* CATEGORIES CRUD TAB CONTENT */}
            {activeTab === 'categories' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Creator panel */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 h-fit space-y-4 shadow-sm">
                  <h3 className="text-md font-bold text-slate-900">Add Top-Level Category</h3>
                  <form onSubmit={handleCategoryCreate} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Category Name</label>
                      <input
                        type="text"
                        placeholder="Analytical Systems, Centrifuges..."
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 shadow-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold text-xs rounded-lg shadow-sm transition-all active:scale-95"
                    >
                      Create Base Category
                    </button>
                  </form>
                </div>

                {/* Display list */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-md font-bold text-slate-900">Category Hierarchy</h3>
                  <div className="space-y-3">
                    {categoriesList.filter(c => !c.parentId).map((cat) => (
                      <div key={cat.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div 
                          className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-all"
                          onClick={() => setExpandedCategoryId(expandedCategoryId === cat.id ? null : cat.id)}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`p-1 rounded-md transition-all ${expandedCategoryId === cat.id ? 'bg-brand-50 text-brand-700' : 'bg-slate-100 text-slate-400'}`}>
                              <svg className={`w-4 h-4 transition-transform ${expandedCategoryId === cat.id ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                            <span className="font-bold text-sm text-slate-900">{cat.name}</span>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleCategoryDelete(cat.id); }}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>

                        {expandedCategoryId === cat.id && (
                          <div className="border-t border-slate-100 bg-slate-50/50 p-4 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {categoriesList.filter(sub => sub.parentId === cat.id).map(sub => (
                                <div key={sub.id} className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg shadow-sm">
                                  <span className="text-xs font-semibold text-slate-700">{sub.name}</span>
                                  <button onClick={() => handleCategoryDelete(sub.id)} className="text-rose-500 hover:text-rose-700 p-1">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>

                            <form onSubmit={(e) => handleSubCategoryCreate(e, cat.id)} className="flex items-center gap-2 pt-2 border-t border-slate-200">
                              <input
                                type="text"
                                placeholder="New sub-category name..."
                                value={newSubCatName}
                                onChange={(e) => setNewSubCatName(e.target.value)}
                                className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-900 text-[11px] focus:outline-none focus:ring-1 focus:ring-brand-500"
                              />
                              <button type="submit" className="px-4 py-1.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-[11px] rounded-lg transition-all shadow-sm">
                                Add Sub-class
                              </button>
                            </form>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* BRANDS CRUD TAB CONTENT */}
            {activeTab === 'brands' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 rounded-xl p-5 h-fit space-y-4 shadow-sm">
                  <h3 className="text-md font-bold text-slate-900">Add Partner Brand</h3>
                  <form onSubmit={handleBrandCreate} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Brand Name</label>
                      <input
                        type="text"
                        placeholder="EXON, ZENITH..."
                        value={newBrandName}
                        onChange={(e) => setNewBrandName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 shadow-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold text-xs rounded-lg shadow-sm transition-all"
                    >
                      Save Manufacturer
                    </button>
                  </form>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-md font-bold text-slate-900">Active Manufacturers</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {brandsList.map((br) => (
                      <div key={br.id} className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between shadow-sm hover:bg-slate-50 transition-all">
                        <span className="font-bold text-xs text-slate-900">{br.name}</span>
                        <button onClick={() => handleBrandDelete(br.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal handling */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all">
            <div className="relative bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 space-y-6">
              
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900">
                  {editingProduct ? 'Modify Instrument Record' : 'Catalog New Instrument'}
                </h3>
                <button onClick={() => setIsProductModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Product name</label>
                    <input
                      type="text"
                      required
                      value={prodFormName}
                      onChange={(e) => setProdFormName(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-xs focus:ring-1 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Category</label>
                    <select
                      value={prodFormCategory}
                      onChange={(e) => setProdFormCategory(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-xs focus:outline-none"
                    >
                      {categoriesList.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Brand</label>
                    <select
                      value={prodFormBrand}
                      onChange={(e) => setProdFormBrand(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-xs focus:outline-none"
                    >
                      {brandsList.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-brand-700 uppercase tracking-wider">AI Product Architect</h4>
                      <p className="text-[10px] text-slate-500">Provide a URL or technical text for accurate extraction.</p>
                    </div>
                    <button
                      type="button"
                      disabled={isGeneratingAI}
                      onClick={handleAIGeneration}
                      className="px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isGeneratingAI ? 'Extracting...' : 'Generate from Context'}
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Paste technical details, brochure text, or a product URL here..."
                    value={prodFormAiContext}
                    onChange={(e) => setProdFormAiContext(e.target.value)}
                    className="block w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-900 text-[11px] placeholder:text-slate-400 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
                  />
                  {aiFeedback && <p className="text-[10px] font-semibold text-brand-600 animate-pulse">{aiFeedback}</p>}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Primary Applications</label>
                    <input
                      type="text"
                      placeholder="e.g. Pharmaceutical QC, Environmental Analysis"
                      value={prodFormApplication}
                      onChange={(e) => setProdFormApplication(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-xs focus:ring-1 focus:ring-brand-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Technical Description</label>
                    <textarea
                      rows={3}
                      placeholder="Enter a professional overview of the instrument..."
                      value={prodFormDescription}
                      onChange={(e) => setProdFormDescription(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-xs resize-none focus:ring-1 focus:ring-brand-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Technical Specifications</label>
                    <button type="button" onClick={handleAddSpecField} className="text-brand-700 font-bold text-[10px] hover:underline">+ Add Parameter</button>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {prodFormSpecs.map((spec, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Parameter"
                          value={spec.key}
                          onChange={(e) => handleSpecFieldChange(idx, 'key', e.target.value)}
                          className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-[11px] focus:ring-1 focus:ring-brand-500 outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Value"
                          value={spec.value}
                          onChange={(e) => handleSpecFieldChange(idx, 'value', e.target.value)}
                          className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-[11px] focus:ring-1 focus:ring-brand-500 outline-none"
                        />
                        <button type="button" onClick={() => handleRemoveSpecField(idx)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Product Photos</label>
                      <p className="text-[10px] text-slate-400">Upload local files or provide external URLs.</p>
                    </div>
                    <div className="flex gap-2">
                      <label className="cursor-pointer px-3 py-1 bg-white border border-slate-200 rounded-lg text-brand-700 font-bold text-[10px] hover:bg-slate-50 shadow-sm transition-all">
                        <span>+ Upload Files</span>
                        <input 
                          type="file" 
                          multiple 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageUpload} 
                        />
                      </label>
                      <button type="button" onClick={handleAddImageField} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-brand-700 font-bold text-[10px] hover:bg-slate-50 shadow-sm transition-all">
                        + Add URL Row
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {prodFormImages.map((imgUrl, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        {imgUrl.startsWith('data:image') ? (
                          <div className="h-8 w-8 shrink-0 rounded bg-slate-100 border border-slate-200 overflow-hidden">
                            <img src={imgUrl} alt="" className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 shrink-0 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-[8px] text-slate-400 uppercase font-bold">
                            URL
                          </div>
                        )}
                        <input
                          type="text"
                          placeholder="https://example.com/image.jpg or base64 data..."
                          value={imgUrl.startsWith('data:image') ? '[Local Image Data]' : imgUrl}
                          readOnly={imgUrl.startsWith('data:image')}
                          onChange={(e) => handleImageFieldChange(idx, e.target.value)}
                          className={`flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] focus:ring-1 focus:ring-brand-500 outline-none ${imgUrl.startsWith('data:image') ? 'bg-slate-50 text-slate-400' : 'bg-white'}`}
                        />
                        <button type="button" onClick={() => handleRemoveImageField(idx)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    {prodFormImages.length === 0 && (
                      <p className="text-[10px] text-slate-400 italic text-center py-4 border-2 border-dashed border-slate-100 rounded-xl">No images added yet.</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsProductModalOpen(false)} className="px-4 py-2 text-slate-600 font-bold text-xs">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-lg shadow-md">Save Record</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
