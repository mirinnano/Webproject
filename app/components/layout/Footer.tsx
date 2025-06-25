import Link from 'next/link';
import { Users, FileText, Shield } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '/management', label: '管理人紹介', icon: <Users /> },
    { href: '/privacy-policy', label: 'プライバシーポリシー', icon: <Shield /> },
    { href: '/disclaimer', label: '免責事項', icon: <FileText /> },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
            <div className="flex justify-center space-x-6 mb-6">
                {footerLinks.map((link) => (
                    <Link key={link.label} href={link.href} className="text-sm hover:text-white transition-colors flex items-center gap-2">
                        {link.icon}
                        <span>{link.label}</span>
                    </Link>
                ))}
            </div>
            <div className="mt-4">
                <p className="text-sm">
                Copyright © {currentYear} ロメダ公式HP All Rights Reserved.
                </p>
                <p className="text-xs mt-1 text-gray-500">
                Developed by 学芸大学
                </p>
            </div>
        </div>
      </div>
    </footer>
  );
};