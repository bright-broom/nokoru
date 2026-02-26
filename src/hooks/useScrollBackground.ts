'use client';

import { useState, useEffect } from 'react';

/**
 * スクロール位置に基づいて背景変更を制御するフック
 *
 * @param threshold - スクロール検知の閾値（px）
 * @returns isScrolled - 閾値を超えたかどうか
 *
 * @example
 * const isScrolled = useScrollBackground(50);
 *
 * <header className={isScrolled ? 'bg-white' : 'bg-transparent'}>
 */
export function useScrollBackground(threshold: number = 50): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // 初期状態を設定
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
