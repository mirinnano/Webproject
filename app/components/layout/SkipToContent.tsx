'use client'; // クリック操作を扱うため'use client'が必要です

export const SkipToContent = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector<HTMLElement>('#main-content')?.focus();
  };

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      // 通常は非表示で、Tabキーでフォーカスされた時だけ表示されるスタイル
      className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded-lg"
    >
      メインコンテンツへスキップ
    </a>
  );
};