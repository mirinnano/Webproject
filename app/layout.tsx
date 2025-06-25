import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Navbar from './components/Navbar' // この行のコメントアウトを解除
import Providers from './providers'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
});

export const metadata: Metadata = {
    title: 'アンドロメダ (Romeda) | 公式サイト',
    description: 'カオスでアクティブな雑談サーバー「アンドロメダ」。ゲーム、クリエイティブ、テクノロジー。全てが交差する、はみ出し者たちのユートピアへようこそ。',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ja" className={poppins.className}> 
        <body>
        <Providers>
            <Navbar /> {/* この行のコメントアウトを解除 */}
            <main>{children}</main>
        </Providers>
        </body>
        </html>
    )
}