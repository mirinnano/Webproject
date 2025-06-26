

// SEO と OGP のための Metadata をインポート
import type { Metadata } from 'next';
import Image from 'next/image';
import { AnimateOnScroll } from "@/components/animation/AnimateOnScroll";
import { Users, Scale, Bomb } from "lucide-react";

// --- [SEO改善点①] ページのメタデータを設定 ---
// このページ専用のタイトルと説明文を設定します。
export const metadata: Metadata = {
  title: 'ロメダ論 | 私たちの理念',
  description: 'Discordサーバー「ロメダ」の理念と哲学、設立経緯について。多様性の尊重、最大限の自由、破壊と創造を指針とする、はみ出し者たちのためのユートピアです。',
  openGraph: {
    title: 'ロメダ論 | 私たちの理念',
    description: 'Discordサーバー「ロメダ」の理念と哲学、設立経緯について。',
    // aboutページ固有のURLを指定
    url: 'https://romeda.tokiwakano.uk/about',
  },
};

export default function AboutPage() {
  const principles = [
    {
      icon: <Users className="h-8 w-8 text-pink-400" />,
      title: "多様性の尊重",
      description: "趣味、年齢、所属、思想など、あらゆるバックグラウンドを持つメンバーが共存しています。互いの違いを理解し、尊重することがロメダの基本です。"
    },
    {
      icon: <Scale className="h-8 w-8 text-sky-400" />,
      title: "最大限の自由",
      description: "言論と表現の自由を最大限に確保します。ただし、それは他者を無差別に傷つける自由ではありません。建設的なカオスを目指します。"
    },
    {
      icon: <Bomb className="h-8 w-8 text-emerald-400" />,
      title: "破壊と創造",
      description: "常識や固定観念に挑戦し、新しい価値観や文化を創造することを楽しむ精神を歓迎します。ここは、はみ出し者たちのためのユートピアです。"
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <AnimateOnScroll>
        <div className="relative bg-gray-800 py-24 sm:py-32">
          <div className="absolute inset-0">
            <Image
              src="/hero-background.jpg"
              alt="ロメダの理念を象徴する抽象的な背景画像" // --- [SEO改善点②] altテキストを具体的に ---
              fill
              className="object-cover opacity-20"
              priority // --- [SEO改善点②] LCPになりうる画像なのでpriorityを追加 ---
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* --- [SEO改善点③] HTML構造の確認 --- */}
            {/* h1はこのページで最も重要な見出し。このままで完璧です。 */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              ロメダ論
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
              底辺による底辺のためのユートピア、その理念と哲学。
            </p>
          </div>
        </div>
      </AnimateOnScroll>

      <div className="relative py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimateOnScroll>
            <div className="max-w-3xl mx-auto text-lg leading-8">
              {/* h2はページの主要なセクションの見出し。適切です。 */}
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                設立経緯
              </h2>
              <p className="mt-6">
                ROMEDAは、2018年2月25日、当時YouTubeの動画投稿者として活動していた <strong className="font-semibold text-purple-500">れおうーん（みゆき）</strong> によって、創設されました。
              </p>
              <p className="mt-4">
                特定の界隈に依存せず、多様なバックグラウンドを持つメンバーが集まる「るつぼ」のような場所を目指してスタートしました。私たちは、既存のコミュニティに馴染めなかった「はみ出し者」たちが、自分らしくいられる最後の砦となることを目指しています。
              </p>
            </div>
          </AnimateOnScroll>

          <div className="mt-20">
            <AnimateOnScroll>
              <div className="text-center">
                {/* こちらもh2で問題ありません。 */}
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                  行動指針
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
                  ロメダが目指す「建設的なカオス」を維持するための3つの柱。
                </p>
              </div>
            </AnimateOnScroll>
            <div className="mt-12 grid max-w-xl mx-auto gap-8 lg:max-w-none lg:grid-cols-3">
              {principles.map((principle, index) => (
                <AnimateOnScroll key={principle.title} delay={index * 150}>
                  <div className="flex flex-col p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg h-full">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 dark:bg-purple-900/50 text-white">
                        {principle.icon}
                      </div>
                    </div>
                    <div className="mt-6">
                      {/* h3はh2セクション内の小見出し。これも適切です。 */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{principle.title}</h3>
                      <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}