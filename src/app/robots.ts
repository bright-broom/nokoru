import type { MetadataRoute } from 'next';
import { text } from '@/config';

const BASE_URL = text.seo.baseUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
