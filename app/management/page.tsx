
// SEO と OGP のための Metadata をインポート
import type { Metadata } from 'next';
import Image from 'next/image';
import { AnimateOnScroll } from "@/components/animation/AnimateOnScroll";
import { Twitter, Github } from 'lucide-react';

const siteUrl = 'https://romeda.tokiwakano.uk';

// --- [SEO改善点①] ページのメタデータを設定 ---
// このページ専用のタイトルと説明文を設定します。
// layout.tsxの'template'と組み合わさり、<title>は「Management | ロメダ (Romeda)」のようになります。
export const metadata: Metadata = {
  title: 'Management',
  description: 'Discordサーバー「ロメダ」の運営メンバーを紹介します。サーバーの創設者や開発者など、個性豊かなチームをご覧ください。',
  openGraph: {
    title: 'Management | ロメダ (Romeda)',
    description: 'Discordサーバー「ロメダ」の運営メンバーを紹介します。',
    url: `${siteUrl}/management`,
  },
};


// --- 管理人データ (変更なし) ---
const managementTeam = [
  {
    name: 'れおうーん (みゆき)',
    role: 'Founder / Administrator',
    avatar: `${siteUrl}/miyukki.png`,
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
    avatar: `${siteUrl}/gakugei.png`,
    bio: 'この公式サイトを開発した。新山です。',
    socials: {
      twitter: 'https://x.com/61233839281',
      github: 'https://github.com/mirinnano',
    }
  },
];


export default function ManagementPage() {
  return (
    // [SEO改善点③] 構造化データ(JSON-LD)を追加する準備
    // Personスキーマを各メンバーに追加することも可能ですが、
    // まずはページ全体が誰のサイトかを示すOrganizationスキーマをlayout.tsxで設定するのが効果的です。
    // (これは前回のlayout.tsxの改善案で対応済みです)
    <div className="bg-gray-900 text-white">
      {/* ヒーローセクション */}
      <div className="relative bg-gray-800 py-24 sm:py-32">
        <div className="absolute inset-0">
          <Image
            src="/hero-background.jpg"
            alt="運営チームの背景画像" // [SEO改善点②] altテキストを具体的に
            fill
            className="object-cover opacity-20"
            priority // ページ上部の大きな画像にはpriorityを追加して読み込みを高速化
          />
        </div>
        <AnimateOnScroll>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* <h1>はページの主題。このままでOK */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {managementTeam.map((member, index) => (
            <AnimateOnScroll key={member.name} delay={index * 150}>
              <div className="bg-gray-800 rounded-2xl shadow-xl p-8 text-center flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300 h-full">
                <Image
                  src={member.avatar}
                  alt={`${member.name}のアバター画像`} // [SEO改善点②] altテキストを具体的に
                  width={120}
                  height={120}
                  className="rounded-full mb-4 border-4 border-purple-600 object-cover" 
                />
                {/* <h2>はセクションの見出し。メンバー名で適切 */}
                <h2 className="text-2xl font-bold text-white">{member.name}</h2>
                <p className="text-purple-400 font-semibold mt-1">{member.role}</p>
                <p className="mt-4 text-gray-400 flex-grow">{member.bio}</p>
                <div className="mt-6 flex space-x-4">
                  {member.socials.twitter && (
                    <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors" aria-label={`${member.name}のTwitter`}>
                      <Twitter />
                    </a>
                  )}
                  {member.socials.github && (
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label={`${member.name}のGithub`}>
                      <Github />
                    </a>
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