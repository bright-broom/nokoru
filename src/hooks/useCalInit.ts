'use client';

import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';

/**
 * Cal.com UIの初期化を行うhook
 * CalButton / CalEmbed で共通使用
 */
export function useCalInit(brandColor: string) {
  useEffect(() => {
    (async function initCal() {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'light',
        styles: {
          branding: {
            brandColor,
          },
        },
      });
    })();
  }, [brandColor]);
}
