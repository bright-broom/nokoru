'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn, cardStyles, revealOnHoverClasses } from '@/lib/utils';
import { FadeIn } from '@/components/ui/FadeIn';
import type { WorkImage } from '@/types';

interface WorkCardProps {
   image: WorkImage;
   priority?: boolean;
   className?: string;
   delay?: number;
   /** アスペクト比の設定 (tailwind class) */
   aspectRatio?: string;
}

export function WorkCard({
   image,
   priority,
   className,
   delay = 0,
   aspectRatio = 'aspect-[1.618/1]',
}: WorkCardProps) {
   return (
      <FadeIn direction="scale-up" delay={delay} duration={900} easing="smooth" className={className}>
         <Link
            href={`/works/${image.id}`}
            className={`${cardStyles.base} ${cardStyles.hover} block h-full`}
         >
            {/* 背景の柔らかなグロー */}
            <div className="absolute -inset-2 bg-gradient-to-br from-site-accent/10 via-transparent to-gold/10 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

            <div className={cn("relative h-full w-full overflow-hidden rounded-2xl", aspectRatio)}>
               <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={priority}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-110"
               />

               {/* プレミアム・オーバーレイ */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 transition-opacity duration-700 group-hover:opacity-70" />

               {/* エディトリアル・コンテンツ */}
               <div className={cn("absolute inset-x-0 bottom-0 p-8", revealOnHoverClasses)}>
                  {image.locationTag && (
                     <div className="mb-3 flex items-center gap-2">
                        <span className="h-px w-6 bg-gold/60" />
                        <span className="track-kicker text-xs font-bold uppercase text-gold-light">
                           {image.locationTag}
                        </span>
                     </div>
                  )}
                  <h3 className="font-display text-xl leading-tight text-white tracking-wide md:text-2xl">
                     {image.alt}
                  </h3>

                  {/* Discover More link */}
                  <div className="track-label mt-4 flex items-center gap-2 text-xs font-bold uppercase text-white/60">
                     <span>View Story</span>
                     <div className="h-px w-0 bg-white/40 transition-all duration-500 group-hover:w-8" />
                  </div>
               </div>

               {/* 装飾コーナー */}
               <div className="absolute top-4 right-4 h-8 w-8 opacity-0 transition-opacity duration-700 group-hover:opacity-40">
                  <div className="absolute top-0 right-0 h-px w-full bg-white" />
                  <div className="absolute top-0 right-0 h-full w-px bg-white" />
               </div>
            </div>
         </Link>
      </FadeIn>
   );
}
