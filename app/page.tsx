import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Image from 'next/image';
import Head from 'next/head';
import { Button } from "@/components/ui/button";
import { Card,  CardTitle } from "@/components/ui/card";
import { Users, Rocket, Gamepad2, Code, Music,Paintbrush } from 'lucide-react';
import { AnimateOnScroll } from '@/components/animation/AnimateOnScroll';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'ロメダ (Romeda) | 公式サイト',
  description: 'カオスでアクティブな雑談サーバー「ロメダ」。ゲーム、クリエイティブ、テクノロジー。全てが交差する、はみ出し者たちのユートピアへようこそ。',
};

// --- データ構造の定義 ---
interface Frontmatter {
  title: string;
  date: Date;
  description?: string;
  tags?: string[];
  views: number;
  thumbnail: string;
}

interface Post {
  slug: string;
  frontmatter: Frontmatter;
}

// --- お知らせ取得関数 ---
async function getAnnouncements(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), 'app/posts');
  try {
    const files = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
    const posts = files.map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContents);
      return {
        slug: filename.replace('.md', ''),
        frontmatter: {
          title: frontmatter.title ?? 'Untitled',
          date: new Date(frontmatter.date ?? '1970-01-01'),
          description: frontmatter.description ?? '',
          tags: frontmatter.tags ?? [],
          views: frontmatter.views ?? 0,
          thumbnail: frontmatter.thumbnail ?? '/default-thumbnail.jpg',
        },
      };
    });
    return posts.sort((a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime());
  } catch (error) {
    console.error('Error loading posts for announcements:', error);
    return [];
  }
}

// --- 日付フォーマット関数 ---
function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// --- メインコンポーネント ---
export default async function HomePage() {
  const announcements = (await getAnnouncements()).slice(0, 3);

const communityFeatures = [
    {
      icon: <Gamepad2 className="w-10 h-10 text-pink-400" />,
      title: "ゲーム",
      description: "VALORANTやLoLなどの対人ゲームから、各種インディーズゲーム、美少女ゲームまで幅広くプレイ。日夜ボイスチャットで盛り上がっています。"
    },
    {
      icon: <Music className="w-10 h-10 text-sky-400" />,
      title: "音楽",
      description: "ボカロ、VTuber、J-POP、洋楽など、メンバーの好きな音楽は多種多様。SpotifyやSoundCloudのプレイリストを共有し、新たな音楽との出会いを楽しんでいます。"
    },
    {
      icon: <Paintbrush className="w-10 h-10 text-emerald-400" />,
      title: "イラスト・創作",
      description: "イラストやMMD、小説など、あらゆる創作活動を歓迎します。あなたの作品を共有し、フィードバックを得られる場所です。"
    },
    {
      icon: <Code className="w-10 h-10 text-orange-400" />,
      title: "プログラミング",
      description: "Web開発(フロントエンド・バックエンド)やbot開発など、様々な分野のエンジニアが在籍。技術的な問題を相談したり、共同でプロジェクトを進めたりしています。"
    }
  ];

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="/hero-background.jpg" />
        <meta property="og:url" content="https://romeda.tokiwakano.uk" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="/andromeda-og-image.jpg" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7251276119313924" crossOrigin="anonymous"></script>
      </Head>

      <div className="w-full">
        {/* --- ヒーローセクション --- */}
        <section className="relative text-center py-28 md:py-40 bg-gray-900 text-white overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{ backgroundImage: "url('/hero-background.jpg')" }} // 例: /public/hero-background.jpg
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <AnimateOnScroll delay={100}>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight uppercase">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Welcome to Romeda
                </span>
              </h1>
            </AnimateOnScroll>
            <AnimateOnScroll delay={250}>
              <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                カオスと自由が交差する、はみ出し者たちのユートピア。
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={400}>
              <div className="mt-10 flex justify-center gap-4">
                <a href="[ここにDiscord招待URLを貼る]" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
                    <Rocket className="mr-2 h-5 w-5" />
                    今すぐ参加する
                  </Button>
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* --- What is &Romeda? セクション --- */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">What is Romeda?</h2>
                <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  ROMEDA(ロメダ)、通称ロメダは、「カオスでアクティブな雑談サーバー」です。
                </p>
                <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  言論・表現の自由が最大限に確保されており、ほぼ無法地帯ともいえます。さまざまな界隈からのはみ出し者を集めた、底辺による底辺のためのユートピアを目指しています。
                </p>
                <p className="mt-8 text-md text-gray-500 dark:text-gray-400">
                  - Founder: れおうーん(みゆき) -
                </p>
              </div>
            </AnimateOnScroll>
            
            <div className="mt-16 grid gap-10 md:grid-cols-3">
              {communityFeatures.map((feature, index) => (
                <AnimateOnScroll key={feature.title} delay={index * 150}>
                  <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg h-full transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/50 mx-auto">
                      {feature.icon}
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* --- お知らせセクション --- */}
        {announcements.length > 0 && (
          <section className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimateOnScroll>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Announcements</h2>
                  <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">コミュニティの最新情報をお届けします。</p>
                </div>
              </AnimateOnScroll>
              <div className="grid gap-8 lg:grid-cols-3">
                {announcements.map((post, index) => (
                  <AnimateOnScroll key={post.slug} delay={index * 150}>
                    <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-shadow rounded-2xl overflow-hidden h-full flex flex-col">
                      <Link href={`/posts/${post.slug}`} className="block">
                        <div className="relative h-48 w-full">
                          <Image
                            src={post.frontmatter.thumbnail}
                            alt={post.frontmatter.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      </Link>
                      <div className="p-6 flex flex-col flex-grow">
                          <CardTitle className="text-xl font-bold hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            <Link href={`/posts/${post.slug}`}>
                              {post.frontmatter.title}
                            </Link>
                          </CardTitle>
                          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm flex-grow">
                            {post.frontmatter.description}
                          </p>
                          <div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                            {formatDate(post.frontmatter.date)}
                          </div>
                      </div>
                    </Card>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* --- 最終CTAセクション --- */}
        <section className="bg-gray-800">
            <div className="max-w-3xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                <AnimateOnScroll>
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">準備はいいですか？</span>
                        <span className="block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                            今すぐコミュニティに参加しよう。
                        </span>
                    </h2>
                    <a
                        href="[ここにDiscord招待URLを再度貼る]"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 sm:w-auto transition-transform transform hover:scale-105"
                    >
                        <Users className="mr-2 h-5 w-5"/>
                        Romedaに参加
                    </a>
                </AnimateOnScroll>
            </div>
        </section>
      </div>
    </>
  );
}