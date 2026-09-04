import type { MetadataRoute } from 'next'
import { SERVER_CONFIG } from '@/lib/config'
import { MODES } from '@/lib/modes'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SERVER_CONFIG.url
  const lastModified = new Date()

  // Base routes
  const routes = [
    '',
    '/modes',
    '/store',
    '/how-to-play',
    '/rules',
    '/pvp',
    '/discord',
    '/leaderboard',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Mode specific routes
  const modeRoutes = MODES.map((mode) => ({
    url: `${baseUrl}/modes/${mode.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...routes, ...modeRoutes]
}
