"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-900 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* サイトタイトル */}
                <h1 className="text-xl font-bold">常磐華乃を愛するブログ</h1>

                {/* ハンバーガーメニュー（モバイル用） */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* ナビゲーションリンク */}
                <div className={`md:flex gap-6 ${isOpen ? "block" : "hidden"} absolute md:static top-16 left-0 w-full bg-gray-900 md:w-auto md:bg-transparent md:space-x-6 text-center md:text-left`}>
                    <Link href="/" className="block py-2 md:py-0 hover:text-gray-300 transition">Home</Link>
                    <Link href="/about" className="block py-2 md:py-0 hover:text-gray-300 transition">About</Link>
                    <Link href="/disclaimer" className="block py-2 md:py-0 hover:text-gray-300 transition">Disclaimer</Link>
                    <Link href="https://discordapp.com/users/1122179390403510335" className="block py-2 md:py-0 hover:text-gray-300 transition">Contact(discord)</Link>
                </div>
            </div>

            {/* フッター（免責事項・著作権情報） */}

        </nav>
    );
}
