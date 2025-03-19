import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Image from 'next/image';
import Head from 'next/head';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'びしょげオタクのブログ',
  description: '美少女ゲームの感想、レビュー、セール情報をお届けするブログ',
};

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

interface PostsResponse {
  allPosts: Post[];
  popularPosts: Post[];
  tags: string[];
}

async function getPosts(): Promise<PostsResponse> {
  const postsDirectory = path.join(process.cwd(), 'app/posts');
  
  try {
    const entries = await fs.promises.readdir(postsDirectory, { withFileTypes: true });
    const files = entries
      .filter((entry) => entry.isFile() && path.extname(entry.name) === '.md')
      .map((entry) => entry.name);

    const posts = await Promise.all(files.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = await fs.promises.readFile(filePath, 'utf8');
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
    }));

    const popularPosts = posts
      .sort((a, b) => b.frontmatter.views - a.frontmatter.views)
      .slice(0, 10);

    const allTags = Array.from(new Set(posts.flatMap((post) => post.frontmatter.tags ?? [])));

    return {
      allPosts: posts.sort((a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime()),
      popularPosts,
      tags: allTags,
    };
  } catch (error) {
    console.error('Error loading posts:', error);
    return {
      allPosts: [],
      popularPosts: [],
      tags: [],
    };
  }
}

function formatDate(date: Date) {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function Home() {
  const { allPosts, popularPosts, tags } = await getPosts();

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description}/>
        <meta name="robots" content="index, follow"/>

        {/* Open Graph (SNS用) */}
        <meta property="og:title" content={metadata.title}/>
        <meta property="og:description" content={metadata.description}/>
        <meta property="og:image" content="/default-thumbnail.jpg"/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.tokiwakano.uk'}/>
        <meta property="og:type" content="website"/>

        {/* Twitterカード */}
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content={metadata.title}/>
        <meta name="twitter:description" content={metadata.description}/>
        <meta name="twitter:image" content="/default-thumbnail.jpg"/>
        <meta name="twitter:url" content={process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.tokiwakano.uk'}/>
        <script async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7251276119313924"
                crossOrigin="anonymous"></script>
      </Head>

      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* メインコンテンツ */}
        <div className="w-full lg:w-3/4 space-y-8">
          {/* 最新記事 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">最新記事</h2>
            {allPosts.slice(0, 2).map((post) => (
              <article key={post.slug} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-video">
                  <Image
                    src={post.frontmatter.thumbnail}
                    alt={post.frontmatter.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="rounded-t-lg object-cover"
                    priority={true}
                  />
                </div>
                <div className="p-6">
                  <Link href={`/posts/${post.slug}`} legacyBehavior>
                    <a className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                      {post.frontmatter.title}
                    </a>
                  </Link>
                  <p className="text-gray-600 mt-3">{post.frontmatter.description}</p>
                  <div className="text-sm text-gray-500 mt-4">{formatDate(post.frontmatter.date)}</div>
                </div>
              </article>
            ))}
          </section>

          {/* 他の記事 */}
          <section>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">他の記事</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPosts.slice(2, 7).map((post) => (
                <article key={post.slug} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative aspect-video">
                    <Image
                      src={post.frontmatter.thumbnail}
                      alt={post.frontmatter.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="rounded-t-lg object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <Link href={`/posts/${post.slug}`} legacyBehavior>
                      <a className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                        {post.frontmatter.title}
                      </a>
                    </Link>
                    <p className="text-gray-600 mt-2 text-sm">{post.frontmatter.description}</p>
                    <div className="text-xs text-gray-500 mt-2">{formatDate(post.frontmatter.date)}</div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* サイドバー */}
        <div className="w-full lg:w-1/4 space-y-8">
          {/* 人気記事 */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">人気記事</h3>
            <ol className="space-y-2">
              {popularPosts.map((post, index) => (
                <li key={post.slug} className="flex items-center">
                  <span className="text-gray-500 mr-2">{index + 1}.</span>
                  <Link href={`/posts/${post.slug}`} legacyBehavior>
                    <a className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
                      {post.frontmatter.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ol>
          </section>

          {/* タグ一覧 */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">タグ一覧</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`} legacyBehavior>
                  <a className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors duration-300">
                    {tag}
                  </a>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-6 mt-8">
        <p>&copy; {new Date().getFullYear()} びしょげオタクのブログ. All rights reserved.</p>
      </footer>
    </div>
  );
}
