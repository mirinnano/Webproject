import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { ReactNode } from 'react'
import Navbar from './components/Navbar'
import Providers from './providers'
import { Footer } from './components/layout/Footer'
import { SkipToContent } from './components/layout/SkipToContent'
import { JsonLd } from './components/layout/JsonLd'

const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

// --- SEOとOGP設定の最適化 ---
const siteUrl = 'https://romeda.tokiwakano.uk';
const siteTitle = 'ロメダ (Romeda) | ゲーム・創作・雑談のDiscordサーバー';
const siteDescription = 'Discordサーバー「ロメダ」の公式サイト。VALORANT、原神などのゲーム、プログラミングやイラストなどの創作、雑談を楽しむカオスでアクティブなコミュニティです。';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | ロメダ Discordサーバー',
  },
  description: siteDescription,
  keywords: ["ロメダ", "Discord", "サーバー", "コミュニティ", "ゲーム", "VALORANT", "マイクラ", "原神", "雑談", "メンバー募集", "クリエイティブ", "プログラミング"],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'ロメダ (Romeda)',
    images: [
      {
        url: `${siteUrl}/hero-background.jpg`, // publicフォルダに配置するOGP画像
        width: 1200,
        height: 630,
        alt: 'ロメダ(Romeda)公式サイト OGP画像',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [`${siteUrl}/hero-background.jpg`],
    // TODO: ここをあなたの実際のTwitterユーザー名（@から始まる）に書き換えてください
    site: '@61233839281',
    creator: '@61233839281',
  },
}

export const viewport: Viewport = {
  themeColor: '#8B5CF6',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ja" className={poppins.className}>
      <body>
        {/* 構造化データ(JSON-LD)を読み込む */}
        <JsonLd />
        {/* アクセシビリティ対応のスキップリンク */}
        <SkipToContent />

        <Providers>
          <div className="flex flex-col min-h-screen bg-gray-900">
            <Navbar />
            <main id="main-content" className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}