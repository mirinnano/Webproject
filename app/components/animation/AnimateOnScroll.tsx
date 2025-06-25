'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number; // アニメーションの遅延時間（ミリ秒）
  threshold?: number; // 要素がどのくらい表示されたらアニメーションを開始するかの閾値 (0 to 1)
};

export function AnimateOnScroll({ children, className = '', delay = 0, threshold = 0.1 }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 画面内に入ったら isVisible を true にする
        if (entry.isIntersecting) {
          setIsVisible(true);
          // 一度表示したら監視を停止する
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // クリーンアップ
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const classes = `
    transition-all duration-1000 ease-out
    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
    ${className}
  `;

  return (
    <div ref={ref} className={classes} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}