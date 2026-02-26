'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * スクロール位置に基づいて背景変更を制御するフック
 * - requestAnimationFrameで初期ペイントを最適化
 * - passive eventでスクロールパフォーマンスを向上
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

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    // requestAnimationFrameで初期レンダリング後に状態を設定（レイアウトシフト回避）
    const raf = requestAnimationFrame(handleScroll);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return isScrolled;
}
