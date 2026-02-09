import type { MetadataRoute } from 'next';
import { VALUES } from '@/libs/variables';
import { RouteInfo } from '@/libs/routeInfo';
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: VALUES.url.website,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: VALUES.url.website + RouteInfo.routes.Collaborate,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: VALUES.url.website + RouteInfo.routes.Team,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: VALUES.url.website + RouteInfo.routes.Events,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: VALUES.url.website + RouteInfo.routes.Contact,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: VALUES.url.website + RouteInfo.routes.Faq,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: VALUES.url.website + RouteInfo.routes.Register,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9
    }
  ]
}