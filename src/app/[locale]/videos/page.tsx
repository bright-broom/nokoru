'use client';

import { useState } from 'react';
import { videos, text } from '@/config';
import { PageLayout } from '@/components/layout';
import { SectionHeader, BackLink, VideoModal } from '@/components/ui';
import type { Video } from '@/types';
import { CategoryFilter, VideoCard, type FilterCategory } from './_components';

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter((v) => v.category === selectedCategory);

  return (
    <>
      <PageLayout>
        <div className="mx-auto max-w-6xl px-6">
          <BackLink href="/" label={text.pages.videos.backToTop} />

          <SectionHeader
            title={text.pages.videos.title}
            subtitle={text.pages.videos.subtitle}
            className="mb-12"
          />

          <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                delay={index * 100}
                onPlay={() => setSelectedVideo(video)}
              />
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <p className="mt-12 text-center text-text-light">
              該当する動画がありません
            </p>
          )}
        </div>
      </PageLayout>

      {selectedVideo && (
        <VideoModal
          videoId={selectedVideo.youtubeId}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
}
