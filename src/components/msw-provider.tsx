'use client';

import { useEffect, useState } from 'react';

// TODO: 임시 목킹 전용. 실제 API 연동 시 이 파일과 MSWProvider 호출을 제거하고 실 API로 전환할 것.

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initMocks = async () => {
      // 개발 환경에서만 MSW 활성화
      if (process.env.NODE_ENV === 'development') {
        const { worker } = await import('@/mocks/browser');

        await worker.start({
          onUnhandledRequest: 'bypass', // 처리되지 않은 요청은 그냥 통과
          serviceWorker: {
            url: '/mockServiceWorker.js',
          },
        });

        console.log('[MSW] Mock Service Worker started');
      }

      setIsReady(true);
    };

    initMocks();
  }, []);

  // 개발 환경이 아니거나 MSW가 준비되면 children 렌더링
  if (process.env.NODE_ENV !== 'development' || isReady) {
    return <>{children}</>;
  }

  // MSW 로딩 중
  return null;
}
