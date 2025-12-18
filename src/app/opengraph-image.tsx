import { ImageResponse } from 'next/og';
import { text } from '@/config';
import { SocialImageContent, socialImageConfig } from '@/components/seo/SocialImage';

export const runtime = 'edge';

export const alt = text.seo.socialImageAlt;
export const size = socialImageConfig.size;
export const contentType = socialImageConfig.contentType;

export default async function Image() {
  return new ImageResponse(<SocialImageContent />, { ...size });
}
