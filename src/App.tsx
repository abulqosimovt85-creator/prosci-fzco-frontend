import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SolutionsPage from './pages/SolutionsPage'
import ServicesPage from './pages/ServicesPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
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
        <div className="text-sm text-on-surface-variant">Verifying access...</div>
      </div>
    )
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

function App() {
  return (
    <HelmetProvider>
    <BrowserRouter>
      <ScrollToTop />
      <ErrorBoundary>
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route
          path="*"
          element={
            <PublicLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/solutions" element={<SolutionsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </PublicLayout>
          }
        />
      </Routes>
      </ErrorBoundary>
    </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
