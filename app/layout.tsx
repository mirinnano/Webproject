import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { ReactNode } from 'react'
import Navbar from './components/Navbar'
import Providers from './providers'
import { Footer } from './components/layout/Footer'; // --- [追加] ---

const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://romeda.tokiwakano.uk'),
  title: {
    default: 'ロメダ (Romeda) | 公式サイト',
    template: '%s | ロメダ (Romeda)',
  },
  description: 'カオスでアクティブな雑談サーバー「ロメダ」。ゲーム、クリエイティブ、テクノロジー。全てが交差する、はみ出し者たちのユートピアへようこそ。',
  openGraph: {
    title: 'ロメダ (Romeda) | 公式サイト',
    description: 'カオスでアクティブな雑談サーバー「ロメダ」。ゲーム、クリエイティブ、テクノロジー。全てが交差する、はみ出し者たちのユートピアへようこそ。',
    url: 'https://romeda.tokiwakano.uk',
    siteName: 'ロメダ (Romeda)',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ロメダ (Romeda) | 公式サイト',
    description: 'カオスでアクティブな雑談サーバー「ロメダ」。ゲーム、クリエイティブ、テクノロジー。全てが交差する、はみ出し者たちのユートピアへようこそ。',
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
      <body className="flex flex-col min-h-screen bg-gray-900"> {/* --- [変更] --- */}
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main> {/* --- [変更] --- */}
          <Footer /> {/* --- [追加] --- */}
        </Providers>
      </body>
    </html>
  )
}