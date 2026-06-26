import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import SolutionsPage from './pages/SolutionsPage'
import ServicesPage from './pages/ServicesPage'
import IndustriesPage from './pages/IndustriesPage'
import BrandsPage from './pages/BrandsPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import InsightsPage from './pages/InsightsPage'
import ContactPage from './pages/ContactPage'
import AdminPage from './pages/AdminPage'
import AdminLoginPage from './pages/AdminLoginPage'

function AdminRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      setIsAuthenticated(false)
      return
    }
    // Verify token with backend
    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'}/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('admin_token')
          setIsAuthenticated(false)
        }
      })
      .catch(() => {
        localStorage.removeItem('admin_token')
        setIsAuthenticated(false)
      })
  }, [])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-sm text-slate-500">Verifying access...</div>
      </div>
    )
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
