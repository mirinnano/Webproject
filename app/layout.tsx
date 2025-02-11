import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Providers from './providers'

export const metadata: Metadata = {
    title: '常磐華乃を愛するブログ',
    description: '',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ja">
        <body>
        <Providers>
            <Navbar />
            <main className="container mx-auto p-4">{children}</main>
        </Providers>
        </body>
        </html>
    )
}