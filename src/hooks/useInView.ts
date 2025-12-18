'use client';

import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  /** 要素がビューポートに入る前に発火するマージン */
  rootMargin?: string;
  /** 要素がどの程度見えたら発火するか (0-1) */
  threshold?: number | number[];
  /** 一度だけ発火するか */
  triggerOnce?: boolean;
}

/**
 * 要素がビューポートに入ったかを検知するフック
 *
 * @example
 * const { ref, isInView } = useInView({ triggerOnce: true });
 * return <div ref={ref} className={isInView ? 'animate-fade-in' : 'opacity-0'} />
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  rootMargin = '0px 0px -100px 0px',
  threshold = 0.1,
  triggerOnce = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // モーション削減設定を尊重
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // eslint (react-hooks/set-state-in-effect) 対策:
      // effect本体で同期的にsetStateせず、次フレームに回す
      const raf = requestAnimationFrame(() => setIsInView(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold, triggerOnce]);

  return { ref, isInView };
}
