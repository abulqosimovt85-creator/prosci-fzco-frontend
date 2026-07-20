import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const API_BASE = process.env.VITE_API_BASE_URL || 'https://prosci-fzco-dubai-backend-production.up.railway.app/api'
const SITE_URL = 'https://psci-sol.com'
const TODAY = new Date().toISOString().split('T')[0]

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/products', priority: '0.9', changefreq: 'weekly' },
  { path: '/solutions', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/industries', priority: '0.7', changefreq: 'monthly' },
  { path: '/brands', priority: '0.7', changefreq: 'monthly' },
  { path: '/case-studies', priority: '0.6', changefreq: 'monthly' },
  { path: '/insights', priority: '0.6', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
]

async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('[sitemap] Could not fetch products from API:', err.message)
    return []
  }
}

function generateXml(productUrls) {
  const allUrls = [
    ...staticRoutes.map(r => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`),
    ...productUrls.map(p => `  <url>
    <loc>${SITE_URL}/products/${p.id}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`)
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.join('\n')}
</urlset>`
}

async function main() {
  console.log('[sitemap] Fetching product data...')
  const products = await fetchProducts()
  console.log(`[sitemap] Found ${products.length} products`)

  const xml = generateXml(products)
  const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
  fs.writeFileSync(outPath, xml, 'utf-8')
  console.log(`[sitemap] Written to ${outPath}`)
}

main()
