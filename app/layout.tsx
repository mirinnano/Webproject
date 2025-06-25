// app/layout.tsx
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { ReactNode } from 'react'
import Navbar from './components/Navbar'
import Providers from './providers'

// Google Fonts の設定
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

// サイトの基本 URL (環境変数が無ければデフォルト)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://romeda.tokiwakano.uk'

// ページ共通のメタデータ
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Romeda | カオスでアクティブな雑談サーバー',
    template: '%s | Romeda',
  },
  description:
    'カオスでアクティブな雑談サーバー「ロメダ」。ゲーム、クリエイティブ、テクノロジー。全てが交差する、はみ出し者たちのユートピアへようこそ。',
  keywords: [
    'Discord',
    'コミュニティ',
    'ゲーム',
    '雑談',
    'プログラミング',
    'VALORANT',
    'LoL',
    'Romeda',
    'ロメダ',
    '株',
    'カオス',
    'アクティブ',
    '雑談サーバー',
    'ユートピア',
    'はみ出し者',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Romeda | カオスでアクティブな雑談サーバー',
    description:
      'ゲーム、クリエイティブ、テクノロジー。全てが交差するユートピアへようこそ。',
    url: siteUrl,
    siteName: 'Romeda',
    images: [
      {
        url: '/andromeda-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Romeda Community Logo',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Romeda | カオスでアクティブな雑談サーバー',
    description:
      'カオスでアクティブな雑談サーバー「ロメダ」。ゲーム、クリエイティブ、テクノロジー。全てが交差する、はみ出し者たちのユートピアへようこそ。',
    images: ['/andromeda-og-image.jpg'],
    creator: '@あなたのTwitterID',
  },
  alternates: {
    canonical: '/',
  },
}

// ビューポート設定 (Next.js が自動で `<meta>` を挿入)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#111827',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ja" className={poppins.className}>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
