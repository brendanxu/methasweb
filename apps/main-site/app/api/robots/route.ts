import { NextResponse } from 'next/server'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.methas.cn'

export async function GET() {
  const robots = `User-agent: *
Allow: /

# Disallow admin and api routes
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /login
Disallow: /register

# Allow public assets
Allow: /images/
Allow: /icons/
Allow: /favicon.ico

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1`

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate=43200',
    },
  })
}