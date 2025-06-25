"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/announcements", label: "Announcements" },
    { href: "https://discord.gg/bSAgveD9Ru", label: "Join Discord", isExternal: true },
  ];

  return (
    <>
      {/* --- デスクトップ用ナビゲーション (右上配置) --- */}
      <nav 
        className={cn(
          "hidden md:block",
          "fixed top-4 right-4 z-50", // 右上に配置
          "transition-all duration-300 ease-in-out"
        )}
      >
        <div 
          className={cn(
            "flex items-center gap-1 p-2 rounded-full border",
            isScrolled 
              ? "bg-gray-900/80 border-white/20 backdrop-blur-sm" 
              : "bg-transparent border-transparent"
          )}
        >
          {navLinks.map((link) => (
            link.isExternal ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-semibold text-gray-200 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-gray-200 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
      </nav>

      {/* --- モバイル用ナビゲーション (ハンバーガーメニュー) --- */}
      <nav 
        className={cn(
          "md:hidden flex items-center justify-between",
          "fixed top-0 left-0 right-0 p-4 z-50",
          isScrolled ? "bg-gray-900/80 backdrop-blur-sm" : "bg-transparent"
        )}
      >
        <Link href="/" className="text-xl font-bold text-white">
          Romeda
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* モバイル用ドロワー */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 bg-gray-900/70 backdrop-blur-lg z-40 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      >
        <div 
          className={cn(
            "absolute top-0 right-0 h-full w-4/5 max-w-sm bg-gray-900 p-6 flex flex-col shadow-2xl transition-transform duration-300",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={() => setIsOpen(false)} className="self-end text-gray-400 hover:text-white mb-8">
            <X className="w-7 h-7" />
          </button>
          <div className="flex flex-col items-center justify-center flex-grow gap-6">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a key={link.label} href={link.href} /* ... */ >{link.label}</a>
              ) : (
                <Link key={link.label} href={link.href} onClick={() => setIsOpen(false)} /* ... */ >{link.label}</Link>
              )
            ))}
          </div>
        </div>
      </div>
    </>
  );
}