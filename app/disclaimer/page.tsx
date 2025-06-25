import Image from 'next/image';
import { AnimateOnScroll } from "@/components/animation/AnimateOnScroll";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '免責事項 | ロメダ (Romeda)',
  description: '当サイト「ロメダ (Romeda) | 公式サイト」の免責事項に関するページです。',
  robots: {
    index: false, // 通常、免責事項ページは検索結果に表示させない
    follow: true,
  }
};

export default function DisclaimerPage() {
  const lastUpdated = "2025年6月25日";

  return (
    <div className="bg-gray-900 text-white">
      {/* ヒーローセクション */}
      <div className="relative bg-gray-800 py-24 sm:py-32">
        <div className="absolute inset-0">
          <Image
            src="/hero-background.jpg"
            alt="Background"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <AnimateOnScroll>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Disclaimer
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
              免責事項
            </p>
          </div>
        </AnimateOnScroll>
      </div>
      
      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <AnimateOnScroll>
          <div className="bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            {/* proseクラスで見やすいテキストスタイルを適用 */}
            <article className="prose prose-lg prose-invert text-gray-300">
              <p>本免責事項は、ロメダ運営（以下「当方」といいます）が運営・管理するウェブサイト「ロメダ (Romeda) | 公式サイト」（以下「当サイト」といいます）の利用に関する注意事項を定めたものです。当サイトを利用される前によくお読みいただき、ご同意の上でご利用ください。</p>
              
              <h2>掲載情報について</h2>
              <p>当方は、当サイトに掲載する情報の正確性、完全性、最新性等について万全を期しておりますが、その内容を完全に保証するものではありません。当サイトの情報を用いて行う一切の行為、およびそれによって生じた何らかの損害について、当方は一切の責任を負いかねます。</p>
              
              <h2>著作権について</h2>
              <p>当サイトに掲載されている文章、画像、動画等の著作権は、当方または正当な権利を有する第三者に帰属します。法律によって認められる範囲を超えて、これらのコンテンツを無断で複製、転用、販売することを禁じます。</p>
              <p>メンバーによって投稿されたコンテンツ（例: お知らせ記事内の文章や画像など）の著作権は、投稿したメンバー本人に帰属します。ただし、投稿をもって、当サイトおよび関連メディアにおいて無償で利用（複製、公開、送信、頒布、翻訳、翻案など）する権利を許諾したものとします。</p>

              <h2>リンクについて</h2>
              <p>当サイトはリンクフリーです。ただし、公序良俗に反するサイトからのリンクはお断りいたします。</p>
              <p>当サイトからリンクやバナーによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について、当方は一切の責任を負いません。</p>

              <h2>サイトの運営について</h2>
              <p>当サイトは、予告なしに運営の中断、中止または内容の変更を行うことがあります。これによって生じた損害についても、当方は一切の責任を負いません。</p>

              <h2>免責事項の変更について</h2>
              <p>当方は、法令の変更やサイト運営方針の変更に伴い、本免責事項を予告なく変更することがあります。変更後の免責事項は、当サイトに掲載された時点から効力を生じるものとします。</p>

              <hr />
              <p className="text-right text-sm">最終更新日: {lastUpdated}</p>

            </article>
          </div>
        </AnimateOnScroll>
      </main>
    </div>
  );
}