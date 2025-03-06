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

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    description?: string;
    tags?: string[];
    views: number;
    thumbnail?: string;
  };
}

async function getPosts(): Promise<{ allPosts: Post[]; popularPosts: Post[]; tags: string[] }> {
  const postsDirectory = path.join(process.cwd(), 'app/posts');
  const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile() && path.extname(entry.name) === '.md').map((entry) => entry.name);

  const posts = files.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter } = matter(fileContents);

    return {
      slug: filename.replace('.md', ''),
      frontmatter: {
        title: frontmatter.title ?? 'Untitled',
        date: frontmatter.date ?? '1970-01-01',
        description: frontmatter.description ?? '',
        tags: frontmatter.tags ?? [],
        views: frontmatter.views ?? 0,
        thumbnail: frontmatter.thumbnail ?? null,
      },
    };
  });

  const popularPosts = posts.sort((a, b) => b.frontmatter.views - a.frontmatter.views).slice(0, 10);
  const allTags = posts.flatMap((post) => post.frontmatter.tags ?? []);
  const uniqueTags = Array.from(new Set(allTags));
  return {
    allPosts: posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()),
    popularPosts: popularPosts,
    tags: uniqueTags,
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function Home() {
  const { allPosts, popularPosts, tags } = await getPosts();

  return (
      <div className="font-sans bg-gray-100">
        <Head>
          <title>エロゲオタクのブログ</title>
          <meta name="description" content="美少女ゲームの感想、レビュー、セール情報をお届けするブログ"/>
          <meta property="og:title" content="びしょげオタクのブログ"/>
          <meta property="og:description" content="美少女ゲームの感想、レビュー、セール情報をお届けするブログ"/>
          <meta property="og:image" content="/default-thumbnail.jpg"/>
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:image" content="/default-thumbnail.jpg"/>
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

        <main className="max-w-7xl mx-auto px-4 py-8 flex space-x-8">
          <div className="w-full md:w-2/3 space-y-8">
            {/* 最新記事 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">最新記事</h2>
              {allPosts.slice(0, 2).map((post) => (
                  <div key={post.slug}
                       className="bg-white rounded-lg shadow-lg p-6 mb-8 hover:shadow-xl transition-shadow duration-300">
                    {post.frontmatter.thumbnail && (
                        <Image
                            src={post.frontmatter.thumbnail}
                            alt={post.frontmatter.title}
                            width={1200}
                            height={675}
                            className="rounded-lg object-cover mb-6"
                            loading="lazy"
                        />
                    )}
                    <div>
                      <Link href={`/posts/${post.slug}`} legacyBehavior>
                        <a className="text-3xl font-semibold text-blue-700 hover:text-blue-900 transition-all duration-300">
                          {post.frontmatter.title}
                        </a>
                      </Link>
                      <p className="text-gray-600 mt-4 text-lg">{post.frontmatter.description}</p>
                      <div className="text-sm text-gray-500 mt-4">{formatDate(post.frontmatter.date)}</div>
                    </div>
                  </div>
              ))}
            </section>
          </div>

          <div className="w-full md:w-2.5/6 space-y-8">
            {/* 他の記事 */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">他の記事</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {allPosts.slice(1, 50000).map((post) => (
                    <div key={post.slug}
                         className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                      {post.frontmatter.thumbnail && (
                          <Image
                              src={post.frontmatter.thumbnail}
                              alt={post.frontmatter.title}
                              width={400}
                              height={225}
                              className="rounded-lg object-cover mb-4"
                              loading="lazy"
                          />
                      )}
                      <div>
                        <Link href={`/posts/${post.slug}`} legacyBehavior>
                          <a className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300">
                            {post.frontmatter.title}
                          </a>
                        </Link>
                        <p className="text-gray-600 mt-2 text-sm">{post.frontmatter.description}</p>
                        <div className="text-xs text-gray-500 mt-2">{formatDate(post.frontmatter.date)}</div>
                        <Link href={`/posts/${post.slug}`} legacyBehavior>
                          <a className="text-blue-600 mt-4 inline-block text-sm hover:underline">続きを読む</a>
                        </Link>
                      </div>
                    </div>
                ))}
              </div>
            </section>



          {/* 人気記事 */}
          <section>
            <h3 className="text-2xl font-bold border-b pb-2">人気記事</h3>
            <ol className="space-y-3">
              {popularPosts.map((post, index) => (
                  <li key={post.slug} className="flex items-center">
                    <span className="text-gray-500 mr-2">{index + 1}.</span>
                    <Link href={`/posts/${post.slug}`} legacyBehavior>
                      <a className="text-blue-600 hover:underline">{post.frontmatter.title}</a>
                    </Link>
                  </li>
              ))}
            </ol>
          </section>

          {/* タグ一覧 */}
          <section>
            <h3 className="text-lg font-bold border-b pb-2">タグ一覧</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                  <Link key={tag} href={`/tags/${tag}`} legacyBehavior>
                    <a className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-800">{tag}</a>
                  </Link>
              ))}
            </div>
          </section>
      </div>
</main>

  <footer className="bg-gray-800 text-white text-center py-6">
    <p>&copy; {new Date().getFullYear()} びしょげオタクのブログ. All rights reserved.</p>
  </footer>
</div>
)
  ;
}
