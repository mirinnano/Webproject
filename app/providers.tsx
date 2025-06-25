// app/providers.tsx
'use client';

import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  // 認証や他のクライアント専用ラッパーを全て取り除き、
  // シンプルに children を返すだけのコンポーネントにします。
  return <>{children}</>;
}
