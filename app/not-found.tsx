'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-900 text-white">
      <div className="max-w-md">
        <h1 className="text-6xl font-extrabold text-purple-400">404</h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          ページが見つかりませんでした
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <div className="mt-10">
          <Link href="/">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <Rocket className="mr-2 h-5 w-5" />
              ホームページに戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}