import Image from 'next/image';
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Users, Rocket, Gamepad2, Code, Music, Paintbrush } from 'lucide-react';
import { AnimateOnScroll } from '@/components/animation/AnimateOnScroll';

// サイトのURLやタイトルを一元管理
const siteUrl = 'https://romeda.tokiwakano.uk';
const siteTitle = 'ロメダ (Romeda) | 公式サイト';
const siteDescription = 'カオスでアクティブなDiscordサーバー「ロメダ」。ゲーム、クリエイティブ、テクノロジー。全てが交差する、はみ出し者たちのユートピアへようこそ。';

// Next.js App Routerの標準的なメタデータ設定
export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: siteUrl, // このページの正規URLを明示
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'ロメダ (Romeda)',
    images: [
      {
        url: `${siteUrl}/hero-background.jpg`, // publicフォルダに配置したOGP画像のパス
        width: 1200,
        height: 630,
        alt: 'ロメダ (Romeda) 公式サイト OGP画像',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [`${siteUrl}/hero-background.jpg`], // Twitterカード用の画像
  },
};

// メインのホームページコンポーネント
export default function HomePage() {
  const communityFeatures = [
    {
      icon: <Gamepad2 className="w-10 h-10 text-pink-400" />,
      title: "ゲーム",
      description: "VALORANTやLoLなどの対人ゲームから、各種インディーズゲーム、美少女ゲームまで幅広くプレイ。日夜ボイスチャットで盛り上がっています。"
    },
    {
      icon: <Music className="w-10 h-10 text-sky-400" />,
      title: "音楽",
      description: "ボカロ、VTuber、J-POP、洋楽など、メンバーの好きな音楽は多種多様。SpotifyやSoundCloudのプレイリストを共有し、新たな音楽との出会いを楽しんでいます。"
    },
    {
      icon: <Paintbrush className="w-10 h-10 text-emerald-400" />,
      title: "イラスト・創作",
      description: "イラストやMMD、小説など、あらゆる創作活動を歓迎します。あなたの作品を共有し、フィードバックを得られる場所です。"
    },
    {
      icon: <Code className="w-10 h-10 text-orange-400" />,
      title: "プログラミング",
      description: "Web開発(フロントエンド・バックエンド)やbot開発など、様々な分野のエンジニアが在籍。技術的な問題を相談したり、共同でプロジェクトを進めたりしています。"
    }
  ];

  return (
    <div className="w-full">
      {/* --- ヒーローセクション --- */}
      <section className="relative text-center py-28 md:py-40 bg-gray-900 text-white overflow-hidden">
        <Image
          src="/hero-background.jpg"
          alt="ロメダのサーバーを象徴する宇宙空間の背景画像"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/80 to-pink-900/70 animate-gradient"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <AnimateOnScroll delay={100}>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight uppercase">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Welcome to Romeda
              </span>
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll delay={250}>
            <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              カオスと自由が交差する、はみ出し者たちのユートピア。
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={400}>
            <div className="mt-10 flex justify-center gap-4">
              <a href="https://discord.gg/bSAgveD9Ru" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
                  <Rocket className="mr-2 h-5 w-5" />
                  今すぐ参加する
                </Button>
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* --- What is Romeda? セクション --- */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">What is Romeda?</h2>
              <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                ROMEDA(ロメダ)、通称ロメダは、「カオスでアクティブなDiscordサーバー」です。
              </p>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                言論・表現の自由が最大限に確保されており、ほぼ無法地帯ともいえます。さまざまな界隈からのはみ出し者を集めた、底辺による底辺のためのユートピアを目指しています。
              </p>
              <p className="mt-8 text-md text-gray-500 dark:text-gray-400">
                - Founder: れおうーん(みゆき) -
              </p>
            </div>
          </AnimateOnScroll>

          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {communityFeatures.map((feature, index) => (
              <AnimateOnScroll key={feature.title} delay={index * 150}>
                <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg h-full transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/50 mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* --- 紹介動画セクション --- */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">ロメダを覗いてみる</h2>
              <p className="mt-4 text-lg text-gray-400">百聞は一見に如かず。動画で私たちの雰囲気を感じてください。</p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-800">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/あなたのYouTube動画ID"
                  title="ロメダ紹介動画"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* --- 最終CTAセクション --- */}
      <section className="bg-gray-800">
          <div className="max-w-3xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
              <AnimateOnScroll>
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                      <span className="block">準備はいいですか？</span>
                      <span className="block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                          今すぐコミュニティに参加しよう。
                      </span>
                  </h2>
                  <a
                      href="https://discord.gg/bSAgveD9Ru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 sm:w-auto transition-transform transform hover:scale-105"
                  >
                      <Users className="mr-2 h-5 w-5"/>
                      Romedaに参加
                  </a>
              </AnimateOnScroll>
          </div>
      </section>
    </div>
  );
}