'use client';

import Image from 'next/image';
import { AnimateOnScroll } from "@/components/animation/AnimateOnScroll";
import { Twitter, Github } from 'lucide-react';

// --- 管理人データ ---
const managementTeam = [
  {
    name: 'れおうーん (みゆき)',
    role: 'Founder / Administrator',
    avatar: 'https://images-ext-1.discordapp.net/external/xBfkpndtaufrf644HfjvHzprmg-0wuv4pDluI27LoIM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1355796157946658836/896681e77b8a93d5c6ce68436f5ae56c.png?format=webp&quality=lossless', 
    bio: 'サーバーの創設者。カオスを愛し、自由な空間作りに情熱を注いでいる。最近はAIイラスト作成にハマっているらしい。',
    socials: {
      twitter: 'https://twitter.com/sundaysiesta5',
      github: ' https://github.com/sundaysiesta',
    }
  },
  {
    name: "Shaapy",
    role: "Temporary vessel",
    avatar: "https://cdn.discordapp.com/avatars/1228388887164878848/2bb3b581fdd9861f5ce2e03de55aa6eb.png?size=1024",
    bio: "サーバーの管理と運営を担当していた。今はゆっくりと余生を楽しんでいる。足立区住み。",
    socials: {
      twitter: "https://x.com/UrMomIsGaeBruh",
      
  }
},
  {
    name: '学芸大学',
    role: 'Web Developer',
    avatar: 'https://cdn.discordapp.com/attachments/1333577591558504528/1387358239125143562/image.png?ex=685d0d8c&is=685bbc0c&hm=4c9eb67f69a684fdb9c20441353c79cf7fa27fb9354064de2496334466f20120&',
    bio: 'この公式サイトを開発した。新山です。',
    socials: {
      twitter: 'https://x.com/61233839281',
      github: 'https://github.com/mirinnano',
      
    }
  },
  
];


export default function ManagementPage() {
  return (
    <div className="bg-gray-900 text-white">
      {/* ヒーローセクション */}
      <div className="relative bg-gray-800 py-24 sm:py-32">
          <div className="absolute inset-0">
            <Image
              src="/hero-background.jpg"
              alt="Background"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <AnimateOnScroll>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Management Team
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                ロメダを支える運営メンバーです。
              </p>
            </div>
          </AnimateOnScroll>
      </div>
      
      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {managementTeam.map((member, index) => (
              <AnimateOnScroll key={member.name} delay={index * 150}>
                <div className="bg-gray-800 rounded-2xl shadow-xl p-8 text-center flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300 h-full">
                  <Image
                    src={member.avatar}
                    alt={`${member.name}のアバター`}
                    width={120}
                    height={120}
                    className="rounded-full mb-4 border-4 border-purple-600"
                  />
                  <h2 className="text-2xl font-bold text-white">{member.name}</h2>
                  <p className="text-purple-400 font-semibold mt-1">{member.role}</p>
                  <p className="mt-4 text-gray-400 flex-grow">{member.bio}</p>
                  <div className="mt-6 flex space-x-4">
                    {member.socials.twitter && (
                      <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors"><Twitter /></a>
                    )}
                    {member.socials.github && (
                      <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Github /></a>
                    )}
                     
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </main>
    </div>
  );
}