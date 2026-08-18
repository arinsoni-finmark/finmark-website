// Generates public/sitemap.xml from the SEO content config.
//
// Run automatically as a `prebuild` step in package.json. You can also run it
// manually with `node scripts/generate-sitemap.js` whenever you add new pages.
//
// The sitemap includes:
//   - Static pages (homepage, about, demo, contact)
//   - All pillar pages from src/content/pillars.js
//   - All product intro pages from src/lib/constants.js
//   - All SEO cluster/guide pages from src/content/clusters.js
//   - Published country/market pages from src/content/countries.js
//
// Duplicate paths are collapsed (a slug that is both a pillar and a product
// only appears once). Update PRIORITIES below to weight some pages higher.

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { PILLARS } from '../src/content/pillars.js'
import { CLUSTERS } from '../src/content/clusters.js'
import { PRODUCTS } from '../src/lib/constants.js'
import { PUBLISHED_COUNTRIES } from '../src/content/countries.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = resolve(__dirname, '..')

const SITE_URL = 'https://finmark.ai'

const STATIC_PAGES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/demo', priority: 0.9, changefreq: 'monthly' },
  { path: '/contact', priority: 0.5, changefreq: 'monthly' },
  { path: '/security', priority: 0.6, changefreq: 'monthly' },
]

const PILLAR_PAGES = PILLARS.map((p) => ({
  path: `/${p.slug}`,
  priority: 0.9,
  changefreq: 'weekly',
}))

// Product intro pages (Amount Payables, ERP Audit, FP&A, MT Billing, etc.)
const PRODUCT_PAGES = PRODUCTS
  .filter((p) => p.intro)
  .map((p) => ({
    path: `/${p.slug}`,
    priority: 0.8,
    changefreq: 'monthly',
  }))

// SEO cluster/guide pages — children of their parent pillar slug.
const CLUSTER_PAGES = CLUSTERS.map((c) => ({
  path: `/${c.pillar}/${c.slug}`,
  priority: 0.8,
  changefreq: 'monthly',
}))

// Country/market pages. Only published ones — an unfinished country must not
// be advertised to Google before its page exists.
const COUNTRY_PAGES = PUBLISHED_COUNTRIES.map((c) => ({
  path: `/accounts-payable-automation/${c.slug}`,
  priority: 0.8,
  changefreq: 'monthly',
}))

// Collapse duplicate paths (e.g. a slug that is both a pillar and a product),
// keeping the first occurrence so higher-priority entries win.
const seen = new Set()
const urls = [...STATIC_PAGES, ...PILLAR_PAGES, ...PRODUCT_PAGES, ...CLUSTER_PAGES, ...COUNTRY_PAGES]
  .filter((u) => {
    if (seen.has(u.path)) return false
    seen.add(u.path)
    return true
  })

const today = new Date().toISOString().split('T')[0]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

const publicDir = resolve(ROOT, 'public')
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true })
}

const outPath = resolve(publicDir, 'sitemap.xml')
writeFileSync(outPath, xml, 'utf-8')

console.log(`✓ Generated sitemap with ${urls.length} URLs → ${outPath}`)
